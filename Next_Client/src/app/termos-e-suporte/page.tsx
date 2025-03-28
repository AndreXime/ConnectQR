import { Drawer, Footer } from '@/components/Home';
import Feedback from './Feedback';
export default async function CompaniesPage() {
	return (
		<Drawer>
			<div className="min-h-dvh bg-base-100 py-7 px-4 flex flex-col justify-center gap-8">
				<Feedback />
				<div className="card shadow-2xl bg-base-100 mx-auto lg:max-w-1/2">
					<div className="card-body">
						<h1 className="text-3xl font-bold mb-4">Termos de Uso e Política de Privacidade</h1>

						<section className="mb-6">
							<h2 className="text-xl font-semibold mb-2">1. Introdução</h2>
							<p className="text-base-content">
								Bem-vindo ao nosso serviço! Ao acessar nosso site, você concorda com os seguintes termos e condições.
							</p>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold mb-2">2. Uso das Informações</h2>
							<p className="text-base-content">
								Utilizamos suas informações apenas para fins de comunicação e personalização do serviço. Não vendemos
								seus dados para terceiros.
							</p>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold mb-2">3. Segurança dos Dados</h2>
							<p className="text-base-content">
								Implementamos medidas de segurança para proteger suas informações, mas não podemos garantir segurança
								absoluta.
							</p>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold mb-2">4. Alterações nos Termos</h2>
							<p className="text-base-content">
								Podemos modificar estes termos a qualquer momento. As alterações serão notificadas em nosso site.
							</p>
						</section>

						<div className="mt-6">
							<p className="text-sm text-gray-500">Última atualização: Fevereiro de 2025</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</Drawer>
	);
}
