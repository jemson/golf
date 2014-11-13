define([
	'modules/nav/show/show_view'
], function(View){

	describe('Nav View', function(){

		describe('Layout', function(){
			var fixture, nav;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				nav = new View.Layout();
			});

			it('should have a template', function(){
				expect(nav.template).to.be.a('string');
			});

			it('should give an uri for the dashboard and schedule', function(){
				expect(nav.templateHelpers).to.be.an('object').and.to.have.keys('uri');
				expect(nav.templateHelpers.uri).to.be.a('function');
			});

			it('should log out when Log out is hit', function(){
				expect(nav.events).to.be.an('object').and.to.have.ownProperty('click [data-logout]');
				expect(nav.logout).to.be.a('function');			
			});

			it('should show dashboard page when clicked', function(){
				expect(nav.triggers).to.be.an('object').and.to.have.ownProperty('click [data-dashboard]');
			});

			it('should show schedule page when clicked', function(){
				expect(nav.triggers).to.be.an('object').and.to.have.ownProperty('click [data-schedule]');
			});

			it('should add id on the link given on the nav', function(){
				expect(nav.serializeData).to.be.a('function');
			});
		});
	});

});