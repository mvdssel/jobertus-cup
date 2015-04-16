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
        window.evtUtil.on('playing-sound', this.stopSound, this);
    },
    playSound: function() {
        window.evtUtil.trigger('playing-sound');
        this.audio = new Audio(this.get("song"));
        this.audio.play();
    },
    stopSound: function() {
        if(this.audio instanceof Audio) {
            this.audio.pause();
        }
    },
    defaults: {
        image: 'images/logo.png',
        song: 'zot_liedje.mp3'
    }
});

