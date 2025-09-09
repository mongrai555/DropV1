import { useTodoStore, type Todo } from "../store/todoStore";

interface TodoItemProps {
    todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
    const { deleteTodo, toggleTodo } = useTodoStore();

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                border: '1px solid #eee',
                borderRadius: '4px',
                marginBottom: '8px',
                backgroundColor: todo.completed ? '#f8f9fa' : 'white'
            }}
        >
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '10px' }}
            />
            
            <span
                style={{
                    flex: 1,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#6c757d' : 'black',
                    fontSize: '16px'
                }}
            >
                {todo.text}
            </span>
            
            <small style={{ color: '#6c757d', marginRight: '10px' }}>
                {todo.createdAt.toLocaleTimeString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </small>
            
            <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
            >
                ลบ
            </button>
        </div>
    );
};

export default TodoItem;