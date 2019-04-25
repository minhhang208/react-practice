import React, { useContext } from "react";
import { ctxt, ICtx } from "./countContext";
const CounterComponent = () => {
    const ctx = useContext(ctxt) as ICtx ;    
    return (
      <div>
        {ctx.state}
        <br />
        <button onClick={ctx.actions && ctx.actions.increase}>Increase</button>
        <br />
        <button onClick={ctx.actions && ctx.actions.decrease}>Decrease</button>
      </div>
    );
  };
  
  export default CounterComponent;