import ky from 'ky-universal'
import { API_URL } from '@/lib/const'
import { getSession } from 'next-auth/react'

const http = ky.create({
  prefixUrl: API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const session = await getSession()
        console.log('[session]', session)
        request.headers.set('X-Requested-With', 'ky')
        if (session) {
          request.headers.set('Authorization', `Bearer ${session.jwt}`)
        }
      },
    ],
  },
})

export default http
