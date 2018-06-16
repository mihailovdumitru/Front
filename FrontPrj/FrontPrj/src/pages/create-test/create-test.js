
import './create-test.css';
const CONTROLLER_NAME = require('@pages/create-test/create-test.controller.js');


(function (angular) {
    angular
        .module('app')
        .config(function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/create', {
                    template: require('@pages/create-test/create-test.template.html'),
                    controller: CONTROLLER_NAME
                });
        });
})(window.angular);

