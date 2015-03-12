/*global App*/
/* Template Settings {{{1 */
_.templateSettings = {
	evaluate: /\{\{=(.*?)\}\}/g,
	// evalueert functies tussen {{- ... }}
	interpolate: /\{\{(.*?)\}\}/g,
	// substitueert de waarden tussen {{ ... }}
	escape: /\{\{-(.*?)\}\}/g
	// escaped alle html-tags tussen {{= ... }}
};

var template = function (templateString) {
    var templateFn = _.template(templateString);
    return function (context) {
        return templateFn(_.extend({}, template.fn, context));
    };
};

/* Helper functions {{{1 */
template.fn = {};

/* formattedDatumCarousel {{{2 */
template.fn.formattedDatumCarousel = function (handle) {
    var monthNames = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
    var weekDays   = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
    var date = new Date(handle);

    if(date.getDate()) {
        return weekDays[date.getDay()] + "<br />" + date.getDate() + " " + monthNames[date.getMonth()-1];
    }
    else {
        return handle;
    }
};
/* formattedDatumCollapse {{{2 */
template.fn.formattedDatumCollapse = function (datum) {
    var monthNames = ["januari", "februari", "maart", "april", "juni", "juli", "augustus", "sepeptember", "oktober", "november", "december"];
    var weekDays   = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
    var date = new Date(datum);

    // Only if datum is a valid date
    if(date.getDate()) {
        var string = date.getDate() + " " + monthNames[date.getMonth()];
        // Add day of the week if it is not a sunday
        if(date.getDay() !== 0)
            string += " (" + weekDays[date.getDay()] + ")";
        return string;
    }
    else {
        return datum;
    }
};
/* formattedHour {{{2 */
template.fn.formattedHour = function (handle) {
    try {
        var match = /(\d+:\d+):\d+/,
        replace = "$1";
        return handle.replace(match, replace);
    } catch (exc) {
        return handle;
    }
};
/* takIcon {{{2 */
template.fn.takIcon = function (handle) {
    var className = "";
    switch (handle) {
        case "0":
            className = "tak_icons-kapoenen_small";
            break;
        case "1":
            className = "tak_icons-kabouters_small";
            break;
        case "2":
            className = "tak_icons-kabouters_small";
            break;
        case "3":
            className = "tak_icons-jongverkenners_small";
            break;
        case "4":
            className = "tak_icons-verkenners_small";
            break;
        case "5":
            className = "tak_icons-jins_small";
            break;
    }
    return className;
};
/* takFilter {{{2 */
template.fn.takFilter = function (naam) {
    var className;
    if($.inArray(naam, App.Settings["tak-naam-filter"]) >= 0) {
        className = "j-icon-check";
    } else {
        className = "j-icon-unchecked";
    }
    return className;
};
/* collapseClass {{{2 */
template.fn.collapseClass = function (first) {
    var className;
    if(first) {
        className = "in";
    } else {
        className = "collapse";
    }
    return className;
};
/* 1}}} */


