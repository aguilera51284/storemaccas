import http from '@/lib/http'
import qs from 'qs'

const ordersDetail = async (reference) => {
  return await http
    .get('orders', {
      searchParams: qs.stringify(
        {
          filters: {
            reference: {
              $eq: reference,
            },
          },
          populate: {
            orderProducts: {
              populate: {
                productReference: {
                  populate: {
                    thumbnail: true,
                  },
                },
              },
            },
            orderAddress: true,
          },
        },
        { encode: false }
      ),
    })
    .json()
}

export default ordersDetail
