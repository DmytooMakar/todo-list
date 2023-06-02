import React, { useEffect, useState } from 'react';
import axios from "axios";

import './App.scss';

import FormForGetData from './components/Form/FormForGetData';
import Tasks from './components/Tasks/Tasks';

function App() {
  const [ tasks, setTasks ] = useState([]);

    function reload() {
        axios.get(`http://localhost:3030/tasks`)
        .then(data => { console.log( data.data )
        setTasks(data.data)})
    }

    useEffect(() => {
        reload()
    }, [])

  return (
    <div className="container bg-light">
      <div className="d-flex">
        <FormForGetData reload={reload} />
        <Tasks tasks={tasks} reload={reload}/>
      </div>
    </div>
  );
}

export default App;
