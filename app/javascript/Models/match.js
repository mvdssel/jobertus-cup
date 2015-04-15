App.Models.Match = Backbone.Model.extend({
    initialize: function (model, options) {
        options = options || {};
        if(!options.ploegen instanceof App.Collections.Ploegen ||
           !options.ploegen.length ||
            options.ploegen.length !== 2)
        {
            console.error('Match did not receive a valid Ploegen entity');
            this.trigger('error');
        }

        this.ploegen = new App.Collections.MatchPloegen();
        options.ploegen.each(_.bind(function(ploeg) {
            this.ploegen.add(
                new App.Models.MatchPloeg({}, { ploeg: ploeg })
            );
        }, this));
    }
});
