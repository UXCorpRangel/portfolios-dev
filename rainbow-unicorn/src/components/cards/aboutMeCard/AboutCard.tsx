import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './aboutCard.css'

interface AboutCardProps {
  markdownPath: string // Ruta del Markdown
  imagePath?: string // Ruta de la imagen (opcional)
  children?: React.ReactNode // Propiedad opcional para los hijos
}

const AboutCard: React.FC<AboutCardProps> = ({
  markdownPath,
  imagePath,
  children,
}) => {
  const [markdown, setMarkdown] = useState<string>('')

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await fetch(markdownPath)
        if (!response.ok) {
          throw new Error('Error al cargar el Markdown')
        }
        const text = await response.text()
        setMarkdown(text)
      } catch (error) {
        console.error(error)
      }
    }

    loadMarkdown()
  }, [markdownPath])

  return (
    <div className='about-card'>
      <div className='info'>
        <ReactMarkdown>{markdown}</ReactMarkdown>
        {imagePath && <img src={imagePath} alt='AboutCard Image' />}
      </div>
      <div className='tags-container'>{children}</div>
    </div>
  )
}

export default AboutCard
