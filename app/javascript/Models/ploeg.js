App.Models.Ploeg = Backbone.Model.extend({
    initialize: function (model, options) {
        options = options || {};
        if(options.prefixes) {
            for(var prefix in options.prefixes) {
                if(options.prefixes.hasOwnProperty(prefix)) {
                    model[prefix] = encodeURI(options.prefixes[prefix] + model[prefix]);
                }
            }
        }
    },
    playSound: function() {
        var html5_audio = new Audio(this.get("song"));
        html5_audio.play();
    }
});

