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
    Ploegen: [
        '<h2>Ploegen:</h2>',
        '<div class="row">',
        '</div>'
    ],
    Ploeg: [
        '{{ name }}',
        '<div class="image-wrapper">',
            '<img src="{{ image }}"/>',
        '</div>'
    ],
    MatchPloeg: [
        '<h3>{{ ploeg.name }}</h3>',
        '<div class="image-wrapper">',
            '<img src="{{ ploeg.image }}"/>',
        '</div>',
        '<button class="btn-score">Score!</button>',
        '<button class="btn-fault">Foutje</button>',
        '<span class="score">{{ score }}</span>'
    ],
    Match: [

    ],
    MatchFactory: [

    ],
    PloegenChooser: [
        '<button class="btn-create-match">Create new match</button>',
    ],
    PloegChooser: [

    ],
    PloegChooserEntry: [
        '<button>{{ name }}</button>'
    ]
};
/* 1}}} */

/* Merge templates {{{1 */
for (var temp in App.Templates) {
	if (App.Templates.hasOwnProperty(temp)) {
		// App.Templates[temp] = template(App.Templates[temp].join("\n"));
		App.Templates[temp] = template(App.Templates[temp].join(""));
	}
}
