export default class Photo {
    public tags: string[];
    public busy: Boolean;

    constructor(x: number, y: number, t: String) {
      this.x = x;
      this.y = y;
      this.t = t;
      this.busy = false;
    }
  }