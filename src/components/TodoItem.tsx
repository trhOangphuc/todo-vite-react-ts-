import React from "react";
import DeleteIcon from "../assets/image.png";

interface Props {
  todo: string;
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
    <ol>
      {isChecked === true 
        ? (<del>{todo}</del>)
        : (<span>{todo}</span>)
      }
      <input className="checkbox" type="checkbox" checked={isChecked} onChange={handleChange} />
      <button className="btnDel" onClick={handleClick} style={{ marginLeft: "50px"}}>
        <img src={DeleteIcon} alt="Delete" style={{ width: "20px", height: "20px" }} />
      </button>
    </ol>
  );
};

export { TodoItem };
