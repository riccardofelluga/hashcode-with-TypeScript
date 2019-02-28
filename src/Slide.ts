import Photo from "./photo";

export default class Slide {
  public tagsSet: Set<string>;
  public tagsArray: string[];
  public photos: Photo[];

  constructor(photos: Photo[]) {
    // console.log(photos);
    this.photos = photos;
    this.tagsArray = [];
    this.tagsSet = new Set();
    switch (photos.length) {
      case 0:
        console.log("Tiakane hai messo 0 photo");
        return;
      case 1:
        this.tagsSet = new Set([...photos[0].tags]);
        this.tagsArray = [...this.tagsSet];
        break;
      case 2:
        this.tagsSet = new Set([...photos[0].tags, ...photos[1].tags]);
        this.tagsArray = [...this.tagsSet];
        break;
      default:
        console.log("Tiakane hai messo piu di 2 photo");
        return;
    }
  }
}
