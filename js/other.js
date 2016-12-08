$(document).ready(function() {
// VARIABLES
var w = $(window).width();

// ANIMATION
function anim_load() {
    $('.mov').each(function() {
        var imagePos = $(this).offset().top;
        var window_h = $(window).height()/1.3;
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + window_h) {
            $(this).removeClass('inviz');
            $(this).addClass('show');
            $(this).addClass('zoomIn');
        }
    });

    $('.mov2').each(function() {
        var imagePos = $(this).offset().top;
        var window_h = $(window).height()/1.3;
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + window_h) {
            $(this).removeClass('inviz');
            $(this).addClass('show');
            $(this).addClass('bounceIn');
        }
    });

    $('.mov3').each(function() {
        $(this).removeClass('inviz');
        $(this).addClass('show');
        $(this).addClass('bounceIn');
    });
}

// Animating disappearing reply on comment form
function anim_unload(ID) {
    var ID = ID + '.mov3';

    $(ID).each(function() {
        $(ID).removeClass('bounceIn');
        $(ID).addClass('bounceOut');

        setTimeout(function() {
            $(ID).remove();
        }, 800);
    });
}

// Animating disappearing add comment form
function anim_unload2(ID) {
    var ID = ID + '.mov3';

    $(ID).each(function() {
        $(ID).removeClass('bounceIn');
        $(ID).addClass('bounceOut');

        setTimeout(function() {
            $(ID).css('display', 'none');
            $(ID).removeClass('bounceOut');
        }, 800);
    });
}

// MAIN MENU
var header_h = $('header').height();

// Scrolling function behavior
function scrl() {
    var blocks = $('.blks');
    blocks.each(function(i, el) {
        var top  = $(el).offset().top - 120;
        var bottom = top + $(el).height();
        var scroll = $(window).scrollTop();
        var id = $(el).attr('id');

        var window_h = $(window).height();
        var doc_h = $(document).height();

        if(scroll + window_h  >= doc_h) {
            $('nav ul.menu li a.active').removeClass('active');
            $('nav ul.menu li a[href="#contact"]').addClass('active');
        } else {
            if( scroll > top && scroll < bottom){
                $('nav ul.menu li a.active').removeClass('active');
                $('nav ul.menu li a[href="#' + id + '"]').addClass('active');
            }
        }
    });

    if ((header_h/2) < $(window).scrollTop() && w > 620) {
        $('nav').addClass('dark');
    } else {
        $('nav').removeClass('dark');
    }
}

scrl();
anim_load();

// Menu scrolling
$(window).scroll(function(){
    scrl();
    anim_load();
 });

 // Menu clicking
$("a.anchor").on("click", function (e) {
    e.preventDefault();
    var ths  = $(this).attr('href');
    var top = $(ths).offset().top - 40;
    $('body, html').animate({scrollTop: top}, 600);
});

// ADAPTIVE
// Button of main menu
var opnd = 0;
$('#menu_btn').click(function() {
    if (opnd) {
        $('.menu_btn').css('background-image', 'url(img/main_menu.png)');
        opnd = 0;
        $('nav').animate({
            marginLeft: '-150px'
        }, 300);
    } else {
        $('.menu_btn').css('background-image', 'url(img/main_menu_close.png)');
        opnd = 1;
        $('nav').animate({
            marginLeft: "0"
        }, 300);
    }
});

// NEW PAGE ONLY
// Reply Form Appearing
$('.reply').click(function(e) {
    var this_ID = '#' + $(this).attr('id');
    var num = this_ID.replace('#r', '');

    if (!($(this).hasClass('not_active'))) {
        // Making clicked button not active
        $(this_ID).addClass('not_active');

        $('#com_' + num + ' > .block_wrap').after('<div class="add_reply to_com mov3 inviz animated" id="add_reply">' +
            '<form action="" method="POST">' +
                '<div>' +
                    '<input type="text" placeholder="Your Name">' +
                    '<input type="email" placeholder="Your Email">' +
                    '<div class="rating">' +
                        '<div class="img">' +
                            '<div class="img">' +
                                '<div class="img">' +
                                    '<div class="img">' +
                                        '<div class="img"></div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<textarea name="" id="" cols="30" rows="10" placeholder="Your Reply"></textarea>' +
                '<input type="submit" value="Submit" class="red_link">' +
                '<div class="cancel_rep" id="cncl' + num + '">Cancel Reply</div>' +
            '</form>' +
        '</div>');

        anim_load();
    }
});

// Reply Form Disappearing
$('body').on('click', '.cancel_rep', function() {
    var this_ID = $(this).attr('id');
    var num = this_ID.replace('cncl', '');
    var button_ID = '#r' + num;

    // Making 'reply' button active again
    $(button_ID).removeClass('not_active');

    // Animating disappearing
    anim_unload('#add_reply');
});

// Add Comment Form Appearing
$('#add_com_btn').click(function() {
    if ($(this).hasClass('cancel')) {
        $(this).removeClass('cancel');
        $(this).html('Add Comment');
        anim_unload2('#add_com');
    } else {
        $(this).addClass('cancel');
        $('#add_com').css('display', 'block');
        $(this).html('Cancel Comment');
        anim_load();
    }

});


});