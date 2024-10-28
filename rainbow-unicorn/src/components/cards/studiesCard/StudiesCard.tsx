import React from 'react'
import './studiesCard.css'

interface Study {
  title: string
  org: string
  year: string
}

interface StudiesCardProps {
  studies: Study[]
}

const StudiesCard: React.FC<StudiesCardProps> = ({ studies }) => {
  return (
    <div className='studies-card'>
      <div className='info'>
        <h2>Estudios</h2>
        {studies.map((study, index) => (
          <div key={index} className='study-item'>
            <div className='study-details'>
              <p className='title'>{study.title}</p>
              <p className='org'>{study.org}</p>
            </div>
            <span className='study-year'>{study.year}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudiesCard
