'use strict';

define('admin/plugins/registration-question', ['admin/settings'], function (Settings) {
	const ACP = {};
	ACP.init = function () {
		Settings.prepare();
	};
	return ACP;
});
