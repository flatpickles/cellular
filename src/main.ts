import './styles.css';

import CellularShader from './Cellular.frag';
import FragShaderProject from './skbk/FragShaderProject';
import Project from './skbk/Project';

const canvas = document.getElementById('renderer') as HTMLCanvasElement;
const container = document.getElementById('container') as HTMLDivElement;
const context = canvas.getContext('webgl2') as WebGL2RenderingContext;
const cellularProj = new FragShaderProject(CellularShader);
cellularProj.canvas = canvas;

const dpr = window.devicePixelRatio;
const renderSize: [number, number] = [
    window.innerWidth * dpr,
    window.innerHeight * dpr,
];

function handleResize() {
    renderSize[0] = window.innerWidth * dpr;
    renderSize[1] = window.innerHeight * dpr;
    cellularProj.resized({
        canvasSize: renderSize,
        containerSize: renderSize,
        container,
        canvas,
        context,
    });
}

function applyParams(
    project: Project,
    params: Record<string, number | number[]>,
) {
    Object.entries(params).forEach(([key, value]) => {
        (project as any)[key] = value;
    });
}

cellularProj.init({
    container,
    canvas,
    context,
});
applyParams(cellularProj, {
    timeScale: 0.25,
    timeScale1: 0,
    timeScale2: -0.2,
    spaceScale: 0.5,
    textureDepth: 0.2,
    textureScale: 0.1,
    warpDepth: 0.25,
    warpScale: 0.5,
    color1: [1, 0.7686274509803922, 0],
    color2: [0, 0.23921568627450981, 0.03529411764705882],
    edgeDepth: 0.25,
    easing: 0.25,
    infold: 0,
});
handleResize();

window.addEventListener('resize', handleResize);

let frame = 0;
function animate(time: number) {
    cellularProj.update({
        time: time * 0.001,
        frame,
        paramsChanged: [],
        width: renderSize[0],
        height: renderSize[1],
        container,
        canvas,
        context,
    });
    frame++;
    requestAnimationFrame(animate);
}

animate(0);
