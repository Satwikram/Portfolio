$(document).ready(function () {

    $('#cover').hide();

    var cursor = {
        delay: 8,
        _x: 0,
        _y: 0,
        endX: (window.innerWidth / 2),
        endY: (window.innerHeight / 2),
        cursorVisible: true,
        cursorEnlarged: false,
        $dot: document.querySelector('.cursor-dot'),
        $outline: document.querySelector('.cursor-dot-outline'),

        init: function () {
            this.dotSize = this.$dot.offsetWidth;
            this.outlineSize = this.$outline.offsetWidth;

            this.setupEventListeners();
            this.animateDotOutline();
        },

        setupEventListeners: function () {
            var self = this;

            // Anchor hovering
            document.querySelectorAll('a, li, #down, button').forEach(function (el) {
                el.addEventListener('mouseover', function () {
                    self.cursorEnlarged = true;
                    self.toggleCursorSize();
                });
                el.addEventListener('mouseout', function () {
                    self.cursorEnlarged = false;
                    self.toggleCursorSize();
                });
            });

            // Click events
            document.addEventListener('mousedown', function () {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            document.addEventListener('mouseup', function () {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });


            document.addEventListener('mousemove', function (e) {
                // Show the cursor
                self.cursorVisible = true;
                self.toggleCursorVisibility();

                // Position the dot
                self.endX = e.pageX;
                self.endY = e.pageY;
                self.$dot.style.top = self.endY + 'px';
                self.$dot.style.left = self.endX + 'px';
            });

            // Hide/show cursor
            document.addEventListener('mouseenter', function (e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.$dot.style.opacity = 1;
                self.$outline.style.opacity = 1;
            });

            document.addEventListener('mouseleave', function (e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.$dot.style.opacity = 0;
                self.$outline.style.opacity = 0;
            });
        },

        animateDotOutline: function () {
            var self = this;

            self._x += (self.endX - self._x) / self.delay;
            self._y += (self.endY - self._y) / self.delay;
            self.$outline.style.top = self._y + 'px';
            self.$outline.style.left = self._x + 'px';

            requestAnimationFrame(this.animateDotOutline.bind(self));
        },

        toggleCursorSize: function () {
            var self = this;

            if (self.cursorEnlarged) {
                self.$dot.style.transform = 'translate(-50%, -50%) scale(0)';
                self.$outline.style.transform = 'translate(-50%, -50%) scale(1.6)';
            } else {
                self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
                self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        },

        toggleCursorVisibility: function () {
            var self = this;

            if (self.cursorVisible) {
                self.$dot.style.opacity = 1;
                self.$outline.style.opacity = 1;
            } else {
                self.$dot.style.opacity = 0;
                self.$outline.style.opacity = 0;
            }
        }
    }

    cursor.init();

    var titlecolor = ['#121212', '#141414', '#161616', '#181818', '#161616'];

    $('#pagepiling').pagepiling({
        css3: false,
        scrollingSpeed: 700,
        easing: 'swing',
        touchSensitivity: 20,
        navigation: {
            'textColor': '#242478',
            'bulletsColor': '#888',
            'position': 'right',
            'tooltips': ['', 'About', 'Portfolio', 'Contact']
        },
        normalScrollElements: '.top-logo, .nav-items',
        sectionsColor: ['#121212', '#141414', '#161616', '#181818', '#161616'],
        onLeave: function (index, nextIndex, direction) {
            $('#title').attr('content', titlecolor[nextIndex - 1]);
            if (direction == "down") {
                $(".fade_" + nextIndex).hide();
                setTimeout(function () {
                    $(".fade_" + nextIndex).fadeIn(300);
                }, 600);
            }
        },
    });

    $.fn.pagepiling.setAllowScrolling(false);

    $("#down").click(function () {
        $.fn.pagepiling.moveSectionDown();
    });

    $("#link-about").click(function () {
        $.fn.pagepiling.moveTo(2);
    });

    $("#link-portfolio").click(function () {
        $.fn.pagepiling.moveTo(3);
    });

    $("#link-contact").click(function () {
        $.fn.pagepiling.moveTo(4);
    });


    setTimeout(function () {

        $(".logo").css({
            "width": "auto",
            "height": "auto"
        });

        var i = 0;
        var i = 0;
        var txt = ' - Satwik Ram Kodandaram,';

        function typeWriter() {

            var speed = Math.floor(Math.random() * 100) + 50;
            if (i < txt.length) {
                $("#name").append(txt.charAt(i));
                i++;
                setTimeout(typeWriter, speed);
            } else {
                setTimeout(function () {
                    $(".hide").css("display", "inline-block").hide().fadeIn(700);
                    $("#pos").css({
                        "position": "relative",
                        "top": "0px",
                        "left": "0px",
                        "transform": "translate(0,0)"
                    });
                    if ($(window).width() >= 425) {
                        $(".logo").css("transform", "translateX(50%)");
                        setTimeout(function () {
                            $(".logo").css("transition", "all 1s");
                            $(".logo").css("transform", "translateX(0%)");
                        }, 20);
                    } else {
                        $(".logo").css("transform", "translateY(-50%)");
                        setTimeout(function () {
                            $(".logo").css("transition", "all 1s");
                            $(".logo").css("transform", "translateY(-5%)");
                        }, 20);
                    }
                    $('.fade_2').css("display", "block");
                    $('.fade_3').css("display", "block");
                    $('.fade_4').css("display", "block");
                    $('footer').css("display", "block");
                    $("#a_dot").fadeOut().removeClass("dot");
                    $("#a_dot_n").removeClass("dot_n");
                    $.fn.pagepiling.setAllowScrolling(true);
                }, 400);
            }
        }

        typeWriter();

    }, 5000);
});