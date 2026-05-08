import { useState } from 'react'
import AddTodo from './components/AddTodo'
import TodoItem from './components/TodoItem'
import './App.css'
import type { Todo, TodoStatus } from './types/Todo'

const initTodoList: Array<Todo> = [
  {
    id: Date.now(),
    title: '勉強する',
    status: 'notStarted'
  }
]

//function component
function App() {
  // TodoList情報
  const [todoLists, setTodoList] = useState(initTodoList)

  // 追加するTodo
  const [addTodoInputValue, setAddTodoInputValue] = useState<string>('')

  // 編集中Todo
  const [editedValues, setEditedValues] = useState<Record<number, string>>({})

  // 編集状態Todo
  const [editModeIds, setEditModeIds] = useState<Array<number>>([])


  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTodoInputValue(e.target.value)
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

  // todo追加
  const addTodo = (): void => {
    const trimAddTodoInputValue = addTodoInputValue.trim();

    if (!trimAddTodoInputValue) {
      return
    } else {
      setTodoList((prevList) => {
        return [
          ...prevList,
          {
            id: Date.now(),
            title: trimAddTodoInputValue,
            status: 'notStarted'
          }
        ]
      })
      setAddTodoInputValue('')
    }
  }

  //Todo編集
  const todoUpdate = (id: number) => {
    const trimEditedValue = editedValues[id]?.trim()

    if (!trimEditedValue) {
      return
    } else {
      setTodoList((prevList) => {
        const editedTodoLists = prevList.map((todo) => {
          return todo.id === id ? { ...todo, title: trimEditedValue } : todo
        })
        return editedTodoLists
      })
      setEditModeIds(
        (prev) => {
          return prev.filter((editModeId) => editModeId !== id)
        }
      )
    }
  }

  //Todo削除
  const deleteTodo = (todo: Todo) => {
    setTodoList((prevList) => {
      return prevList.filter((prevTodo) => prevTodo.id !== todo.id)
    })
  }

  //TodoStatus更新
  const updateTodoStatus = (id: number, status: TodoStatus) => {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, status } : todo
      )
    )
  }

  return (
    <>

      <header className='header-container'>
        <h1 className='header-title'>
          react todo <span className='header-text'>@typescript</span></h1>
      </header>

      <main>
        <section className='addTodo-container'>
          <AddTodo
            changeInputValue={changeInputValue}
            addTodoInputValue={addTodoInputValue}
            addTodo={addTodo}
          />
        </section>

        <section className='todoList-container'>
          <h2 className='todoList-title'>Todo lists</h2>

          <ul className='todoList-ul'>
            {
              todoLists.map((todo: Todo) => {
                const isEditing = editModeIds.includes(todo.id)

                return (
                  <TodoItem 
                    key={todo.id}
                    todo={todo}
                    isEditing={isEditing}
                    editedValues={editedValues}
                    handleEditedTitleInput={handleEditedTitleInput}
                    todoUpdate={todoUpdate}
                    updateTodoStatus={updateTodoStatus}
                    changeEditMode={changeEditMode}
                    deleteTodo={deleteTodo}
                  />
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
