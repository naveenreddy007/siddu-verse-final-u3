"use client"
import { useEffect, useRef, useCallback } from "react"

export function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback((ctx: CanvasRenderingContext2D, frameCount: number) => {
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const time = frameCount * 0.001

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = "#101010"
    ctx.fillRect(0, 0, width, height)

    const lineCount = 50
    const speed = 0.05

    for (let i = 0; i < lineCount; i++) {
      const progress = (i / lineCount + time * speed) % 1
      const y = progress * height

      const alpha = Math.sin(progress * Math.PI) * 0.1
      const hue = (time * 10 + i * 5) % 360

      ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${alpha})`
      ctx.beginPath()
      for (let x = 0; x < width; x += 10) {
        const yOffset = Math.sin(x * 0.02 + time * 2 + i * 0.1) * 20 * Math.sin(progress * Math.PI)
        ctx.lineTo(x, y + yOffset)
      }
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fill()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    let frameCount = 0
    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [draw])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
