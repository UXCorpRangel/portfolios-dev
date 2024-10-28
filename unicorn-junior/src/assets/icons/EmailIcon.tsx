import React from 'react'

const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg
    width='width'
    height='height'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M21.0001 12a8.9999 8.9999 0 1 0-6.67 8.693'
      stroke='currentColor'
      strokeWidth='1.5272'
      strokeLinecap='round'
    />
    <path
      d='M12.0002 16c2.2092 0 4-1.7909 4-4 0-2.2092-1.7908-4-4-4-2.209 0-4 1.7908-4 4 0 2.2091 1.791 4 4 4Z'
      stroke='currentColor'
      strokeWidth='1.5272'
    />
    <path
      d='M15.9999 9v4.5a2.5 2.5 0 0 0 5 0V12'
      stroke='currentColor'
      strokeWidth='1.5272'
      strokeLinecap='round'
    />
  </svg>
)

export default EmailIcon
