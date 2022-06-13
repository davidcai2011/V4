import React from 'react';
import ReactDom from 'react-dom';
import { createRoot } from 'react-dom/client';
import CustomerApp from './XBase/CustomerApp';
// import TestApp from "./XBase/TestApp";

// const el = <h2>Lift Stuff! <span>️</span></h2>;
// console.log(el);
// ReactDom.render(el, document.getElementById('xbase'));
//
const container = document.getElementById('xbase');
const root = createRoot(container);

const el = <h2>Lift Stuff! <span>❤️❤❤❤</span></h2>;

root.render(
    <div>
       {/*<TestApp />*/}
        <CustomerApp />


        {/*/>*/}
    </div>,
);