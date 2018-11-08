<template>
  <div class="board" :style="{ width: `${boardWidth}px` }">
    <div ref="container" class="board-container"></div>
  </div>
</template>

<script>
import Cell from '@/components/Cell.vue';
import Vue from 'vue'

export default {
  name: 'board',
  data() {
    return {
      board: [],
      boardWidth: 600,
      width: 50,
      height: 25,
      generations: 0,
      tickInterval: null,
    };
  },
  props: {
    dimensions: {
      type: Object,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.init();
    this.width = this.dimensions.width;
    this.height = this.dimensions.height;
  },
  methods: {
    init() {
      for (let y = 0; y < this.height; y++) {
        let col = [];
        for (let x = 0; x < this.width; x++) {
          const CellClass = Vue.extend(Cell);
          const cellInstance = new CellClass({
              propsData: { y, x },
          });
          cellInstance.$mount();
          this.$refs.container.appendChild(cellInstance.$el);
          col.push(cellInstance);
        }
        this.board.push(col);
      }

      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const cell = this.board[y][x];
          const topLeft = y === 0 || x === 0 ? null : this.board[y-1][x-1];
          const top = y === 0 ? null : this.board[y-1][x];
          const topRight = y === 0 || x === this.width - 1 ? null : this.board[y-1][x+1];
          const right = x === this.width - 1 ? null : this.board[y][x+1];
          const bottomRight = y === this.height -1 || x === this.width - 1 ? null : this.board[y+1][x+1];
          const bottom = y === this.height -1 ? null : this.board[y+1][x];
          const bottomLeft = y === this.height -1 || x === 0 ? null : this.board[y+1][x-1];
          const left = y === 0 ? null : this.board[y][x-1];

          const neighbors = {
            topLeft,
            top,
            topRight,
            right,
            bottomRight,
            bottom,
            bottomLeft,
            left,
          };
          cell.assignNeighbors(neighbors);
        }
      }
    },
    start() {
      this.tickInterval = setInterval(() => {
        this.tick();
      }, this.speed);
    },
    pause() {
      clearInterval(this.tickInterval);
    },
    clear() {
      this.pause();
      this.clearBoard();
    },
    random(percent) {
      this.clearBoard();

      for (let row of this.board) {
        for (let cell of row) {
          const aliveChance = Math.random() * 100;
          if (aliveChance > percent) {
            cell.alive = true;
          } else {
            cell.alive = false;
          }
        }
      }
    },
    setWidth(width) {
      this.width = width;
      this.boardWidth = (width * 10) + (width * 2);
      
      for (let row of this.board) {
        for (let cell of row) {
          this.$refs.container.removeChild(cell.$el);
          cell.$destroy();
        }
      }

      this.board = [];
      this.generations = 0;
      this.tickInterval = [];
      this.init();
    },
    setHeight(height) {
      this.height = height;
      
      for (let row of this.board) {
        for (let cell of row) {
          this.$refs.container.removeChild(cell.$el);
          cell.$destroy();
        }
      }

      this.board = [];
      this.generations = 0;
      this.tickInterval = [];
      this.init();
    },
    tick() {
      for (let row of this.board) {
        for (let cell of row) {
          cell.eval();
        }
      }
      
      for (let row of this.board) {
        for (let cell of row) {
          cell.exec();
        }
      }
      this.generations++;
    },
    clearBoard() {
      for (let row of this.board) {
        for (let cell of row) {
          cell.clear();
        }
      }
      this.generations = 0;
    },
  },
  watch: {
    generations(newVal) {
      this.$emit('generationsUpdate', newVal);
    },
  }
};
</script>

<style lang="scss">
.board {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 0px;
}
</style>
