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

var searchBar = () => {
  var status = () => {
    var el = document.createElement('div')
    return el
  }

  var formInput = (status) => {
    var handleSubmit = (input, status) => {
      var recursiveSearch = (val) => {
        var url = "http://swapi.co/api/people/?page=" + val
        var stats
        axios.get(url)
        .then((res) => {
          stats = res.data.results.filter((entry) => {
            return entry.name.toLowerCase() === input.toLowerCase()
          })
          console.log(stats)
          console.log(res.data.next)
          if(stats[0]) {
            console.log("found")
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
      status.innerHTML = "searching for: " + input
    }

    var handleKeyDown = (input, status, e) => {
      if (e.key === 'Enter') {
        handleSubmit(input.value, status)
        input.value = ""
      }
    }

    var input = document.createElement('input')
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
  var popUp = document.createElement('div')
  popUp.id = "popUp"
  popUp.innerHTML = "a popup about " + data
  popUp.addEventListener("click", () => {
    document.body.removeChild(popUp)
  }, false)

  if(!document.getElementById('popUp')) {
    document.body.appendChild(popUp)
  } 
}

var PersonEntry = (name, url) => {
  //todo -> make obj instead of var
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

  utils.styleElement(el, "cool")
  el.appendChild(PersonDetails(name))
  document.body.appendChild(el)
}

window.onload = () => {
  searchBar()
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