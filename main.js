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
  },
  createEl: (el, content, className) => {
    el = document.createElement(el)
    el.innerHTML = content
    utils.styleElement(el, className)
    return el
  }
}

//////////////////////////////////////////////////////

class InputComponent {
  constructor (status) {
    this.status = status
  }

  handleSubmit (input) {
    var recursiveSearch = (val) => {
      var url = "http://swapi.co/api/people/?page=" + val
      axios.get(url)
      .then((res) => {
        var stats = res.data.results.filter((entry) => {
          return entry.name.toLowerCase() === input.toLowerCase()
        })
        if(stats[0]) {
          this.status.innerHTML = null
          document.body.appendChild(new popUpComponent(input).render())
          //this.container.appendChild
          return
        }
        if (!stats.length && res.data.next) {
          recursiveSearch(val + 1)
        } else {
          this.status.innerHTML = "not found"
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
    recursiveSearch(1)
    utils.styleElement(this.status, "blueCenter")
    this.status.innerHTML = "searching for: " + input
  }

  handleKeyDown (input, e) {
    if (e.key === 'Enter') {
      this.handleSubmit(input.value)
      input.value = ""
    }
  }

  render () {
    this.input = utils.createEl('input', null, 'searchBar')
    this.input.type = "text"
    this.input.placeholder = "search"
    this.input.addEventListener('keydown', this.handleKeyDown.bind(this, this.input), false)
    return this.input
  }
}

//searchbar

var searchBar = () => {
  var searchDiv = utils.createEl('div', null)
  var status = utils.createEl('div', null)
  searchDiv.appendChild(status)
  searchDiv.appendChild(new InputComponent(status).render())
  document.body.appendChild(searchDiv)
}


//popup

class popUpComponent {
  constructor(data) {
    this.data = data;
  }

  render () {
    this.popUp = utils.createEl('div', "a popup about " + this.data + " - click to close", "blueCenter")
    this.popUp.id = "popUp"
    this.popUp.addEventListener("click", () => {
      document.body.removeChild(this.popUp)
    }, false)

    if (!document.getElementById('popUp')) {
      return this.popUp
    }  else {   
      document.body.removeChild(document.getElementById("popUp")) //move this to runtime?
      return this.popUp
    }
  }
}


//list entry

class EntryComponent {
  constructor (name, url) {
    this.name = name
    this.url = url
  }

  render () {
    this.entry = utils.createEl("div", this.name, "list")
    this.entry.addEventListener("click", () => {
      axios.get(this.url)
      .then((res) => {
        // console.log(res.data) //add more data
        document.body.appendChild(new popUpComponent(res.data.name).render())
        //create pointer to parent container in constructor, call method on parent instead
        //this.container.appendChild
      })
      .catch((err) => {
        console.log(err)
      })
    }, false)
    return this.entry
  }
}

//init

window.onload = () => {
  //var container = utils.createEl('div', null, 'some container class')
  //container should have a render
  axios.get('http://swapi.co/api/people/')
  .then((res) => {
    searchBar()
    res.data.results.forEach((entry) => {
      document.body.appendChild(new EntryComponent(entry.name, entry.url).render()) //then add container params here to call re render
    })
  })
  .catch((err) => {
    console.log(err)
  })
}