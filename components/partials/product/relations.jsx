import SkeletonProductCard from '@/components/skeletons/productCard'
import { OPTIONS_SPLIDE } from '@/lib/const'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import ProductOne from '@/components/products/product-one'

const ProductRelations = ({ isLoading, products, title }) => {
  return (
    <div className="my-12 w-full">
      {isLoading ? (
        <div className="mt-6 grid md:grid-cols-4">
          <SkeletonProductCard />
          <SkeletonProductCard />
          <SkeletonProductCard />
          <SkeletonProductCard />
        </div>
      ) : (
        <Splide
          hasTrack={false}
          aria-label="productos relacionados"
          options={OPTIONS_SPLIDE}
        >
          <div className="flex items-center ">
            <h2 className="text-xl font-bold uppercase">{title}</h2>
            <div className="splide__arrows ">
              <button className="splide__arrow splide__arrow--prev splide__arrow-custom">
                <ChevronRightIcon className="!h-10 !w-10 fill-current !text-black" />
              </button>
              <span className="mx-2 block h-10 w-1 border-l-2 border-gray-300" />
              <button className="splide__arrow splide__arrow--next splide__arrow-custom ">
                <ChevronRightIcon className="!h-10 !w-10 fill-current !text-black" />
              </button>
            </div>
          </div>
          <SplideTrack className="mt-8">
            {products.data.map((product) => (
              <SplideSlide key={product.id}>
                <ProductOne product={product} key={product.id} />
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      )}
    </div>
  )
}

ProductRelations.defaultProps = {
  title: 'Productos relacionados',
}

export default ProductRelations
