import Todo from "./Todo";

function TodoListTable({ todos, changeIsCompleted, onTodoDelete }) {
    return (
        <table className="table">
          <thead>
            <tr>
              <th className="table-header-task">Task</th>
              <th className="table-header-status">Status</th>
              <th className="table-header-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((el) => <Todo key={el._id} data={el} changeIsCompleted={changeIsCompleted} onTodoDelete={onTodoDelete} />)}
          </tbody>
        </table>
    );
}

export default TodoListTable