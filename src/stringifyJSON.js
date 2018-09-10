var stringifyJSON = function(obj) {
  if (obj === null) return 'null';
  if (obj === undefined) return '{}';
  if (typeof obj === 'function') return '{}';
  if (typeof obj === 'boolean') return String(obj);
  if (typeof obj === 'string')  return `"${obj}"`;
  if (typeof obj === 'number') return String(obj);

  if (typeof obj === 'object') {
    var contents = '';

    if (Array.isArray(obj)) {
      obj.map(function(item) {
        var itemAsString = stringifyJSON(item);
        if (contents === '') contents += itemAsString;
        else contents += `,${itemAsString}`;
      });
      return `[${contents}]`;
    }
    else {
      Object.keys(obj).map(function(key) {
        var propertyAsString = `${stringifyJSON(key)}:${stringifyJSON(obj[key])}`;
        if (propertyAsString !== '"functions":{}' && propertyAsString !== '"undefined":{}') {
          if (contents === '') contents += propertyAsString;
          else contents += `,${propertyAsString}`;
        }
      });
      return `{${contents}}`;
    }
  }
}
