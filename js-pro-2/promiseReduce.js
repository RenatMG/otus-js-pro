const fn1 = () => {
    console.log('fn1');
    return Promise.resolve(1);
};
const fn2 = () => new Promise(resolve => {
    console.log('fn2');
    setTimeout(() => resolve(2), 1000);
});

const reduce = (memo, value) => {
    console.log('reduce');
    return memo * value;
};


const promiseReduce = (asyncFunctions, reduce, initialValue) => {
    return Promise.all(asyncFunctions)
        .then(async (values) => {
            let memo = initialValue;
            for (let fn of values) {
                const value = await fn();
                memo = reduce(memo, value);
            }
            return memo;
        });
};


promiseReduce([fn1, fn2], reduce, 1).then(console.log);