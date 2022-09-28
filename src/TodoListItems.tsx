import React, { FC } from "react";
import { Todos } from "./App"; //interface of todos (State)

interface Props {
  todo: Todos[];
  setTodo: React.Dispatch<React.SetStateAction<Todos[]>>;
}

const TodoListItems: FC<Props> = ({ todo, setTodo }) => {
  const deleteItems = (ids: number) => {
    setTodo(todo.filter((i: Todos) => i.id !== ids));
  };

  const finishedItems = (ids: number) => {
    setTodo(todo.map((i) => (i.id === ids ? { ...i, isDone: !i.isDone } : i)));
  };

  const editTodos = (ids: number) => {
    setTodo(todo.map((i) => i));
  };

  return (
    <div className="h-[50vh] mt-[20px] text-white p-2">
      {todo.map((items, key) => {
        return (
          <section key={key}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-[400px] border-2 flex justify-between 
            p-4 rounded-md mb-2 bg-slate-700"
              style={{
                borderColor: items.isDone ? "green" : "white",
                opacity: items.isDone ? 0.5 : 1,
              }}
            >
              {false ? (
                <input type="text" value={items.todoItems} />
              ) : (
                <h1>{items.todoItems}</h1>
              )}

              <div className="flex gap-2">
                <button onClick={() => editTodos(items.id)}>edit</button>
                <button onClick={() => finishedItems(items.id)}>done</button>
                <button onClick={() => deleteItems(items.id)}>del</button>
              </div>
            </form>
          </section>
        );
      })}
    </div>
  );
};

export default TodoListItems;
