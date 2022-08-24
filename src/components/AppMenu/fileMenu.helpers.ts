import { RootState, store } from "../../redux/store";

export const exportCurrentStore = async () => {
  return new Promise(async (resolve, reject) => {
    const storeData = store.getState();
    const dataStr = JSON.stringify(storeData);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    if (!dataStr || !dataUri) reject();

    const storeNameFile = await prompt(
      "export file name? (default: draw.json)",
      "draw"
    );
    const exportFileDefaultName = `${storeNameFile}.json`;

    if (!exportFileDefaultName) reject();

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    resolve("success");
  });
};

export const importStore = async (file: File) => {
  return new Promise<RootState>((resolve, reject) => {
    if (!file) reject();
    const reader = new FileReader();

    reader.onload = function (e) {
      const parsedStore: RootState = JSON.parse(
        e.target?.result?.toString() ?? "{}"
      );
      if (
        !parsedStore.canvas ||
        !parsedStore.animation ||
        !parsedStore.tools ||
        !parsedStore.layout
      )
        reject("failed to parse store");
      resolve(parsedStore);
    };

    reader.readAsText(file);
  });
};
