import { ORDER_STATUS } from '@/lib/const' // Ajusta la ruta según donde hayas guardado el archivo

function OrderItem({ status }) {
  let statusColor = ''

  switch (status) {
    case ORDER_STATUS.PENDING:
      statusColor = 'bg-pending'
      break
    case ORDER_STATUS.IN_PROGRESS:
      statusColor = 'bg-inProgress'
      break
    case ORDER_STATUS.EN_ROUTE:
      statusColor = 'bg-enRoute'
      break
    case ORDER_STATUS.DELIVERED:
      statusColor = 'bg-delivered'
      break
    default:
      statusColor = 'bg-gray-500' // Color predeterminado en caso de estado desconocido
      break
  }

  return (
    <div
      className={`px-4 py-2 ${statusColor} inline-block rounded-md text-white`}
    >
      {ORDER_STATUS[status]}
    </div>
  )
}

export default OrderItem
