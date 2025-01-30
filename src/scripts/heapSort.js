function heapSort(arr) {
    let orderList = [];

    // ヒープを構築
    function heapify(n, i) {
        let largest = i; // 親ノード
        let left = 2 * i + 1; // 左の子ノード
        let right = 2 * i + 2; // 右の子ノード

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            orderList.push(["swap", i, largest]); // 交換を記録
            heapify(n, largest); // 再帰的にヒープを修正
        }
    }

    let n = arr.length;

    // ヒープを構築
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    // ヒープから最大値を1つずつ取り出してソート
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        orderList.push(["swap", 0, i]); // 交換を記録
        heapify(i, 0); // 残りをヒープ化
    }

    return orderList;
}
