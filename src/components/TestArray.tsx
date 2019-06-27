import React from "react";



export default function TestArray() {
  const [todos, setTodos] = React.useState<number[]>([]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {todos.map((e, i) => {
        return <div key={i}>{e}</div>;
      })}
      <h2>Start editing to see some magic happen!</h2>
      <button type="button" onClick={() => {
          const temp = [...todos];
          temp.push(todos.length);
          setTodos(temp);
      }}>
        Increase
      </button>
    </div>
  );
}

