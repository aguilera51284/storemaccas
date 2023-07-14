import '../styles/globals.css'
import { SWRConfig } from 'swr'
import http from '@/lib/http'
import { Provider, useCreateStore } from '@/store'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

function App({ Component, pageProps: { session, ...pageProps } }) {
  const createStore = useCreateStore(pageProps.initialZustandState)
  const router = useRouter()
  return (
    <SessionProvider session={session}>
      <Provider createStore={createStore}>
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher: async (resource, init) => {
              return await http.get(resource, init).json()
            },
            onError: async (error) => {
              const { response } = error
              if (response.status === 400) {
                const textError = await response.text()
                const objError = JSON.parse(textError)
                if (objError.error.message === 'OUT_STOCK') {
                  createStore()
                    .getState()
                    .addOutStockItems(objError.error.details.summary.data, true)
                  toast.error(objError.error.details.summary.displayMessage)
                  router.push('/cart')
                  return objError
                }
              }
              if (error.status !== 403 && error.status !== 404) {
                // We can send the error to Sentry,
                // or show a notification UI.
              }
            },
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </Provider>
    </SessionProvider>
  )
}

export default App
