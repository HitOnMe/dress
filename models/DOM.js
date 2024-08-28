export let domID = (id) => {
    return document.getElementById(id)
}
export let selectID = (id, index) => {
    return document.querySelectorAll(id)[index]
}
export let selectAll = (id) => {
    return document.querySelectorAll(id)
}
export let select = (id) => {
    return document.querySelector(id)
}
export let filterObject = (objects, attribute) => {
    return objects.filter(object => object.type == attribute)
}
