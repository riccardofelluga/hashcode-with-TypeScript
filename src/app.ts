import * as fs from "fs";
import * as readLine from "readline";
import * as _ from "lodash";
const createInterface = readLine.createInterface;
const createReadStream = fs.createReadStream;

import Slide from "./Slide";
import Photo from "./Photo";
import Slideshow from "./Slideshow";
import SlideHelper from "./SlideHelper";

const files: string[] = [
  "a_example",
  "b_lovely_landscapes",
  "c_memorable_moments",
  "d_pet_pictures",
  "e_shiny_selfies"
];

const file: string =
  files[process.argv.length > 2 ? parseInt(process.argv[2]) : 0];

const lineReader: readLine.Interface = createInterface({
  input: createReadStream("in/" + file + ".txt")
});

var slideshow: Slideshow = new Slideshow([]);
var allPhotos: Photo[] = [];
var count: number = 0;

lineReader.on("line", readSlideshow);

function readSlideshow(line): void {
  if (count === 0) readDescLine(line);
  else readPhotoLine(line, count - 1);
  count++;
  if (count === 1 + slideshow.num) start();
}

function readDescLine(line: string): void {
  slideshow.num = parseInt(line, 10);
}

function readPhotoLine(line: string, count: number) {
  let pieces: string[] = line.split(" ");
  let orientation: string = pieces[0];
  let numTags: number = parseInt(pieces[1], 10);
  var tags: string[] = [];
  pieces.forEach(
    (line: string, index: number): void => {
      if (index < 2) return;
      tags.push(line);
    }
  );
  if (numTags !== tags.length) console.log("Tiakane");
  let photo: Photo = new Photo(tags, numTags, orientation, count);
  allPhotos.push(photo);
}

function start(): void {
  var vQueue: Photo = null;
  var slides: Slide[] = [];
  allPhotos.forEach((photo: Photo, index: number) => {
    if (photo.orientation === "V") {
      if (vQueue != null) {
        slides.push(new Slide([vQueue, photo]));
        vQueue = null;
      } else {
        vQueue = photo;
      }
    } else {
      slides.push(new Slide([photo]));
    }
  });
  let slideHelper: SlideHelper = new SlideHelper();
  let chunkedSlides = _.chunk(slides, 10);
  var allPairs = [];
  var goodPairs = [];
  var pairedchunkedSlides = chunkedSlides.forEach(x =>
    allPairs.push(pairwise(x))
  );
  console.log("All pairs: ", allPairs);
  allPairs.forEach(x => {
    // if (x == undefined || x[0] == undefined || x[1] == undefined) return;

    if (slideHelper.interestBetween(x[0][0], x[0][1]) > 0) {
      console.log("x0", x[0]);
      console.log("x1", x[1]);
      goodPairs.push(x);
    }
  });
  console.log("Chunks: ", goodPairs);

  // console.log(slides);
  // console.log("Interest: ", slideHelper.interestBetween(slides[1], slides[0]));
  slideshow = new Slideshow(slides);
  while (slides.length > 0) {
    var current: Slide = slides.pop();
    slideshow.slides.push(current);
    var bestFit: Slide = null;
    var intrest: Number = 0;
    slides.forEach((item: Slide) => {
      console.log(item);
      var newIntrest: Number = slideHelper.interestBetween(current, item);
      console.log(newIntrest);
      if (newIntrest >= intrest) {
        intrest = newIntrest;
        bestFit = item;
      }
      console.log(intrest);
    });
    _.remove(slides, bestFit);
    slideshow.slides.push(bestFit);
    console.log(slides.length);
  }

  write();
}

function pairwise(list) {
  if (list.length < 2) {
    return [];
  }
  var first = _.first(list),
    rest = _.drop(list, 1),
    pairs = _.map(rest, function(x) {
      return [first, x];
    });
  return _.flatten([pairs, pairwise(rest)]);
}

function points(): void {
  // console.log("points", pizza.all.filter(c => c.busy).length, pizza.all.length);
}

function write(): void {
  // console.log(slideshow.slides);
  var out = `${slideshow.slides.length}`;
  slideshow.slides.forEach(slide => {
    out += `\n${slide.photos[0].photoId}`;
    if (slide.photos.length > 1) {
      out += ` ${slide.photos[1].photoId}`;
    }
  });
  fs.writeFile(`out/${file}.out`, out, () => {});
}
