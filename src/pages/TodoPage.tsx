import { useState, useEffect } from "react";
import { useInput } from "../hooks/useInput";
import { TodoItem } from "../components/TodoItem";
import { useRef  } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import thư viện để hiển thị thông báo
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho Toastify
import withLogger from "../hoc/withLogger";
import { Link } from "react-router-dom";

  const TodoPage = () => {
    const { value, onChange, reset } = useInput("");
    const [todos, setTodos] = useState<string[]>([]);
    const [itemCount, setItemCount] = useState<number>(0); // State để lưu số lượng item
    const [checkedStatus, setCheckedStatus] =useState<boolean[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const CompletedCount = checkedStatus.filter((checked) => checked).length // Số task hoàn thành

  // Lấy dữ liệu từ localStorage khi trang được mở lại
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
        //  Nếu localStorage không có gì thì reset rõ ràng
        setTodos([]);
        setItemCount(0);
      }
    } catch (err) {
      console.error("Lỗi đọc localStorage:", err);
      setTodos([]);
      setItemCount(0);
    }
  }, []);


  // Mỗi khi todos thay đổi, lưu vào localStorage và cập nhật itemCount
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos)); // Lưu mảng todos vào localStorage
    }
    setItemCount(todos.length); // Cập nhật số lượng item mỗi khi todos thay đổi
  }, [todos]);
  //16-46 sử dụng dữ liệu lưu vào localStorage để khi reload trang không bị mất dữ liệu đang có

  const handleAddTodo = () => {
    if (value.trim()) {
      setCheckedStatus([...checkedStatus, false]);
      setTodos([...todos, value]);
      reset(); 
      if (inputRef.current) {
        inputRef.current.focus(); 
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
    const updateTodos= [...todos];
    const updatedChecked = [...checkedStatus];
    updateTodos.splice(indexToRemove, 1);
    updatedChecked.splice(indexToRemove, 1);
    setTodos(newTodos);
    setTodos(updateTodos);
    setCheckedStatus(updatedChecked);

    localStorage.setItem("todos", JSON.stringify(newTodos));
    toast.error("Đã xóa task !", { autoClose: 700 });

  };

  // Sắp xếp lại list khi checked hoàn thành
  const handleCheckedChange = (index: number, checked: boolean) => {
    const newCheckedStatus = [...checkedStatus];
    newCheckedStatus[index] = checked; 


    const sortedTodos = [...todos];
    const sortedCheckedStatus = [...newCheckedStatus];
    
    sortedTodos.sort((a, b) => {
      const checkedA = newCheckedStatus[todos.indexOf(a)];
      const checkedB = newCheckedStatus[todos.indexOf(b)];
      return checkedA === checkedB ? 0 : checkedA ? 1 : -1;
    });

    sortedCheckedStatus.sort((a, b) => (a === b ? 0 : a ? 1 : -1));

    setTodos(sortedTodos); 
    setCheckedStatus(sortedCheckedStatus); 
  };

  

  return (
  
    <div className="page">
      <div className="dataAPI">
        <Link to={'API'}>
          data API
        </Link>
      </div>
      <h1>Todo List</h1>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="nhập..."
      />
      <button onClick={handleAddTodo}>Add</button>
      <h2>Danh sách task</h2>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", gap: "300px" }}>
      <div style={{ marginTop: "10px", paddingLeft: "50px" }}>
        {itemCount !== 0
          ? (<strong>Số lượng task: {itemCount}</strong> )
          : <strong>không có task nào !</strong>
        }
      </div>
      <div style={{ marginTop: "10px" }}>
        <strong>Task hoàn thành: {CompletedCount}/{itemCount} ✅</strong> 
      </div>
      </div>
      <ol>
        {todos.map((todo, index) => (
            <TodoItem
              key={index}
              id={index}
              todo={todo}
              onDelete={() => handleDelete(index)}
              isChecked={checkedStatus[index]}
              onCheckedChange={(checked) => handleCheckedChange(index, checked)}
            />
        ))}
      </ol>
      <ToastContainer /> {/*Hiển thị thông báo*/}
    </div>
  );
};
const TodoPageWithLogger = withLogger(TodoPage);
export default TodoPageWithLogger;
