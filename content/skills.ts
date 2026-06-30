import {
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiTailwindcss,
  SiPython,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

export const skills: {
  id: string
  name: string
  icon: IconType
  size?: number
}[] = [
  { id: '1', name: 'TypeScript', icon: SiTypescript, size: 22 },
  { id: '2', name: 'Next.js', icon: SiNextdotjs, size: 24 },
  { id: '3', name: 'Node.js', icon: SiNodedotjs, size: 24 },
  { id: '4', name: 'Python', icon: SiPython, size: 24 },
  { id: '5', name: 'PHP', icon: SiPhp },
  { id: '6', name: 'Laravel', icon: SiLaravel, size: 24 },
  { id: '7', name: 'PostgreSQL', icon: SiPostgresql, size: 24 },
  { id: '8', name: 'MySQL', icon: SiMysql },
  { id: '9', name: 'Tailwind CSS', icon: SiTailwindcss },
]
