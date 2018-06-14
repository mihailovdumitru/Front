import angular from 'angular';

const CONTROLLER_NAME = 'LoginController';

import * as CryptoJS from '@root/node_modules/crypto-js/crypto-js.js';
import jwt_decode from 'jwt-decode';


angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', '$route', '$cookies','defaultPassword', 'authService', ($scope, $location, $route, $cookies, defaultPassword, authService) => {
        var ctrl = $scope;
        ctrl.person = {};
        ctrl.model = [];
        ctrl.newPwd = false;
        ctrl.invalidPwd = false;
        var params = {};
        var newPassword = "";
        var defaultHashPwd = "";

        init();
        function init() {
            ctrl.person = {};
            defaultHashPwd = getHashForString(defaultPassword);
        }


        function getHashForString(element) {
            var wordArray = CryptoJS.enc.Utf8.parse(element);
            var hashedArray = CryptoJS.SHA1(wordArray);
            var rez = CryptoJS.enc.Hex.stringify(hashedArray);

            return rez;
        }


        ctrl.login = function () {
            var passwordHash = getHashForString(ctrl.person.password);
            defaultHashPwd = getHashForString(defaultPassword);

            if (ctrl.newPwd || (passwordHash == defaultHashPwd)) {
                ctrl.newPwd = true;
                if (ctrl.person.newPassword == null || ctrl.person.newPassword != ctrl.person.newPasswordRetyped) {
                    ctrl.invalidPwd = true;

                }
                else {
                    ctrl.invalidPwd = false;
                    newPassword = getHashForString(ctrl.person.newPassword);
                    params = { headers: { username: ctrl.person.username, password: newPassword, oldPassword: passwordHash } };
                }
            }
            else {
                params = { headers: { username: ctrl.person.username, password: passwordHash} };
            }

            if (ctrl.invalidPwd == false) {
                authService.login(params)
                    .then(function (response) {
                        if (response.data) {
                            console.log(response.data);
                            if (response.data != " ") {
                                var decoded = jwt_decode(response.data);
                                $cookies.put("token", response.data);
                                var cookieData = $cookies.get("token");
                                var expiryDate = {};
                                if (decoded.content.ExpiresAt != null) {
                                    expiryDate = new Date(decoded.content.ExpiresAt);
                                }

                                if (decoded.content.Role == "teacher" && expiryDate > (new Date())) {
                                    $location.path("/start");
                                }
                                else if (decoded.content.Role == "admin" && expiryDate > (new Date())) {
                                    $location.path("/admin");
                                }
                                else if (decoded.content.Role == "student" && expiryDate > (new Date())) {
                                    $location.path("/begin-test");
                                }
                            }
                        }
                    });
            }


            //var params = { headers: { username: ctrl.person.username, password: ctrl.person.password }};
            //authService.GetToken(params).then(function (response) {
            //    if (response.data) {
            //        console.log(response.data);
            //    }
            //});
        }


    }]);

module.exports = CONTROLLER_NAME;


