import angular from 'angular';

const CONTROLLER_NAME = 'header-controller';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', '$window', '$cookies', '$cookieStore', ($scope, $location, $window, $cookies, $cookieStore) => {

        $scope.logout = function () {
            $cookies.remove("token");
            $location.path("/login");
        }
    }])

module.exports = CONTROLLER_NAME;