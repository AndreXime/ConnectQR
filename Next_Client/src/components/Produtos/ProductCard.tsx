import Image from 'next/image';

interface ProductCardProps {
	name: string;
	image: string;
	price: string;
}

export default function ProductCard({ name, image, price }: ProductCardProps) {
	return (
		<div className="bg-base-100">
			<div className="mx-auto group lg:mx-auto bg-white transition-all duration-500">
				<Image
					width={1000}
					height={1000}
					src={image}
					alt={name}
					className="w-full h-60 object-cover"
				/>
				<div className="pt-4 px-3 pb-4 bg-base-100">
					<h6 className="text-base leading-6 text-black h-10 line-clamp-2">{name}</h6>
					<h6 className="font-semibold md:text-lg leading-8 text-indigo-600">R$ {price}</h6>
				</div>
			</div>
		</div>
	);
}
