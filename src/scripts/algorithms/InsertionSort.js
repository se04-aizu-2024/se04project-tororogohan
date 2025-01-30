function insertionSort(arr) {
    let n = arr.length;
    let orderList = [];

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            orderList.push(["move", j, j + 1]);
            j--;
        }
        arr[j + 1] = key;
        orderList.push(["insert", i, j + 1]);
    }
    return orderList;
}
