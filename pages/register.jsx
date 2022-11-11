import { useRef, useState } from 'preact/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '@/components/layout';
import RegisterSchema from '@/schema/register';
import http from '@/lib/http';
import SuccessRegister from '@/components/messages/successRegister';


const RegisterPage = () => {
  const captchaRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState(null);
  const [errorBackend, setErrorBackend] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = async (data) => {
    try {
      const result = await http
        .post('auth/local/register', {
          json: { ...data, username: data.email },
        })
        .json();
      setEmail(result.user.email);
      setSuccess(true);
    } catch (error) {
      setErrorBackend(
        'Un error inesperado surgio en nuestro sistema. Ya fuimos notificados, intentenelo mas tarde o comuniquese al telefono 993 105 5006',
      );
    }
  };
  // HCaptcha events
  const onExpire = () => {
    console.log('hCaptcha Token Expired');
    setError('token', {
      type: 'custom',
      message: 'El token del captcha expiro',
    });
  };

  const onError = (err) => {
    console.log(`hCaptcha Error: ${err}`);
    setError('token', {
      type: 'custom',
      message:
        'Nuestro proveedor de captcha fallo, ya hemos sido notificados. Intentelo mas tarde.',
    });
  };

  return (
    <Layout>
      <div className="bg-slate-100 py-12 md:py-24">
        {success ? (
          <SuccessRegister email={email} />
        ) : (
          <div class="mx-auto flex min-h-min w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg  lg:max-w-4xl">
            <div
              class="hidden lg:block lg:w-1/2"
              style="background-image: url('/images/register.jpg');"
            ></div>

            <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <Link href="/">
                <Image
                  src="/images/logo.jpeg"
                  width={300}
                  height={104}
                  alt="Maccas"
                />
              </Link>

              <p class="text-center text-xl text-gray-600 ">
                Cree una nueva cuenta.
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="mt-4">
                  <label class="mb-2 block text-sm font-medium text-gray-600 ">
                    * Email
                  </label>
                  <input
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                    type="email"
                    {...register('email')}
                  />
                  <p className="mt-2 text-sm text-red-500 ">
                    {errors.email?.message || ''}
                  </p>
                </div>

                <div class="mt-4">
                  <div class="flex justify-between">
                    <label class="mb-2 block text-sm font-medium text-gray-600 ">
                      * Password
                    </label>
                    <a href="#" class="text-xs text-gray-500 hover:underline ">
                      Forget Password?
                    </a>
                  </div>

                  <input
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                    type="password"
                    {...register('password')}
                  />
                  <p className="mt-2 text-sm text-red-500 ">
                    {errors.password?.message || ''}
                  </p>
                </div>

                <div class="mt-4">
                  <label class="mb-2 block text-sm font-medium text-gray-600 ">
                    * Telefono
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

                <div class="mt-4">
                  <label class="mb-2 block text-sm font-medium text-gray-600 ">
                    Nombre de la compania
                  </label>
                  <input
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                    type="text"
                    {...register('companyName')}
                  />
                  <p className="mt-2 text-sm text-red-500 ">
                    {errors.companyName?.message || ''}
                  </p>
                </div>
                {/** Hcaptcha */}
                <div className="pt-8">
                  <div className="flex justify-center">
                    {process.env.NODE_ENV === 'production' && (
                      <HCaptcha
                        // This is testing sitekey, will autopass
                        // Make sure to replace
                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_CLIENT}
                        onVerify={(token, ekey) => setValue('token', token)}
                        onError={onError}
                        onExpire={onExpire}
                        ref={captchaRef}
                      />
                    )}
                  </div>
                  <p className="mt-2 text-sm text-red-500 ">
                    {errors.token?.message || ''}
                  </p>
                </div>

                {errorBackend && (
                  <p className="mt-4 block w-full rounded border border-accent-100 bg-accent-50 py-1 text-center text-accent-500">
                    {errorBackend}
                  </p>
                )}

                {/** Button Action */}
                <div class="mt-8">
                  <button
                    type="submit"
                    className="w-full transform rounded bg-primary-700 px-4 py-2 tracking-wide text-white transition-colors duration-300 hover:bg-primary-600 focus:bg-gray-600 focus:outline-none disabled:opacity-30"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className=" gg-spinner mx-auto" />
                    ) : (
                      <span>Registrarse</span>
                    )}
                  </button>
                </div>
              </form>

              <div class="mt-4">
                <p className="text-sm font-bold text-gray-600">
                  <span>Ya tienes cuenta? Inicia sesion</span>
                  <Link href="login">
                    <a
                      href="#"
                      class="pl-2  text-xs uppercase text-primary-500 hover:underline "
                    >
                      aqui
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RegisterPage;
