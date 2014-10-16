define([
	"app",
	"text!modules/calendar/show/templates/calendar.html",
	"text!modules/calendar/show/templates/calendar-header.html",
], function(App, CalendarTemplate, HeaderTemplate){

	App.module("CalendarApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Layout = Marionette.LayoutView.extend({
			template: CalendarTemplate,
			regions: {
				calendarHead: "#calendar-head",
				calendarBody: "#calendar-body"
			}
		});

		Show.Calendar = Marionette.ItemView.extend({
			template: HeaderTemplate,
			events:{
				"click [data-left]": "left",
				"click [data-right]": "right"
			},
			modelEvents: {
				"change": "render"
			},
			left:function(){
				this.trigger("calendar:month:change", -1, this.model);
			},
		 	right:function(){
				this.trigger("calendar:month:change", 1, this.model);
			}
		});

		Show.Date = Marionette.ItemView.extend({
			initialize: function(options){
				this.dayNumber = options.test
				// this.templateHelpers.numberOfDays(options)
			},
			template: _.template('<%= numberOfDays()%>'),
			// className: '',
			templateHelpers: {
				numberOfDays: function(options){
					
				}
			}
		});
	});

	return App.CalendarApp.Show; 
})