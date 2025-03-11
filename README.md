[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
# PM-Sampo

PM-Sampo offers a complete full-stack JavaScript application. PM-Sampo provides a semantic portal UI tailored for provenance research. The framework facilitates data visualization, analysis, and knowledge discovery in historical object provenance. It serves as the base framework for research prototypes, enabling visualization of provenance data, historical event detection, and actor relationships.

Live demo is available at [pmsampo.demo.seco.cs.aalto.fi](https://pmsampo.demo.seco.cs.aalto.fi/en), integrating perspectives for provenance research use-case.

PM-Sampo reuses the Sampo-UI design philosopy. [Sampo-UI](https://sampo-ui.demo.seco.cs.aalto.fi/en/) offers a comprehensive "starting base" of a full stack JavaScript web application. 
Therefore it is not possible to include Sampo-UI as separate component into an existing 
application. The 
most convenient way to build a new user interface using Sampo-UI is to read the documentation 
provided below, fork this repository, and start developing from there. For more information on SAMPO-UI visit: https://seco.cs.aalto.fi/tools/sampo-ui/

## Development Team

PM-Sampo is developed by an collaborative effort between [Semantic Computing Research (SeCo) Group ](https://seco.cs.aalto.fi) at Aalto University and [User-Centric Data Science (UCDS) Group](https://ucds.cs.vu.nl/) at the Vrije Universiteit Amsterdam, Finland. Contact [Sarah Shoilee](mailto:s.b.a.shoilee@vu.nl) for more details.




## Requirements

* [Node.js® &ndash; a JavaScript runtime built on Chrome's V8 JavaScript engine.](https://nodejs.org/en/) (version 16.13.0)

* [Nodemon &ndash; monitor for any changes in your source and automatically restart your server](https://nodemon.io/)

Note for Linux users: if your home directory is mounted from a network drive, using the [Node Version Manager](https://github.com/nvm-sh/nvm) for installing Node.js highly recommended. 

## Installation

### Local development

Install the dependencies specified in `package.json` (this command needs to be run only once,
  as long as you don't modify the dependencies):

`npm install`

Run client and server concurrently:

`npm run dev`
