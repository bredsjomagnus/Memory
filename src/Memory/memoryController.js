var navbarjson = require('../../config/navbar.json');

// Sandlådans startsida
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
