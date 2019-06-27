import * as React from "react";
import {Switch, Route, HashRouter} from "react-router-dom";
import {ErrorView} from "./containers/ErrorView";
import { About } from "./containers/About";
import { Header } from "./components/Header";
import TestArray from "./components/TestArray";

export function Routes() {
    return <>
        <HashRouter>
            <Switch>
                <Route exact={true} path="/" component={Header}  />
                <Route exact={true} path="/about" component={About}  />
                <Route exact={true} path="/testArray" component={TestArray}  />
                <Route component={ErrorView} />
            </Switch>
        </HashRouter>
    </>
}