App.Views.PloegenChooser = Backbone.View.extend({
    initialize: function(options) {
        this.left = undefined;
        this.right = undefined;
    },
    template: App.Templates.PloegenChooser,
    render: function() {
        // Render the template
        this.$el.html(this.template());
        this.$('.modal').modal('show');
        this.$('.modal').on('hide.bs.modal', function() {
            history.go(-1);
        });

        return this;
    },
    choosePloegen: function(callback, context) {
        // Select left ploeg
        this.selectLeft(_.bind(this.selectedLeft, this));
        this.once('selected-left', _.bind(function() {
            // Select right ploeg
            this.selectRight(_.bind(this.selectedRight, this));
            // Call the callback function if all ploegen are chosen
            this.once('selected-right', _.bind(function() {
                this.$('.modal').off('hide.bs.modal');
                this.$('.modal').modal('hide');
                var selectedPloegen = new App.Collections.Ploegen([this.left, this.right]);
                _.bind(callback, context, selectedPloegen)();
            }, this));
        }, this));
    },
    selectLeft: function(callback) {
        var ploegChooser = new App.Views.PloegChooser({ collection: App.Settings.ploegen });
        this.$(".modal-body").html(ploegChooser.render().$el);
        ploegChooser.once('selected-ploeg', callback);
    },
    selectedLeft: function(selectedModel) {
        this.left = selectedModel;
        this.trigger('selected-left');
    },
    selectRight: function(callback) {
        var ploegChooser = new App.Views.PloegChooser({ collection: App.Settings.ploegen });
        this.$(".modal-body").html(ploegChooser.render().$el);
        ploegChooser.once('selected-ploeg', callback);
    },
    selectedRight: function(selectedModel) {
        this.right = selectedModel;
        this.trigger('selected-right');
    }
});

