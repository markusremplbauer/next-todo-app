import type { GetServerSideProps, NextPage } from 'next';
import { TodosProps } from '@models/props';
import { Todo } from '@models/todo';
import { server } from '@config/index';
import Todos from '@components/Todos';

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${server}/api/todo`);
  const todos: Todo[] = await response.json();

  return { props: { todos: todos } };
};

const Home: NextPage<TodosProps> = ({ todos }: TodosProps) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Todos todos={todos} />
    </div>
  );
};

export default Home;
