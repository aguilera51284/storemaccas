import Header from '@/components/partials/header';
import Footer from '@/components/partials/footer';
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
      </div>
  );
};
export default Layout;
