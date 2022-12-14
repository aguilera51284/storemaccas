import Link from 'next/link';
import Layout from '@/components/layout';
import http from '@/lib/http';
import Banner from '@/components/banner';
import SlidesPrducts from '@/components/partials/collections/slidesProducts';
import {
  getTagsForHome,
  getTopProducts,
  slidesByPosition,
  getMostSelling
} from '@/lib/queries';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';
import NewsLetterForm  from '@/components/partials/newsletter';

export default function Home({ homeBanner, topProducts, tagsHome, mostSelling }) {
  return (
    <Layout>
      {/* Main Banner */}
      <Banner slides={homeBanner.data} />
      {/** Top products */}
      <SlidesPrducts products={topProducts} title="Productos Top" />
      {/** Tags Home */}
      <div className="container">
        <div className="flex items-center">
          <span className="text-xl font-semibold uppercase">
            Nuestros productos
          </span>

          <Link href="/catalog">
            <a className="ml-auto rounded-md border-2 border-accent-500 py-1 px-4 font-medium uppercase  transition-colors duration-150 ease-linear hover:bg-accent-500 hover:text-white">
              Ver mas
            </a>
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tagsHome.map((tag) => (
            <div
              key={tag.id}
              className="rounded bg-gray-100 transition-all duration-100 ease-out hover:bg-accent-600 hover:text-white"
            >
              <div className="flex items-center space-x-8 px-6 py-4">
                <div className=" w-1/2">
                  <span className="text-xl font-medium uppercase">
                    {tag.attributes.description}
                  </span>
                </div>
                <div className="w-1/2 text-center">
                  <Image
                    src={getStrapiMedia(tag.attributes.thumbnail)}
                    width={120}
                    height={120}
                    alt={tag.attributes.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* NewsLetterForm */}
      <NewsLetterForm />
      {/** Most selling */}
      <SlidesPrducts products={mostSelling} title="Productos mas vendidos" />
    </Layout>
  );
}

export async function getStaticProps() {
  const homeBanner = await http
    .get(`banners?${slidesByPosition('HOME')}`)
    .json();

  const topProducts = await http.get(`products?${getTopProducts}`).json();

  const tagsHome = await http.get(`tags?${getTagsForHome}`).json();
  const mostSelling = await http.get(`products?${getMostSelling}`).json();

  return {
    props: {
      homeBanner: homeBanner.data[0].attributes.slides,
      topProducts: topProducts.data,
      tagsHome: tagsHome.data,
      mostSelling: mostSelling.data
    },
    revalidate: 360
  };
}
