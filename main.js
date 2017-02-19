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

var popUp = (data) => {
  console.log(data)
  var popUp = document.createElement('div')
  popUp.id = "popUp"
  popUp.innerHTML = data
  popUp.addEventListener("click", () => {
    document.body.removeChild(popUp)
  }, false)

  if(!document.getElementById('popUp')) {
    document.body.appendChild(popUp)
  } 
}

var PersonDetails = (data) => {
  var el = document.createElement("span")
  el.innerHTML = data
  return el
}

var PersonEntry = (name, url) => {
  var el = document.createElement("div")
  el.addEventListener("click", () => {
    axios.get(url)
    .then((res) => {
      popUp(res.data.name)
    })
    .catch((err) => {
      console.log(err)
    })
  }, false)
  utils.styleElement(el, "cool")
  el.appendChild(PersonDetails(name))
  document.body.appendChild(el)
}

window.onload = () => {
  axios.get('http://swapi.co/api/people/')
  .then((res) => {
    res.data.results.forEach((entry) => {
      PersonEntry(entry.name, entry.url)
    })
  })
  .catch((err) => {
    console.log(err)
  })
}