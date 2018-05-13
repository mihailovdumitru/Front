import angular from 'angular';

const CONTROLLER_NAME = 'CreateTestController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', 'createTestService', ($scope, $location, createTestService) => {


        $scope.showPopup = function () {
            angular.element(document.querySelector('.popup'))[0].style.display = "block";
        }

        createTestService.getUserInfoForUserId();


    }]);

module.exports = CONTROLLER_NAME;


