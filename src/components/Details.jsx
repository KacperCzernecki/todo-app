import Modal from "react-bootstrap/Modal";
import { getReadableMonthFromUnix, unixToReadable } from "../dateHelpers";
import { useState } from "react";
import "./Details.css";

export const Details = ({ day, unix, tasks, onClose, updateTask }) => {
  const [editing, setEditing] = useState(null);

  const handleEdit = (task) => {
    setEditing({
      id: task.id,
      title: task.title,
      description: task.description,
    });
  };

  const handleSave = (task) => {
    const updated = {
      ...task,
      title: editing.title,
      description: editing.description,
    };
    updateTask(task.id, updated);
    setEditing(null);
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
        {tasks.map((t) => (
          <span key={t.id} className={"taskDetail"}>
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
              <p>{unixToReadable(t.deadline)}</p>
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
              <button className="done" onClick={() => handleEdit(t)}>
                Edit
              </button>
            )}
          </span>
        ))}
      </Modal.Body>
    </Modal>
  );
};
