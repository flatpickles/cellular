# Cellular

This repository contains a standalone version of [Cellular](https://longitude.studio/Cellular), and a simple demo of how it can be used within an iframe.

The main project is in the `cellular` subdirectory, and has been built with TypeScript and a handful of dependencies. Using Vite, we can easily run it locally, and build a minified & bundled static project to be deployed independently on a server, then embedded in a larger site.

## Running Locally

To run Cellular locally and get a feel for how this works, clone this repository, then from the `cellular` subdirectory:

```
npm install
npm run dev
```

This will start a local dev server running with the project, likely at [http://localhost:5173](http://localhost:5173). You can visit it directly in your browser to see the default state of the project.

## Demo

Once your local dev server is running, you can open the demo page ([`demo/index.html`](./demo/index.html)) directly in your local browser, and see your locally running Cellular embedded in an iframe.

There are a few buttons to demonstrate parameter updates via message passing (see below), and a textarea readout to show the parameter values being used. You can try resizing the window to see how the Cellular embed behaves; it will adapt to the size of its containing iframe as expected.

As a caveat, this demo is entirely for reference! It's simple and unglamorous, but hopefully provides an adequate example of how this standalone version of Cellular could be embedded, e.g. in a Webflow project.

## Message Passing

As you'll see in [`demo/demo.js`](./demo/demo.js), you can set parameters for the embedded Cellular project by passing messages into the iframe. That looks something like this:

```js
const iframe = document.querySelector('iframe');
iframe.contentWindow.postMessage(message, '*');
```

For incoming messages, Cellular expects the `message` posted to be a JSON object with a `type` set to either "reset" or "update". If "update" is used, it expects `params` to be a mapping of parameter name to value, something like this:

```js
iframe.contentWindow.postMessage(
    {
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
    },
    '*',
);
```

Any parameter values left out of the message will persist their previous state within Cellular, so you can update just one parameter at a time by including only that parameter in the update message.

We can use these messages to build control UI that lives outside of the iframe. Some ideas for controls include: full preset loading (as in the demo), single slider updates for direct configuration, or more abstract inputs like mouse XY position. The message passing interface should support all these and more!

## Notes on on Parameters

The whimsical parameter display names in the original version of Cellular don't correspond to the property names we're using above, but the mapping is as follows:

-   Cellular Flux: `timeScale` (speed of cell movement)
-   Lateral Kinesis: `timeScale1` (X position drift)
-   Axial Kinesis: `timeScale2` (Y position drift)
-   Magnification: `spaceScale` (size of cells)
-   Endomorphosis: `textureDepth` (cell surface disruption amount)
-   Microtexture: `textureScale` (cell surface disruption density)
-   Liquefaction: `warpDepth` (full image warp amount)
-   Turbulence: `warpScale` (full image warp density)
-   Cytoplasm: `color1` (cell internal color)
-   Ectoplasm: `color2` (cell external color)
-   Delimitation: `edgeDepth` (external color emphasis)
-   Polarity: `easing` (contrast between colors)
-   Endocycling: `infold` (repeating cycles of internal/external colors)

To craft a preset within the [original web UI](https://longitude.studio/Cellular), you can dial in the sliders as you see fit, then click "Export" from the preset menu, and copy the `values` directly out of the saved JSON file into the `params` for a new message.

It's also worth noting that the range for all parameters is 0 to 1, with the exception of `timeScale1` and `timeScale2` which run from -1 to 1 (to control XY drift in left/right up/down directions). `color1` and `color1` are three-element numeric arrays; each element is a 0 to 1 value for an RGB color channel.

## Building

You may wish to build the project into a compact static site that you can deploy on your own server. From the `cellular` subdirectory:

```
npm install
npm run build
```

This builds the project into `cellular/dist`, and you can deploy these files as a static site on any server you like.

The latest version of this project is also live at [https://cellular.flatpickles.com](https://cellular.flatpickles.com) for reference, or for direct embedding if you don't want to deal with hosting your own build of the project.
