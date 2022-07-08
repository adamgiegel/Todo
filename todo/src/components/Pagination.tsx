import React from 'react';
import PaginationButtons from './PaginationButtons';

export interface Props {
    dummyData: { id: number, title: string, dueDate: string, notes: string }[];
    completedData: { id: number, title: string, dueDate: string, notes: string }[];
    onNextClick: () => void;
    onPreviousClick: () => void;
    onFirstClick: () => void;
    onLastClick: () => void;
    pageNums?: number[];
    goToPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Pagination(props: Props) {

    return (
        <>
            {props.dummyData.length >= 6 ?
                <div>
                    <PaginationButtons
                        onNextClick={props.onNextClick}
                        onPreviousClick={props.onPreviousClick}
                        onFirstClick={props.onFirstClick}
                        onLastClick={props.onLastClick}
                        pageNums={props.pageNums}
                        goToPage={props.goToPage} />
                </div> : <></>}
            {props.completedData.length >= 6 ?
                <div>
                    <PaginationButtons
                        onNextClick={props.onNextClick}
                        onPreviousClick={props.onPreviousClick}
                        onFirstClick={props.onFirstClick}
                        onLastClick={props.onLastClick}
                        pageNums={props.pageNums}
                        goToPage={props.goToPage} />
                </div> : <></>}
        </>
    );
}

export default Pagination;