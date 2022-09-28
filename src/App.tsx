import React, { FC, FormEvent } from "react";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import "./App.css";
import TodoListItems from "./TodoListItems";

export interface Todos {
  id: number;
  todoItems: string;
  isDone: boolean;
}

let index: number = 1;

const App: FC = () => {
  const [values, setValues] = useState<string>("");
  const [todo, setTodo] = useState<Todos[]>([]);

  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    values &&
      setTodo([...todo, { id: index++, todoItems: values, isDone: false }]);
    setValues("");

    console.log(todo);
  };

  return (
    <main className="flex justify-center items-center flex-col text-center">
      <h1 className="mt-10 text-4xl text-white">Todo List</h1>

      <form onSubmit={handle} className="mt-5 group ">
        <input
          className="border-b-4 border-transparent group-hover:border-white w-[250px]
          rounded-l-md h-[45px] outline-none pl-3 font-semibold text-xl bg-slate-400 
          -mt-1 placeholder:text-slate-900 placeholder:font-thin placeholder:font-pop
          placeholder:text-[15px]"
          type="text"
          onChange={(e) => setValues(e.target.value)}
          value={values}
          placeholder="Write Task to add"
        />

        <button
          className="border-b-4 group-hover:border-white group-hover:bg-sky-500
          group-hover:text-white text-sky-600 h-[45px] rounded-r-md bg-slate-400 
          border-transparent p-2 relative top-[3.5px]"
        >
          <RiAddLine className="text-2xl" />
        </button>
      </form>

      <TodoListItems todo={todo} setTodo={setTodo} />
    </main>
  );
};

export default App;
