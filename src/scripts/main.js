window.onload = function () {

    container = document.getElementById("main");
    engine = new AnimationEngine("canvas", container.clientWidth, container.clientHeight);

    engine.defVar("aaa", 0);
    engine.defVar("bbb", 0);
    engine.defVar("ccc", 2);

    engine.defArray("a", [0, 1, 2]);
    engine.defArray("b", [3, 1, 0, 1, 5, 10, 100, 10, 1, 1, 1, 1, 1, 1]);

    engine.draw();

    engine.divideAt("b", 4);
    engine.draw();

    engine.divideAt("b", 6);
    engine.draw();

    engine.mergeAt("b", 4);
    engine.draw();

    engine.mergeAt("b", 6);
    engine.draw();

    window.addEventListener("resize", () => {
        engine.resize(document.getElementById("main").clientWidth,
            document.getElementById("main").clientHeight);
    });
}