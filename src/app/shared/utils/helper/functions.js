export function ascending(a, b) {
    const A = a.name.toUpperCase();
    const B = b.name.toUpperCase();

    let comparison = 0;
    if (A > B) {
        comparison = 1;
    } else if (A < B) {
        comparison = -1;
    }
    return comparison;
}

export function descending(a, b) {
    const A = a.name.toUpperCase();
    const B = b.name.toUpperCase();

    let comparison = 0;
    if (A < B) {
        comparison = 1;
    } else if (A > B) {
        comparison = -1;
    }
    return comparison;
}

export function priceAscending(a, b) {
    const A = Number(a.buyoutPoints);
    const B = Number(b.buyoutPoints);

    let comparison = 0;
    if (A > B) {
        comparison = 1;
    } else if (A < B) {
        comparison = -1;
    }
    return comparison;
}

export function priceDescending(a, b) {
    const A = Number(a.buyoutPoints);
    const B = Number(b.buyoutPoints);

    let comparison = 0;
    if (A < B) {
        comparison = 1;
    } else if (A > B) {
        comparison = -1;
    }
    return comparison;
}

export function splitArray(array, part = 3) {
    var tmp = [];
    for(var i = 0; i < array.length; i += part) {
        tmp.push(array.slice(i, i + part));
    }
    return tmp;
}