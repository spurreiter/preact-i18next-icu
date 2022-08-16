const globalState = {}

export const reducer = (key, initial) => {
  globalState[key] = globalState[key] ?? initial
  return [(current, next) => {
    globalState[key] = next
    return next
  }, globalState[key]]
}
