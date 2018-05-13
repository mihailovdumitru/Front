import angular from 'angular';

const SERVICE_NAME = 'createTestService';

angular.module('app')
    .factory(SERVICE_NAME, ['$http', '$state', 
        function ($http, $state) {
            var service = {};

            service.getUserInfoForUserId = function () {
                console.log("Dima");
            };
            return service;
        }
    ]);

module.exports = SERVICE_NAME;