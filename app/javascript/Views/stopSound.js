App.Views.StopSoundButton = Backbone.View.extend({
    events: {
        'click [data-role=stop-sound]': 'stopSound'
    },
    tagName: 'div',
    className: 'btn-group',
    attributes: {
        'role': 'group'
    },
    template: App.Templates.StopSoundButton,
    render: function() {
        // Render the template
        this.$el.html(this.template());

        return this;
    },
    stopSound: function() {
        window.evtUtil.trigger('stop-sound');
    }
});
