var Cube = {
  vertices : [
     // Front
     1.0,  1.0,  -1.0,
     1.0, -1.0,  -1.0,
    -1.0,  1.0,  -1.0,
    -1.0, -1.0,  -1.0,

     // Back
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0, -1.0,  1.0,

     // Right
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

     // Left
    -1.0,  1.0,  1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0, -1.0,
    -1.0, -1.0, -1.0,

    // Top
     1.0,  1.0,  1.0,
    -1.0, -1.0,  1.0,
     1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,

    // Bottom
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,
     1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0
  ],

  colors: [
    [1.0,  1.0,  1.0,  1.0],    // Front face: white
    [1.0,  0.0,  0.0,  1.0],    // Back face: red
    [0.0,  1.0,  0.0,  1.0],    // Top face: green
    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    [1.0,  0.0,  1.0,  1.0]     // Left face: purple
  ],

  triangles: [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23    // left
  ],
  generatedColors: []
};

for (var j = 0; j < 6; j++) {
  var c = Cube.colors[j];

  for (var i=0; i<4; i++) {
    Cube.generatedColors = Cube.generatedColors.concat(c);
  }
}

module.exports = Cube;
