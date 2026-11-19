import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{D as t,_ as n,d as r,f as i,h as a,m as o}from"./vendor-3d-B5WhV1Bj.js";import{a as s,g as c}from"./vendor-react-B4ifrALW.js";import{w as l}from"./Label-pmD9rofU.js";var u=e(c(),1),d=s(),f=`
attribute float aCls;
attribute float aMask;
uniform float uSize;
uniform float uHi;
varying float vCls;
void main() {
  vCls = aCls;
  float hi = abs(float(gl_VertexID) - uHi) < 0.5 ? 1.5 : 1.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aMask > 0.01 ? uSize * hi * aMask : 0.0;
}`,p=`
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uEdge;
uniform float uHollow;
varying float vCls;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float d = vCls < 0.5 ? length(p) : max(abs(p.x), abs(p.y)) * 1.12;
  float aa = fwidth(d) * 1.2;
  float alpha = 1.0 - smoothstep(1.0 - aa, 1.0, d);
  if (alpha <= 0.0) discard;
  // a dark rim keeps overlapping points separable
  float rim = smoothstep(0.72 - aa, 0.72, d);
  vec3 c = mix(vCls < 0.5 ? uA : uB, uEdge, rim * 0.55);
  // an open circle: the ring in color, the centre in the background color (it hides what runs through it)
  if (uHollow > 0.5) c = mix(uEdge, vCls < 0.5 ? uA : uB, smoothstep(0.52 - aa, 0.52, d));
  gl_FragColor = vec4(c, alpha);
  #include <colorspace_fragment>
}`;function m({xyz:e,cls:s,mask:c,scale:m,size:h=9,highlight:g=null,colorA:_=l.classA,colorB:v=l.classB,onTop:y=!1,hollow:b=!1,onHover:x}){let S=Math.floor(e.length/3),C=i(e=>e.viewport.dpr),w=i(e=>e.raycaster),T=(0,u.useMemo)(()=>{let e=new a;return e.setAttribute(`position`,new o(new Float32Array(S*3),3)),e.setAttribute(`aCls`,new o(new Float32Array(S),1)),e.setAttribute(`aMask`,new o(new Float32Array(S),1)),e},[S]),E=(0,u.useMemo)(()=>new t({vertexShader:f,fragmentShader:p,transparent:!0,depthWrite:!1,toneMapped:!1,uniforms:{uSize:{value:9},uHi:{value:-1},uA:{value:new n},uB:{value:new n},uEdge:{value:new n(`#0B1020`)},uHollow:{value:0}}}),[]);return(0,u.useLayoutEffect)(()=>()=>{T.dispose(),E.dispose()},[T,E]),(0,u.useLayoutEffect)(()=>{T.getAttribute(`position`).array.set(e.subarray(0,S*3));let t=T.getAttribute(`aCls`).array,n=T.getAttribute(`aMask`).array;for(let e=0;e<S;e++)t[e]=s?s[e]:0,n[e]=(c?c[e]:1)*(m?m[e]:1);for(let e of[`position`,`aCls`,`aMask`])T.getAttribute(e).needsUpdate=!0;T.computeBoundingSphere(),E.uniforms.uSize.value=h*C,E.uniforms.uHi.value=g??-1,E.uniforms.uA.value.set(_),E.uniforms.uB.value.set(v),E.depthTest=!y,E.uniforms.uHollow.value=+!!b}),r(({camera:e,size:t})=>{if(!x||!T.boundingSphere)return;let n=e.position.distanceTo(T.boundingSphere.center),r=e.fov*Math.PI/180;w.params.Points.threshold=2*n*Math.tan(r/2)/t.height*Math.max(6,h/2)}),(0,d.jsx)(`points`,{geometry:T,material:E,renderOrder:y?10:0,onPointerMove:e=>{x&&e.index!==void 0&&(c&&!c[e.index]||m&&!m[e.index]||(e.stopPropagation(),x(e.index)))},onPointerOut:()=>x?.(null)})}export{m as t};