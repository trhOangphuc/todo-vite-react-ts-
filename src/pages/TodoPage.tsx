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

  // 1. Lấy dữ liệu từ localStorage khi trang được mở lại
 useEffect(() => {
  try {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);
      if (Array.isArray(parsed)) {
        setTodos(parsed);
        setItemCount(parsed.length);
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
  const inputRef = useRef<HTMLInputElement>(null);
  const handleAddTodo = () => {
    if (value.trim()) {
      setTodos([...todos, value]);
      reset(); // reset lại input sau khi thêm todo
      if (inputRef.current) {
        inputRef.current.focus(); // đặt lại focus cho input
      }
       toast.success("Task added successfully!", { autoClose: 700 }); 
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
   toast.error("Task deleted!", { autoClose: 700 });
};

  return (
  
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>
      <input
        ref={inputRef} // gắn ref cho input
        type="text"
        value={value}
        onChange={onChange}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <div style={{ marginTop: "10px" }}>
        {itemCount != 0
          ? (<strong>Total Items: {itemCount}</strong> )
          : <p>no task list</p>
        }
      </div>

      <ol>
        {todos.map((todo, index) => (
          <li key={index}>
            <TodoItem
              todo={todo}
              onDelete={() => handleDelete(index)}
            />
          </li>
        ))}
      </ol>

       {/* Thêm ToastContainer vào cuối cùng của component để hiển thị thông báo */}
      <ToastContainer />
    </div>
  );
};

export default TodoPage;
