define([

    'jquery'

], function($) {

    var template = _.template($('#template-basket').html());

    function Basket() {
        this.element = $(template());

        $('.basket-container').append(this.element);

        this.element.droppable({
            drop: function(e, ui) {
                $(ui.helper.context).draggable('option','revert', false);
                this.element
                    .find('.thinks-list')
                    .append(ui.helper.context);
            }.bind(this)
        });
    }

    Basket.prototype = {
        put: function(id) {
            var element = $('#' + id);

            this.element.find('.thinks-list').append(element);
        }
    }

    return Basket;
});