/*global App */

var app = new App.Views.App();
app.render();

var ploegen = new App.Collections.Ploegen();
var ploegenView = new App.Views.Ploegen({collection: ploegen});
ploegenView.render();
