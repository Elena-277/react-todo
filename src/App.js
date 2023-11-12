import React, {useState, useEffect} from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function useSemipersistantState(){
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);
  return [todoList, setTodoList];
};

function App() {
  const [todoList, setTodoList] = useSemipersistantState();

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
      <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
    </>
  );
}

export default App;
