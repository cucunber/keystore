export type formatType = 'upper' | 'lower' | 'capitalize'

export const formatText = (text: string, format?: formatType) => {
  switch (format) {
    case 'lower': {
      return text.toLowerCase()
    }
    case 'upper': {
      return text.toUpperCase()
    }
    case 'capitalize': {
      const firstToUpper = (t: string): string => `${t.charAt(0).toUpperCase()}${t.slice(1)}`
      if (Array.from(text.matchAll(new RegExp(/[.!?]/gm))).length) {
        const textReg = new RegExp(/(\w*)[.!?]/gm)
        const parsedText = Array.from(text.matchAll(textReg))
        if (parsedText.length) {
          return parsedText.map(([t]) => firstToUpper(t)).join('')
        }
        return text
      }
      return firstToUpper(text)
    }
    default: {
      return text
    }
  }
}
