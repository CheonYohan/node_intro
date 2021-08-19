export class Star {
    constructor(width, height, maxStars) {
        this.orbitRadius = this.random(this.maxOrbit(width, height)); // 궤도반지름
        this.radius = this.random(60, this.orbitRadius) / 12; // 궤도별 반지름
        this.orbitX = width / 2; // 화면의 반
        this.orbitY = height / 2;
        this.timePassed = this.random(0, maxStars); // 통과시간
        this.speed = this.random(this.orbitRadius) / 900000; // 궤도 이동시간
        this.alpha = this.random(2, 10) / 10;// 투명도
        this.canvas2 = document.createElement('canvas'); // 별 렌더용 캔버스
        this.ctx2 = this.canvas2.getContext('2d');
        this.canvas2.width = 100;
        this.canvas2.height = 100;
        this.hue = 150;
        this.half = this.canvas2.width / 2;
        this.gradient2 = this.ctx2.createRadialGradient(this.half, this.half, 0, this.half, this.half, this.half);
        this.gradient2.addColorStop(0.025, '#fff');
        this.gradient2.addColorStop(0.1, `hsl(${this.hue}, 61%, 33%)`);
        this.gradient2.addColorStop(0.25, `hsl(${this.hue}, 64%, 6%)`);
        this.gradient2.addColorStop(1, 'transparent');
        this.ctx2.fillStyle = this.gradient2;
        this.ctx2.beginPath();
        this.ctx2.arc(this.half, this.half, this.half, 0, Math.PI * 2);
        this.ctx2.fill();
    }

    random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }
        if (min > max) {
            var hold = max;
            max = min;
            min = hold;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    maxOrbit(x, y) {
        var max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
    }

    animate(ctx) {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = this.random(10);
        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    }
}
