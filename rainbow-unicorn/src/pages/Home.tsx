import React, { useState } from 'react'

const Home: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [fileName, setFileName] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        if (e.target?.result) {
          setHtmlContent(e.target.result as string)
          setFileName(file.name)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleContentChange = (e: React.FocusEvent<HTMLDivElement>) => {
    setHtmlContent(e.currentTarget.innerHTML)
  }

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault() // Evitar que se active el enlace

    if (!isEditing) return // Solo permitir cambios si estamos en modo edición

    const target = e.currentTarget // Referencia a la imagen
    setImageUrl(target.src) // Establecer la URL actual de la imagen
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setImageUrl(newUrl)

    // Reemplazar la URL de la imagen en el contenido HTML
    const updatedHtml = htmlContent.replace(
      /<img[^>]+src="[^">]+"[^>]*>/g,
      imgTag => {
        return imgTag.replace(/src="[^">]+"/, `src="${newUrl}"`)
      },
    )

    setHtmlContent(updatedHtml)
  }

  const exportHtmlFile = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'correo_modificado.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Editor de Correos HTML</h1>
      <input type='file' accept='.html' onChange={handleFileChange} />
      {fileName && <h2>Archivo cargado: {fileName}</h2>}
      <h3>Vista Previa</h3>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          height: '600px',
          overflowY: 'scroll',
          width: '100%',
          maxWidth: '800px',
          margin: '20px 0',
        }}
        contentEditable={isEditing}
        onBlur={handleContentChange}
        onClick={e => {
          if (isEditing && e.target instanceof HTMLImageElement) {
            handleImageClick(e)
          }
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      {isEditing && (
        <div>
          <h4>Haz clic en una imagen para editar su URL.</h4>
          <input
            type='text'
            value={imageUrl}
            onChange={handleImageUrlChange}
            placeholder='Pega la nueva URL aquí'
          />
        </div>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Guardar Cambios' : 'Editar'}
      </button>
      <button onClick={exportHtmlFile} style={{ marginLeft: '10px' }}>
        Exportar HTML
      </button>
    </div>
  )
}

export default Home
