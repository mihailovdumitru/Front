
import './start-test.css';
const CONTROLLER_NAME = require('@pages/start-test/start-test.controller.js');


(function (angular) {
    angular
        .module('app')
        .config(function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/start', {
                    template: require('@pages/start-test/start-test.template.html'),
                    controller: CONTROLLER_NAME
                });
        });
})(window.angular);

