<template>
  <div class="home">
    <div class="board-container">
      <Board ref="board" @generationsUpdate="handleGenerationUpdate" :dimensions="dimensions" :speed="speed"/>
    </div>
    <div class="controls">
      <button @click="start" :class="{ disabled: running }">Start</button>
      <button @click="pause" :class="{ disabled: !running }">Pause</button>
      <button @click="clear">Clear</button>
      <div class="input-group">
        <button @click="random" :class="{ disabled: running }">Random</button>
        <input type="number" v-model="randomPercent" :class="{ disabled: running }" />
      </div>
      <div class="input-group">
        <button @click="setWidth" :class="{ disabled: running }">Set Width</button>
        <input type="number" v-model="dimensions.width" :class="{ disabled: running }" />
      </div>
      <div class="input-group">
        <button @click="setHeight" :class="{ disabled: running }">Set Height</button>
        <input type="number" v-model="dimensions.height" :class="{ disabled: running }" />
      </div>
      <div class="input-group">
        <button :class="{ disabled: running }">Set Speed</button>
        <input type="number" v-model="speed" :class="{ disabled: running }" />
      </div>
    </div>
    <div>Generation: {{ generations }}</div>
  </div>
</template>

<script>
import Board from '@/components/Board.vue';

export default {
  name: 'home',
  data() {
    return {
      dimensions: { width: 50, height: 25 },
      generations: 0,
      running: false,
      randomPercent: 80,
      speed: 250,
    };
  },
  components: {
    Board,
  },
  methods: {
    start() {
      this.$refs.board.start();
      this.running = true;
    },
    pause() {
      this.$refs.board.pause();
      this.running = false;
    },
    clear() {
      this.$refs.board.clear();
      this.running = false;
    },
    random() {
      this.$refs.board.random(this.randomPercent);
    },
    setWidth() {
      this.$refs.board.setWidth(this.dimensions.width);
    },
    setHeight() {
      this.$refs.board.setHeight(this.dimensions.height);
    },
    handleGenerationUpdate(generations) {
      this.generations = generations;
    }
  },
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .controls {
    margin: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    outline: none;
    border: 1px solid #0984e3;
    color: #0984e3;
    background-color: #fff;
    padding: 8px 16px;
    border-radius: 4px;
    margin: 5px;
    transition: all .1s ease-in-out;

    &:hover {
      cursor: pointer;
      border: 1px solid #0973c5;
      color: #0973c5;
      background-color: #fbfbfb;
      transition: all .1s ease-in-out;
    }

    &.disabled {
      cursor: unset;
      pointer-events: none;
      border: 1px solid #b2bec3;
      color: #b2bec3;
      transition: all .1s ease-in-out;
    }
  }

  input {
    outline: none;
    border: 1px solid #0984e3;
    color: #0984e3;
    padding: 8px;
    border-radius: 4px;
    width: 50px;

    &.disabled {
      cursor: unset;
      pointer-events: none;
      border: 1px solid #b2bec3;
      color: #b2bec3;
      transition: all .1s ease-in-out;
    }
  }

  .input-group {
    margin: 5px;

    button {
      margin: 0;
      border-radius: 4px 0 0 4px;
      border-right: none;
    }

    input {
      border-radius: 0 4px 4px 0;
      border-left: 1px solid #0984e3;

      &.disabled {
        border: 1px solid #b2bec3;
        transition: all .1s ease-in-out;
      }
    }
  }

  .board-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #0984e3;
  }
}
</style>
