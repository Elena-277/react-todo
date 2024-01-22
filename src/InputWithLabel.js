import React from 'react';
import styles from './TodoListItem.module.css'; 

function InputWithLabel(props) {
    const inputRef = React.useRef();
    React.useEffect(() => {
        inputRef.current.focus();
    }
    );
    return (
        <> 
        <label htmlFor="todoTitle">{props.children} </label>
        <input id="todoTitle" name="title" className={styles.Input} value={props.todoTitle} onChange={props.handleTitleChange} ref={inputRef}></input>
        </>
    );
  }
  
  export default InputWithLabel;