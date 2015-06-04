define([

    'jquery'

], function($) {

    var template = _.template($('#template-basket').html());

    function Basket() {
        this.element = $(template());
        $('.basket-container').append(this.element);
    }

    Basket.prototype = {
        put: function(id) {
            var element = $('#' + id);

            this.element.find('.thinks-list').append(element);
        }
    }

    return Basket;
});