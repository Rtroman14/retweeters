// const data = require("./tweets/1532096525433810944.json");
// console.log(data.length);

function kFormatter(num) {
    return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
        : Math.sign(num) * Math.abs(num);
}

console.log(kFormatter(100)); // 1.2k
console.log(kFormatter(1000)); // 900
console.log(kFormatter(10700)); // 900
console.log(kFormatter(100700)); // 900
console.log(kFormatter(1000000)); // 900
