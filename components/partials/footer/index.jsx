import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-black py-4 text-white ">
      <div className="container mx-auto p-6">
        <div className="lg:flex">
          <div className="-mx-6 w-full lg:w-2/5">
            <div className="px-6">
              <div>
                <a
                  href="#"
                  className="text-xl font-bold text-gray-200 hover:text-gray-300  "
                >
                  <Image
                    width={160}
                    height={52}
                    src="/images/logo-removebg.png"
                    alt="Comercializadora MACCAS"
                  />
                </a>
              </div>
              <p className="mt-2 max-w-sm text-white ">
                Join 31,000+ other and never miss out on new tips, tutorials,
                and more.
              </p>
              <div className="-mx-2 mt-6 flex">
                <a
                  href="#"
                  className="mx-2  transition-colors duration-300 hover:text-accent-500"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-0 lg:flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <h3 className="uppercase text-gray-300 ">About</h3>
                <a href="#" className="mt-2 block text-sm  hover:underline ">
                  Company
                </a>
                <a href="#" className="mt-2 block text-sm  hover:underline ">
                  community
                </a>
                <a href="#" className="mt-2 block text-sm  hover:underline ">
                  Careers
                </a>
              </div>
              <div>
                <h3 className="uppercase text-gray-300 ">Blog</h3>
                <a href="#" className="mt-2 block text-sm  hover:underline ">
                  Tec
                </a>
                <a href="#" className="mt-2 block text-sm  hover:underline ">
                  Music
                </a>
                <a href="#" className="mt-2 block text-sm  hover:underline ">
                  Videos
                </a>
              </div>
              <div>
                <h3 className="uppercase text-gray-300 ">Products</h3>
                <a href="#" className="mt-2 block text-sm  hover:underline ">
                  Mega cloud
                </a>
                <a href="#" className="mt-2 block text-sm  hover:underline ">
                  Aperion UI
                </a>
                <a href="#" className="mt-2 block text-sm  hover:underline ">
                  Meraki UI
                </a>
              </div>
              <div>
                <h3 className="uppercase text-gray-300 ">Contact</h3>
                <span className="mt-2 block text-sm  hover:underline ">
                  +1 526 654 8965
                </span>
                <span className="mt-2 block text-sm  hover:underline ">
                  example@email.com
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 h-px border-none bg-gray-200 " />
        <div>
          <p className="text-center text-white ">
            © Brand 2020 - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
