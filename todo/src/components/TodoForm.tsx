import React from 'react';
import '../App.css'

export interface Props {
    showModalMessage: (message: string) => void;
    markComplete: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setDueDate: React.Dispatch<React.SetStateAction<string>>;
    setNotes: React.Dispatch<React.SetStateAction<string>>;
    title: string;
    dueDate: string;
    notes: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>, title: string, dueDate: string, notes: string) => void;
    editOpen: boolean;
    editObject: { id: number, title: string, dueDate: string, notes: string };
    onSubmitEdit: (e: React.FormEvent<HTMLFormElement>, id: number, title: string, dueDate: string, notes: string) => void;
}

function TodoForm(props: Props) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.id === 'title') {
            if (e.target.value.length === 40) {
                props.showModalMessage("Title can only be 40  characters long")
            } else {
                props.setTitle(e.target.value)
            }
        } else if (e.target.id === 'dueDate') {
            props.setDueDate(e.target.value)
        } else if (e.target.id === 'notes') {
            props.setNotes(e.target.value)
        }
    }

    return (
        <>
            <h1>{!props.editOpen ? "Edit your Todo" : "Add a Todo"}</h1>
            <div className='todoBox'>
                <form className="form" onSubmit={!props.editOpen ? (e) => props.onSubmitEdit(e, props.editObject.id, props.title, props.dueDate, props.notes) : (e) => props.onSubmit(e, props.title, props.dueDate, props.notes)}>
                    <input id='title' maxLength={41} value={props.title} onChange={handleChange} type='text' placeholder={!props.editOpen ? props.editObject.title : 'Add Title...'} ></input>
                    <input id='dueDate' value={props.dueDate} onChange={handleChange} type='date' placeholder={!props.editOpen ? props.editObject.dueDate : 'Add Date...'}></input>
                    <textarea id='notes' value={props.notes} onChange={handleChange} placeholder={!props.editOpen ? props.editObject.notes : 'Add Notes...'}></textarea>
                    <div>
                        <button className="addTaskButton" type='submit'>{!props.editOpen ? "Done w/ Edit" : "Add Todo"}</button>
                        {!props.editOpen ? <button onClick={(e) => props.markComplete(e, props.editObject.id)} className="addTaskButton" type='submit'>Complete todo</button> : <></>}
                    </div>
                </form>
            </div>
        </>
    );
}

export default TodoForm;