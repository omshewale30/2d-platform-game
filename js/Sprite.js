class Sprite {
    constructor({position,imageSrc,frameRate=1,scale=1,frameBuffer=7}) {

        this.position = position;
        this.scale = scale;
        this.image = new Image();
        this.image.onload = () => {
            this.width = (this.image.width/this.frameRate)*(this.scale);
            this.height = this.image.height * this.scale;
            this.loaded = true;
        }
        this.frameBuffer = frameBuffer;
        this.elapsedFrame = 0;
        this.image.src = imageSrc;
        this.frameRate = frameRate
        this.currentFrame = 0;
    }

    draw() {
        if (!this.image) {
            return;
        }
        const cropBox = {
            position:{
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width/this.frameRate,
            height: this.image.height
        }

        ctx.drawImage(
            this.image,
            cropBox.position.x,
            cropBox.position.y,
            cropBox.width,
            cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height);
    }
    update() {
        this.draw();
        this.updateFrame();
    }
    updateFrame() {
        this.elapsedFrame++;

        if (this.elapsedFrame % this.frameBuffer ===0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++;
            } else {
                this.currentFrame = 0;
            }
        }

    }
}