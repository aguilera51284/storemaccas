import { createRef, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';

const ProductGallery = ({ product }) => {
  const mainSlide = createRef(null);
  const thumbnailSlide = createRef(null);

  useEffect(() => {
    console.log(mainSlide)
    if (mainSlide.current && thumbnailSlide.current) {
      mainSlide.current.sync(thumbnailSlide.current.splide);
    }
  }, [mainSlide,thumbnailSlide ]);

  return (
    <div>
      <Splide
        options={{
          arrows: false,
          pagination: false,
        }}
        id="mainSlide"
        className="aspect-w-4 aspect-h-3 relative border border-gray-300 "
        ref={(slider) => (mainSlide.current = slider)}
      >
        {product.attributes.gallery.data.map((galleryImage) => (
          <SplideSlide key={product.id} className="p-8">
            <div className=" relative h-full w-full">
              <Image
                src={getStrapiMedia(galleryImage)}
                layout="fill"
                alt={galleryImage.attributes.ash}
                objectFit="cover"
                priority
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>

      <Splide
        options={{
          gap: 10,
          rewind: true,
          pagination: false,
          isNavigation: true,
          arrows: false,
          perPage: 6,
        }}
        id="thumbnailSlide"
        ref={(slider) => (thumbnailSlide.current = slider)}
        className="mt-6"
      >
        {product.attributes.gallery.data.map((galleryImage) => (
          <SplideSlide key={`thumb-${product.id}`} className="p-6">
            <div className="aspect-w-4 aspect-h-3 relative">
              <Image
                src={getStrapiMedia(galleryImage)}
                layout="fill"
                alt={galleryImage.attributes.ash}
                objectFit="cover"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default ProductGallery;
