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

function twoDigitNumber(number) {
    return ("0" + number).slice(-2);
}

/* formatTimer {{{2 */
template.fn.formatTimer = function (time) {
    var days = Math.floor(time / (1000 * 60 * 60 * 24));
    time -=  days * (1000 * 60 * 60 * 24);

    var hours = Math.floor(time / (1000 * 60 * 60));
    time -= hours * (1000 * 60 * 60);

    var mins = Math.floor(time / (1000 * 60));
    time -= mins * (1000 * 60);

    var seconds = Math.floor(time / (1000));
    time -= seconds * (1000);

    return twoDigitNumber(mins) + ':' + twoDigitNumber(seconds) + ':' + twoDigitNumber(time);
};
template.fn.timerClass = function (interval) {
    return interval ? 'glyphicon-pause' : 'glyphicon-play';
};

/* Templates {{{1 */
window.App.Templates = {
    TimerValue: [
        '<p class="navbar-text">',
            '{{ formatTimer(currentTime) }}',
        '</p>',
    ],
    TimerControls: [
        '<div class="btn-group" role="group" aria-label="...">',
            '<button data-role="reset" type="button" class="btn btn-default navbar-btn">',
                '<span class="glyphicon glyphicon-step-backward"></span>',
            '</button>',
            '<button data-role="toggle" type="button" class="btn btn-default navbar-btn">',
                '<span class="glyphicon {{ timerClass(interval) }}"></span>',
            '</button>',
        '</div>'
    ],
    Match: [
        '<div class="scores">{{ scoreLeft }} — {{ scoreRight }}</div>',
    ],
    MatchPloeg: [
        '<h3>{{ ploeg.name }}</h3>',
        '<div class="btn-group">',
            '<button data-role="score" class="btn btn-success">Score!</button>',
            '<button data-role="fault" class="btn btn-default">',
                '<span class="glyphicon glyphicon-remove-circle"></span>',
            '</button>',
        '</div>',
    ],
    Navbar: [
        '<nav class="navbar navbar-default navbar-static-top">',
            '<div class="container-fluid">',
                '<!-- Brand and toggle get grouped for better mobile display -->',
                '<div class="navbar-header">',
                    '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">',
                        '<span class="sr-only">Toggle navigation</span>',
                        '<span class="icon-bar"></span>',
                        '<span class="icon-bar"></span>',
                        '<span class="icon-bar"></span>',
                    '</button>',
                    '<a class="navbar-brand pull-left" href="#">',
                        '<img src="images/logo.png" alt="{{ App.Settings.brand }}">',
                    '</a>',
                    '<a class="navbar-brand" href="#">',
                        '{{ App.Settings.brand }}',
                    '</a>',
                '</div>',

                '<!-- Collect the nav links, forms, and other content for toggling -->',
                '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">',
                    '<ul id="navbar-left" class="nav navbar-nav">',

                    '</ul>',

                    '<ul id="navbar-right" class="nav navbar-nav navbar-right">',
                        '<li><a href="#"><span class="glyphicon glyphicon-volume-up"></span></a></li>',
                    '</ul>',
                '</div><!-- /.navbar-collapse -->',
            '</div><!-- /.container-fluid -->',
        '</nav>'
    ],
    PloegenChooser: [
        '<div id="modal" class="modal fade">',
            '<div class="modal-dialog">',
                '<div class="modal-content">',
                    '<div class="modal-header">',
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                        '<h4 class="modal-title">Kies ploegen</h4>',
                    '</div>',
                    '<div class="modal-body">',
                        //...
                    '</div>',
                '</div><!-- /.modal-content -->',
            '</div><!-- /.modal-dialog -->',
        '</div><!-- /.modal -->'
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