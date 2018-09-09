  // If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var list = [];

  function deepCheck(parent) {
    if (parent.classList.contains(className)) {
      list.push(parent);
    }
    for (var i = 0; i < parent.children.length; i++) {
      deepCheck(parent.children[i]);
    }
  }
  deepCheck(document.body);
  return list;
};
