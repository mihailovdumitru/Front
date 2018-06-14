import angular from 'angular';
import ngRoute from 'angular-route';
import ngCookies from 'angular-cookies';
import angularTrix from 'angular-trix';
import uiRouter from 'angular-ui-router';

var app = angular.module('SampleApp',['ngRoute']);


import '@src/main-layout/css-vendor/boostrap/bootstrap.min.css';
import '@root/node_modules/angular-material/angular-material.css';

import '@root/node_modules/trix/dist/trix.css';
import '@src/main-layout/index.css';

import '@root/node_modules/angular-aria/angular-aria.js';
import '@root/node_modules/angular-animate/angular-animate.js';
import '@root/node_modules/angular-material/angular-material.js';
import '@root/node_modules/angular-messages/angular-messages.js';
import '@root/node_modules/ng-table/index.js';
import '@root/node_modules/trix/dist/trix.js';
import '@root/src/app.constants.js';




angular
    .module('app', [
        'constants',
        'ngTable',
        'ngAnimate',
        'ngMaterial',
        'ngMessages',
        'ngCookies',
        'angularTrix',
        'ngRoute',
        'ui.router'
    ]);

require('@components/all.js');
require('angular-ui-router');
require('ui-router-extras');
require('@root/node_modules/angular-crypto-js/angular-crypto-js.js');

require('@pages/create-test/create-test.js');
require('@pages/student-start-test/student-start-test.js');
require('@pages/teacher-view-results/teacher-view-results.js');
require('@pages/start-test/start-test.js');
require('@pages/login/login.js');
require('@pages/admin/admin.js');

require('@root/src/services/create-test.service.js');
require('@root/src/services/entities.service.js');
require('@root/src/services/start-test.service.js');
require('@root/src/services/auth.service.js');
require('@root/src/services/teacher_view_results.service.js');



