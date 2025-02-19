'use client';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
type Props = {
	Url: string;
	buttonText: string;
	ClassName: string;
	key?: string;
};

export default function RedirectButton({ Url, buttonText, ClassName, key }: Props) {
	const router = useRouter();

	const handleClick = () => {
		router.push(Url);
	};

	return (
		<button
			key={key}
			className={ClassName}
			onClick={handleClick}>
			{buttonText} <FaArrowRight />
		</button>
	);
}
