import TodoItem from './TodoItem'

const TodoTable = ({todos}) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Todo Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Status</th>
                    <th scope="col">User</th>
                    <th scope="col" colSpan={2}>Operations</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo, i)=> (<TodoItem key={todo.id} index={i + 1} todoName={todo.name} category={todo.category} deadline={todo.deadline} status={todo.status} user={todo.user}/>))}
            </tbody>
        </table>
    )
}

export default TodoTable