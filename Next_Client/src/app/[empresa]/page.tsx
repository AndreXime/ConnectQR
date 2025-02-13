import { Header, Footer } from '@/components/Empresa';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type InfoType = {
	descricaoCurta?: string;
	descricao?: string;
	maps?: string;
	contato?: string;
	tema: string;
	nomeEmpresa: string;
};

async function getCompanyInfo(nomeEmpresa: string): Promise<InfoType | null> {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresas?nome=${nomeEmpresa}`, { method: 'get' });
		if (!response.ok) {
			throw Error;
		} else {
			return await response.json();
		}
	} catch {
		return null;
	}
}

export default async function Page({ params }: { params: Promise<{ empresa: string }> }) {
	const nomeEmpresa = (await params).empresa;
	const info = await getCompanyInfo(nomeEmpresa);
	if (!info) {
		notFound();
	}

	return (
		<div
			data-theme={info.tema}
			className="flex flex-col min-h-screen bg-base-100">
			<Header
				Icon={false}
				EmpresaName={nomeEmpresa.split('-').join(' ')}
			/>
			<main className="flex-grow flex-col my-8 mx-2 lg:mx-52">
				<div className="flex flex-col">
					<h2 className="text-center text-lg">
						{info.descricao || info.descricaoCurta || 'Não foi informado nenhuma descrição'}
					</h2>
				</div>
				<div className="flex flex-col items-center gap-4 mt-15">
					<Link
						className="btn btn-primary font-bold text-lg w-full lg:w-1/2"
						href={`/${nomeEmpresa}/produtos`}>
						<FaShoppingCart />
						Visitar produtos
					</Link>

					{info.maps ? (
						<iframe
							src={info.maps}
							width="600"
							height="600"
							className="border-0 w-full h-full"
							allowFullScreen={false}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"></iframe>
					) : (
						<></>
					)}
				</div>
			</main>

			<Footer temaAtual={info.tema} />
		</div>
	);
}
