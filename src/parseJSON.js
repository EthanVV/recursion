// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  var dataType = function() {
    if (json === undefined || json.length === 0) return 'ignore';

    var first = json.slice(0,1);
    var last = json.slice(-1);

    if (first === '"' && last === '"') return 'string';
    if (first === '[' && last === ']') return 'array';
    if (first === '{' && last === '}') return 'object';
    return 'other';
  };

  function getElements(string) {
    var inQuotes = false;
    var depth = 0;
    var block = '';
    var elements = [];
    var expectedChars = [];
  
    for (var i = 0; i < string.length; i++) {
      var char = string.charAt(i);

      if (char === '"') inQuotes = !inQuotes;
      if (inQuotes) block += char;
      else {
        if (char === '[') {
          depth++;
          expectedChars.push(']');
        } else if (char === '{') {
          depth++;
          expectedChars.push('}');
        } else if (char === expectedChars[0] && depth > 0) {
          depth--;
          expectedChars.shift();
        }
        if (char === ',' && depth === 0) {
          elements.push(block);
          block = '';
        } else if (char !== ' ') {
          block += char;
        }
      }
    }
    if (block.length > 0) elements.push(block);
    return elements;
  }

  var type = dataType();

  if (type === 'array') {
    return getElements(json.slice(1, -1)).map(x => parseJSON(x));
  }
  if (type === 'object') {
    var result = {};
    getElements(json.slice(1, -1))
      .forEach(function(element) {
        var colonIndex = element.indexOf(':');
        var key = parseJSON(element.slice(0,colonIndex));
        var value = parseJSON(element.slice(colonIndex+1));
        result[key] = value;
      });
    return result;
  }
  if (type === 'ignore') return;
  if (type === 'string') return json.slice(1, -1);
  if (type === 'other') {
    if (json === 'null') return null;
    if (json === 'true') return true;
    if (json === 'false') return false;
    if (Number(json) !== NaN) return Number(json);
  }
}