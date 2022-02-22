import React, { FunctionComponent } from 'react';
import { Todo } from '@models/todo';

interface TodoProps {
  todo: Todo;
  handleDeleteTodo: (id: number) => void;
  handleUpdateTodo: (todo: Todo) => void;
}

const Row: FunctionComponent<TodoProps> = ({
  todo,
  handleDeleteTodo,
  handleUpdateTodo,
}: TodoProps) => {
  return (
    <div
      className={`
      mb-2 flex w-full rounded  p-4 ${
        todo.completed ? 'bg-gray-400 ' : 'bg-green-300'
      }`}
    >
      <p
        className={`ml-2 flex-1 font-sans text-xl font-medium 
          ${todo.completed ? 'text-white line-through' : 'text-gray-700'}
        `}
      >
        {todo.task}
      </p>
      <div className="flex items-center">
        <button
          aria-label="Delete a todo"
          className="mr-3 h-7 w-7 rounded bg-red-400 font-bold text-white hover:bg-red-500"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          X
        </button>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleUpdateTodo(todo)}
          className="form-checkbox h-7 w-7 rounded"
        />
      </div>
    </div>
  );
};

export default Row;
