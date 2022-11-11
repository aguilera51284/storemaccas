import FastNewsLatterIcon from '@/components/icons/send-mail.svg';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const NewsLatter = () => {
  return (
    <div className="my-12 w-full bg-black py-6 text-white">
      <div className="container">
        <div className="flex flex-wrap space-x-6 md:flex-nowrap">
          <div className="inline-flex w-full items-center space-x-6 md:w-1/2">
            <FastNewsLatterIcon className="h-24 w-24" />
            <div>
              <span className="text-3xl">Suscribtete a nuestro newsletter</span>
              <br />
              <span className="text-xl text-gray-400">
                y no te pierdas las ofertas y nuevos productos
              </span>
            </div>
          </div>
          <div className="inline-flex w-full items-center space-x-6 md:w-1/2">
            <form onSubmit={(e) => e.preventDefault()} className="w-full">
              <div className='flex items-stretch w-full '>
                <div className="inline-flex w-full items-center rounded-md border border-gray-600 px-2">
                  <EnvelopeIcon className="h-7 w-7 text-gray-200" />
                  <input
                    type="email"
                    placeholder="E-mail"
                    id="email"
                    className="ml-3 w-full bg-transparent p-1 text-gray-200 outline-none"
                  />
                </div>
                <button className="bg-accent-500 flex-shrink-0 text-white uppercase -ml-2 rounded-r-md  py-4 px-6">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLatter;
