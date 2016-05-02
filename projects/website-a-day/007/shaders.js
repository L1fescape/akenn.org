import glsl from 'glslify';

const fragmentShader = glsl`
  varying lowp vec4 vColor;
  void main(void) {
    gl_FragColor = vColor;
  }
`;

const vertexShader = glsl`
  varying lowp vec4 vColor;
  void main(void) {
    gl_FragColor = vColor;
  }
`;

module.exports = {
  fragmentShader: fragmentShader,
  vertexShader: vertexShader
};
