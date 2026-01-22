import Modal from "react-bootstrap/Modal";
import { getReadableMonthFromUnix, unixToReadable } from "../dateHelpers";
import "./Details.css";

export const Details = ({ day, unix, tasks, onClose, updateTask }) => {
  console.log(tasks);
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
            <p>
              <b>Tytuł:</b> {t.title.toLocaleUpperCase()}
            </p>
            <p>
              <b>Opis:</b> {t.description}
            </p>
            <p>
              <b>Do:</b> {unixToReadable(t.deadline)}
            </p>
            <button className="edit">Edit</button>
            <button className="done">Mark as done</button>
          </span>
        ))}
      </Modal.Body>
    </Modal>
  );
};
