import React from "react";
import Table from "react-bootstrap/Table"

import RenderTasks from "./RenderTasks";

import "./TasksStyle.scss"

export default function Tasks({ tasks, reload}) {

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
                { tasks.map(task => <RenderTasks key={task.id} task={task} reload={reload} />) }
            </tbody>
        </Table>
    </div>
}