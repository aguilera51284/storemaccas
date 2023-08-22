import useSWR from 'swr'
import ordersAccount from '@/services/ordersAccount'

function useOrdersAccounts() {
  const apiUrl = '/orders' // Cambia esto según la ruta correcta de tu API

  // Usamos useSWR para gestionar la llamada a la API y el almacenamiento en caché
  const { data, error } = useSWR(apiUrl, ordersAccount)

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useOrdersAccounts
