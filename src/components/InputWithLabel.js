import React from 'react';
import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types';

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
  
InputWithLabel.propTypes = {
    todoTitle: PropTypes.string,
    handleTitleChange: PropTypes.func    
};

export default InputWithLabel;