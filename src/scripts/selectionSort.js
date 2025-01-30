function selectionSort(arr) {
    // 配列の長さを取得
    let n = arr.length;
    // 操作履歴を保存するリスト
    let orderList = [];

    // 配列を順番に走査
    for (let i = 0; i < n - 1; i++) {
        // 最小値のインデックスを現在の位置に設定
        let minIndex = i;

        // 未ソート部分を探索
        for (let j = i + 1; j < n; j++) {
            // 現在の最小値より小さい値が見つかった場合
            if (arr[j] < arr[minIndex]) {
                minIndex = j; // 最小値のインデックスを更新
            }
        }

        // 最小値が現在位置以外にある場合、スワップを実行
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // 値を交換
            orderList.push(["swap", i, minIndex]); // 操作を履歴に記録
        }
    }

    // 操作履歴を返す
    return orderList;
}
