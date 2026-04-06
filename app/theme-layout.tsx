import type { CSSProperties, ReactNode } from "react"

const YEAR_THEME = {
  year: "2026",
  sitePrimary: "#ffffff",
  accent: "#25eb25",
}

type ThemeLayoutProps = {
  children: ReactNode
}

export function ThemeLayout({ children }: ThemeLayoutProps) {
  const themeVariables = {
    "--site-primary-color": YEAR_THEME.sitePrimary,
    "--year-theme-color": YEAR_THEME.accent,
  } as CSSProperties

  return (
    <div style={themeVariables} data-theme-year={YEAR_THEME.year}>
      {children}
    </div>
  )
}
