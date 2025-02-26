import { Footer, Header, ProductCard, RedirectButton } from '@/components/Produtos';
import { notFound } from 'next/navigation';
import type { Produto, Categoria } from '@/lib/types';
import Carrosel from '@/components/Produtos/Carrosel';

type dataConfirm = {
	data: {
		produtos: Produto[];
		categorias: Categoria[];
	};
};

type PropsType = {
	naoExiste?: boolean;
	data?: {
		produtos: Produto[];
		categorias: Categoria[];
	};
	pagination?: { PaginaAtual: number; limitePorPagina: number; ProdutosTotal: number; PaginasTotais: number };
	tema?: string;
};

async function montarQueryURL(page: string | undefined, categoria: string | undefined, search: string | undefined) {
	const params: string[] = [];

	if (page) params.push(`page=${page}`);
	if (categoria) params.push(`categoria=${categoria}`);
	if (search) params.push(`search=${search}`);

	if (params.length > 0) {
		return `?${params.join('&')}`;
	}

	return '';
}

async function getProps(nome: string, query: string): Promise<PropsType> {
	const URL = `${process.env.NEXT_PUBLIC_API_URL}/produto/${nome}${query}`;

	try {
		const response = await fetch(URL, { method: 'get', cache: 'no-store' });
		const status = response.status;
		if (status >= 400) {
			return { naoExiste: true };
		} else {
			const { data, pagination, tema } = await response.json();
			return { data, pagination, tema };
		}
	} catch {
		return { naoExiste: true };
	}
}

async function OrganizarProdutos(data: dataConfirm['data']) {
	return data.produtos.reduce((acc: Record<string, Produto[]>, produto) => {
		const categoria = produto.categoria.nome;

		if (!acc[categoria]) {
			acc[categoria] = [];
		}

		acc[categoria].push(produto);
		return acc;
	}, {});
}

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ empresa: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const nomeEmpresa = (await params).empresa;
	const query = await searchParams;

	const queryUrl = await montarQueryURL(
		(query?.page as string) || undefined,
		(query?.categoria as string) || undefined,
		(query?.s as string) || undefined
	);

	const { naoExiste, data, pagination, tema } = await getProps(nomeEmpresa, queryUrl);

	if (naoExiste) {
		notFound();
	}

	let ProdutoPorCategoria: Record<string, Produto[]> = {};
	if (!query?.categoria && !!data && !!pagination) {
		ProdutoPorCategoria = await OrganizarProdutos(data);
	}

	return (
		<div
			data-theme={tema}
			className="flex flex-col min-h-screen">
			{!data || !pagination || data.produtos.length == 0 ? (
				<Header
					Categorias={data?.categorias}
					EmpresaName={nomeEmpresa.split('-').join(' ')}>
					<main className="flex-grow container min-h-screen mx-auto p-4">
						<h1 className="text-2xl font-bold text-center my-5">
							Essa empresa não tem nenhum produto castrado no momento
						</h1>
					</main>
				</Header>
			) : (
				<Header
					Categorias={data.categorias}
					EmpresaName={nomeEmpresa}>
					<main className="flex-grow container min-h-screen px-4 pb-4 mx-auto">
						{!!query?.categoria ? (
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
								<div className="flex justify-center gap-4 mb-5">
									{pagination.PaginasTotais > 1 && (
										<>
											{Array.from({ length: pagination.PaginasTotais }, async (_, index) => (
												<RedirectButton
													key={`${index + 1}`}
													ClassName="btn btn-outline"
													Url={`/${nomeEmpresa}/produtos${await montarQueryURL(
														String(index + 1),
														(query?.categoria as string) || undefined,
														undefined
													)}`}
													buttonText={`${index + 1}`}
												/>
											))}
										</>
									)}
								</div>
								{data.produtos.map((product, index) => (
									<ProductCard
										key={index}
										name={product.nome}
										image={product.imagemUrl}
										price={Number(product.preco).toFixed(2)}
									/>
								))}
							</div>
						) : (
							<div>
								{Object.entries(ProdutoPorCategoria).map(([categoria, produtos], index) => (
									<div key={categoria}>
										<h2 className="text-2xl font-bold p-10 text-center">{categoria}</h2>
										<Carrosel
											key={categoria + index}
											data={produtos}
										/>
									</div>
								))}
							</div>
						)}
					</main>
					<Footer EmpresaName={nomeEmpresa.split('-').join(' ')} />
				</Header>
			)}
		</div>
	);
}
