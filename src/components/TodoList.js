import React from 'react';
import TodoListItem from './TodoListItem'; 
import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types';

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

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func
};
  
export default TodoList;