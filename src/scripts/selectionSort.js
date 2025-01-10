function selectionSort(arr) {
    let n = arr.length;
    let orderList = [];

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;

            // 操作を記録
            orderList.push(["swap", i, minIndex]);
        }
    }
    return orderList;
}
