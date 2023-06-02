import React, { useContext } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md"
import { Button } from "react-bootstrap";
import axios from "axios";
import { Context } from "../../Context";

export default function RenderTasks({ task }) {
    const { reload, setDataForEdit, dataForEdit } = useContext(Context);

    function deleteTask() {
        axios.delete(`http://localhost:3030/tasks/${task.id}`)
        .then(() => reload())
    }

    function editData() {
        setDataForEdit({
            name: task.name,
            description: task.description,
            id: task.id
        })
        console.log(dataForEdit)
    }

    return <>
        <tr>
            <td>{task.id}</td>
            <td>{task.name}</td>
            <td className="">
                {task.description}
                <Button className="ml-3" onClick={editData} ><MdEdit /></Button>
                <Button className="ml-3" onClick={deleteTask} ><MdDeleteForever /></Button>
            </td>
        </tr>
    </>
}