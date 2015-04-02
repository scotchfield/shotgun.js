// shotgun.js: Shotgun testing for JavaScript functions.

var shotgun = (function () {
    'use strict';

    var getValue = function (choice) {
        var v, i;

        choice = choice || getRandomArray(['b', 'f', 'i', 'o', 's']);

        if (choice === 'b') {
            v = getRandomArray([true, false]);
        } else if (choice === 'f') {
            v = function () {};
        } else if (choice === 'i') {
            v = getRandomInt(-1000000, 1000000);
        } else if (choice === 'o') {
            v = {};
        } else if (choice === 's') {
            v = Math.random().toString(36).slice(2);
        }
        return v;
    },

    getRandomArray = function (obj) {
        return obj[Math.floor(Math.random() * obj.length)];
    },

    getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return function (f, user_options) {
        var key, args, i, arg_count, result = true,
            options = {
                n: 10,
                args_min: 1,
                args_max: 10,
                this: null,
            };

        if (typeof f !== 'function') {
            return false;
        }

        for (key in user_options) {
            if (user_options.hasOwnProperty(key)) {
                options[key] = user_options[key];
            }
        }

        while (options.n > 0) {
            args = [];
            arg_count = getRandomInt(options.args_min, options.args_max);

            for (i = 0; i < arg_count; i += 1) {
                args.push(getValue(options.choice));
            }

            try {
                f.apply(options.this, args);
            } catch (e) {
                result = false;

                console.log('** ERROR: ' + e);
                console.log(args);
            }

            options.n -= 1;
        };

        return result;
    };

}());

// Allow node.js to see us.
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = shotgun;
}
