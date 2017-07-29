"use strict";

class LoadingAnimation {
    constructor(element, options = null) {
        ////////////////////////////////////
        // Check jQuery
        if (typeof $ !== "function") {
            console.error("[LoadingAnimation] Error: jQuery is required.");
            return;
        }

        ////////////////////////////////////
        // Identyficate and check element 
        this.element = $(element);
        if (this.element.length < 1) {
            console.error("[LoadingAnimation] Error: No elements to add loading animation to.");
            return;
        }
        if (this.element.length > 1) {
            console.error("[LoadingAnimation] Error: Too much elements (" + this.elements.length + ") to add loading animation to.");
            return;
        }

        ////////////////////////////////////
        // Default values of LoadingAnimation
        this.size = 50;
        this.mode = "prepend";

        ////////////////////////////////////
        // Variables, do not change this by hand. As long as you dont want to chane the animation
        this.is_initialized = false;
        this.handle = null;
        this.ctx = null;

        this.STAGES = {
            FIRST_SQUARE: 0,
            SECOND_SQUARE: 1,
            THIRD_SQUARE: 2
        }
        this.timer = {
            counter: 0,
            stage: this.STAGES.FIRST_SQUARE
        };
        this.SQUARES = [
            [
                [-0.48, 0.0],
                [0.0, 0.48],
                [0.48, 0.0],
                [0.0, -0.48]
            ],
            [
                [-0.248, 0.248],
                [0.248, 0.248],
                [0.248, -0.248],
                [-0.248, -0.248]
            ],
            [
                [-0.25, 0.0],
                [0.0, 0.25],
                [0.25, 0.0],
                [0.0, -0.25]
            ],
        ];
    }


    init() {
        if (typeof LoadingAnimation.counter === "undefined") {
            LoadingAnimation.counter = 0;
        } else
            LoadingAnimation.counter++;

        this.handle = "<canvas class='LoadingAnimation' id='LoadingAnimation_" + LoadingAnimation.counter + "' width='50' height='50'></canvas>";
        this.handle = $(this.handle);
        this.ctx = this.handle[0].getContext("2d");

        if (this.mode === "prepend") {
            this.element.prepend(this.handle);
        } else {
            this.element.append(this.handle);
        }

        this.resize();
        $(window).resize(() => this.resize());

        this.is_initialized = true;
    }


    resize() {
        var w = this.element.width();
        var h = this.element.height();
        var smalest = (w < h) ? w : h;
        if (smalest < this.size) {
            this.size = smalest;
            this.handle.attr("width", smalest + "px");
            this.handle.attr("height", smalest + "px");
            this.ctx.transform(1, 0, 0, 1, this.size / 2, this.size / 2);
        }
    }


    start() {
        if (this.play_animation === true) {
            return;
        }

        this.timer.counter = 0;
        this.timer.stage = this.STAGES.FIRST_SQUARE;

        this.play_animation = true;
        this.handle.css("display", "block");

        this.ctx.save();
        this.ctx.transform(1, 0, 0, 1, this.size / 2, this.size / 2);

        this.loop();
    }


    loop() {
        if (this.play_animation !== true) {
            return;
        }

        this.timer.counter += 3;

        this.ctx.save();
        this.ctx.clearRect(-this.size, -this.size, 2 * this.size, 2 * this.size);

        this.ctx.beginPath();

        var draw_square = (which) => {
            this.ctx.moveTo(this.SQUARES[which][0][0] * this.size, this.SQUARES[which][0][1] * this.size);
            for (var i = 1; i < this.SQUARES[0].length; i++) {
                this.ctx.lineTo(this.SQUARES[which][i][0] * this.size, this.SQUARES[which][i][1] * this.size);
            }
            this.ctx.lineTo(this.SQUARES[which][0][0] * this.size, this.SQUARES[which][0][1] * this.size);
            this.ctx.stroke();
        }

        this.ctx.rotate(27 * Math.PI / 180);

        switch (this.timer.stage) {
            case this.STAGES.FIRST_SQUARE:

                // 1.
                this.ctx.strokeStyle = "rgba(0,0,0,0.15)";
                this.ctx.lineWidth = 3;
                draw_square(0);
                this.ctx.strokeStyle = "rgba(0,0,0,0.8)";
                this.ctx.lineWidth = 1;
                draw_square(0);


                // 2.
                this.ctx.rotate(this.timer.counter * Math.PI / 180);
                this.ctx.strokeStyle = "rgba(0,0,0,0.15)";
                this.ctx.lineWidth = 3;
                draw_square(1);
                this.ctx.strokeStyle = "rgba(0,0,0,0.8)";
                this.ctx.lineWidth = 1;
                draw_square(1);


                if (this.timer.counter > 88) {
                    this.timer.counter = 2;
                    this.timer.stage = this.STAGES.SECOND_SQUARE;
                }
                break;



            case this.STAGES.SECOND_SQUARE:

                // 1.
                this.ctx.rotate(-this.timer.counter * Math.PI / 180);
                this.ctx.strokeStyle = "rgba(0,0,0,0.15)";
                this.ctx.lineWidth = 3;
                draw_square(0);
                this.ctx.strokeStyle = "rgba(0,0,0,0.8)";
                this.ctx.lineWidth = 1;
                draw_square(0);

                // 2.
                this.ctx.rotate(this.timer.counter * Math.PI / 180);
                this.ctx.strokeStyle = "rgba(0,0,0,0.15)";
                this.ctx.lineWidth = 3;
                draw_square(1);
                this.ctx.strokeStyle = "rgba(0,0,0,0.8)";
                this.ctx.lineWidth = 1;
                draw_square(1);


                if (this.timer.counter > 88) {
                    this.timer.counter = 2;
                    this.timer.stage = this.STAGES.FIRST_SQUARE;
                }
                break;


                /*
                case this.STAGES.THIRD_SQUARE:

                    // 1.
                    this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
                    this.ctx.lineWidth = 3;
                    draw_square(0);
                    this.ctx.strokeStyle = "rgba(0,0,0,0.8)";
                    this.ctx.lineWidth = 1;
                    draw_square(0);


                    // 2.
                    this.ctx.rotate(this.timer.counter * Math.PI / 180);
                    this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
                    this.ctx.lineWidth = 3;
                    draw_square(1);
                    this.ctx.strokeStyle = "rgba(0,0,0,0.8)";
                    this.ctx.lineWidth = 1;
                    draw_square(1);

                    // 3.
                    this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
                    this.ctx.lineWidth = 3;
                    draw_square(2);
                    this.ctx.strokeStyle = "rgba(0,0,0,0.8)";
                    this.ctx.lineWidth = 1;
                    draw_square(2);


                    if (this.timer.counter > 88) {
                        this.timer.counter = 2;
                        this.timer.stage = this.STAGES.FIRST_SQUARE;
                    }
                    break;
                    */
        }

        this.ctx.restore();

        setTimeout(() => this.loop(), 15);
    }


    stop() {
        this.ctx.restore();
        this.play_animation = false;
        this.handle.css("display", "none");
    }


    remove() {
        this.is_initialized = false;
        $(window).off("resize", this.resize);
        this.handle.remove();
    }

}