var styles = {
  "div": {
    background: "grey",
    "font-size": "100px",
    border: "1px solid green"
  },
  "cool": {
    background: "orange"
  }
}

var utils = {
  getData: (url, cb, params) => {
    axios.get(url).then((res) => {
      res.data.results.forEach((entry) => {
        cb(entry[params])
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  styleElement: (el, className) => {
    var tag = el.tagName.toLowerCase()
    if(!className) {
      for (var key in styles[tag]) {
        el.style[key] = styles[tag][key]
      }
    } else {
      for (var key in styles[className]) {
        el.style[key] = styles[className][key]
      }
    }
  }
}

var popUp = () => {

}

var PersonDetails = (data) => {
  var el = document.createElement("span")
  el.innerHTML = data
  return el
}

var PersonEntry = (data) => {
  var el = document.createElement("div")
  el.addEventListener("click", () => {
    console.log("removed" + el)
    document.body.removeChild(el)
    //render some details
  }, false)
  el.appendChild(PersonDetails(data))
  document.body.appendChild(el)
}

window.onload = () => {
  utils.getData('http://swapi.co/api/people/', PersonEntry, "name")
}