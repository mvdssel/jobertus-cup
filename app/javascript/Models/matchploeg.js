App.Models.MatchPloeg = Backbone.Model.extend({
    initialize: function (model, options) {
        options = options || {};
        if(!options.ploeg instanceof App.Models.Ploeg) {
            console.error('MatchPloeg did not receive a Ploeg entity');
            this.trigger('error');
        }

        this.ploeg = options.ploeg;
    },
    defaults: {
        score: 0
    },
    fault: function() {
        window.evtUtil.trigger('stop-sound');
        var newScore = Math.max(this.get('score') - 1, 0);
        this.set('score', newScore);
    },
    score: function() {
        var newScore = this.get('score') + 1;
        this.set('score', newScore);
    }
});
