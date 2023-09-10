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
function App() {
  return (
    <div>
      <h1>Todo list</h1>
      <ul>
        {
          todoList.map(function(item){
            return <li key={item.id}>{item.title}</li>;
          }
          )
        }
      </ul>
    </div>
  );
}

export default App;
