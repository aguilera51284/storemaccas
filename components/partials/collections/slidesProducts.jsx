import { ChevronRightIcon } from '@heroicons/react/24/solid';
import ProductOne from '@/components/products/product-one';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { OPTIONS_SPLIDE } from '@/lib/const';
import useSWR from 'swr';
import SkeletonProductCard from '@/components/skeletons/productCard';

const SlidesPrducts = ({ title, products, url }) => {
  const { data, error } = useSWR(url);

  if (!data && !error) {
    return (
      <div className="container relative my-12">
        <div className="flex items-center md:space-x-8">
          {Array(4)
            .fill('d')
            .map((e, k) => (
              <div className="w-1/4" key={`${title}-${k}`}>
                <SkeletonProductCard />
              </div>
            ))}
        </div>
      </div>
    );
  }


  return (
    <div className="container relative my-12">
      <Splide
        hasTrack={false}
        aria-label="My Favorite Images"
        options={OPTIONS_SPLIDE}
      >
        <div className="flex items-center ">
          <h1 className="text-2xl font-bold uppercase">{title}</h1>
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
          {data.data.map((product) => (
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
