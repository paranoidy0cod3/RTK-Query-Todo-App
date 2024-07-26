import React, { useRef, useState } from "react";
import { RiTodoLine } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";
import { useAddTodoMutation } from "../services/apiSlice";

const Form = () => {
  const [todoInput, setTodoInput] = useState("");
  const [addTodo] = useAddTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ id: crypto.randomUUID(), todo: todoInput, completed: false });

    setTodoInput("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="todo-form">
        <div className="top-icon">
          <RiTodoLine color="#fff" size={"24px"} /> <span>My Todos</span>
        </div>
        <div className="input-group">
          <IoIosAdd size={"20px"} style={{ padding: "0px 5px" }} />
          <input
            onChange={(e) => setTodoInput(e.target.value)}
            name="todo"
            id="todo"
            type="text"
            placeholder="add your Todo here"
            value={todoInput}
          />
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

export default Form;
