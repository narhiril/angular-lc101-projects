import { Component } from '@angular/core';
import { Vec2 } from './vec2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exercises: Angular Lesson 3';

  isLanded: boolean = true;
  heightInterval = 10000;
  movePixelOffsets = new Vec2(10, 10);
  canMoveNext = {
    up: true,
    down: true,
    left: true,
    right: true
  };

  color = 'green';
  height = 0;
  //width = 0;
  message = 'Space shuttle ready for takeoff!';

  handleTakeOff(rocket): void {
    const result = window.confirm('Are you sure the shuttle is ready for takeoff?');
    if (result) {
      this.isLanded = false;
      this.color = 'blue';
      this.height = this.heightInterval;
      this.updatePosition(rocket, new Vec2(0, this.movePixelOffsets.y));
      this.message = 'Shuttle in flight.';
    }
  }

  handleLanding(rocket, override: boolean = false): void {
    let result: boolean = false;
    if (!override){
      result = window.confirm('The shuttle is landing.  Landing gear engaged.');
    }
    if (result || override) {
      this.height = 0;
      this.isLanded = true;
      this.color = 'green';
      this.updatePosition(rocket, new Vec2(0, 0));
      this.message = 'Shuttle on the ground.';
    }
  }

  handleAbort(rocket): void {
    const result = window.confirm('Are you sure you want to abort?');
    if (result) {
      this.height = 0;
      this.isLanded = true;
      this.color = 'red';
      this.updatePosition(rocket, new Vec2(0, 0));
      this.message = 'Mission aborted.';
    }
  }

  moveRocket(rocket, background, direction: string): void {
    const maxOffsets = new Vec2(background.offsetWidth, background.offsetHeight);
    if (maxOffsets.x <= this.movePixelOffsets.x || maxOffsets.y <= this.movePixelOffsets.y){
      console.log('Unable to move rocket, reason: Insufficient space on at least one axis.');
      return;
    } else {
      const currentPosition = new Vec2(parseInt(rocket.style.left), parseInt(rocket.style.bottom));
      const newPosition = new Vec2(currentPosition.x, currentPosition.y);
      //console.log(`Background size: x=${maxOffsets.x}, y=${maxOffsets.y}`); //debug message
      //console.log(`Rocket position: x=${currentPosition.x}, y=${currentPosition.y}`); //debug message
      this.checkOutOfBounds(rocket, currentPosition, maxOffsets); //sanity check
      switch(direction.toLowerCase()) {
        case "up":
          if (currentPosition.y + rocket.offsetHeight <= maxOffsets.y - this.movePixelOffsets.y){ //if can move up
            newPosition.y += this.movePixelOffsets.y;
          }
          this.height += this.heightInterval;
          break;
        case "down":
          if (currentPosition.y >= this.movePixelOffsets.y) { //if can move down
            newPosition.y -= this.movePixelOffsets.y;
          }
          if (this.height - this.heightInterval <= 0) { //check for zero or negative height
            this.handleLanding(rocket, true);
            return; //handleLanding does the position update for us, no need to continue
          } else {
            this.height -= this.heightInterval;
          }
          break;
        case "left":
          if (currentPosition.x >= this.movePixelOffsets.x) { //if can move left
            newPosition.x -= this.movePixelOffsets.x;
          }
          break;
        case "right":
          if (currentPosition.x + rocket.offsetWidth <= maxOffsets.x - this.movePixelOffsets.x) { //if can move right
            newPosition.x += this.movePixelOffsets.x;
          }
          break;
        default: //shouldn't be reachable
          throw Error('Invalid direction input to moveRocket');
      }
      this.updatePosition(rocket, newPosition);
      this.updateButtonFlags(newPosition, maxOffsets);
    }
  }

  updatePosition(rocket, position: Vec2): void { //translates Vec2 to style update
    rocket.style.left = `${position.x}px`;
    rocket.style.bottom = `${position.y}px`;
  }

  checkOutOfBounds(rocket, currentPosition: Vec2, maxOffsets: Vec2): void { //handles if the rocket somehow goes out of bounds (most common cause is resized window)
    const snapToBounds = new Vec2(currentPosition.x, currentPosition.y);
    if (currentPosition.x > maxOffsets.x) {
      snapToBounds.x = maxOffsets.x;
    }
    if (currentPosition.y > maxOffsets.y) {
      snapToBounds.y = maxOffsets.y;
    }
    if (snapToBounds.x !== currentPosition.x || snapToBounds.y !== currentPosition.y) {
      this.updatePosition(rocket, snapToBounds);
    }
  }

  updateButtonFlags(position: Vec2, bounds: Vec2): void { //bonus mission #2
    
    //right
    if (position.x >= bounds.x - this.movePixelOffsets.x) {
      this.canMoveNext.right = false;
    } else {
      this.canMoveNext.right = true;
    }

    //left
    if (position.x <= this.movePixelOffsets.x) {
      this.canMoveNext.left = false;
    } else {
      this.canMoveNext.left = true;
    }

    //up
    if (position.y >= bounds.y - this.movePixelOffsets.y) {
      this.canMoveNext.up = false;
    } else {
      this.canMoveNext.up = true;
    }

    //down
    if (position.y <= this.movePixelOffsets.y) {
      this.canMoveNext.down = false;
    } else {
      this.canMoveNext.down = true;
    }
  }

}
