import React from 'react'
import './statusCard.css'

interface StatusCardProps {
  isSearching: boolean
}

const StatusCard: React.FC<StatusCardProps> = ({ isSearching }) => {
  return (
    <div className={`status-card ${isSearching ? 'buscando' : 'trabajando'}`}>
      <h2>
        {isSearching ? 'Disponible para trabajar' : 'Actualmente trabajando'}
      </h2>
      <div
        className={`status-indicator ${isSearching ? 'available' : 'unavailable'}`}
      ></div>
    </div>
  )
}

export default StatusCard
