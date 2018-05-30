import './admin.css';
const CONTROLLER_NAME = require('@pages/admin/admin.controller.js');


(function (angular) {
    angular
        .module('app')
        .config(function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/admin', {
                    template: require('@pages/admin/admin.template.html'),
                    controller: CONTROLLER_NAME
                });
        });
})(window.angular);

