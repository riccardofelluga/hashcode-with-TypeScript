import Cell from './Photo';
import * as os from "os";
const EOL = os.EOL;

export default class Pizza {
	public rows: number;
	public cols: number;
	public l: number;
	public max: number;
	public cells: Cell[][];
	public all: Cell[];
	public slices: Cell[];
	constructor() {
	  this.rows = 0;
	  this.cols = 0;
	  this.l = 0;
	  this.max = 0;
	  this.cells = [];
	  this.all = [];
	  this.slices = [];
	}
  
	log() {
	  console.log(EOL);
	  for (var y = 0; y < this.rows; y += 1) {
		for (var x = 0; x < this.cols; x += 1) {
		  process.stdout.write(this.getCell(x, y).busy ? 'X' : 'O');
		}
		console.log(EOL);
	  }
	}
  
	getCell(x, y) {
	  if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) return null;
	  return this.cells[y][x];
	}
  
	takeSlice(cell, w, h) {
	  const cells = [];
	  const ingredients = { M: 0, T: 0 };
	  for (var x = cell.x; x < cell.x + w; x += 1) {
		for (var y = cell.y; y < cell.y + h; y += 1) {
		  const cell = this.getCell(x, y);
		  if (!cell || cell.busy) return null;
		  ingredients[cell.t] += 1;
		  cells.push(cell);
		}
	  }
	  if (ingredients.M < this.l || ingredients.T < this.l) return null;
	  cells.forEach((c) => { c.busy = true; });
	  this.slices.push({
		cells,
		out: [cell.y, cell.x, cell.y + h - 1, cell.x + w - 1],
	  });
	}
  }
  