import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Todos from "./components/Todos";
import { useGetTodosQuery } from "./services/apiSlice";

function App() {
  const { data: todos, isLoading, isError, error } = useGetTodosQuery();

  return (
    <>
      <h1 className="heading">RTK-Query-Todo-App</h1>
      <div className="app-container">
        <Form />
        <Todos todos={todos} isLoading={isLoading} isError={error} />
      </div>
    </>
  );
}

export default App;
