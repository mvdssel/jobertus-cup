App.Views.TimerControls = Backbone.View.extend({
    initialize: function(options) {
        this.model.on('change:interval', this.render, this);
    },
    events: {
        'click [data-role=reset]': 'reset',
        'click [data-role=toggle]': 'toggle'
    },
    tagName: 'div',
    className: 'btn-group',
    attributes: {
        'role': 'group'
    },
    template: App.Templates.TimerControls,
    render: function() {
        // Render the template
        this.$('[data-toggle="tooltip"]').tooltip('destroy');
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        this.$('[data-toggle="tooltip"]').tooltip();

        return this;
    },
    reset: function() {
        this.model.reset();
    },
    toggle: function() {
        this.model.toggle();
    }
});


