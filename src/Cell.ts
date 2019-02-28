export default class Cell {
    public x: Number;
    public y: Number;
    public t: Number;
    public busy: Boolean;
    
    constructor(x: Number, y: Number, t: Number) {
      this.x = x;
      this.y = y;
      this.t = t;
      this.busy = false;
    }
  }