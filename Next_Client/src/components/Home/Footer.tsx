import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
	return (
		<div className="bg-base-100 flex justify-center">
			<footer className="footer footer-vertical md:footer-horizontal  pt-10 pb-24 px-4 max-w-6xl text-base-content">
				<div className="">
					<p className="font-bold text-2xl">ConectaQR</p>
					<p className="">Copyright © 2025 - All right reserved</p>
				</div>
				<div>
					<span className="footer-title">Informações</span>
					<Link
						href="/sobre-nos"
						className="link link-hover">
						Sobre nós
					</Link>
					<Link
						href="/feedback"
						className="link link-hover">
						FAQs
					</Link>
				</div>
				<div>
					<span className="footer-title">Legal</span>
					<Link
						href="/termos"
						className="link link-hover">
						Termos e condições
					</Link>
				</div>
				<div>
					<span className="footer-title">Social</span>
					<div className="grid grid-flow-col gap-4">
						<Link href="/">
							<FaFacebookF size={22} />
						</Link>

						<Link href="/">
							<FaInstagram size={22} />
						</Link>

						<Link href="/">
							<FaTwitter size={22} />
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
