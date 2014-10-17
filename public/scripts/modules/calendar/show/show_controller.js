define([
	"app",
	"modules/calendar/show/show_view", 
	"entities/date"
], function(App, View){

	App.module("CalendarApp.Show", function(Show, App, Backbone, Marionette, $, _){
	Show.Controller = Marionette.Controller.extend({
			initialize: function(options){
				this.layout = this.getLayoutView();

				this.dates = App.request("dates:entities:date");

				this.emptyMonth = App.request("dates:entities:emptyMonth");

				this.emptyDate = App.request("dates:entities:emptyDates");
				
				this.date = new Date();
				this.getMonths();
				this.numberOfDays();
				

				this.listenTo(this.layout, "show", function(){
					this.calendarHead();
					this.calendarBody();
				});

				options.region.show(this.layout);

			},

			getLayoutView: function(){
				return new View.Layout();
			},

			getMonthsView:function(){
				return new View.Calendar({model:this.emptyMonth});
			},

			getDatesView:function(){
				return new View.Date({model:this.dates});
			},

			calendarHead: function(){
				var headerView = this.getMonthsView();
				this.layout.calendarHead.show(headerView);

				this.listenTo(headerView, "calendar:month:change", this.triggerMonth);
			},

			calendarBody: function() {
				this.bodyView = this.getDatesView();
				this.layout.calendarBody.show(this.bodyView);

				this.listenTo(this.bodyView, 'calendar:date', this.numberOfDays)
			},

			//get current month
			getMonths: function() {
				var days = this.dates.get("day")[this.date.getDay()];
				var pick = this.dates.get('month')[this.date.getMonth()];
				
				this.emptyMonth.set({
					month: pick,
					year: this.date.getFullYear(),
					day: this.date.getDay(),
					date: this.date.getDate(),
					number: this.date.getMonth(),
					isSelected: true,
				});
			},

			//setting of number of days and indention
			numberOfDays: function(options) {
				var data = options || {};
				var exact_date =  data.date || this.emptyMonth.get('date');
				
				var no_of_indent = new Date(this.emptyMonth.get('year'), this.emptyMonth.get('number'),1).getDay();
				var no_of_day = this.dates.get('date')[this.date.getMonth()];
				
				this.dates.set({
					no_of_day: no_of_day,
					no_of_indent: no_of_indent,
					exact_date: exact_date
				});

				console.log(this.dates);
			},

			//changing of months
			triggerMonth: function(integer, model) {
				var newMonth = this.date.getMonth() + integer;
				var year = this.date.getFullYear();

				if ( newMonth == 12 ) {
					newMonth = 0;
				} else if ( newMonth == -1) {
					newMonth = 11;
				}

				this.emptyMonth.set({
					month: this.dates.get("month")[newMonth],
					year: year,
					number: newMonth
				});

				if (model.get('month') == 'Dec' || model.get('month') == 'Jan') {
					var number = model.get('number') + integer;
					var month = this.date.setMonth(number);
				}

				this.date.setMonth(newMonth);	
				this.numberOfDays();	
			},

		});
	});
	return App.CalendarApp.Show;
});