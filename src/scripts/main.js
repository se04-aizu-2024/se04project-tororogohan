window.onload = async function () {

    container = document.getElementById("main");
    engine = new AnimationEngine("canvas", container.clientWidth, container.clientHeight);

    engine.describe("description of the step");
    engine.defVar("aaa", 0);
    engine.defVar("bbb", 0);
    engine.defVar("ccc", 2);

    engine.defArray("a", [0, 1, 2]);
    engine.defArray("b", [3, 1, 0, 1, 5, 10, 100, 10, 1, 1, 1, 1, 1, 1]);

    engine.draw();
    await engine.swap("a[0]", "a[2]");
    await engine.swap("a[0]", "a[2]");
    await engine.swap("b[10]", "b[3]");
    await engine.swap("ccc", "a[0]");
    await engine.swap("a[0]", "ccc");
    engine.draw();
    console.log(engine.arrays);

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