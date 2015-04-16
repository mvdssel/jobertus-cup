App.Views.Navbar = Backbone.View.extend({
    events: {
        'click li a': 'createMatch'
    },
    template: App.Templates.Navbar,
    render: function() {
        // Render the navbar
        this.$el.html(this.template());

        // Render the timer
        var timer = new App.Models.Timer();
        var timerValue = new App.Views.TimerValue({ model: timer });
        var timerControls = new App.Views.TimerControls({ model: timer });
        this.$('.btn-toolbar').append(timerValue.render().$el);
        this.$('.btn-toolbar').append(timerControls.render().$el);
        // this.$('.navbar-right').append(timerView.render().$el);

        // Render the stop-sound-button
        var stopSoundButton = new App.Views.StopSoundButton();
        this.$('.btn-toolbar').append(stopSoundButton.render().$el);

        return this;
    },
    createMatch: function() {
        App.Router.navigate('create-match', {trigger: true});
    }
});

