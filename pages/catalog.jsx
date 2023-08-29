import { useState, useMemo, useEffect } from 'preact/hooks'
import Layout from '@/components/layout'
import ShopSidebarOne from '@/components/sidebar'
import http from '@/lib/http'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import SkeletonProductCard from '@/components/skeletons/productCard'
import ProductOne from '@/components/products/product-one'
import qs from 'qs'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Pagination from '@/components/pagination'

const Catalog = ({ tags, carBrands, productBrand }) => {
  const router = useRouter()
  const [input, setInput] = useState()
  const query = useMemo(() => qs.parse(router.asPath.split('?')[1]), [router])
  const [perPage] = useState(10)
  const { data: products, error } = useSWR(
    `products?${qs.stringify(
      {
        filters: query.filters,
        populate: ['thumbnail', 'productBrand', 'model'],
        pagination: {
          pageSize: perPage,
          page: query?.pagination?.page || 1,
        },
        sort: query.sort,
      },
      { encode: false }
    )}`
  )
  const loading = !products && !error
  const totalCount = products && products.meta.pagination.total

  function onSortByChange(e) {
    let queryObject = router.query
    let url = router.pathname.replace('[type]', query.type) + '?'
    for (let key in queryObject) {
      if (key !== 'type' && key !== 'sort') {
        url += key + '=' + queryObject[key] + '&'
      }
    }

    router.push(url + 'sort=' + e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push(
      `/catalog?${qs.stringify(
        {
          filters: {
            $or: [
              {
                description: {
                  $containsi: input,
                },
              },
              {
                code: {
                  $containsi: input,
                },
              },
            ],
          },
        },
        { encode: false }
      )}`
    )
  }

  useEffect(() => {
    // Obtener los parámetros de la URL
    const queryParams = qs.parse(router.query)
    console.log(queryParams)
    if (queryParams.filters && queryParams.filters.$or) {
      const descriptionFilterParam =
        queryParams.filters.$or[0]?.description?.$containsi
      setInput(descriptionFilterParam)
    }
  }, [router.query])

  return (
    <Layout>
      <>
        <div className="mb-16">
          <div className="bg-gray-100">
            <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 ">
              <div className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl">
                <div>
                  <p className="bg-teal-accent-400 mb-4 inline-block rounded-full px-3 py-px text-xs font-semibold uppercase tracking-wider text-teal-900">
                    Maccas
                  </p>
                </div>
                <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                  <span className="relative inline-block">
                    <svg
                      viewBox="0 0 52 24"
                      fill="currentColor"
                      className="absolute top-0 left-0 z-0 -mt-8 -ml-20 hidden w-32 text-blue-400 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
                    >
                      <defs>
                        <pattern
                          id="dc223fcc-6d72-4ebc-b4ef-abe121034d6e"
                          x="0"
                          y="0"
                          width=".135"
                          height=".30"
                        >
                          <circle cx="1" cy="1" r=".7" />
                        </pattern>
                      </defs>
                      <rect
                        fill="url(#dc223fcc-6d72-4ebc-b4ef-abe121034d6e)"
                        width="52"
                        height="24"
                      />
                    </svg>
                    <span className="relative">Explora</span>
                  </span>{' '}
                  nuestro catalogo que tenemos para ti.
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container pb-12">
          <div className="flex flex-wrap space-x-6 md:flex-nowrap">
            <div className="w-1/3">
              <ShopSidebarOne
                tags={tags}
                carBrands={carBrands}
                productBrand={productBrand}
              />
            </div>
            <div className="w-2/3">
              <div className="my-4">
                <form className="relative max-w-sm" onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </button>
                  <input
                    type="text"
                    className="w-full rounded-md border-2 border-gray-300 bg-white py-2 pr-10 pl-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-primary-300 focus:ring-opacity-40 "
                    placeholder="Search"
                    required
                    value={input}
                    onChange={(e) =>
                      e.target.value.trim() === ''
                        ? null
                        : setInput(e.target.value)
                    }
                  />
                </form>
              </div>
              <div className="flex items-center py-6">
                <p className="text-normal font-medium">
                  Total:
                  <span className="text-accent-500">{totalCount}</span>{' '}
                  productos
                </p>
                <div className="ml-auto">
                  <div className="toolbox-sort">
                    <label
                      htmlFor="sortby"
                      className="font-sm pb-2 font-medium"
                    >
                      Ordenar por:
                    </label>
                    <div className="">
                      <select
                        name="sortby"
                        id="sortby"
                        className="form-select mt-2 border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                        onChange={onSortByChange}
                        value={query.sort ? query.sort : 'default'}
                      >
                        <option value="default">Default</option>
                        <option value="priceTax:desc">Mayor Precio</option>
                        <option value="priceTax:asc">Menor Precio</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3">
                {loading
                  ? Array(12)
                      .fill(1)
                      .map((v, k) => <SkeletonProductCard key={k} />)
                  : products.data.map((product) => (
                      <ProductOne key={product.id} product={product} />
                    ))}
              </div>
              <div>
                {products && (
                  <Pagination pagination={products.meta.pagination} />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { res } = context
  const getCarBrands = http
    .get('car-brands?pagination%5Blimit%5D=-1&populate[]=thumbnail')
    .json()

  const getProductBrand = http
    .get('product-brands?pagination%5Blimit%5D=-1&populate[]=thumbnail')
    .json()

  const getTags = http
    .get(
      'tags?pagination%5Blimit%5D=-1&populate[]=thumbnail&filters%5BvisibleInSearch%5D%5B%24eq%5D=true'
    )
    .json()
  const [carBrands, tags, productBrand] = await Promise.all([
    getCarBrands,
    getTags,
    getProductBrand,
  ])

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {
      productBrand,
      carBrands,
      tags,
    }, // will be passed to the page component as props
  }
}

export default Catalog
