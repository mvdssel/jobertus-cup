/*global App*/
App.Collections.Ploegen = Backbone.Collection.extend({
    model: App.Models.Ploeg, 
    initialize: function(models, options) {
        var html5_audio = new Audio("file:///Users/maartenvandessel/Sites/cup/dist/sound/html5-audio-example-mp3.mp3");
        html5_audio.play();

        var a = $.getJSON("sound/sounds.json").done(function(data) {
            console.log(data);

            for (var i = 0, len = data; i < len; i++) {

            }
        });
    }
});
