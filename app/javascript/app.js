var navbar = new App.Views.Navbar();
navbar.setElement(App.Settings.navbar);
navbar.render();

App.Settings.ploegen = window.PloegFactory.createPloegen();
window.evtUtil.once('created-ploegen', function() {
    App.Router = new App.Router();
    Backbone.history.start();
});
