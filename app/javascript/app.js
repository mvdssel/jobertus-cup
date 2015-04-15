var navbar = new App.Views.Navbar();
$('#navbar').html(navbar.render().$el);

App.Settings.ploegen = window.PloegFactory.createPloegen();

window.evtUtil.once('created-ploegen', function() {
    App.Router = new App.Router();
    Backbone.history.start();
});
