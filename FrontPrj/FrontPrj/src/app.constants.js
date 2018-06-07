import angular from 'angular';


angular.module('constants', [])
    .constant("createTestBaseUrl", 'http://localhost:59009/api/')
    .constant("apiBaseUrl", ' http://localhost:58306/api/')
    .constant("beginTestBaseUrl", 'http://localhost:60069/api/BeginTest/')

module.exports = 'constants';