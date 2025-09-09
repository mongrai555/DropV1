import React, { useState } from 'react'
import { useTodoStore } from '../store/todoStore'

const AddTodo: React.FC = () => {
  const [text, setText] = useState('')
  const addTodo = useTodoStore(state => state.addTodo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      addTodo(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="เพิ่มรายการใหม่..."
        className="todo-input"
      />
      <button type="submit" className="add-button">
        เพิ่ม
      </button>
    </form>
  )
}

export default AddTodo