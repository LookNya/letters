Letters = {
  params:{
    minW: 200,
    minH: 200,
    maxWCount: 18,
    maxHCount: 10,
    showDelay: 4,
    updColorDelay: 20,
    updLetterDelay: 4300
  },
  elems: [[]],
  init: function(){
    Letters._genElems()
    Letters._showElems()
    Letters._rndColors()
    Letters._rndLetters()
  }
}
Letters._rndColors = function(){
  setInterval(rnd, Letters.params.updColorDelay)
  function rnd(){
    var elems = Letters.elems
    var el = elems[rd(0, elems.length-1)][rd(0, elems[0].length-1)].el
    el.style.color = "#"+((1<<24)*Math.random()|0).toString(16)
  }
}
Letters._rndLetters = function(){
  setInterval(rnd, Letters.params.updColorDelay)
  function rnd(){
    if(rd(0,1)) return
    var elems = Letters.elems
    var el = elems[rd(0, elems.length-1)][rd(0, elems[0].length-1)].inner
    el.textContent = String.fromCharCode( rd(65, 90) ).toUpperCase()
  }
}
Letters._showElems = function(){
  var i = 0;
  var j = 0
  var elems = Letters.elems
  var interval = setInterval(showEl, Letters.params.showDelay)

  function showEl(){
    el = elems[i][j].el
    el.classList.remove('hide')
    if(i == elems.length-1){
      clearInterval(interval)
    }
    if(j == elems[0].length-1){
       j = -1
       i++
    }
    j++
  }
}
Letters._genElems = function(){
  var maxWCount = Letters.params.maxWCount
  var maxHCount = Letters.params.maxHCount
  var body = document.body
  body.innerHTML = ''
  var rectSizes = Letters._getRectSisez()
  for(var i=0; i<maxHCount; i++){
    for(var j=0; j<maxWCount; j++){
      var el = document.createElement('div')
      el.className = 'letter hide'
      if(j==0 || i == maxHCount-1 || j == maxWCount-1) el.classList.add('hidden')
      el.style.width = rectSizes.w + 'px'
      el.style.height = rectSizes.h + 'px'

      var inner = document.createElement('div')
      inner.className = 'inner'
      inner.innerHTML = String.fromCharCode( rd(65, 90) ).toUpperCase()

      el.appendChild(inner)
      body.appendChild(el)

      if( !Letters.elems[i] ) Letters.elems[i] = []
      Letters.elems[i][j] = {el: el, inner: inner}
    }
  }
}
Letters._getRectSisez = function(){
  var minW = Letters.params.minW
  var minH = Letters.params.minH
  var maxWCount = Letters.params.maxWCount
  var maxHCount = Letters.params.maxHCount
  var screenW = document.body.offsetWidth
  var screenH = document.body.offsetHeight 

  var width = screenW / maxWCount < minW ? screenW / maxWCount : minW
  var height = screenH / maxHCount < minH ? screenH / maxHCount : minH

  return {w: Math.floor(width), h: Math.floor(height)}
}


function rd(min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}