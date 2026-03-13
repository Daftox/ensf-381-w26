import { useState } from "react";
import { controlProps } from "./UserDirectoryPage";

function Controls({
  onDeleteClick,
  onSortByGroupClick,
  onSortByIdClick,
  onViewToggleClick,
}) {
  const [deleteId, setDeleteId] = useState("");

  return (
    <div className="controls-row">
      <div className="delete-controls">
        <label htmlFor="delete-id-input">Delete by ID</label>
        <input
          id="delete-id-input"
          type="number"
          value={deleteId}
          // add an onChange handler that updates deleteId with setDeleteId
          onChange={(e) => {
            setDeleteId(e.target.value);
            console.log(deleteId);
          }}
        />
        <button
          className="btn btn-danger"
          // add an onClick handler that calls onDeleteClick(deleteId)
          onClick={() => onDeleteClick(deleteId)}
        >
          Delete
        </button>
      </div>

      <div className="other-controls">
        <button
          className="btn"
          // add an onClick handler that calls onSortByGroupClick
          onClick={() => onSortByGroupClick()}
        >
          Sort by Group
        </button>
        <button
          className="btn"
          // add an onClick handler that calls onSortByIdClick
          onClick={() => onSortByIdClick()}
        >
          Sort by ID
        </button>
        <button
          className="btn"
          // add an onClick handler that calls onViewToggleClick
          onClick={() => onViewToggleClick()}
        >
          Grid / List View
        </button>
      </div>
    </div>
  );
}

export default Controls;
