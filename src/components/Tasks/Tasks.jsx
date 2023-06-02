import React, { useContext } from "react";
import Table from "react-bootstrap/Table"

import RenderTasks from "./RenderTasks";

import "./TasksStyle.scss"
import { Context } from "../../Context";

export default function Tasks() {

    const { tasks } = useContext(Context);

    return <div className="tasks" >
        <Table  striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                { tasks.map(task => <RenderTasks key={task.id} task={task} />) }
            </tbody>
        </Table>
    </div>
}