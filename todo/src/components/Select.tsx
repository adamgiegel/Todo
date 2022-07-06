import React from 'react';
import { VoidFunctionComponent } from 'react';

export interface Props {
    toggle: boolean;
    toggleList: () => void;
    sortValue: string;
    handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Select(props: Props) {
    return (
        <div className="statusDiv">
            <div className={!props.toggle ? 'statuses' : 'none'} onClick={props.toggleList}>Completed</div>
            <div className={props.toggle ? 'statuses' : 'none'} onClick={props.toggleList}>In Progress</div>
            <div>
                <select className="select" value={props.sortValue} onChange={props.handleSort}>
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