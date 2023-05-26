const OutStock = ({ outStock, idProduct }) => {
  const hasOutStock = outStock.find(o =>  o.id === idProduct);
  if(!hasOutStock){
    return null;
  }

  return (
    <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
      <span class="font-medium">Fuera de stock!</span> Por el momento este producto no cuenta con stock.
    </div>
  );
}

export default OutStock;
