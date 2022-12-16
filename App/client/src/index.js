import React from "react";
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import ReactDOM from 'react-dom';

// ReactDOM.render(<App />, document.getElementById('root'));

const root = createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)


// ReactDOM.render(<App />, document.querySelector('#root'));