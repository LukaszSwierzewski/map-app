export default function uselocalStorage() {
  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  }
  const getFromLocalStorage = (key) => {
    let data = JSON.parse(localStorage.getItem(key))
    if (data === null) data = []
    return data
  }
  function isAlreadyAdded(obj, list) {
    console.log(obj)
    console.log(list)
    return list.some(elem => elem.place_id === obj.place_id)
}
  return { saveToLocalStorage, getFromLocalStorage, isAlreadyAdded };
}