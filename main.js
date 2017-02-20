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

  recursiveSearch (val, input) {
    var url = "http://swapi.co/api/people/?page=" + val
    axios.get(url)
    .then((res) => {
      var stats = res.data.results.filter((entry) => {
        return entry.name.toLowerCase() === input.toLowerCase()
      })
      if(stats[0]) {
        this.status.innerHTML = null
        document.body.appendChild(new popUpComponent(stats[0].name, stats[0].homeworld).render())
        return
      }
      if (!stats.length && res.data.next) {
        this.recursiveSearch(val + 1, input)
      } else {
        this.status.innerHTML = "not found"
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleSubmit (input) {
    this.recursiveSearch(1, input)
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

class SearchBar {
  render () {
    this.container = utils.createEl('div', null)
    this.status = utils.createEl('div', null)
    this.container.appendChild(new InputComponent(this.status).render())
    this.container.appendChild(this.status)
    return this.container
  }
}

//popup

class popUpComponent {
  constructor (name, homeworld) {
    this.name = name;
    this.homeworld = homeworld
  }

  render () {
    this.popUp = utils.createEl('div', null, "blueCenter")
    this.popUp.id = "popUp"

    this.loading = utils.createEl('p', "loading")
    this.loading.id = "popup_loading"
    this.popUp.appendChild(this.loading)
  
    axios.get(this.homeworld).then((res) => {
      this.popUp.removeChild(document.getElementById("popup_loading"))

      this.close_button = utils.createEl('div', 'X')
      this.close_button.addEventListener("click", () => {
        document.body.removeChild(this.popUp)
      }, false)
      this.popUp.appendChild(this.close_button)

      this.content_name = utils.createEl('h4', this.name)
      this.content_homeworld = utils.createEl('p', this.name + "'s home planet is " + res.data.name)
      this.popUp.appendChild(this.content_name)
      this.popUp.appendChild(this.content_homeworld)
    })

    if (!document.getElementById('popUp')) {
      return this.popUp
    } else {
      document.body.removeChild(document.getElementById("popUp"))
      return this.popUp
    }
  }
}

//entry

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
        document.body.appendChild(new popUpComponent(res.data.name, res.data.homeworld).render())
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
  //add resize listener
  //and a next/prev page listener

  document.body.appendChild(new SearchBar().render())

  axios.get('http://swapi.co/api/people/') //url can be passed in constructor of container
  .then((res) => {
    res.data.results.forEach((entry) => {
      document.body.appendChild(new EntryComponent(entry.name, entry.url).render())
    })
  })
  .catch((err) => {
    console.log(err)
  })
}