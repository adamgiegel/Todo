import React from 'react';

function Todos({ currentNum, limit, toggle, completeDate, completedData, dummyData, handleDelete, handleEdit }) {

    return (
        <>
            {toggle ?
                <div>
                    {dummyData.length === 0 ? <p className="progress">Nothing in progress yet...</p>
                        :
                        dummyData.slice(currentNum, limit).map(todo => {
                            return (
                                <div className='todoInput' >
                                    <div className='inputs'>{todo.title}</div>
                                    <div className='inputs'>Due: {todo.dueDate}</div>
                                    <div>
                                        <button className='addTaskButton' onClick={() => handleEdit(todo.id, todo.title, todo.dueDate, todo.notes)}>View/Edit</button>
                                        <button className='addTaskButton' onClick={() => handleDelete(todo.id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })}
                </div>
                :
                <div>
                    {completedData.length === 0 ? <p className="progress">No completed todo's yet...</p>
                        :
                        completedData.map(todo => {
                            return (
                                <div className='todoInput' >
                                    <div className='inputs'>{todo.title}</div>
                                    <div className='inputs'>Completed: {completeDate}</div>
                                    <div>
                                        <button className='addTaskButton' onClick={() => handleDelete(todo.id)}>DELETE</button>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            }
        </>
    );
}

export default Todos;