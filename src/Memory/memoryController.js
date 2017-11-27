var navbarjson = require('../../config/navbar.json');

// Memory landningssida
exports.indexPage = function(req, res) {
    var data, view;

    //---------------------------

    view = "memory/index";

    data = {
        title: 'Memory | maaa16',
        navlist: navbarjson,
        thisurl: "/memory"
    };

    //---------------------------

    res.render(view, data);
};

// Memory starta spel sida
exports.startPage = function(req, res) {
    var data, view;

    //---------------------------

    view = "memory/startmemory";

    data = {
        title: 'Memory | maaa16',
        navlist: navbarjson,
        thisurl: "/memory"
    };

    //---------------------------

    res.render(view, data);
};
