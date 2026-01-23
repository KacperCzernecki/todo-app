import "./AddTaskForm.css";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddTaskForm = ({ onClose, day }) => {
  const [deadline, setDeadline] = useState(new Date(day * 1000));

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title className="m-auto">Add task</Modal.Title>
      </Modal.Header>
      <Modal.Body className="container">
        <form onSubmit={handleSubmit}>
          <label>Task Title:</label>
          <input type="text" />

          <label>Task Description:</label>
          <textarea
            wrap="soft"
            maxLength={120}
            placeholder="Max. 120 characters"
          ></textarea>

          <label>Task Deadline: </label>
          <DatePicker
            className="date-picker"
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            dateFormat="dd-MM-yyyy"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
};
