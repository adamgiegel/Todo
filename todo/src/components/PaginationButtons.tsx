import React from 'react';

interface Props {
    onNextClick: () => void;
    onPreviousClick: () => void;
    onFirstClick: () => void;
    onLastClick: () => void;
    pageNums?: number[];
    goToPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function PaginationButtons(props: Props) {
    return (
        <div className="paginationContainer">
            <button className="addTaskButton" onClick={props.onFirstClick}>First</button>
            <button className="addTaskButton" onClick={props.onNextClick}>Next</button>
            {
                props.pageNums?.map(pages => {
                    return (
                        <button className="pageButton" onClick={props.goToPage}>{pages}</button>)
                })
            }
            <button className="addTaskButton" onClick={props.onPreviousClick}>Previous</button>
            <button className="addTaskButton" onClick={props.onLastClick}>Last</button>
        </div>
    );
}

export default PaginationButtons;