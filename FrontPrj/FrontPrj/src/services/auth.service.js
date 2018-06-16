import angular from 'angular';

const SERVICE_NAME = 'authService';

import jwt_decode from 'jwt-decode';

angular.module('app')
    .factory(SERVICE_NAME, ['$http', '$state', '$cookies', '$location', 'authBaseUrl',
        function ($http, $state, $cookies, $location, authBaseUrl) {
            var service = {};

            service.setToken = function () {
                var token = $cookies.get("token");
                $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
            }

            service.login = function (params) {
                return $http.get(authBaseUrl + "Auth/Login", params);
            };

            service.validateUser = function (role) {
                var token = $cookies.get("token");

                if (token == null) {
                    $location.path("/login");
                }
                else {
                    var decoded = jwt_decode(token);
                    if (decoded.content.ExpiresAt == null || decoded.content.ExpiresAt < (new Date()) ||
                        decoded.content.Role == null || decoded.content.Role != role) {
                        $location.path("/login");
                    }
                }
            };


            return service;
        }
    ]);

module.exports = SERVICE_NAME;