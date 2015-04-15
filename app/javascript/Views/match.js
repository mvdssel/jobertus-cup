App.Views.Match = Backbone.View.extend({
    tagName: 'div',
    className: 'row',
    template: App.Templates.Match,
    render: function() {
        // Render the template
        var html = this.template(this.ploegen.pluck('score'));
        this.$el.html(html);

        // Render the teams
        this.model.ploegen.each(_.bind(function(ploeg) {
            var ploegView = new App.Views.MatchPloeg({ model: ploeg });
            this.$el.append(ploegView.render().$el);
        }, this));

        return this;
    }
});

