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

// console.log("test 1", sum(1)(2)(3)(4)(5)(10)(15)());
// console.log("test 2", sum("50")());