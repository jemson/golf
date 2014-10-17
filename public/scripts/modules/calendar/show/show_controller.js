define([
	"app",
	"modules/calendar/show/show_view", 
	"entities/date"
], function(App, View){

	App.module("CalendarApp.Show", function(Show, App, Backbone, Marionette, $, _){
	Show.Controller = Marionette.Controller.extend({
			initialize: function(options){
				this.layout = this.getLayoutView();

				this.mo = App.request("dates:entities:months");

				this.dates = App.request("dates:entities:date");

				this.day = App.request("dates:entities:day");

				this.emptyMonth = App.request("dates:entities:emptyMonth");

				this.emptyDate = App.request("dates:entities:emptyDates");
				
				this.date = new Date();
				this.getMonths();
				this.numberOfDays();
				

				this.listenTo(this.layout, "show", function(){
					this.calendarHead();
					this.calendarBody();
				});

				App.dialogRegion.show(this.layout);

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

			calendarBody: function(){
				this.bodyView = this.getDatesView();
				this.layout.calendarBody.show(this.bodyView);

				this.listenTo(this.bodyView, "childview:day:click", this.changeSelectedDate);
				this.listenTo(this.bodyView, "childview:day:click", this.selectedDate);
			},

			//get current month
			getMonths: function(){
				var days = this.day.get("day")[this.date.getDay()];
				var pick = this.mo.get('month')[this.date.getMonth()];
				
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
			numberOfDays: function(){
				var year = this.emptyMonth.get('year');
				var months = this.emptyMonth.get('number');
				
				var no_of_indent = new Date(year,months,1).getDay();
				var no_of_day = this.dates.get('date')[this.date.getMonth()];
				
				this.dates.set({
					no_of_day: no_of_day,
					no_of_indent: no_of_indent,
					exact_date: this.emptyMonth.get('date')
				});
			},

			//changing of months
			triggerMonth: function(integer, model){
				var newMonth = this.date.getMonth() + integer;
				var year = this.date.getFullYear();

				if ( newMonth == 12 ) {
					newMonth = 0;
				} else if ( newMonth == -1) {
					newMonth = 11;
				}

				this.emptyMonth.set({
					month: this.mo.get("month")[newMonth],
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