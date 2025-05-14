import { useLocation } from "react-router-dom";

export default function TodoDetail() {
  const location = useLocation();
  const { todo, isChecked } = location.state || {};

  if (!todo) return <div>Không có dữ liệu todo</div>;

  return (
    <div>
      <h2>Chi tiết Todo</h2>
      <p>Nội dung: {todo}</p>
      <p>Trạng thái: {isChecked ? "Đã hoàn thành" : "Chưa hoàn thành"}</p>
    </div>
  );
}
