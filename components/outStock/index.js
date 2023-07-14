const OutStock = ({ outStock, idProduct }) => {
  const hasOutStock = outStock.find((o) => o.id === idProduct)
  if (!hasOutStock) {
    return null
  }

  return (
    <div
      className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <span className="font-medium">Fuera de stock!</span> Por el momento este
      producto no cuenta con stock.
    </div>
  )
}

export default OutStock
