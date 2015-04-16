App.Views.TimerValue = Backbone.View.extend({
    initialize: function(options) {
        this.model.on('change:currentTime', this.render, this);
    },
    tagName: 'div',
    className: 'btn-group',
    attributes: {
        'role': 'group'
    },
    template: App.Templates.TimerValue,
    render: function() {
        // Render the template
        var html = this.template(this.model.toJSON());
        this.$el.html(html);

        return this;
    }
});

