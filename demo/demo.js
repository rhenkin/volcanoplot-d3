import React from 'react';
import { createRoot } from 'react-dom/client';

import { VolcanoPlot} from "../src/index.jsx";

const testData = [
    {"logFC": -5, "logP": 0},
    {"logFC": 5, "logP": 50},
    {"logFC": 5, "logP": 0},
    {"logFC": -5, "logP": 50},
    {"logFC": -0.25, "logP": 50},
    {"logFC": 1.25, "logP": 2.5},
    {"logFC": 1.5, "logP": 10},
    {"logFC": 0, "logP": 15}
];

const genes = [];
for (let i=0; i<15000; i++) {
    genes.push({"logFC": 5*(-0.5+Math.random()), "logP": Math.pow(2*(-0.5+Math.random()), 2)*10 });
}

const container = document.getElementById('root');
const root = createRoot(container); 
const dimensions = {
    width: 400,
    height: 400,
};
root.render(<VolcanoPlot data={genes} dimensions={dimensions}/>);