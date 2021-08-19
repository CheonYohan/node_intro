import { Star } from "./star.js";
class GalaxyBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.hue = 217;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        //window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;
        this.createStars();
    }

    createStars() {
        this.maxStars = 1500;
        this.stars = [];
        for (let i = 0; i < this.maxStars; i++) {
            const star = new Star(
                this.stageWidth,
                this.stageHeight,
                this.maxStars
            );
            this.stars[i] = star;
        }
    }

    animate() {
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.globalAlpha = 0.8;
        this.ctx.fillStyle = 'hsla(' + this.hue + ', 64%, 6%, 1)';
        this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
        this.ctx.globalCompositeOperation = 'lighter';
        window.requestAnimationFrame(this.animate.bind(this));
        this.stars.forEach(star => {
            star.animate(this.ctx);
        });
    }
}
window.onload = () => {
    new GalaxyBackground();
}