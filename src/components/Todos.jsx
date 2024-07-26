import React, { useState } from "react";
import Todo from "./Todo";

const Todos = ({ todos, isLoading, isError }) => {
  return isLoading ? (
    <p>Loading..</p>
  ) : isError ? (
    <p>{isError.error}</p>
  ) : (
    <div className="todos-container">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          todo={todo.todo}
          completed={todo.completed}
        />
      ))}
    </div>
  );
};

export default Todos;
