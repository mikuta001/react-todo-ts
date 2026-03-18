type AddTodoProps = {
  changeInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
  addTodoInputValue: string,
  addTodo: () => void
}

const AddTodo = ({
  changeInputValue,
  addTodoInputValue,
  addTodo
}: AddTodoProps) => {
  return (
    <>
      <h2 className='addTodo-title'>Todoを追加する</h2>
      <div className='addTodo-inputContainer'>
        <label htmlFor="todoText">Todoを追加する：</label>
        <input className='addTodo-input' onChange={changeInputValue} id='todoText' type="text" placeholder='Todoを入力してください' value={addTodoInputValue} />
        <button onClick={addTodo}>追加</button>
      </div>
    </>
  )
}

export default AddTodo