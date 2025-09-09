import React from 'react'
import { useTodoStore } from '../store/todoStore'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'

const TodoList: React.FC = () => {
  const { todos, clearCompleted } = useTodoStore()

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <AddTodo />
      
      <div className="todo-stats">
        <span>ทั้งหมด: {totalCount}</span>
        <span>เสร็จแล้ว: {completedCount}</span>
        <span>เหลือ: {totalCount - completedCount}</span>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="no-todos">ยังไม่มีรายการ</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
            />
          ))
        )}
      </div>

      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="clear-completed-button"
        >
          ลบรายการที่เสร็จแล้ว ({completedCount})
        </button>
      )}
    </div>
  )
}

export default TodoList