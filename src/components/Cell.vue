<template>
  <div @click="toggleAlive" class="cell" :class="{ alive, died }">
    
  </div>
</template>

<script>
export default {
  name: 'cell',
  data() {
    return {
      alive: false,
      willBeAlive: false,
      died: false,
      neighbors: {},
    };
  },
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  methods: {
    assignNeighbors(neighbors) {
      Object.assign(this.neighbors, neighbors);
    },
    eval() {
      const neighbors = Object.values(this.neighbors);
      let liveNeighbors = 0;
      for (let neighbor of neighbors) {
        if (neighbor && neighbor.alive) {
          liveNeighbors++;
        }
      }

      if (this.alive) {
        this.willBeAlive = true;
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          this.willBeAlive = false;
          this.died = true;
        }
      } else {
        this.willBeAlive = false;
        if (liveNeighbors === 3) {
          this.willBeAlive = true;
          this.died = false;
        }
      }
    },
    exec() {
      this.alive = this.willBeAlive;
    },
    toggleAlive() {
      this.alive = !this.alive;
    },
    clear() {
      this.alive = false;
      this.willBeAlive = false;
      this.died = false;
    }
  },
};
</script>

<style scoped lang="scss">
.cell {
  width: 10px;
  height: 10px;
  display: inline-block;
  border: 1px solid #b2bec3;
  background-color: #fff;
  transition: all .1s ease-in-out;

  &.alive {
    background-color: #000;
    transition: all .1s ease-in-out;
  }

  &.died {
    background-color: #dfe6e9;
    transition: all .1s ease-in-out;
  }
}
</style>
