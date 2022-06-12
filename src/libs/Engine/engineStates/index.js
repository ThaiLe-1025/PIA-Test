import create from "zustand";
export const engineStates = create((set) => ({
  treeData: [],
  objectData: [],
  sceneData: [],
  cameraData: [],
  glData: [],
  controlData: [],
  setState: "",
}));
