import { TodoProvider } from "./context/TodoContext";
import TodoPage from "./pages/TodoPage";
import './App.css'
import TodoDetail from "./pages/TodoDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <TodoProvider>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
      </Routes>
    </TodoProvider>
  );
}

export default App;
