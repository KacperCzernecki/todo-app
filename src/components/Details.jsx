import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Details.css";
import { tasks } from "../data/tasks";

export const Details = ({ date, onClose }) => {
  const dayTasks = tasks.filter((task) => task.deadline === date);
  console.log(tasks);
  return (
    <Modal show={true} onHide={onClose} centered closeButton>
      <Modal.Body closeButton>
        {dayTasks.map((task) => (
          <span key={task.id}>
            {task.title}
            {task.description}
          </span>
        ))}
      </Modal.Body>
    </Modal>
  );
};
