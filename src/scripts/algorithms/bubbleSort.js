function bubbleSort(arr) {
    let n = arr.length;
    let orderList = []; // アニメーション用の操作履歴を保存するリスト

    orderList.push([DESCRIBE, "init"]);
    orderList.push([ARR, "arr", [...arr]]); // 配列を明示的にコピーしておかないと、後のソートの影響をうける
    orderList.push([VAR, "swapped", "F"]);

    for (let i = 0; i < n - 1; i++) {
        orderList.push([DESCRIBE, `move biggest value in 0..${n - i - 1} to ${n - i - 1}`]);
        orderList.push([WRITE, "swapped", "F"]);
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 要素を交換
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                // 操作を記録
                let order = ["swap", `arr[${j}]`, `arr[${j + 1}]`];
                orderList.push(order);

                swapped = true;
                orderList.push([WRITE, "swapped", "T"]);
            }
        }
        if (!swapped) {
            // 交換がなければソート終了
            orderList.push([COLOR, `swapped`, "#FFB"]);
            orderList.push([DESCRIBE, `FINISH because no swap`]);
            break;
        }
        else if (i + 1 == n - 1) {
            orderList.push([DESCRIBE, `FINISH`]);
        }
        orderList.push([COLOR, `arr[${n - i - 1}]`, "#EEE"]);
    }
    return orderList;
}
