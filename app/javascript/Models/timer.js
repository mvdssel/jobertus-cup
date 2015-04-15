App.Models.Timer = Backbone.Model.extend({
    initialize: function(model, options) {
        this.reset();
        this.set('interval', false);
    },
    start: function() {
        if(!this.get('interval')) {
            var now = new Date();
            var startTime = now - this.get('currentTime');
            this.set('startTime', startTime);
            this.setInterval();
        }
    },
    pause: function() {
        this.clearInterval();
    },
    reset: function() {
        var now = new Date();
        this.set('startTime', now);
        this.set('currentTime', now - now);
    },
    toggle: function() {
        if(this.get('interval')) {
            this.pause();
        }
        else {
            this.start();
        }
    },
    setInterval: function() {
        this.set('interval', setInterval(_.bind(this.tick, this), 10));
    },
    clearInterval: function() {
        clearInterval(this.get('interval'));
        this.set('interval', false);
    },
    tick: function() {
        var now = new Date();
        var diff = now - this.get('startTime');
        this.set('currentTime', diff);
    }
});


