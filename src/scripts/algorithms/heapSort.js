function heapSort(arr) {
    let orderList = [];

    orderList.push([DESCRIBE, "init"]);
    orderList.push([ARR, "arr", [...arr]]); // 配列を明示的にコピーしておかないと、後のソートの影響をうける
    orderList.push([VAR, "largest", 0]);
    orderList.push([VAR, "left", 0]);
    orderList.push([VAR, "right", 0]);

    // ヒープを構築
    function heapify(n, i) {
        let largest = i; // 親ノード
        let left = 2 * i + 1; // 左の子ノード
        let right = 2 * i + 2; // 右の子ノード

        orderList.push([DESCRIBE, "focus on arr[i], left = 2 * largest + 1, right = 2 * largest + 2"]);
        orderList.push([COLOR, `arr[${largest}]`, FOCUS1]);
        orderList.push([WRITE, `largest`, largest]);

        if (left < n) orderList.push([COLOR, `arr[${left}]`, FOCUS2]);
        orderList.push([WRITE, `left`, left]);

        if (right < n) orderList.push([COLOR, `arr[${right}]`, FOCUS2]);
        orderList.push([WRITE, `right`, right]);

        if (left < n && arr[left] > arr[largest]) {
            orderList.push([DESCRIBE, `arr[${largest}]< arr[${left}], so largest = left`]);
            orderList.push([WRITE, `largest`, left]);
            orderList.push([COLOR, `arr[${left}]`, FOCUS1]);
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            orderList.push([DESCRIBE, `arr[${largest}]< arr[${right}], so largest = right`]);
            orderList.push([WRITE, `largest`, right]);
            orderList.push([COLOR, `arr[${right}]`, FOCUS1]);
            largest = right;
        }

        if (largest !== i) {
            orderList.push([DESCRIBE, `swapping to meet heap condition`]);
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            orderList.push([SWAP, `arr[${i}]`, `arr[${largest}]`]); // 交換を記録
            if (i < n) orderList.push([COLOR, `arr[${i}]`, CLEAR]);
            if (right < n) orderList.push([COLOR, `arr[${right}]`, CLEAR]);
            if (left < n) orderList.push([COLOR, `arr[${left}]`, CLEAR]);
            orderList.push([DESCRIBE, `largest is updated, so heapify(${largest}) recursively`]);
            heapify(n, largest); // 再帰的にヒープを修正
        }
        else {
            orderList.push([DESCRIBE, `nothing to do`]);
            if (largest < n) orderList.push([COLOR, `arr[${largest}]`, CLEAR]);
            if (right < n) orderList.push([COLOR, `arr[${right}]`, CLEAR]);
            if (left < n) orderList.push([COLOR, `arr[${left}]`, CLEAR]);
        }
    }

    let n = arr.length;

    // ヒープを構築
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        orderList.push([DESCRIBE, `heapify(${i})`]);
        heapify(n, i);
    }

    // ヒープから最大値を1つずつ取り出してソート
    for (let i = n - 1; i > 0; i--) {
        orderList.push([DESCRIBE, `arr[0] is largest.So it should move to tail`]);
        [arr[0], arr[i]] = [arr[i], arr[0]];
        orderList.push([SWAP, `arr[0]`, `arr[${i}]`]); // 交換を記録
        if (i < n - 1) orderList.push([MERGE, "arr", i + 1]);
        orderList.push([DIV, "arr", i])
        orderList.push([COLOR, `arr[${i}]`, UNFOCUS]);

        orderList.push([DESCRIBE, `Heap condition may be broken.So heapify again`]);
        orderList.push([DESCRIBE, `heapfy(0)`]);
        heapify(i, 0); // 残りをヒープ化
    }

    orderList.push([DESCRIBE, "FINISH"]);
    orderList.push([MERGE, "arr", 1])

    return orderList;
}
