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

//searchbar
  //form entry
  //make axios call to people
  //if people is not in any of the objects, make axios call to next
  //if runs out of next, return not found
    //if next === null || if !next
  //else make popup with name and info

var searchBar = () => {
  var formInput = () => {
    var handleSubmit = () => {
      console.log('searching for ', input.value)
      //axios search logic here
    }

    var handleKeyDown = (input, e) => {
      if (e.key === 'Enter') {
        handleSubmit(input.value)
        input.value = ""
      }
    }

    var input = document.createElement('input')
    input.type = "text"
    input.placeholder = "search"
    input.addEventListener('keydown', handleKeyDown.bind(this, input), false)
    return input
  }
  var searchDiv = document.createElement('div')
  searchDiv.appendChild(formInput())
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