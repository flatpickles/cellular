import Project from './skbk/Project';

export default class ProjectRenderer {
    private project: Project;
    private canvas: HTMLCanvasElement;
    private container: HTMLDivElement;
    private context: WebGL2RenderingContext;
    private frame = 0;
    private renderSize: [number, number];

    constructor(project: Project, canvasId: string) {
        this.project = project;
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.container = this.canvas.parentElement as HTMLDivElement;
        this.context = this.canvas.getContext(
            'webgl2',
        ) as WebGL2RenderingContext;
        this.renderSize = [this.canvas.width, this.canvas.height];

        // Setup & init project
        this.project.canvas = this.canvas;
        this.project.init({
            container: this.container,
            context: this.context,
            canvas: this.canvas,
        });

        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this));
        this.handleResize();
    }

    public applyParams(params: Record<string, number | number[]>) {
        Object.entries(params).forEach(([key, value]) => {
            (this.project as any)[key] = value;
        });
    }

    public destroy() {
        window.removeEventListener('resize', this.handleResize.bind(this));
        this.project.destroy({
            container: this.container,
            canvas: this.canvas,
            context: this.context,
        });
    }

    public start() {
        this.animate(0);
    }

    private animate(time: number) {
        this.project.update({
            time: time * 0.001,
            frame: this.frame,
            paramsChanged: [],
            width: this.renderSize[0],
            height: this.renderSize[1],
            container: this.container,
            canvas: this.canvas,
            context: this.context,
        });
        this.frame++;
        requestAnimationFrame(this.animate.bind(this));
    }

    private handleResize() {
        const dpr = window.devicePixelRatio;
        this.renderSize = [
            this.canvas.clientWidth * dpr,
            this.canvas.clientHeight * dpr,
        ];
        this.project.resized({
            canvasSize: this.renderSize,
            containerSize: this.renderSize,
            container: this.container,
            canvas: this.canvas,
            context: this.context,
        });
    }
}
