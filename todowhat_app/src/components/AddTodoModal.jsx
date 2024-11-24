import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AddTodoModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="taskName" className="form-label">Task Name</label>
            <input type="text" className="form-control" id="taskName" />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input type="text" className="form-control" id="category" />
          </div>
          <div className="mb-3">
            <label htmlFor="deadline" className="form-label">Deadline</label>
            <input type="datetime-local" className="form-control" id="deadline" />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select className="form-select" id="status">
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTodoModal;