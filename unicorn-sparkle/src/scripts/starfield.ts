/**
 * La funcionalidad de este script está inspirada en estos codepens:

 * - https://codepen.io/veljamatic/pen/pypxRR - canvas-dot-grid
 *   - Dibujar una grilla de puntos en un canvas

 * - https://codepen.io/efriberg/pen/ExaxzKq - Interactive Dot Grid
 *   - Efecto de repelencia basado en la posición del mouse

 * - https://codepen.io/BuiltByEdgar/pen/gvEPya - Dot grid (canvas)
 *   - Efecto de destello de los puntos en el canvas
 */

export class StarField {
  // Elemento canvas y su contexto 2D
  private readonly canvas: HTMLCanvasElement
  private readonly context: CanvasRenderingContext2D | null

  // Array que almacena las estrellas con sus propiedades: posición, alfa (opacidad), y velocidad
  private stars: Array<{
    x: number
    y: number
    originalX: number
    originalY: number
    alpha: number
    speed: number
  }> = []

  // Posición del mouse y constantes de configuración
  private readonly mousePosition = { x: -1000, y: -1000 } // Posición inicial del mouse fuera del canvas
  private readonly SPACING = 18 // Espaciado entre estrellas
  private readonly starRadius = 1 // Radio de cada estrella
  private readonly influenceRadius = 80 // Radio de influencia para el efecto de repelencia del mouse
  private canvasWidth: number
  private canvasHeight: number

  // Color de las estrellas (blanco por defecto)
  private starColor = '255, 255, 255'

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = this.canvas?.getContext('2d') ?? null

    // Asignar dimensiones del canvas
    this.canvasWidth = this.getCanvasWidth()
    this.canvasHeight = this.getCanvasHeight()

    // Verificar si el contexto es válido antes de proceder
    if (this.context !== null) {
      this.initStars() // Inicializar estrellas
      this.resizeCanvas() // Ajustar el tamaño del canvas
      this.drawStars() // Dibujar las estrellas
      this.addEventListeners() // Añadir eventos de mouse
      this.observeThemeChanges() // Observar cambios en el tema (clase 'dark' en la etiqueta <html>)
    } else {
      console.error('El contexto 2D no se pudo obtener.')
    }

    // Añadir evento para redimensionar el canvas al cambiar el tamaño de la ventana
    window.addEventListener('resize', this.onResize.bind(this), false)
  }

  // Obtener el ancho del canvas
  private getCanvasWidth(): number {
    return this.canvas.clientWidth
  }

  // Obtener la altura del canvas
  private getCanvasHeight(): number {
    return this.canvas.clientHeight
  }

  // Redimensionar el canvas
  private resizeCanvas(): void {
    this.canvas.width = this.canvasWidth
    this.canvas.height = this.canvasHeight
  }

  // Inicializar las estrellas con posiciones y propiedades aleatorias
  private initStars(): void {
    this.stars = []

    // Generar estrellas en el canvas, inicializamos la posición x y y en -5 para ajustarlo correctamente
    for (let x = -5; x < this.canvasWidth; x += this.SPACING) {
      for (let y = -5; y < this.canvasHeight; y += this.SPACING) {
        this.stars.push({
          x,
          y,
          originalX: x, // Guardar la posición original para el efecto de "volver"
          originalY: y,
          alpha: Math.random(), // Opacidad aleatoria
          speed: Math.random() * 0.005 + 0.002 // Velocidad de variación de la opacidad
        })
      }
    }
  }

  // Dibujar las estrellas y aplicar el efecto de repelencia basado en la posición del mouse
  private drawStars(): void {
    if (this.context !== null) {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight) // Limpiar el canvas
    }

    this.stars.forEach((star) => {
      // Calcular la distancia entre el mouse y la estrella
      const dx = this.mousePosition.x - star.x
      const dy = this.mousePosition.y - star.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Si la estrella está dentro del radio de influencia del mouse, aplicar repelencia
      if (distance < this.influenceRadius) {
        const angle = Math.atan2(dy, dx) // Ángulo de dirección hacia el mouse
        const force = (this.influenceRadius - distance) / this.influenceRadius // Fuerza de la repelencia
        star.x = star.originalX - Math.cos(angle) * force * 20 // Mover estrella lejos del mouse
        star.y = star.originalY - Math.sin(angle) * force * 20
      } else {
        // Si la estrella está fuera del radio de influencia, regresa a su posición original
        star.x += (star.originalX - star.x) * 0.05
        star.y += (star.originalY - star.y) * 0.05
      }

      // Actualizar la opacidad (alpha) de las estrellas con su velocidad
      star.alpha += star.speed
      if (star.alpha > 1 || star.alpha < 0) {
        star.speed = -star.speed // Invertir la dirección del cambio de opacidad
      }

      // Dibujar cada estrella con su color (dependiendo del tema) y opacidad
      if (this.context !== null) {
        this.context.fillStyle = `rgba(${this.starColor}, ${Math.abs(star.alpha)})`
        this.context.beginPath()
        this.context.arc(star.x, star.y, this.starRadius, 0, Math.PI * 2) // Dibujar la estrella
        this.context.fill()
      }
    })

    // Continuar animación en el siguiente frame
    requestAnimationFrame(this.drawStars.bind(this))
  }

  // Añadir eventos de mouse: mover y salir del área del canvas
  private addEventListeners(): void {
    this.canvas.parentElement?.addEventListener(
      'mousemove',
      this.onMouseMove.bind(this)
    )
    this.canvas.parentElement?.addEventListener(
      'mouseleave',
      this.onMouseLeave.bind(this)
    )
  }

  // Actualizar la posición del mouse al moverlo dentro del canvas
  private onMouseMove(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect()
    this.mousePosition.x = event.clientX - rect.left
    this.mousePosition.y = event.clientY - rect.top
  }

  // Al salir del canvas, colocar el mouse en una posición fuera del área visible
  private onMouseLeave(): void {
    this.mousePosition.x = -1000
    this.mousePosition.y = -1000
  }

  // Redimensionar el canvas y reinicializar las estrellas cuando la ventana cambia de tamaño
  private onResize(): void {
    this.canvasWidth = this.getCanvasWidth()
    this.canvasHeight = this.getCanvasHeight()
    this.resizeCanvas()
    this.initStars()
  }

  // Método para observar cambios en la clase 'dark' del <html>
  private observeThemeChanges(): void {
    const htmlElement = document.documentElement

    // Inicialmente revisamos si la clase 'dark' está presente
    this.updateStarColor()

    // Crear un MutationObserver para detectar cambios en la clase del <html>
    const observer = new MutationObserver(() => {
      this.updateStarColor() // Actualizar el color de las estrellas cuando cambie la clase
    })

    // Iniciar la observación de cambios en los atributos del <html>
    observer.observe(htmlElement, {
      attributes: true, // Observar solo atributos
      attributeFilter: ['class'] // Solo observar cambios en la clase
    })
  }

  // Cambia el color de las estrellas basado en la clase 'dark'
  private updateStarColor(): void {
    const htmlElement = document.documentElement

    if (htmlElement.classList.contains('dark')) {
      this.starColor = '0, 0, 0' // Negro si la clase 'dark' está presente
    } else {
      this.starColor = '255, 255, 255' // Blanco si no está presente
    }
  }
}
