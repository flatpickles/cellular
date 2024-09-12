import './styles.css';

import CellularShader from './Cellular.frag';
import ProjectRenderer from './ProjectRenderer';
import FragShaderProject from './skbk/FragShaderProject';

const defaultParams = {
    timeScale: 0.25,
    timeScale1: 0,
    timeScale2: -0.2,
    spaceScale: 0.5,
    textureDepth: 0.2,
    textureScale: 0.15,
    warpDepth: 0.25,
    warpScale: 0.5,
    color1: [1, 0.77, 0],
    color2: [0, 0.24, 0.03],
    edgeDepth: 0.25,
    easing: 0.25,
    infold: 0,
};

// Initialize and start rendering
const cellularProj = new FragShaderProject(CellularShader);
const renderer = new ProjectRenderer(cellularProj, 'renderer');
renderer.applyParams(defaultParams);
renderer.start();

// Listen for messages to update params
window.addEventListener('message', (event) => {
    if (event.data.type === 'update' && event.data.params !== undefined) {
        renderer.applyParams(event.data.params);
    } else if (event.data.type === 'reset') {
        renderer.applyParams(defaultParams);
    }
});
