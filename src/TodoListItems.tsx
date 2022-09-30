import React, { FC, useState, FormEvent, useRef, useEffect } from "react";
import { Todos } from "./App"; //typeCheck of todos
import { FiTrash } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";

interface Props {
  items: Todos;
  todo: Todos[];
  setTodo: React.Dispatch<React.SetStateAction<Todos[]>>;
}

const TodoListItems: FC<Props> = ({ items, todo, setTodo }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [editCheck, setEditCheck] = useState<string>(items.todoItems);
  const inputFocus = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    //initially the ref is null so only chaining obj used
  }, [edit]);

  return (
    <div className="text-black p-2">
      <form
        onSubmit={(e) => editFunctionality(e, items.id)}
        className="w-[350px] border-2 flex justify-between drop-shadow-lg 
            p-3 rounded-md mb-2 bg-white group hover:w-[360px] transition-all
            duration-200 "
        style={{
          borderColor: items.isDone ? "green" : "black",
          opacity: items.isDone ? 0.5 : 1,
        }}
      >
        {edit ? (
          <input
            ref={inputFocus}
            className="text-black text-xl font-extrabold outline-sky-200"
            value={editCheck}
            onChange={(e) => setEditCheck(e.target.value)}
          />
        ) : (
          <h1 className="font-extrabold text-xl group-hover:text-sky-500">
            {items.todoItems}
          </h1>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (!edit && !items.isDone) {
                setEdit(!edit);
              }
            }}
            title="edit"
          >
            <BiEditAlt className="text-2xl text-sky-500" />
          </button>

          <button onClick={() => finishedItems(items.id)} title="finished">
            <MdDone className="text-2xl text-green-700" />
          </button>

          <button onClick={() => deleteItems(items.id)} title="delete">
            <FiTrash className="text-xl text-red-500" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoListItems;
