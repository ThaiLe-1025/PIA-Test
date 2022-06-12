import {
  Box2,
  Camera,
  Color,
  Matrix3,
  Matrix4,
  Object3D,
  Vector3,
} from "three";

class SVGObject extends Object3D {
  constructor(node) {
    super();

    this.node = node;
  }
}

SVGObject.prototype.isSVGObject = true;

class SVGRenderer {
  constructor() {
    let _svgWidth, _svgHeight, _svgWidthHalf, _svgHeightHalf;
    // _precision = null,
    // _quality = 1;

    const _this = this,
      _clipBox = new Box2(),
      _clearColor = new Color(),
      _vector3 = new Vector3(), // Needed for PointLight
      _normalViewMatrix = new Matrix3(),
      _viewMatrix = new Matrix4(),
      _viewProjectionMatrix = new Matrix4(),
      _svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    this.domElement = _svg;

    this.autoClear = true;
    this.sortObjects = true;
    this.sortElements = true;

    this.overdraw = 0.5;

    this.info = {
      render: {
        vertices: 0,
        faces: 0,
      },
    };

    // this.setQuality = function (quality) {
    //   switch (quality) {
    //     case "high":
    //       _quality = 1;
    //       break;
    //     case "low":
    //       _quality = 0;
    //       break;
    //     default:
    //   }
    // };

    this.setClearColor = function (color) {
      _clearColor.set(color);
    };

    this.setPixelRatio = function () {};

    this.setSize = function (width, height) {
      _svgWidth = width;
      _svgHeight = height;
      _svgWidthHalf = _svgWidth / 2;
      _svgHeightHalf = _svgHeight / 2;

      _svg.setAttribute(
        "viewBox",
        -_svgWidthHalf +
          " " +
          -_svgHeightHalf +
          " " +
          _svgWidth +
          " " +
          _svgHeight
      );
      _svg.setAttribute("width", _svgWidth);
      _svg.setAttribute("height", _svgHeight);

      _clipBox.min.set(-_svgWidthHalf, -_svgHeightHalf);
      _clipBox.max.set(_svgWidthHalf, _svgHeightHalf);
    };

    this.getSize = function () {
      return {
        width: _svgWidth,
        height: _svgHeight,
      };
    };

    // this.setPrecision = function (precision) {
    //   _precision = precision;
    // };

    function removeChildNodes() {
      while (_svg.childNodes.length > 0) {
        _svg.removeChild(_svg.childNodes[0]);
      }
    }

    this.clear = function () {
      removeChildNodes();
      _svg.style.backgroundColor = _clearColor.getStyle();
    };

    this.render = function (scene, camera) {
      if (camera instanceof Camera === false) {
        console.error(
          "THREE.SVGRenderer.render: camera is not an instance of Camera."
        );
        return;
      }

      const background = scene.background;

      if (background && background.isColor) {
        removeChildNodes();
        _svg.style.backgroundColor = background.getStyle();
      } else if (this.autoClear === true) {
        this.clear();
      }

      _this.info.render.vertices = 0;
      _this.info.render.faces = 0;

      _viewMatrix.copy(camera.matrixWorldInverse);
      _viewProjectionMatrix.multiplyMatrices(
        camera.projectionMatrix,
        _viewMatrix
      );

      _normalViewMatrix.getNormalMatrix(camera.matrixWorldInverse);

      // reset accumulated path

      scene.traverseVisible(function (object) {
        if (object.isSVGObject) {
          _vector3.setFromMatrixPosition(object.matrixWorld);
          _vector3.applyMatrix4(_viewProjectionMatrix);

          if (_vector3.z < -1 || _vector3.z > 1) return;

          const x = _vector3.x * _svgWidthHalf;
          const y = -_vector3.y * _svgHeightHalf;

          const node = object.node;
          node.setAttribute("transform", "translate(" + x + "," + y + ")");

          _svg.appendChild(node);
        }
      });
    };

    // Hide anti-alias gaps
  }
}

export { SVGObject, SVGRenderer };
