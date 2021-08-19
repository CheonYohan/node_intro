export class Background{
    constructor(ctx){
        this.ctx = ctx;
        this.backgroundImg = new Image();
        this.backgroundImg.addEventListener('load',()=>{
            this.width = this.backgroundImg.width;
            this.height = this.backgroundImg.height;
        });
        this.backgroundImg.src = `http://122.44.104.172:7942/images/js_game_background.jpeg`;
        this.width = 0;
        this.height = 0;
    }
    animate(stageWidth,stageHeight){
        
        this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight);
        this.ctx.drawImage(this.backgroundImg,0,stageHeight*(this.height/this.width)/2,stageWidth,stageHeight*(this.height/this.width));
    }
}