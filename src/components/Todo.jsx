import React from "react";
import { FaCheck } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../services/apiSlice";

const Todo = ({ id, todo, completed }) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const handleDelete = () => {
    deleteTodo(id);
  };

  const handleUpdate = () => {
    updateTodo({ id, todo, completed: !completed });
  };
  return (
    <div className="todo-wrapper">
      <div className="input-wrapper">
        <div
          onClick={handleUpdate}
          className={completed ? "radio-active" : "radio"}
          id={id}
        >
          <FaCheck
            style={{
              padding: "3px",
              display: `${!completed ? "none" : "flex"}`,
            }}
            size={10}
          />
        </div>
        <input
          style={{
            textDecoration: `${completed ? "line-through blue 1.5px" : "none"}`,
          }}
          type="text"
          defaultValue={todo}
        />
      </div>
      <div id={id} onClick={handleDelete}>
        <MdDeleteForever size={"20px"} color="black" />
      </div>
    </div>
  );
};

export default Todo;
