import Image from "next/image"

const TodoItem = ({ index, todoName, category, deadline, status, user }) => {
    return (
        <tr>
            <th scope="row">{ index }</th>
            <td>{ todoName }</td>
            <td>{ category }</td>
            <td>{ deadline }</td>
            <td>{ status }</td>
            <td>{ user }</td>
            <td><button type="button" className="btn btn-light"><Image src="/assets/Edit.png" width={20} height={20}/></button></td>
            <td><button type="button" className="btn btn-light"><Image src="/assets/Delete.png" width={20} height={20}/></button></td>
        </tr>
    )
}

export default TodoItem