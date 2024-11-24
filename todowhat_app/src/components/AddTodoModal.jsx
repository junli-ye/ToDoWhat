import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AddTodoModal = ({ show, onClose, isPrivate = true, groupId = null }) => {
    const [categories] = useState([
        "Work",
        "Personal",
        "Health",
        "Finance",
        "Shopping",
        "Leisure",
        "Study",
        "Others",
    ]);

    const [task, setTask] = useState("");
    const [text, setText] = useState("");
    const [category, setCategory] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("To Do");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");

        // Local check Logic
        if (!task.trim()) {
            setError("Task Name is required.");
            return;
        }
  
        const body = {
            task,
            text: text || "", // Description optinal
            category: category || "Others", // deafalt "General"
            deadline: deadline || new Date().toISOString().slice(0, 16), // default today
            status: status || "To Do", // default todo
            is_private: isPrivate,
            groupId: isPrivate ? null : groupId,
        };
    
        try {
          const res = await fetch("/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer YOUR_TEST_TOKEN",
            },
            body: JSON.stringify(body),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            alert("Todo created successfully!");
            onClose();
          } else {
            setError(data.error.message || "Failed to create the todo.");
          }
        } catch (err) {
          setError("An error occurred. Please try again.");
        }
      };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add New Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                <div className="mb-3">
                <label htmlFor="taskName" className="form-label">
                    Task Name*
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="taskName"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                </div>
                <div className="mb-3">
                <label htmlFor="textDescription" className="form-label">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="textDescription"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows="3"
                ></textarea>
                </div>
                <div className="mb-3">
                <label htmlFor="category" className="form-label">
                    Category
                </label>
                <select
                    className="form-select"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                    ))}
                </select>
                </div>
                <div className="mb-3">
                <label htmlFor="deadline" className="form-label">
                    Deadline
                </label>
                <input
                    type="datetime-local"
                    className="form-control"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                />
                </div>
                <div className="mb-3">
                <label htmlFor="status" className="form-label">
                    Status
                </label>
                <select
                    className="form-select"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="In Progress">Delayed</option>
                    <option value="Done">Done</option>
                </select>
                </div>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Add new task
            </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTodoModal;