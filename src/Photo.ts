export default class Photo {
  public tags: string[];
  public orientation: string;
  public numTags: number;
  public photoId: number;

  constructor(
    tags: string[],
    numTags: number,
    orientation: string,
    photoId: number
  ) {
    this.tags = tags;
    this.orientation = orientation;
    this.numTags = numTags;
    this.photoId = photoId;
  }
}
