import type { Todo, TodoStatus } from "../types/Todo"
import { TODO_STATUS_LABELS } from "../types/Todo"

type TodoItemProps = {
  todo: Todo,
  isEditing: boolean,
  editedValues: Record<number, string>
  handleEditedTitleInput: (id: number, e: React.ChangeEvent<HTMLInputElement>) => void,
  todoUpdate: (id: number) => void
  updateTodoStatus: (id: number, status: TodoStatus) => void
  changeEditMode: (todo: Todo) => void
  deleteTodo: (todo: Todo) => void
}

const TodoItem = ({
  todo,
  isEditing,
  editedValues,
  handleEditedTitleInput,
  todoUpdate,
  updateTodoStatus,
  changeEditMode,
  deleteTodo
}: TodoItemProps) => {
  return (
    <li className={`todoList-listItem todoList-listItem--${todo.status}`}>
      <div className="todoItem-main">
        <span className={`todoItem-statusBadge todoItem-statusBadge--${todo.status}`}>
          {TODO_STATUS_LABELS[todo.status]}
        </span>

        {isEditing ? (
          <input
            className="todoItem-editInput"
            type="text"
            value={editedValues[todo.id]}
            onChange={(e) => handleEditedTitleInput(todo.id, e)}
          />
        ) : (
          <p className={todo.status === 'done' ? 'todoItem-title done' : 'todoItem-title'}>
            {todo.title}
          </p>
        )}
      </div>

      <div className="todoItem-actions">
        <select
          className="todoItem-statusSelect"
          value={todo.status}
          onChange={(e) => updateTodoStatus(todo.id, e.target.value as TodoStatus)}
        >
          <option value="notStarted">未着手</option>
          <option value="inProgress">進行中</option>
          <option value="done">完了</option>
        </select>

        {isEditing ? (
          <button onClick={() => todoUpdate(todo.id)}>更新</button>
        ) : (
          <button onClick={() => changeEditMode(todo)}>編集</button>
        )}

        <button onClick={() => deleteTodo(todo)}>削除</button>
      </div>
    </li>

    // <li key={todo.id} className='todoList-listItem'>
    //   <div className="todoList-itemContainer">
    //     {isEditing ?
    //       <>
    //         <input type="text" value={editedValues[todo.id]} onChange={(e) => handleEditedTitleInput(todo.id, e)} />
    //         <button onClick={() => todoUpdate(todo.id)}>更新</button>
    //       </>
    //       :
    //       <>
    //         <p>{todo.title}</p>
    //         <button onClick={() => changeEditMode(todo)}>編集</button>
    //         <button onClick={() => deleteTodo(todo)}>削除</button>
    //       </>}
    //   </div>
    // </li>
  )
}

export default TodoItem