App.Views.Ploeg = Backbone.View.extend({
    events: {
        "click .class": "function",
    },
    tagName: 'div',
    className: 'col-md-4',
    template: App.Templates.Ploeg,
    render: function() {
        // Render the template
        var html = this.template(this.model.toJSON());
        this.$el.html(html);

        return this;
    }
});
