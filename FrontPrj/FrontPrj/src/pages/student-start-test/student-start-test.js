
import './student-start-test.css';
const CONTROLLER_NAME = require('@pages/student-start-test/student-start-test.controller.js');


(function (angular) {
    angular
        .module('app')
        .config(function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/begin-test', {
                    template: require('@pages/student-start-test/student-start-test.template.html'),
                    controller: CONTROLLER_NAME
                });
        });
})(window.angular);

