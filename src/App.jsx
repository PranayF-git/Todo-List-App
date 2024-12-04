import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[100vh] md:w-full">
        <div>
          <h1 className="font-bold text-center text-xl">Manage your todos at one place!</h1>
          <div className="addTodo flex flex-col my-5 gap-4">
            <h3 className="text-lg font-bold">Add a todo</h3>
            <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-lg p-2 border-solid border-2 border-violet-950"
            />
            <button
              onClick={handleAdd} disabled={todo.length<=3} 
              className="bg-violet-800 hover:bg-violet-950 px-2 text-sm font-bold text-white rounded-md disabled:bg-gray-500 mx-3"
            >
              Add
            </button>
            </div>
          </div>
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} className="my-5" /> Show Finished
          <h2 className="text-xl font-bold">Your Tasks</h2>
          <div className="todos">
            {todos.length === 0 && <div className="m-5">No Todos To Display!</div>
            }
            {todos.map((item) => {
              return (showFinished || !item.isCompleted) && <div
                  key={item.id}
                  className="todo flex w-full justify-between my-3"
                >
                  <div className="flex gap-5">
                    <input name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "text-gray-500" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
