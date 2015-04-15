App.Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "start": "main"
    },
    index: function() {
        this.navigate("start", { trigger: true });
    },
    main: function() {
        var matchFactory = new App.Views.MatchFactory();
        $("#app").html(matchFactory.render().$el);
        matchFactory.createMatch();
        matchFactory.on('created-match', function(match) {
            var matchView = new App.Views.Match({ model: match });
            $("#app").html(matchView.render().$el);
        });
    }
});
