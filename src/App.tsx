import { TodoProvider } from "./context/TodoContext";
import TodoPage from "./pages/TodoPage";
import './App.css'
import TodoDetail from "./pages/TodoDetail";
import { Routes, Route } from "react-router-dom";
import TodoAPI from "./pages/TodoAPI";


function App() {
  return (
    <TodoProvider>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
        <Route path="/API" element={<TodoAPI />} />
      </Routes>
    </TodoProvider>
  );
}

export default App;
