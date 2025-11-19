const priorityColors = {
  alta: '#ff6b6b',
  media: '#ffd93d',
  baja: '#6bff6b',
};

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li style={{ borderLeft: `10px solid ${priorityColors[todo.priority]}` }}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id, todo.done)}
      />

      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text} — <small>{todo.priority}</small>
      </span>

      <button onClick={() => onDelete(todo.id)}>Eliminar</button>
    </li>
  );
}

