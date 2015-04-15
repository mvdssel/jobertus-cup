App.Views.Timer = Backbone.View.extend({
    initialize: function(options) {
        this.model.on('change:currentTime', this.renderTimerValue, this);
        this.model.on('change:interval', this.renderTimerControls, this);
    },
    tagName: 'div',
    className: 'nav navbar-nav navbar-right',
    events: {
        'click [data-role=reset]': 'reset',
        'click [data-role=toggle]': 'toggle'
    },
    render: function() {
        this.renderTimerValue();
        this.renderTimerControls();

        return this;
    },
    renderTimerValue: function() {
        this.$('.navbar-text').remove();

        var html = App.Templates.TimerValue(this.model.toJSON());
        this.$el.append(html);
    },
    renderTimerControls: function() {
        this.$('.btn-group').remove();

        var html = App.Templates.TimerControls(this.model.toJSON());
        this.$el.prepend(html);
    },
    reset: function() {
        this.model.reset();
    },
    toggle: function() {
        this.model.toggle();
    }
});

