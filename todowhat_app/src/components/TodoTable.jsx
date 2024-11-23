import TodoItem from "./TodoItem";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const TodoTable = ({ mode }) => {
  // Mock data structure
  const privateTodos = [
    {
      id: 1,
      task: "Complete the API design",
      text: "Design and finalize the API endpoints",
      category: "Work",
      deadline: "2024-12-01T12:00:00Z",
      status: "In Progress",
    },
    {
      id: 2,
      task: "Fix backend bug",
      text: "Debugging the API response issue",
      category: "Work",
      deadline: "2023-10-30T18:00:00Z",
      status: "To Do",
    },
    {
      id: 3,
      task: "Submit the final report",
      text: "Upload the final document to the server",
      category: "Work",
      deadline: "2024-11-28T12:00:00Z",
      status: "Delay",
    },
    {
      id: 4,
      task: "Complete the client meeting",
      text: "Prepare slides and attend the client call",
      category: "Meetings",
      deadline: "2024-11-29T09:00:00Z",
      status: "Done",
    },
    {
      id: 5,
      task: "Prepare presentation slides",
      text: "Create a draft of the slides for review",
      category: "Planning",
      deadline: "2024-12-02T15:00:00Z",
      status: "To Do",
    },
  ];

  const groupTodos = [
    {
      id: 1,
      task: "Complete group tasks",
      text: "Coordinate with team members and finalize tasks",
      category: "Work",
      deadline: "2024-12-10T12:00:00Z",
      status: "To Do",
      assignedUser: "John Doe",
    },
    {
      id: 2,
      task: "Update project documentation",
      text: "Ensure all project files are up-to-date",
      category: "Documentation",
      deadline: "2024-11-30T18:00:00Z",
      status: "Delay",
      assignedUser: "Jane Smith",
    },
    {
      id: 3,
      task: "Finalize budget approval",
      text: "Review and approve the project budget",
      category: "Finance",
      deadline: "2024-11-29T09:00:00Z",
      status: "Done",
      assignedUser: "Alice Johnson",
    },
    {
      id: 4,
      task: "Prepare team presentation",
      text: "Create slides and assign speaking roles",
      category: "Planning",
      deadline: "2024-12-02T15:00:00Z",
      status: "In Progress",
      assignedUser: "Michael Brown",
    },
  ];

  // choose data depending on the mode  
  const todos = mode === "private" ? privateTodos : groupTodos;

  // Sorting state
  const [sortField, setSortField] = useState("deadline");
  const [showModal, setShowModal] = useState(false);

  // Sort function
  const sortTodos = (todos, field) => {
    return [...todos].sort((a, b) => {
      if (field === "deadline") {
        return new Date(a.deadline) - new Date(b.deadline); // Ascending by date
      }
      if (field === "task") {
        return a.task.localeCompare(b.task); // Alphabetical by task
      }
      if (field === "category") {
        return a.category.localeCompare(b.category); // Alphabetical by category
      }
      return 0;
    });
  };

  // Separate "done" and "non-done" todos
  const nonDoneTodos = todos.filter((todo) => todo.status.toLowerCase() !== "done");
  const doneTodos = todos.filter((todo) => todo.status.toLowerCase() === "done");

  // Sort non-done todos by the selected field
  const sortedNonDoneTodos = sortTodos(nonDoneTodos, sortField);

  // Combine sorted non-done todos with done todos
  const finalTodos = [...sortedNonDoneTodos, ...doneTodos];

  return (
    <div>
      {/* Add Todo Button and Sorting Controls */}
        <div className="d-flex justify-content-between align-items-center mb-3">
            <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => setShowModal(true)} // Show modal on click
            >
            Add Todo
            </button>
            <div className="d-inline-block">
                <label htmlFor="sortDropdown" className="form-label me-2">Sort by:</label>
                <select
                    id="sortDropdown"
                    className="form-select d-inline-block w-auto"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                >
                    <option value="deadline">Deadline</option>
                    <option value="task">Task</option>
                    <option value="category">Category</option>
                </select>
            </div>
      </div>

      {/* Todo Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Category</th>
            <th>Deadline</th>
            <th>Status</th>
            {mode === "group" && <th>Assigned To</th>}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {finalTodos.map((todo, index) => (
            <TodoItem key={index} index={index + 1} todo={todo} mode={mode} />
          ))}
        </tbody>
      </table>

      {/* Add Todo Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodoTable;