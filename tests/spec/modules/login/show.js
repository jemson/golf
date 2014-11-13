define([
	'modules/login/show/show_view'
], function(View){

	describe('Log In View', function(){

		describe('Layout', function(){
			var fixture, li;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				li = new View.Layout();
			});

			it('should have a template', function(){
				expect(li.template).to.be.a('string');
			});

			it('should show dialog for sign up form', function(){
				expect(li.triggers).to.be.an('object').and.to.have.ownProperty('click [data-sign-up]');
			});

			it('show the next month when click', function(){
				expect(li.events).to.be.an('object').and.to.have.ownProperty('keyup');
				expect(li.loginEnter).to.be.a('function');			
			});
		});

		describe('Modal Layout', function(){
			var fixture, ml;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				ml = new View.ModalLayout();
			});

			it('should show inputs for the form of sign up', function(){
				expect(ml.template).to.be.a('string');
			});

			it('should save the form on to the server', function(){
				expect(ml.triggers).to.be.an('object').and.to.have.ownProperty('click [data-sign-up]');
			});
		});

		describe('Modal Layout', function(){
			var fixture, sl;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				sl = new View.Success();
			});

			it('should show Success and a button', function(){
				expect(sl.template).to.be.a('string');
			});

			it('should close the dialog', function(){
				expect(sl.triggers).to.be.an('object').and.to.have.ownProperty('click [data-close]');
			});
		});
	});

});