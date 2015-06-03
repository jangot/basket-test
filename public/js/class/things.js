define([

    'jquery',

    'lib/idGenerator',
    'jqueryUiTouchPunch'

], function($, idGenerator) {

    var template = _.template($('#template-thinks').html());
    var thinkTemplate = _.template($('#template-think').html());
    var draggableParams = {
        appendTo: 'body',
        helper: 'clone',
        addClasses: true,
        cursor: 'move',
        revert: true,
        revertDuration: 100,
        start: function(e, ui) {
            var element = $(ui.helper.context);
            var width = element
                .addClass('dragging')
                .width();
            ui.helper.width(width);
        },
        stop: function(e, ui) {
            $(ui.helper.context).removeClass('dragging');
        }
    };

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
            var thinkElement = $(thinkTemplate(templateParams));
            thinkElement
                .draggable(draggableParams)
                .find('.add-to-basket')
                .click(function() {
                    this.basket.put(templateParams.id);
                }.bind(this));
            return thinkElement;
        }

    };

    return Things;

});