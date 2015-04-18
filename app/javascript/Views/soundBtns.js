App.Views.SoundBtns = Backbone.View.extend({
    initialize: function() {
        window.evtUtil.on('stop-sound', this.stopSound, this);
    },
    events: {
        'click [data-role=stop-sound]': 'triggerStopSound',
        'click [data-role=uefa-sound]': 'uefaSound'
    },
    tagName: 'div',
    className: 'btn-group',
    attributes: {
        'role': 'group'
    },
    template: App.Templates.SoundBtns,
    render: function() {
        // Render the template
        this.$('[data-toggle="tooltip"]').tooltip('hide');
        this.$el.html(this.template());
        this.$('[data-toggle="tooltip"]').tooltip();

        return this;
    },
    triggerStopSound: function() {
        window.evtUtil.trigger('stop-sound');
    },
    stopSound: function() {
        if(this.audio instanceof Audio) {
            this.audio.pause();
        }
    },
    uefaSound: function() {
        if(!(this.audio instanceof Audio)) {
            this.audio = new Audio(encodeURI("assets/UEFA Champions League official theme song (Hymne) Stereo HD.mp3"));
            var interval = setInterval(_.bind(function() {
                if(this.audio.readyState === 4) {
                    clearInterval(interval);
                    this.audio.currentTime = 2*60 + 18;
                    this.audio.play();
                }
            }, this), 100);
        }
        else {
            this.audio.currentTime = 2*60 + 18;
            this.audio.play();
        }
    }
});
