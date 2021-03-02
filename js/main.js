$(document).ready(function(){
    const burgerBtn = $('.js-burger');
    const listMenu = $('.js-nav-list');
    const navLink = $('.nav-list__link');
    const requestCallBtn = $('.btn--pink');
    const applicationBtn = $('.btn--orange');
    const popUpWindow = $('.popup');
    const requestCallForm = $('.js-call');
    const applicationForm = $('.js-application');
    const closeForm = $('.js-close-form');
    const soccessWindow = $('.success');
    const inputForms = $('.area-form');

    $('body').removeClass('no-js');

    // Mobil menu
    burgerBtn.on('click', openMobilMenu);
    navLink.on('click', closeMenu);

    function openMobilMenu(e) {
        e.preventDefault();

        let expanded = burgerBtn.attr('aria-expanded'),
            label = burgerBtn.attr('aria-label');

            burgerBtn.toggleClass('active-burger');
            listMenu.toggleClass('active-menu');

            if (listMenu.hasClass('active-menu')) {
                expanded = true;
                label = 'Меню развернуто';
                burgerBtn.attr('aria-expanded', expanded);
                burgerBtn.attr('aria-label', label);
            } else {
                expanded = false;
                label = 'Меню свернуто';
                burgerBtn.attr('aria-expanded', expanded);
                burgerBtn.attr('aria-label', label);
            }
    }

    function closeMenu() {
        listMenu.removeClass('active-menu');
    }

    // Request Call
    requestCallBtn.on('click', openRequestPopup);

    function openRequestPopup(e) {
        e.preventDefault();

        if (requestCallForm.is(':hidden')) {
            popUpWindow.addClass('popup-active');
            requestCallForm.show();
        }
    }

    // Application
    applicationBtn.on('click', openApplicationPopup);

    function openApplicationPopup(e) {
        e.preventDefault();

        if (applicationForm.is(':hidden')) {
            popUpWindow.addClass('popup-active');
            applicationForm.show();
        }
    }

    // Popup close on click 'close' btn
    closeForm.on('click', function(){
        popUpWindow.removeClass('popup-active');
        if (requestCallForm.css('display') == 'block') {
            setTimeout(function() {
                requestCallForm.hide()
            }, 500);
            inputForms.removeClass('error');
        }
        if (applicationForm.css('display') == 'block') {
            setTimeout(function() {
                applicationForm.hide();
            }, 500);
            inputForms.removeClass('error');
        }
        if (soccessWindow.css('display') == 'block') {
            setTimeout(function() {
                soccessWindow.hide();
            }, 500);
        }
    });

    // Popup close on click bg
    popUpWindow.on('click', function(){
        if(event.target == this) {
            $(this).removeClass('popup-active');
            if (requestCallForm.css('display') == 'block') {
                setTimeout(function() {
                    requestCallForm.hide();
                }, 500);
                inputForms.removeClass('error');
            }
            if (applicationForm.css('display') == 'block') {
                setTimeout(function() {
                    applicationForm.hide();
                }, 500);
                inputForms.removeClass('error');
            }
            if (soccessWindow.css('display') == 'block') {
                setTimeout(function() {
                    soccessWindow.hide();
                }, 500);
            }
        }
    });

    // Input Mask (plugin)
    $('input[type="tel"]').inputmask({"mask": "+7 (999) 999-99-99"});    

    // Validation form (plugin)
    $('form').each(function(){
        $(this).validate({
            errorPlacement(error, element) {
                return true;
            },
            focusInvalid: false,
            rules: {
                name: {
                    required: true
                },
                phone: {
                    required: true
                }
            },
            submitHandler(form) {
                let th = $(form);

                $.ajax({
                    type: 'POST',
                    url: 'php/form.php',
                    data: th.serialize()
                }).done(() => {
                    $('input').val('');
                    $('form').hide();
                    $('.success').show();
                });

                return false;
            }
        })
    });

    // Slider Swiper
    const mySwiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.slider-arrows__button--right',
            prevEl: '.slider-arrows__button--left',
          },
        slidesPerView: 3,
        breakpoints: {
            280: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1170: {
                slidesPerView: 3,
            },
        },
        spaceBetween: 30,

        pagination: {
            el: '.slider-dots',
            type: 'bullets',
            clickable: true,
            bulletClass: 'slider-dots__btn',
          },
      });      
});