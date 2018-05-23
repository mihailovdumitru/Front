import angular from 'angular';

import './checkbox.css';

angular
    .module('app')
    .component('checkboxComponent', {
        template: require('@components/checkbox/checkbox-template.html'),
        bindings: { label: '@', model: '='}
    })