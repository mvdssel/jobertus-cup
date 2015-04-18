App.Views.Navbar = Backbone.View.extend({
    events: {
        'click li a': 'createMatch'
    },
    template: App.Templates.Navbar,
    render: function() {
        // Render the navbar
        this.$('[data-toggle="tooltip"]').tooltip('destroy');
        this.$el.html(this.template());
        this.$('[data-toggle="tooltip"]').tooltip();

        // Render the timer
        var timer = new App.Models.Timer();
        var timerValue = new App.Views.TimerValue({ model: timer });
        var timerControls = new App.Views.TimerControls({ model: timer });
        this.$('.btn-toolbar').append(timerValue.render().$el);
        this.$('.btn-toolbar').append(timerControls.render().$el);

        // Render the stop-sound-button
        var soundBtns = new App.Views.SoundBtns();
        this.$('.btn-toolbar').append(soundBtns.render().$el);

        return this;
    },
    createMatch: function() {
        App.Router.navigate('create-match', {trigger: true});
    }
});

