import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Theme from "./Theme.js";
import Controls from "./World/Controls.js";
import World from "./World/World.js"
//import Navbar from "./Navbar.js";
import Preloader from "./Preloader.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/Assets.js";


export default class Experience{
  static instance
  constructor(canvas) {
    if ( Experience.instance){
      return Experience.instance
    }
    Experience.instance = this
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    //this.navbar = new Navbar();
    this.theme = new Theme();
    this.world = new World();
    this.preloader = new Preloader();

    this.preloader.on("enablecontrols", () => {
      this.controls = new Controls();
    })
    
    this.sizes.on("resize", ()=>{
      this.resize();
    });

    this.time.on("update", ()=>{
      this.update();
    });
  }

  resize(){
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }

  update(){
    this.preloader.update();
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
  
}