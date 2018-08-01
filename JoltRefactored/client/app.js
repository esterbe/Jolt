import React, {Component} from 'react';
import CommentList from "./components/comments/commentList";
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
                <CommentList />
            </div>
        );
    }
}

export default App;
