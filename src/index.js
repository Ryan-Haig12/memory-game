import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const jsx = (
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

ReactDOM.render(jsx, document.getElementById('root'))