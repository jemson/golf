define([
	"app",
	"text!modules/dashboard/schedule/templates/layout.html",
], function(App, LayoutTemplate){

	App.module("ScheduleApp.Schedule", function(Schedule, App, Backbone, Marionette, $, _){

		Schedule.Layout = Marionette.LayoutView.extend({
			className: 'row',
			template: _.template('Schedule View'),
		});

	});

	return App.ScheduleApp.Schedule;
});
