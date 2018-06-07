import angular from 'angular';

const CONTROLLER_NAME = 'CreateTestController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', '$route', 'createTestService', 'startTestService', ($scope, $location, $route, createTestService, startTestService) => {
        var ctrl = $scope;
        ctrl.model = [];
        ctrl.model.questions = [];
        ctrl.showQuestion = true;
        ctrl.model.testNaming = "";
        ctrl.response = "";
        var test = {};

        init();

        function init() { 
            ctrl.model.question = "";
            ctrl.model.points = 0;
            ctrl.model.answers = [];
            ctrl.model.answers.push({ content: "", correct: false });
            ctrl.model.lecture = "PSBD";
        }

        ctrl.getLectures = function () {
            startTestService.getLectures().then(function (response) {
                if (response.data) {
                    ctrl.dropDownLectures = [];
                    ctrl.lectures = response.data;
                    for (var element of ctrl.lectures) {
                        var lecture = element;
                        lecture.value = element.lectureID;
                        lecture.text = element.name;
                        ctrl.dropDownLectures.push(lecture);
                    }
                }
            });
        };

        ctrl.getLectures();

        ctrl.save = function () {
            console.log(ctrl.model.question);
        }

        ctrl.addAnswer = function () {
            ctrl.model.answers.push({ content: "", correct: false });
            createTestService.getValues().then(function (values) {
                ctrl.response = values.data;
            });
        }

        ctrl.addQuestion = function (question, answers, points) {
            var questionObj = { content: question, points: points};
            ctrl.model.questions.push({ question: questionObj, answers: answers});
            init();  
            //console.log(ctrl.response);
        }

        ctrl.showPreview = function() {
            ctrl.showQuestion = false;
            //console.log(ctrl.model.questions);
            console.log(ctrl.model);
        }

        ctrl.saveAndSubmit = function () {
            test.naming = ctrl.model.testNaming;
            test.lectureID = ctrl.model.lectureID;
            test.questions = ctrl.model.questions;
            createTestService.insertTest(test);
        }

        ctrl.cancel = function () {
            $route.reload();
        }

        $scope.showPopup = function () {
            angular.element(document.querySelector('.popup'))[0].style.display = "block";
        }

        createTestService.getUserInfoForUserId();


    }]);

module.exports = CONTROLLER_NAME;


