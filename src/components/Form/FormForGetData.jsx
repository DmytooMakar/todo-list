import React, { useEffect, useRef, useState } from "react";
import  Form  from "react-bootstrap/Form"
import { Button } from "react-bootstrap";

import "./FormStyle.scss"
import axios from "axios";

export default function FormForGetData({ reload }) {
    const nameRef = useRef('');
    const descriptionRef = useRef('');
    

    function submitToDo() {
        axios.post("http://localhost:3030/tasks", { 
            "name": nameRef.current.value,
            "description": descriptionRef.current.value
        })
        .then(res => reload())
    }
    
   

    return <div className="form">
        <Form.Group>
            <div className="d-flex">
                <div className="mr-4">
                    <p className="mb-1">Name :</p>
                    <p className="mb-0">Description :</p>
                </div>
                <div>
                    <Form.Control ref={nameRef} className="mb-1" size="sm" type="text" placeholder="Enter name task" />
                    <Form.Control ref={descriptionRef} size="sm" type="text" placeholder="Enter description task" />
                </div>
            </div>
        </Form.Group>
        <Button variant="success" onClick={submitToDo}>Submit</Button>
    </div>
}