import Modal from "react-bootstrap/Modal";
import { getReadableMonthFromUnix, unixToReadable } from "../dateHelpers";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Details.css";

export const Details = ({
  day,
  unix,
  tasks,
  onClose,
  updateTask,
  removeTask,
}) => {
  const [editing, setEditing] = useState(null);
  const [modalTasks, setModalTasks] = useState(tasks);

  const handleEdit = (task) => {
    setEditing({
      id: task.id,
      title: task.title,
      description: task.description,
      deadline: new Date(task.deadline * 1000),
    });
  };
  const handleDone = (task) => {
    const done = { ...task, complete: !task.complete };
    updateTask(task.id, done);
    setModalTasks((prev) => prev.map((t) => (t.id === done.id ? done : t)));
  };
  const handleRemove = (task) => {
    removeTask(task.id);
    setModalTasks((prev) => prev.filter((t) => t.id !== task.id));
    setEditing(null);
  };

  const handleSave = (task) => {
    const updated = {
      ...task,
      title: editing.title,
      description: editing.description,
      deadline: Math.floor(editing.deadline.getTime() / 1000),
    };
    updateTask(task.id, updated);
    setEditing(null);
    setModalTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t)),
    );
  };

  const handleCancel = () => {
    setEditing(null);
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title className="m-auto">
          {day} {getReadableMonthFromUnix(unix)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="container">
        {modalTasks.map((t) => (
          <span
            key={t.id}
            className={"taskDetail" + (t.complete ? " done" : "")}
          >
            <div>
              <b>Tytuł:</b>
              {editing?.id === t.id ? (
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                  className="form-control"
                  autoFocus
                />
              ) : (
                <p>{t.title}</p>
              )}
            </div>
            <div>
              <b>Opis:</b>
              {editing?.id === t.id ? (
                <textarea
                  value={editing.description}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                  className="form-control"
                />
              ) : (
                <p>{t.description}</p>
              )}
            </div>
            <div>
              <b>Do:</b>
              {editing?.id === t.id ? (
                <DatePicker
                  selected={editing.deadline}
                  onChange={(date) =>
                    setEditing({ ...editing, deadline: date })
                  }
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                />
              ) : (
                <p>{unixToReadable(t.deadline)}</p>
              )}
            </div>
            {editing?.id === t.id ? (
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleSave(t)}
                >
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="edit" onClick={() => handleEdit(t)}>
                Edit
              </button>
            )}
            <button className="doneBtn" onClick={() => handleDone(t)}>
              {t.complete ? "Mark as not done" : "Mark as done"}
            </button>
            <button className="delete" onClick={() => handleRemove(t)}>
              Delete
            </button>
          </span>
        ))}
      </Modal.Body>
    </Modal>
  );
};
