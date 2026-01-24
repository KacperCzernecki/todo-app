import "./AddTaskForm.css";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddTaskForm = ({ onClose, day, addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date(day * 1000));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const unixDeadline = Math.floor(deadline.getTime() / 1000);
    addTask(title, description, unixDeadline);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title className="m-auto">Add task</Modal.Title>
      </Modal.Header>
      <Modal.Body className="container">
        <form onSubmit={handleSubmit}>
          <label>Task Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Task Description:</label>
          <textarea
            wrap="soft"
            maxLength={120}
            placeholder="Max. 120 characters"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>

          <label>Task Deadline: </label>
          <DatePicker
            className="date-picker"
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            dateFormat="dd-MM-yyyy"
          />

          <button type="submit">Dodaj zadanie</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
