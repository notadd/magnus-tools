import React, { useState, useEffect } from 'react';
import { BoundedContext } from "./BoundedContext";
import { NewContext } from './NewContext';

export const BoundedContextList = (props) => {
  window.ga('set', 'page', '/bounded-contexts-page');
  window.ga('send', 'pageview');

  const contextsFromLocalStorage = JSON.parse(localStorage.getItem("contexts"))
  const [contexts, setContexts] = useState(contextsFromLocalStorage || []);


  function createNewBoundedContext(newContext) {
    setContexts([...contexts, newContext]);
    window.ga('send', 'event', 'Context', 'ContextCreated');
  }

  useEffect(() => {
    const contextJson = JSON.stringify(contexts);
    localStorage.setItem('contexts', contextJson);
  }, [contexts]);

  if (!props.isContextListVisible) {
    return (<React.Fragment />)
  }
  return (
    <div>
      <div>
        <span><h4 style={{ display: "inline-block", marginRight: "10px", color: " #F8FAFB" }}>标签</h4></span><NewContext createNewBoundedContext={createNewBoundedContext} />
      </div>
      {contexts.length === 0 ? "" :
        <React.Fragment>
          <hr style={{ color: "#F8FAFB" }} />
          <div className="contextList">
            {contexts.map(context => {
              return (<BoundedContext key={context.id} setCurrentContext={props.setCurrentContext} currentContext={props.currentContext} context={context} />);
            })}
          </div>
        </React.Fragment>
      }
    </div>);
};
