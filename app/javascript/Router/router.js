App.Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "start": "main"
    },
    index: function() {
        this.navigate("start", { trigger: true });
    },
    main: function() {
        window.MatchFactory.createMatch();
        window.evtUtil.once('created-match', function(match) {
            var matchView = new App.Views.Match({ model: match });
            App.Settings.app.html(matchView.render().$el);
        });
    }
});
