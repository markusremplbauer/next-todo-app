import React, { ChangeEvent, FormEvent, FunctionComponent } from 'react';

export interface AddTodoProps {
  task: string;
  handleSubmitTodo: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent) => void;
}

const AddTodo: FunctionComponent<AddTodoProps> = ({
  handleSubmitTodo,
  task,
  handleChange,
}: AddTodoProps) => (
  <form className="flex w-full justify-between" onSubmit={handleSubmitTodo}>
    <input
      type="text"
      name="task"
      value={task}
      className="text-grey-dark mr-2 flex-1 rounded p-2 shadow"
      onChange={handleChange}
    />
    <button type="submit" aria-label="Add todo" />
    <PlusIcon handleSubmitTodo={handleSubmitTodo} />
  </form>
);

export interface PlusIconProps {
  handleSubmitTodo: (e: FormEvent) => void;
}

const PlusIcon: FunctionComponent<PlusIconProps> = ({
  handleSubmitTodo,
}: PlusIconProps) => {
  return (
    <svg
      onClick={handleSubmitTodo}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="plus">
        <circle id="Ellipse 3" cx="20" cy="20" r="20" fill="#FACC6B" />
        <rect
          id="Rectangle 4"
          x="19"
          y="13"
          width="2"
          height="15"
          fill="#323330"
        />
        <rect
          id="Rectangle 6"
          x="12.5"
          y="21.5"
          width="2"
          height="15"
          transform="rotate(-90 12.5 21.5)"
          fill="#323330"
        />
      </g>
    </svg>
  );
};

export default AddTodo;
