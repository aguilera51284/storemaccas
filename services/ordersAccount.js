import http from '@/lib/http'

const ordersAccount = async () => {
  return await http.get('orders/account').json()
}

export default ordersAccount
