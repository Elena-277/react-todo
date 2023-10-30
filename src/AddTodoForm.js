import React from 'react';

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
            <label htmlFor="todoTitle">Title </label>
            <input id="todoTitle" name="title" value={todoTitle} onChange={handleTitleChange}></input>
            <button>Add</button>
        </form>
    );
}

export default AddTodoForm;