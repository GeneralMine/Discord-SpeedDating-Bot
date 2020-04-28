const testDudes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const revTestDudes = "ZYXWVUTSRQPONMLKJIHGFEDCBA".split("");

const testDudesWeniger = "ABCDEFGH".split("");

// ABCDEFGHIJKLMNOPQRSTUVWXYZ
// ABCDEFGHIJKLMNOPQRSTUVWXYZ

match(testDudes, 5);

function match(dudes, per_group) {
    let shifted_dudes = [];

    shifted_dudes.push([...dudes]);

    for (let d = 1; d < per_group; d++) {
        shifted_dudes.push(shift(dudes, Math.pow(2, d) - 1));
    }

    shifted_dudes.map(el => el.join("|")).forEach(el => console.log(el));
    return shifted_dudes;
}

/**
 * 
 * @param {any[]} array 
 * @param {number} spaces 
 */
function shift(array, spaces) {
    let copy = [...array];

    while (spaces-- > 0) {
        copy.unshift(copy.pop());
    }

    return copy;
}

function matcherV2(dudes) {
    let normal1 = [...dudes]
    let normal2 = [...dudes];

    return () => {
        let groups = [];
        normal2 = shift(normal2, 1);

        for (let i = 0; i < normal1.length; i++) {
            groups.push([normal1[i], normal2[i]])
        }

        return groups;
    }
}

console.log("#########################")

let res = matcherV2(testDudes);
let gr = testDudes.length / 2;

console.log(res, gr);

for (let i = 0; i < gr; i++) {
    let r = res();
    r.map(el => el.join("|")).forEach(el => console.log(el));
}

