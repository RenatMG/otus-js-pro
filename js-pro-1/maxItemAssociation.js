function maxItemAssociation(allRecs) {
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    // рекоммендации
    let maxRec = [];

    for (let i = 0; i < allRecs.length; i++) {
        // текущий список покупок
        let curRec = [...allRecs[i]];

        for (let j = 0; j < allRecs.length; j++) {
            if (i !== j) {
                // список покупок другого польз.
                const sibRec = allRecs[j];
                // проверяем на вхождение покупки текущего в список другого польз.
                const sameRecElement = curRec.find((rec) => sibRec.includes(rec));
                if (sameRecElement) {
                    // если есть, то объединяем списки, делаем уникальные значения и сортируем
                    curRec = [...sibRec, ...curRec].filter(onlyUnique).sort();
                }
            }
        }
        // если последующая рекоммендация больше, то обновляем ее
        if (curRec.length > maxRec.length) {
            maxRec = curRec;
        }
    }
    return maxRec;
}

// console.log(
//     "test 1",
//     maxItemAssociation([
//         ["a", "b"],
//         ["a", "c"],
//         ["d", "e"]
//     ])
// );
// console.log(
//     "test 2",
//     maxItemAssociation([
//         ["q", "w", "a"],
//         ["a", "b"],
//         ["a", "c"],
//         ["q", "e"],
//         ["q", "r"]
//     ])
// );
