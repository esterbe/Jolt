import React, {Component} from 'react';
import Login from "./components/login";

import './app.css';


class App extends Component {
    constructor() {
        super();
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
