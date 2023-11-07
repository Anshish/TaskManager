import React, { useState } from 'react'
import { useTodo } from '../contexts/index'


function TodoForm() {
  const [todo,setTodo]=useState('')
  const {addTodo}=useTodo()

  const add=(e)=>{
    e.preventDefault()

    if(!todo)return
    addTodo({text:todo,completed:false})
    setTodo('')
    // console.log('addTodo() done');
  }

  return (
    <div>
        <form onSubmit={add} className='flex'>
          <input 
            type="text" 
            placeholder='Write Your Tasks Here ...' 
            className='bar shadow-md outline-none w-full 
              text-xl rounded-xl px-4 py-3 duration-150 mx-2 
              border-4 border-[#e87c6c] font-medium text-[#bf5b50]'
            value={todo}
            onChange={(e)=>setTodo(e.target.value)}
          />
          <button 
            type='submit' 
            className='bar shadow-md text-xl rounded-xl 
              bg-[#4e63a7] px-4 py-3 text-white mx-2 
              hover:bg-[#123C69] transition-all border-4 
              border-[#e87c6c] font-medium' >
            Add
          </button>
        </form>
    </div>
  )
}

export default TodoForm