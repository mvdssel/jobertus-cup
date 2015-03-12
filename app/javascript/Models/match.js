App.Models.Match = Backbone.Model.extend({
    initialize: function (model, options) {
        options = options || {};
        if(!model.van instanceof App.Models.Ploeg ||
           !model.naar instanceof App.Models.Ploeg)
        {
            this.trigger("error");
        }
    }
});


