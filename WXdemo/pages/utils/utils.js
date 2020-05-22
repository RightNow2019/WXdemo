function convertToStarsArray(stars) {
  let num = stars
  let array = []
  for (let i = 10; i <= 50; i = i + 10) {
    if (i <= num) {
      array.push(1)
    } else if (i > num && i - num === 5) {
      array.push(2)
    } else {
      array.push(0)
    }
  }
  return array
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray,
  convertToCastString,
  convertToCastInfos
}