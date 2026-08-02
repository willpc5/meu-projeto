import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Criptografa a senha com bcrypt (10 salt rounds)
  const senhaHash = await bcrypt.hash('admin123', 10);

  // 2. Cria ou atualiza o usuário admin para evitar duplicidade
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@email.com' },
    update: {}, // Se já existir, não altera nada
    create: {
      email: 'admin@email.com',
      senha: senhaHash,
      nome: 'Administrador'
    }
  });

  console.log('✅ Usuário Administrador criado com sucesso:', admin.email);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao criar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });