Matrix.prototype.flatten = function () {
    var result = [];
    if (this.elements.length == 0)
        return [];


    for (var j = 0; j < this.elements[0].length; j++)
        for (var i = 0; i < this.elements.length; i++)
            result.push(this.elements[i][j]);
    return result;
}

function makePerspective(fovy, aspect, znear, zfar) {
  var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
  var mvMatrix = makeIdentity(4);
  var ymin = -ymax;
  var xmin = ymin * aspect;
  var xmax = ymax * aspect;

  return makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
}

function makeFrustum(left, right, bottom, top, znear, zfar) {
  var X = 2*znear/(right-left);
  var Y = 2*znear/(top-bottom);
  var A = (right+left)/(right-left);
  var B = (top+bottom)/(top-bottom);
  var C = -(zfar+znear)/(zfar-znear);
  var D = -2*zfar*znear/(zfar-znear);

  return $M([[X, 0, A, 0],
             [0, Y, B, 0],
             [0, 0, C, D],
             [0, 0, -1, 0]]);
}

function makeIdentity(val) {
  return Matrix.I(val);
}

function getShader(gl, id) {
  var shaderScript = document.getElementById(id);

  // Didn't find an element with the specified ID; abort.

  if (!shaderScript) {
    return null;
  }

  // Walk through the source element's children, building the
  // shader source string.

  var theSource = "";
  var currentChild = shaderScript.firstChild;

  while(currentChild) {
    if (currentChild.nodeType == 3) {
      theSource += currentChild.textContent;
    }

    currentChild = currentChild.nextSibling;
  }

  // Now figure out what type of shader script we have,
  // based on its MIME type.

  var shader;

  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;  // Unknown shader type
  }

  // Send the source to the shader object

  gl.shaderSource(shader, theSource);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

module.exports = {
  makePerspective: makePerspective,
  makeFrustum: makeFrustum,
  makeIdentity: makeIdentity,
  getShader: getShader
};
