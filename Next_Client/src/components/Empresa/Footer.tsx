export default async function Footer({ temaAtual }: { temaAtual: string }) {
	return (
		<footer className="bg-primary text-primary-content p-4">
			<div className="container mx-auto text-center">
				<p>
					Tema atual: <span className="capitalize">{temaAtual}</span>
				</p>
				<p>ConectaQR - Todos os direitos reservados. &copy; {new Date().getFullYear()} </p>
			</div>
		</footer>
	);
}
