import { Todo } from '@models/todo';
import { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react';
import Row from '@components/Row';
import AddTodo from '@components/AddTodo';

export interface TodosProps {
  todos: Todo[];
}

const Todos: FunctionComponent<TodosProps> = (props: TodosProps) => {
  const [todos, setTodos] = useState<Todo[]>(props.todos);
  const [task, setTask] = useState<string>('');
  const todosLength = todos.length;
  const hasTodos = todos.length > 0;
  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  const fetchTodos = async () => {
    const response = await fetch('/api/todo');
    const data: Todo[] = await response.json();
    setTodos(data);
  };

  const addTodo = async (task: string) => {
    const response = await fetch('/api/todo', {
      method: 'POST',
      body: JSON.stringify({
        task: task,
        completed: false,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await fetchTodos();
  };

  const updateTodo = async (todo: Todo) => {
    todo.completed = !todo.completed;
    const response = await fetch(`/api/todo/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    const response = await fetch(`/api/todo/${id}`, { method: 'DELETE' });
    await fetchTodos();
  };

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setTask(value);
  };

  const handleSubmitTodo = async (e: FormEvent) => {
    e.preventDefault();
    await addTodo(task);
  };

  return (
    <section className="flex w-10/12 max-w-2xl flex-col items-center lg:w-1/2">
      <AddTodo
        handleChange={handleChange}
        handleSubmitTodo={handleSubmitTodo}
        task={task}
      />
      <div className="h-10" />
      {todos.map((todo) => (
        <Row
          key={todo.id}
          todo={todo}
          handleDeleteTodo={deleteTodo}
          handleUpdateTodo={updateTodo}
        />
      ))}
      {!hasTodos && (
        <p className="mb-5 text-xl uppercase text-red-500">
          Please add a todo!
        </p>
      )}
      {hasTodos && (
        <p className={'font-sans font-medium '}>
          [ {remainingTodos} of {todosLength} ] Todos remaining
        </p>
      )}
    </section>
  );
};

export default Todos;
