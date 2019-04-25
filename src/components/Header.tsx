import * as React from "react";
import { Tab } from "semantic-ui-react";
import {About} from "../containers/About";
import { InputFile } from "./InputFile";
import { CountReducerExample } from "../containers/CountReducerExample";
import TodoInput from "../ToDo/TodoInput";
import TodoList from "../ToDo/TodoList";
import CounterComponent from "../containers/context/counterComponent";
import { AppProvider } from "../containers/context/countContext";
import CounterComponentExtra from "../containers/context/counterComponentExtra.";
 
  
export function Header() {
    const panes = [
        { menuItem: 'Drop File', render: () => <Tab.Pane><InputFile/></Tab.Pane> },
        { menuItem: 'Chart', render: () => <Tab.Pane><About/></Tab.Pane> },
        { menuItem: 'Reducer Example', render: () => <Tab.Pane><CountReducerExample/></Tab.Pane> },
        { menuItem: 'Redux Example', render: () => <Tab.Pane><div><h1>Todo</h1><TodoInput/><TodoList/></div></Tab.Pane> },
        { menuItem: 'Count Context', render: () => <Tab.Pane><div><h1>Count Context</h1><AppProvider><CounterComponent/></AppProvider></div></Tab.Pane> },
        { menuItem: 'Count Context', render: () => <Tab.Pane><div><h1>Count Context</h1><AppProvider><CounterComponentExtra/></AppProvider></div></Tab.Pane> },
      ]; 
    return (
        <>        
        <Tab panes={panes} />
        </>
    );
}
