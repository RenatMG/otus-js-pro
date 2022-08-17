const getPath = ($el) => {
    const getSelector = (element) => {
        const { parentNode, id, classList, tagName } = element;
        const siblings = [...parentNode.children].filter(el => el.tagName === tagName);
        const index = siblings.findIndex(el => el === element);
        let classNames = '';
        if (classList.length) {
            classNames = '.' + [...classList].join('.');
        }
        const tag = tagName.toLowerCase();
        let nthChild = '';
        if (!classList.length < 2 && siblings.length > 1) {
            nthChild = `:nth-child(${index + 1})`;
            if (index === 0) {
                nthChild = ':first-child';
            }
            if (index === (siblings.length - 1)) {
                nthChild = ':last-child';
            }
        }
        let elementId = '';
        if (id) {
            elementId = `#${id}`;
        }

        return `${tag}${elementId}${classNames}${nthChild}`;
    };

    const getParents = (element) => {
        const parents = [];
        while (element.parentNode && element.parentNode.nodeName.toLowerCase() !== 'html') {
            element = element.parentNode;
            parents.push(element);
        }
        return parents;
    };

    if ($el) {
        const selectors = [];
        selectors.push(getSelector($el));
        const parents = getParents($el);

        if (parents.length) {
            parents.forEach((parent) => {
                selectors.unshift(getSelector(parent));
            });
        }
        return selectors.join(' ');
    }
    return '';
};

module.exports = {
    getPath,
};