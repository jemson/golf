define([
	'modules/schedule/list/list_view'
], function(View){

	describe('ScheduleApp.List', function(){

		describe('Layout', function(){
			var fixture, pl, ml, mln, courses;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				pl = new View.Layout();
				ml = new View.ModalTemplate();
				courses = new View.Course();
				pl.render();
			});	

			it('should have a template', function(){
				expect(pl.template ).to.be.a( 'string' );
			});	

			it('should show a course region', function(){
				expect(pl.regions).to.be.an('object').and.to.have.ownProperty('coursesRegion');
				expect(pl.regions.coursesRegion).to.equal('#courses-region').and.to.be.a('string');
			});

			it('should show a reservations region', function(){
				expect(pl.regions).to.be.an('object').and.to.have.ownProperty('reservationsRegion');
				expect(pl.regions.reservationsRegion).to.equal('#reservations-region').and.to.be.a('string');
			});

			it('should show a photo calendar region', function(){
				expect(pl.regions).to.be.an('object').and.to.have.ownProperty('calendarRegion');
				expect(pl.regions.calendarRegion).to.equal('#calendar-region').and.to.be.a('string');
			});

			it('modal should have a template', function(){
				expect(ml.template).to.be.a('string');
			});	

			it('course region should show list of courses', function(){
				expect(courses.template).to.be.a('function');
			});

			it('course region should show list of courses when click', function(){
				expect(courses.events).to.be.an('object').and.to.have.ownProperty('click [data-reservation]');
			});

		});	

	});

});