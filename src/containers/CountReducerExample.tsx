import * as React from "react";

type State = {
  loading: boolean;
  count: number;
};
type Action = { type: "increment" | "decrement" | "loading" };
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1, loading: false };
    case "decrement":
      return { ...state, count: state.count - 1, loading: false };
    case "loading":
      return { ...state, loading: true };
    default:
      return state;
  }
};

const delay = (time = 1500) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const initState: State = {
  count: 0,
  loading: false
};

export function CountReducerExample() {
  const [{ count, loading }, dispatch] = React.useReducer(reducer, initState);
  const onHandleIncrement = async () => {
    dispatch({ type: "loading" });
    await delay(500);
    dispatch({ type: "increment" });
  };
  const onHandleDecrement = async () => {
    dispatch({ type: "loading" });
    await delay(500);
    dispatch({ type: "decrement" });
  };
  return (
    <div>
      <p>Count {loading ? "loading.." : count}</p>
      <button type="button" onClick={onHandleIncrement}>
        +
      </button>
      <button type="button" onClick={onHandleDecrement}>
        -
      </button>
    </div>
  );
}
