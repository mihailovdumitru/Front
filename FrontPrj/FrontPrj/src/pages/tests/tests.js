
import './tests.css';
const CONTROLLER_NAME = require('@pages/tests/tests.controller.js');


(function (angular) {
    angular
        .module('app')
        .config(function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/tests', {
                    template: require('@pages/tests/tests.template.html'),
                    controller: CONTROLLER_NAME
                });
        });
})(window.angular);

