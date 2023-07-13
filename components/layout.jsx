import Header from '@/components/partials/header'
import Footer from '@/components/partials/footer'
import { Toaster } from 'react-hot-toast'

const Layout = ({ children }) => {
  return (
    <div className="page">
      <div className="page__header">
        <Header />
      </div>
      <main className="page__main">{children}</main>
      <div className="page__footer">
        <Footer />
      </div>
      <Toaster position="top-right" />
    </div>
  )
}
export default Layout
