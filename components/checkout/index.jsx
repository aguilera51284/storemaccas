import { useSession } from 'next-auth/react';
import AuthRequired from '@/components/icons/login-required.svg';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import LoginSchema from '@/schema/address';
import { STATES_MEXICO } from '@/lib/const';
import useSWR from 'swr';
import http from '@/lib/http';
import { serializeCartList } from '@/lib';
import { useStore } from '@/store';
import ProductListSkeleton from '@/components/skeletons/productList';
import SummarySkeleton from '@/components/skeletons/summary';
import ProductList from '@/components/products/productList';
import currency from 'currency.js';

const CheckoutComponent = () => {
  const cartList = useStore((state) => state['@@cart']);
  const { data: session } = useSession();
  const { data, error } = useSWR(
    'summary',
    async () =>
      await http
        .post('summary', {
          json: {
            products: serializeCartList(cartList),
          },
        })
        .json(),
  );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  if (!session) {
    return (
      <div className="w-100 py-12 text-center md:py-12">
        <div className="mx-auto mb-12 max-w-md">
          <AuthRequired className="mx-auto" />
        </div>
        <h3 className="text-3xl font-semibold md:text-5xl">
          Inicio de sesion es requerido.
        </h3>
        <p className="mx-auto mt-8 max-w-xl text-base text-gray-600">
          Para poder realizar un pedido es necesario contar con un usuario
          dentro de nuestra web.Si no tienes una cuenta aun, podras crear una
          con uno de los links siguientes
        </p>
        <div className="my-12 flex justify-center">
          <Link href="/login">
            <a className="mr-8 rounded-md border-2 border-accent-500 px-8 py-2 uppercase">
              Iniciar sesion
            </a>
          </Link>
          <Link href="/register">
            <a className="mr-8 rounded-md border-2  border-transparent bg-accent-500  px-8 py-2 uppercase text-white">
              Crear cuenta
            </a>
          </Link>
        </div>
      </div>
    );
  }

  console.log('----------', data);

  return (
    <div className="flex py-12 md:space-x-8">
      <div className="w-2/3">
        <div className="border border-slate-200 bg-white px-8 py-12 shadow">
          <div className=" block border-b border-gray-300 pb-4 text-2xl font-bold">
            Datos de envio
          </div>
          <form className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-600 ">
                Nombre(s)
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                type="text"
                {...register('firstName')}
              />
              <p className="mt-2 text-sm text-red-500 ">
                {errors.firstName?.message || ''}
              </p>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-600 ">
                Apellidos
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                type="text"
                {...register('lastName')}
              />
              <p className="mt-2 text-sm text-red-500 ">
                {errors.lastName?.message || ''}
              </p>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-600 ">
                Telefono
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                type="text"
                {...register('phone')}
              />
              <p className="mt-2 text-sm text-red-500 ">
                {errors.phone?.message || ''}
              </p>
            </div>
            <div className="col-span-2">
              <label class="mb-2 block text-sm font-medium text-gray-600 ">
                Direccion
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                type="text"
                {...register('phone')}
              />
              <p className="mt-2 text-sm text-red-500 ">
                {errors.phone?.message || ''}
              </p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-600 ">
                Numero exterior
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                type="text"
                {...register('numExt')}
              />
              <p className="mt-2 text-sm text-red-500 ">
                {errors.numExt?.message || ''}
              </p>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-600 ">
                Colonia
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                type="text"
                {...register('colony')}
              />
              <p className="mt-2 text-sm text-red-500 ">
                {errors.colony?.message || ''}
              </p>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-600 ">
                Estado
              </label>
              <select
                className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                {...register('state')}
              >
                {STATES_MEXICO.map((s) => (
                  <option key={s.clave} value={s.nombre}>
                    {s.nombre}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-red-500 ">
                {errors.state?.message || ''}
              </p>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-600 ">
                Ciudad
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                type="text"
                {...register('city')}
              />
              <p className="mt-2 text-sm text-red-500 ">
                {errors.city?.message || ''}
              </p>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-600 ">
                Municipio (opcional)
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                type="text"
                {...register('province')}
              />
              <p className="mt-2 text-sm text-red-500 ">
                {errors.province?.message || ''}
              </p>
            </div>
            <div className="col-span-2">
              <label class="mb-2 block text-sm font-medium text-gray-600 ">
                Referencias (opcional)
              </label>
              <textarea
                className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                {...register('address2')}
              ></textarea>
              <p className="mt-2 text-sm text-red-500 ">
                {errors.address2?.message || ''}
              </p>
            </div>
            <div className="col-span-2 text-right">
              <button className="rounded-md bg-accent-500 px-8 py-2 font-semibold uppercase text-white">
                Crear orden
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/3 bg-gray-100">
        <div className="px-4 py-8">
          <p className="border-b border-gray-300 pb-2 text-2xl font-bold">
            Sumario
          </p>
          {!data && !error ? (
            <>
              <div className="mt-12 max-h-80 w-full overflow-y-auto">
                <ProductListSkeleton />
              </div>
              <div className="mt-12 px-8">
                <SummarySkeleton />
              </div>
            </>
          ) : (
            <>
              <div className="mt-12">
                {data.products.map((p) => (
                  <ProductList key={p.id} product={p} />
                ))}
              </div>
              <hr />
              <ul className='py-12'>
                <li className='flex items-center py-2 text-xl '>
                  <span>SubTotal:</span>
                  <span className='ml-auto'>{currency(data.totalPrice).format()}</span>
                </li>
                <li className='flex items-center py-2 text-xl '>
                  <span>Descuentos:</span>
                  <span className='ml-auto'>{currency(data.totalDiscounts).format()}</span>
                </li>
                <li><hr /></li>
                <li className='flex items-center py-4 text-2xl font-bold'>
                  <span>Total:</span>
                  <span className='ml-auto'>{currency(data.total).format()}</span>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
