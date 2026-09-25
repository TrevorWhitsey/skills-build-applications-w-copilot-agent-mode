import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const codespaceHostMatch = window.location.hostname.match(/^(.+)-5173\.app\.github\.dev$/)
const inferredCodespaceName = codespaceHostMatch?.[1]
const apiCodespaceName = codespaceName || inferredCodespaceName

export const apiBaseUrl = apiCodespaceName
  ? `https://${apiCodespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function extractItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  return []
}

export function useApiCollection(endpoint) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      try {
        setLoading(true)
        setError('')

        const requestUrl = endpoint.startsWith('http')
          ? endpoint
          : `${apiBaseUrl}${endpoint}`
        const response = await fetch(requestUrl, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setItems(extractItems(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('Unable to load this data right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [endpoint])

  return { items, error, loading }
}