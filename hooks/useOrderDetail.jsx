import useSWR from 'swr'
import orderDetail from '@/services/orderDetail'

function useOrdersDetail(reference) {
  const apiUrl = reference ? `/orders/${reference}` : null // Cambia esto según la ruta correcta de tu API

  // Usamos useSWR para gestionar la llamada a la API y el almacenamiento en caché
  const { data, error } = useSWR(apiUrl, () => orderDetail(reference))

  return {
    order: Array.isArray(data?.data) ? data.data[0] : {},
    isLoading: !error && !data,
    isError: error,
  }
}

export default useOrdersDetail
