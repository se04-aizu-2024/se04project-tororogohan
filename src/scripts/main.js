async function main() {
    container = document.getElementById("main");
    engine = new AnimationEngine("canvas", container.clientWidth, container.clientHeight);

    window.addEventListener("resize", () => {
        engine.resize(document.getElementById("main").clientWidth,
            document.getElementById("main").clientHeight);
    });
    const sorter = {
        "Selection-Sort": selectionSort,
        "Bubble-Sort": bubbleSort,
        "Heap-Sort": heapSort,
    };

    let alg = document.getElementById("algorithm-select").value;
    let mode = document.getElementById("mode-select").value;
    let arr = document.getElementById("array").value;
    if (/[0-9]([0-9]|\s)*/.test(arr)) {
        arr = arr.trim().split(" ").map((n) => parseInt(n, 10));
    }
    else {
        return;
    }

    const queries = sorter[alg](arr);
    console.log(queries);
    const step = async (i) => {
        engine.describe(queries[i][1]);
        i++;
        while (i < queries.length && queries[i][0] != DESCRIBE) {
            switch (queries[i][0]) {
                case VAR:
                    engine.defVar(queries[i][1], queries[i][2]);
                    break;
                case ARR:
                    engine.defArray(queries[i][1], queries[i][2]);
                    break;
                case SWAP:
                    await engine.swap(queries[i][1], queries[i][2]);
                    break;
                case WRITE:
                    await engine.write(queries[i][1], queries[i][2]);
                    break;
                case COLOR:
                    await engine.color(queries[i][1], queries[i][2]);
                    break;
                case DIV:
                    await engine.divideAt(queries[i][1], queries[i][2]);
                    break;
                case MARGE:
                    await engine.margeAt(queries[i][1], queries[i][2]);
                    break;
            }
            i++;
        }
        return i;
    };

    let i = 0;
    while (i < queries.length) {
        i = await step(i);
        console.log(i);
    }
}