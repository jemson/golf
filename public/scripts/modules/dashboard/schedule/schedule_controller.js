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

					this.collectionFilter()
					this.layout = this.getLayoutView();
					options.region.show(this.layout);
					this.listenTo(this.layout, 'childview:reserve:schedule', this.reserveSchedule)
				},

				getLayoutView: function(){
					return new View.Reservations({collection: this.collection});					
				},

				collectionFilter: function(){
					var collection = this.collection.scheduleFilter();
					this.collection.reset(collection);
				},

				reserveSchedule: function(iv){
					iv.model.set({isBooked:true})
					iv.model.destroy();
				}

			});
		
		});
	
		return App.ScheduleApp.Schedule;
});
