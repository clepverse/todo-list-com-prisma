import { prisma } from './prisma';

export async function getAllTodos() {
  const data = await prisma.todo.findMany();
  return data;
}

export async function createTodo(description: string) {
  await prisma.todo.create({
    data: {
      description,
    },
  });
}
