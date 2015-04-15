App.Views.Match = Backbone.View.extend({
    initialize: function(options) {
        this.model.ploegen.on('change', this.renderScores, this);
    },
    tagName: 'div',
    className: 'row',
    template: App.Templates.Match,
    render: function() {
        // Render the scores
        this.renderScores();

        // Render the teams
        this.model.ploegen.each(_.bind(function(ploeg) {
            var ploegView = new App.Views.MatchPloeg({ model: ploeg });
            this.$el.append(ploegView.render().$el);
        }, this));

        return this;
    },
    renderScores: function() {
        this.$('.scores').remove();
        var html = App.Templates.Scores({ scores: this.model.ploegen.pluck('score') });
        this.$el.prepend(html);
    }
});

