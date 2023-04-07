

module.exports = function(app) {
    var faculity = require('../controller/hodController');
    app.route('/')
      .get(faculity.listAllfaculity)
    app.route('/faculity')
      .get(faculity.listAllfaculity)
      .post(faculity.insertfaculity);
    app.route('/faculity/:id')
      .get(faculity.searchfaculity)
      .put(faculity.updatefaculity)
      .delete(faculity.deletefaculity);
};