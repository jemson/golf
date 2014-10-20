define([
	"app",
	"modules/dashboard/show/show_view",
], function(App, View){

		App.module("DashBoardApp.Show", function(Show, App, Backbone, Marionette, $, _){
	
			Show.Controller = Marionette.Controller.extend({
	
				initialize: function(options){
					
					this.layout = this.getLayoutView();

					this.listenTo(this.layout, 'show', function(){
						this.dayRegion();
						this.countRegion();
						this.nextRegion();
						this.scheduleRegion();
						this.calendarRegion();
					})
					App.mainRegion.show(this.layout);

				},

				dayRegion: function(){
					var options = {};
					options.region = this.layout.dayRegion
					require(['modules/dashboard/day/day_controller'], function(Day){
						new Day.Controller(options);
					});
					console.log("day region");
				},

				countRegion: function(region){
					var options = {};
					options.region = this.layout.countRegion
					require(['modules/dashboard/count/count_controller'], function(Count){
						new Count.Controller(options);
					});
					console.log("count region");
				},

				nextRegion: function(){
					var options = {};
					options.region = this.layout.nextRegion
					require(['modules/dashboard/next/next_controller'], function(Next){
						new Next.Controller(options);
					});
					console.log("next region");
				},

				scheduleRegion: function(){
					var options = {};
					options.region = this.layout.scheduleRegion
					require(['modules/dashboard/schedule/schedule_controller'], function(Schedule){
						new Schedule.Controller(options);
					});
					console.log("schedule region");
				},

				calendarRegion: function(){
					App.execute('calendar:load', { region: this.layout.calendarRegion } );
				},

				getLayoutView: function(){
					return new View.Layout();					
				},

			});
		
		});
	
		return App.DashBoardApp.Show;
		
});
