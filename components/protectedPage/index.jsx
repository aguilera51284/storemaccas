import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Spinner from '@/components/icons/spinner.svg'

const ProtectedPage = ({ children }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className=" h-16 w-16 animate-spin" />
      </div>
    )
  }

  if (!session) {
    // Redirigir al inicio de sesión si no hay una sesión activa
    router.push('/login') // Cambia '/login' a la ruta de inicio de sesión de tu aplicación
    return null
  }

  // Si hay una sesión activa, renderizar el contenido de la ruta protegida
  return children
}

export default ProtectedPage
