// Tags.tsx
import React from 'react'
import * as Icons from '@/assets/icons/tags'

import './tags.css'
interface TagsProps {
  technology:
    | 'Bash'
    | 'HTML'
    | 'CSS'
    | 'C'
    | 'JavaScript'
    | 'TypeScript'
    | 'Sass'
    | 'React'
    | 'Astro'
    | 'NextJs'
    | 'Node'
    | 'Python'
    | 'MySQL'
    | 'Vue'
}

const Tags: React.FC<TagsProps> = ({ technology }) => {
  // Mapeo de tecnologías a componentes de íconos
  const iconMap: { [key in TagsProps['technology']]: React.FC } = {
    Bash: Icons.Bash,
    C: Icons.C,
    HTML: Icons.Html,
    CSS: Icons.Css,
    JavaScript: Icons.Js,
    TypeScript: Icons.TypeScript,
    Sass: Icons.Sass,
    React: Icons.React,
    Astro: Icons.Astro,
    NextJs: Icons.NextJs,
    Node: Icons.Node,
    Python: Icons.Python,
    MySQL: Icons.MySql,
    Vue: Icons.Vue,
  }

  // Obtener el componente del ícono correspondiente
  const Icon = iconMap[technology]

  return (
    <div className='tag'>
      <Icon />
      <span>{technology.charAt(0).toUpperCase() + technology.slice(1)}</span>
    </div>
  )
}

export default Tags
