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
			template: _.template('<%= numberOfDays()%>'),
			className: 'row',
			templateHelpers: {
				numberOfDays: function(){
					var day = '<table border="1" >';
					day += "<tr class='calendar'>";
					for (var i = 1; i <= this.date; i++) {
						day += "<td class='calendar-td'>" + i + "</td>";
						if ( i % 7 === 0 ){
							day += "</tr>";
							day += "<tr>";
						}
					}
					day += "</tr>";
					return day + '</table>';
				}
			}
		});
	});

	return App.CalendarApp.Show; 
});