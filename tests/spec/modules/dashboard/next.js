define([
	'modules/dashboard/next/next_view'
], function(View){

	describe('Dashboard Next View', function(){

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

			it('should show the time of the next available schedule', function(){
				expect(pl.templateHelpers).to.be.an('object').and.to.have.keys('timeToNextFlight');
				expect(pl.templateHelpers.timeToNextFlight).to.be.a('function');
			});

			it('should save the current reservation when click on reserve button', function(){
				expect(pl.triggers).to.be.an('object').and.to.have.ownProperty('click .btn').and.to.include.keys('click .btn');
			});

			it('should render if there is changes on a model or collection', function(){
				expect(pl.modelEvents).to.be.an('object').and.to.have.ownProperty('change').and.to.include.keys('change');
				expect(pl.collectionEvents).to.be.an('object').and.to.have.ownProperty('change').and.to.include.keys('change');
			});
		});

	});

});