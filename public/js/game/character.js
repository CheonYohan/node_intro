export class Character{
    constructor(ctx){
        this.ctx = ctx;
        this.characterImg = new Image();
        this.characterImg.addEventListener('load',()=>{
            this.statcWidth = 900/8;
            this.staticHeight = 430/3;
        });

        // 118*417
        // 8*3
        this.characterImg.src = `http://122.44.104.172:7942/images/character_sprite.png`;
        this.width = 100;
        this.height = 100;
        this.x=0;
        this.y=0;
        this.speed = 10;
    }
    animate(canvas,background){
        this.backgroundWidth = canvas.stageWidth;

        this.ctx.clearRect(0,0, this.x, this.y);
        this.ctx.drawImage(this.characterImg,100,0,this.statcWidth,this.staticHeight,this.x,(canvas.stageHeight*(background.height/background.width)/2)+ canvas.stageHeight*(background.height/background.width) - this.height +this.y,this.width,this.height);
    }

    left(){
        if(this.x - this.width < 0){
            
        }
        else{
            this.x -= this.speed;
        }
    }
    right(){
        console.log(this.backgroundWidth);
        if(this.x + this.width > this.backgroundWidth){
            
        }
        else{
            this.x += this.speed;
        }
    }
}