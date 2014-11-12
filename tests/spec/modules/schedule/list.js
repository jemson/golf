define([
	'modules/schedule/list/list_view'
], function(View){

	describe('Schedule List View', function(){

		describe('Layout', function(){
			var fixture, pl;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				pl = new View.Layout();
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

			it('should show a calendar region', function(){
				expect(pl.regions).to.be.an('object').and.to.have.ownProperty('calendarRegion');
				expect(pl.regions.calendarRegion).to.equal('#calendar-region').and.to.be.a('string');
			});			

		});	

		describe('Modal', function(){
			var fixture, ml, al;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				ml = new View.ModalTemplate();
				al = new View.AlreadyReservedTemplate();
			});

			it('modal should have a template', function(){
				expect(ml.template).to.be.a('string');
			});	

			it('reserved itemview should have a template', function(){
				expect(al.template).to.be.a('function');
			});

		});


		describe('Course Region', function(){
			var fixture, course, courses;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				course = new View.Course();
				courses = new View.Courses();
			});

			it('course region should show list of courses', function(){
				expect(course.template).to.be.a('function');
			});

			it('course region should show list of schedules when click', function(){
				expect(course.events).to.be.an('object').and.to.have.ownProperty('click [data-reservation]');
			});

			it('course region should render if isSelected attribute has change', function(){
				expect(course.modelEvents).to.be.an('object').and.to.have.ownProperty('change:isSelected');
			});			

			it('course region should render if isPaid attribute has change', function(){
				expect(course.modelEvents).to.be.an('object').and.to.have.ownProperty('change:isPaid');
			});

			it('courses collection view should have a child view', function(){
				expect(courses.childView).to.be.a('function');
			});			

		});

		describe('Reservation Region', function(){
			var fixture, res, resc;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				res = new View.Reservation();
				resc = new View.Reservations();
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

			it('reservation region should render if isReserved attribute has change', function(){
				expect(res.modelEvents).to.be.an('object').and.to.have.ownProperty('change:isReserved');
			});				

			it('reservations collection view should have a child view', function(){
				expect(resc.childView).to.be.a('function');
			});

		});

	});

});