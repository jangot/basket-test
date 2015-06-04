define([

    'jquery'

], function($) {

    var defaultParams = {
        start: function() {},
        end: function() {},
        drop: function() {},
        move: function() {},
        container: ''
    }

    $.fn.drugndrop = function(params) {
        var resultParams = {};
        _.assign(resultParams, defaultParams);
        _.assign(resultParams, params);

        this.each(function() {
            var state = {
                element: $(this)
            };

            state.element
                .on('touchstart', function(e) {
                    e = e.originalEvent;
                    if (state.disabled || e.touches.length !== 1){
                        return;
                    }
                    resultParams.start(e, state.element);

                    var offset = state.element.offset();
                    var scrollX =  window.scrollX;
                    var scrollY =  window.scrollY;
                    state.x = e.changedTouches[0].pageX - scrollX;
                    state.y = e.changedTouches[0].pageY - scrollY;
                    state.cloneElement = $(this).clone();

                    var css = {
                        left: state.x + 'px',
                        top: state.y + 'px',
                        marginLeft: '-' + (state.x - offset.left) + 'px',
                        marginTop: '-' + (state.y - offset.top) + 'px',
                        width: state.element.width() + 'px'
                    }
                    state.cloneElement
                        .appendTo('body')
                        .addClass('drag')
                        .css(css)
                    state.element.addClass('dragging');
                })
                .on('touchmove', function(e) {
                    e = e.originalEvent;
                    if (state.disabled || !state.cloneElement) {
                        return;
                    }

                    var scrollX =  window.scrollX;
                    var scrollY =  window.scrollY;
                    state.currentX = e.changedTouches[0].pageX;
                    state.currentY = e.changedTouches[0].pageY;

                    state.cloneElement
                        .css({
                            left: state.currentX - scrollX + 'px',
                            top: state.currentY - scrollY + 'px'
                        })
                    resultParams.move(e, state.element);
                    e.preventDefault();
                })
                .on('touchend touchcancel', function(e) {
                    e = e.originalEvent;
                    if (state.disabled || !state.cloneElement) {
                        return;
                    }
                    if (inContainer(state.currentX, state.currentY)) {
                        state.disabled = true;
                        state.element.removeClass('dragging');
                        state.cloneElement.remove();
                        state.cloneElement = null;
                        resultParams.drop(e, state.element);
                    } else {
                        state.cloneElement.animate({
                            left: state.x + 'px',
                            top: state.y + 'px'
                        }, {
                            complete: function() {
                                state.cloneElement.remove();
                                state.cloneElement = null;
                                state.element.removeClass('dragging');
                                resultParams.end(e, state.element);
                            }
                        });
                    }
                });

            function inContainer(x, y) {
                var area = getContainerArea();

                return (area.x[0] < x && x < area.x[1])
                    && (area.y[0] < y && y < area.y[1]);
            }

            function getContainerArea() {
                var element = $(resultParams.container);
                var offset = element.offset();
                var width = element.width();
                var height = element.height();

                var scrollX =  window.scrollX;
                var scrollY =  window.scrollY;

                return {
                    x: [offset.left - scrollX, offset.left + width - scrollX],
                    y: [offset.top - scrollY, offset.top + height - scrollY]
                }
            }
        });
        return this;
    };

});