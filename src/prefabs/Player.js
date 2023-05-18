class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, groundY) {
      super(scene, x, y, texture, frame);

      scene.add.existing(this); // add to existing, displayList, updateList

      scene.physics.world.enableBody(this); // Add the player to the physics world
      this.body.setCollideWorldBounds(true); // Prevent the player from going off-screen
      this.body.setGravityY(500); // Adjust the gravity to control the player's fall speed
      
      this.body.setSize(this.width * 0.05, this.height * 0.05);
      this.groundY = groundY;

      this.activePowerUpTypes = [];


      this.hasFireBreathPowerUp = false;
      this.hasDoubleJumpPowerUp = false; // Make sure to remove double jump power up
      this.canDoubleJump = false;
      this.timeBoost = false;



      this.moveSpeed = 4; // pixels per frame
      this.isJumping = false;
      this.jumpHeight = 200; // adjust to change jump height
      this.jumpDuration = 500; // adjust to change the duration of the jump
      this.groundY = y; // Store the ground level position
      this.lives = 3;
      

      this.isUpKeyJustDown = false;
      this.jumps = 0;

       //this.sfxJump = scene.sound.add('sfx_jump'); // add jump sfx

      this.isJumpingDelayed = false;

  }

  update() {
    // left/right movement
    if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
      this.x -= this.moveSpeed;
    }
    
    if (keyRIGHT.isDown) {
      this.x += this.moveSpeed;
    }
    if (this.delay > 0) {
      // If there is a delay, prevent jumping
      this.isUpKeyJustDown = false;
  }

  
  
    if (this.isUpKeyJustDown && !this.isJumping) {
      this.isUpKeyJustDown = false;
      this.jump();
    }


    // Check if player is on the ground
    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.body.velocity.y = 0;
      this.isJumping = false;
      this.jumps = 0;
      this.canDoubleJump = false;
    }
  }
  jump() {
    if (this.isUpKeyJustDown && !this.isJumping && this.delay <= 0) {
      this.isUpKeyJustDown = false;
      this.isJumping = true;
      this.body.setVelocityY(-this.jumpHeight);
      //this.sfxJump.play();
      this.jumps++;
  
      this.delay = this.jumpDelay; // Set the delay before the next jump
      this.isJumpingDelayed = true; // Activate the flag for delayed jumping
    }
  
    // Decrease the delay by the elapsed time
    this.delay -= this.scene.time.deltaTime;
  
    this.sfxJump.play();
    if (this.isUpKeyJustDown && !this.isJumping && !this.isJumpingDelayed) {
      if (!this.isJumping) {
        this.isJumping = true;
        this.body.setVelocityY(-this.jumpHeight);
        this.sfxJump.play();
        this.jumps++;
      } else if (
        this.hasDoubleJumpPowerUp &&
        this.jumps === 1 &&
        this.canDoubleJump
      ) {
        this.body.setVelocityY(-this.jumpHeight);
        this.sfxJump.play();
        this.jumps++;
        this.canDoubleJump = false;
      }
    }
  
    this.scene.tweens.add({
      targets: this,
      y: this.groundY - this.jumpHeight,
      duration: this.jumpDuration / 2,
      ease: 'Quad.easeOut',
      onComplete: () => {
        this.scene.tweens.add({
          targets: this,
          y: this.groundY,
          duration: this.jumpDuration / 2,
          ease: 'Quad.easeIn',
          onComplete: () => {
            this.isJumping = false;
            this.canDoubleJump =
              this.hasDoubleJumpPowerUp && this.jumps === 0;
            this.isJumpingDelayed = false; // Deactivate the flag for delayed jumping
          },
        });
      },
    });
  }
      enableDoubleJump() {
      if (this.hasDoubleJumpPowerUp) {
        this.setTexture('player_with_wings'); // Change the sprite's appearance
      } else {
        this.setTexture('player'); // Revert to the default sprite
      }
    }

    
    

    increaseSpeed() {
        this.moveSpeed += 1; // You can adjust this value to change the speed increase amount
    }

    loseLife() {
      this.lives -= 1;
    }




    removeAllPowerUps() {
      this.activePowerUpTypes = [];
      this.setTexture('player');
      this.moveSpeed = 4;
      this.hasFireBreathPowerUp = false;
      this.timeBoost = false;
      this.hasDoubleJumpPowerUp = false;
      this.jumps = 0;

    }
    
    
}
