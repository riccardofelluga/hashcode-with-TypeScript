export default class Cell {
    public tags: string[];
    public y: number;
    public t: String;
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