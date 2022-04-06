import { todo } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { getAllTodos } from '../lib/db';

export const getServerSideProps: GetServerSideProps = async () => {
  const todos = await getAllTodos();
  return {
    props: {
      todos,
    },
  };
};

type PostProps = {
  todos: todo[];
};

const Home = ({ todos }: PostProps) => {
  const [description, setDescription] = useState('');

  useEffect(() => {}, [description]);

  const handlerClickPost = async () => {
    await fetch('/api/todo', {
      method: 'POST',
      body: JSON.stringify(description),
    });
  };

  return (
    <div className="h-screen bg-gray-500">
      <nav className="flex justify-center p-4 bg-gray-600">
        <h1 className="text-white text-2xl font-bold">
          Todo list App com Next.JS + Prisma + PlanetScale
        </h1>
      </nav>
      <div>
        <form className="flex justify-center mt-10">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h1 className="text-center mb-4">Escreva a tarefa</h1>
            <div className="flex space-x-2 p-2 bg-white rounded-md">
              <input
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                type="text"
                placeholder="Escreva aqui..."
                className="w-full outline-none"
              />
              <button
                onClick={() =>
                  description === '' ? alert('Preencha o campo') : handlerClickPost()
                }
                className="bg-green-500 px-2 py-1 rounded-md text-white font-semibold"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
        <div>
          {todos?.map((item, index) => (
            <div key={item.id} className="flex justify-center">
              <div className=" relative justify-center mt-6">
                <div className="absolute flex top-0 right-0 p-3 space-x-1"></div>
                <span className="absolute -left-3 -top-3 bg-green-500 flex justify-center items-center rounded-full w-8 h-8 text-gray-50 font-bold">
                  {index + 1}
                </span>
                <p className="bg-white px-12 py-8 rounded-lg w-80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
