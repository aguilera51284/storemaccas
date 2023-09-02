import { useRouter } from 'next/router'
import { useState, useEffect, useMemo } from 'react'
import qs from 'qs'

const Pagination = ({ pagination }) => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState('1')
  //const pageSize = pagination.limit
  //const totalResults = pagination.total
  const totalPages = pagination.pageCount
  console.log(totalPages)
  const pages = useMemo(() => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => (i + 1).toString())
    } else {
      if (currentPage <= 6) {
        return ['1', '2', '3', '4', '5', '6', '7', '...', totalPages.toString()]
      } else if (currentPage >= totalPages - 5) {
        return [
          '1',
          '...',
          (totalPages - 6).toString(),
          (totalPages - 5).toString(),
          (totalPages - 4).toString(),
          (totalPages - 3).toString(),
          (totalPages - 2).toString(),
          (totalPages - 1).toString(),
          totalPages.toString(),
        ]
      } else {
        return [
          '1',
          '...',
          (currentPage - 2).toString(),
          (currentPage - 1).toString(),
          currentPage.toString(),
          (currentPage + 1).toString(),
          (currentPage + 2).toString(),
          '...',
          totalPages.toString(),
        ]
      }
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    // Obtener el número de página de los parámetros de la URL
    const queryPage = parseInt(pagination.page, 10) || 1
    setCurrentPage(queryPage.toString())
  }, [pagination])

  const handlePageClick = (page) => {
    if (page === '...' || page === currentPage) {
      return
    }

    setCurrentPage(page)

    // Construir el objeto de query con el nuevo número de página
    const queryObject = {
      pagination: {
        page,
      },
    }

    // Navegar a la nueva URL con el número de página actualizado
    router.push(`/catalog?${qs.stringify(queryObject, { encode: false })}`)
  }

  const isPreviousDisabled = currentPage === '1'
  const isNextDisabled = currentPage === totalPages.toString()

  return (
    <div className="mx-auto mt-12 max-w-screen-xl px-4 text-gray-600 md:px-8">
      {/* Resto del componente... */}
      <ul className="flex items-center justify-center">
        <li>
          <a
            href="javascript:void(0)"
            className={`rounded-tl-lg rounded-bl-lg border border-r-0 px-2 py-3 hover:bg-gray-50 hover:text-indigo-600 ${
              isPreviousDisabled ? 'pointer-events-none opacity-50' : ''
            }`}
            onClick={() =>
              !isPreviousDisabled &&
              handlePageClick((parseInt(currentPage, 10) - 1).toString())
            }
          >
            <span className="inline-flex flex-row-reverse items-center gap-x-2">
              Anterior
            </span>
          </a>
        </li>
        {/* Resto del código... */}
        {pages.map((item) => (
          <li key={item} className="">
            {item === '...' ? (
              <span className="border border-l-0 px-4 py-3">{item}</span>
            ) : (
              <a
                href="javascript:void(0)"
                onClick={() => handlePageClick(item)}
                aria-current={currentPage === item ? 'page' : false}
                className={`border border-l-0 px-4 py-3 duration-150 hover:bg-indigo-50 hover:text-indigo-600 ${
                  currentPage === item
                    ? 'bg-indigo-50 font-medium text-indigo-600'
                    : ''
                }`}
              >
                {item}
              </a>
            )}
          </li>
        ))}
        <li>
          <a
            href="javascript:void(0)"
            className={`rounded-tr-lg rounded-br-lg border border-l-0 px-2 py-3 hover:bg-gray-50 hover:text-indigo-600 ${
              isNextDisabled ? 'pointer-events-none opacity-50' : ''
            }`}
            onClick={() =>
              !isNextDisabled &&
              handlePageClick((parseInt(currentPage, 10) + 1).toString())
            }
          >
            <span className="inline-flex items-center gap-x-2">Siguiente</span>
          </a>
        </li>
        {/* Resto del código... */}
      </ul>
      {/* Resto del componente... */}
    </div>
  )
}

export default Pagination
