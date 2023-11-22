import React, {useState, useEffect} from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    let promise = new Promise(function (resolve, reject) {
      setTimeout(
        () => 
          resolve({
            data: {
              todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [] 
            },
          }), 
        2000
      );
    }).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading)
    {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  function addTodo(newTodo){
    return setTodoList([...todoList, newTodo]);
  };

  function removeTodo(id) {
    function checkid(item) {
      return item.id != id;
    }
    const newTodoList = todoList.filter(checkid);
    setTodoList(newTodoList);
  }
    
  return (
    <>
      <h1>Todo list</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      {isLoading ? <p>Loading...</p> : null}
      <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
    </>
  );
}

export default App;
