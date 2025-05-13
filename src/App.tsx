import { TodoProvider } from "./context/TodoContext";
import TodoPage from "./pages/TodoPage";
import './App.css'


function App() {
  return (
    <TodoProvider>
      <TodoPage />
    </TodoProvider>
  );
}

export default App;
