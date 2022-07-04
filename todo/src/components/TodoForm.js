import React from 'react';
import '../App.css'

function TodoForm({ showModalMessage, markComplete, setTitle, setDueDate, setNotes, title, dueDate, notes, onSubmit, dummyData, editOpen, editObject, onSubmitEdit, todoValue, setTodoValue, handleDelete }) {

    const handleChange = (e) => {
        if (e.target.id === 'title') {
            if (e.target.value.length === 40) {
                showModalMessage("Title can only be 40  characters long")
            } else {
                setTitle(e.target.value)
            }
        } else if (e.target.id === 'dueDate') {
            setDueDate(e.target.value)
        } else if (e.target.id === 'notes') {
            setNotes(e.target.value)
        }
    }

    return (
        <>
            <h1>{!editOpen ? "Edit your Todo" : "Add a Todo"}</h1>
            <div className='todoBox'>
                <form className="form" onSubmit={!editOpen ? (e) => onSubmitEdit(e, editObject.id, title, dueDate, notes) : (e) => onSubmit(e, title, dueDate, notes)}>
                    <input id='title' maxLength='41' value={title} onChange={handleChange} type='text' placeholder={!editOpen ? editObject.title : 'Add Title...'} ></input>
                    <input id='dueDate' value={dueDate} onChange={handleChange} type='date' placeholder={!editOpen ? editObject.dueDate : 'Add Date...'}></input>
                    <textarea id='notes' value={notes} onChange={handleChange} type='text' placeholder={!editOpen ? editObject.notes : 'Add Notes...'}></textarea>
                    <div>
                        <button className="addTaskButton" type='submit'>{!editOpen ? "Done w/ Edit" : "Add Todo"}</button>
                        {!editOpen ? <button onClick={(e) => markComplete(e, editObject.id)} className="addTaskButton" type='submit'>Complete todo</button> : <></>}
                    </div>
                </form>
            </div>
        </>
    );
}

export default TodoForm;