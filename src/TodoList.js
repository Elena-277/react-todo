import React from 'react';

const todoList = [
    {
      id: 1,
      title: 'do_no_1'
    },
    {
      id: 2,
      title: 'do_no_2'
    },
    {
      id: 3,
      title: 'do_no_3'
    }
  ]

function TodoList() {
    return (
        <ul>
          {
            todoList.map(function(item){
              return <li key={item.id}>{item.title}</li>;
            }
            )
          }
        </ul>
    );
  }
  
  export default TodoList;