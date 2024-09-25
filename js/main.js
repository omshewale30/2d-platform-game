

const canvas =  document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                })
            )
        }
    })
})

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36) {
    platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}
const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            platformCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                    height: 4,
                })
            )
        }
    })
})

const player = new Player({
    position: {x: 100, y: 300},
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc: 'Idle.png',
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: 'Idle.png',
            frameRate: 8,
            frameBuffer: 5,
        },
        Run: {
            imageSrc: 'Run.png',
            frameRate: 8,
            frameBuffer: 7,
        },
        Jump: {
            imageSrc: 'Jump.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        Fall: {
            imageSrc: 'Fall.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        FallLeft: {
            imageSrc: 'FallLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        RunLeft: {
            imageSrc: 'RunLeft.png',
            frameRate: 8,
            frameBuffer: 5,
        },
        IdleLeft: {
            imageSrc: 'IdleLeft.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        JumpLeft: {
            imageSrc: 'JumpLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },
    },

});

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: 'background.png',
})
const gravity = 0.1
const keys={
    d :{
        pressed: false
    },
    a :{
        pressed: false
    },
    w :{
        pressed: false
    },
    p:
    {
        pressed:false
    }
}
const backgroundMusic = new Audio('bgMusic.mp3'); // Your music file path
backgroundMusic.loop = true; // Loop the music
backgroundMusic.volume = 0.5; // Set volume
let backgroundImageHeight=432;
const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height,
    },
}
function animate() {

    window.requestAnimationFrame(animate);
    ctx.fillStyle='white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save() // Save the current state of the canvas
    ctx.scale(4, 4); // Scale the canvas
    ctx.translate(camera.position.x, camera.position.y); // Translate the canvas
    backgroundMusic.play().catch(error => {
            console.log('Error playing music:', error);
        });; // Play the music
    background.update(); // Draw the background
    collisionBlocks.forEach(block => {
        block.update();
    })
    platformCollisionBlocks.forEach(block => {
        block.update();
    })

    player.update();
    player.stayWithinBounds()
    player.velocity.x = 0;


    if (keys.d.pressed) {
        player.switchSprite('Run')

        player.velocity.x = 2
        player.lastDirection = 'right'
        player.shouldPanCameraToTheLeft({ canvas, camera })
    }
    else if (keys.a.pressed) {
        player.switchSprite('RunLeft')
        player.velocity.x = -2
        player.lastDirection = 'left'
        player.shouldPanCameraToTheRight({ canvas, camera })
    }

   else if (player.velocity.y === 0) {
        if (player.lastDirection === 'right') player.switchSprite('Idle')
        else player.switchSprite('IdleLeft')
    }

    if (player.velocity.y < 0) {
        player.shouldPanCameraDown({ camera, canvas })
        if (player.lastDirection === 'right') player.switchSprite('Jump')
        else player.switchSprite('JumpLeft')
    }
    else if (player.velocity.y > 0) {
        player.shouldPanCameraUp({ camera, canvas })
        if (player.lastDirection === 'right') player.switchSprite('Fall')
        else player.switchSprite('FallLeft')
    }
    ctx.restore(); // Restore the canvas to the previous state


}
animate();


// Event listeners
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'w':
            player.velocity.y = -4
            break
        case 'p':
            keys.p.pressed = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'p':
            keys.p.pressed = false
            break
    }
})
