App.Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'create-match': 'createMatch',
        'match': 'match',
        'example-match': 'exampleMatch'
    },
    index: function() {
        this.navigate('create-match', { trigger: true });
    },
    createMatch: function() {
        window.MatchFactory.createMatch();
        window.evtUtil.once('created-match', _.bind(function(match) {
            App.Settings.match = match;
            this.navigate('match', { trigger: true });
        }, this));
    },
    match: function(match) {
        if(!App.Settings.match) {
            this.navigate('create-match', { trigger: true });
        }
        else {
            var matchView = new App.Views.Match({ model: App.Settings.match });
            App.Settings.app.html(matchView.render().$el);
        }
    },
    exampleMatch: function() {
        var match = new App.Models.Match({}, { ploegen: new App.Collections.Ploegen([
            App.Settings.ploegen.at(0),
            App.Settings.ploegen.at(1)
        ])});
        var matchView = new App.Views.Match({ model: match });
        App.Settings.app.html(matchView.render().$el);
    }
});
