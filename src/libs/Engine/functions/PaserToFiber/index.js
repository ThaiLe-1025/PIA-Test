import React, { useState } from "react";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import ConvertRGBtoHex from "../../utils/ConvertRGBtoHex";
import { engineStates } from "../../engineStates";
import shallow from "zustand/shallow";
import { transformStates, modes } from "../Transform";
import { clippingState } from "../Clipping";
import { fuctionStates } from "..";
import { useSnapshot } from "valtio";
// import { clippingState } from "../Clipping";

function PaserFiber() {
  const { objectData } = engineStates(
    (state) => ({
      objectData: state.objectData,

      setState: state.setState,
    }),
    shallow
  );
  var object = objectData;

  var element = [];

  if (object) {
    object.map((item) => {
      element.push(jsxElements(item.value));
      return null;
    });
  }

  return element;
}
function jsxElements(object) {
  var element;
  if (object === null) return;
  var jsxArray = [];
  if (object.children.length > 0) {
    var children = object.children;
    children.map((item) => {
      let type = item.type;

      if (type === "Mesh") {
        jsxArray.push(<MeshElement value={item} key={item.uuid} />);
      } else if (type === "Line") {
        jsxArray.push(<LineElement value={item} key={item.uuid} />);
      } else if (type === "Sprite") {
        jsxArray.push(<SpriteElement value={item} key={item.uuid} />);
      } else if (type === "Object3D") {
        jsxArray.push(<LoopObject value={item} key={item.uuid} />);
      }
      return null;
    });
  } else {
    console.log(object);
    jsxArray.push(
      <mesh
        geometry={object.geometry}
        userData={object.userData}
        material={object.material}
        key={object.uuid}
      />
    );
  }
  if (object.userData.objectType === "rhino") {
    element = (
      <GroupElement
        key={object.uuid}
        value={object}
        scale={(0.001, 0.001, 0.001)}
        up={[0, 1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {jsxArray}
      </GroupElement>
    );
  } else if (object.userData.objectType === "ifc") {
    element = (
      <GroupElement key={object.uuid} value={object}>
        {jsxArray}
      </GroupElement>
    );
  }
  return element;
}
function LoopObject({ value, ...passProps }) {
  var child = [];

  value.children.map((elem) => {
    if (elem.children.length > 0) {
      child.push(<LoopObject value={elem} key={elem.uuid} />);
    } else {
      let type = elem.type;
      if (type === "Mesh") {
        child.push(<MeshElement value={elem} key={elem.uuid} />);
      } else if (type === "Line") {
        child.push(<LineElement value={elem} key={elem.uuid} />);
      } else if (type === "Sprite") {
        child.push(<SpriteElement value={elem} key={elem.uuid} />);
      }
    }
    return null;
  });
  return (
    <GroupElement value={value} key={value.uuid} {...passProps}>
      {child}
    </GroupElement>
  );
}
function GroupElement({ value, children, ...passProps }) {
  return (
    <group
      position={value.position}
      userData={value.userData}
      name={value.name}
      uuid={value.uuid}
      {...passProps}
    >
      {children}
    </group>
  );
}

function MeshElement({ value, children, ...passProps }) {
  const [select, setSelect] = useState(false);
  const snap = useSnapshot(fuctionStates);

  return (
    <mesh
      geometry={value.geometry}
      position={value.position}
      // position={
      //   !!value.geometry.boundingSphere
      //     ? value.userData.attributes.geometry.pathStart
      //     : value.positionclippingState
      // }
      uuid={value.uuid}
      userData={value.userData}
      // material={value.material}

      onDoubleClick={(e) => {
        e.stopPropagation();
        transformStates.current = value.uuid;
        setSelect(true);
      }}
      onPointerMissed={(e) => {
        e.stopPropagation();

        if (e.type === "dblclick") {
          transformStates.current = null;
          setSelect(false);
        }
      }}
      onContextMenu={(e) =>
        transformStates.current === value.uuid &&
        (e.stopPropagation(),
        (transformStates.mode = (transformStates.mode + 1) % modes.length))
      }
      dispose={null}
      {...passProps}
    >
      <meshStandardMaterial
        color={
          value.userData.attributes.colorSource.value === 1
            ? ConvertRGBtoHex(
                value.userData.attributes.drawColor.r,
                value.userData.attributes.drawColor.g,
                value.userData.attributes.drawColor.b
              )
            : value.material.color
        }
        roughness={1}
        envMapIntensity={1}
        clippingPlanes={
          snap.clippingActive ? clippingState.clippingPlanes : null
        }
        clipShadows
        shadowSide={THREE.DoubleSide}

        // thickness={-1}
        // clipShadows
      />
      {snap.clippingActive &&
        clippingState.clippingPlanes.map((plane, i) => (
          <PlaneStencilGroup
            key={`0${i}`}
            geometry={value.geometry}
            plane={plane}
            renderOrder={i + 1}
          />
        ))}
      <Edges
        visible={select}
        threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
        color="#333"
      />

      {children}
    </mesh>
  );
}
function LineElement({ value, children, ...passProps }) {
  const snap = useSnapshot(fuctionStates);
  return (
    <line
      geometry={value.geometry}
      position={value.position}
      uuid={value.uuid}
      userData={value.userData}
      material={value.material}
      {...passProps}
    >
      <lineBasicMaterial
        color={
          value.userData.attributes.colorSource.value === 1
            ? ConvertRGBtoHex(
                value.userData.attributes.drawColor.r,
                value.userData.attributes.drawColor.g,
                value.userData.attributes.drawColor.b
              )
            : value.material.color
        }
        clippingPlanes={
          snap.clippingActive ? clippingState.clippingPlanes : null
        }
        clipShadows
        shadowSide={THREE.DoubleSide}
      />
      {snap.clippingActive &&
        clippingState.clippingPlanes.map((plane, i) => (
          <PlaneStencilGroup
            key={`0${i}`}
            geometry={value.geometry}
            plane={plane}
            renderOrder={i + 1}
          />
        ))}
      {children}
    </line>
  );
}
function SpriteElement({ value, children, ...passProps }) {
  const snap = useSnapshot(fuctionStates);
  return (
    <sprite
      geometry={value.geometry}
      position={value.position}
      center={value.center}
      uuid={value.uuid}
      userData={value.userData}
      material={value.material}
      {...passProps}
    >
      <spriteMaterial
        color={
          value.userData.attributes.colorSource.value === 1
            ? ConvertRGBtoHex(
                value.userData.attributes.drawColor.r,
                value.userData.attributes.drawColor.g,
                value.userData.attributes.drawColor.b
              )
            : value.material.color
        }
        clippingPlanes={
          snap.clippingActive ? clippingState.clippingPlanes : null
        }
        clipShadows
        shadowSide={THREE.DoubleSide}
      />
      {snap.clippingActive &&
        clippingState.clippingPlanes.map((plane, i) => (
          <PlaneStencilGroup
            key={`0${i}`}
            geometry={value.geometry}
            plane={plane}
            renderOrder={i + 1}
          />
        ))}
      {children}
    </sprite>
  );
}
function PlaneStencilGroup({ geometry, plane, renderOrder }) {
  const mat = {
    depthWrite: false,
    depthTest: false,
    colorWrite: false,
    stencilWrite: true,
    stencilFunc: THREE.AlwaysStencilFunc,
  };
  const matBack = {
    ...mat,
    side: THREE.BackSide,
    clippingPlanes: [plane],
    stencilFail: THREE.IncrementWrapStencilOp,
    stencilZFail: THREE.IncrementWrapStencilOp,
    stencilZPass: THREE.IncrementWrapStencilOp,
  };
  const matFront = {
    ...mat,
    side: THREE.FrontSide,
    clippingPlanes: [plane],
    stencilFail: THREE.DecrementWrapStencilOp,
    stencilZFail: THREE.DecrementWrapStencilOp,
    stencilZPass: THREE.DecrementWrapStencilOp,
  };

  return (
    <group>
      <mesh geometry={geometry} renderOrder={renderOrder}>
        <meshBasicMaterial {...matFront} />
      </mesh>
      <mesh geometry={geometry} renderOrder={renderOrder}>
        <meshBasicMaterial {...matBack} />
      </mesh>
    </group>
  );
}
// function InstanceElement({ value, children, ...passProps }) {
//   return (
//     <Instances
//       limit={10000}
//       position={value.position}
//       userData={value.userData}
//       name={value.name}
//       uuid={value.uuid}
//     >
//       {children}
//     </Instances>
//   );
// }

export default React.memo(PaserFiber);
