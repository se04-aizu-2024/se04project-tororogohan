// await sleep(X); で X ms の sleep
function sleep(msec) {
    return new Promise(function (resolve) {

        setTimeout(function () { resolve() }, msec);

    })
}