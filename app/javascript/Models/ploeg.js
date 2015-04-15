App.Models.Ploeg = Backbone.Model.extend({
    initialize: function (attributes, options) {
        options = options || {};

        // Adds a prefix to certain attributes
        // eg. ${song} => assets/songs/${song}
        if(options.prefixes) {
            for(var prefix in options.prefixes) {
                if(options.prefixes.hasOwnProperty(prefix)) {
                    attributes[prefix] = encodeURI(options.prefixes[prefix] + attributes[prefix]);
                }
            }
        }
        this.set(attributes);
    },
    playSound: function() {
        var html5_audio = new Audio(this.get("song"));
        html5_audio.play();
    }
});

