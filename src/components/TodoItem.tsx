import React from "react";
import DeleteIcon from "../assets/image.png";

interface Props {
  todo: string;
  onDelete: () => void;
}

const TodoItem: React.FC<Props> = ({ todo, onDelete }) => {
  const handleClick = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa task này?")) {
      onDelete();
    }
  };
  return (
    <ol>
      {todo}
      <button onClick={handleClick} style={{ marginLeft: "50px"}}>
        <img src={DeleteIcon} alt="Delete" style={{ width: "20px", height: "20px" }} />
      </button>
    </ol>
  );
};

export { TodoItem };
