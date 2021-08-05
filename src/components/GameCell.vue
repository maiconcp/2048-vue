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
      if (this.value === 2) return "#ddd6c4";
      if (this.value === 4) return "#e0d59d";
      if (this.value === 8) return "#e8c082";      
      if (this.value === 16) return "#eca378";   
      if (this.value === 32) return "#ee8c7f";      
      if (this.value === 64) return "#94caec";      
      if (this.value === 128) return "#f28be7";
      if (this.value === 256) return "#96d56c";      
      if (this.value === 512) return "#f0c556";      
      if (this.value === 1024) return "#c8d56c";      
      if (this.value === 2048) return "#65c559";      
            
      return "#d2c8be";
    },
    getColor(){
      return this.LightenDarkenColor(this.getBackgoundColor(), -100);
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
    LightenDarkenColor(col, amt) {      
        var usePound = false;      
        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
    
        var num = parseInt(col,16);    
        var r = (num >> 16) + amt;    

        if (r > 255) r = 255;
        else if  (r < 0) r = 0;
    
        var b = ((num >> 8) & 0x00FF) + amt;
    
        if (b > 255) b = 255;
        else if  (b < 0) b = 0;
    
        var g = (num & 0x0000FF) + amt;
    
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
    
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);      
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