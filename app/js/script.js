(function ($) {
    var methods = {
        init: function () {
            return this.each(function () {
                $(window).bind('resize.Mosaic', methods.reposition);

                var $this = $(this);
                $this.append('<div class="mosaic-container"><input type="number" name="quantity" min="1" max="200" placeholder="N" class="img_n"><input type="text" placeholder="URL" class="img_url"><button class="create">Create</button><br><hr><div class="zoom_block"><button class="add_zoom">+</button><input type="text" class="zoon_now" value="100%"><button class="remove_zoom">-</button></div><div class="block_rezult"></div></div>');

                var Mosaic = {};

                Mosaic.create = function (elem, n, url) {
                    var $this_in = elem;
                    var n_now = parseInt($this_in.find('.img_n').val());
                    if (n_now < 1 || n_now > 200 || !n_now) {
                        alert('N will be in [1,,200]');
                        return
                    }

                    if (!/(http|https)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?(\w+.(JPG|JPEG|PNG|GIF|jpg|jpeg|png|gif))$/.test($this_in.find('.img_url').val())) {
                        alert('url image no corect!!!');
                        return
                    }
                    $this_in.find('.block_rezult').html('');
                    $this_in.find('.block_rezult').append('<table class="Mosaic-body"><table>');
                    for (var i = 0; i < n; i++) {
                        $this_in.find('.Mosaic-body').append("<tr class='row-" + i + "'></tr>");
                        for (var j = 0; j < n; j++) {
                            $this_in.find('.Mosaic-body').find("tr.row-" + i).append('<td><img src="' + url + '" alt="" ></td>')
                        }
                    }
                    $this_in.find('.Mosaic-body').on('mouseover', 'td', function () {
                        $(this).animate({
                            opacity: 0
                        }, 0);
                    });
                    $this_in.find('.Mosaic-body td').mouseout(function () {
                        $(this).animate({
                            opacity: 1
                        }, 1000);
                    });
                }

                Mosaic.zoom = function (el, zoom) {
                    $(el).find('.Mosaic-body').css('transform', 'scale(' + zoom + ')');

                }

                $this.find('.create').click(function () {
                    var container = $(this).parents('.mosaic-container');
                    var count = $(container).find('.img_n').val();
                    var img_url = $(container).find('.img_url').val();
                    Mosaic.create(container, count, img_url);
                });

                $this.find('.add_zoom').click(function () {
                    var container = $(this).parents('.mosaic-container');

                    var zoom_now = parseInt($(container).find('.zoon_now').val());
                    var zoom_up = Math.round(zoom_now * 1.25);
                    if (zoom_up > 1000) {
                        zoom_up = 1000;
                    }
                    Mosaic.zoom(container, zoom_up / 100);
                    $(container).find('.zoon_now').val(zoom_up + "%");
                });

                $this.find('.remove_zoom').click(function () {
                    var container = $(this).parents('.mosaic-container');
                    var zoom_now = parseInt($(container).find('.zoon_now').val());
                    var zoom_up = Math.round(zoom_now * 0.8);
                    if (zoom_up <= 10) {
                        var zoom_up = 10;
                    }
                    Mosaic.zoom(container, zoom_up / 100);
                    $(container).find('.zoon_now').val(zoom_up + "%");
                });
            });
        },
        destroy: function () {

            return this.each(function () {
                $(window).unbind('.Mosaic');
                var $this = $(this);
                $this.html('');
            })

        }
    }
    $.fn.Mosaic = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.tooltip');
        }

    };
})(jQuery);