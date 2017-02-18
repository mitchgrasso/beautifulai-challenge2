# beautiful.ai-engineer-challenge-2

This is the second of two engineer challenges for software developers applying for a position at Beautiful.ai.

This is a harder challenge intended to evaluate candidates for a more senior engineering role. 

## Summary
Beautiful.ai is a serverless single-page application which implements a full-stack mentality within the client. Our ideal candidate will
have detailed knowledge of how to architect and maintain a complicated Model-View architecture.

With this challenge, we are asking you to implement a simple single-page Model-View application that loads and presents data from an external API using vanilla javascript.

## Goal
- Demonstrate a strong understanding of MV architecture and how you would architect the flow of data from an external resource through a set of models and then into a view.
- Build a simple model-view single-page application from scratch
- Load data from the Star Wars API and present it in a view.
- Wire up some simple interactivity that loads additional data into a view upon user interaction.

## Your Task
- Create a single-page model-view application
  - Your application should bootstrap itself from index.html into a single main.js function
- Upon startup, load a list of people from the Star Wars API into your model
  - The url for loading people from the Star Wars API is http://swapi.co/api/people/
- Render a simple list of the people models you loaded including some properties from each model (like the person's name).
- Add interactivity so that when a user clicks on any person, you dynamically load additional data about that person's homeplanet from the Star Wars API and displays it's name.  
  - The url for loading a person's homeplanet is included in the JSON properties returned for each person.
- NOTE: Your model and view classes can be simple one-off javascript objects. You do not need to implement a full resuable framework. 

Documentation and more information about the Star Wars API can be found at https://swapi.co

## Project Constraints
- Do not use any 3rd-party MV frameworks like Backbone, React, or Angular.
- Do not use any 3rd-party SWAPI libraries.
- You may use 3rd-party utility libraries like jQuery or underscore if desired.
- Do not include any HTML tags in the body of your index.html page or use a templating engine. All DOM elements should be generated via javascript in your views.
- You may include a style sheet if you want to style your views.
- You are encouraged to but not required to use Javascript ES6.

## Bonus Task
- Add a search box to search across Star Wars people
- Style it to look beautiful.

## Submitting Your Work
Please clone this repo and check it into your own github account. Send an email to jobs@beautiful.ai with a link to the repository and your resume or portfolio links.

Thanks! And Good Luck!
