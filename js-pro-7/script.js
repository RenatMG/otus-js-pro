class MyTree extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const item = JSON.parse(this.getAttribute('item'));
        if (item && item.items) {
            item.items.forEach(i => {
                const leaf = document.createElement('my-leaf');
                leaf.setAttribute('item', JSON.stringify(i));
                this.shadowRoot.appendChild(leaf);
            });
            this.style.border = ' 1px solid darkred';
            this.style.padding = '15px';
            this.style.background = '#bd9c9c';
            this.style.flexDirection = 'column';
            this.style.display = 'flex';
        }
    }
}

class MyLeaf extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const item = JSON.parse(this.getAttribute('item'));
        if (item) {
            if (item.items && !!item.items.length) {
                const tree = document.createElement('my-tree');
                tree.setAttribute('item', JSON.stringify(item));
                this.innerText = `leaf with id ${item.id} has tree with ${item.items.length} items`;
                this.appendChild(tree);
            } else {
                this.innerHTML = `leaf with id ${item.id} has no items`;
            }
            this.style.border = ' 1px solid darkred';
            this.style.padding = '10px';
            this.style.margin = '10px';
            this.style.background = '#e78c8c';
            this.style.flexDirection = 'column';
            this.style.display = 'flex';
        }
    }

}

customElements.define('my-tree', MyTree,);
customElements.define('my-leaf', MyLeaf,);


function createTree(treeItem) {
    if (treeItem.items && !!treeItem.items.length) {
        const parentTree = document.createElement('my-tree');
        parentTree.setAttribute('item', JSON.stringify(treeItem));
        document.body.appendChild(parentTree);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tree = {
        "id": 1,
        "items": [
            {
                "id": 2,
                "items": [
                    { "id": 3 },
                    {
                        "id": 4,
                        "items": [
                            { "id": 10 },
                            { "id": 11 },
                            { "id": 12 },
                        ]
                    },
                    { "id": 5 },
                ]
            },
            {
                "id": 6,
                "items": [
                    { "id": 7 },
                    { "id": 8 },
                    { "id": 9 },
                ]
            },
            {
                "id": 6,
                "items": []
            }
        ]
    };

    createTree(tree);
});
