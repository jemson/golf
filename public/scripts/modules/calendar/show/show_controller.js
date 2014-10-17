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
				return new View.Calendar({model:this.dates});
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

				console.log(pick);
				this.dates.set({
					month_name: pick,
					year: this.date.getFullYear(),
					exact_date: this.date.getDate(),
					number_of_month: this.date.getMonth(),
					isSelected: true,
				});
			},

			//setting of number of days and indention
			numberOfDays: function(options) {
				var data = options || {};
				var exact_date =  data.date || this.dates.get('exact_date');
				
				var no_of_indent = new Date(this.dates.get('year'), this.dates.get('number_of_month'),1).getDay();
				var no_of_day = this.dates.get('date')[this.date.getMonth()];
				
				this.dates.set({
					no_of_day: no_of_day,
					no_of_indent: no_of_indent,
					exact_date: exact_date
				});
			},

			//changing of months
			triggerMonth: function(integer, model) {
				var newMonth = this.date.getMonth() + integer
					year = this.date.getFullYear();

				//if month is Max or Min reset
				switch ( newMonth )	{
					case 12:
						newMonth = 0;
					break;
					case -1:
						newMonth = 11
					break;
				}

				//if Dec or Jan was hit add year
				switch ( model.get('month_name') ) {
					case 'Dec' || 'Jan':
						var number = model.get('number_of_month') + integer;
						var month = this.date.setMonth(number);
					break;
				}

				this.dates.set({
					month_name: this.dates.get("month")[newMonth],
					year: year,
					number_of_month: newMonth
				});

				this.date.setMonth(newMonth);	
				this.numberOfDays();	
			},

		});
	});
	return App.CalendarApp.Show;
});