import { API_URL } from '@/lib/const'
/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = '') {
  return `${API_URL || 'http://localhost:1337'}${path}`
}

export function getStrapiMedia(media) {
  const { url } = media?.data?.attributes || media?.attributes || media
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url
  return imageUrl
}
