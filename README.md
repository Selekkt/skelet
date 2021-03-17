# Skelet.<sup>3</sup>
#### Skelet. is a contemporary CSS framework which gives you the foundations to start building your next project right away.

Skelet. provides a simple, minimal yet solid starting point for websites.

Get started quickly with the HTML5 template, or just include skelet.css in your own project.


---

### Important changes in v3.3.0 
##### Grids, columns & flex
We discovered a compatibility issue with our custom `grid, flex & c` elements. 
The name of a custom element must contain a dash (-). `<x-grid> <x-flex> & <x-col>` are all valid names, while `<grid> <flex> & <c>` are not. This ensures forward compatibility when new tags are added to HTML. If you want to upgrade you need to make sure you've change your HTML elements with the new ones!


---

### Getting started

1. [DOWNLOAD ↓](https://github.com/Selekkt/skelet/archive/master.zip) the file.
2. Unzip skelet-master.zip
3. Two files to pay attenion to:
	- `skelet.html` = is the the HTML5 boilerplate
	- `css/skelet.css` = is the CSS framework

---

##### skelet.css via CDN 
If you need `skelet.css`, just add this tag in the `<head>`.
``` 
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/selekkt-skelet@latest/css/skelet.min.css">
``` 


or


``` 
https://cdn.jsdelivr.net/npm/selekkt-skelet@latest/css/skelet.min.css
https://cdn.jsdelivr.net/npm/selekkt-skelet@latest/css/skelet.css
``` 

---

##### Skelet on npm 
``` 
npm i selekkt-skelet
``` 

---

### Directory structure
This is the dir structure of Skelet. `docs` & `layouts` could be deleted if not needed.
``` 
skelet/
├── css/
│   ├── skelet.css (CSS boilerplate)
│   ├── skelet.min.css (Skelet. minified)
│   └── app.css (is where all of your other CSS goes)
├── js/
│   ├── modules.js (is for all of your JS frameworks)
│   └── app.js (is where all of your other JS goes)
├── img/
│   ├── logo.png
│   └── touch.png
├── LICENSE
├── README.md
└── skelet.html (HTML5 boilerplate)
``` 

---

### View the [Full Documentation →](https://selekkt.dk/skelet/v3/)
### View [Examples →](https://selekkt.dk/skelet/v3/#examples)

---

#### Skelet. is also available as themes for [Grav →](https://selekkt.dk/git/grav-skelet) and [WordPress →](https://selekkt.dk/git/wp-skelet)

---

### Built something you're proud of using Skelet.?
[Submit →](https://selekkt.dk/git/skelet/issues)


---
[![](https://data.jsdelivr.com/v1/package/npm/selekkt-skelet/badge)](https://www.jsdelivr.com/package/npm/selekkt-skelet)
