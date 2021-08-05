<template>
  <div class="container-fluid h-100 table-background">
    <div class="row"  v-for="(itemRow, row) in cells"> 
      <game-cell :value="cells[row][col]" v-for="(itemCol, col) in itemRow" :newCell="isLastCreated(row,col)" :mergedCell="isMerged(row,col)" ></game-cell>
    </div> 
    <div class="row score text-center"> 
      <h2>Score:</h2>
      <h1>{{points}}</h1>
    </div>
    <a href="#" title="Left" v-on:click.prevent="moveLeft()">Left&nbsp;</a>
    <a href="#" title="Right" v-on:click.prevent="moveRight()">Right&nbsp;</a>
    <a href="#" title="Up" v-on:click.prevent="moveUp()">Up&nbsp;</a>
    <a href="#" title="Down" v-on:click.prevent="moveDown()">Down&nbsp;</a>
        
  </div>
</template>

<script>
import GameCell from './GameCell.vue'
export default {
  name: 'GameTable',
  props: {
    size: {
      default: 4
    }
  },
  components: {
    GameCell
  },
  emits: ['merged', 'moved'],
  data() {
    return {
      cells: [],
      lastCreatedCell: {row: 0, col: 0},
      mergeds:[],
      points: 0
    }
  },
  methods: {
    moveLeft() {
      return this.moveForward(false);
    },
    moveRight() {
      return this.moveBackward(false);
    },
    moveUp() {
      return this.moveForward(true);
    },    
    moveDown() {
      return this.moveBackward(true);
    },
    moveForward(transposed){
      return this.move('forward', transposed);
    },
    moveBackward(transposed){
      return this.move('backward', transposed);
    },
    move(direction, transposed){
      this.mergeds = [];

      if (transposed){
        this.cells = this.transpose(this.cells);
      }

      var moved = false;
      for (var index = 0; index < this.size; index++) {
        moved |= this.moveArray(this.cells[index], direction, index, transposed);
      }

      if (transposed){
        this.cells = this.transpose(this.cells);
      }

      if (moved && this.hasEmptyCell())
        this.initRandomCell();

      return moved;
    },
    moveArray(cellsArray, direction, matrixIndex, transposed){
      var moved = false;
      var startIndexCell = 0;
      var lastIndexCell = this.size - 1;
      var inc = 1;
      if (direction != 'forward'){
        startIndexCell = lastIndexCell;
        lastIndexCell = 0;
        inc = -1;
      }
      var index = startIndexCell;
      var emptyCell = startIndexCell;
      var lastCellValue = 0;
      var inverseInc = inc * -1;

      for (var i = 0; i < this.size; i++){
        var currentCellValue = cellsArray[index];

        if (lastCellValue == currentCellValue && lastCellValue > 0){
          cellsArray[index] = 0;
          var targetCell = emptyCell + inverseInc;
          var targetCellValue = lastCellValue + currentCellValue;
          cellsArray[targetCell] = targetCellValue;
          lastCellValue = 0;
          moved = true;

          if (transposed){
            this.$emit('merged', { row: targetCell, col: matrixIndex, newValue: targetCellValue });
            this.mergeds.push({ row: targetCell, col: matrixIndex });
          }
          else{
            this.$emit('merged', { row: matrixIndex, col: targetCell, newValue: targetCellValue });  
            this.mergeds.push({ row: matrixIndex, col: targetCell });
          }

          this.points += targetCellValue;
        }          
        else if (currentCellValue > 0){
          lastCellValue = currentCellValue;
          cellsArray[index] = 0;
          cellsArray[emptyCell] = lastCellValue;

          if (index != emptyCell){
            moved = true;
          }

          emptyCell = emptyCell + inc;
        }
        index = index + inc; 
      }
      
      return moved;
    },
    initRandomCell(){
      var pos = {row: 0, col: 0};
      do
      {
        pos = this.randomPos();
      }while(this.cells[pos.row][pos.col] > 0);

      this.lastCreatedCell = pos;
      this.cells[pos.row][pos.col] = this.randomValue();
    },
    randomPos(){
      var row = this.getRandomInt(0, this.size);
      var col = this.getRandomInt(0, this.size);
      return {row, col};
    },
    randomValue(){
      return this.getRandomInt(1, 3) * 2;
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    transpose(matrix) {
      return matrix[0].map((col, i) => matrix.map(row => row[i]));
    },
    hasEmptyCell(){
      for (var row = 0; row < this.size; row++) {
        for (var col = 0; col < this.size; col++) {
          if (this.cells[row][col] == 0){
            return true;
          }
        }
      }

      return false;
    },
    initArray(){
      for ( var i = 0; i < this.size ; i++) {
          if(!this.cells[i])
              this.cells[i] = []
          for ( var j = 0; j < this.size ; j++)
              this.cells[i][j] = 0;
      }
    },
    isLastCreated(row, col){
      return this.lastCreatedCell.row == row && this.lastCreatedCell.col == col;
    },
    isMerged(row, col){
      for (var i = 0; i < this.mergeds.length; i++) {
        if (this.mergeds[i].row == row && this.mergeds[i].col == col) 
          return true;
      }
      return false;
    }
  },
  computed:{

  },
  created() {
    this.initArray();
    this.initRandomCell();    
    this.initRandomCell();
  }
}
</script>

<style>
.table-background{
    background-color: #7a6e6a;
}
.cell {
  height: 20vh;
  font-size: 45px;
  border-color: #7a6e6a;
  border-width: 5px;
  border-style: solid;
  border-radius: 10px;
  line-height: 150px;
  background-color: #7a6e6a;
}
.score {
  height: 20vh;
  border-color: #7a6e6a;
  border-width: 5px;
  border-style: solid;
  line-height: 150px;
}
</style>
