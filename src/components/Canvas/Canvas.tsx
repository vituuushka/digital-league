import { useRef, useEffect } from 'react'
import { useDrawStore } from '../../store/useDrawStore'
import './Canvas.css'

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const { mode } = useDrawStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const startDrawing = (e: MouseEvent) => {
      isDrawing.current = true
      ctx.beginPath()
      ctx.moveTo(e.offsetX, e.offsetY)
    }

    const draw = (e: MouseEvent) => {
      if (!isDrawing.current) return

      if (mode === 'brush') {
        ctx.globalCompositeOperation = 'source-over'
        ctx.lineWidth = 4
        ctx.strokeStyle = '#000000'
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
      } else {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineWidth = 20
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
      }
    }

    const stopDrawing = () => {
      isDrawing.current = false
    }

    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('mouseleave', stopDrawing)

    return () => {
      canvas.removeEventListener('mousedown', startDrawing)
      canvas.removeEventListener('mousemove', draw)
      canvas.removeEventListener('mouseup', stopDrawing)
      canvas.removeEventListener('mouseleave', stopDrawing)
    }
  }, [mode])

  const brushCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 256 256'%3E%3Cpath fill='black' d='M232.49,55.51l-32-32a12,12,0,0,0-17,0l-96,96a12,12,0,0,0-3.27,5.63l-12,48A12,12,0,0,0,84,188a12.27,12.27,0,0,0,2.93-.36l48-12A12,12,0,0,0,140.49,172l96-96A12,12,0,0,0,232.49,55.51ZM84,161.94l-9.94-9.94,6.84-27.35,30.45,30.45Zm48-12L108.06,126,172,62.06,195.94,86Zm60-60L168.06,66,180,54.06,203.94,78Z'/%3E%3C/svg%3E") 0 24, crosshair`

const eraserCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 256 256'%3E%3Cpath fill='black' d='M225,80.4,175.6,31a16,16,0,0,0-22.62,0L36.69,147.31a16,16,0,0,0,0,22.63L70.06,203H32a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16H148.28l76.76-76.75A16.47,16.47,0,0,0,225,80.4Zm-11.31,11.31h0L136,169.37,86.63,120,164,42.69,213.31,92Z'/%3E%3C/svg%3E") 0 24, crosshair`

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="canvas"
    style={{ cursor: mode === 'brush' ? brushCursor : eraserCursor }}
    />
  )
}

export default Canvas