/* Templates {{{1 */
window.App.Templates = {
    /* Loading {{{2 */
    TakkenLoading: [
        '<div class="loading">',
            '<span class="error"></span>',
            '<span class="message">Dowloading data...</span>',
        '</div>',
    ],
    /* TakkenFilter Modal {{{2 */
    TakkenFilter: [
        '<div class="modal-dialog j-modal">',
            '<div class="modal-content">',
                '<div class="modal-header">',
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
                    '<h4 class="modal-title" id="takken-filter-modal-label">',
                        'Kies hier de takken die je wenst te zien<br />',
                        '<small>Jobertus onthoudt jouw keuze.</small>',
                    '</h4>',
                '</div>',
                '<div class="modal-body">',
                    // Hier komen de takken
                    '<div class="row"></div>',
                '</div>',
                '<div class="modal-footer">',
                    '<button type="button" class="btn btn-success pull-left" id="tak-filter-alles">Alle takken</button>',
                    '<button type="button" class="btn btn-primary" data-dismiss="modal" id="tak-filter-opslaan">Opslaan</button>',
                '</div>',
            '</div>',
        '</div>',
    ],
    /* Tak {{{2 */
    Tak: [
        '<div class="title-wrapper">',
            '<h2 class="{{ takIcon(prioriteit) }}">',
                '{{ naam }}',
                '<span class="j-icon j-icon-list pull-right"></span>',
            '</h2>',
            '<div class="title-border"></div>',
        '</div>',
    ],
    TakModal: [
        '<p>',
            '<span class="j-icon {{ takFilter(naam) }}"></span>',
            '{{ naam }}',
        '</p>',
    ],
    TakSingle: [
        '<h2 class="{{ takIcon(prioriteit) }}">',
            '{{ naam }}',
            '<span class="j-icon j-icon-show_thumbnails"></span>',
        '</h2>',
    ],
    /* Vergaderingen table {{{2 */
    VergaderingTable: [
        '<tr>',
            '<td>{{ formattedDatumCollapse(model.datum) }}</td>',
            '<td>{{ formattedHour(model.van) }}&nbsp; &nbsp;-&nbsp; &nbsp;{{ formattedHour(model.tot) }}</td>',
            '<td>',
                '<a data-toggle="collapse" data-parent="#tak-{{ takId }}-collapse" href="#vergadering-{{ model.id }}">',
                    '{{ model.naam }}',
                '</a>',
            '</td>',
        '</tr>',
        '<tr>',
            '<td id="vergadering-{{ model.id }}" class="{{ collapseClass(first) }}" colspan="3">',
                '{{ model.tekst }}',
            '</td>',
        '</tr>',
    ],
    /* Vergaderingen Carousel {{{2 */
    VergaderingenCarousel: [
        // Carousel content
        '<div class="carousel-inner j-carousel-inner">',
            // Hier komen alle vergaderingen
        '</div>',
        // Carousel footer
        '<div class="j-carousel-footer">',
            // Control left
            '<a class="carousel-control j-carousel-control left" href="#{{id}}" data-slide="prev">',
                '<span class="j-icon j-icon-chevron-left"></span>',
            '</a>',
            '<ol class="carousel-indicators j-carousel-indicators">',
                // Hier komen die bollekes
                // '<li data-target="#{{- id }}" data-slide-to="0" class="active"></li>',
            '</ol>',
            // Control right
            '<a class="carousel-control j-carousel-control right" href="#{{id}}" data-slide="next">',
                '<span class="j-icon j-icon-chevron-right"></span>',
            '</a>',
            '<div class="carousel-footer-border"></div>',
        '</div>',
    ],
    VergaderingCarousel: [
        // '<div class="item j-item">',
            '<div class="item-left">',
                '<p><span class="j-icon j-icon-calendar"></span></p>',
                '<p>{{ formattedDatumCarousel(datum) }}</p>',
                '<hr />',
                '<p><span class="j-icon j-icon-clock"></span></p>',
                '<p>{{ formattedHour(van) }} <br /> tot <br /> {{ formattedHour(tot) }}</p>',
                '<div class="item-border"></div>',
            '</div>',
            '<div class="item-right">',
                '<div class="title-wrapper">',
                    '<h1 title="{{ naam }}">{{ naam }}</h1>',
                '</div>',
                '<p>{{ tekst }}</p>',
            '</div>'
        // '</div>',
	],
    /* Indicator {{{2 */
    CarouselIndicator: [
        '<li class="j-indicator" data-target="#{{ carouselId }}" data-slide-to="{{ count }}"></li>'
    ],
    CarouselIndicatorActive: [
        '<li class="j-indicator active" data-target="#{{ carouselId }}" data-slide-to="{{ count }}"></li>'
    ]
    /* 2}}} */
};
/* 1}}} */

/* Merge templates {{{1 */
for (var temp in App.Templates) {
	if (App.Templates.hasOwnProperty(temp)) {
		// App.Templates[temp] = template(App.Templates[temp].join("\n"));
		App.Templates[temp] = template(App.Templates[temp].join(""));
	}
}
