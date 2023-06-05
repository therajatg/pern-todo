import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, Input, ModalFooter } from "reactstrap";
import axios from "axios";

export const EditTodo = ({ modal, setModal, selectedTodo, setAllTodos }) => {
  const [inputTodo, setInputTodo] = useState("");

  useEffect(() => {
    setInputTodo(selectedTodo.description);
  }, [selectedTodo.description]);

  const toggle = () => setModal(!modal);

  const saveHandler = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/${selectedTodo.id}`, {
        description: inputTodo,
      });
      setAllTodos(res.data);
    } catch (error) {
      console.log(error);
    }
    toggle();
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <Input
          type="text"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <ModalFooter>
          <Button color="primary" onClick={saveHandler}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
