import { useTheme as useBaseTheme } from 'next-themes'
import { Theme } from '../types/apps'

export default function useTheme() {
  const { theme, resolvedTheme, ...reset } = useBaseTheme()
  return {
    theme: theme === Theme.system ? resolvedTheme as Theme : theme as Theme,
    ...reset
  }
}