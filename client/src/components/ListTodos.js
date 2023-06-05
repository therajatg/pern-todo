import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { EditTodo } from "./EditTodo";

export const ListTodos = ({ allTodos, setAllTodos }) => {
  const [modal, setModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});

  useEffect(() => {
    if (!allTodos?.length) {
      getAllTodos();
    }
  }, []);

  const getAllTodos = async () => {
    if (!allTodos?.length) {
      const res = await axios.get("http://localhost:5000");
      setAllTodos(res.data);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/${id}`);
      setAllTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = (todo) => {
    setModal((prev) => !prev);
    setSelectedTodo(todo);
  };

  return (
    <div>
      {allTodos?.map((todo) => (
        <div key={todo.id} className="d-flex mb-3">
          <span className="flex-grow-1 me-2">{todo.description}</span>
          <Button
            className="btn-warning me-2"
            onClick={() => editHandler(todo)}
          >
            Edit
          </Button>
          <Button className="btn-danger" onClick={() => deleteHandler(todo.id)}>
            Delete
          </Button>
        </div>
      ))}
      <EditTodo
        modal={modal}
        setModal={setModal}
        selectedTodo={selectedTodo}
        setAllTodos={setAllTodos}
      />
    </div>
  );
};
