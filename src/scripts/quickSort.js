function quickSort(arr) {
    // 操作履歴を保存するリスト
    let orderList = [];

    // 再帰的にソートを行う関数
    function quickSortRecursive(array, start, end) {
        if (start >= end) return; // 配列の範囲が無効の場合は終了

        // ピボットを選択してパーティション分割
        let pivotIndex = partition(array, start, end);
        // 左側を再帰的にソート
        quickSortRecursive(array, start, pivotIndex - 1);
        // 右側を再帰的にソート
        quickSortRecursive(array, pivotIndex + 1, end);
    }

    // パーティション分割を行う関数
    function partition(array, start, end) {
        let pivot = array[end]; // 最後の要素をピボットに設定
        let i = start - 1; // ピボットより小さい要素の領域の終端

        for (let j = start; j < end; j++) {
            if (array[j] <= pivot) {
                i++; // 小さい要素の領域を拡張
                [array[i], array[j]] = [array[j], array[i]]; // 値をスワップ
                orderList.push(["swap", i, j]); // 操作を履歴に記録
            }
        }

        // ピボットを適切な位置に移動
        [array[i + 1], array[end]] = [array[end], array[i + 1]];
        orderList.push(["pivot_swap", i + 1, end]); // ピボットのスワップを記録

        return i + 1; // ピボットの最終位置を返す
    }

    // クイックソートの実行
    quickSortRecursive(arr, 0, arr.length - 1);

    // 操作履歴を返す
    return orderList;
}

