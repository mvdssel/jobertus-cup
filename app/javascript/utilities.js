window.App = {
    Models: {},
    Views: {},
    Collections: {},
    Templates: {},
    Settings: {},
};

window.evtUtil = _.extend({}, Backbone.Events);

window.PloegFactory = {
    createPloegen: function() {
        var ploegen = new App.Collections.Ploegen();

        $.getJSON(App.Settings.ploegData).done(function(data) {
            var options = data.options || {};
            for (var i in data.ploegen) {
                var ploeg = new App.Models.Ploeg(data.ploegen[i], options);
                ploegen.add(ploeg);
            }

            window.evtUtil.trigger('created-ploegen', ploegen);
        });

        return ploegen;
    }
};

window.MatchFactory = {
    createMatch: function() {
        var ploegenChooser = new App.Views.PloegenChooser();
        App.Settings.modal.html(ploegenChooser.render().$el);
        ploegenChooser.choosePloegen(this.chosePloegen, this);
    },
    chosePloegen: function(ploegen) {
        var match = new App.Models.Match({}, { ploegen: ploegen });
        window.evtUtil.trigger('created-match', match);
    }
};
