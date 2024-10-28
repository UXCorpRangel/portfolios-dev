// src/components/icons/UserIcon.tsx
import React from 'react'

const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg
    width='24'
    height='24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M19.0002 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-14a1.9999 1.9999 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79Zm-11.62-9.94a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68Zm1.39 9.94v-8.37h-2.77v8.37h2.77Z'
      fill='currentColor' // Usa 'currentColor' para que tome el color del texto
    />
  </svg>
)

export default LinkedinIcon
