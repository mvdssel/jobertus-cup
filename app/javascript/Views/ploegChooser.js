App.Views.PloegChooser = Backbone.View.extend({
    initialize: function(options) {

    },
    tagName: 'ul',
    template: App.Templates.PloegChooser,
    render: function() {
        // Render the template
        var html = this.template();
        this.$el.html(html);

        // Render all models in the collection
        this.collection.each(_.bind(function(ploeg) {
            var entry = new App.Views.PloegChooserEntry({ test: 'test', model: ploeg });
            this.$el.append(entry.render().$el);

            entry.on('selected-ploeg', this.selectedPloeg, this);
        }, this));

        return this;
    },
    selectedPloeg: function(selectedModel) {
        this.trigger('selected-ploeg', selectedModel);
    }
});


