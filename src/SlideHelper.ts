import Slide from "./Slide";

export default class SlideHelper {
  interestBetween(slide1: Slide, slide2: Slide): number {
    //     ● The number of common tags is 1 → [garden]
    // ● The number of tags in S1
    // , but not is S2
    // is 1 → [cat]
    // ● The number of tags in S2
    // , but not in S1
    // , is 2 → [sele and smile]
    // The interest factor is the minimum of these numbers, so it is 1
    console.log(slide1.tagsArray);
    let commonTags = slide1.tagsArray.filter(x => slide2.tagsSet.has(x));
    let leftUniqueTags = slide1.tagsArray.filter(x => !slide2.tagsSet.has(x));
    let rightUniqueTags = slide2.tagsArray.filter(x => !slide1.tagsSet.has(x));
    return Math.min(
      commonTags.length,
      leftUniqueTags.length,
      rightUniqueTags.length
    );
  }
}
