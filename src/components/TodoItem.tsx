import React from 'react'
import { useTodoStore } from '../store/todoStore'

interface TodoItemProps {
  id: number
  text: string
  completed: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed }) => {
  const { toggleTodo, deleteTodo } = useTodoStore()

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
        className="todo-checkbox"
      />
      <span className="todo-text">{text}</span>
      <button
        onClick={() => deleteTodo(id)}
        className="delete-button"
      >
        ลบ
      </button>
    </div>
  )
}

export default TodoItem