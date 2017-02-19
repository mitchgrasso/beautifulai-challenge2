var styles = {
  "div": {
    background: "grey",
    "font-size": "100px",
    border: "1px solid green"
  },
  "cool class": {
    background: "orange"
  }
}

var utils = {
  styleElement: (el, className) => {
    var tag = el.tagName.toLowerCase()
    if(!className) {
      for(var key in styles[tag]) {
        el.style[key] = styles[tag][key]
      }
    } else {
      for(var key in styles[className]) {
        el.style[key] = styles[className][key]
      }
    }
  }
}


var test = document.createElement('div')
utils.styleElement(test, "cool class")
test.innerHTML = "div1"
var test2 = document.createElement('span')
test2.innerHTML = "span1"
test.appendChild(test2)
document.body.appendChild(test)