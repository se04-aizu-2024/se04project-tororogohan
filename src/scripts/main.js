window.onload = function() {
    container = document.getElementById("main");
    engine = new AnimationEngine("canvas", container.clientWidth, container.clientHeight);
    window.addEventListener("resize", () => {
        engine.resize(document.getElementById("main").clientWidth,
                      document.getElementById("main").clientHeight);
    });
}