import * as THREE from '../build/three.module.js'
import {BrightnessContrastShader} from '../examples/jsm/shaders/BrightnessContrastShader.js'
import {EffectComposer} from '../examples/jsm/postprocessing/EffectComposer.js'
import {FilmPass} from '../examples/jsm/postprocessing/FilmPass.js'
import {GlitchPass} from '../examples/jsm/postprocessing/GlitchPass.js'
import {GLTFLoader} from '../examples/jsm/loaders/GLTFLoader.js'
import {Lensflare, LensflareElement} from '../examples/jsm/objects/Lensflare.js'
import {OrbitControls} from '../examples/jsm/controls/OrbitControls.js'
import {OutlinePass} from '../examples/jsm/postprocessing/OutlinePass.js'
import {RenderPass} from '../examples/jsm/postprocessing/RenderPass.js'
import {RGBShiftShader} from '../examples/jsm/shaders/RGBShiftShader.js'
import {ShaderPass} from '../examples/jsm/postprocessing/ShaderPass.js'
var sun_and_moon_position_r=1E3,earth_scale_r=100,cloud_scale_r=6436.8/6356.8*earth_scale_r,moon_scale_r=1737.2/6356.8*earth_scale_r,glb_and_sprite_position_r=8356.8/6356.8*earth_scale_r,sprite_scale_r=.2*(glb_and_sprite_position_r-earth_scale_r),camera_position_r=glb_and_sprite_position_r+sprite_scale_r,index=document.querySelector("#index"),scene=new THREE.Scene,perspective_camera=new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,.1,camera_position_r+sun_and_moon_position_r+moon_scale_r),
update$0=function(){perspective_camera.position.y=0;var a=Math.sign(perspective_camera.position.z)*Math.acos(perspective_camera.position.x/Math.hypot(perspective_camera.position.x,perspective_camera.position.z));perspective_camera.position.x=camera_position_r*Math.cos(a);perspective_camera.position.z=camera_position_r*Math.sin(a);perspective_camera.lookAt(.5*(earth_scale_r+glb_and_sprite_position_r)*Math.cos(a+d_theta),0,.5*(earth_scale_r+glb_and_sprite_position_r)*Math.sin(a+d_theta));requestAnimationFrame(update$0)},
d_theta=Math.acos(.5*(earth_scale_r+glb_and_sprite_position_r)/camera_position_r),theta=-90*Math.PI/180;perspective_camera.position.set(camera_position_r*Math.cos(theta),0,camera_position_r*Math.sin(theta));perspective_camera.lookAt(.5*(earth_scale_r+glb_and_sprite_position_r)*Math.cos(theta+d_theta),0,.5*(earth_scale_r+glb_and_sprite_position_r)*Math.sin(theta+d_theta));requestAnimationFrame(update$0);var web_gl_renderer=new THREE.WebGLRenderer({canvas:index,antialias:!0});
web_gl_renderer.setSize(window.devicePixelRatio*index.clientWidth,window.devicePixelRatio*index.clientHeight,!1);document.body.appendChild(web_gl_renderer.domElement);var objects={},effect_composer=new EffectComposer(web_gl_renderer);effect_composer.setSize(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,window.devicePixelRatio*web_gl_renderer.domElement.clientHeight);var render_pass=new RenderPass(scene,perspective_camera);objects.render_pass=render_pass;effect_composer.addPass(render_pass);
var orbit_controls=new OrbitControls(perspective_camera,index);orbit_controls.enablePan=!1;orbit_controls.enableZoom=!1;orbit_controls.enableDamping=!0;orbit_controls.autoRotate=!0;
var texture_loader=new THREE.TextureLoader,texture=texture_loader.load("../resources/images/background.jpg",function(){var a=new THREE.WebGLCubeRenderTarget(texture.image.height);a.fromEquirectangularTexture(web_gl_renderer,texture);objects.background=a.texture;scene.background=a.texture}),sun_light=new THREE.PointLight(16772045,2),theta$1=90*Math.PI/180;sun_light.position.set(sun_and_moon_position_r*Math.cos(theta$1),0,sun_and_moon_position_r*Math.sin(theta$1));objects.sun_light=sun_light;scene.add(sun_light);
var texture_loader$2=new THREE.TextureLoader,texture_0=texture_loader$2.load("../examples/textures/lensflare/lensflare0.png",function(){var a=texture_loader$2.load("../examples/textures/lensflare/lensflare2.png",function(){var c=texture_loader$2.load("../examples/textures/lensflare/lensflare3.png",function(){function f(){objects.lensflare.visible=.9>Math.random()?!0:!1;requestAnimationFrame(f)}var d=new Lensflare;d.addElement(new LensflareElement(texture_0,500,0,objects.sun_light.color));d.addElement(new LensflareElement(a,
1E3,.1,objects.sun_light.color));d.addElement(new LensflareElement(c,100,.5));d.addElement(new LensflareElement(c,120,.6));d.addElement(new LensflareElement(c,180,.9));d.addElement(new LensflareElement(c,100,1));objects.lensflare=d;objects.sun_light.add(d);requestAnimationFrame(f)})})}),texture_loader$3=new THREE.TextureLoader,texture$5=texture_loader$3.load("../resources/images/earth.jpg",function(){var a=new THREE.SphereGeometry(earth_scale_r,32,32),c=new THREE.MeshLambertMaterial({map:texture$5});
a=new THREE.Mesh(a,c);a.rotation.x=-23.4*Math.PI/180;objects.earth=a;scene.add(a);var f=texture_loader$3.load("../examples/textures/planets/earth_clouds_1024.png",function(){function d(){60<=e.getElapsedTime()&&e.start();var h=e.getElapsedTime();objects.cloud.rotation.y=2*Math.PI*h/60;requestAnimationFrame(d)}var g=new THREE.SphereGeometry(cloud_scale_r,32,32),b=new THREE.MeshLambertMaterial({map:f,transparent:!0,side:THREE.DoubleSide});g=new THREE.Mesh(g,b);objects.cloud=g;objects.earth.add(g);var e=
new THREE.Clock;requestAnimationFrame(d)})}),texture_loader$6=new THREE.TextureLoader,theta$7=-90*Math.PI/180,texture$8=texture_loader$6.load("../examples/textures/planets/moon_1024.jpg",function(){function a(){4<=d.getElapsedTime()&&d.start();var g=d.getElapsedTime();objects.moon.rotation.y=2*Math.PI*g/4;requestAnimationFrame(a)}var c=new THREE.SphereGeometry(moon_scale_r),f=new THREE.MeshLambertMaterial({map:texture$8});c=new THREE.Mesh(c,f);c.position.set(sun_and_moon_position_r*Math.cos(theta$7),
0,sun_and_moon_position_r*Math.sin(theta$7));objects.moon=c;scene.add(c);var d=new THREE.Clock;requestAnimationFrame(a)}),moon_light=new THREE.PointLight(16777215,2);moon_light.position.set(sun_and_moon_position_r*Math.cos(theta$7),0,sun_and_moon_position_r*Math.sin(theta$7));objects.moon_light=moon_light;scene.add(moon_light);var gltf_loader=new GLTFLoader;
gltf_loader.load("../resources/glb/sentinel6.glb",function(a){function c(){4<=g.getElapsedTime()&&g.start();var b=g.getElapsedTime();objects.bio_glb.rotation.set(2*Math.PI*b/4,2*Math.PI*b/4,2*Math.PI*b/4);requestAnimationFrame(c)}var f=0*Math.PI/180;a.scene.position.set(glb_and_sprite_position_r*Math.cos(f),0,glb_and_sprite_position_r*Math.sin(f));objects.bio_glb=a.scene;scene.add(a.scene);var d=new OutlinePass(new THREE.Vector2(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,window.devicePixelRatio*
web_gl_renderer.domElement.clientHeight),scene,perspective_camera);web_gl_renderer.domElement.addEventListener("pointermove",function(b){var e=new THREE.Raycaster;e.setFromCamera(new THREE.Vector2(2*b.clientX/web_gl_renderer.domElement.clientWidth-1,-2*b.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);b=[];e=e.intersectObject(scene,!0);0<e.length&&e[0].object.parent.parent==a.scene&&b.push(e[0].object);d.selectedObjects=b});objects.bio_outline_pass=d;effect_composer.addPass(d);
var g=new THREE.Clock;requestAnimationFrame(c)});var texture_loader$9=new THREE.TextureLoader,texture$10=texture_loader$9.load("../resources/images/bio.jpg",function(){var a=new THREE.SpriteMaterial({map:texture$10});a=new THREE.Sprite(a);var c=0*Math.PI/180;a.position.set(glb_and_sprite_position_r*Math.cos(c),sprite_scale_r,glb_and_sprite_position_r*Math.sin(c));a.scale.set(sprite_scale_r,sprite_scale_r,sprite_scale_r);objects.bio_sprite=a;scene.add(a)});
web_gl_renderer.domElement.addEventListener("click",function(a){var c=new THREE.Raycaster;c.setFromCamera(new THREE.Vector2(2*a.clientX/web_gl_renderer.domElement.clientWidth-1,-2*a.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);a=c.intersectObject(scene,!0);0<a.length&&("bio_glb"in objects&&a[0].object.parent.parent==objects.bio_glb||"bio_sprite"in objects&&a[0].object==objects.bio_sprite)&&(location="./bio.html")});var gltf_loader$11=new GLTFLoader;
gltf_loader$11.load("../resources/glb/icesat2.glb",function(a){function c(){4<=g.getElapsedTime()&&g.start();var b=g.getElapsedTime();objects.twitter_glb.rotation.set(2*Math.PI*b/4,2*Math.PI*b/4,2*Math.PI*b/4);requestAnimationFrame(c)}var f=90*Math.PI/180;a.scene.position.set(glb_and_sprite_position_r*Math.cos(f),0,glb_and_sprite_position_r*Math.sin(f));objects.twitter_glb=a.scene;scene.add(a.scene);var d=new OutlinePass(new THREE.Vector2(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,
window.devicePixelRatio*web_gl_renderer.domElement.clientHeight),scene,perspective_camera);web_gl_renderer.domElement.addEventListener("pointermove",function(b){var e=new THREE.Raycaster;e.setFromCamera(new THREE.Vector2(2*b.clientX/web_gl_renderer.domElement.clientWidth-1,-2*b.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);b=[];e=e.intersectObject(scene,!0);0<e.length&&e[0].object.parent.parent==a.scene&&b.push(e[0].object);d.selectedObjects=b});objects.twitter_outline_pass=
d;effect_composer.addPass(d);var g=new THREE.Clock;requestAnimationFrame(c)});
var texture_loader$12=new THREE.TextureLoader,texture$13=texture_loader$12.load("../resources/images/twitter.png",function(){var a=new THREE.SpriteMaterial({map:texture$13});a=new THREE.Sprite(a);var c=90*Math.PI/180;a.position.set(glb_and_sprite_position_r*Math.cos(c),sprite_scale_r,glb_and_sprite_position_r*Math.sin(c));a.scale.set(sprite_scale_r,sprite_scale_r,sprite_scale_r);objects.twitter_sprite=a;scene.add(a)}),film_pass=new FilmPass;film_pass.uniforms.sIntensity.value=.5;
film_pass.uniforms.sCount.value=1E3;film_pass.uniforms.grayscale=!1;film_pass.enabled=!1;objects.film_pass=film_pass;effect_composer.addPass(film_pass);
web_gl_renderer.domElement.addEventListener("click",function(a){var c=new THREE.Raycaster;c.setFromCamera(new THREE.Vector2(2*a.clientX/web_gl_renderer.domElement.clientWidth-1,-2*a.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);a=c.intersectObject(scene,!0);0<a.length&&("twitter_glb"in objects&&a[0].object.parent.parent==objects.twitter_glb||"twitter_sprite"in objects&&a[0].object==objects.twitter_sprite)&&(window.open("https://twitter.com/mcpu3_kei/"),objects.film_pass.enabled=
!0)});var gltf_loader$14=new GLTFLoader;
gltf_loader$14.load("../resources/glb/cloudsat.glb",function(a){function c(){4<=g.getElapsedTime()&&g.start();var b=g.getElapsedTime();objects.github_glb.rotation.set(2*Math.PI*b/4,2*Math.PI*b/4,2*Math.PI*b/4);requestAnimationFrame(c)}var f=180*Math.PI/180;a.scene.position.set(glb_and_sprite_position_r*Math.cos(f),0,glb_and_sprite_position_r*Math.sin(f));objects.github_glb=a.scene;scene.add(a.scene);var d=new OutlinePass(new THREE.Vector2(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,
window.devicePixelRatio*web_gl_renderer.domElement.clientHeight),scene,perspective_camera);web_gl_renderer.domElement.addEventListener("pointermove",function(b){var e=new THREE.Raycaster;e.setFromCamera(new THREE.Vector2(2*b.clientX/web_gl_renderer.domElement.clientWidth-1,-2*b.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);b=[];e=e.intersectObject(scene,!0);0<e.length&&e[0].object.parent.parent==a.scene&&b.push(e[0].object);d.selectedObjects=b});objects.github_outline_pass=
d;effect_composer.addPass(d);var g=new THREE.Clock;requestAnimationFrame(c)});
var texture_loader$15=new THREE.TextureLoader,texture$16=texture_loader$15.load("../resources/images/github.png",function(){var a=new THREE.SpriteMaterial({map:texture$16});a=new THREE.Sprite(a);var c=180*Math.PI/180;a.position.set(glb_and_sprite_position_r*Math.cos(c),sprite_scale_r,glb_and_sprite_position_r*Math.sin(c));a.scale.set(sprite_scale_r,sprite_scale_r,sprite_scale_r);objects.github_sprite=a;scene.add(a)}),clicked=!1;
web_gl_renderer.domElement.addEventListener("click",function(a){var c=new THREE.Raycaster;c.setFromCamera(new THREE.Vector2(2*a.clientX/window.innerWidth-1,-2*a.clientY/window.innerHeight+1),perspective_camera);a=c.intersectObject(scene,!0);if(0<a.length&&("github_glb"in objects&&a[0].object.parent.parent==objects.github_glb||"github_sprite"in objects&&a[0].object==objects.github_sprite)){var f=function(){objects.shader_pass_rgb_shift_shader.enabled=.1>Math.random()?!0:!1;requestAnimationFrame(f)};
window.open("https://github.com/Mcpu3/");clicked||(clicked=!0,a=new ShaderPass(RGBShiftShader),a.enabled=!1,objects.shader_pass_rgb_shift_shader=a,effect_composer.addPass(a),requestAnimationFrame(f))}});var gltf_loader$18=new GLTFLoader;
gltf_loader$18.load("../resources/glb/mkiii.glb",function(a){function c(){4<=g.getElapsedTime()&&g.start();var b=g.getElapsedTime();objects.easteregg_glb.rotation.set(2*Math.PI*b/4,2*Math.PI*b/4,2*Math.PI*b/4);requestAnimationFrame(c)}var f=270*Math.PI/180;a.scene.position.set(glb_and_sprite_position_r*Math.cos(f),0,glb_and_sprite_position_r*Math.sin(f));objects.easteregg_glb=a.scene;scene.add(a.scene);var d=new OutlinePass(new THREE.Vector2(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,
window.devicePixelRatio*web_gl_renderer.domElement.clientHeight),scene,perspective_camera);web_gl_renderer.domElement.addEventListener("pointermove",function(b){var e=new THREE.Raycaster;e.setFromCamera(new THREE.Vector2(2*b.clientX/web_gl_renderer.domElement.clientWidth-1,-2*b.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);b=[];e=e.intersectObject(scene,!0);0<e.length&&e[0].object.parent.parent==a.scene&&b.push(e[0].object);d.selectedObjects=b});objects.easteregg_outline_pass=
d;effect_composer.addPass(d);var g=new THREE.Clock;requestAnimationFrame(c)});
var texture_loader$19=new THREE.TextureLoader,texture$20=texture_loader$19.load("../resources/images/easteregg.jpg",function(){var a=new THREE.SpriteMaterial({map:texture$20});a=new THREE.Sprite(a);var c=270*Math.PI/180;a.position.set(glb_and_sprite_position_r*Math.cos(c),sprite_scale_r,glb_and_sprite_position_r*Math.sin(c));a.scale.set(sprite_scale_r,sprite_scale_r,sprite_scale_r);objects.easteregg_sprite=a;scene.add(a)}),clicked$21=!1;
web_gl_renderer.domElement.addEventListener("click",function(a){function c(){var b=g.getElapsedTime();0<=b&&.5>b?(objects.easteregg_glb.scale.set(Math.cos(b*Math.PI),Math.cos(b*Math.PI),Math.cos(b*Math.PI)),objects.easteregg_sprite.scale.set(sprite_scale_r*Math.cos(b*Math.PI),sprite_scale_r*Math.cos(b*Math.PI),sprite_scale_r*Math.cos(b*Math.PI))):(objects.easteregg_glb.visible=!1,objects.easteregg_sprite.visible=!1);0<=b&&.2>b?(objects.earth.visible=!1,objects.earth_wireframe.visible=!0):.2<=b&&.3>
b?(objects.earth.visible=!0,objects.earth_wireframe.visible=!1):.3<=b&&.4>b?(objects.earth.visible=!1,objects.earth_wireframe.visible=!0):(objects.earth.visible=!0,objects.earth_wireframe.visible=!1);4<=b&&(d.goWild=!0,objects.shader_pass_brightness_contrast.enabled=!0,.1>Math.random()?(objects.earth.visible=!1,objects.earth_wireframe.visible=!0):(objects.earth.visible=!0,objects.earth_wireframe.visible=!1));requestAnimationFrame(c)}var f=new THREE.Raycaster;f.setFromCamera(new THREE.Vector2(2*a.clientX/
web_gl_renderer.domElement.clientWidth-1,-2*a.clientY/web_gl_renderer.domElement.clientHeight+1),perspective_camera);a=f.intersectObject(scene,!0);if(0<a.length&&("easteregg_glb"in objects&&a[0].object.parent.parent==objects.easteregg_glb||"easteregg_sprite"in objects&&a[0].object==objects.easteregg_sprite)&&"earth"in objects&&!clicked$21){clicked$21=!0;a=new THREE.WireframeGeometry(objects.earth.geometry);f=new THREE.LineBasicMaterial;a=new THREE.LineSegments(a,f);a.rotation.z=-23.4*Math.PI/180;
a.visible=!1;objects.earth_wireframe=a;scene.add(a);var d=new GlitchPass;objects.glitch_pass=d;effect_composer.addPass(d);a=new ShaderPass(BrightnessContrastShader);a.uniforms.brightness.value=-.5;a.enabled=!1;objects.shader_pass_brightness_contrast=a;effect_composer.addPass(a);var g=new THREE.Clock;requestAnimationFrame(c)}});objects.natural_satellites=[];
for(var sphere_buffer_geometry=new THREE.SphereBufferGeometry(3,3,3),i=0;1E3>i;i++){var mesh_phong_material=new THREE.MeshPhongMaterial({color:6710886,flatShading:!0}),natural_satellite=new THREE.Mesh(sphere_buffer_geometry,mesh_phong_material),r=.5*(sun_and_moon_position_r-camera_position_r)*Math.random()+.5*(sun_and_moon_position_r-camera_position_r)+camera_position_r,theta$22=2*Math.PI*Math.random(),phi=2*Math.PI*Math.random();natural_satellite.position.set(r*Math.sin(theta$22)*Math.cos(phi),r*
Math.sin(theta$22)*Math.sin(phi),r*Math.cos(theta$22));natural_satellite.rotation.set(2*Math.PI*Math.random(),2*Math.PI*Math.random(),2*Math.PI*Math.random());natural_satellite.scale.x=natural_satellite.scale.y=natural_satellite.scale.z=Math.random();objects.natural_satellites.push(natural_satellite);scene.add(natural_satellite)}
function update(){if(web_gl_renderer.domElement.width!==web_gl_renderer.domElement.clientWidth||web_gl_renderer.domElement.height!==web_gl_renderer.domElement.clientHeight){web_gl_renderer.setSize(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,window.devicePixelRatio*web_gl_renderer.domElement.clientHeight,!1);var a=!0}else a=!1;a&&(perspective_camera.aspect=web_gl_renderer.domElement.clientWidth/web_gl_renderer.domElement.clientHeight,perspective_camera.updateProjectionMatrix());
effect_composer.setSize(window.devicePixelRatio*web_gl_renderer.domElement.clientWidth,window.devicePixelRatio*web_gl_renderer.domElement.clientHeight);web_gl_renderer.render(scene,perspective_camera);effect_composer.render();orbit_controls.update();requestAnimationFrame(update)}requestAnimationFrame(update);