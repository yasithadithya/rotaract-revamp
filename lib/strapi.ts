const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "")
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

const REVALIDATE_SECONDS = Number(process.env.STRAPI_REVALIDATE_SECONDS ?? "120")
const DEFAULT_REVALIDATE = Number.isFinite(REVALIDATE_SECONDS) ? REVALIDATE_SECONDS : 120

type UnknownRecord = Record<string, unknown>

type StrapiCollectionResponse<T> = {
  data: T[]
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string | null
  authorName: string | null
  featured: boolean
  coverImageUrl: string | null
  coverImageAlt: string
}

const BLOG_FIELDS = ["title", "slug", "excerpt", "content", "publishedAt", "createdAt", "updatedAt", "authorName", "featured"] as const

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null
}

function asString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function asBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") {
    return value
  }

  if (typeof value !== "string") {
    return null
  }

  const normalized = value.trim().toLowerCase()
  if (normalized === "true") {
    return true
  }

  if (normalized === "false") {
    return false
  }

  return null
}

function appendBlogFields(params: URLSearchParams): void {
  BLOG_FIELDS.forEach((field, index) => {
    params.set(`fields[${index}]`, field)
  })
}

function normalizeEntry(entry: unknown): UnknownRecord | null {
  if (!isRecord(entry)) {
    return null
  }

  if (isRecord(entry.attributes)) {
    return {
      ...entry.attributes,
      id: entry.id,
      documentId: entry.documentId,
    }
  }

  return entry
}

function toAbsoluteMediaUrl(url: string | null): string | null {
  if (!url) {
    return null
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    if (!STRAPI_BASE_URL) {
      return url
    }

    try {
      const mediaUrl = new URL(url)
      const baseUrl = new URL(STRAPI_BASE_URL)
      const localHosts = new Set(["0.0.0.0", "127.0.0.1", "localhost"])

      if (localHosts.has(mediaUrl.hostname.toLowerCase()) && mediaUrl.origin !== baseUrl.origin) {
        return `${baseUrl.origin}${mediaUrl.pathname}${mediaUrl.search}`
      }
    } catch {
      return url
    }

    return url
  }

  if (url.startsWith("//")) {
    return `https:${url}`
  }

  if (!STRAPI_BASE_URL) {
    return null
  }

  return `${STRAPI_BASE_URL}${url.startsWith("/") ? url : `/${url}`}`
}

function getPlainText(value: unknown): string {
  if (typeof value === "string") {
    return value.replace(/<[^>]*>/g, " ").replace(/\r/g, "")
  }

  if (Array.isArray(value)) {
    return value.map((item) => getPlainText(item)).filter(Boolean).join("\n")
  }

  if (!isRecord(value)) {
    return ""
  }

  if (typeof value.text === "string") {
    return value.text
  }

  if (Array.isArray(value.children)) {
    return value.children.map((child) => getPlainText(child)).join("")
  }

  return Object.values(value)
    .map((item) => getPlainText(item))
    .filter(Boolean)
    .join("\n")
}

function getExcerpt(explicitExcerpt: unknown, content: string): string {
  const excerpt = asString(explicitExcerpt)
  if (excerpt) {
    return excerpt
  }

  const normalized = content.replace(/\s+/g, " ").trim()
  if (!normalized) {
    return "Blog post content will appear here once published from Strapi."
  }

  return normalized.length > 180 ? `${normalized.slice(0, 177)}...` : normalized
}

function getMediaRecord(value: unknown): UnknownRecord | null {
  if (Array.isArray(value)) {
    return getMediaRecord(value[0])
  }

  if (!isRecord(value)) {
    return null
  }

  if (isRecord(value.attributes)) {
    return value.attributes
  }

  return value
}

function getMediaUrl(media: UnknownRecord): string | null {
  const directUrl = asString(media.url)
  if (directUrl) {
    return directUrl
  }

  if (!isRecord(media.formats)) {
    return null
  }

  const formatPreference = ["large", "medium", "small", "thumbnail"]
  for (const key of formatPreference) {
    const format = media.formats[key]
    if (!isRecord(format)) {
      continue
    }

    const formatUrl = asString(format.url)
    if (formatUrl) {
      return formatUrl
    }
  }

  return null
}

function extractCoverImage(coverImage: unknown): { url: string | null; alt: string } {
  if (!isRecord(coverImage)) {
    return { url: null, alt: "Blog cover image" }
  }

  const media = getMediaRecord(coverImage.data ?? coverImage)
  if (!media) {
    return { url: null, alt: "Blog cover image" }
  }

  const url = toAbsoluteMediaUrl(getMediaUrl(media))
  const alt = asString(media.alternativeText) ?? asString(media.caption) ?? asString(media.name) ?? "Blog cover image"

  return { url, alt }
}

