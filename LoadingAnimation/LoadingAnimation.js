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
        this.elements = $(element);
        if (this.elements.length < 1) {
            console.error("[LoadingAnimation] Error: No elements to add loading animation to.");
            return;
        }
        if (this.elements.length > 1) {
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
            SECOND_SQUARE: 1
        }
        this.timer = {
            counter: 0,
            stage: this.STAGES.FIRST_SQUARE
        };
        this.SQUARES = [
            [
                [-0.5, 0.0],
                [0.0, 0.5],
                [0.5, 0.0],
                [0.0, -0.5]
            ],
            [
                [-0.25, 0.25],
                [0.25, 0.25],
                [0.25, -0.25],
                [-0.25, -0.25]
            ]
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
            this.elements.prepend(this.handle);
        } else {
            this.elements.append(this.handle);
        }

        this.resize();
        $(window).resize(this.resize);

        this.is_initialized = true;
    }


    resize() {
        // Dunno what here
        //console.log("a");
    }


    start() {
        this.timer.counter = 0;
        this.timer.stage = this.STAGES.FIRST_SQUARE;

        this.play_animation = true;
        this.handle.css("display", "block");

        this.ctx.save();
        this.ctx.transform(1, 0, 0, 1, this.size / 2, this.size / 2);
        this.ctx.fillStyle = "black";
        this.ctx.lineWidth = 1;

        this.loop();
    }


    loop() {
        if (this.play_animation !== true) {
            return;
        }

        this.timer.counter++;

        this.ctx.save();
        this.ctx.clearRect(-this.size, -this.size, 2 * this.size, 2 * this.size);

        this.ctx.beginPath();

        switch (this.timer.stage) {
            case this.STAGES.FIRST_SQUARE:

                this.ctx.moveTo(this.SQUARES[0][0][0] * this.size, this.SQUARES[0][0][1] * this.size);
                for (var i = 1; i < this.SQUARES[0].length; i++) {
                    this.ctx.lineTo(this.SQUARES[0][i][0] * this.size, this.SQUARES[0][i][1] * this.size);
                }
                this.ctx.lineTo(this.SQUARES[0][0][0] * this.size, this.SQUARES[0][0][1] * this.size);

                this.ctx.rotate(this.timer.counter * Math.PI / 180);
                this.ctx.moveTo(this.SQUARES[1][0][0] * this.size, this.SQUARES[1][0][1] * this.size);
                for (var i = 1; i < this.SQUARES[1].length; i++) {
                    this.ctx.lineTo(this.SQUARES[1][i][0] * this.size, this.SQUARES[1][i][1] * this.size);
                }
                this.ctx.lineTo(this.SQUARES[1][0][0] * this.size, this.SQUARES[1][0][1] * this.size);

                if (this.timer.counter > 88) {
                    this.timer.counter = 2;
                    this.timer.stage = this.STAGES.SECOND_SQUARE;
                }
                break;



            case this.STAGES.SECOND_SQUARE:

                this.ctx.rotate(-this.timer.counter * Math.PI / 180);
                this.ctx.moveTo(this.SQUARES[0][0][0] * this.size, this.SQUARES[0][0][1] * this.size);
                for (var i = 1; i < this.SQUARES[0].length; i++) {
                    this.ctx.lineTo(this.SQUARES[0][i][0] * this.size, this.SQUARES[0][i][1] * this.size);
                }
                this.ctx.lineTo(this.SQUARES[0][0][0] * this.size, this.SQUARES[0][0][1] * this.size);

                this.ctx.rotate(-this.timer.counter * Math.PI / 180);
                this.ctx.moveTo(this.SQUARES[1][0][0] * this.size, this.SQUARES[1][0][1] * this.size);
                for (var i = 1; i < this.SQUARES[1].length; i++) {
                    this.ctx.lineTo(this.SQUARES[1][i][0] * this.size, this.SQUARES[1][i][1] * this.size);
                }
                this.ctx.lineTo(this.SQUARES[1][0][0] * this.size, this.SQUARES[1][0][1] * this.size);

                if (this.timer.counter > 88) {
                    this.timer.counter = 2;
                    this.timer.stage = this.STAGES.FIRST_SQUARE;
                }
                break;
        }

        this.ctx.stroke();

        this.ctx.restore();

        setTimeout(() => this.loop(), 10);
    }


    stop() {
        this.ctx.restore();
        this.play_animation = false;
        this.handle.css("display", "none");
    }


    remove() {
        this.is_initialized = false;
        $(window).off("resize", this.resize);
    }

}