define([

    'jquery',

    'lib/idGenerator',
    'lib/touch'

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
            var thinkElement = this._getThinkElement({
                id: idGenerator(),
                title: title,
                description: description
            });

            this.element
                .find('.thinks-list')
                .append(thinkElement);
        },
        _getThinkElement: function(templateParams) {
            var touchParams = {
                start: function() {},
                end: function() {},
                drop: function() {
                    this.basket.put(templateParams.id);
                }.bind(this),
                container: this.basket.element
            };

            var thinkElement = $(thinkTemplate(templateParams));
            thinkElement
                .touch(touchParams)
                .find('.add-to-basket')
                .click(function() {
                    this.basket.put(templateParams.id);
                }.bind(this));
            return thinkElement;
        }

    };

    return Things;

});