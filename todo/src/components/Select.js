import React from 'react';

function Select({ toggle, toggleList, sortValue, handleSort }) {
    return (
        <div className="statusDiv">
            <div className={!toggle ? 'statuses' : 'none'} onClick={toggleList}>Completed</div>
            <div className={toggle ? 'statuses' : 'none'} onClick={toggleList}>In Progress</div>
            <div>
                <select className="select" value={sortValue} onChange={handleSort}>
                    <option value="aToz">Title: A - Z</option><br></br>
                    <option value="zToa">Title: Z- A</option>
                    <option value="dateAsc">Due Date: Ascending</option>
                    <option value="dateDes">Due Date: Descending</option>
                </select>
            </div>
        </div>
    );
}

export default Select;