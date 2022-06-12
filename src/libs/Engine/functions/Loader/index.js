import { IFCLoader } from "three/examples/jsm/loaders/IFCLoader";
import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader";
import FitToObject from "../FitToObject";
import { ConvertRGBtoHex } from "../../utils";
import { engineStates } from "../../engineStates";

var progress, object;

export default function Loader({
  type = "ifc",
  title,
  objectData,
  sceneData,
  cameraData,
  controlData,
  file,
}) {
  if (type === "ifc") {
    const ifcLoader = new IFCLoader();
    ifcLoader.ifcManager.setWasmPath("../../");

    ifcLoader
      .loadAsync(file, function (xhr) {
        progress = (xhr.loaded / xhr.total) * 100;
      })
      .then((result) => {
        object = result;
        object.name = file;
        object.userData.objectType = type;
        // sceneData[0].add(result);
        objectData.push({ value: object, title: title });
        engineStates.setState({ setState: object, objectData: objectData });
        FitToObject(cameraData[0], controlData[0], object);
        return object;
      });
  } else if (type === "rhino") {
    const loader = new Rhino3dmLoader();
    loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@7.14.0/");
    loader
      .loadAsync(file, function (xhr) {
        progress = (xhr.loaded / xhr.total) * 100;
      })
      .then((result) => {
        if (result.userData.settings.modelUnitSystem.value === 2) {
          result.up.set(0, 1, 0);
          result.rotation.set(-Math.PI / 2, 0, 0);
          result.scale.set(0.001, 0.001, 0.001);
        }
        object = updateColorForRhino(result);
        object.name = file;
        object.userData.objectType = type;
        // sceneData[0].add(object);
        objectData.push({ value: object, title: title });
        engineStates.setState({ setState: object });
        FitToObject(cameraData[0], controlData[0], object);
        return object;
      });
  }

  return object;
}

function updateColorForRhino(object) {
  if (object.children) {
    var child = object.children;
    child.map((item) => {
      if (item.type === "Mesh") {
        let resource = item.userData.attributes.colorSource.name;

        if (resource === "ObjectColorSource_ColorFromObject") {
          let mat = item.material;
          let objectColor = item.userData.attributes.objectColor;

          mat.color.set(
            ConvertRGBtoHex(objectColor.r, objectColor.g, objectColor.b)
          );
        } else if (resource === "ObjectColorSource_ColorFromLayer") {
        }
      } else if (item.type === "Object3D") {
        updateColorForRhino(item);
      } else {
      }
      return object;
    });
  }

  return object;
}
export { progress };
