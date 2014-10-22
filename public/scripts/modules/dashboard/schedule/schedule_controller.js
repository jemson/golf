define([
	"app",
	"modules/dashboard/schedule/schedule_view",
], function(App, View){

		App.module("ScheduleApp.Schedule", function(Schedule, App, Backbone, Marionette, $, _){
	
			Schedule.Controller = Marionette.Controller.extend({
	
				initialize: function(options){
					var d = new Date();
					var time = ('0'+d.getHours()).slice(-2)+('0'+d.getMinutes()).slice(-2);
					
					var filteredCollection = _.first(options.collection.getReservationsByTime(time), 10);

					this.collection = App.request("reservation:entities:recreate", {data:filteredCollection});

					this.layout = this.getLayoutView();
					options.region.show(this.layout);

				},

				getLayoutView: function(){
					return new View.Reservations({collection: this.collection});					
				},

			});
		
		});
	
		return App.ScheduleApp.Schedule;
});
