import { store } from "../../redux/store";

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
