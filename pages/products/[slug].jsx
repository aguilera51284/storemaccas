import Layout from '@/components/layout'
import http from '@/lib/http'
import qs from 'qs'
import { useRouter } from 'next/router'
import currency from 'currency.js'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import snarkdown from 'snarkdown'
import { filterXSS } from 'xss'
import ProductGallery from '@/components/partials/product/gallery'
import ProductRelations from '@/components/partials/product/relations'
import useSwr from 'swr'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'

const ProductDetail = ({ product }) => {
  const router = useRouter()
  let OR_DATA = []
  if (product) {
    if (product.attributes.productBrand.data) {
      OR_DATA.push({
        productBrand: {
          slug: {
            $eq: product.attributes.productBrand.data.attributes.slug,
          },
        },
      })
    }
    if (product.attributes.carBrand.data) {
      OR_DATA.push({
        carBrand: {
          slug: {
            $eq: product.attributes.carBrand.data.attributes.slug,
          },
        },
      })
    }
  }
  const { data, error } = useSwr(
    product?.id
      ? `products?${qs.stringify(
          {
            pagination: {
              limit: 12,
            },
            filters: {
              $or: OR_DATA,
              id: {
                $notIn: [product.id],
              },
            },
            populate: ['thumbnail', 'productBrand'],
          },
          {
            encode: process.env.NODE_ENV !== 'production',
          }
        )}`
      : null
  )

  if (router.isFallback) {
    return (
      <Layout>
        <div className="container py-12">
          <div
            role="status"
            className="animate-pulse space-y-8 md:flex md:items-center md:space-y-0 md:space-x-8"
          >
            <div className="flex h-48 w-full items-center justify-center rounded bg-gray-300 sm:w-96">
              <svg
                className="h-12 w-12 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
            <div className="w-full">
              <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200"></div>
              <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-gray-200"></div>
              <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
              <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200"></div>
              <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200"></div>
              <div className="h-2 max-w-[360px] rounded-full bg-gray-200"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </Layout>
    )
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

              {product.attributes.productBrand.data && (
                <li className="flex items-center justify-center  space-x-6 py-2 text-lg">
                  <label htmlFor="brand" className="w-1/2 font-semibold">
                    Marca Producto:
                  </label>
                  <span className="w-1/2 text-gray-700">
                    {product.attributes.productBrand.data.attributes.name}
                  </span>
                </li>
              )}

              {product.attributes.carBrand.data && (
                <li className="flex items-center justify-center  space-x-6 py-2 text-lg">
                  <label htmlFor="brand" className="w-1/2 font-semibold">
                    Compatibilidad:
                  </label>
                  <span className="w-1/2 text-gray-700">
                    {product.attributes.carBrand.data.attributes.name}
                  </span>
                </li>
              )}

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
              {product.attributes.hasDiscount ? (
                <div className="inline-flex items-center">
                  <h3 className="mr-2 text-3xl font-semibold text-red-500">
                    {currency(product.attributes.totalPriceTax).format()}
                  </h3>
                  <h3 className="text-3xl font-semibold line-through opacity-50">
                    {currency(product.attributes.priceTax).format()}
                  </h3>
                </div>
              ) : (
                <h3 className="text-3xl font-semibold">
                  {currency(product.attributes.priceTax).format()}
                </h3>
              )}
              <button
                disabled={!product.attributes.stock >= 1}
                className="ml-auto inline-flex items-center rounded-md bg-accent-500 py-4 px-6 uppercase text-white"
              >
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
            {product.attributes.features && (
              <div
                dangerouslySetInnerHTML={{
                  __html: filterXSS(snarkdown(product.attributes.features)),
                }}
              />
            )}
          </div>
        </div>
        <div className="mt-12 w-full">
          <ProductRelations isLoading={!error && !data} products={data} />
        </div>
      </div>
    </Layout>
  )
}

// export async function getStaticPaths() {
//   const articlesRes = await http.get('products', { fields: ['slug'] }).json();

//   return {
//     paths: articlesRes.data.map((article) => ({
//       params: {
//         slug: article.attributes.slug,
//       },
//     })),
//     fallback: true,
//   };
// }

export async function getServerSideProps({ params, ...ctx }) {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

  const extended = http.extend({
    headers: {
      ...(session ? { Authorization: `Bearer ${session.jwt}` } : {}),
    },
  })

  const articlesRes = await extended
    .get(
      `products?${qs.stringify({
        filters: {
          slug: params.slug,
        },
        populate: ['gallery', 'carBrand', 'productBrand'],
        select: ['carBrand.name'],
      })}`
    )
    .json()
  console.log(articlesRes.data[0])
  return {
    props: { product: articlesRes.data[0] },
    //revalidate: 60,
  }
}

export default ProductDetail
