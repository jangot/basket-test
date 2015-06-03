define([

    'jquery',

    'lib/idGenerator',
    'jqueryUiTouchPunch'

], function($, idGenerator) {

    var template = _.template($('#template-thinks').html());
    var thinkTemplate = _.template($('#template-think').html());


    function Things(basket) {
        this.element = $(template());
        this.basket = basket;

        $('.list-container').append(this.element);
    }

    Things.prototype = {
        add: function(title, description) {
            var id = idGenerator();


            var thinkElement = $(thinkTemplate({
                id: id,
                title: title,
                description: description
            }));

            this.element
                .find('.thinks-list')
                .append(thinkElement);

            thinkElement
                .find('.add-to-basket')
                .click(function() {
                    this.basket.put(id);
                }.bind(this));

            thinkElement.draggable({
                appendTo: 'body',
                helper: 'clone'
            });
        }

    };

    return Things;

});