import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts/index'
import {TodoForm,TodoItem} from './components/index'
import './App.css'

function App() {
  // const [todos,setTodos]=useState([])

  // const addTodo=(todo)=>{
  //   setTodos(prev=> // prev are all the todos that are already present
  //     [...prev,{id:Date.now(),...todo}] // spread previous todos so that they remains as it is and add new todo with id Date.now() and spread other parameters sot that they remain as it is
  //   )
  // }

  // const updateTodo=(id,todo)=>{
  //   setTodos(prev=>
  //     prev.map(prevItem=> // map through all the todos already present
  //       prevItem.id===id?todo:prevItem // if id matches with the id given then assign this prevoius todo this new todo else return previous todo 
  //     )
  //   )
  // }
  
  // const deleteTodo=(id)=>{
  //   setTodos(prev=>
  //     prev.filter(prevItem=> // filter out the todo with the given id and return all the todos except the one with the given id
  //       prevItem.id!==id
  //     )
  //   )
  // }

  // const toggleComplete=(id)=>{
  //   setTodos(prev=>
  //     prev.map(prevItem=>
  //       prevItem.id===id?{...prevItem,completed:!prevItem.completed}:prev // if id matches with the id given then toggle the completed property of the todo else return previous todo
  //     )  
  //   )
  // }

  const [todos,setTodos]=useState([])

  const addTodo=(todo)=>{
    setTodos((prev)=>(
      [{id:Date.now(),...todo},...prev]
    ))
    // console.log('addTodo() done');
  }

  const updateTodo=(id,todo)=>{
    setTodos((prev)=>(
      prev.map((item)=>(
        item.id===id?todo:item
      ))
    ))
    // console.log('updateTodo() done');
  }

  const deleteTodo=(id)=>{
    setTodos((prev)=>(
      prev.filter((item)=>(
        item.id!==id
      ))
    ))
    // console.log('deleteTodo() done');
  }

  const toggleTodo=(id)=>{
    setTodos((prev)=>(
      prev.map((item)=>(
        item.id===id?{...item,completed:!item.completed}:item
      ))
    ))
    // console.log('toggleTodo() done');
  }

  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem('todos'))
    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleTodo}}>
      <div className='max-w-3xl mx-auto container min-h-screen py-8'>
        <div  className= 'w-3/4  mx-auto'>
          <h1 className='text-4xl font text-[#de6552] font-bold text-center mb-8 mt-2'>Manage Your Tasks</h1>
          <div className='mb-4'>
            {
              todos.map((todo)=>(
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))
            }
          </div>
          <div className=' '>
            <TodoForm />
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
