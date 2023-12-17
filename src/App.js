import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {

    const options = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
      } 
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

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
      });
      
      setTodoList(todos);
      setIsLoading(false);
    } 
    
    catch (error) {
      console.log(error.message)
    }
  }

  const removeitem = async (recid) => {

    let result = true;
    const options = {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
      } 
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${recid}`;

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [isLoading, todoList]);

  function addTodo(newTodo) {
    return setTodoList([...todoList, newTodo]);
  };

  function checkid(item, id) {
    return item.id !== this.arrid;
  }

  function removeTodo(id) {
    let criteria = {
      arrid: id
    };
    const newTodoList = todoList.filter(checkid, criteria);
    let success = removeitem(id);
    if (success === true) { setTodoList(newTodoList); }
  }

  return (
    <>
      <h1>Todo list</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? <p>Loading...</p> : null}
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
