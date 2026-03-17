import { useState } from 'react'
import './App.css'

type Todo = {
  id: number,
  title: string,
}

const initList: Array<Todo> = [
  {
    id: Date.now(),
    title: '勉強する'
  }
]

//function component
function App() {
  const [todoLists, setTodoList] = useState(initList)
  const [addTodoInputValue, setAddTodoInputValue] = useState<string>('')

  // 編集中Todo
  const [editedValues, setEditedValues] = useState<Record<number, string>>({})

  // 編集状態Todo
  const [editModeIds, setEditModeIds] = useState<Array<number>>([])


  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTodoInputValue(e.target.value)
  }

  // todo追加
  const addTodo = (): void => {
    setTodoList((prevList) => {
      return [
        ...prevList,
        {
          id: Date.now(),
          title: addTodoInputValue
        }
      ]
    })
    setAddTodoInputValue('')
  }

  //Todo編集
  const todoUpdate = (id: number) => {
    setTodoList((prevList) => {
      const editedTodoLists = prevList.map((todo) => {
        return todo.id === id ? { ...todo, title: editedValues[id] } : todo
      })
      return editedTodoLists
    })
    setEditModeIds(
      (prev) => {
        return prev.filter((editModeId) => editModeId !== id)
      }
    )
  }

  const deleteTodo = (todo: Todo) => {
    setTodoList((prevList) => {
      return prevList.filter((prevTodo) => prevTodo.id !== todo.id)
    })
  }

  const changeEditMode = (todo: Todo) => {
    setEditModeIds((prevIds) => {
      return prevIds.includes(todo.id) ? prevIds : [...prevIds, todo.id]
    })
    setEditedValues((prevValues) => {
      return {
        ...prevValues,
        [todo.id]: todo.title
      }
    })
  }

  const handleEditedTitleInput = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValues((prev) => ({
      ...prev,
      [id]: e.target.value
    }))
  }

  return (
    <>
      <header className='header-container'>
        <h1 className='header-title'>react todo <span className='header-text'>@typescript</span></h1>
        <p>{editModeIds}</p>
      </header>
      <main>
        <section className='addTodo-container'>
          <h2 className='addTodo-title'>Todoを追加する</h2>
          <div className='addTodo-inputContainer'>
            <label htmlFor="todoText">Todoを追加する：</label>
            <input className='addTodo-input' onChange={changeInputValue} id='todoText' type="text" placeholder='Todoを入力してください' value={addTodoInputValue} />
            <button onClick={addTodo}>追加</button>
          </div>
        </section>
        <section className='todoList-container'>
          <h2 className='todoList-title'>Todo lists</h2>
          <ul className='todoList-ul'>
            {
              todoLists.map((todo: Todo) => {
                const isEditing = editModeIds.includes(todo.id)
                return (
                  <li key={todo.id} className='todoList-listItem'>
                    {isEditing ?
                      <>
                        <input type="text" value={editedValues[todo.id]} onChange={(e) => handleEditedTitleInput(todo.id, e)} />
                        <button onClick={() => todoUpdate(todo.id)}>更新</button>
                      </>
                      :
                      <>
                        <p>{todo.title}</p>
                        <button onClick={() => changeEditMode(todo)}>編集</button>
                        <button onClick={() => deleteTodo(todo)}>削除</button>
                      </>}
                  </li>
                )
              })
            }
          </ul>
        </section>
      </main>
    </>
  )
}

export default App
