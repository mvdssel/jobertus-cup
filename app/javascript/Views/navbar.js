App.Views.Navbar = Backbone.View.extend({
    events: {
        'click li a': 'createMatch'
    },
    template: App.Templates.Navbar,
    render: function() {
        // Render the navbar
        this.$el.html(this.template);

        // Render the timer
        var timer = new App.Models.Timer();
        var timerView = new App.Views.Timer({ model: timer });
        this.$('#navbar-collapse').append(timerView.render().$el);

        return this;
    },
    createMatch: function() {
        App.Router.navigate('create-match', {trigger: true});
    }
});

