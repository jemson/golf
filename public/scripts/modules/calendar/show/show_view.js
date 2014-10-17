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
			className: 'row',
			events:{
				"click [data-render]": "changeMonth",
			},
			modelEvents: {
				"change": "render"
			},
			changeMonth: function(e){
				var monthTrigger = $(e.currentTarget).data('render');
				this.trigger("calendar:month:change", monthTrigger, this.model);
			},
		});

		Show.Date = Marionette.ItemView.extend({
			initialize: function(){
				console.log(this.model);
			},
			template: _.template('<%= numberOfDays()%>'),
			className: 'row',
			events: {
				'click [data-date]': 'getDate'
			},
			templateHelpers: {
				numberOfDays: function(){
					var day = '<table border="1" >';
					day += "<tr>" + this.prependDays();

					for (var i = 1; i <= this.no_of_day; i++) {
						
						day += '<td class="calendar-td" data-date="'+i+'">' + i + '</td>';
						
						if ( (i+this.no_of_indent) % 7 === 0 ){
							day += "</tr>";
							day += "<tr>";
						}
					}
					day += "</tr>";
					return day + '</table>';
				},

				prependDays: function() {
					var liString = "";

					for ( var i = 0; i < this.no_of_indent; i++ ) {
						liString += "<td> </td>"
					}

					return liString;
				}
			},
			getDate: function(e){
				var date = $(e.currentTarget).data('date');
				this.trigger('calendar:date', date);
			},
			modelEvents: {
				"change": "render"
			},
			
		});
	});

	return App.CalendarApp.Show; 
});