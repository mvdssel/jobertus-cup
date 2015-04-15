App.Settings.ploegen = window.PloegFactory.createPloegen();

evtUtil.on('init', function() {
    App.Router = new App.Router();
    Backbone.history.start();
});
