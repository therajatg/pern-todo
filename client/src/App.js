import { useEffect, useState } from "react";
import "./App.css";
import { InputTodo } from "./components/InputTodo";
import { ListTodos } from "./components/ListTodos";

function App() {
  const [allTodos, setAllTodos] = useState([]);

  return (
    <div className="m-5">
      <InputTodo setAllTodos={setAllTodos} />
      <ListTodos allTodos={allTodos} setAllTodos={setAllTodos} />
    </div>
  );
}

export default App;
