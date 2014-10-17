define([
	'app',
	'text!components/modal/templates/layout.html',
], function(App, LayoutTemplate){

	App.module('Components.Modal', function(Modal, App, Backbone, Marionette, $, _){
	
		Modal.Layout = Marionette.LayoutView.extend({
			defaults: {
				width: '320',
				transition: 'modal-stick-top'
			},
			className: 'border-radius-2',
			template: LayoutTemplate,
			regions: {
				modalHeader: '#modal-header',
				modalContent: '#modal-content',
				modalFooter: '#modal-footer',
			},
			events: {
				'click [data-close]':'transitionOut',
				'click [data-save]':'onSave',
			},

			// Merges passed options with default options
			initialize: function(options){
				// this.model = options.options.model;
				this.options = _.defaults(options, this.defaults);
				// if ( _.isUndefined(this.model) ) {

				// } else if ( this.model.get('header_type') === 'save' ) {
				// 	this.options.width = 500;
				// 	this.options.transition = 'modal-stick-top';
				// }
			},

			onRender: function(){
				// Dynamically sets width based on options
				// Todo: Add more options to customize
				//  if ( this.options.width === 500 ) {
				// 	this.$('.modal-wrapper')
				// 		.addClass(this.options.transition)
				// 		.css({
				// 			'max-width':this.options.width+'px'
				// 		});
				// } else {
					this.$('.modal-wrapper')
					.addClass(this.options.transition)
					.css({
						'margin-left':'-'+this.options.width/2+'px',
						'max-width':this.options.width+'px'
					});
				// }
				// Adds transition effects
				_.defer(_.bind(this.transitionIn, this)); 
			},

			transitionIn: function(){
				this.$('.modal-wrapper').addClass('modal-show');
			},

			transitionOut: function(){
				this.$('.modal-wrapper').removeClass('modal-show');
				this.trigger('modal:escape');
			},

			onSave: function(){
				this.trigger('modal:save');
				this.transitionOut();
			},
		});

		Modal.Header = Marionette.ItemView.extend({
			getTemplate: function(){
				return _.template('header <span data-close class="right">x</span>')
			},

		});

		Modal.Footer = Marionette.ItemView.extend({
			template: _.template('<button data-close>Cancel</button><button data-save>Save</button>')
		});

	});

	return App.Components.Modal;
});