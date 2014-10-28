// https://github.com/codrops/ModalWindowEffects
define([
	'app',
	'components/modal/modal_view',
], function(App, View){

	App.module('Components.Modal', function(Modal, App, Backbone, Marionette, $, _){
	
		Modal.Controller = Marionette.Controller.extend({
			initialize: function(options){
				var that = this;
				this.options = _.defaults(options, this.defaults);
				this.collection = options.collection;
				this.model = options.model;
				this.layout = this.getLayout();

				var contentView = options.contentView;
				var footerView = options.footerView;
				this.listenTo(this.layout, 'show', function(){
					this.layout.modalContent.show(contentView);
					this.modalHeader();
					this.modalFooter();
				});
				
				App.dialogRegion.show(this.layout);
				this.listenTo(this.layout, 'modal:escape', this.onEscape);
				this.listenTo(this.layout, 'modal:save', this.reserveTime);
				this.layoutTermination();
				
			},
		
			reserveTime: function(){
				this.model.trigger('save:reservation');
			},

			getLayout: function(){
				return new View.Layout({options: this.options});
			},

			getHeaderView: function(){
				return new View.Header();
			},

			getFooterView: function(){
				return new View.Footer();
			},

			// Uses Marionette's 'before:destroy' event to remove the layout
			onBeforeDestroy: function(){
				this.layout.destroy();
			},

			// Triggered when user clicks outside the modal
			// Todo: trigger when click on x, cancel, or hits esc key
			onEscape: function(){
				_.delay( _.bind(this.destroy, this), 1000);
			},

			modalFooter: function(options){
				var defaults = this.options;
				if ( defaults.options.footer ) {
					this.footer = this.getFooterView();
					this.layout.modalFooter.show(this.footer);
				} else {

				}
			},

			modalHeader: function(){
				var defaults = this.options
				if ( defaults.options.header ) {
					this.header = this.getHeaderView();
					this.layout.modalHeader.show(this.header);
				} else {

				}
			},

			layoutTermination: function(){
				if ( _.isUndefined(this.collection) ) {
					this.listenTo(this.model, 'model:modal:destroy', function(){
						this.layout.destroy();
					});
				} else {
					this.listenTo( this.collection, 'modal:destroy', function(){
						this.layout.destroy();
					});
				}
			}		
			
		});

	});

	return App.Components.Modal;
});