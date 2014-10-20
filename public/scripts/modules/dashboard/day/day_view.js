define([
	"app",
	"text!modules/dashboard/day/templates/layout.html",
], function(App, LayoutTemplate){

	App.module("DayApp.Day", function(Day, App, Backbone, Marionette, $, _){

		Day.Layout = Marionette.LayoutView.extend({
			className: 'row',
			template: _.template('Day View'),
		});

	});

	return App.DayApp.Day;
});
