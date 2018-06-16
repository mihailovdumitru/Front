import angular from 'angular';

const CONTROLLER_NAME = 'CreateTestController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', '$route', 'createTestService', 'startTestService', 'authService', ($scope, $location, $route, createTestService, startTestService, authService) => {
        var ctrl = $scope;
        ctrl.model = [];
        ctrl.model.questions = [];
        ctrl.showQuestion = true;
        ctrl.model.testNaming = "";
        ctrl.response = "";
        var test = {};

        authService.setToken();

        authService.validateUser("teacher");

        init();

        function init() {
            ctrl.model.question = "";
            ctrl.model.points = 0;
            ctrl.model.answers = [];
            ctrl.model.answers.push({ content: "", correct: false });
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


        ctrl.addAnswer = function () {
            ctrl.model.answers.push({ content: "", correct: false });
        }

        ctrl.addQuestion = function (question, answers, points) {
            var questionObj = { content: question, points: points };
            ctrl.model.questions.push({ question: questionObj, answers: answers });
            init();
        }

        ctrl.showPreview = function () {
            ctrl.showQuestion = false;
        }

        ctrl.saveAndSubmit = function () {
            test.naming = ctrl.model.testNaming;
            test.lectureID = ctrl.model.lectureID;
            test.questions = ctrl.model.questions;
            createTestService.insertTest(test).then(function (response) {
                $route.reload();
            });
        }

        ctrl.cancel = function () {
            $route.reload();
        }


    }]);

module.exports = CONTROLLER_NAME;


