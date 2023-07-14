const ProductListSkeleton = () => {
  return (
    <div
      role="status"
      className="max-w-md animate-pulse space-y-4   p-4 shadow md:p-6"
    >
      {Array(8)
        .fill(1)
        .map(() => (
          // eslint-disable-next-line react/jsx-key
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 "></div>
              <div className="h-2 w-32 rounded-full bg-gray-200 "></div>
            </div>
            <div className="h-2.5 w-12 rounded-full bg-gray-300 "></div>
          </div>
        ))}

      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default ProductListSkeleton
