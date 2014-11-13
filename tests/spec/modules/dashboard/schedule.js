define([
	'modules/dashboard/schedule/schedule_view'
], function(View){

	describe('Dashboard Schedule View', function(){

		describe('Layout', function(){
			var fixture, pl;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				pl = new View.Layout();
			});	

			it('should have a template', function(){
				expect(pl.template).to.be.a('string');
			});

			it('should show a course region', function(){
				expect(pl.regions).to.be.an('object').and.to.have.ownProperty('coursesRegion');
				expect(pl.regions.coursesRegion).to.equal('#courses-region').and.to.be.a('string');
			});

			it('should show a reservations region', function(){
				expect(pl.regions).to.be.an('object').and.to.have.ownProperty('reservationsRegion');
				expect(pl.regions.reservationsRegion).to.equal('#reservations-region').and.to.be.a('string');
			});

		});

		describe('Courses region', function(){
			var fixture, course, courses;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				course = new View.Course();
				courses = new View.Courses();
			});	

			it('course itemview should have a template', function(){
				expect(course.template).to.be.a('function');
			});			

			it('course itemview should show a list of courses when loaded', function(){
				expect(course.template).to.be.a('function');
			});

			it('course itemview should show a list of reservation when click', function(){
				expect(course.events).to.be.an('object').and.to.have.ownProperty('click [data-reservation]').and.to.have.keys('click [data-reservation]');
			});	
		
			it('courses collection view should have a child view', function(){
				expect(courses.childView).to.be.a('function');
			});			

		});

		describe('Reservation region', function(){
			var fixture, re, res;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				re = new View.Reservation();
				res = new View.Reservations();
			});	

			it('reservation itemview should have a template', function(){
				expect(re.template).to.be.a('string');
			});

			it('reservation itemview should show available schedule', function(){
				expect(re.templateHelpers).to.be.an('object');
			});			

			it('reservation composite view should have a child view', function(){
				expect(res.childView).to.be.a('function');
			});

			it('reservation composite view should have a template', function(){
				expect(res.template).to.be.a('string');
			});

		});			

	});

});