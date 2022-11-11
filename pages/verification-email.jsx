import Layout from '@/components/layout';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const VerificationEmail = () => {
  const router = useRouter();
  const { confirmation } = router.query;
  const { data, error } = useSWR(
    confirmation
      ? `auth/email-confirmation?confirmation=${confirmation}`
      : null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  console.log(data, error)

  return (
    <Layout>
      <div className="bg-slate-100 py-12 md:py-24">
        <div class="mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md ">
          <div class="p-8">
            <Link href="/">
              <Image
                src="/images/logo.jpeg"
                width={300}
                height={104}
                alt="Maccas"
              />
            </Link>
            <div className="mt-8  hidden text-center">
              <h3 className="text-xl font-semibold">
                Error al confirmar email
              </h3>
            </div>

            {!data && !error ? (
              <div className="mt-8 block text-center">
                <span className="gg-spinner mx-auto text-accent-500" />
                <p className="mt-4 text-xl font-semibold">
                  Estamos verificando tu email, por favor no cierre ni recargue
                  la pagina.
                </p>
              </div>
            ) : (
              <div className="mt-8 block text-center">
                {error ? (
                  <>
                    <p className="mt-4">
                      No pudimos validar el email, revisa tu correo y copia la
                      liga correctamente, si el problema persiste comunicate al
                      :
                      <a
                        href="tel:9931055006"
                        className="text-accent-500 hover:underline"
                      >
                        993 105 5006
                      </a>
                    </p>
                    <Link href="/">
                      <a className="mt-12 block text-2xl font-bold text-accent-400 hover:text-accent-500 hover:underline">
                        Ir al incio
                      </a>
                    </Link>
                  </>
                ) : (
                  <div>Todo bien HDSP</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerificationEmail;
