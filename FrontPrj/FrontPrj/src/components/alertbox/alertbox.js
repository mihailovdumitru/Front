import angular from 'angular';
import './alertbox.css';

angular.module('login')
    .component('notification', {
        template: require('@components/alertbox/alertbox-template.html'),
        controller: require('@components/alertbox/alertbox-controller.js'),
        bindings: { errorMessage: '@' }
    });

require('../../images/cross-delete.svg');
require('../../images/error-icon.svg');