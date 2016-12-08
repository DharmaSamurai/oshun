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
$("nav ul.menu a").on("click", function (e) {
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// SLIDER
// Optimization size of image in slider for little screens
if (w <= 720 && w > 520) {
    var path = 'img/slider/720/';
} else if (w <= 520) {
    var path = 'img/slider/520/';
} else {
    var path = 'img/slider/';
}

// Image optimization after first load
$('.slider .img_container img').attr('src', path + '1.jpg');

// If user click on radio
$('input[name=header]:radio').click(function(e) {
    var targetID = e.target.id;

    var zMainImg = $('#mainImg').css('z-index');
    var zMainImg2 = $('#mainImg2').css('z-index');

    // Which image is upper
    if (zMainImg > zMainImg2) {
        var imgLower = $('#mainImg2');
        var imgUpper = $('#mainImg');
        var srcImg = imgUpper.attr('src');
    }
    else {
        var imgLower = $('#mainImg');
        var imgUpper = $('#mainImg2');
        var srcImg = imgUpper.attr('src');
    }

    // Setting new source of image
    var i = parseInt(targetID.substr(-1, 1));
    var srcImg = path + i + '.jpg';
    imgLower.attr('src', srcImg);
    imgLower.fadeIn(1);
    imgLower.addClass('rel');

    imgUpper.fadeOut(1000, function() {
        imgLower.css('z-index', '2');
        imgUpper.css('z-index', '1');
    });

    imgUpper.removeClass('rel');

});

// Changing image in slider automatically after load website
var runSlider = setInterval(startChangeImg, 2500);

function startChangeImg() {
    changeImg(true);
}

// If user put mouse cursor in slider
$('.slider').mouseenter(function() {
    clearInterval(runSlider);
});

// If user put out mouse cursor from slider
$('.slider').mouseleave(function() {
    runSlider = setInterval(startChangeImg, 2500);
});

// Change image in slider
function changeImg(switcher) {
    var switcher = switcher;
    var zMainImg = $('#mainImg').css('z-index');
    var zMainImg2 = $('#mainImg2').css('z-index');

    // Which image is upper
    if (zMainImg > zMainImg2) {
        var imgLower = $('#mainImg2');
        var imgUpper = $('#mainImg');
        var srcImg = imgUpper.attr('src');
    }
    else {
        var imgLower = $('#mainImg');
        var imgUpper = $('#mainImg2');
        var srcImg = imgUpper.attr('src');
    }

    var i;

    //Getting number of image
    i = parseInt(srcImg.substr(-5, 1));

    //Previous or next image
    if (switcher) {
        if (i >= 3) {i = 1;}
        else {++i;}
    } else {
        if (i <= 1) {i = 3;}
        else {--i;}
    }

    // Setting new source of image
    srcImg = path + i + '.jpg';
    imgLower.attr('src', srcImg);
    imgLower.fadeIn(1);
    imgLower.addClass('rel');

    // Changing radio markers
    var radio = '#img_0' + i;
    $(radio).prop('checked', true);

    imgUpper.fadeOut(1000, function() {
        imgLower.css('z-index', '2');
        imgUpper.css('z-index', '1');
    });

    imgUpper.removeClass('rel');
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// PORTFOLIO
// VARIABLES
var cimgs = [45, 27, 12, 6]; // Count of images in sections: All, Animals, People, Misc
var sections = ['all', 'animals', 'people', 'misc']; // List of sections and folders

// ADAPTIVE
if (w > 620) { // If width of screen more than 620px
    var iop = 12; // Images on page
} else if (w <= 620 && w > 420) {
    var iop = 6; // Images on page
} else {
    var iop = 3; // Images on page
}

// Animating appearing images
function anim_img() {
    $('.img.mov').removeClass('inviz');
    $('.img.mov').addClass('show');
    $('.img.mov').addClass('zoomIn');
}

// Getting JSON data about images
function getJSON(sec) {
    var sec = sections[sec] || 'all';

    var data = $.ajax({
        url: "base.json",
        async: false
    });

    data = $.parseJSON(data.responseText);

    if (sec != 'all') {
        var this_list = [];
        $.each(data, function(key, val) {
            if (val.section == sec) {
                this_list.push(val);
            }
        });
        data = this_list;
    }
    return data;
}

// How much images on this page?
function max_imgs(sec, page) {
    var sec = sec;
    var page = page || 1;
    var imgs = cimgs[sec];
    var max;

    if (page > 1) {
        max = imgs - (iop * (page-1));
        if (max >= iop) {
            max = iop;
        }
    } else {
        if (imgs < iop) {
            max = imgs;
        } else {
            max = iop;
        }
    }
    return max;
}

// Adding images on any page of section
function add_imgs(sec, page) {
    var page = page || 1;
    var sec = sec;

    // Numbers of first image
    var lst = page * iop;
    var num = lst - (iop-1);
    --num;

    var data = getJSON(sec);
    var res = '';

    var section = parseInt($('#pf_menu li.active').attr('id').replace('sp', ''));
    var max = max_imgs(section, page);

    for (var i = 1; i <= max; i++) {
        res += '<li><div class="img animated mov inviz">';
        res += '<img src="img/pf/' + data[num].section + '/thmb/' + data[num].image + '" alt="" id="p' + i + '">'
        res += '<span class="img_ttl">' + data[num].name + '</span>';
        res += '<span class="img_cat">' + data[num].section + '</span></div></li>';
        ++num;
    }
    $('ul#pf_imgs').html(res);
    anim_img();
}

// PAGES
// Changing page of portfolio (within one section), pages of sections: All, Animals, People or Misc)
$('body').on('click', '#pf_pages li', function() {
    var page = parseInt($(this).html());

    // Changing active
    $('#pf_pages li').removeClass('active');
    $(this).addClass('active');

    // Getting know which section is active
    var sec = parseInt($('#pf_menu li.active').attr('id').replace('sp', ''));

    // Adding images
    add_imgs(sec, page);
});

// SECTIONS
// Changing section of portfolio: All, Animals, People or Misc
$('#pf_menu li').click(function() {
    // Changing active
    $('#pf_menu li').removeClass('active');
    $(this).addClass('active');

    // Getting know which section is active
    var sec = parseInt($(this).attr('id').replace('sp', ''));
    var imgs = cimgs[sec]; // How much images in this section

    // Adding images
    add_imgs(sec);

    // Adding new pagination for pages
    var pages = Math.ceil(imgs/iop);

    if (pages == 1) {
        $('ul#pf_pages').css('display', 'none');
    } else {
        $('ul#pf_pages').css('display', 'block');
        var nums = '';
        for (var y = 1; y <= pages; y++) {
            if (y == 1) {
                nums += '<li class="active">1</li>';
            } else {
                nums += '<li>' + y + '</li>';
            }
        }
        $('ul#pf_pages').html(nums);
    }
});


// MODAL WINDOW PORTFOLIO
// Position of pop upped image
function img_position() {
    var img_width = $('#mImg').width();
    var m_left = '-' + (img_width/2) + 'px';

    var img_height = $('#mImg').height();
    var m_top = '-' + (img_height/2) + 'px';

    $('#modal').css('margin-left', m_left);
    $('#modal').css('margin-top', m_top);
}

// Adjusting size of image
function img_size() {
    var w_wd = $(window).width();
    var w_ht = $(window).height();
    var i_wd = $('#mImg').width();
    var i_ht = $('#mImg').height();

    if (i_wd > w_wd) {
        var w = w_wd - 100 + 'px';
        $('#mImg').css('width', w);
        $('#mImg').css('height', 'auto');
    }

    if (i_ht > w_ht) {
        var h = w_ht - 100 + 'px';
        $('#mImg').css('height', h);
        $('#mImg').css('width', 'auto');
    }
}

// Pop upping image
function img_popup(img) {
    var img = img;

    $('.m_navs').css('display', 'block');
    $('#m_opacity').css('display', 'block');
    $('#m_opacity').fadeIn(400,
        function() {
            $('#modal')
                .css('display', 'block')
                .animate({
                    opacity: 1,
                    top: "50%"
                }, 200);
        });
    // MODAL SLIDER FUNCTIONALITY
    var img_src = $(img).attr('src').replace('/thmb', '');
    $('#mImg').attr('src', img_src);

    // Putting count of images in bottom of modal window
    var sec = parseInt($('ul.pf_menu li.active').attr('id').replace('sp', ''));
    var imgs = cimgs[sec];
    $('.m_all').html(imgs);

    // Which page is it?
    var page = parseInt($('#pf_pages li.active').html()) || 1;
    var prev_imgs = 0;
    if (page > 1) {
        var prev_imgs = (page-1) * iop;
    }

    var img_num = parseInt(img.replace('#p', ''));
    var num = img_num + prev_imgs - 1;

    // Getting data of image
    var data = getJSON(sec);
    var this_name = data[num].name;

    // Show image
    $('.m_name').html(this_name); // Changing name of image
    $('.m_th_page').html(num+1); // Changing number of image

    var img_src = $(img).attr('src').replace('/thmb', '');
    $('#mImg').attr('src', img_src); // Changing image

    $('#mImg').load(function() {
        img_size();
        img_position();
    });
}

// If clicked on span
$('body').on('click', 'ul.pf_imgs li span', function() {
    var img = '#' + $(this).parent().find('img').attr('id');
    img_popup(img);
});

// Open modal window
$('body').on('click', 'ul.pf_imgs li img', function(e) {
    e.preventDefault();
    var img = '#' + $(this).attr('id');
    img_popup(img);
});

// CLOSE MODAL WINDOW
close_modal_window = function(e) {
    e.preventDefault();
    $('#modal').animate({
        opacity: 0,
        top: '45%'
    }, 200,
    function() {
        $('#modal').css('display', 'none');
        $('#m_opacity').fadeOut(400);
        $('#m_opacity').css('display', 'none');
        $('.m_navs').css('display', 'none');
    });
}

$('#m_close').click(close_modal_window);
$('#m_opacity').click(close_modal_window);

// CHANGING IMAGES IN MODAL WINDOW
// Change image in pop up window (modal)
function img_change(next) {
    var next = next || 1;

    // Getting know which section is active
    var sec = parseInt($('#pf_menu li.active').attr('id').replace('sp', ''));

    // Getting data of image
    var data = getJSON(sec);
    var this_name = data[next-1].name;
    var this_section = data[next-1].section;
    var this_image = data[next-1].image;

    // Changing to next
    var img_src = 'img/pf/' + this_section + '/' + this_image;
    $('#mImg').attr('src', img_src); // Changing image
    $('.m_name').html(this_name); // Changing name of image
    $('.m_th_page').html(next); // Changing number of image
}

// Changing images in portfolio slider by click on arrows
$('.m_navs').click(function(e) {
    var this_img = parseInt($('.m_th_page').html()); // Number of this image
    var all_img = parseInt($('.m_all').html()); // Count of all images in modal window

    if ($(this).is('#m_prv')) {
        if (this_img == 1) {
            var next = all_img;

        } else {
            var next = this_img - 1;
        }
    } else {
        if (this_img < all_img) {
            var next = this_img + 1;

        } else {
            var next = 1;
        }
    }

    img_change(next);
});


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// NEWS
// Tabs
$('ul.tbs li').click(function(e) {
    var thID = '#' + $(this).attr('id');

    if (thID == '#') {
        thID = '#' + $(this).parent().attr('id');
    }

    if (thID != '#t10') {
        $('ul.tbs li').removeClass('active');
        $(thID).addClass('active');

        var tbID = '#tab' + thID.replace('#t', '');
        $('.tabs ul.tab_list li').removeClass('active');
        $(tbID).addClass('active');
    }
});

// Getting count of items in list of pages
var count_items = $('ul.tbs li:last-child').index() + 1;

// List up & down
$('.news .tbs-wrap .arr').click(function(e) {
    var this_btn = '#' + e.target.id;

    // Getting max value of marginTop
    var max_top = (count_items - 5) * 82;

    // Getting current value of marginTop
    var margin = parseInt($('ul.tbs').css('margin-top').replace('px', ''));

    // Deleting minus
    if (margin < 0) {
        margin = margin * -1;
    }

    // If clicked on down button
    if (this_btn == '#new_down' && max_top > margin) {
        margin += 82;
        $('ul.tbs').animate({
            marginTop: "-" + margin
        }, 500);
    }

    // If clicked on up button
    if (this_btn == '#new_up' && margin != 0) {
        margin -= 82;
        $('ul.tbs').animate({
            marginTop: "-" + margin
        }, 500);
    }
});

// ADAPTIVE NEWS
function next_tab(on, this_ID) {
    var on = on || 1;
    var this_ID = this_ID;

    // Number of next tab
    if (this_ID == 'tab_nxt') {
        var nxt = on + 1;
    } else {
        var nxt = on - 1;
    }

    // Changing active tab
    $('ul.tab_list li#tab' + on).removeClass('active');
    $('ul.tab_list li#tab' + nxt).addClass('active');
}

// If clicked on arrows "next" or "previous"
$('.tab_nav div').click(function() {
    var this_ID = $(this).attr('id'); // Next or Prev button was pressed?
    var cont_width = $('.tabs').width(); // Width of container
    var left = parseFloat($('ul.tab_list').css('margin-left').replace('px', '').replace('-', ''));
    var on = parseInt($('ul.tab_list li.active').attr('id').replace('tab', ''));
    var nxt_left = 'empty';

    // Getting know which button is pressed
    if (this_ID == 'tab_nxt' && on < 10) { // If pressed NEXT button
        nxt_left = on * cont_width;
    } else if (this_ID == 'tab_prv' && on > 1) { // If pressed PREVIOUS button
        nxt_left = left - cont_width;
        if (nxt_left < 0) {
            nxt_left = nxt_left * -1;
        }
    }

    // Animating tabs
    if (nxt_left != 'empty') {
        $('ul.tab_list').animate({
            marginLeft: "-" + nxt_left
        }, 500);
        next_tab(on, this_ID);
    }
});


});