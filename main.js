var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            debug: true // This line will help you to debug the positioning/issues in your game
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('block', 'assets/block.png');
    this.load.image('pillar', 'assets/pillar.png');
}

var composite;

function create() {
    // Create static bridge pillars
    this.matter.add.image(100, 550, 'pillar', null, { isStatic: true });
    this.matter.add.image(700, 550, 'pillar', null, { isStatic: true });

    // Create bridge planks
    for (var i = 0; i < 10; i++) {
        var block = this.matter.add.image(200 + (i * 50), 300, 'block');
        block.setBody({
            type: 'rectangle'
        });
        if (i == 0) {
            // Constraint the first block to the pillar
            this.matter.add.worldConstraint(block, 2, 0.9, {
                pointA: { x: 100, y: 470 },
                pointB: { x: -25, y: 0 }
            });
        } else {
            // Connect every other block to the previous one
            this.matter.add.constraint(block, composite, 2, 0.9, {
                pointA: { x: -25, y: 0 },
                pointB: { x: 25, y: 0 }
            });
        }
        composite = block;

        if (i == 9) {
            // Constraint the last block to the pillar
            this.matter.add.worldConstraint(block, 2, 0.9, {
                pointA: { x: 700, y: 470 },
                pointB: { x: 25, y: 0 }
            });
        }
    }
}
