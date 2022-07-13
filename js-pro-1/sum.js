/*
Написать функцию sum, которая может быть исполнена любое количество раз с не undefined аргументом.
Если она исполнена без аргументов, то возвращает значение суммы всех переданных до этого значений.
sum(1)(2)(3)....(n)() === 1 + 2 + 3 + ... + n
 */

function sum(num) {
    let acc = +num;

    return function add(addedNum) {
        if (typeof addedNum === "undefined" || isNaN(addedNum)) {
            return acc;
        }
        acc += +addedNum;
        return add;
    };
}

console.log("test 1", sum(1)(2)(3)(4)(5)(10)(15)());
console.log("test 2", sum("50")());