function extractAuthorName(entry: UnknownRecord): string | null {
  const direct = asString(entry.authorName)
  if (direct) {
    return direct
  }

  if (isRecord(entry.author)) {
    if (isRecord(entry.author.data) && isRecord(entry.author.data.attributes)) {
      return asString(entry.author.data.attributes.name)
    }

    return asString(entry.author.name)
  }

  return null
}

function mapBlogPost(entry: unknown): BlogPost | null {
  const normalizedEntry = normalizeEntry(entry)
  if (!normalizedEntry) {
    return null
  }

  const slug = asString(normalizedEntry.slug)
  if (!slug) {
    return null
  }

  const title = asString(normalizedEntry.title) ?? "Untitled Post"
  const content = getPlainText(normalizedEntry.content ?? normalizedEntry.body ?? normalizedEntry.description)
  const excerpt = getExcerpt(normalizedEntry.excerpt ?? normalizedEntry.summary, content)
  const publishedAt =
    asString(normalizedEntry.publishedAt) ?? asString(normalizedEntry.createdAt) ?? asString(normalizedEntry.updatedAt)
  const { url, alt } = extractCoverImage(normalizedEntry.coverImage)

  return {
    id: String(normalizedEntry.documentId ?? normalizedEntry.id ?? slug),
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    authorName: extractAuthorName(normalizedEntry),
    featured: asBoolean(normalizedEntry.featured) ?? false,
    coverImageUrl: url,
    coverImageAlt: alt,
  }
}

async function fetchFromStrapi<T>(path: string): Promise<T> {
  if (!STRAPI_BASE_URL) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not configured.")
  }

  const response = await fetch(`${STRAPI_BASE_URL}/api${path}`, {
    headers: {
      Accept: "application/json",
      ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
    },
    next: { revalidate: DEFAULT_REVALIDATE },
  })

  if (!response.ok) {
    throw new Error(`Strapi request failed (${response.status}): ${response.statusText}`)
  }

  return (await response.json()) as T
}

export function isStrapiConfigured(): boolean {
  return Boolean(STRAPI_BASE_URL)
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!STRAPI_BASE_URL) {
    return []
  }

  const params = new URLSearchParams()
  params.set("sort[0]", "publishedAt:desc")
  params.set("pagination[pageSize]", "24")
  appendBlogFields(params)
  params.set("populate", "coverImage")

  try {
    const response = await fetchFromStrapi<StrapiCollectionResponse<unknown>>(`/blogs?${params.toString()}`)

    return response.data.map((entry) => mapBlogPost(entry)).filter((post): post is BlogPost => post !== null)
  } catch (error) {
    console.error("Unable to fetch blog posts from Strapi.", error)
    return []
  }
}

export async function getFeaturedBlogPosts(limit = 4): Promise<BlogPost[]> {
  if (!STRAPI_BASE_URL) {
    return []
  }

  const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 4

  const params = new URLSearchParams()
  params.set("sort[0]", "publishedAt:desc")
  params.set("pagination[pageSize]", String(normalizedLimit))
  params.set("filters[featured][$eq]", "true")
  appendBlogFields(params)
  params.set("populate", "coverImage")

  try {
    const response = await fetchFromStrapi<StrapiCollectionResponse<unknown>>(`/blogs?${params.toString()}`)

    return response.data.map((entry) => mapBlogPost(entry)).filter((post): post is BlogPost => post !== null)
  } catch (error) {
    console.error("Unable to fetch featured blog posts from Strapi.", error)
    return []
  }
}

export async function getNewestBlogPosts(limit = 4): Promise<BlogPost[]> {
  if (!STRAPI_BASE_URL) {
    return []
  }

  const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 4

  const params = new URLSearchParams()
  params.set("sort[0]", "publishedAt:desc")
  params.set("pagination[pageSize]", String(normalizedLimit))
  appendBlogFields(params)
  params.set("populate", "coverImage")

  try {
    const response = await fetchFromStrapi<StrapiCollectionResponse<unknown>>(`/blogs?${params.toString()}`)

    return response.data.map((entry) => mapBlogPost(entry)).filter((post): post is BlogPost => post !== null)
  } catch (error) {
    console.error("Unable to fetch newest blog posts from Strapi.", error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!STRAPI_BASE_URL) {
    return null
  }

  const params = new URLSearchParams()
  params.set("filters[slug][$eq]", slug)
  params.set("pagination[pageSize]", "1")
  appendBlogFields(params)
  params.set("populate", "coverImage")

  try {
    const response = await fetchFromStrapi<StrapiCollectionResponse<unknown>>(`/blogs?${params.toString()}`)
    const post = response.data[0]

    return mapBlogPost(post)
  } catch (error) {
    console.error(`Unable to fetch blog post "${slug}" from Strapi.`, error)
    return null
  }
}