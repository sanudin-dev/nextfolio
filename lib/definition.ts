import type { IconType } from 'react-icons'

export type Skillset = {
  id: string
  name: string
  icon: IconType
  size?: number
}

export type Project = {
  id: string
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  link: string
  /** Optional markdown body for future project journey / case study pages */
  content?: string
  /** Optional date for ordering (e.g. "2024-01-01") */
  date?: string
  /** "app" for publicly usable products, "project" (default) for demos */
  type?: string
}
