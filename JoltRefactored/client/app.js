import React, {Component} from 'react';
import Login from "./components/login";
import autoBind from 'auto-bind-es5';

import './app.css';


class App extends Component {
    constructor() {
        super();
        autoBind(this);
    }

    render() {
        return (
            <div className="app">
                <Login />
            </div>
        );
    }
}

export default App;
