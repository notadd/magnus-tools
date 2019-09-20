import React from 'react';
import uuidv4 from 'uuid/v4';
import './../../App.css'
import { getRandomColor } from '../util';
export const NewContext = (props) => {
    return (<React.Fragment>
        <span style={{ marginRight: "10px" }}><input id="newContextName"></input></span>
        <span style={{ marginRight: "10px" }}><input id="newContextColor" type="color"></input></span>
        <span>
            <button className="button commandBtn" onClick={() => {
                const contextNameInput = document.getElementById("newContextName");
                const trimmedContextName = contextNameInput.value.trim()
                const contextNameColor = document.getElementById("newContextColor");
                const trimmedContextColor = contextNameColor.value.trim()
                if (trimmedContextName.length > 0) {
                    const newContext = {
                        id: uuidv4(),
                        name: trimmedContextName,
                        color: trimmedContextColor || getRandomColor()
                    };
                    contextNameInput.value = "";
                    props.createNewBoundedContext(newContext);
                }
            }}>创建</button>
        </span>
    </React.Fragment>);
};
