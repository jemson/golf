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
					console.log("day region");
				},

				countRegion: function(){
					console.log("count region");
				},

				nextRegion: function(){
					console.log("next region");
				},

				scheduleRegion: function(){
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
