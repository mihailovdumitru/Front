import angular from 'angular';

import '@components/textarea/textarea.css';

angular
    .module('app')
    .component('textareaComponent', {
        template: require('@components/textarea/textarea-template.html'),
        bindings: { label: '@', width: '@', rows:'@', disable:'@', model: '=' }
    })