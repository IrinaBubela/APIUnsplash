import React from 'react'
import SingleResult from "./SingleResult";

const Results = (props) => {
    let results = '';

    if (props.results.length > 0) {
        results = (
            <div className="result-container">
                <ul className="result-list">
                    {
                        props.results.map((el, i) => (
                            <li key={i}>
                                <SingleResult item={el} />
                            </li>
                        ))
                    }
                </ul>
            </div >
        )
    }
    return results;
}


export default Results;