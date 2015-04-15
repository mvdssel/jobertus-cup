App.Views.MatchPloeg = Backbone.View.extend({
    initialize: function(options) {
        this.model.on('change', this.render, this);
    },
    events: {
        'click [data-role=score]': 'score',
        'click [data-role=fault]': 'fault'
    },
    tagName: 'div',
    className: 'col-sm-6 col-md-6',
    template: App.Templates.MatchPloeg,
    render: function() {
        // Render the ploeg
        var html = this.template(_.extend(this.model.toJSON(), { ploeg: this.model.ploeg.toJSON() }));
        this.$el.html(html);

        return this;
    },
    fault: function() {
        this.model.fault();
    },
    score: function() {
        this.model.score();
        this.model.ploeg.playSound();
    }
});
