import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';
import currency from 'currency.js';

const ProductList = ({ product }) => {
  return (
    <div className="flex space-x-8 mb-8">
      <figure className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={
            product.thumbnail
              ? getStrapiMedia(product.thumbnail)
              : 'https://maccas.s3.us-east-2.amazonaws.com/127533130_no_hay_icono_de_imagen_disponible_vector_plano_078e2631d2.jpg?updated_at=2022-09-19T21:07:56.108Z'
          }
          layout="fill"
          objectFit="cover"
          alt={`Product-${product.code}`}
        />
      </figure>
      <div className="w-full">
        <Link href={`/products/${product.slug}`}>
          <a>
            <span className="block  text-lg font-semibold text-gray-800">
              {`${product.code} `}
            </span>
            {product.productBrand && (
              <span className="block text-sm text-gray-600">
                {`${product.productBrand.name} ${product.year}`}
              </span>
            )}
            <span className='mt-2 font-medium text-gray-800 text-lg'>{`${product.quantity}x${currency(product.totalPrice).format()} `}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
