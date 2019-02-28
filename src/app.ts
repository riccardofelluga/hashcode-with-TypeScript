import * as fs from "fs";
import * as readLine from "readline";
const createInterface = readLine.createInterface;
const createReadStream = fs.createReadStream;

import Cell from "./Cell";
import Pizza from "./Pizza";

const files: string[] = ["example", "small", "medium", "big"];

const file: string = files[process.argv.length > 2 ? parseInt(process.argv[2]) : 2];

const lineReader: readLine.Interface = createInterface({
  input: createReadStream("in/" + file + ".in")
});

var pizza: Pizza = new Pizza();

var count: Number = 0;

lineReader.on("line", readPizza);

function readPizza(line): void
{
    if (count === 0) readDescLine(line);
    else readPizzaLine(line);
    count++;
    if (count === 1 + pizza.rows) start();
}

function readDescLine(line: String) :void {
  var values = line.split(" ");
  pizza.rows = parseInt(values[0], 10);
  pizza.cols = parseInt(values[1], 10);
  pizza.l = parseInt(values[2], 10);
  pizza.max = parseInt(values[3], 10);
}

function readPizzaLine(line: String) {
  var pieces: String[] = line.split("");
  const piecesParsed: Cell[] = pieces.map((piece: String, x: number): Cell => {
    const cell: Cell = new Cell(x, pizza.cells.length, piece);
    pizza.all.push(cell);
    return cell;
  });
  pizza.cells.push(piecesParsed);
}

function start(): void {
  var mushrooms = pizza.all.filter(c => c.t === "M").length;
  var tomatoes = pizza.all.length - mushrooms;
  console.log("mushrooms/tomatoes", mushrooms, tomatoes);
  var divs = [];
  for (var i = pizza.max; i >= pizza.l * 2; i--) {
    divs = divs.concat(divisors(i));
  }

  pizza.all.forEach(cell => {
    divs.forEach(d => {
      var w = d[0];
      var h = d[1];
      pizza.takeSlice(cell, w, h);
    });
  });

  points();
  write();
}

function points(): void {
  console.log("points", pizza.all.filter(c => c.busy).length, pizza.all.length);
}

function write(): void {
  var out = `${pizza.slices.length}`;
  pizza.slices.forEach(slice => {
    out = `${out}
${slice.out.join(" ")}`;
  });
  fs.writeFile(`out/${file}.out`, out, () => {});
}


function divisors(n) {
  var c = [];
  var map = {};
  for (var i = 1; i < n; i++) {
    if (n % i === 0) {
      var f = i;
      var s = n / i;
      if (!map[`${f}-${s}`]) {
        map[`${f}-${s}`] = true;
        c.push([f, s]);
      }
      if (!map[`${s}-${f}`]) {
        map[`${s}-${f}`] = true;
        c.push([s, f]);
      }
    }
  }
  return c;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}