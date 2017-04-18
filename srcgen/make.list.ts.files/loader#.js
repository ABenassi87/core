var fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  srcgen = require('srcgen'),
  recursive = require('recursive-readdir'),
  replaceExt = require('replace-ext');
var scanPath = path.resolve(__srcdir, '../../', scan.path);
console.log('Scan dir:' + scanPath);
recursive(scanPath, ['!*.ts'], function (err, files) {
  var exportArray = [];
  var exportEntities = {};
  var delmitters = [
    { prefix: 'class ', postfix: ' ' },
    { prefix: 'const ', postfix: ' ' },
    { prefix: 'enum ', postfix: ' ' },
    { prefix: 'interface ', postfix: ' ' }
  ];
  var entities = [
    'module',
    'component',
    'shared',
    'service'
  ];
  var moduleName = _.upperFirst(path.basename(scanPath));
  if (moduleName == 'Src') {
    moduleName = _.upperFirst(path.basename(path.dirname(scanPath)));
  }
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var content = srcgen.utils.load(file);
    content = content.replace(/  +/g, ' ').replace(new RegExp(':', 'g'), ' ');
    for (var d = 0; d < delmitters.length; d++) {
      var delmitter = delmitters[d];
      var items = srcgen.between.get(content, delmitter.prefix, delmitter.postfix);
      for (var j = 0; j < items.length; j++) {
        var className = items[j].trim();
        if (_.camelCase(className).toLowerCase() === className.toLowerCase() && className.toLowerCase()[0] !== className[0]) {
          var classFile = replaceExt(
            file.replace(scanPath, '').replace(new RegExp('\\' + path.sep, 'g'), '/'),
            '').split(path.sep).join("/");
          var founded = false;
          for (var e = 0; e < entities.length; e++) {
            if (!exportEntities[entities[e]]) {
              exportEntities[entities[e]] = [];
            }
            if (classFile.replace('.' + entities[e], '') !== classFile) {
              founded = true;
              if (moduleName + _.upperFirst(entities[e] + 's') !== className && className!=='AppComponent') {
                exportEntities[entities[e]].push(className);
              }
            }
          }
          if (!founded) {
            founded = false;
            for (var e = 0; e < entities.length; e++) {
              if (moduleName + _.upperFirst(entities[e] + 's')===className) {
                founded=true;
              }
            }
            if (!founded) {
              exportEntities['shared'].push(className);
            }
          }
          founded = false;
          for (var e = 0; e < entities.length; e++) {
            if (moduleName + _.upperFirst(entities[e] + 's')===className) {
              founded=true;
            }
          }
          if (!founded){
              var importLine = 'import { ' + className + ' } from \'.' + classFile + '\';';
              exportArray.push(importLine);
              var exportLine = 'export { ' + className + ' } from \'.' + classFile + '\';';
              exportArray.push(exportLine);
          }
        }
      }
    }
  }
  for (var e = 0; e < entities.length; e++) {
    if (exportEntities[entities[e]]) {
      exportArray.push('export const ' + moduleName + _.upperFirst(entities[e] + 's') + ': any[] = [' + exportEntities[entities[e]].join(', ') + '];');
    }
  }
  if (exportArray.length > 0) {
    var out = exportArray.join('\n');
    require("fs").writeFileSync(path.resolve(scanPath, 'index.ts'), out);
    console.log('Objects count included in index.ts:' + exportArray.length);
  }
});
