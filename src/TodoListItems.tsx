import React, { FC, useState, FormEvent } from "react";
import { Todos } from "./App"; //interface of todos (State)

interface Props {
  items: Todos;
  todo: Todos[];
  setTodo: React.Dispatch<React.SetStateAction<Todos[]>>;
}

const TodoListItems: FC<Props> = ({ items, todo, setTodo }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [editCheck, setEditCheck] = useState<string>(items.todoItems);

  const deleteItems = (ids: number) => {
    setTodo(todo.filter((i) => i.id !== ids));
  };

  const finishedItems = (ids: number) => {
    setTodo(todo.map((i) => (i.id === ids ? { ...i, isDone: !i.isDone } : i)));
  };

  const editFunctionality = (e: FormEvent<HTMLFormElement>, ids: number) => {
    e.preventDefault();

    edit &&
      setTodo(
        todo.map((i) => (i.id === ids ? { ...i, todoItems: editCheck } : i))
      );
    setCheck(!check);

    check && setEdit(false);
  };

  return (
    <div className="text-white p-2">
      <form
        // onSubmit={(e) => e.preventDefault()}
        onSubmit={(e) => editFunctionality(e, items.id)}
        className="w-[400px] border-2 flex justify-between 
            p-4 rounded-md mb-2 bg-slate-700"
        style={{
          borderColor: items.isDone ? "green" : "white",
          opacity: items.isDone ? 0.5 : 1,
        }}
      >
        {edit ? (
          <input
            className="text-black"
            value={editCheck}
            onChange={(e) => setEditCheck(e.target.value)}
          />
        ) : (
          <h1>list={items.todoItems}</h1>
        )}

        {/* <h1>{items.todoItems}</h1> */}
        <h1>id={items.id}</h1>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (!edit && !items.isDone) {
                setEdit(!edit);
              }
            }}
          >
            edit
          </button>
          <button onClick={() => finishedItems(items.id)}>done</button>
          <button onClick={() => deleteItems(items.id)}>del</button>
        </div>
      </form>
    </div>
  );
};

export default TodoListItems;
