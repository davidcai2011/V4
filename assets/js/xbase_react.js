import React from 'react';
import ReactDom from 'react-dom';
import { createRoot } from 'react-dom/client';
import CustomerApp from './XBase/CustomerApp';
// import '../../assets/styles/app.css';


const container = document.getElementById('xbase');
const root = createRoot(container);



root.render(
    <div>

        <CustomerApp />



    </div>,
);