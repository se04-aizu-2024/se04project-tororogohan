class AnimationEngine {
    canvas;
    context;

    constructor (canvasID, width, height) {
        this.canvas = document.getElementById(canvasID);
        this.context = canvas.getContext("2d");
        this.resize(width, height);
    }

    resize(width, height) {
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);
    }
}