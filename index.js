
const lowercase = require('./lowercase');
const capital = require('./capital');
const other = require('./other');
const diacritics = require('./diacritics');

const _table = [
  ...lowercase,
  ...capital,
  ...other,
  ...diacritics
];

const _xsampa = {};
const _ipa = {};
const _tipa = {};

for (const [i, e] of _table.entries()) {
  _xsampa[e['X-SAMPA']] = i;
}
for (const [i, e] of _table.entries()) {
  _ipa[e['IPA']] = i;
}
for (const [i, e] of _table.entries()) {
  _tipa[e['tipa']] = i;
}

_escape = function (s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

let xsRE = new RegExp('(' + Object.keys(_xsampa).filter(x => !!x).map(_escape).join('|') + ')', 'g');
let ipaRE = new RegExp('(' + Object.keys(_ipa).filter(x => !!x).map(_escape).join('|') + ')', 'g');
let tipaRE = new RegExp('(' + Object.keys(_tipa).filter(x => !!x).map(_escape).join('|') + ')', 'g');


function xsampa2ipa(text) {
  return text.replace(xsRE, xs => {
    const i = _xsampa[xs];
    const x = _table[i]['IPA'];
    if (!xs) { return ''; }
    return x;
  });
}

function ipa2xsampa(text) {
  return text.replace(ipaRE, ipa => {
    const i = _ipa[ipa];
    const x = _table[i]['X-SAMPA'];
    if (!ipa) { return ''; }
    return x;
  });
}


function xsampa2tipa(text) {
  let slicePositions = [];
  let closeBracketFlag;
  let workingText = text.replace(xsRE, (xs, p1, offset, stringT, groups) => {
    const i = _xsampa[xs];
    let x = _table[i]['tipa'];

    if (!!xs) {
      if (closeBracketFlag) {
        x += '}'
        closeBracketFlag = false;
      }
      if (!!_table[i]['tipaAdvanced']) {
        const tipaAdvanced = _table[i]['tipaAdvanced'];
        let xN = tipaAdvanced['macro'];

        //Get modified character
        switch (tipaAdvanced['param']) {
          case "prefix":
            //get preceding character and mark string position to splice
            closeBracketFlag = false;
            if (tipaAdvanced['brackets']) {
              xN += `{${stringT.substring(offset - 1, offset)}}`
            } else {
              xN += stringT.substring(offset - 1, offset)
            }
            slicePositions.push(offset - 1);
            break;

          case "infix":
            if (tipaAdvanced['brackets']) {
              xN = `${xN}{`
            }
            xN += stringT.substring(offset - 1, offset)
            closeBracketFlag = true;
            slicePositions.push(offset - 1);
            break;
        }
        x = xN;
      }
      return x;
    } else {
      return '';
    }
  });
  slicePositions.forEach(pos => {
    workingText = workingText.slice(0, pos) + workingText.slice(pos + 1)
  });

  return workingText;
}

function ipa2xtipa(text) {
  let slicePositions = [];
  let closeBracketFlag;
  let workingText = text.replace(ipaRE, (ipa, p1, offset, stringT, groups) => {
    const i = _ipa[ipa];
    let x = _table[i]['tipa'];

    if (!!ipa) {
      if (closeBracketFlag) {
        x += '}'
        closeBracketFlag = false;
      }
      if (!!_table[i]['tipaAdvanced']) {
        const tipaAdvanced = _table[i]['tipaAdvanced'];
        let xN = tipaAdvanced['macro'];

        //Get modified character
        switch (tipaAdvanced['param']) {
          case "prefix":
            //get preceding character and mark string position to splice
            closeBracketFlag = false;
            if (tipaAdvanced['brackets']) {
              xN += `{${stringT.substring(offset - 1, offset)}}`
            } else {
              xN += stringT.substring(offset - 1, offset)
            }
            slicePositions.push(offset - 1);
            break;

          case "infix":
            if (tipaAdvanced['brackets']) {
              xN = `${xN}{`
            }
            xN += stringT.substring(offset - 1, offset)
            closeBracketFlag = true;
            slicePositions.push(offset - 1);
            break;
        }
        x = xN;
      }
      return x;
    } else {
      return '';
    }
  });
  slicePositions.forEach(pos => {
    workingText = workingText.slice(0, pos) + workingText.slice(pos + 1)
  });

  return workingText;
}

module.exports = {
  xsampa2ipa,
  ipa2xsampa,
  xsampa2tipa,
  ipa2xtipa
};