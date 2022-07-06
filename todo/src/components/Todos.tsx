import React from 'react';

export interface Props {
    currentNum: number,
    limit: number,
    toggle: boolean,
    completeDate: string,
    completedData: { id: number, title: string, dueDate: string, notes: string }[],
    dummyData: { id: number, title: string, dueDate: string, notes: string }[],
    handleDelete: (id: number) => void;
    handleEdit: (id: number, title: string, dueDate: string, notes: string) => void;
}


function Todos(props: Props) {

    return (
        <>
            {props.toggle ?
                <div>
                    {props.dummyData.length === 0 ? <p className="progress">Nothing in progress yet...</p>
                        :
                        props.dummyData.slice(props.currentNum, props.limit).map(todo => {
                            return (
                                <div className='todoInput' >
                                    <div className='inputs'>{todo.title}</div>
                                    <div className='inputs'>Due: {todo.dueDate}</div>
                                    <div>
                                        <button className='addTaskButton' onClick={() => props.handleEdit(todo.id, todo.title, todo.dueDate, todo.notes)}>View/Edit</button>
                                        <button className='addTaskButton' onClick={() => props.handleDelete(todo.id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })}
                </div>
                :
                <div>
                    {props.completedData.length === 0 ? <p className="progress">No completed todo's yet...</p>
                        :
                        props.completedData.map(todo => {
                            return (
                                <div className='todoInput' >
                                    <div className='inputs'>{todo.title}</div>
                                    <div className='inputs'>Completed: {props.completeDate}</div>
                                    <div>
                                        <button className='addTaskButton' onClick={() => props.handleDelete(todo.id)}>DELETE</button>
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