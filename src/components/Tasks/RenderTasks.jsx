import React from "react";
import { MdDeleteForever } from "react-icons/md"
import { Button } from "react-bootstrap";
import axios from "axios";

export default function RenderTasks({ task, reload }) {

    function deleteTask() {
        axios.delete(`http://localhost:3030/tasks/${task.id}`)
        .then(() => reload())
    }

    return <>
        <tr>
            <td>{task.id}</td>
            <td>{task.name}</td>
            <td className="">
                {task.description}
                <Button className="ml-3" onClick={deleteTask}><MdDeleteForever /></Button>
            </td>
        </tr>
    </>
}