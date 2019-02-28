export default class Cell {
    public x: number;
    public y: number;
    public t: String;
    public busy: Boolean;

    constructor(x: number, y: number, t: String) {
      this.x = x;
      this.y = y;
      this.t = t;
      this.busy = false;
    }
  }