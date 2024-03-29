import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './components/TodoListItem.module.css';

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async (tableName) => {

    const options = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
      }
    };

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`;

    try {
      const response = await
        fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      const todos = data.records.map((todo) => {

        const newTodo = {
          id: todo.id,
          title: todo.fields.title
        }
        return newTodo;
      }).sort((objectA, objectB) => {
        let result = 0;
        if (objectA.title < objectB.title) {result = -1;}
        if (objectA.title === objectB.title) {result = 0;}
        if (objectA.title > objectB.title) {result = 1;}
        return result;
      });

      setTodoList(todos);
      setIsLoading(false);
    }

    catch (error) {
      console.log(error.message)
    }
  }

  const removeitem = async (tableName, recid) => {

    let result = true;
    const options = {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
      }
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/${recid}`;

    try {
      const response = await
        fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
    }

    catch (error) {
      result = false;
      console.log(error.message)
    }
    return result;
  }

  const postData = async (tableName, newitem) => {

    let reqpayload = {
      "fields": {
        "title": newitem
      }
    };

    const options = {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(reqpayload)
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`;

    try {
      const response = await
        fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      const newTodo = {
        id: data.id,
        title: data.fields.title
      }
      setIsLoading(false);
      return newTodo;
    }

    catch (error) {
      console.log(error.message)
    }
  }

  let tableName = `${process.env.REACT_APP_TABLE_NAME}`;

  useEffect(() => {
    fetchData(tableName);
  }, [tableName]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [isLoading, todoList]);

  function addTodo(title) {
    (async() => {
      let postTodo = await postData(tableName, title);
      return setTodoList([...todoList, postTodo]);
    })();
  };

  function checkid(item, id) {
    return item.id !== this.arrid;
  }

  function removeTodo(id) {
    (async() => {
      let criteria = {
        arrid: id
      };
      const newTodoList = todoList.filter(checkid, criteria);
      let success = await removeitem(tableName, id);
      if (success === true) { setTodoList(newTodoList); }
    })();
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
               element={
                <>
                  <h1 className={styles.Heading1}>{tableName}</h1>
                  <AddTodoForm onAddTodo={addTodo} />
                  {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
                </> 
          }
        />
        <Route path="/new" 
               element={
                <>
                  <h1 className={styles.Heading1}>My Grocery List</h1>
                  <a href='./'>Welcome</a>  
                </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
