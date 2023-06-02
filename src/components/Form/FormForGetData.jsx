import React, { useRef, useContext } from "react";
import  Form  from "react-bootstrap/Form"
import { Button } from "react-bootstrap";

import "./FormStyle.scss"
import axios from "axios";

import { Context } from "../../Context";

export default function FormForGetData() {
    const { reload, dataForEdit, setDataForEdit } = useContext(Context)

    const nameRef = useRef('');
    const descriptionRef = useRef('');
    

    function submitToDo() {
        if(nameRef.current.value === '' && descriptionRef.current.value === '' || descriptionRef.current.value.length > 20){
            return alert("Enter valid value no more than 20 characters");
        };
        axios.post("http://localhost:3030/tasks", { 
            "name": nameRef.current.value,
            "description": descriptionRef.current.value
        })
        .then(res => {
            reload(); 
            clearInput() 
        })
    }

    function updateTask() {
        axios.patch(`http://localhost:3030/tasks/${dataForEdit.id}`, {
            "name": nameRef.current.value,
            "description": descriptionRef.current.value 
        })
        .then(() => {
            reload();
            setDataForEdit(null);
        })
    }
    
    function clearInput() {
        nameRef.current.value = '';
        descriptionRef.current.value = '';
    }

    return <div className="form">
        <Form.Group>
            <div className="d-flex">
                <div className="mr-4">
                    <p className="mb-1">Name :</p>
                    <p className="mb-0">Description :</p>
                </div>
                <div>
                    <Form.Control className="mb-1" ref={nameRef} key={dataForEdit?.id + 'a'} defaultValue={dataForEdit ? dataForEdit.name : ''} size="sm" type="text" placeholder="Enter name task" />
                    <Form.Control ref={descriptionRef} key={dataForEdit?.id + 'b'} defaultValue={dataForEdit ? dataForEdit.description : ''} size="sm" type="text" placeholder="Enter description task" />
                </div>
            </div>
        </Form.Group>
        <Button variant="success" onClick={dataForEdit ? updateTask : submitToDo}>Submit</Button>
    </div>
}