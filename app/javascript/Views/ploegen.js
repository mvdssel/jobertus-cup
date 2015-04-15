App.Views.Ploegen = Backbone.View.extend({
    initialize: function () {
        // Set events
    },
    template: App.Templates.Ploegen,
    render: function () {
        // Render the template
        var html = this.template();
        this.$el.html(html);

        // Render each ploeg in the collection
        this.collection.each(_.bind(function(ploeg) {
            var ploegView = new App.Views.Ploeg({ model: ploeg });
            this.$el.find(".row").append(ploegView.render().el);
        }, this));

        return this;
    }
});
