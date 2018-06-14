
import './teacher-view-results.css';
const CONTROLLER_NAME = require('@pages/teacher-view-results/teacher-view-results.controller.js');


(function (angular) {
    angular
        .module('app')
        .config(function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/teacher-view-results', {
                    template: require('@pages/teacher-view-results/teacher-view-results.template.html'),
                    controller: CONTROLLER_NAME
                });
        });
})(window.angular);

