define([
	"app",
	"text!modules/dashboard/schedule/templates/reservation.html",
	"text!modules/dashboard/schedule/templates/reservations.html"
], function(App, ReservationTemplate, ReservationsTemplate){

	App.module("ScheduleApp.Schedule", function(Schedule, App, Backbone, Marionette, $, _){

		Schedule.Reservation = Marionette.ItemView.extend({
			template: ReservationTemplate,
		});

		Schedule.Reservations = Marionette.CompositeView.extend({
			template: ReservationsTemplate,
			itemView: Schedule.Reservation,
			className: "schedule-module",
			itemViewContainer: "#reservations-list",
		});

	});

	return App.ScheduleApp.Schedule;
});
