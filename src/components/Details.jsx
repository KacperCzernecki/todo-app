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
        <Modal.Title>Zadania na dzień {date}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {dayTasks.map((task) => (
          <span key={task.id} className={"taskDetail"}>
            <p>
              <b>Tytuł:</b> {task.title.toLocaleUpperCase()}
            </p>
            <p>
              <b>Opis:</b> {task.description}
            </p>
            <p>
              <b>Do:</b> {task.deadline}
            </p>
            <button className="edit">Edit</button>
            <button className="done">Mark as done</button>
          </span>
        ))}
      </Modal.Body>
    </Modal>
  );
};
