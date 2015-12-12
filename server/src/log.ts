'use strict';

export = log;

function log(...messages: any[]) {
	if (process.argv[2] === 'debug') {
		console.log.apply(this, messages);		
	}
}
