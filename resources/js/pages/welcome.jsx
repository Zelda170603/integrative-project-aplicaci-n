import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Welcome() {
    return (
        <>
            <Head title="Bienvenidos a OrthoShop" />
            <Layout>
                <div className="gap-8 py-8 px-4 mx-auto max-w-7xl relative lg:py-4">
                    <h1 className="mb-4 font-extrabold tracking-tight text-3xl md:text-6xl background-text dark-background-text bg-clip-text text-transparent">
                        Encuentra soluciones ortopédicas que transformarán tu vida
                    </h1>
                    <p className="mb-6 font-medium dark:text-gray-400 xl:mb-8 md:text-lg lg:text-lg text-gray-700">
                        En OrthoShop, nuestra misión es facilitar el acceso a productos ortopédicos y ortésicos de alta calidad,
                        ayudando a nuestros clientes a mejorar su movilidad y calidad de vida. Descubre una amplia gama de productos
                        diseñados para atender tus necesidades específicas.
                    </p>
                    <div className="sm:gap-16 gap-10 flex items-center sm:flex-row flex-col">
                        <div className="mb-8 text-gray-500 sm:mb-0 dark:text-gray-400">
                            <svg className="mb-3 size-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"></path>
                            </svg>
                            <h2 className="mb-3 text-lg font-semibold dark:text-gray-100 text-gray-900">
                                Nuevos productos cada semana</h2>
                            <p className="mb-4 font-normal">Únete a nuestra comunidad para conocer las últimas innovaciones en
                                productos ortopédicos y ortésicos, diseñados para mejorar tu bienestar y autonomía.
                            </p>
                            <a href="#"
                                className="text-white relative bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Explorar Productos
                            </a>
                        </div>
                        <div className="mb-8 text-gray-500 sm:mb-0 dark:text-gray-400">
                            <svg className="mb-3 size-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                                    clipRule="evenodd"></path>
                            </svg>
                            <h2 className="mb-3 text-lg font-semibold dark:text-gray-100 text-gray-900">
                                Asesoría personalizada</h2>
                            <p className="mb-4 font-normal">Conéctate con especialistas en productos ortopédicos para recibir
                                orientación en la selección de productos adaptados a tus necesidades.
                            </p>
                            <a href="#"
                                className="text-white relative bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Contacta a un Especialista
                            </a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
                        <div>
                            <img className="rounded-xl"
                                src="https://images.unsplash.com/photo-1648737963503-1a26da876aca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&h=900&q=80"
                                alt="Imagen de Productos Ortopédicos" />
                        </div>
                        <div className="mt-5 sm:mt-10 lg:mt-0">
                            <div className="space-y-6 sm:space-y-8">
                                <div className="space-y-2 md:space-y-4">
                                    <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-neutral-200">
                                        Conviértete en un distribuidor certificado
                                    </h2>
                                    <p className="text-gray-500 dark:text-neutral-500">
                                        Únete a OrthoShop y expande tu alcance al ofrecer productos de alta calidad
                                        que mejoran la vida de tus clientes.
                                    </p>
                                </div>
                                <ul className="space-y-2 sm:space-y-4">
                                    <li className="flex gap-x-3">
                                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        <div className="grow">
                                            <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                                                <span className="font-bold">Proceso de registro</span> simple y rápido
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        <div className="grow">
                                            <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                                                Acceso a <span className="font-bold">herramientas avanzadas</span> de gestión
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        <div className="grow">
                                            <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                                                Mejora continua en la <span className="font-bold">experiencia del cliente</span>
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                                <a className="group inline-flex items-center gap-x-2 py-2 px-3 bg-blue-800 font-medium text-sm text-gray-200 rounded-full focus:outline-none" href="/register/fabricante">
                                    <span className="relative text-blue-200 group-hover:text-white">Empezar ahora</span>
                                </a>
                            </div>
                        </div>
                    </div> 
                </div> 
            </Layout>
        </>
    )
}
