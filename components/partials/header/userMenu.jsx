import { Fragment } from 'preact'
import { Menu, Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/20/solid'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function UserMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md px-4  py-2 text-sm font-medium text-white hover:bg-accent-50 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <UserIcon className="h-6 w-6 text-gray-800" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link href="/account/orders">
                  <a
                    className={`${
                      active ? ' bg-accent-50 text-accent-500' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2`}
                  >
                    Mis órdenes
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="/account/discounts">
                  <a
                    className={`${
                      active ? ' bg-accent-50 text-accent-500' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2`}
                  >
                    Mis descuentos
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`${
                    active ? ' bg-accent-50 text-accent-500' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2`}
                >
                  Cerrar sesion
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
