import { useCallback, useEffect, useRef, useState } from 'react'

type TimerProps = {
  timer: number
  onEnd?: () => void
  onStart?: () => void
}

export const useTimer = ({ timer, onEnd, onStart }: TimerProps) => {
  const [seconds, setSeconds] = useState(timer)
  const timerRef = useRef<NodeJS.Timer | null>(null)

  const start = useCallback(() => {
    if (!timerRef.current) {
      onStart?.()
      localStorage.setItem('startTime', String(Date.now() / 1000))
      localStorage.setItem('timer', String(timer))
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev - 1)
      }, 1000)
    }
  }, [onStart, timer])

  useEffect(() => {
    if (timerRef.current) {
      if (seconds < 0) {
        onEnd?.()
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [onEnd, seconds])

  useEffect(() => {
    const now = Date.now() / 1000
    const previousStart = localStorage.getItem('startTime')
    const previousTimer = localStorage.getItem('timer')
    if (previousStart && previousTimer) {
      const newTimer = +previousTimer + +previousStart - now
      if (newTimer > 0) {
        setSeconds(newTimer)
        start()
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [start])

  const formate = (secs: number) => {
    const hours = Math.floor(secs / (60 * 60))

    const divisor_for_minutes = secs % (60 * 60)
    const minutes = Math.floor(divisor_for_minutes / 60)

    const divisor_for_seconds = divisor_for_minutes % 60
    const seconds = Math.ceil(divisor_for_seconds)

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    }
    return obj
  }

  return { start, seconds, formate }
}
