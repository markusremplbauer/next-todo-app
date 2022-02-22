import { NextApiRequest, NextApiResponse } from 'next';
import { Todo } from '@models/todo';
import todos from '@data/todos';

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(todos);
      break;
    case 'POST':
      const data = req.body;
      const newTodo: Todo = {
        id: todos.length != 0 ? todos[todos.length - 1].id + 1 : 0,
        task: data.task,
        completed: data.completed,
      };
      todos.push(newTodo);
      res.status(201).json(newTodo);
  }
}

export default handler;
