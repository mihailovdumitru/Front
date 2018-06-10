import './login.css';
const CONTROLLER_NAME = require('@pages/login/login.controller.js');


(function (angular) {
    angular
        .module('app')
        .config(function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/login', {
                    template: require('@pages/login/login.template.html'),
                    controller: CONTROLLER_NAME
                });
        });
})(window.angular);

