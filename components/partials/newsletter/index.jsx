import {
  TruckIcon,
  CheckBadgeIcon,
  CursorArrowRaysIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

const NewsLatter = () => {
  return (
    <div className="mt-12 w-full bg-gray-50 py-12">
      <div className="container">
        <div className="flex flex-wrap space-x-6 md:flex-nowrap">
          <div className="w-full text-center md:w-3/4">
            <TruckIcon className="mx-auto h-16 w-16 text-accent-500" />
            <h4 className="text-xl font-semibold text-primary-500">
              Pago y entrega
            </h4>
            <p className="text-sm">
              La entrega de su órden es gratuita para pedidos mayores de
              $10,000.00 pesos.
            </p>
          </div>
          <div className="w-full text-center md:w-3/4">
            <CheckBadgeIcon className="mx-auto h-16 w-16 text-accent-500" />
            <h4 className="text-xl font-semibold text-primary-500">
              Productos garantizados
            </h4>
            <p className="text-sm">
              Garantía al 100% o cambio físico gratuito.
            </p>
          </div>
          <div className="w-full text-center md:w-3/4">
            <CursorArrowRaysIcon className="mx-auto h-16 w-16 text-accent-500" />
            <h4 className="text-xl font-semibold text-primary-500">
              Variedad de productos
            </h4>
            <p className="text-sm">
              Encuentra los mejores productos en nuestro catálogo.
            </p>
          </div>
          <div className="w-full text-center md:w-3/4">
            <ShieldCheckIcon className="mx-auto h-16 w-16 text-accent-500" />
            <h4 className="text-xl font-semibold text-primary-500">
              Seguridad y calidad
            </h4>
            <p className="text-sm">
              Siempre damos la cara en cualquier compra y los productos son de
              la mejor calidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsLatter
