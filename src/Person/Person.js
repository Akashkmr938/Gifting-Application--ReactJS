import React from 'react';
import "./Person.css";

const person = (props) => {
    return (
        <div className="person">
            <h3>Name: {props.Name}</h3>
            <h3>Age: {props.Age}</h3>
            <input onChange={props.namechange} value={props.Name}/>
        </div>
    );
}

export default person;