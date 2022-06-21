export type AnyFunction = (...args: any[]) => any

export type AsyncField<T> = T & {
  isLoading: boolean
}
