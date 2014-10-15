define([
	"app"
], function(App){

	App.module("CalendarApp", function(CalendarApp, App, Backbone, Marionette, $, _){

		this.startWithParent = false;

		var API = {
			loadCalendar: function(options){
				require(["modules/calendar/show/show_controller"], function(){
					new CalendarApp.Show.Controller(options);
				});
			}
		};

		App.addInitializer(function(){
			API.loadCalendar();
		});

		// App.commands.setHandler("calendar:load", function(options){
		// 	API.loadCalendar(options);
		// });

	});

	return App.CalendarApp;
});