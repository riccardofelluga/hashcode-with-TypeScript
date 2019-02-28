import Slide from "./Slide";
import * as os from "os";

const EOL = os.EOL;

export default class Slideshow {
  public slides: Slide[];
  public num: number;

  constructor(slides: Slide[]) {
    this.slides = slides;
    this.num = slides.length;
  }

  log() {
    // console.log(EOL);
    // console.log(this.slides);
  }
}
