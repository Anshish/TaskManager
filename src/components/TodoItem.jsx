import React,{ useState } from 'react'
import { useTodo } from '../contexts/index'

function TodoItem({todo}) {
  const [isEditable,setIsEditable]=useState(false)
  const [todoMessage,setTodoMessage]=useState(todo.text)
  const {updateTodo,deleteTodo,toggleTodo}=useTodo()

  const editTodo=()=>{
    updateTodo(todo.id,{...todo,text:todoMessage})
    setIsEditable(false)
    console.log('editTodo() done setEditable set to false');
    console.log('inside editTodo isEditable: ',isEditable);
  }

  const toggleCompleted=()=>{
    toggleTodo(todo.id)
    console.log('toggleCompleted() done');
  }

  return (
    <div className={`flex shadow-md  duration-300
     border-[#e87c6c] px-2 py-1.5 mx-2 border-4 rounded-xl 
     ${todo.completed?'bg-[#895c08]':'bg-[#e9c075]'}`}>
      <input 
        type="checkbox" 
        className='cursor-pointer bg-[#e87c6c]'
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input 
        type="text"
        className={`text-[#1f5085] font-semibold text-xl px-4 outline-none 
          w-full bg-transparent ${isEditable?"border-2 mx-4 rounded-xl border-slate-500":
          "border-transparent"} ${todo.completed?'line-through':''}`}
        value={todoMessage}
        onChange={(e)=>setTodoMessage(e.target.value)}
        readOnly={!isEditable}
      />
      <button
        className='inline-flex w-14 h-8 rounded-lg text-lg 
        border-2 border-[#e87c6c] justify-center items-center
        bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
        onClick={()=>{
          if(todo.completed)return

          if(isEditable){
            editTodo()
            console.log('going to run editTodo()');
            console.log('inside if, isEditable: ',isEditable);
          }else{
            console.log('inside else prev isEditable: ',isEditable);
            setIsEditable(prev=>!prev)
            console.log('inside else is Editable changes');
            console.log('inside else current isEditable: ',isEditable);
          }
        }}
        disabled={todo.completed}
      >
        {isEditable?'📁':'✏️'}
      </button>
      <button
        className='inline-flex w-14 h-8 rounded-lg text-lg 
        border-2 border-[#e87c6c] justify-center items-center 
        bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
        onClick={()=>deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  )
}

export default TodoItem