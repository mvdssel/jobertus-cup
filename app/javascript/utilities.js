window.App = {
    Models: {},
    Views: {},
    Collections: {},
    Templates: {},
    Settings: {},
};

var evtUtil = _.extend({}, Backbone.Events);

window.PloegFactory = {
    createPloegen: function() {
        var ploegen = new App.Collections.Ploegen();

        $.getJSON(App.Settings.ploegData).done(function(data) {
            var options = data.options || {};
            for (var i in data.ploegen) {
                var ploeg = new App.Models.Ploeg(data.ploegen[i], data.options);
                ploegen.add(ploeg);
            }

            evtUtil.trigger("init");
        });

        return ploegen;
    }
};
