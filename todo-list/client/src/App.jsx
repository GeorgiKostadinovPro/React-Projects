import { useState, useEffect } from 'react'
import Loading from './components/Loading'
import Header from './components/Header'
import TodoListTable from './components/TodoListTable'
import Footer from './components/Footer'

import * as todoService from './services/todoService.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    todoService
      .getAll()
      .then(data => {
        setTodos(Object.values(data).reverse());
        setIsLoading(false);
      });
  }, []);
  
  const onTodoAdd = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const text = formData.get('todo-text');

    if (text) {
      todoService
        .create(text)
        .then(data => {
          setTodos(todos => [data, ...todos]);
        });

      e.currentTarget.reset();
    }
  };
  
  const changeIsCompleted = (id) => {
    const todoToUpdate = todos.filter(t => t._id === id)[0];

    todoService
      .update(id, todoToUpdate)
      .then(data => {
        setTodos(todos => todos.map(t => t._id === id ? data : t));
      });
  };

  const onTodoDelete = (id) => {
    todoService
      .deleteTodo(id)
      .then(setTodos(todos => todos.filter(t => t._id !== id)));
  };

  return (
    <>
    <Header />

    <main className="main">
      <section className="todo-list-container">
       
          <div className="add-btn-container"> 
            <form onSubmit={onTodoAdd}>
              <input className="add-new-todo-input" name="todo-text" type="text" placeholder="New todo..." required />
              <button type="submit" className="btn">+ New Todo</button>
            </form>
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