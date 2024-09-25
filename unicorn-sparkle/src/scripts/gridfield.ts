/**
 * La funcionalidad de este script está inspirada en este codepen:

 * - https://codepen.io/wefiy/pen/JxdzPG - Canvas Grid lines animation
 */

export class GridField {
  private readonly canvas: HTMLCanvasElement // Elemento canvas donde se dibuja la cuadrícula
  private readonly context: CanvasRenderingContext2D | null // Contexto 2D del canvas
  private readonly lines: GridLine[] = [] // Arreglo de líneas de la cuadrícula
  private size: number = 50 // Tamaño de las celdas de la cuadrícula
  private readonly duration = 4000 // Duración de la animación en milisegundos
  private startTime: number = 0 // Tiempo de inicio de la animación
  private animationFrameId: number = 0 // ID del frame de animación

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas // Asigna el canvas recibido
    this.context = this.canvas.getContext('2d') // Obtiene el contexto 2D

    this.resizeCanvas() // Redimensiona el canvas al inicio
    window.addEventListener('resize', this.handleResize.bind(this)) // Añade un evento para redimensionar

    this.initGrid() // Inicializa la cuadrícula
  }

  // Maneja el evento de redimensionamiento
  private handleResize(): void {
    this.resizeCanvas() // Redimensiona el canvas
    this.play() // Reinicia la animación
  }

  // Redimensiona el canvas al tamaño de la ventana
  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth // Establece el ancho del canvas
    this.canvas.height = window.innerHeight // Establece la altura del canvas
    this.size = Math.floor(Math.min(this.canvas.width, this.canvas.height) / 20) // Calcula el tamaño de la cuadrícula
    this.updateGridLines() // Actualiza las líneas de la cuadrícula
  }

  // Inicializa las líneas que se animarán
  private initGrid(): void {
    if (this.context === null) return // Verifica que el contexto no sea nulo
    this.updateGridLines() // Actualiza las líneas
  }

  // Actualiza las posiciones de las líneas de la cuadrícula
  private updateGridLines(): void {
    if (this.context === null) return // Verifica que el contexto no sea nulo

    const OFFSET = -5 // Desplazamiento para dibujar las líneas
    const width = this.canvas.width // Ancho del canvas
    const height = this.canvas.height // Alto del canvas

    this.lines.length = 0 // Limpia las líneas previas

    // Dibujar líneas horizontales
    for (let y = OFFSET; y <= height; y += this.size) {
      const lineLeft = new GridLine(this.context, 0, y, 0, y)
      lineLeft.animateTo({ x: width / 2 }, this.duration, EASING.easeInOutQuad)
      this.lines.push(lineLeft) // Agrega la línea izquierda

      const lineRight = new GridLine(this.context, width, y, width, y)
      lineRight.animateTo({ x: width / 2 }, this.duration, EASING.easeInOutQuad)
      this.lines.push(lineRight) // Agrega la línea derecha
    }

    // Dibujar líneas verticales
    for (let x = OFFSET; x <= width; x += this.size) {
      const lineTop = new GridLine(this.context, x, 0, x, 0)
      lineTop.animateTo({ y: height / 2 }, this.duration, EASING.easeInOutQuad)
      this.lines.push(lineTop) // Agrega la línea superior

      const lineBottom = new GridLine(this.context, x, height, x, height)
      lineBottom.animateTo(
        { y: height / 2 },
        this.duration,
        EASING.easeInOutQuad
      )
      this.lines.push(lineBottom) // Agrega la línea inferior
    }
  }

  // Método de animación principal
  private animate(currentTime: number): void {
    const progress = Math.min(1, (currentTime - this.startTime) / this.duration) // Calcula el progreso

    if (this.context === null) return // Verifica que el contexto no sea nulo

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) // Limpia el canvas

    // Dibujar todas las líneas
    this.lines.forEach((line) => {
      line.draw(progress) // Dibuja cada línea en base al progreso
    })

    // Si la animación no ha terminado, continua la animación
    if (progress < 1) {
      this.animationFrameId = requestAnimationFrame(this.animate.bind(this))
    } else {
      this.animationFrameId = 0 // Reinicia el ID de la animación
    }
  }

  // Iniciar la animación
  public play(): void {
    this.startTime = performance.now() // Marca el tiempo de inicio
    this.animate(this.startTime) // Comienza la animación
  }
}

// Define el tipo de función para el easing
type EasingFunction = (t: number, b: number, c: number, d: number) => number

// Definimos el sistema de easing (interpolación suave)
const EASING = {
  easeInOutQuad: ((t, b, c, d) => {
    t /= d / 2 // Normaliza el tiempo
    if (t < 1) return (c / 2) * t * t + b // Easing hacia adelante
    t-- // Reduce t
    return (-c / 2) * (t * (t - 2) - 1) + b // Easing hacia atrás
  }) as EasingFunction
}

// Clase para animar propiedades
class Animatable {
  private animation: {
    target: Record<string, number> // Objetivo de las propiedades a animar
    duration: number // Duración de la animación
    easing: EasingFunction // Función de easing
  } | null = null // Inicializa la animación como nula

  // Método para animar a propiedades específicas
  animateTo(
    properties: Record<string, number>,
    duration: number,
    easing: EasingFunction
  ): void {
    this.animation = { target: properties, duration, easing } // Configura la animación
  }

  // Obtiene la propiedad animada en base al progreso
  protected _getAnimatedProperty(
    property: string,
    progress: number,
    start: number
  ): number {
    if (this.animation?.target[property] !== undefined) {
      const change = this.animation.target[property] - start // Calcula el cambio
      return this.animation.easing(
        progress * this.animation.duration,
        start,
        change,
        this.animation.duration
      ) // Aplica la función de easing
    }
    return start // Retorna el valor inicial si no hay animación
  }
}

// Clase para representar una línea de la cuadrícula
class GridLine extends Animatable {
  private readonly startX: number // Posición inicial en X
  private readonly startY: number // Posición inicial en Y

  constructor(
    private readonly context: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    super()
    this.startX = startX // Asigna la posición inicial en X
    this.startY = startY // Asigna la posición inicial en Y
  }

  // Método para dibujar la línea
  draw(progress: number): void {
    const x = this._getAnimatedProperty('x', progress, this.startX) // Obtiene la posición animada en X
    const y = this._getAnimatedProperty('y', progress, this.startY) // Obtiene la posición animada en Y

    this.context.beginPath() // Comienza un nuevo camino
    this.context.moveTo(this.startX, this.startY) // Mueve a la posición inicial
    this.context.lineTo(x, y) // Dibuja la línea hasta la posición animada
    this.context.strokeStyle = 'rgba(128, 128, 128, 0.44)' // Color de las líneas
    this.context.stroke() // Dibuja la línea en el canvas
  }
}
