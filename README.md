# shotgun.js

Shotgun testing for JavaScript functions

## Introduction

Shotgun testing involves passing random values as arguments to functions en masse over a number of test runs. While it is not a systematic approach to software testing (like firing a shotgun at a wall), it can still catch plenty of neat things.

When a function is passed to the shotgun object, anywhere from one to ten values will be passed to the provided function as arguments. These values may be boolean, numbers, strings, functions, or empty objects. If something breaks, the exception will be caught and logged to the console along with the list of arguments that caused the exception.

## Example

After loading jQuery 2.1.3 and shotgun.js:

    > var body = $('body');
    < undefined
    > shotgun(body.addClass);
    ** ERROR: TypeError: undefined is not a function
       [function, 281610]
    ** ERROR: TypeError: undefined is not a function
       [function, Object, -91251, function, true, Object, function, "", ""]
    ....
    < false

Forcing all arguments to be functions:

    > shotgun(body.addClass, {choice: 'f'});
    ** ERROR: TypeError: undefined is not a function
       [function, function, function]
    ** ERROR: TypeError: undefined is not a function
       [function, function, function, function, function]
    ....
    < false
