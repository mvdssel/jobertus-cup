App.Views.PloegChooserEntry = Backbone.View.extend({
    events: {
        'click button': 'selectedPloeg'
    },
    tagName: 'li',
    template: App.Templates.PloegChooserEntry,
    render: function() {
        // Render the template
        var html = this.template(this.model.toJSON());
        this.$el.html(html);

        return this;
    },
    selectedPloeg: function (e) {
        this.trigger('selected-ploeg', this.model);
    }
});


