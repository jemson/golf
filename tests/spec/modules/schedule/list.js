define([
	'modules/schedule/list/list_view'
], function(View){

	describe('ScheduleApp.List', function(){

		describe('Layout', function(){
			var fixture, pl, ml, mln, courses, res;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				pl = new View.Layout();
				ml = new View.ModalTemplate();
				courses = new View.Course();
				res = new View.Reservation();
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

			it('course region should show list of schedules when click', function(){
				expect(courses.events).to.be.an('object').and.to.have.ownProperty('click [data-reservation]');
			});

			it('course region should render if isSelected attribute has change', function(){
				expect(courses.modelEvents).to.be.an('object').and.to.have.ownProperty('change:isSelected');
			});			

			it('course region should render if isPaid attribute has change', function(){
				expect(courses.modelEvents).to.be.an('object').and.to.have.ownProperty('change:isPaid');
			});			

			it('reservation region should have a template', function(){
				expect(res.template).to.be.a('string');
			});

			it('reservation region should show a list of schedule', function(){
				expect(res.template).to.be.a('string');
			});

			it('reservation region should show dialog when click on a schedule button', function(){
				expect(res.showDialog).to.be.a('function');
				expect(res.events).to.be.an('object').and.to.have.ownProperty('click [data-button]').and.to.include.keys('click [data-button]');
			});

		});	

	});

});