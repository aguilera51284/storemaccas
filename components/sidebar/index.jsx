import qs from 'qs'
import { useRouter } from 'next/router'
import { dset } from 'dset'
import delve from 'dlv'

function ShopSidebarOne(props) {
  const { toggle = false, tags, carBrands, productBrand } = props
  const router = useRouter()
  const query = qs.parse(router.asPath.split('?')[1])

  // function onChangePriceRange(value) {
  //   setRange(value)
  // }

  function containsAttrInUrl(type, value) {
    const hasValueInQuery = delve(query, `filters.${type}.slug.$eq`)
    return hasValueInQuery && hasValueInQuery.includes(value)
  }

  function normalizeArrayValue(value, attr) {
    let arrayValue = [value]
    const currentQueries = delve(query, `filters.${attr}.slug.$eq`)
    if (currentQueries) {
      arrayValue = [...currentQueries, value]
      if (currentQueries.includes(value)) {
        arrayValue = arrayValue.filter((item) => item !== value)
      }
    }
    return arrayValue
  }

  function onAttrClick(e, attr, value) {
    let dQuery = query
    dset(dQuery, `filters.${attr}`, {
      slug: { $eq: normalizeArrayValue(value, attr) },
    })
    router.push(
      `${router.pathname}?${qs.stringify(
        { filters: dQuery.filters },
        { encode: false }
      )}`
    )
  }

  return (
    <>
      <aside className="overflow-hidden rounded border border-gray-200">
        <div className="flex justify-between border-t border-gray-200 bg-blue-50 px-5 py-3">
          <label className="text-xs font-bold">Filtros:</label>
          <a
            href={router.pathname}
            className="rounded text-xs font-medium text-gray-600 underline"
            //scroll={false}
          >
            Limpiar
          </a>
        </div>
        <div className={toggle ? 'sidebar-filter-wrapper' : ''}>
          <div className="border-t border-gray-200 lg:border-t-0">
            <h3 className="widget-title mb-2">
              <a
                href="#Size"
                className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium"
              >
                Armadora
              </a>
            </h3>
            <div>
              <div className="space-y-2 px-5 py-4">
                <div className="filter-items">
                  {productBrand.data.map((item, index) => (
                    <div className="filter-item" key={index}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded text-accent-500"
                          id={`productBrand-${index + 1}`}
                          onChange={(e) =>
                            onAttrClick(e, 'productBrand', item.attributes.slug)
                          }
                          checked={
                            containsAttrInUrl(
                              'productBrand',
                              item.attributes.slug
                            )
                              ? true
                              : false
                          }
                        />
                        <label
                          className="ml-2 font-medium uppercase"
                          htmlFor={`productBrand-${index + 1}`}
                        >
                          {item.attributes.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 lg:border-t-0">
            <h3 className="widget-title mb-2">
              <a
                href="#Size"
                className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium"
              >
                Tags
              </a>
            </h3>
            <div>
              <div className="space-y-2 px-5 py-4">
                <div className="filter-items">
                  {tags.data.map((item, index) => (
                    <div className="filter-item" key={index}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded text-accent-500"
                          id={`tags-${index + 1}`}
                          onChange={(e) =>
                            onAttrClick(e, 'tags', item.attributes.slug)
                          }
                          checked={
                            containsAttrInUrl('tags', item.attributes.slug)
                              ? true
                              : false
                          }
                        />
                        <label
                          className="ml-2 font-medium uppercase"
                          htmlFor={`tags-${index + 1}`}
                        >
                          {item.attributes.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 lg:border-t-0">
            <h3 className="widget-title mb-2">
              <a
                href="#colour"
                className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium"
              >
                Marca del producto:
              </a>
            </h3>
            <div>
              <div className="space-y-2 px-5 py-4">
                <div className="filter-items">
                  {carBrands.data.map((item, index) => (
                    <div className="filter-item" key={index}>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded text-accent-500"
                          id={`brands-${index + 1}`}
                          onChange={(e) =>
                            onAttrClick(e, 'carBrand', item.attributes.slug)
                          }
                          checked={
                            containsAttrInUrl('carBrand', item.attributes.slug)
                              ? true
                              : false
                          }
                        />
                        <label
                          className="ml-2 font-medium uppercase"
                          htmlFor={`brands-${index + 1}`}
                        >
                          {item.attributes.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default ShopSidebarOne
