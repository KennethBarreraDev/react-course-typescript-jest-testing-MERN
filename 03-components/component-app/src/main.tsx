import React from 'react';
import ReactDom from 'react-dom/client';
import { HelloWorldApp } from './HelloWorldApp';
import { FirstApp } from './FirstApp';
import './styles/index.css'
import { CounterApp } from './CounterApp';

ReactDom.createRoot(
    document!.getElementById('root')!
).render(
    <React.StrictMode>
        {/* <HelloWorldApp/> */}
        <FirstApp  subtitle='First paragraph'/>
        {/* <CounterApp value={4}/> */}
    </React.StrictMode>
)