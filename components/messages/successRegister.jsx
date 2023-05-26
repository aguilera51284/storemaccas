import Link from 'next/link';
import SentEmailIcon from '@/components/icons/mail-sent.svg';

const SuccessRegister = ({email}) => {
  return (
    <div className="mx-auto flex min-h-min w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg  lg:max-w-4xl">
      <div className="w-full px-6 py-8 text-center">
        <div className="mx-auto mb-8 w-10/12">
          <SentEmailIcon className="mx-auto" />
        </div>
        <h1 className="text-4xl font-semibold text-gray-800">
          Creacion de cuenta correcta
        </h1>
        <p className='mt-8'>
          Recibiras un email al correo de <span className='font-bold'>{email}</span> para confirmar tu cuenta y poder acceder. No
          olvides revisar tu bandeja de correo no desado, si el email no fue
          recivido.
        </p>
        <div className="mt-8 text-center">
          <Link href="/">
            <a className="mr-8 rounded-md border-2  border-transparent bg-accent-500  px-8 py-2 uppercase text-white">
              Regresar al inicio
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessRegister;
