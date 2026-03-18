import type { Todo } from "../types/Todo"

type TodoItemProps = {
  todo: Todo,
  isEditing: boolean,
  editedValues: Record<number, string>
  handleEditedTitleInput: (id: number, e: React.ChangeEvent<HTMLInputElement>) => void,
  todoUpdate: (id: number) => void
  changeEditMode: (todo: Todo) => void
  deleteTodo: (todo: Todo) => void
}

const TodoItem = ({
  todo,
  isEditing,
  editedValues,
  handleEditedTitleInput,
  todoUpdate,
  changeEditMode,
  deleteTodo
}: TodoItemProps) => {
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
}

export default TodoItem