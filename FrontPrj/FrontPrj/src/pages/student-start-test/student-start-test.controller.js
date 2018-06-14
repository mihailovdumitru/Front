import angular from 'angular';
import { debug } from 'util';

const CONTROLLER_NAME = 'StudentStartTestController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', '$route', 'createTestService', 'startTestService', 'entitiesService', ($scope, $location, $route, createTestService, startTestService, entitiesService) => {
        var ctrl = $scope;
        ctrl.model = [];
        ctrl.test = [];
        ctrl.studentTest = {};
        ctrl.studentTest.questions = [];
        ctrl.currentQuestion = {};
        ctrl.result = [];
        init();
        var testResult = {};
        testResult.questions = [];
        ctrl.totalQuestions = 0;
        ctrl.remainingTime = {};
        var finishTest = {};
        var testResultsToSend = {};
        ctrl.testFinished = false;
        ctrl.testResultsStats = {};
        ctrl.receivedTestResults = {};
        ctrl.testFinishedForAllStudents = false;
        ctrl.fullTest = {};
        ctrl.testParams = {};
        ctrl.testPenalty = {};


        function init() {
            ctrl.showQuestion = true;
        }


        function getData() {
            startTestService.getTestsResults().then(function (response) {
                if (response.data && response.data != "") {
                    ctrl.receivedTestResults = response.data;
                    ctrl.testResultsStats = {
                        numberOfCorrectAnswers: ctrl.receivedTestResults.nrOfCorrectAnswers,
                        numberOfWrongAnswers: ctrl.receivedTestResults.nrOfWrongAnswers,
                        numberOfUnfilledAnswers: ctrl.receivedTestResults.nrOfUnfilledAnswers,
                        mark: ctrl.receivedTestResults.mark,
                        points: ctrl.receivedTestResults.points
                    }

                    startTestService.getTestInfo().then(function (response) {
                        if (response.data && response.data != "") {
                            var testParams = response.data;
                            console.log(testParams);
                            finishTest = testParams.finishTest;
                            initializeClock(finishTest);

                            if (ctrl.receivedTestResults != null && (new Date(finishTest) > new Date(ctrl.receivedTestResults.testResultDate))) {
                                ctrl.testFinished = true;
                            }

                            if (!ctrl.testFinished || !ctrl.testFinishedForAllStudents) {
                                startTestService.getStudentTest().then(function (response) {
                                    if (response.data) {
                                        var testFromDB = response.data;
                                        ctrl.test = { testID: testFromDB.testID, lectureID: testFromDB.lectureID, naming: testFromDB.naming, teacherID: testFromDB.teacherID };
                                        ctrl.studentTest.questions = shuffle(testFromDB.questions);
                                        ctrl.currentQuestion = ctrl.studentTest.questions[0];
                                        ctrl.currentQuestion.answers = shuffle(ctrl.currentQuestion.answers);
                                        ctrl.totalQuestions = ctrl.studentTest.questions.length;
                                    }
                                });
                            }
                        }
                        else {
                            ctrl.testFinished = true;
                            ctrl.testFinishedForAllStudents = true;
                            var studentResults = JSON.parse(ctrl.receivedTestResults.answersResult);



                            startTestService.getFullTest().then(function (response) {
                                if (response.data) {
                                    ctrl.test = response.data;
                                    startTestService.getTestParamsForTest(ctrl.test.testID).then(function (response) {
                                        if (response.data) {
                                            ctrl.testPenalty = response.data.penalty;
                                            console.log(response.data);
                                            var wrongAnswer = false; 

                                            for (var question of ctrl.test.questions) {
                                                var questionRez = studentResults.filter(studentQuestionRez => studentQuestionRez.questionID == question.question.questionID)[0];
                                                
                                                for (var answer of question.answers) {
                                                    if (questionRez.answers.includes(answer.answerID)) {
                                                        answer.studentOption = true;
                                                    }
                                                    else {
                                                        answer.studentOption = false;
                                                    }
                                                }
                                                wrongAnswer = false;
                                                if (questionRez.answers.length != 0) {
                                                    for (var answer of question.answers) {
                                                        if (answer.correct != answer.studentOption) {
                                                            wrongAnswer = true;
                                                            question.question.receivedPoints = 0 - (question.question.points * (ctrl.testPenalty/100));
                                                            break;
                                                        }
                                                    }
                                                    if (wrongAnswer == false)
                                                        question.question.receivedPoints = question.question.points;
                                                }
                                                else {
                                                    question.question.receivedPoints = 0;
                                                }

                                            }
                                            console.log(ctrl.test);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                else {
                    startTestService.getStudentTest().then(function (response) {
                        if (response.data) {
                            var testFromDB = response.data;
                            ctrl.test = { testID: testFromDB.testID, lectureID: testFromDB.lectureID, naming: testFromDB.naming, teacherID: testFromDB.teacherID };
                            ctrl.studentTest.questions = shuffle(testFromDB.questions);
                            ctrl.currentQuestion = ctrl.studentTest.questions[0];
                            ctrl.currentQuestion.answers = shuffle(ctrl.currentQuestion.answers);
                            ctrl.totalQuestions = ctrl.studentTest.questions.length;
                        }
                    });
                    startTestService.getTestInfo().then(function (response) {
                        if (response.data) {
                            var testParams = response.data;
                            console.log(testParams);
                            finishTest = testParams.finishTest;
                            initializeClock(finishTest);
                        }
                    });
                }
            });
        }

        function getTestInfo() {
            startTestService.getTestInfo().then(function (response) {
                if (response.data) {
                    var testParams = response.data;
                    console.log(testParams);
                    finishTest = testParams.finishTest;
                    initializeClock(finishTest);
                }
            });
        }

        function GetTestStudent() {
            startTestService.getStudentTest().then(function (response) {
                if (response.data) {
                    var testFromDB = response.data;
                    ctrl.test = { testID: testFromDB.testID, lectureID: testFromDB.lectureID, naming: testFromDB.naming, teacherID: testFromDB.teacherID };
                    ctrl.studentTest.questions = shuffle(testFromDB.questions);
                    ctrl.currentQuestion = ctrl.studentTest.questions[0];
                    ctrl.currentQuestion.answers = shuffle(ctrl.currentQuestion.answers);
                    ctrl.totalQuestions = ctrl.studentTest.questions.length;

                }
            });
        }

        getData();

        ctrl.nextQuestion = function () {
            var question = ctrl.studentTest.questions.shift();
            ctrl.currentQuestion = ctrl.studentTest.questions[0];
            ctrl.studentTest.questions.push(question);
            console.log(ctrl.studentTest.questions);
        }

        ctrl.submitAnswer = function () {
            var questionID = ctrl.currentQuestion.question.questionID;
            var question = { questionID: questionID, answers: [] };

            for (var answer of ctrl.currentQuestion.answers) {
                if (answer.correct != null && answer.correct == true) {
                    question.answers.push(answer.answerID);
                }
            }
            testResult.questions.push(question);

            ctrl.studentTest.questions.shift();
            ctrl.currentQuestion = ctrl.studentTest.questions[0];
            if (ctrl.studentTest.questions.length == 0) {
                submitTest();
            }
        }

        function submitTest() {
            testResultsToSend = { testID: ctrl.test.testID, answersResult: JSON.stringify(testResult.questions) };
            startTestService.addTestsResults(testResultsToSend).then(function (response) {
                if (response.data) {
                    ctrl.testFinished = true;
                    ctrl.testResultsStats = response.data;
                }
            });
        }



        function initializeClock(endtime) {
            var timeinterval = setInterval(function () {
                var t = getTimeRemaining(endtime);
                if (t != "timeExpired") {
                    ctrl.remainingTime.time =
                        t.hours + ' hours ' + ' ' + t.minutes + ' ' + ' minutes ' + t.seconds + ' ' + ' seconds';
                }
                else {
                    ctrl.remainingTime.time = "Your time expired!"
                }
                ctrl.$apply();
                if (t.total <= 0) {
                    clearInterval(timeinterval);
                }
            }, 1000);
        }


        function getTimeRemaining(endtime) {
            if (new Date(endtime) > new Date()) {
                var t = Date.parse(endtime) - Date.parse(new Date());
                var seconds = Math.floor((t / 1000) % 60);
                var minutes = Math.floor((t / 1000 / 60) % 60);
                var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                var days = Math.floor(t / (1000 * 60 * 60 * 24));
                return {
                    'total': t,
                    'days': days,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                };
            }
            else {
                if (ctrl.testResultsStats == null) {
                    submitTest();
                }
                return "timeExpired";
            }
        }

        function shuffle(arra1) {
            var ctr = arra1.length, temp, index;

            // While there are elements in the array
            while (ctr > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * ctr);
                // Decrease ctr by 1
                ctr--;
                // And swap the last element with it
                temp = arra1[ctr];
                arra1[ctr] = arra1[index];
                arra1[index] = temp;
            }
            return arra1;
        }

    }]);

module.exports = CONTROLLER_NAME;


