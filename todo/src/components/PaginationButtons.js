import React from 'react';

function PaginationButtons({ dummyData, onNextClick, onPreviousClick }) {

    return (
        <>
            {dummyData.length >= 5 ?
                <div>
                    <button className="addTaskButton" onClick={onNextClick}>Next</button>
                    <button className="addTaskButton" onClick={onPreviousClick}>Previous</button>
                </div> : <></>}
        </>
    );
}

export default PaginationButtons;