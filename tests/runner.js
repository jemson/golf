require([
	/** calendar test */
	'spec/modules/calendar/show.js',
	 
	/** dashboard test */
	'spec/modules/dashboard/count.js',
	// 'spec/modules/dashboard/day.js',
	'spec/modules/dashboard/next.js',
	'spec/modules/dashboard/schedule.js',
	// 'spec/modules/dashboard/show.js',
	
	/** header test */
	'spec/modules/header/show.js',
	
	/** login test */
	'spec/modules/login/show.js',
	
	/** nav test */
	// 'spec/modules/nav/show.js',
	
	/** schedule test */
	'spec/modules/schedule/list.js'
], function(){
	mocha.run();
});