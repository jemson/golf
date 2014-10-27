define([
	"app",
	"text!modules/dashboard/schedule/templates/reservation.html",
	"text!modules/dashboard/schedule/templates/reservations.html"
], function(App, ReservationTemplate, ReservationsTemplate){

	App.module("ScheduleApp.Schedule", function(Schedule, App, Backbone, Marionette, $, _){

		Schedule.Reservation = Marionette.ItemView.extend({
			template: ReservationTemplate,
			events: {
				'click [data-reserve]' : 'reserveSchedule'
			},
			reserveSchedule: function(){
				this.trigger('reserve:schedule', this);
				// this.destroy()
			}
		});

		Schedule.Reservations = Marionette.CompositeView.extend({
			template: ReservationsTemplate,
			childView: Schedule.Reservation,
			className: "schedule-module",
			collectionEvents: {
				'change' : 'render'
			}
		});

	});

	return App.ScheduleApp.Schedule;
});
