const MiniSearch = require('minisearch');

const search = new MiniSearch({
    fields: ['name', 'tags'],
    storeFields: ['name', 'about', 'picture', 'price', 'isActive'],
    searchOptions: {
        combineWith: 'AND',
    },
});

const renameKey = (doc, oldKey, newKey) => {
    const parsed = [...doc];

    parsed.forEach((obj) => {
        obj[newKey] = obj[oldKey];

        delete obj[oldKey];
    });

    return parsed;
};

module.exports = { search, renameKey };
