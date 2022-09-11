import { useState } from 'preact/hooks';
import Image from 'next/image';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="w-full shadow">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Link href="/">
            <a
              aria-label="Company"
              title="Company"
              className="inline-flex items-center"
            >
              <Image
                width={160}
                height={52}
                src="/images/logo.jpeg"
                alt="Comercializadora MACCAS"
              />
            </a>
          </Link>
          <div className="hidden flex-1 px-16 md:block">
            <div className="relative max-w-sm">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                className="w-full rounded-md border-2 border-gray-300 bg-white py-2 pr-10 pl-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-primary-300 focus:ring-opacity-40 "
                placeholder="Search"
              />
            </div>
          </div>
          <ul className=" items-center space-x-8 flex">
            <li className="hidden md:inline-flex items-center transition-colors duration-150 ease-in-out hover:text-green-700">
              <PhoneIcon className="mr-2 h-5 w-5 fill-current" />
              <a
                className="font-medium uppercase"
                target="_blank"
                href="https://wa.me/529931055006"
                rel="noreferrer"
              >
                +52 993 105 5006
              </a>
            </li>
            <ShoppingCartIcon className="h-6 w-6 text-gray-800" />
            <UserIcon className="h-6 w-6 text-gray-800" />
          </ul>
        </div>
      </div>
      <div className="bg-black ">
        <div className="container text-white">
          <div className="flex items-center">
            <ul className="hidden md:flex items-center w-full justify-start py-4 flex-1">
              <li className="px-4">
                <Link href="/">
                  <a className="font-medium uppercase hover:text-accent-400 ease-linear duration-150 transition-colors">Inicio</a>
                </Link>
              </li>
              <li className="px-4">
                <Link href="/">
                  <a className="font-medium uppercase hover:text-accent-400 ease-linear duration-150 transition-colors">Quienes somos</a>
                </Link>
              </li>
              <li className="px-4">
                <Link href="/">
                  <a className="font-medium uppercase hover:text-accent-400 ease-linear duration-150 transition-colors">Contacto</a>
                </Link>
              </li>
            </ul>
            <div className="py-2 text-center md:text-right w-full md:w-auto  md:ml-auto flex-shrink-0 items-center text-xs font-medium uppercase">
              Compra mas de $10,000 y el envio es gratis.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
