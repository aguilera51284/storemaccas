import Layout from '@/components/layout';
import http from '@/lib/http';
import qs from 'qs';
import { useRouter } from 'next/router';
import currency from 'currency.js';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import snarkdown from 'snarkdown';
import { filterXSS } from 'xss';
import ProductGallery from '@/components/partials/product/gallery';
import ProductRelations from '@/components/partials/product/relations';
import useSwr from 'swr';

const ProductDetail = ({ product }) => {
  const router = useRouter();
  const { data, error } = useSwr(
    product?.id
      ? `products?${qs.stringify({
          pagination: {
            limit: 12,
          },
          filters: {
            $or: [
              {
                productBrand: {
                  slug: {
                    $eq: product.attributes.productBrand.data.attributes.slug,
                  },
                },
              },
              {
                carBrand: {
                  slug: {
                    $eq: product.attributes.carBrand.data.attributes.slug,
                  },
                },
              },
            ],
            id: {
              $notIn: [product.id],
            },
          },
          populate: ['thumbnail', 'productBrand'],
        })}`
      : null,
  );

  if (router.isFallback) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container my-12">
        <div className="flex flex-wrap space-x-6 md:flex-nowrap">
          {/** Gallery */}
          <div className="w-full md:w-1/2">
            <ProductGallery product={product} />
          </div>
          {/** Information */}
          <div className="w-full md:w-1/2">
            <h1 className="text-6xl font-bold uppercase">{`${product.attributes.code}`}</h1>
            <h4 className="mt-2 uppercase text-gray-600">
              {product.attributes.description}
            </h4>
            {/** List */}
            <ul className="my-6 mx-auto w-2/3">
              <li className="flex items-center justify-center  space-x-6 py-2 text-lg">
                <label htmlFor="brand" className="w-1/2 font-semibold">
                  Equivalencia:
                </label>
                <span className="w-1/2 text-gray-700">
                  {product.attributes.equivalence}
                </span>
              </li>
              <li className="flex items-center justify-center  space-x-6 py-2 text-lg">
                <label htmlFor="brand" className="w-1/2 font-semibold">
                  Marca Producto:
                </label>
                <span className="w-1/2 text-gray-700">
                  {product.attributes.productBrand.data.attributes.name}
                </span>
              </li>
              <li className="flex items-center justify-center  space-x-6 py-2 text-lg">
                <label htmlFor="brand" className="w-1/2 font-semibold">
                  Compatibilidad:
                </label>
                <span className="w-1/2 text-gray-700">
                  {product.attributes.carBrand.data.attributes.name}
                </span>
              </li>
              <li className="flex items-center justify-center  space-x-6 py-2 text-lg">
                <label htmlFor="brand" className="w-1/2 font-semibold">
                  Año:
                </label>
                <span className="w-1/2 text-gray-700">
                  {product.attributes.year}
                </span>
              </li>
            </ul>

            <div className="mt-12 flex items-center ">
              <h3 className="text-3xl font-semibold">
                {currency(product.attributes.price).format()}
              </h3>
              <button disabled={!product.attributes.stock >= 1} className="ml-auto inline-flex items-center rounded-md bg-accent-500 py-4 px-6 uppercase text-white">
                <ShoppingCartIcon className="h-5 w-5" />
                <span className="ml-2">Agregar a carrito</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex border-b border-gray-200 ">
            <button className="  -mb-px h-10 whitespace-nowrap border-b-2 border-accent-500 bg-transparent px-4 py-2 text-center  text-accent-600 focus:outline-none ">
              Caracteristicas
            </button>

            <button
              disabled
              className=" cursor-base -mb-px h-10 whitespace-nowrap border-b-2 border-transparent bg-transparent px-4 py-2 text-center  text-gray-700 hover:border-gray-400 focus:outline-none  disabled:opacity-40 sm:text-base"
            >
              Ratings
            </button>
          </div>
          <div className="my-8">
            <div
              dangerouslySetInnerHTML={{
                __html: filterXSS(snarkdown(product.attributes.features)),
              }}
            />
          </div>
        </div>
        <div className="mt-12 w-full">
          <ProductRelations isLoading={!error && !data} products={data} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articlesRes = await http.get('products', { fields: ['slug'] }).json();

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const articlesRes = await http
    .get(
      `products?${qs.stringify({
        filters: {
          slug: params.slug,
        },
        populate: ['gallery', 'carBrand', 'productBrand'],
      })}`,
    )
    .json();

  console.log(articlesRes.data[0]);
  return {
    props: { product: articlesRes.data[0] },
    revalidate: 60,
  };
}

export default ProductDetail;
