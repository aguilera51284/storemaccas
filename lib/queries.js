import qs from 'qs'

export const getTagsForHome = qs.stringify({
  filters: {
    visibleInHome: {
      $eq: true,
    },
  },
  populate: ['thumbnail'],
})

export const getTopProducts = qs.stringify({
  filters: {
    tags: {
      slug: {
        $eq: 'top',
      },
    },
  },
  populate: ['thumbnail', 'productBrand'],
})

export const getMostSelling = qs.stringify({
  filters: {
    tags: {
      slug: {
        $eq: 'mas-vendidos',
      },
    },
  },
  populate: ['thumbnail', 'productBrand'],
})

export const slidesByPosition = (position = 'HOME') =>
  qs.stringify({
    position: position,
    populate: ['slides.cover'],
  })
