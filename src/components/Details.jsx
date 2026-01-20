import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Details.css";
import { tasks } from "../data/tasks";

export const Details = ({ date, onClose }) => {
  const dayTasks = tasks.filter((task) => task.deadline === date);
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{date} Tasks</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {dayTasks.map((task) => (
          <span key={task.id} className="taskDetail">
            <p>
              <b>Title:</b> {task.title.toLocaleUpperCase()}
            </p>
            <p>
              <b>Description:</b> {task.description.toUpperCase()}
            </p>
            <p>
              <b>Deadline:</b> {task.deadline}
            </p>
            <button className="edit">Edit</button>
            <button className="done">Mark as done</button>
          </span>
        ))}
      </Modal.Body>
    </Modal>
  );
};
