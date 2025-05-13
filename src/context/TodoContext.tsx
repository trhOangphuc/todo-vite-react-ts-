import { createContext, useContext, useState, ReactNode } from "react";

// ✅ Kiểu dữ liệu cho Context
interface TodoContextType {
  todos: string[];
  addTodo: (todo: string) => void;
  deleteTodo: (index: number) => void;
}

// ✅ Tạo Context, mặc định là undefined (giúp tránh lỗi useContext)
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// ✅ Provider để bao bọc app
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = (todo: string) => {
    setTodos((prev) => [...prev, todo]);
  };

  const deleteTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// ✅ Custom Hook để sử dụng context một cách an toàn
export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
