import { useState, useEffect } from 'react'
import Loading from './components/Loading'
import Header from './components/Header'
import TodoListTable from './components/TodoListTable'
import Footer from './components/Footer'

const host = 'http://localhost:3030/jsonstore/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(host)
    .then(res => res.json())
    .then(data => {
      setTodos(Object.values(data));
      setIsLoading(false);
    });
  }, []);
  
  const onTodoAdd = () => {
    const text = prompt('Enter task name:');
    
    if (text) {
      fetch(host, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, isCompleted: false })
      })
      .then(res => res.json())
      .then(data => {
        setTodos(todos => [...todos, data]);
      });
    }
  };
  
  const changeIsCompleted = (id) => {
    const todoToUpdate = todos.filter(t => t._id === id)[0];

    fetch(host + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isCompleted: !todoToUpdate.isCompleted })
    })
    .then(res => res.json())
    .then(data => {
      setTodos(todos => todos.map(t => t._id === id ? data : t));
    });
  };

  const onTodoDelete = (id) => {
    fetch(host + `/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(result => {
      setTodos(todos => todos.filter(t => t._id !== id));
    });
  };

  return (
    <>
    <Header />

    <main className="main">
      <section className="todo-list-container">
        <h1>Todo List</h1>
        <div className="add-btn-container">
          <button onClick={onTodoAdd} className="btn">+ Add new Todo</button>
        </div>
          <div className="table-wrapper">
            {isLoading 
            ? <Loading /> 
            : <TodoListTable todos={todos} changeIsCompleted={changeIsCompleted} onTodoDelete={onTodoDelete} />}
          </div>
      </section>
    </main>

   <Footer />
</>
  )
}

export default App