import React, { useRef, useContext, useState } from "react";
import  Form  from "react-bootstrap/Form"
import { Button } from "react-bootstrap";

import "./FormStyle.scss"
import axios from "axios";

import { Context } from "../../Context";

export default function FormForGetData() {
    const { reload, dataForEdit, setDataForEdit } = useContext(Context);
    const [ danger,  setDanger ] = useState({
        name: false,
        description: false
    })
    const nameRef = useRef('');
    const descriptionRef = useRef('');

    function validation() {
        if ( nameRef.current.value === '' || nameRef.current.value.length > 15 ){
            return ( false, setDanger({ name: true, description: false }), alert("Enter valid value no more than 15 characters") );
        } else if ( descriptionRef.current.value === '' || descriptionRef.current.value.length > 20 ) {
            return ( false, setDanger({ name: false, description: true }), alert("Enter valid value no more than 20 characters") );
        } else return true
    };

    function submitToDo() {
        if (!validation()) {
            return
        }
        axios.post("http://localhost:3030/tasks", { 
            "name": nameRef.current.value,
            "description": descriptionRef.current.value
        })
        .then(res => {
            setDanger({ name: false, description: false })
            reload(); 
            clearInput();
        })
    };

    function updateTask() {
        if (!validation()) {
            return
        }
        axios.patch(`http://localhost:3030/tasks/${dataForEdit.id}`, {
            "name": nameRef.current.value,
            "description": descriptionRef.current.value 
        })
        .then(() => {
            setDanger({ name: false, description: false })
            reload();
            setDataForEdit(null);
        })
        .catch(() => { 
            alert('Sorry this task was deleted'); 
            reload();
            setDataForEdit(null);
        })
    };
    
    function clearInput() {
        nameRef.current.value = '';
        descriptionRef.current.value = '';
    };
 
    return <div className="form">
        <Form.Group>
            <div className="d-flex">
                <div className="mr-4">
                    { dataForEdit ? 
                        <span>id: {dataForEdit.id}</span> :
                        ''
                    }
                    <p className="mb-1">Name :</p>
                    <p className="mb-0">Description :</p>
                </div>
                <div>
                    <Form.Control className="mb-1" ref={nameRef}
                    key={dataForEdit?.id + 'a'} defaultValue={ dataForEdit ? dataForEdit.name : '' } 
                    size="sm" type="text" placeholder="Enter name task" />
                    <Form.Control ref={descriptionRef} key={dataForEdit?.id + 'b'} 
                    defaultValue={ dataForEdit ? dataForEdit.description : '' } size="sm" 
                    type="text" placeholder="Enter description task" />
                </div>
            </div>
        </Form.Group>
        <Button className={ danger.name ? 'btn-danger' : danger.description ? 'btn-danger' : 'btn-success' } 
        onClick={ dataForEdit ? updateTask : submitToDo }>{ dataForEdit ? 'Update' : 'Submit' }</Button>
    </div>
}