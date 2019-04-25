import React from "react";

export interface ICtx {
  state: IState;
  actions: IActions;
}

interface IState {
  count: number;
}

interface IActions {
  increase: () => void;
  decrease: () => void;
}


export const ctxt = React.createContext<ICtx | null>(null);
function AppProvider(props: any) {
  const [count, setCount] = React.useState(0);
  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);
  
  return (
    <ctxt.Provider
      value={{
        state: count,
        actions: {
          increase,
          decrease
        }
      }}
      {...props}
    />
  );
}

export { AppProvider };
export const AppConsumer = ctxt.Consumer;
