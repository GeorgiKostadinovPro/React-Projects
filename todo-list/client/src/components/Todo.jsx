function Todo({ data, changeIsCompleted, onTodoDelete }) {
    return (
      <tr className={`todo ${data.isCompleted ? 'is-completed' : ''}`.trim()}>
        <td>{data.text}</td>
        <td>{data.isCompleted ? 'Done' : 'In Progress' }</td>
        <td className="todo-action">
          <button onClick={() => changeIsCompleted(data._id)} className="btn todo-btn">Change status</button>
          <button onClick={() => onTodoDelete(data._id)} className="btn todo-btn">Remove</button>
        </td>
      </tr>
    );
}

export default Todo