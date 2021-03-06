const _ = require('lodash');

const checkSize = (k, v, obj) => {
    if (!v.size.includes(obj[k].length)) {
        let err = new Error(`Size mismatch of key: ${k}`);
        return { err, message: 'Size mismatch error', result: 'invalid' }
    };

    return { err: null, result: 'valid' };
};

const checkAllowed = (k, v, obj) => {
    let found = false;
    for (let allowedVal of v.allowed) {
        if (_.isEqualWith(obj[k], allowedVal)) {
            found = true;
            break;
        }
    }

    if (!found) {
        let err = new Error(`Value passed not among allowed values of key: ${k}`);
        return { err, message: 'Invalid value error', result: 'invalid' }
    }

    return { err: null, message: 'Validation successful', result: 'valid' }
};

const checkNotAllowed = (k, v, obj) => {
    let found = false;
    for (let notAllowedVal of v.notAllowed) {
        if (_.isEqualWith(obj[k], notAllowedVal)) {
            found = true;
            break;
        }
    }

    if (found) {
        let err = new Error(`Value passed among notAllowed values of key: ${k}`);
        return { err, message: 'Invalid value error', result: 'invalid' }
    }

    return { err: null, message: 'Validation successful', result: 'valid' }
};

module.exports = { checkSize, checkAllowed, checkNotAllowed };
