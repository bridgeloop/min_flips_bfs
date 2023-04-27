function flip(c) {
    switch (c) {
        case "0": return "1";
        case "1": return "0";
        default: throw new Error("invalid character");
    }
}
function cloneFlip(str, idx) {
    let arr = str.split("");
    let c = arr[idx];
    arr[idx] = flip(c);
    return arr.join("");
}

function three(str) {
    for (let idx = 0; idx < str.length - 2; ++idx) {
        if (["000", "111"].includes(str.substring(idx, idx + 3))) {
            return true;
        }
    }
    return false;
}

function doStep(a, seen, currMut, queue/*, prev*/) {
    let length = a.length;

    for (let idx = 0; idx < length; ++idx) {
        let str = cloneFlip(a, idx);
        if (three(str)) {
            continue;
        }

        if (!seen.has(str)) {
            seen.add(str);
            queue.push([str, currMut]);
            /*let p = prev[str];
            if (!p || currMut - 1 < p.step) {
                prev[str] = { a, step: currMut - 1, };
            }*/
        }
    }

    return;
}

function go(a, b) {
    if (a.length != b.length) {
        throw new Error("length mismatch");
    }

    let queue = [];
    let seen = new Set(a);
    doStep(a, seen, 1, queue);

    let arr = [];
    while (queue.length) {
        let [str, muts] = queue.shift();
        if (str === b) {
            return muts;
        }
        doStep(str, seen, muts + 1, queue);
    }

    throw new Error("unreachable");
}