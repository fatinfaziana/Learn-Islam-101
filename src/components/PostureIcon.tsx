import type { ReactElement } from 'react'
import type { Posture } from '../types'

// Simple side-view figures facing right. Decorative: the step text always says what to do.
const FIGURES: Record<Posture, ReactElement> = {
  stand: (
    <>
      <circle cx="32" cy="9" r="5" />
      <path d="M32 15V38M32 38L29 58M32 38L35 58M32 20L39 29L31 31" />
    </>
  ),
  bow: (
    <>
      <circle cx="52" cy="30" r="5" />
      <path d="M18 32H46M18 32V58M44 33L24 46" />
    </>
  ),
  sujud: (
    <>
      <circle cx="53" cy="53" r="4.5" />
      <path d="M10 58L26 56L18 36L44 50M44 50L56 58" />
    </>
  ),
  sit: (
    <>
      <circle cx="22" cy="13" r="5" />
      <path d="M22 19V46L42 58L14 58M22 28L32 40L36 52" />
    </>
  ),
}

export default function PostureIcon({ posture }: { posture: Posture }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-16 w-16 shrink-0 rounded-xl bg-accent p-2 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {FIGURES[posture]}
    </svg>
  )
}
