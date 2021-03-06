﻿import angular from 'angular';
import * as CryptoJS from '@root/node_modules/crypto-js/crypto-js.js';

angular.module('constants', [])
    .constant("createTestBaseUrl", 'http://localhost:59009/api/')
    .constant("apiBaseUrl", ' http://localhost:58306/api/')
    .constant("beginTestBaseUrl", 'http://localhost:60069/api/BeginTest/')
    .constant("authBaseUrl", 'http://localhost:62117/api/')
    .constant("studentBeginTestUrl", 'http://localhost:49446/api/')
    .constant("teacherViewResultsUrl", 'http://localhost:63282/api/')
    .constant("teacherTestsUrl", 'http://localhost:49880/api/')
    .constant("defaultPassword", "1234")

module.exports = 'constants';