App.Views.PloegChooser = Backbone.View.extend({
    initialize: function(options) {

    },
    template: App.Templates.PloegChooser,
    render: function() {
        // Render the template
        this.$el.html(this.template());

        // Render all models in the collection
        this.collection.each(_.bind(function(ploeg) {
            var entry = new App.Views.PloegChooserEntry({ test: 'test', model: ploeg });
            this.$('.row').append(entry.render().$el);

            entry.on('selected-ploeg', this.selectedPloeg, this);
        }, this));

        return this;
    },
    selectedPloeg: function(selectedModel) {
        this.trigger('selected-ploeg', selectedModel);
    }
});


