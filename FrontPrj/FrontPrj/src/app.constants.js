import angular from 'angular';


angular.module('constants', [])
    .constant("createTestBaseUrl", 'http://localhost:59009/api/')
    .constant("apiBaseUrl", ' http://localhost:58306/api/')

module.exports = 'constants';