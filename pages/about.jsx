import Layout from '@/components/layout'
function About() {
  return (
    <Layout>
      <div className="relative md:py-24">
        <div
          className="absolute top-0 left-0 h-full w-full bg-cover bg-center py-12 blur-sm"
          style="background-image: url('/images/bg-about.jpeg')"
        />
        <div className="relative z-10 mx-auto flex min-h-min w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg  lg:max-w-4xl">
          <div className="bg-gray-100 p-8">
            <h2 className="mb-4 text-2xl font-bold">
              En Comercializadora MACCAS
            </h2>
            <p className="mb-6">
              Contamos con más de 6 años de experiencia en el ramo automotriz,
              importando y comercializando autopartes para el mercado de
              repuestos, enfocado al parque vehicular de nuestro país, como son
              vehículos: VW, Nissan, Ford, Chrysler, Chevrolet, Hyundai, entre
              otros.
            </p>
            <p className="mb-6">
              Gracias a la excelente aceptación de nuestras prestigiadas marcas,
              tenemos una cobertura a nivel nacional y para nosotros será un
              placer servirle, poniendo a sus órdenes, a todo nuestro equipo.
            </p>

            <hr className="my-8" />

            <h3 className="mb-4 text-xl font-bold">Misión</h3>
            <p className="mb-6">
              Satisfacer las necesidades de nuestros clientes y proveedores,
              mediante la importación y comercialización de autopartes. A fin de
              generar un mejor servicio y calidad a precios competitivos.
              Desarrollando así, una empresa donde nuestros socios comerciales
              puedan confiar.
            </p>

            <h3 className="mb-4 text-xl font-bold">Visión</h3>
            <p className="mb-6">
              Ser reconocidos a nivel nacional como una empresa líder en la
              comercialización de productos automotrices con un personal
              comprometido y altamente capacitado para negociar con nuestros
              socios comerciales. Ofreciendo así la perfecta combinación de
              servicio, calidad y precio.
            </p>

            <h3 className="mb-4 text-xl font-bold">Valores</h3>
            <p>
              En Comercializadora MACCAS le exigimos a nuestro equipo de trabajo
              y/o colaboradores honestidad, respeto, responsabilidad, equidad y
              lo más importante lealtad a nuestra misión.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
