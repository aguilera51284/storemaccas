import useSWR from 'swr'
import userFetch from '@/services/user'

function useUserMe() {
  const apiUrl = '/users/me' // Cambia esto según la ruta correcta de tu API

  // Usamos useSWR para gestionar la llamada a la API y el almacenamiento en caché
  const { data, error } = useSWR(apiUrl, userFetch)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useUserMe
