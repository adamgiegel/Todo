import React from 'react';

interface Props {
    onNextClick: () => void;
    onPreviousClick: () => void;
    onFirstClick: () => void;
    onLastClick: () => void;
}

function PaginationButtons(props: Props) {
    return (
        <div>
            <button className="addTaskButton" onClick={props.onFirstClick}>First</button>
            <button className="addTaskButton" onClick={props.onNextClick}>Next</button>
            <button className="addTaskButton" onClick={props.onPreviousClick}>Previous</button>
            <button className="addTaskButton" onClick={props.onLastClick}>Last</button>
        </div>
    );
}

export default PaginationButtons;