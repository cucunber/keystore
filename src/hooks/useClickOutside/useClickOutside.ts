import { RefObject } from 'react'
import useEventListener from 'hooks/useEventListener/useEventListener'

type Handler = (event: MouseEvent) => void

export function useOnClickOutside<
  T extends HTMLElement = HTMLElement,
  B extends HTMLElement = HTMLElement,
>(
  ref: RefObject<T>,
  handler: Handler,
  btnRef?: RefObject<B>,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEventListener(mouseEvent, (event: any) => {
    const el = ref?.current
    const btn = btnRef?.current
    // Do nothing if clicking ref's element or descendent elements
    if ((el && el.contains(event.target as Node)) || (btn && btn.contains(event.target as Node))) {
      return
    }

    // Explicit type for "mousedown" event.
    handler(event as unknown as MouseEvent)
  })
}
