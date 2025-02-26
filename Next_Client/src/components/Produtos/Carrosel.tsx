'use client';
import type { Produto } from '@/lib/types';
import { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import Glide, { Swipe, Breakpoints, Autoplay } from '@glidejs/glide/dist/glide.modular.esm';
import '@glidejs/glide/dist/css/glide.core.min.css';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

type Prop = {
	data: Produto[];
	categoria: string;
	urlCategoria: string;
};

export default function Slider({ data, categoria, urlCategoria }: Prop) {
	const sliderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!sliderRef.current) return;
		const slider = new Glide(sliderRef.current, {
			type: 'slider',
			gap: 10,
			autoplay: 5000,
			perView: 4,
			rewind: false,
			bound: true,
			touchRatio: 1,
			breakpoints: {
				768: { perView: 2 },
				1024: { perView: 3 },
			},
		});

		slider.mount({ Swipe, Breakpoints, Autoplay });

		// Limpeza ao desmontar o componente
		return () => {
			slider.destroy();
		};
	}, []);

	return (
		<div
			ref={sliderRef}
			className="glide">
			<div
				className="glide__track"
				data-glide-el="track">
				<ul className="glide__slides">
					{data.map((produto) => (
						<li
							className="glide__slide"
							key={produto.nome + produto.preco}>
							<ProductCard
								name={produto.nome}
								price={produto.preco}
								image={produto.imagemUrl}
							/>
						</li>
					))}
					<li className="glide__slide">
						<Link href={urlCategoria}>
							<div className="bg-base-100 rounded-xl">
								<div className="w-full h-85 overflow-hidden flex gap-10 flex-col items-center justify-center">
									<FaArrowRight size={50} />
									<h6 className="text-lg text-center font-semibold leading-6 text-base-content h-12 line-clamp-2">
										Ver mais de {categoria}
									</h6>
								</div>
							</div>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
