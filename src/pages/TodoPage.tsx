import { useState, useEffect } from "react";
import { useInput } from "../hooks/useInput";
import { TodoItem } from "../components/TodoItem";
import { useRef  } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import thư viện để hiển thị thông báo
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho Toastify

const TodoPage = () => {
  const { value, onChange, reset } = useInput("");
  const [todos, setTodos] = useState<string[]>([]);
  const [itemCount, setItemCount] = useState<number>(0); // State để lưu số lượng item
  const [checkedStatus, setCheckedStatus] =useState<boolean[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 1. Lấy dữ liệu từ localStorage khi trang được mở lại
 useEffect(() => {
  try {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);
      if (Array.isArray(parsed)) {
        setTodos(parsed);
        setItemCount(parsed.length);
        setCheckedStatus(new Array(parsed.length).fill(false));
      }
    } else {
      // ✅ Nếu localStorage không có gì thì reset rõ ràng
      setTodos([]);
      setItemCount(0);
    }
  } catch (err) {
    console.error("Lỗi đọc localStorage:", err);
    setTodos([]);
    setItemCount(0);
  }
}, []);


  // 2. Mỗi khi todos thay đổi, lưu vào localStorage và cập nhật itemCount
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos)); // Lưu mảng todos vào localStorage
    }
    setItemCount(todos.length); // Cập nhật số lượng item mỗi khi todos thay đổi
  }, [todos]);

   // Khai báo useRef cho input
  const handleAddTodo = () => {
    if (value.trim()) {
      setCheckedStatus([...checkedStatus, false]);
      setTodos([...todos, value]);
      reset(); // reset lại input sau khi thêm todo
      if (inputRef.current) {
        inputRef.current.focus(); // đặt lại focus cho input
      }
       toast.success("Thêm thành công !", { autoClose: 700 }); 
    }
    if (value.trim()) {
      setTodos([...todos, value]);
      reset();
    }
  };

  const handleDelete = (indexToRemove: number) => {
  const newTodos = todos.filter((_, i) => i !== indexToRemove);
  setTodos(newTodos);
  // ✅ Cập nhật localStorage ngay sau khi xóa
  localStorage.setItem("todos", JSON.stringify(newTodos));
   toast.error("Đã xóa task !", { autoClose: 700 });

};

    const handleCheckedChange = (index: number, checked: boolean) => {
    const newCheckedStatus = [...checkedStatus];
    newCheckedStatus[index] = checked; // Cập nhật trạng thái checkbox

    // Sắp xếp todos sao cho các todo đã được check sẽ xuống cuối
    const sortedTodos = [...todos];
    const sortedCheckedStatus = [...newCheckedStatus];
    
    sortedTodos.sort((a, b) => {
      const checkedA = newCheckedStatus[todos.indexOf(a)];
      const checkedB = newCheckedStatus[todos.indexOf(b)];
      return checkedA === checkedB ? 0 : checkedA ? 1 : -1;
    });

    sortedCheckedStatus.sort((a, b) => (a === b ? 0 : a ? 1 : -1));

    setTodos(sortedTodos); // Cập nhật lại danh sách todos
    setCheckedStatus(sortedCheckedStatus); // Cập nhật lại trạng thái checkbox
  };

   const CompletedCount = checkedStatus.filter((checked) => checked).length



  return (
  
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>
      <input
        ref={inputRef} // gắn ref cho input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="nhập..."
      />
      <button onClick={handleAddTodo}>Add</button>
      <h2>Danh sách task</h2>

      <ol>
        {todos.map((todo, index) => (
          <li key={index}>
            <TodoItem
              todo={todo}
              onDelete={() => handleDelete(index)}
              isChecked={checkedStatus[index]}
              onCheckedChange={(checked) => handleCheckedChange(index, checked)}
            />
          </li>
        ))}
      </ol>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", gap: "300px" }}>
      <div style={{ marginTop: "10px" }}>
        {itemCount !== 0
          ? (<strong>Số lượng task: {itemCount}</strong> )
          : <strong>không có task nào !</strong>
        }
      </div>
      <div style={{ marginTop: "10px" }}>
        <strong>Task hoàn thành: {CompletedCount}/{itemCount} ✅</strong> 
      </div>
      </div>
       {/* Thêm ToastContainer vào cuối cùng của component để hiển thị thông báo */}
      <ToastContainer />
    </div>
  );
};

export default TodoPage;
