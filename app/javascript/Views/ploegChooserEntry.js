App.Views.PloegChooserEntry = Backbone.View.extend({
    events: {
        'click button': 'selectedPloeg'
    },
    tagName: 'div',
    className: 'col-xs-4 col-sm-4 col-md-4',
    template: App.Templates.PloegChooserEntry,
    render: function() {
        // Render the template
        var html = this.template(this.model.toJSON());
        this.$el.html(html);

        return this;
    },
    selectedPloeg: function (e) {
        this.$('button').removeClass('btn-default')
                        .addClass('btn-success')
                        .attr('disabled', 'disabled');
        this.trigger('selected-ploeg', this.model);
    }
});


