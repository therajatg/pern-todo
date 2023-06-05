import { useState } from "react";
import { Button, Form, Input } from "reactstrap";
import axios from "axios";

export const InputTodo = ({ setAllTodos }) => {
  const [task, setTask] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (task.trim() !== "") {
        const res = await axios.post("http://localhost:5000", {
          description: task,
        });
        setAllTodos(res.data);
      }
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form className="d-flex mb-5" onSubmit={submitHandler}>
      <Input value={task} onChange={(e) => setTask(e.target.value)} />
      <Button className="bg-success">Save</Button>
    </Form>
  );
};
