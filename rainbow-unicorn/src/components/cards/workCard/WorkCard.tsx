import React from 'react'
import './workCard.css'
import Button from '@/components/button/Button'
import { RightArrowUpIcon } from '@/assets/icons'

interface WorkCardProps {
  projectName: string
  companyName: string
  link: string // Ruta al proyecto
}

const WorkCard: React.FC<WorkCardProps> = ({
  projectName,
  companyName,
  link,
}) => {
  return (
    <div className='work-card'>
      <div className='work-info'>
        <h3 className='project-name'>{projectName}</h3>
        <p className='company-name'>{companyName}</p>
      </div>
      <div className='btn-link'>
        <Button link={link} icon={<RightArrowUpIcon />} variant='transparent' />
      </div>
    </div>
  )
}

export default WorkCard
