import { Background } from "./background.js";
import { Character } from "./character.js";

class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = (window.devicePixelRatio > 1) ? 1 : 1;
        window.addEventListener('resize', this.resize.bind(this), false);
        window.requestAnimationFrame(this.animate.bind(this));
        this.resize();
        this.background = new Background(this.ctx);
        this.character = new Character(this.ctx);

        window.addEventListener('keydown',e=>{
            const keyCode = e.keyCode;
            console.log(e.keyCode);
            switch (keyCode) {
                case 37:
                this.character.left();
                    break;
                case 39:
                this.character.right();
                    break;
            
                default:
                    break;
            }
        });

        this.resize();
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight);
        this.background.animate(this.stageWidth,this.stageHeight);
        this.character.animate(this,this.background);
   }
}

window.onload = () =>{
    new App();
}