import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class ResponsiveMixin extends Vue {
  isMobile: boolean = false;

  mounted() {
    checkResolution.call(this);

    window.addEventListener("resize", checkResolution.bind(this));
  }
}

function checkResolution(this: ResponsiveMixin) {
  this.isMobile = window.innerWidth < 480;
}
