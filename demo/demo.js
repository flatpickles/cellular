// These defaults are used within the cellular project, and reproduced here for reference
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
window.addEventListener('load', function () {
    document.getElementById('params').textContent = JSON.stringify(
        defaultParams,
        null,
        2,
    );
});

// Send a message to the iframe, and update the params textarea
function sendMessage(message) {
    const iframe = document.querySelector('iframe');
    document.getElementById('params').textContent = JSON.stringify(
        message.params,
        null,
        2,
    );
    iframe.contentWindow.postMessage(message, '*');
}

// Reset the iframe to default params, and reset the params textarea
function reset() {
    sendMessage({ type: 'reset' });
    document.getElementById('params').textContent = JSON.stringify(
        defaultParams,
        null,
        2,
    );
}

// Apply preset 1
function preset1() {
    sendMessage({
        type: 'update',
        params: {
            timeScale: 0.25,
            timeScale1: 0,
            timeScale2: 0.4,
            spaceScale: 0.9,
            textureDepth: 0.2,
            textureScale: 0.3,
            warpDepth: 0,
            warpScale: 0,
            color1: [0.74, 0.95, 1],
            color2: [0, 0.07, 1],
            edgeDepth: 0.5,
            easing: 1,
            infold: 1,
        },
    });
}

// Apply preset 2
function preset2() {
    sendMessage({
        type: 'update',
        params: {
            timeScale: 0.2,
            timeScale1: 0,
            timeScale2: 0,
            spaceScale: 0.65,
            textureDepth: 0,
            textureScale: 0,
            warpDepth: 1,
            warpScale: 1,
            color1: [1, 0.67, 0.2],
            color2: [0, 0, 0],
            edgeDepth: 0.3,
            easing: 0.3,
            infold: 0,
        },
    });
}

// Randomize the params
function randomize() {
    sendMessage({
        type: 'update',
        params: {
            timeScale: Number(Math.random().toFixed(2)),
            timeScale1: Number((Math.random() * 2.0 - 1.0).toFixed(2)),
            timeScale2: Number((Math.random() * 2.0 - 1.0).toFixed(2)),
            spaceScale: Number(Math.random().toFixed(2)),
            textureDepth: Number(Math.random().toFixed(2)),
            textureScale: Number(Math.random().toFixed(2)),
            warpDepth: Number(Math.random().toFixed(2)),
            warpScale: Number(Math.random().toFixed(2)),
            color1: [
                Number(Math.random().toFixed(2)),
                Number(Math.random().toFixed(2)),
                Number(Math.random().toFixed(2)),
            ],
            color2: [
                Number(Math.random().toFixed(2)),
                Number(Math.random().toFixed(2)),
                Number(Math.random().toFixed(2)),
            ],
            edgeDepth: Number(Math.random().toFixed(2)),
            easing: Number(Math.random().toFixed(2)),
            infold: Number(Math.random().toFixed(2)),
        },
    });
}
