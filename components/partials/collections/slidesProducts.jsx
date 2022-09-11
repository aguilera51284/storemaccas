import {ChevronRightIcon} from '@heroicons/react/24/solid'
import ProductOne from '@/components/products/product-one';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { OPTIONS_SPLIDE } from '@/lib/const';

const SlidesPrducts = ({ title, products }) => {
  return (
    <div className="container my-12 relative">
      <Splide
        hasTrack={false}
        aria-label="My Favorite Images"
        options={OPTIONS_SPLIDE}
      >
        <div className="flex items-center ">
          <h1 className="text-2xl uppercase font-bold">{title}</h1>
          <div className="splide__arrows ">
            <button className="splide__arrow splide__arrow--prev splide__arrow-custom">
              <ChevronRightIcon className="!w-10 !h-10 fill-current !text-black" />
            </button>
            <span className="w-1 h-10 block border-l-2 border-gray-300 mx-2" />
            <button className="splide__arrow splide__arrow--next splide__arrow-custom ">
              <ChevronRightIcon className="!w-10 !h-10 fill-current !text-black" />
            </button>
          </div>
        </div>
        <SplideTrack className="mt-8">
          {products.map((product) => (
            <SplideSlide key={product.id}>
              <ProductOne product={product} key={product.id} />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </div>
  );
};

SlidesPrducts.defaultProps = {
  title: 'Productos',
  products: [],
};

export default SlidesPrducts;
