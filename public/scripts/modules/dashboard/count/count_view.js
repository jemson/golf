define([
	"app",
	"text!modules/dashboard/count/templates/layout.html",
], function(App, LayoutTemplate){

	App.module("CountApp.Count", function(Count, App, Backbone, Marionette, $, _){

		Count.Layout = Marionette.LayoutView.extend({
			className: 'row',
			template: _.template('Count View'),
		});

	});

	return App.CountApp.Count;
});
