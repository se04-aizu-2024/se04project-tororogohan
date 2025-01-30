function bubbleSort(arr) {
    let n = arr.length;
    let orderList = []; // アニメーション用の操作履歴を保存するリスト

    orderList.push([DESCRIBE, "init"]);
    orderList.push([ARR, "arr", [...arr]]); // 配列を明示的にコピーしておかないと、後のソートの影響をうける

    for (let i = 0; i < n - 1; i++) {
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
            }
        }
        if (!swapped) {
            // 交換がなければソート終了
            break;
        }
    }
    return orderList;
}
