import angular from 'angular';

const SERVICE_NAME = 'createTestService';

angular.module('app')
    .factory(SERVICE_NAME, ['$http', '$state', '$cookies', 'createTestBaseUrl',
        function ($http, $state, $cookies, createTestBaseUrl) {
            var service = {};
            //var token = $cookies.get("token");
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + token;

            service.getValues = function () {
                return $http.get(createTestBaseUrl + "CreateTest/6");
            }

            service.insertTest = function (params) {
                return $http.post(createTestBaseUrl + "CreateTest", params);
            }

            return service;
        }
    ]);

module.exports = SERVICE_NAME;