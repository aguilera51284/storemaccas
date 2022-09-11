import Layout from '@/components/layout';
import http from '@/lib/http';
import qs from 'qs';
import currency from 'currency.js';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
//import DetailTwo from '@/components/partials/product/details/detail-two';
import ProductGallery from '@/components/partials/product/gallery';
//import InfoOne from '@/components/partials/product/info-tabs/info-one';
//import RelatedProductsOne from '@/components/partials/product/related/related-one';

const ProductDetail = ({ product }) => {
  console.log(product);
  return (
    <Layout>
      <div className="container my-12">
        <div className="flex space-x-6">
          {/** Gallery */}
          <div className="w-full md:w-1/2">
            <ProductGallery product={product} />
          </div>
          {/** Information */}
          <div className="w-full md:w-1/2">
            <h1 className="text-6xl font-bold uppercase">{`${product.attributes.code} ${product.attributes.year} `}</h1>
            <h4 className="mt-4 uppercase text-gray-500">
              {product.attributes.description}
            </h4>
            <div className="mt-12 flex items-center ">
              <h3 className="text-3xl font-semibold">
                {currency(product.attributes.price).format()}
              </h3>
              <button className="ml-auto inline-flex items-center rounded-md bg-accent-500 py-4 px-6 uppercase text-white">
                <ShoppingCartIcon className="h-5 w-5" />
                <span className="ml-2">Agregar a carrito</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex border-b border-gray-200 ">
            <button className="  -mb-px h-10 whitespace-nowrap border-b-2 border-accent-500 bg-transparent px-4 py-2 text-center  text-accent-600 focus:outline-none ">
              Caracteristicas
            </button>

            <button disabled className=" cursor-base -mb-px h-10 whitespace-nowrap border-b-2 border-transparent bg-transparent px-4 py-2 text-center  text-gray-700 hover:border-gray-400 focus:outline-none  sm:text-base disabled:opacity-40">
              Ratings
            </button>
          </div>
          <div className='mt-4'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat inventore nisi explicabo quia aspernatur blanditiis, officiis dicta eaque sunt atque fugiat natus ipsa veritatis quis, delectus velit quidem dolores voluptate!
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articlesRes = await http.get('products', { fields: ['slug'] }).json();

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const articlesRes = await http
    .get(
      `products?${qs.stringify({
        filters: {
          slug: params.slug,
        },
        populate: ['gallery', 'cardBrand', 'productBrand'],
      })}`,
    )
    .json();

  return {
    props: { product: articlesRes.data[0] },
    revalidate: 60,
  };
}

export default ProductDetail;
