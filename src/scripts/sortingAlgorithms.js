// 配列とDOM要素のコンテナを格納
let array = [];
const arrayContainerBefore = document.getElementById('array-container-before');
const arrayContainerDuring = document.getElementById('array-container-during');
const arrayContainerAfter = document.getElementById('array-container-after');
const complexityInfo = document.getElementById('complexity');
const startBtn = document.getElementById('start-btn');
const algorithmSelect = document.getElementById('algorithm-select');

// ランダムな整数配列を生成
function generateArray() {
    array = [];
    for (let i = 0; i < 10; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    renderArray(arrayContainerBefore, array);
    arrayContainerDuring.innerHTML = '';  // ソート中の配列は空に
    arrayContainerAfter.innerHTML = '';    // ソート後の配列は空に
    startBtn.disabled = false;
}

// 配列を可視化
function renderArray(container, arr) {
    container.innerHTML = '';
    arr.forEach(value => {
        const element = document.createElement('div');
        element.classList.add('element');
        element.textContent = value;
        container.appendChild(element);
    });
}

// ソートの手順を順番に可視化
async function visualizeSorting(steps, algorithmName) {
    complexityInfo.textContent = `${algorithmName} を使用してソート中`;
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        renderArray(arrayContainerDuring, step);
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 500); // 500ms ごとにステップを進める
        });
    }
    renderArray(arrayContainerAfter, steps[steps.length - 1]);
    complexityInfo.textContent = `${algorithmName} によるソートが完了しました`;
}

// バブルソート
function bubbleSort(arr) {
    let steps = [];
    let n = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
            steps.push([...arr]);
        }
    } while (swapped);
    return steps;
}

// 選択ソート
function selectionSort(arr) {
    let steps = [];
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        steps.push([...arr]);
    }
    return steps;
}

// 挿入ソート
function insertionSort(arr) {
    let steps = [];
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
        steps.push([...arr]);
    }
    return steps;
}

// クイックソート
function quickSort(arr) {
    let steps = [];
    const quickSortHelper = (arr, left, right) => {
        if (left >= right) return;
        const pivot = arr[Math.floor((left + right) / 2)];
        let index = partition(arr, left, right, pivot);
        quickSortHelper(arr, left, index - 1);
        quickSortHelper(arr, index, right);
    };

    const partition = (arr, left, right, pivot) => {
        while (left <= right) {
            while (arr[left] < pivot) left++;
            while (arr[right] > pivot) right--;
            if (left <= right) {
                [arr[left], arr[right]] = [arr[right], arr[left]];
                left++;
                right--;
            }
            steps.push([...arr]);
        }
        return left;
    };

    quickSortHelper(arr, 0, arr.length - 1);
    return steps;
}

// マージソート
function mergeSort(arr) {
    let steps = [];
    const merge = (left, right) => {
        let result = [];
        let i = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) result.push(left[i++]);
            else result.push(right[j++]);
        }
        return result.concat(left.slice(i), right.slice(j));
    };

    const mergeSortHelper = (arr) => {
        if (arr.length <= 1) return arr;
        let mid = Math.floor(arr.length / 2);
        let left = mergeSortHelper(arr.slice(0, mid));
        let right = mergeSortHelper(arr.slice(mid));
        let merged = merge(left, right);
        steps.push([...merged]);
        return merged;
    };

    mergeSortHelper(arr);
    return steps;
}

// ソートを開始
function startSort() {
    startBtn.disabled = true;
    const selectedAlgorithm = algorithmSelect.value;
    let sortingSteps = [];
    switch (selectedAlgorithm) {
        case 'bubble':
            sortingSteps = bubbleSort([...array]);
            break;
        case 'selection':
            sortingSteps = selectionSort([...array]);
            break;
        case 'insertion':
            sortingSteps = insertionSort([...array]);
            break;
        case 'quick':
            sortingSteps = quickSort([...array]);
            break;
        case 'merge':
            sortingSteps = mergeSort([...array]);
            break;
    }
    visualizeSorting(sortingSteps, selectedAlgorithm);
}
