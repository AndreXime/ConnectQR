import { PrismaClient } from '@prisma/client';
import { execSync, exec } from 'child_process';

const prisma = new PrismaClient();
const { categoria, empresa, produto } = prisma;

async function main() {
	/* Um exemplo de uma empresa completa e uma vazia */
	const [empresaCriada] = await empresa.createManyAndReturn({
		data: [
			{
				nome: 'amazon',
				email: 'amazon@email.com',
				senha: 'senha123',
				descricao: 'descricao',
				telefone: '123456789',
				instagram: 'instagram',
				emailContato: 'emailemail',
			},
			{
				nome: 'apple',
				email: 'apple@email.com',
				senha: 'senha123',
				descricao: 'descricao',
			},
		],
	});
	const [Categoria, Categoria2, Categoria3] = await categoria.createManyAndReturn({
		data: [
			{ nome: 'Categoria', empresaId: empresaCriada.id },
			{ nome: 'Categoria2', empresaId: empresaCriada.id },
			{ nome: 'Categoria3', empresaId: empresaCriada.id },
		],
		select: { id: true },
	});
	await produto.createMany({
		data: Array.from({ length: 30 }, (_, i) => ({
			nome: `Produto${i + 1}`,
			preco: `${i + 10}`,
			imagemUrl: `http://localhost:4000/uploads/placeholder/produto${[1, 2, 3][i % 3]}.webp`,
			categoriaId: [Categoria.id, Categoria2.id, Categoria3.id][i % 3], // Alternando entre categorias
			empresaId: empresaCriada.id,
		})),
	});
}
try {
	await main();
	console.log('Seed ocorreu com sucesso');
} catch {
	console.log('Ocorreu um erro na seed mas o processo continuara');
}

await prisma.$disconnect();
