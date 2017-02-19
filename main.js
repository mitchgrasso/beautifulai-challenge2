var styles = {
  "list": {
    background: "orange",
    width: window.innerWidth / 3,
    "font-size": "1.25em",
    "font-family": "sans-serif",
  },
  "blueCenter": {
    width: window.innerWidth / 3,
    "font-family": "sans-serif",
    "text-align": "center",
    "background": "lightblue"
  },
  "searchBar": {
    width: window.innerWidth / 3
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

var searchBar = () => {
  var status = () => {
    var el = document.createElement('div')
    return el
  }

  var formInput = (status) => {
    var handleSubmit = (input, status) => {
      //move this
      var recursiveSearch = (val) => {
        var url = "http://swapi.co/api/people/?page=" + val
        var stats
        axios.get(url)
        .then((res) => {
          stats = res.data.results.filter((entry) => {
            return entry.name.toLowerCase() === input.toLowerCase()
          })
          if(stats[0]) {
            status.innerHTML = ""
            popUp(input)
            return
          }
          if (!stats.length && res.data.next) {
            recursiveSearch(val + 1)
          } else {
            status.innerHTML = "not found"
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
      recursiveSearch(1)
      utils.styleElement(status, "blueCenter")
      status.innerHTML = "searching for: " + input
    }

    var handleKeyDown = (input, status, e) => {
      if (e.key === 'Enter') {
        handleSubmit(input.value, status)
        input.value = ""
      }
    }

    var input = document.createElement('input')
    utils.styleElement(input, "searchBar")
    input.type = "text"
    input.placeholder = "search"
    input.addEventListener('keydown', handleKeyDown.bind(this, input, status), false)
    return input
  }

  var status = status()
  var searchDiv = document.createElement('div')
  searchDiv.appendChild(formInput(status))
  searchDiv.appendChild(status)
  document.body.appendChild(searchDiv)
}

var popUp = (data) => {
  //this is all the render method
  var popUp = document.createElement('div')
  utils.styleElement(popUp, "blueCenter")
  popUp.id = "popUp"
  popUp.innerHTML = "a popup about " + data + " - click to close"
  popUp.addEventListener("click", () => {
    document.body.removeChild(popUp)
  }, false)
  if (!document.getElementById('popUp')) {
    document.body.appendChild(popUp)
  }  else {
    document.body.removeChild(document.getElementById("popUp"))
    document.body.appendChild(popUp)
  }
}

var PersonEntry = (name, url) => {
  //todo -> make classes
  var PersonDetails = (data) => {
    var details = document.createElement("span")
    details.innerHTML = data
    return details
  }

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

  utils.styleElement(el, "list")
  el.appendChild(PersonDetails(name))
  document.body.appendChild(el)
}

window.onload = () => {
  searchBar()
  axios.get('http://swapi.co/api/people/')
  .then((res) => {
    res.data.results.forEach((entry) => {
      //fix code structure
      //ie var list = new PersonEntry(entry.name, entry.url)
      //list.render()
      //etc
      PersonEntry(entry.name, entry.url)
    })
  })
  .catch((err) => {
    console.log(err)
  })
}