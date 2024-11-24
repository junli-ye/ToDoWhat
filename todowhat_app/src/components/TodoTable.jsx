import TodoItem from "./TodoItem";
import React, { useState } from "react";
import AddTodoModal from "./AddTodoModal";
import MembersModal from "./MembersModal";

const TodoTable = ({ mode, todos, groupId }) => {
    // Sorting state
    const [sortField, setSortField] = useState("deadline");
    const [showModal, setShowModal] = useState(false);
    const [showMembersModal, setShowMembersModal] = useState(false); 

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

    // Process todos
    const processTodos = () => {
        const nonDoneTodos = todos.filter((todo) => todo.status.toLowerCase() !== "done");
        const doneTodos = todos.filter((todo) => todo.status.toLowerCase() === "done");
        const sortedNonDoneTodos = sortTodos(nonDoneTodos, sortField);
        return [...sortedNonDoneTodos, ...doneTodos];
    };

  const finalTodos = processTodos();

  return (
    <div>
        {/* Add Todo Button, Members Button (only for group mode), and Sorting Controls */}
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
                <button
                    type="button"
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => setShowModal(true)} // Show modal on click
                >
                    Add Todo
                </button>
                {mode === "group" && (
                    <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setShowMembersModal(true)} // Show MembersModal on click
                    >
                    Members
                    </button>
                )}
            </div>
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
        {/* Add Modals */}
        <AddTodoModal show={showModal} onClose={() => setShowModal(false)} />
        <MembersModal
            show={showMembersModal}
            onClose={() => setShowMembersModal(false)}
            groupId={groupId}
        />
        </div>
  );
};

export default TodoTable;