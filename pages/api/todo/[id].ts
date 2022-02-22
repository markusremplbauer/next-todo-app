import { NextApiRequest, NextApiResponse } from 'next';
import { Todo } from '@models/todo';
import todos from '@data/todos';

function handler(req: NextApiRequest, res: NextApiResponse<Todo>) {
  const id: number = parseInt(<string>req.query['id']);
  let todo: Todo = <Todo>todos.at(id);
  const index = todos.findIndex((todo) => todo.id === id);

  if (req.method === 'DELETE') {
    if (index > -1) {
      todos.splice(index, 1);
    }
  } else if (req.method === 'PUT') {
    if (index > -1) {
      const updatedTodo: Todo = req.body;
      todos[index] = updatedTodo;
      todo = updatedTodo;
    }
  }
  res.status(200).json(todo);
}

export default handler;
