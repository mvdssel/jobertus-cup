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
/* twoDigitNumber {{{2 */
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
/* formatScores {{{2 */
template.fn.formatScores = function (scores) {
    return scores[0] + ' — ' + scores[1];
};
/* timerClass {{{2 */
template.fn.timerClass = function (interval) {
    return interval ? 'glyphicon-pause' : 'glyphicon-play';
};
/* 1}}} */

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
    Scores: [
        '<div class="scores">{{ formatScores(scores) }}</div>',
    ],
    MatchPloeg: [
        '<div class="ploeg">',
            '<h3>{{ ploeg.name }}</h3>',
            '<div class="btn-group">',
                '<button data-role="score" class="btn btn-success">Score!</button>',
                '<button data-role="fault" class="btn btn-default">',
                    '<span class="glyphicon glyphicon-remove-circle"></span>',
                '</button>',
            '</div>',
        '</div>',
    ],
    Navbar: [
        '<nav class="navbar navbar-default">',
            '<div class="container-fluid">',
                '<div class="navbar-header">',
                    '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">',
                        '<span class="sr-only">Toggle navigation</span>',
                        '<span class="icon-bar"></span>',
                        '<span class="icon-bar"></span>',
                        '<span class="icon-bar"></span>',
                    '</button>',
                    '<div class="pull-left navbar-brand">',
                        '<img src="images/logo.png" alt="{{ App.Settings.brand }}">',
                    '</div>',
                    '<div class="navbar-brand">',
                        '{{ App.Settings.brand }}',
                    '</div>',
                '</div>',

                '<div class="collapse navbar-collapse" id="navbar-collapse">',
                    '<ul class="nav navbar-nav">',
                        '<li><a href="#create-match">Match maken</a></li>',
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
                        '<h4 class="modal-title">Kies de ploegen</h4>',
                    '</div>',
                    '<div class="modal-body">',
                        //...
                    '</div>',
                '</div><!-- /.modal-content -->',
            '</div><!-- /.modal-dialog -->',
        '</div><!-- /.modal -->'
    ],
    PloegChooser: [
        '<div class="container-fluid">',
            '<div class="row"></div>',
        '</div>',
    ],
    PloegChooserEntry: [
        '<button class="btn btn-default">{{ name }}</button>'
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
