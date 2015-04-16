App.Models.Ploeg = Backbone.Model.extend({
    initialize: function (model, options) {
        options = options || {};

        // Adds a prefix to certain model
        // eg. ${song} => assets/songs/${song}
        if(options.prefixes) {
            for(var attr in options.prefixes) {
                if(options.prefixes.hasOwnProperty(attr) && model.hasOwnProperty(attr)) {
                    model[attr] = encodeURI(options.prefixes[attr] + model[attr]);
                }
            }
        }
        this.set(model);
        window.evtUtil.on('stop-sound', this.stopSound, this);
    },
    playSound: function() {
        window.evtUtil.trigger('stop-sound');
        if(!(this.audio instanceof Audio)) {
            this.audio = new Audio(this.get('song'));
        }
        this.audio.currentTime = 0;
        this.audio.play();
        if(this.audio.duration > (this.get('duration') / 1000)) {
            console.log('Long song... trimming to ' + (this.get('duration') / 1000) + ' seconds.');
            setTimeout(this.stopSound, 30000);
        }
    },
    stopSound: function() {
        if(this.audio instanceof Audio) {
            this.audio.pause();
        }
    },
    defaults: {
        image: 'assets/images/logo.png',
        song: 'assets/songs/default.mp3',
        duration: 30000
    }
});

