function ParserToTreeData(data) {
  const final = [];
  let check = "";
  data.map((item, indexMain) => {
    var value = item.value;
    var type = value.userData.objectType;
    var layers = value.userData.layers;
    /////
    if (type === "rhino") {
      let temp = [];
      layers.map((it, index) => {
        let checkExisted = null;
        if (temp.length > 1) {
          checkExisted = temp.find((ele) => ele.id === it.id);
        }

        if (checkExisted == null) {
          check = it.fullPath;
          if (check.includes("::")) {
            let lastIndex = check.lastIndexOf("::");
            let firstIndex = check.indexOf("::");
            if (firstIndex === lastIndex) {
              let cut = check.slice(0, firstIndex);
              let objFound = temp.find((ele) => (ele.name = cut));
              if (!objFound.children) {
                objFound.children = [
                  {
                    id: it.id,
                    name: it.name,
                    fullPath: it.fullPath,
                    checked: it.visible,
                    type: type,
                    index: index,
                  },
                ];
              } else {
                objFound.children.push({
                  id: it.id,
                  name: it.name,
                  fullPath: it.fullPath,
                  checked: it.visible,
                  type: type,
                  index: index,
                });
              }
            } else {
              let cut = it.fullPath;

              let stop = false;
              let checkFinal = temp;
              do {
                if (!cut.includes("::")) {
                  stop = true;
                  break;
                }

                firstIndex = cut.indexOf("::");
                let remaining = "";
                if (firstIndex === -1) continue;
                else remaining = cut.slice(0, firstIndex);

                cut = cut.substring(firstIndex + 2);

                let objFound = checkFinal.find((ele) => (ele.name = remaining));
                if (!objFound.children) {
                  objFound.children = [
                    {
                      id: it.id,
                      name: it.name,
                      fullPath: it.fullPath,
                      checked: it.visible,
                      type: type,
                      index: index,
                    },
                  ];
                } else {
                  objFound = objFound.children;
                  checkFinal = objFound;
                }
                // cut = cut.slice(0, firstIndex);
              } while (!stop);
            }
            // final.push({ id: it.id, name: it.name, fullPath: it.fullPath });
          } else {
            temp.push({
              id: it.id,
              name: it.name,
              fullPath: it.fullPath,
              checked: it.visible,
              type: type,
              index: index,
            });
          }
        }
        return temp;
      });

      final.push({
        id: value.uuid,
        name: item.title,
        fullPath: value.fullPath,
        checked: true,
        type: type,
        index: indexMain,
        children: temp,
      });
    } else if (type === "ifc") {
      final.push({
        id: value.uuid,
        name: item.title,
        fullPath: value.fullPath,
        checked: true,
        type: type,
        index: indexMain,
      });
    }

    return final;
  });

  return final;
}

export default ParserToTreeData;
