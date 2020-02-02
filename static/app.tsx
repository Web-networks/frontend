import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function Page() {
    return (
        <Router>
            <Route path='/'>
                Our interface
            </Route>
        </Router>
    );
}

function render() {
    // @ts-ignore
    ReactDOM.render(<Page/>, document.getElementById('root'));
}

window.addEventListener('DOMContentLoaded', render);