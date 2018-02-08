'use strict';

{
    var helloWorld = 'hello world';

    var say = function say(speak) {
        return speak;
    };

    var saying = say(speak);

    console.log(saying);
}
'use strict';

var lib = require('jQuery');