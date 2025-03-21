import Link from 'next/link';
import type { ReactNode } from 'react';
import { FaArrowRight, FaBars } from 'react-icons/fa';
import SearchProduto from './SearchProdut';
import type { Categoria } from '@/lib/types';

type HeaderProps = {
	EmpresaName: string;
	children: ReactNode;
	Categorias: Categoria[] | undefined;
};
export default function Header({ EmpresaName, children, Categorias }: HeaderProps) {
	return (
		<div className="drawer">
			<input
				id="my-drawer"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col bg-gradient-to-r from-primary to-secondary">
				<nav className="navbar flex text-primary-content w-full p-3 relative justify-center">
					<label
						htmlFor="my-drawer"
						className="btn btn-square btn-ghost left-3 absolute md:relative md:mr-5">
						<FaBars size={20} />
					</label>

					<Link href={`/${EmpresaName}/produtos`}>
						<h1 className="md:text-left text-center md:ml-4 text-2xl font-bold capitalize">
							{EmpresaName.split('-').join(' ')}
						</h1>
					</Link>

					<div className="hidden md:flex md:flex-1 md:justify-end">
						<SearchProduto
							className="input input-bordered flex items-center gap-2 w-1/2 text-base-content"
							empresa={EmpresaName}
						/>
					</div>
				</nav>
				<div className="md:hidden w-full px-5">
					<SearchProduto
						className="input input-bordered gap-2 w-full my-2 text-base-content"
						empresa={EmpresaName}
					/>
				</div>
				<div className="bg-base-100">{children}</div>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer"
					className="drawer-overlay"></label>
				<ul className="menu bg-base-200 min-h-full w-70 p-4">
					{Categorias && (
						<>
							<h1 className="text-xl font-bold text-center my-3">Categorias</h1>
							<div className="flex flex-col justify-center">
								{Categorias.map((value) => (
									<Link
										key={value.nome}
										href={`/${EmpresaName}/produtos?categoria=${value.nome}`}
										className="btn btn-lg btn-ghost mb-2 justify-between">
										{value.nome} <FaArrowRight />
									</Link>
								))}
							</div>
						</>
					)}
				</ul>
			</div>
		</div>
	);
}
