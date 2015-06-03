define([

    'jquery',

    'class/things',
    'class/basket'

], function($, Things, Basket) {
    return {
        start: function() {
            var basket = new Basket();

            var things = new Things(basket);

            things.add('test', 'some description');
            things.add('test', 'some description');
            things.add('test', 'some description');
            things.add('test', 'some description');
            things.add('test', 'some description');
            things.add('test', 'some description');
            things.add('test', 'some description');
            things.add('test', 'some description');
            things.add('test', 'some description');


        }
    }
});