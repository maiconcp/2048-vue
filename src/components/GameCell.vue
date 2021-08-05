<template>
  <div class="cell col-xs-3 col-md-3 mol-lg-3 d-table-cell align-middle text-center v-center padding-zero" >
    <div style="height:100%;width:100%;padding:0px;margin:0px;border-radius: 10px;" v-bind:style="{backgroundColor: getBackgoundColor()}" :class="getCellClass()" v-bind:style="{color: getColor()}">
      {{getValue()}}    
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameCell',
  props: {
    value: Number,
    newCell: Boolean,
    mergedCell: Boolean
  },
  methods: {
    isEmpty() {
      return this.value == 0;
    },
    getBackgoundColor(){
      if (this.value === 2) return "#f2e9e0";
      if (this.value === 4) return "#efe2cf";
      if (this.value === 8) return "#fda872";      
      if (this.value === 16) return "#fda872";      
      if (this.value === 32) return "#f77c5e";      
      if (this.value === 64) return "#ed623c";      
      if (this.value === 128) return "#f0c556";      
      if (this.value === 256) return "#edcd5e";      
      if (this.value === 512) return "#f0c556";      
      if (this.value === 1024) return "#fda872";      
      if (this.value === 2048) return "#fda872";      
            
      return "#d2c8be";
    },
    getColor(){
      if (this.value === 2) return "#807466";
      if (this.value === 4) return "#807466";

      return "#fff4ed";
    },
    getValue(){
      if (this.isEmpty()) return " ";

      return this.value;
    },
    getCellClass(){
      if (this.newCell === true) return "cell-new";
      if (this.mergedCell === true)  {
        return "cell-merged";
      }
      return "";
    },
    onMerged(){
      console.log("On-Merged");
    }
  }
}
</script>

<style>
.v-center{
    display: inline-block;
    vertical-align: middle;
    float: none;
}

@keyframes new-animation {
  from { 
    transform: scale(0.5);    
  }
  to {
    transform: scale(1)
  }
}

@keyframes merged-animation {
  from { 
    transform: scale(1.4);    
  }
  to {
    transform: scale(1)
  }
}

.cell-new {
  animation: new-animation 0.2s ease-in-out;
}

.cell-merged {
  animation: merged-animation 0.2s ease-in-out;
}

.padding-zero{
  padding: 0px !important;
}

</style>