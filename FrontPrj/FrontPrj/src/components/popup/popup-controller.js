import angular from 'angular';

const CONTROLLER_NAME = 'popup-controller';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$window', ($scope, $window)=> {
    	$scope.buttonText = 'About referral program';
    	$scope.buttonHeight = 40;
    	$scope.buttonWidth = 230;
    	
        var popup = angular.element(document.querySelector('.popup'))[0];
		$scope.closePopup = function() {
			popup.style.display = "none";
		}

		$window.onclick = function(event) {
			if (event.target == popup) {
			    popup.style.display = "none";
			}
		}
    }])

module.exports = CONTROLLER_NAME;