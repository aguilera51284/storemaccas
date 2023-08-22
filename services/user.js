import http from '@/lib/http'
import qs from 'qs'

const user = async () => {
  return await http
    .get(
      `users/me?${qs.stringify({
        populate: {
          Discounts: {
            populate: {
              productBrand: true,
            },
          },
        },
      })}`
    )
    .json()
}

export default user
