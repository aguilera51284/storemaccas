import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';
import currency from 'currency.js';
import Link from 'next/link';

const ProductOne = ({ product }) => {
  return (
    <article className="border border-gray-300">
      <div className="p-16">
        <Link href={`/products/${product.attributes.slug}`}>
          <a>
            <figure className="aspect-w-4 aspect-h-3 relative bg-primary-100">
              <Image
                src={
                  product.attributes.thumbnail
                    ? getStrapiMedia(product.attributes.thumbnail)
                    : 'https://maccas.s3.us-east-2.amazonaws.com/127533130_no_hay_icono_de_imagen_disponible_vector_plano_078e2631d2.jpg?updated_at=2022-09-19T21:07:56.108Z'
                }
                layout="fill"
                objectFit="cover"
                alt={`Product-${product.attributes.code}`}
              />
            </figure>
          </a>
        </Link>
      </div>
      <div className="py-4 px-6 text-center">
        <Link href={`/products/${product.attributes.slug}`}>
          <a>
            <span className="block  text-lg font-semibold text-gray-800">
              {`${product.attributes.code} `}
            </span>
            {product.attributes.productBrand && (
              <span className="block text-sm text-gray-600">
                {`${product.attributes.productBrand.data.attributes.name} ${product.attributes.year}`}
              </span>
            )}
          </a>
        </Link>
        <div className="mt-6 flex items-center uppercase">
          <span className="text-lg font-semibold">
            {currency(product.attributes.price).format()}
          </span>
          <div className="ml-auto rounded-lg border-2 border-accent-500 p-2">
            <ShoppingCartIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductOne;
