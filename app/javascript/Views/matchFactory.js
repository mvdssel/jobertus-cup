App.Views.MatchFactory = Backbone.View.extend({
    tagName: 'div',
    className: 'col-md-4',
    template: App.Templates.MatchFactory,
    render: function() {
        // Render the template
        this.$el.html(this.template());

        return this;
    },
    createMatch: function() {
        var ploegenChooser = new App.Views.PloegenChooser();
        this.$el.html(ploegenChooser.render().$el);
        ploegenChooser.choosePloegen(this.chosePloegen, this);
    },
    chosePloegen: function(ploegen) {
        var match = new App.Models.Match({}, { ploegen: ploegen });
        this.trigger('created-match', match);
    }
});
