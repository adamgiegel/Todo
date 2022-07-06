import React from 'react';

export interface Props {
    dummyData: { id: number, title: string, dueDate: string, notes: string }[];
    completedData: { id: number, title: string, dueDate: string, notes: string }[];
    onNextClick: () => void;
    onPreviousClick: () => void;
}

function PaginationButtons(props: Props) {

    return (
        <>
            {props.dummyData.length >= 5 ?
                <div>
                    <button className="addTaskButton" onClick={props.onNextClick}>Next</button>
                    <button className="addTaskButton" onClick={props.onPreviousClick}>Previous</button>
                </div> : <></>}
            {props.completedData.length >= 5 ?
                <div>
                    <button className="addTaskButton" onClick={props.onNextClick}>Next</button>
                    <button className="addTaskButton" onClick={props.onPreviousClick}>Previous</button>
                </div> : <></>}
        </>
    );
}

export default PaginationButtons;