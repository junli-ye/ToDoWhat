import Image from "next/image"
import { format, parseISO, isBefore, addHours } from "date-fns";
import { useState } from "react";

const TodoItem = ({ index, todo, mode }) => {
    // Parse and format data
    const taskName = todo.task || "No Task";
    const category = todo.category || "No Category";
    const deadline = todo.deadline || "No Deadline";
    const status = todo.status || "No Status";
    const user =
        mode === "group" ? todo.assignedUser || "No Assigned User" : null;
  
    // Convert deadline to local time format
    const deadlineDate = parseISO(deadline);
    const formattedDeadline = deadline !== "No Deadline" ? format(deadlineDate, "yyyy-MM-dd HH:mm") : "No Deadline";

    // Determine row style
    const now = new Date();
    const isPast = deadlineDate < now;
    const isLessThan24Hours = deadlineDate - now < 24 * 60 * 60 * 1000 && !isPast;
    
    let rowStyle = {};
    
    if (todo.status.toLowerCase() === "done") {
      rowStyle = { textDecoration: "line-through", color: "gray" };
    } else if (todo.status.toLowerCase() === "delay") {
      rowStyle = { color: "orange", fontWeight: "bold" };
    } else if (isPast) {
      rowStyle = { color: "red", fontWeight: "bold" };
    } else if (isLessThan24Hours) {
      rowStyle = { color: "red" };
    }

    // Expand/Collapse state
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <>
        {/* Main Row */}
        <tr style={rowStyle}>
            <td style={{ color: "inherit" }}>{taskName}</td>
            <td style={{ color: "inherit" }}>{category}</td>
            <td style={{ color: "inherit" }}>{formattedDeadline}</td>
            <td style={{ color: "inherit" }}>{status}</td>
            {mode === "group" && <td style={{ color: "inherit" }}>{user}</td>} {/* Assigned To column */}
            <td>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "⬆️" : "⬇️"}
              </button>
            </td>
            <td>
                <button type="button" className="btn btn-light">
                ✍️
                {/* <Image src="/assets/Edit.png" width={20} height={20} alt="Edit" /> */}
                </button>
            </td>
            <td>
                <button type="button" className="btn btn-light">
                🗑️
                {/* <Image src="/assets/Delete.png" width={20} height={20} alt="Delete" /> */}
                </button>
            </td>
        </tr>
        {/* Expanded Row */}
        {isExpanded && todo.text && (
          <tr>
            <td colSpan={mode === "group" ? 8 : 7} style={{ padding: "10px", backgroundColor: "#f9f9f9" }}>
              <strong>👉</strong> {todo.text}
            </td>
          </tr>
        )}
      </>
    );
  };
  
  export default TodoItem;