import React from "react";
import DeleteIcon from "../assets/image.png";
import {Link} from "react-router-dom";

interface Props {
  todo: string;
  id: number;
  onDelete: () => void;
  isChecked : boolean;
  onCheckedChange: (checked: boolean) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onDelete, isChecked, onCheckedChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
  onCheckedChange(event.target.checked);
  };
  const handleClick = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa task này?")) {
      onDelete();
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Check</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>
            <Link to={'/todo/${id}'} state={{todo, isChecked}}>
              {isChecked === true ? (
                <del>{todo}</del>
              ) : (
                <span>{todo}</span>
              )}
            </Link>
            </td>
            <td>
              <input
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
              />
            </td>
            <td>
              <button className="btnDel" onClick={handleClick} style={{ marginLeft: "10px" }}>
                <img src={DeleteIcon} alt="Delete" style={{ width: "30px", height: "30px" }} />
              </button>
            </td>
          </tr>
      </tbody>
    </table>

  );
};

export { TodoItem };
