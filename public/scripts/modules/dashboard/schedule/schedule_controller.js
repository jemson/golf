define([
	"app",
	"modules/dashboard/schedule/schedule_view",
], function(App, View){

		App.module("ScheduleApp.Schedule", function(Schedule, App, Backbone, Marionette, $, _){
	
			Schedule.Controller = Marionette.Controller.extend({
	
				initialize: function(options){
					
					this.layout = this.getLayoutView();
					options.region.show(this.layout);

				},

				getLayoutView: function(){
					return new View.Layout();					
				},

			});
		
		});
	
		return App.ScheduleApp.Schedule;
});
