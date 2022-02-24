import * as THREE from 'three'
import {BrightnessContrastShader} from '../three/examples/jsm/shaders/BrightnessContrastShader.js'
import {DRACOLoader} from '../three/examples/jsm/loaders/DRACOLoader.js'
import {EffectComposer} from '../three/examples/jsm/postprocessing/EffectComposer.js'
import {FilmPass} from '../three/examples/jsm/postprocessing/FilmPass.js'
import {GlitchPass} from '../three/examples/jsm/postprocessing/GlitchPass.js'
import {GLTFLoader} from '../three/examples/jsm/loaders/GLTFLoader.js'
import {Lensflare, LensflareElement} from '../three/examples/jsm/objects/Lensflare.js'
import {OrbitControls} from '../three/examples/jsm/controls/OrbitControls.js'
import {OutlinePass} from '../three/examples/jsm/postprocessing/OutlinePass.js'
import {RenderPass} from '../three/examples/jsm/postprocessing/RenderPass.js'
import {RGBShiftShader} from '../three/examples/jsm/shaders/RGBShiftShader.js'
import {ShaderPass} from '../three/examples/jsm/postprocessing/ShaderPass.js'
var sun_and_moon_position_r=1E3,earth_scale_r=100,cloud_scale_r=6436.8/6356.8*earth_scale_r,moon_scale_r=1737.2/6356.8*earth_scale_r,glb_and_sprite_position_r=8356.8/6356.8*earth_scale_r,sprite_scale_r=.25*(glb_and_sprite_position_r-earth_scale_r),camera_position_r=glb_and_sprite_position_r+sprite_scale_r,index=document.querySelector("#index"),scene=new THREE.Scene,perspective_camera=new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,.1,camera_position_r+sun_and_moon_position_r+moon_scale_r),
update$0=function(){perspective_camera.position.y=0;var a=Math.sign(perspective_camera.position.z)*Math.acos(perspective_camera.position.x/Math.hypot(perspective_camera.position.x,perspective_camera.position.z));perspective_camera.position.x=camera_position_r*Math.cos(a);perspective_camera.position.z=camera_position_r*Math.sin(a);perspective_camera.lookAt(.5*(earth_scale_r+glb_and_sprite_position_r)*Math.cos(a+d_theta),0,.5*(earth_scale_r+glb_and_sprite_position_r)*Math.sin(a+d_theta));requestAnimationFrame(update$0)},
d_theta=Math.acos(.5*(earth_scale_r+glb_and_sprite_position_r)/camera_position_r),theta=-90*Math.PI/180;perspective_camera.position.set(camera_position_r*Math.cos(theta),0,camera_position_r*Math.sin(theta));perspective_camera.lookAt(.5*(earth_scale_r+glb_and_sprite_position_r)*Math.cos(theta+d_theta),0,.5*(earth_scale_r+glb_and_sprite_position_r)*Math.sin(theta+d_theta));requestAnimationFrame(update$0);var web_gl_renderer=new THREE.WebGLRenderer({canvas:index,antialias:!0});
web_gl_renderer.setSize(window.devicePixelRatio*index.clientWidth,window.devicePixelRatio*index.clientHeight,!1);document.body.appendChild(web_gl_renderer.domElement);var objects={},effect_composer=new EffectComposer(web_gl_renderer);effect_composer.setSize(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,window.devicePixelRatio*web_gl_renderer.domElement.clientHeight);var render_pass=new RenderPass(scene,perspective_camera);objects.render_pass=render_pass;effect_composer.addPass(objects.render_pass);
var orbit_controls=new OrbitControls(perspective_camera,index);orbit_controls.enablePan=!1;orbit_controls.enableZoom=!1;orbit_controls.enableDamping=!0;orbit_controls.autoRotate=!0;
var texture_loader=new THREE.TextureLoader,texture=texture_loader.load("../resources/images/background.webp",function(){var a=new THREE.WebGLCubeRenderTarget(texture.image.height);a.fromEquirectangularTexture(web_gl_renderer,texture);objects.background=a.texture;scene.background=objects.background}),sun_light=new THREE.SpotLight(16772045,2),theta$1=90*Math.PI/180;sun_light.position.set(sun_and_moon_position_r*Math.cos(theta$1),0,sun_and_moon_position_r*Math.sin(theta$1));objects.sun_light=sun_light;
scene.add(objects.sun_light);
var texture_loader$2=new THREE.TextureLoader,texture_0=texture_loader$2.load("../resources/images/lensflare/lensflare_0.webp",function(){var a=texture_loader$2.load("../resources/images/lensflare/lensflare_1.webp",function(){var c=texture_loader$2.load("../resources/images/lensflare/lensflare_2.webp",function(){function f(){objects.lensflare.visible=.9>Math.random()?!0:!1;requestAnimationFrame(f)}var e=new Lensflare;e.addElement(new LensflareElement(texture_0,500,0,objects.sun_light.color));e.addElement(new LensflareElement(a,
1E3,.1,objects.sun_light.color));e.addElement(new LensflareElement(c,100,.5));e.addElement(new LensflareElement(c,120,.6));e.addElement(new LensflareElement(c,180,.9));e.addElement(new LensflareElement(c,100,1));objects.lensflare=e;objects.sun_light.add(objects.lensflare);requestAnimationFrame(f)})})}),texture_loader$3=new THREE.TextureLoader,texture$5=texture_loader$3.load("../resources/images/planets/earth.webp",function(){var a=texture_loader$3.load("../resources/images/planets/earth_normal.webp",
function(){var c=texture_loader$3.load("../resources/images/planets/earth_specular.webp",function(){var f=new THREE.SphereGeometry(earth_scale_r,32,32),e=new THREE.MeshPhongMaterial({map:texture$5,normalMap:a,specularMap:c});f=new THREE.Mesh(f,e);f.rotation.x=-23.4*Math.PI/180;objects.earth=f;scene.add(objects.earth);var d=texture_loader$3.load("../resources/images/planets/clouds.webp",function(){function h(){var l=k.getElapsedTime()%60;objects.cloud.rotation.y=2*Math.PI*l/60;requestAnimationFrame(h)}
var b=new THREE.SphereGeometry(cloud_scale_r,32,32),g=new THREE.MeshLambertMaterial({map:d,transparent:!0,side:THREE.DoubleSide});b=new THREE.Mesh(b,g);objects.cloud=b;objects.earth.add(objects.cloud);var k=new THREE.Clock;requestAnimationFrame(h)})})})}),texture_loader$6=new THREE.TextureLoader,theta$7=-90*Math.PI/180,texture$8=texture_loader$6.load("../resources/images/planets/moon.webp",function(){function a(){var d=e.getElapsedTime()%4;objects.moon.rotation.y=2*Math.PI*d/4;requestAnimationFrame(a)}
var c=new THREE.SphereGeometry(moon_scale_r),f=new THREE.MeshLambertMaterial({map:texture$8});c=new THREE.Mesh(c,f);c.position.set(sun_and_moon_position_r*Math.cos(theta$7),0,sun_and_moon_position_r*Math.sin(theta$7));objects.moon=c;scene.add(objects.moon);var e=new THREE.Clock;requestAnimationFrame(a)}),moon_light=new THREE.PointLight(16777215,2);moon_light.position.set(sun_and_moon_position_r*Math.cos(theta$7),0,sun_and_moon_position_r*Math.sin(theta$7));objects.moon_light=moon_light;scene.add(objects.moon_light);
var gltf_loader=new GLTFLoader,draco_loader=new DRACOLoader;draco_loader.setDecoderPath("./three/examples/js/libs/draco/");gltf_loader.setDRACOLoader(draco_loader);
gltf_loader.load("../resources/glb/bio.glb",function(a){function c(){var b=h.getElapsedTime()%4;objects.bio_glb.rotation.set(2*Math.PI*b/4,2*Math.PI*b/4,2*Math.PI*b/4);requestAnimationFrame(c)}var f=0*Math.PI/180;a.scene.position.set(glb_and_sprite_position_r*Math.cos(f),0,glb_and_sprite_position_r*Math.sin(f));objects.bio_glb=a.scene;scene.add(objects.bio_glb);var e=new OutlinePass(new THREE.Vector2(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,window.devicePixelRatio*web_gl_renderer.domElement.clientHeight),
scene,perspective_camera),d=new THREE.Raycaster;web_gl_renderer.domElement.addEventListener("pointermove",function(b){var g=[];d.setFromCamera(new THREE.Vector2(2*b.clientX/web_gl_renderer.domElement.clientWidth-1,-2*b.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);b=d.intersectObject(scene,!0);0<b.length&&b[0].object.parent.parent===objects.bio_glb&&g.push(objects.bio_glb);e.selectedObjects=g});objects.bio_outline_pass=e;effect_composer.addPass(objects.bio_outline_pass);var h=
new THREE.Clock;requestAnimationFrame(c)});var texture_loader$9=new THREE.TextureLoader,texture$10=texture_loader$9.load("../resources/images/bio.webp",function(){var a=new THREE.SpriteMaterial({map:texture$10});a=new THREE.Sprite(a);var c=0*Math.PI/180;a.position.set(glb_and_sprite_position_r*Math.cos(c),sprite_scale_r,glb_and_sprite_position_r*Math.sin(c));a.scale.set(sprite_scale_r,sprite_scale_r,sprite_scale_r);objects.bio_sprite=a;scene.add(objects.bio_sprite)}),raycaster=new THREE.Raycaster;
web_gl_renderer.domElement.addEventListener("click",function(a){raycaster.setFromCamera(new THREE.Vector2(2*a.clientX/web_gl_renderer.domElement.clientWidth-1,-2*a.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);a=raycaster.intersectObject(scene,!0);0<a.length&&("bio_glb"in objects&&a[0].object.parent.parent===objects.bio_glb||"bio_sprite"in objects&&a[0].object===objects.bio_sprite)&&(location="./bio.html")});var gltf_loader$11=new GLTFLoader,draco_loader$12=new DRACOLoader;
draco_loader$12.setDecoderPath("../three/examples/js/libs/draco/");gltf_loader$11.setDRACOLoader(draco_loader$12);
gltf_loader$11.load("../resources/glb/twitter.glb",function(a){function c(){var b=h.getElapsedTime()%4;objects.twitter_glb.rotation.set(2*Math.PI*b/4,2*Math.PI*b/4,2*Math.PI*b/4);requestAnimationFrame(c)}var f=90*Math.PI/180;a.scene.position.set(glb_and_sprite_position_r*Math.cos(f),0,glb_and_sprite_position_r*Math.sin(f));objects.twitter_glb=a.scene;scene.add(objects.twitter_glb);var e=new OutlinePass(new THREE.Vector2(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,window.devicePixelRatio*
web_gl_renderer.domElement.clientHeight),scene,perspective_camera),d=new THREE.Raycaster;web_gl_renderer.domElement.addEventListener("pointermove",function(b){var g=[];d.setFromCamera(new THREE.Vector2(2*b.clientX/web_gl_renderer.domElement.clientWidth-1,-2*b.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);b=d.intersectObject(scene,!0);0<b.length&&b[0].object.parent.parent===objects.twitter_glb&&g.push(objects.twitter_glb);e.selectedObjects=g});objects.twitter_outline_pass=
e;effect_composer.addPass(objects.twitter_outline_pass);var h=new THREE.Clock;requestAnimationFrame(c)});
var texture_loader$13=new THREE.TextureLoader,texture$14=texture_loader$13.load("../resources/images/twitter.webp",function(){var a=new THREE.SpriteMaterial({map:texture$14});a=new THREE.Sprite(a);var c=90*Math.PI/180;a.position.set(glb_and_sprite_position_r*Math.cos(c),sprite_scale_r,glb_and_sprite_position_r*Math.sin(c));a.scale.set(sprite_scale_r,sprite_scale_r,sprite_scale_r);objects.twitter_sprite=a;scene.add(objects.twitter_sprite)}),film_pass=new FilmPass;
film_pass.uniforms.sIntensity.value=.5;film_pass.uniforms.sCount.value=1E3;film_pass.uniforms.grayscale=!1;film_pass.enabled=!1;objects.film_pass=film_pass;effect_composer.addPass(objects.film_pass);var raycaster$15=new THREE.Raycaster;
web_gl_renderer.domElement.addEventListener("click",function(a){raycaster$15.setFromCamera(new THREE.Vector2(2*a.clientX/web_gl_renderer.domElement.clientWidth-1,-2*a.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);a=raycaster$15.intersectObject(scene,!0);0<a.length&&("twitter_glb"in objects&&a[0].object.parent.parent===objects.twitter_glb||"twitter_sprite"in objects&&a[0].object===objects.twitter_sprite)&&(window.open("https://twitter.com/mcpu3_kei/"),objects.film_pass.enabled=
!0)});var gltf_loader$16=new GLTFLoader,draco_loader$17=new DRACOLoader;draco_loader$17.setDecoderPath("../three/examples/js/libs/draco/");gltf_loader$16.setDRACOLoader(draco_loader$17);
gltf_loader$16.load("../resources/glb/github.glb",function(a){function c(){var b=h.getElapsedTime()%4;objects.github_glb.rotation.set(2*Math.PI*b/4,2*Math.PI*b/4,2*Math.PI*b/4);requestAnimationFrame(c)}var f=180*Math.PI/180;a.scene.position.set(glb_and_sprite_position_r*Math.cos(f),0,glb_and_sprite_position_r*Math.sin(f));objects.github_glb=a.scene;scene.add(objects.github_glb);var e=new OutlinePass(new THREE.Vector2(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,window.devicePixelRatio*
web_gl_renderer.domElement.clientHeight),scene,perspective_camera),d=new THREE.Raycaster;web_gl_renderer.domElement.addEventListener("pointermove",function(b){var g=[];d.setFromCamera(new THREE.Vector2(2*b.clientX/web_gl_renderer.domElement.clientWidth-1,-2*b.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);b=d.intersectObject(scene,!0);0<b.length&&b[0].object.parent.parent===objects.github_glb&&g.push(objects.github_glb);e.selectedObjects=g});objects.github_outline_pass=e;effect_composer.addPass(objects.github_outline_pass);
var h=new THREE.Clock;requestAnimationFrame(c)});
var texture_loader$18=new THREE.TextureLoader,texture$19=texture_loader$18.load("../resources/images/github.webp",function(){var a=new THREE.SpriteMaterial({map:texture$19});a=new THREE.Sprite(a);var c=180*Math.PI/180;a.position.set(glb_and_sprite_position_r*Math.cos(c),sprite_scale_r,glb_and_sprite_position_r*Math.sin(c));a.scale.set(sprite_scale_r,sprite_scale_r,sprite_scale_r);objects.github_sprite=a;scene.add(objects.github_sprite)}),shader_pass_rgb_shift_shader=new ShaderPass(RGBShiftShader);
shader_pass_rgb_shift_shader.enabled=!1;objects.shader_pass_rgb_shift_shader=shader_pass_rgb_shift_shader;effect_composer.addPass(objects.shader_pass_rgb_shift_shader);var raycaster$20=new THREE.Raycaster;
web_gl_renderer.domElement.addEventListener("click",function(a){raycaster$20.setFromCamera(new THREE.Vector2(2*a.clientX/window.innerWidth-1,-2*a.clientY/window.innerHeight+1),perspective_camera);a=raycaster$20.intersectObject(scene,!0);if(0<a.length&&("github_glb"in objects&&a[0].object.parent.parent===objects.github_glb||"github_sprite"in objects&&a[0].object===objects.github_sprite)){var c=function(){objects.shader_pass_rgb_shift_shader.enabled=.1>Math.random()?!0:!1;requestAnimationFrame(c)};
window.open("https://github.com/Mcpu3/");requestAnimationFrame(c)}});var gltf_loader$22=new GLTFLoader,draco_loader$23=new DRACOLoader;draco_loader$23.setDecoderPath("../three/examples/js/libs/draco/");gltf_loader$22.setDRACOLoader(draco_loader$23);
gltf_loader$22.load("../resources/glb/easteregg.glb",function(a){function c(){var b=h.getElapsedTime()%4;objects.easteregg_glb.rotation.set(2*Math.PI*b/4,2*Math.PI*b/4,2*Math.PI*b/4);requestAnimationFrame(c)}var f=270*Math.PI/180;a.scene.position.set(glb_and_sprite_position_r*Math.cos(f),0,glb_and_sprite_position_r*Math.sin(f));objects.easteregg_glb=a.scene;scene.add(objects.easteregg_glb);var e=new OutlinePass(new THREE.Vector2(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,window.devicePixelRatio*
web_gl_renderer.domElement.clientHeight),scene,perspective_camera),d=new THREE.Raycaster;web_gl_renderer.domElement.addEventListener("pointermove",function(b){var g=[];d.setFromCamera(new THREE.Vector2(2*b.clientX/web_gl_renderer.domElement.clientWidth-1,-2*b.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);b=d.intersectObject(scene,!0);0<b.length&&b[0].object.parent.parent===objects.easteregg_glb&&g.push(objects.easteregg_glb);e.selectedObjects=g});objects.easteregg_outline_pass=
e;effect_composer.addPass(objects.easteregg_outline_pass);var h=new THREE.Clock;requestAnimationFrame(c)});
var texture_loader$24=new THREE.TextureLoader,texture$25=texture_loader$24.load("../resources/images/easteregg.webp",function(){var a=new THREE.SpriteMaterial({map:texture$25});a=new THREE.Sprite(a);var c=270*Math.PI/180;a.position.set(glb_and_sprite_position_r*Math.cos(c),sprite_scale_r,glb_and_sprite_position_r*Math.sin(c));a.scale.set(sprite_scale_r,sprite_scale_r,sprite_scale_r);objects.easteregg_sprite=a;scene.add(objects.easteregg_sprite)}),clicked=!1,raycaster$26=new THREE.Raycaster;
web_gl_renderer.domElement.addEventListener("click",function(a){function c(){var d=e.getElapsedTime();0<=d&&.2>d?(objects.earth.visible=!1,objects.earth_wireframe.visible=!0):.2<=d&&.3>d?(objects.earth.visible=!0,objects.earth_wireframe.visible=!1):.3<=d&&.4>d?(objects.earth.visible=!1,objects.earth_wireframe.visible=!0):.4<=d&&4>d?(objects.earth.visible=!0,objects.earth_wireframe.visible=!1):(objects.glitch_pass.goWild=!0,objects.shader_pass_brightness_contrast.enabled=!0,.1>Math.random()?(objects.earth.visible=
!1,objects.earth_wireframe.visible=!0):(objects.earth.visible=!0,objects.earth_wireframe.visible=!1));0<=d&&.5>d?(objects.easteregg_glb.scale.set(Math.cos(d*Math.PI),Math.cos(d*Math.PI),Math.cos(d*Math.PI)),objects.easteregg_sprite.scale.set(sprite_scale_r*Math.cos(d*Math.PI),sprite_scale_r*Math.cos(d*Math.PI),sprite_scale_r*Math.cos(d*Math.PI))):(objects.easteregg_glb.visible=!1,objects.easteregg_sprite.visible=!1);requestAnimationFrame(c)}raycaster$26.setFromCamera(new THREE.Vector2(2*a.clientX/
web_gl_renderer.domElement.clientWidth-1,-2*a.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);a=raycaster$26.intersectObject(scene,!0);if(0<a.length&&("easteregg_glb"in objects&&a[0].object.parent.parent===objects.easteregg_glb||"easteregg_sprite"in objects&&a[0].object===objects.easteregg_sprite)&&"earth"in objects&&"easteregg_glb"in objects&&"easteregg_sprite"in objects&&!clicked){clicked=!0;a=new GlitchPass;objects.glitch_pass=a;effect_composer.addPass(objects.glitch_pass);
a=new ShaderPass(BrightnessContrastShader);a.uniforms.brightness.value=-.5;a.enabled=!1;objects.shader_pass_brightness_contrast=a;effect_composer.addPass(objects.shader_pass_brightness_contrast);a=new THREE.WireframeGeometry(objects.earth.geometry);var f=new THREE.LineBasicMaterial;a=new THREE.LineSegments(a,f);a.rotation.z=-23.4*Math.PI/180;a.visible=!1;objects.earth_wireframe=a;scene.add(objects.earth_wireframe);var e=new THREE.Clock;requestAnimationFrame(c)}});objects.natural_satellites=[];
for(var sphere_buffer_geometry=new THREE.SphereBufferGeometry(3,3,3),i=0;1E3>i;i++){var mesh_phong_material=new THREE.MeshPhongMaterial({color:6710886,flatShading:!0}),natural_satellite=new THREE.Mesh(sphere_buffer_geometry,mesh_phong_material),r=.5*(sun_and_moon_position_r-camera_position_r)*Math.random()+.5*(sun_and_moon_position_r-camera_position_r)+camera_position_r,theta$27=2*Math.PI*Math.random(),phi=2*Math.PI*Math.random();natural_satellite.position.set(r*Math.sin(theta$27)*Math.cos(phi),r*
Math.sin(theta$27)*Math.sin(phi),r*Math.cos(theta$27));natural_satellite.rotation.set(2*Math.PI*Math.random(),2*Math.PI*Math.random(),2*Math.PI*Math.random());natural_satellite.scale.x=natural_satellite.scale.y=natural_satellite.scale.z=Math.random();objects.natural_satellites.push(natural_satellite);scene.add(natural_satellite)}
function update(){if(web_gl_renderer.domElement.width!==web_gl_renderer.domElement.clientWidth||web_gl_renderer.domElement.height!==web_gl_renderer.domElement.clientHeight){web_gl_renderer.setSize(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,window.devicePixelRatio*web_gl_renderer.domElement.clientHeight,!1);var a=!0}else a=!1;a&&(perspective_camera.aspect=web_gl_renderer.domElement.clientWidth/web_gl_renderer.domElement.clientHeight,perspective_camera.updateProjectionMatrix());
effect_composer.setSize(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,window.devicePixelRatio*web_gl_renderer.domElement.clientHeight);web_gl_renderer.render(scene,perspective_camera);effect_composer.render();orbit_controls.update();requestAnimationFrame(update)}requestAnimationFrame(update);