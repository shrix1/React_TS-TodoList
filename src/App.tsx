import { FC, FormEvent } from "react";
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
  };

  return (
    <main className="flex justify-center items-center flex-col text-center font-pop ">
      <h1 className="mt-10 text-4xl text-black font-bold">Todo List</h1>

      <form onSubmit={handle} className="mt-5 group mb-7">
        <input
          className="border-b-4 border-transparent group-hover:border-black w-[280px]
          rounded-l-md h-[50px] outline-none pl-3 font-semibold text-xl bg-white 
          -mt-1 placeholder:text-slate-900 placeholder:font-thin placeholder:font-pop
          placeholder:text-[15px] caret-sky-500 transition-all duration-200"
          type="text"
          onChange={(e) => setValues(e.target.value)}
          value={values}
          placeholder="Write Task to add"
        />

        <button
          className="border-b-4 group-hover:border-black group-hover:bg-sky-500
          group-hover:text-black text-white h-[50px] rounded-r-md bg-black 
          border-transparent p-2 relative top-[4.5px] transition-all duration-200"
        >
          <RiAddLine className="text-2xl" />
        </button>
      </form>

      {todo.map((items, key) => (
        <TodoListItems items={items} todo={todo} setTodo={setTodo} key={key} />
      ))}
    </main>
  );
};

export default App;
