const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:2026"

export function resolveImg(src) {
    if (!src) return ""
    if (src.startsWith("http")) return src
    return `${baseUrl}/uploads/${src}`
}