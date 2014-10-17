define([
	"app",
	"text!modules/dashboard/day/templates/layout.html",
], function(App, LayoutTemplate){

	App.module("DayApp.Show", function(Show, App, Backbone, Marionette, $, _){

		Show.Layout = Marionette.LayoutView.extend({
			className: 'row',
			template: _.template('Count View'),
		});

	});

	return App.DayApp.Show;
});
