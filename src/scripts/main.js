async function main() {
    container = document.getElementById("main");
    engine = new AnimationEngine("canvas", container.clientWidth, container.clientHeight);

    window.addEventListener("resize", () => {
        engine.resize(document.getElementById("main").clientWidth,
            document.getElementById("main").clientHeight);
    });

    let alg = document.getElementById("algorithm-select").value;
    let mode = document.getElementById("mode-select").value;
    let arr = document.getElementById("array").value;
    if (/[0-9]([0-9]|\s)*/.test(arr)) {
        arr = arr.trim().split(" ").map((n) => parseInt(n, 10));
    }
    else {
        return;
    }
    console.log(arr);

    engine.defArray("arr", arr);
}