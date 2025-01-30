function selectionSort(arr) {
    // 配列の長さを取得
    let n = arr.length;
    // 操作履歴を保存するリスト
    let orderList = [];

    orderList.push([DESCRIBE, "init"]);
    orderList.push([ARR, "arr", [...arr]]); // 配列を明示的にコピーしておかないと、後のソートの影響をうける
    orderList.push([VAR, "minIndex", 0]);
    // 配列を順番に走査
    for (let i = 0; i < n - 1; i++) {
        // 最小値のインデックスを現在の位置に設定
        let minIndex = i;
        orderList.push([DESCRIBE, `index of minimum value is now ${i}`]);
        orderList.push([WRITE, "minIndex", i]);
        orderList.push([WAIT, 300]);
        orderList.push([COLOR, `arr[${minIndex}]`, FOCUS1]);

        // 未ソート部分を探索
        for (let j = i + 1; j < n; j++) {
            orderList.push([COLOR, `arr[${minIndex}]`, FOCUS1]);
            orderList.push([COLOR, `arr[${j}]`, FOCUS2]);
            // 現在の最小値より小さい値が見つかった場合
            if (arr[j] < arr[minIndex]) {
                orderList.push([DESCRIBE, `arr[${j}] < arr[minIndex], so minIndex should be updated`]);
                orderList.push([WRITE, "minIndex", j]);
                orderList.push([COLOR, "minIndex", FOCUS1]);

                orderList.push([WAIT, 300]);
                orderList.push([COLOR, `arr[${minIndex}]`, CLEAR]);
                orderList.push([COLOR, `arr[${j}]`, FOCUS1]);
                orderList.push([COLOR, "minIndex", CLEAR]);
                minIndex = j; // 最小値のインデックスを更新
            }
            orderList.push([WAIT, 300]);
            orderList.push([COLOR, `arr[${j}]`, CLEAR]);
        }

        // 最小値が現在位置以外にある場合、スワップを実行
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // 値を交換
            orderList.push([SWAP, `arr[${i}]`, `arr[${minIndex}]`]); // 操作を履歴に記録
        }
        orderList.push([COLOR, `arr[${i}]`, UNFOCUS]);
    }

    // 操作履歴を返す
    return orderList;
}
