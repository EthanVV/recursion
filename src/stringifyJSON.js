// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:


// FIRST PASS, NEEDS LOGICAL AND READABILITY REVISIONS
var stringifyJSON = function(obj) {
  var string = '';

  if (Array.isArray(obj)) {
    string += '[';
    if (obj.length > 0) {
      for (var i = 0; i < obj.length; i++) {
        string += stringifyJSON(obj[i]) + ',';
      }
      string = string.slice(0, -1);
    }
    string += ']';
  } else if (obj === undefined || typeof obj === 'function') {
    string += '{}';
  } else if (typeof obj === 'object') {
    if (obj === null) {
      string+= String(null);
    } else {
      string += '{';
      if (Object.keys(obj).length > 0) {
        var removeComma = false;
        for (var key in obj) {
          if (key !== 'functions' && key !== 'undefined') {
            string += '"' + key + '":' + stringifyJSON(obj[key]) + ','; 
            removeComma = true;
          }
        }
        string = (removeComma) ? string.slice(0, -1): string;
      }
      string += '}';
    } 
  } else if (typeof obj === 'string') {
    string += '"' + obj + '"';
  } else {
    string += String(obj);
  }
  return string;
};
