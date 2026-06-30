import { useCallback, useEffect, useRef, useState } from 'react'

interface Options {
  initial: number
  min: number
  max: number
}

export function useResizablePanel({ initial, min, max }: Options) {
  const [width, setWidth] = useState(initial)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(initial)

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    dragging.current = true
    startX.current = event.clientX
    startWidth.current = width
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [width])

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!dragging.current) return
      const delta = startX.current - event.clientX
      const next = Math.min(max, Math.max(min, startWidth.current + delta))
      setWidth(next)
    }

    const onMouseUp = () => {
      if (!dragging.current) return
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [min, max])

  return { width, onMouseDown }
}
