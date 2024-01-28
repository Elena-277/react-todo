import React from 'react';
import InputWithLabel from './InputWithLabel';
import styles from './TodoListItem.module.css'; 
import PropTypes from 'prop-types';

function AddTodoForm({onAddTodo}) {    
    const [todoTitle, setTodoTitle] = React.useState('');
    function handleTitleChange(event) {
        event.preventDefault();
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }
    function handleAddTodo(event) {
        event.preventDefault();
        onAddTodo({            
            id: Date.now(),
            title: todoTitle
        });
        setTodoTitle('');
    }
    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel todoTitle={todoTitle} handleTitleChange ={handleTitleChange}>Title</InputWithLabel>
            <button className={styles.Button}>Add</button>
        </form>
    );
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func
};

export default AddTodoForm;