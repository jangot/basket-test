define([

    'jquery',

    'class/things',
    'class/basket'

], function($, Things, Basket) {
    return {
        start: function() {
            var basket = new Basket();

            var things = new Things(basket);

            things.add('!test', 'some description');
            things.add('new test', 'some description');
            things.add('foo name', 'some description');
            things.add('root', 'some description');
            things.add('Glam', 'some description');
            things.add('For all people', 'some description');
            things.add('No non o', 'some description');
            things.add('I am yang', 'some description');
            things.add('I will be the best', 'some description');


        }
    }
});