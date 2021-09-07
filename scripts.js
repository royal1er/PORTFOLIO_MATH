class Typer {
    /**
     * @param {string} str - string to type
     * @param {HTMLElement} el - element to write to
     * @param {number} [waitTime] - time to wait in seconds between character typing
    */
    constructor(str, el, waitTime = 0.2) {
      this.str = str;
      this.el = el;
      this.waitTime = waitTime;
      this.stepCount = 0;
    }
    
    type() {
      this.then = Date.now();
      this.setDelta();
      
      window.requestAnimationFrame(this.step.bind(this));
    }
    
    sliceString() {
      this.str = this.str.substring(1, this.str.length);
    }
    
    getNextStringSection() {
      return this.str.substring(0,1);
    }
    
    incStepCount() {
      this.stepCount = this.stepCount + this.delta;
    }
    
    resetStepCount() {
      this.stepCount = 0;
    }
    
    setDelta() {
      this.now = Date.now();
      this.delta = (this.now - this.then) / 1000;
      this.then = this.now;
    }
  
    step() {
      this.setDelta();
      this.incStepCount();
      
      if (!this.str.length) {
        return;
      }
      
      if (this.stepCount < this.waitTime) {
        return this.type();
      }
  
      if (this.stepCount >= this.waitTime) {
        this.el.innerHTML = `${this.el.innerHTML}${this.getNextStringSection()}`;
  
        this.sliceString();
        this.setDelta();
        this.resetStepCount();
        
        window.requestAnimationFrame(this.step.bind(this));
      }
    }
  }
  
  /*let typer1 = new Typer("I'm a fast typer.", document.querySelector('.typer1'), 0.1);
  typer1.type();
  
  let typer2 = new Typer("I'm a medium typer.", document.querySelector('.typer2'), 0.2);
  typer2.type();
  
  let typer3 = new Typer("I'm a slooooow typer.", document.querySelector('.typer3'), 0.6);
  typer3.type();
  
  let typer4 = new Typer("Why am I even bothering? I should use a pen instead.", document.querySelector('.typer4'), 1.3);
  typer4.type();*/
  