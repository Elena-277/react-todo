import React from 'react';
import TodoListItem from './TodoListItem'; 
import styles from './TodoListItem.module.css';

function TodoList({todoList, onRemoveTodo}) {
    return (
        <ul className={styles.List}>
          {
            todoList.map(function(item){              
              return <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo}/>;
            }
            )
          }
        </ul>
    );
  }
  
  export default TodoList;