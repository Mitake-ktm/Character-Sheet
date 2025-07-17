export function getContrastColor(hex: string): string {
  const color = hex.replace("#", "")
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? "#000" : "#fff"
}

export function darkenColor(hex: string, amount: number): string {
  const color = hex.replace("#", "")
  const num = parseInt(color, 16)
  const r = Math.max(0, (num >> 16) - amount * 255)
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount * 255)
  const b = Math.max(0, (num & 0x0000ff) - amount * 255)
  return `rgb(${r}, ${g}, ${b})`
}