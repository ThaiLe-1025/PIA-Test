import React, { useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  createCircle,
  createLine,
  createRect,
  createText,
} from "../../../SVGEngine";
import { SVGRenderer, SVGObject } from "../../renderers/SVGRenderer";
import "./MeasureItems.css";

const svgRenderer = new SVGRenderer();
function MeasureItems({ active, unit = "m" }) {
  const { camera, gl, scene } = useThree();
  var raycaster, mouse;
  var intersects, line;

  const canvas = document.getElementById("canvas");
  const container = document.getElementById("function-container");
  mouse = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  let points = [];
  var circle, tmpCircle, tmpCircleObject;
  var tmpLine, tmpLineObject;
  var text, tmpText, tmpTextObject;
  var rect, tmpRect, tmpRectObject;
  let radius = 5;
  let colorFill = "rgb(19, 210, 73)";
  let strockColor = "rgb(255, 255, 255)";
  let fontSize = 14;
  let strockWidth = 2;
  let precision = 1;
  let rectHeight = 21;
  let rectWidth = 100;
  let offsetRect = 15;
  var circles = [];
  var lines = [];
  var texts = [];
  var rects = [];
  var firstNode = true;

  ///rendered
  svgRenderer.setSize(gl.domElement.clientWidth, gl.domElement.clientHeight);
  svgRenderer.domElement.classList = "svgRenderer";
  svgRenderer.domElement.style.position = "absolute";
  svgRenderer.domElement.style.top = "0px";
  svgRenderer.domElement.style.pointerEvents = "none";
  if (active) {
    container.appendChild(svgRenderer.domElement);
    ///temporary objects
    tmpCircle = createCircle(radius, colorFill, strockColor);
    tmpCircleObject = new SVGObject(tmpCircle);

    tmpLine = createLine(colorFill, strockWidth);
    tmpLineObject = new SVGObject(tmpLine);

    tmpText = createText(colorFill, fontSize, "0mm");
    tmpTextObject = new SVGObject(tmpText);

    tmpRect = createRect(colorFill, strockColor);
    tmpRectObject = new SVGObject(tmpRect);
    console.log(scene);
  } else {
  }

  ///Event

  useEffect(() => {
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleClick);
    return () => {
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleClick);
      // svgRenderer.clear();
      // var svgNode = svgRenderer.domElement;

      // while (svgNode.firstChild) {
      //   svgNode.removeChild(svgNode.lastChild);
      // }
      // circles = [];
      // lines = [];
      // rects = [];
      // texts = [];
      // gl.domElement.style.cursor = "auto";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function handleMove(e) {
    e.preventDefault();
    if (active) {
      mouse.x = (e.layerX / gl.domElement.clientWidth) * 2 - 1;
      mouse.y = -(e.layerY / gl.domElement.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      intersects = raycaster.intersectObject(scene, true);
      if (intersects.length > 0) {
        points = [];
        points.push(intersects[0].point);
        points.push(intersects[0].point.clone());
        if (
          intersects[0].object.material.name !== "SkyShader" &&
          intersects[0].object.material.name !== "clippingPlane"
        ) {
          gl.domElement.style.cursor = "crosshair";

          tmpCircleObject.position.copy(points[0]);
          scene.add(tmpCircleObject);

          if (circles.length > 0) {
            if (circles.length % 2 !== 0) {
              try {
                var circleObject = circles[circles.length - 1];
                var trans = circleObject.node.getAttribute("transform");
                var parts = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(
                  trans
                );
                var trans2 = circle.getAttribute("transform");
                var parts2 = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(
                  trans2
                );
                ////////////
                let midX = (parseFloat(parts[1]) + parseFloat(parts2[1])) / 2;
                let midY = (parseFloat(parts[2]) + parseFloat(parts2[2])) / 2;

                let len = dist(
                  circleObject.position.x,
                  points[0].x,
                  circleObject.position.y,
                  points[0].y,
                  circleObject.position.z,
                  points[0].z
                );
                let label;
                if (unit === "m") {
                  label = len.toFixed(precision + 1) + "m";
                } else if (unit === "mm") {
                  label = len.toFixed(precision) + "mm";
                }
                // const textWidth = parseInt( = len.toFixed(precision) + "mm";
                //   window.getComputedStyle(tmpText).width.replace("px", "")
                // );
                let offsetX;
                if (len < 100) offsetX = 25;
                else if (10 < len < 100) offsetX = 20;
                else if (100 < len < 1000) offsetX = 15;
                else if (1000 < len < 10000) offsetX = 10;
                else if (10000 < len < 100000) offsetX = 5;
                else if (100000 < len < 1000000) offsetX = 2;

                tmpLine.setAttributeNS(null, "x1", parts[1]);
                tmpLine.setAttributeNS(null, "y1", parts[2]);
                tmpLine.setAttributeNS(null, "x2", parts2[1]);
                tmpLine.setAttributeNS(null, "y2", parts2[2]);

                tmpRect.setAttributeNS(null, "x", midX - offsetX);
                tmpRect.setAttributeNS(null, "y", midY - offsetRect);
                tmpRect.setAttributeNS(null, "width", rectWidth);
                tmpRect.setAttributeNS(null, "height", rectHeight);

                tmpText.setAttributeNS(null, "x", midX);
                tmpText.setAttributeNS(null, "y", midY);

                tmpText.textContent = label;
                /////////
                scene.add(tmpLineObject);
                scene.add(tmpRectObject);
                scene.add(tmpTextObject);
              } catch (error) {}
            }
          }
        } else {
          tmpCircleObject.position.copy(points[0]);
          scene.add(tmpCircleObject);
          gl.domElement.style.cursor = "auto";
        }
      }
      renderer(gl, scene, camera);
    }
  }
  function handleClick(e) {
    e.preventDefault();
    if (active) {
      mouse.x = (e.layerX / gl.domElement.clientWidth) * 2 - 1;
      mouse.y = -(e.layerY / gl.domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      intersects = raycaster.intersectObject(scene, true);
      if (intersects.length > 0) {
        points = [];

        if (
          intersects[0].object.material.name !== "SkyShader" &&
          intersects[0].object.material.name !== "clippingPlane"
        ) {
          points.push(intersects[0].point);
          points.push(intersects[0].point.clone());
          gl.domElement.style.cursor = "crosshair";

          circle = createCircle(radius, colorFill, strockColor);
          circles.push(tmpCircleObject);
          tmpCircle = circle;
          tmpCircleObject = new SVGObject(circle);
          scene.add(tmpCircleObject);
          //line
          if (firstNode) {
            lines.push(tmpLineObject);
            rects.push(tmpRectObject);
            texts.push(tmpTextObject);
            firstNode = !firstNode;
          } else {
            line = createLine(colorFill, strockWidth);
            tmpLine = line;
            tmpLineObject = new SVGObject(line);

            rect = createRect(colorFill, strockColor);
            tmpRect = rect;
            tmpRectObject = new SVGObject(rect);

            text = createText(colorFill, fontSize, "0mm");
            tmpText = text;
            tmpTextObject = new SVGObject(tmpText);

            firstNode = !firstNode;
          }
        }
      }

      renderer(gl, scene, camera);
    }
  }
  function animate(active) {
    if (lines.length > 0) {
      let total;
      if (circles.length % 2 === 0) total = lines.length;
      else {
        total = lines.length - 1;
      }
      for (let i = 0; i < total; i++) {
        try {
          var circleObject = circles[circles.length - 1];
          const elementLine = lines[i];
          const elementRect = rects[i];
          const elementText = texts[i];

          const line = elementLine.node;
          const rect = elementRect.node;
          const text = elementText.node;

          const node1 = circles[2 * i].node;
          const node2 = circles[2 * i + 1].node;

          var trans = node1.getAttribute("transform");
          var parts = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(trans);
          var trans2 = node2.getAttribute("transform");
          var parts2 = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(trans2);

          let midX = (parseFloat(parts[1]) + parseFloat(parts2[1])) / 2;
          let midY = (parseFloat(parts[2]) + parseFloat(parts2[2])) / 2;

          // const textWidth = parseInt(
          //   window.getComputedStyle(text).width.replace("px", "")
          // );
          // console.log(textWidth);
          let len = dist(
            circleObject.position.x,
            points[0].x,
            circleObject.position.y,
            points[0].y,
            circleObject.position.z,
            points[0].z
          );
          let offsetX;
          if (len < 100) offsetX = 25;
          else if (10 < len < 100) offsetX = 20;
          else if (100 < len < 1000) offsetX = 15;
          else if (1000 < len < 10000) offsetX = 10;
          else if (10000 < len < 100000) offsetX = 5;
          else if (100000 < len < 1000000) offsetX = 2;

          line.setAttributeNS(null, "x1", parts[1]);
          line.setAttributeNS(null, "y1", parts[2]);
          line.setAttributeNS(null, "x2", parts2[1]);
          line.setAttributeNS(null, "y2", parts2[2]);
          line.setAttribute("transform", "translate(" + 0 + "," + 0 + ")");

          rect.setAttributeNS(null, "x", midX - offsetX);
          rect.setAttributeNS(null, "y", midY - offsetRect);
          rect.setAttributeNS(null, "width", rectWidth);
          rect.setAttributeNS(null, "height", rectHeight);

          text.setAttributeNS(null, "x", midX);
          text.setAttributeNS(null, "y", midY);
        } catch (error) {}
      }
    }

    renderer(gl, scene, camera);

    requestAnimationFrame(animate);
  }
  animate(active);

  // useFrame(() => {
  //   animate(active);
  // });
  return null;
}

function renderer(gl, scene, camera) {
  gl.render(scene, camera);
  svgRenderer.render(scene, camera);
}

// function getTranslateXY(element) {
//   const style = window.getComputedStyle(element);
//   const matrix = style.getPropertyValue("transform");
//   console.log(matrix);

//   return {
//     translateX: matrix.m41,
//     translateY: matrix.m42,
//   };
// }
function dist(x1, x2, y1, y2, z1, z2) {
  return Math.sqrt(
    (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2)
  );
}
export default MeasureItems;
