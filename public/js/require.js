requirejs.config({
    baseUrl: '/js/',
    paths: {
        jquery: '../bower_components/jquery/jquery.min',
        jqueryUi: '../bower_components/jquery-ui/jquery-ui.min',
        jqueryUiTouchPunch: '../bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        lodash: '../bower_components/lodash/dist/lodash.min'
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        jqueryUi: ['jquery'],
        jqueryUiTouchPunch: ['jqueryUi'],
        bootstrap: ['jquery']
    }
});