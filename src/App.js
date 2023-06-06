import React, { useEffect, useState } from 'react';
import axios from "axios";

import './App.scss';

import FormForGetData from './components/Form/FormForGetData';
import Tasks from './components/Tasks/Tasks';

import { Context } from './Context';

function App() {
  const [ tasks, setTasks ] = useState([]);
  const [ dataForEdit, setDataForEdit ] = useState(null);

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
        <Context.Provider value={{ reload, dataForEdit, setDataForEdit, tasks }}>
          <FormForGetData />
          <Tasks />
        </Context.Provider>
      </div>
    </div>
  );
}

export default App;
