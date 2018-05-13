//import angular from 'angular'

//angular
//    .module('createTest', [require('angular-route')])

const CONTROLLER_NAME = require('@pages/create-test/create-test.controller.js');

//angular
//    .module('createTest')
//    .config(function ($locationProvider, $routeProvider) {
//        $locationProvider.html5Mode(true);
//        $routeProvider
//            .when('/', {
//                template: require('@pages/create-test/create-test.template.html'),
//                controller: CONTROLLER_NAME
//            });
//    });

(function (angular) {
 //   'use strict';
    angular
        .module('app')
        .config(function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/', {
                    template: require('@pages/create-test/create-test.template.html'),
                    controller: CONTROLLER_NAME
                });
        });
})(window.angular);

