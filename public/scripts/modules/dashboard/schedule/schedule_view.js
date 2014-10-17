define([
	"app",
	"text!modules/dashboard/schedule/templates/layout.html",
], function(App, LayoutTemplate){

	App.module("ScheduleApp.Show", function(Show, App, Backbone, Marionette, $, _){

		Show.Layout = Marionette.LayoutView.extend({
			className: 'row',
			template: _.template('Count View'),
		});

	});

	return App.ScheduleApp.Show;
});
