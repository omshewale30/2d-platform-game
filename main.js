

const canvas =  document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;


class Player {

    constructor() {
        this.position = {
            x: 0,
            y: 0
        },
        this.height = 100,
        this.width = 100,
        this.color = 'red',
        this.velocity = {
            x: 0,
            y: 1
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.position.y = this.position.y + this.velocity.y;

        if(this.position.y > canvas.height - this.height) {
            this.position.y = canvas.height - this.height;
        }
    }
}
const player = new Player();

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle='white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
}
animate();

window.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowUp') {
        player.velocity.y = -1;
    }
    if(e.key === 'ArrowDown') {
        player.velocity.y = 1;
    }
});


