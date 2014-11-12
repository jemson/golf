define([
	'modules/calendar/show/show_view'
], function(View){

	describe('Calendar View', function(){

		describe('Layout', function(){
			var fixture, cv;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				cv = new View.Layout();
			});	

			it('should have a template', function(){
				expect(cv.template).to.be.a('string');
			});			

			it('should show a month and a year', function(){
				expect(cv.regions).to.be.an('object').and.to.have.ownProperty('calendarHead');
				expect(cv.regions.calendarHead).to.equal('#calendar-head').and.to.be.a('string');
			});

			it('should show numbers of days on a month', function(){
				expect(cv.regions).to.be.an('object').and.to.have.ownProperty('calendarBody');
				expect(cv.regions.calendarBody).to.equal('#calendar-body').and.to.be.a('string');
			});
		});

		describe('Calendar Header', function(){
			var fixture, ch;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				ch = new View.Calendar();
			});

			it('show month and year', function(){
				expect(ch.template).to.be.a('string');
			});	

			it('show the next month when click', function(){
				expect(ch.events).to.be.an('object').and.to.have.ownProperty('click [data-render]');
				expect(ch.changeMonth).to.be.a('function');			
			});

			it('it will change the current month to the next month selected', function(){
				expect(ch.modelEvents).to.be.an('object').and.to.have.ownProperty('change');
			});
		});

		describe('Calendar Body', function(){
			var fixture, cb;

			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				cb = new View.Date();
			});

			it('show the dates of the month and the exact date as black', function(){
				expect(cb.template).to.be.a('function');
			});	

			it('calendar body should show the dates of the month', function(){
				expect(cb.templateHelpers).to.be.an('object');
			});

			it('change the the date when click', function(){
				expect(cb.events).to.be.an('object').and.to.have.ownProperty('click [data-date]');
				expect(cb.getDate).to.be.a('function');
			});

			it('it will change the current date to the selected date', function(){
				expect(cb.modelEvents).to.be.an('object').and.to.have.ownProperty('change');
			});
		});
	});

});