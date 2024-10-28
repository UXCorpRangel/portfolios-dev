// src/components/Button.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import './button.css'

interface ButtonProps {
  link: string
  icon?: React.ReactNode
  label?: string
  variant?: 'primary' | 'secondary' | 'disabled' | 'icon' | 'transparent'
  size?: number // Agrega propiedad para tamaño
  external?: boolean // Nueva propiedad para enlaces externos
}

const Button: React.FC<ButtonProps> = ({
  link,
  icon,
  label,
  variant = 'primary',
  size = 24, // Valor por defecto
  external = false, // Valor por defecto
}) => {
  const handleMouseDown = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (external) {
      // Abre el enlace en una nueva pestaña
      window.open(link, '_blank', 'noopener,noreferrer')
      event.preventDefault() // Previene el comportamiento por defecto del enlace
    }
  }

  return external ? (
    // Usa un elemento <a> para enlaces externos
    <a
      href={link}
      className={`button ${variant}`}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      rel='noopener noreferrer'
      target='_blank'
    >
      {icon &&
        React.cloneElement(icon as React.ReactElement<any>, {
          width: size,
          height: size,
        })}
      {label && <span className='label'>{label}</span>}
    </a>
  ) : (
    // Usa el componente <Link> para enlaces internos
    <Link
      to={link}
      className={`button ${variant}`}
      onMouseDown={handleMouseDown}
    >
      {icon &&
        React.cloneElement(icon as React.ReactElement<any>, {
          width: size,
          height: size,
        })}
      {label && <span className='label'>{label}</span>}
    </Link>
  )
}

export default Button
