export type TodoStatus =  'notStarted' | 'inProgress' | 'done'

export const TODO_STATUS_LABELS: Record<TodoStatus, string> = {
  notStarted: '未着手',
  inProgress: '進行中',
  done: '完了'
}

export type Todo = {
  id: number,
  title: string,
  status: TodoStatus
}
