define([
	"app",
	"text!modules/dashboard/schedule/templates/reservation.html",
	"text!modules/dashboard/schedule/templates/reservations.html"
], function(App, ReservationTemplate, ReservationsTemplate){

	App.module("ScheduleApp.Schedule", function(Schedule, App, Backbone, Marionette, $, _){

		Schedule.Reservation = Marionette.ItemView.extend({
			template: ReservationTemplate,
			events: {
				'click [data-test]' : 'test'
			},
			test: function(){
				console.log(this.model);
			}
		});

		Schedule.Reservations = Marionette.CompositeView.extend({
			template: ReservationsTemplate,
			childView: Schedule.Reservation,
			className: "schedule-module",
			// itemViewContainer: "#reservations-list",
		});

	});

	return App.ScheduleApp.Schedule;
});
