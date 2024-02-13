import React from 'react';
import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types';

function InputWithLabel({todoTitle, handleTitleChange, children}) {
    const inputRef = React.useRef();
    React.useEffect(() => {
        inputRef.current.focus();
    }
    );
    return (
        <> 
        <label htmlFor="todoTitle">{children} </label>
        <input id="todoTitle" name="title" className={styles.Input} value={todoTitle} onChange={handleTitleChange} ref={inputRef}></input>
        </>
    );
  }
  
InputWithLabel.propTypes = {
    todoTitle: PropTypes.string,
    handleTitleChange: PropTypes.func,
    children: PropTypes.string
};

export default InputWithLabel;