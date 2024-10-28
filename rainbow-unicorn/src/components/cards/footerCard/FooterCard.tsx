import './footerCard.css'

const FooterCard = () => {
  return (
    <div className='footer-card'>
      <p>
        © 2024 Diseñado por{' '}
        <a
          href='https://www.linkedin.com/in/ux-ana-rangel/'
          target='_blank'
          rel='noopener noreferrer'
        >
          UX Ana Rangel
        </a>
      </p>
      <div className='made-with'>
        <p>Hecho con</p>
        <video src='/assets/video/heart.webm' autoPlay loop muted />
        <p>
          por{' '}
          <a
            href='https://facundodandrea.vercel.app'
            target='_blank'
            rel='noopener noreferrer'
          >
            Facundo D'Andrea
          </a>
        </p>
      </div>
    </div>
  )
}

export default FooterCard
