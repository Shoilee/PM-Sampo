[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
# PM-Sampo

PM-Sampo offers a complete full-stack JavaScript application. PM-Sampo provides a semantic portal UI tailored for provenance research. The framework facilitates data visualization, analysis, and knowledge discovery in historical object provenance. It serves as the base framework for research prototypes, enabling visualization of provenance data, historical event detection, and actor relationships.

Live demo is available at [pmsampo.demo.seco.cs.aalto.fi](https://pmsampo.demo.seco.cs.aalto.fi/en), integrating perspectives for provenance research use-case.

PM-Sampo reuses the Sampo-UI design philosopy. [Sampo-UI](https://sampo-ui.demo.seco.cs.aalto.fi/en/) offers a comprehensive "starting base" of a full stack JavaScript web application. 
Therefore it is not possible to include Sampo-UI as separate component into an existing 
application. The 
most convenient way to build a new user interface using Sampo-UI is to read the documentation 
provided below, fork this repository, and start developing from there. For more information on SAMPO-UI visit: https://seco.cs.aalto.fi/tools/sampo-ui/


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

## Feedback

If you find a bug or have suggestions for improvement, please **add an issue** in the repository:  
1. Go to the **Issues** tab.  
2. Click on **New Issue**.  
3. Provide a clear description of the problem:  
   - Steps to reproduce  
   - Expected vs. actual behavior  
   - Screenshots or error messages (if applicable)  
4. Click **Submit** and our team will review it.  Thank you for your feedback! 🚀  


## Development Team

PM-Sampo is developed by an collaborative effort between [Semantic Computing Research (SeCo) Group ](https://seco.cs.aalto.fi) at Aalto University and [User-Centric Data Science (UCDS) Group](https://ucds.cs.vu.nl/) at the Vrije Universiteit Amsterdam, Finland. Contact [Sarah Shoilee](mailto:s.b.a.shoilee@vu.nl) for more details.

**Acknowledgments.** PM-Sampo is an outcome of a research project, which is supported by the NWA-funded project Pressing Matter (NWA.1292.19.419), by the Research Council of Finland FIN-CLARIAH funding from the European Union NextGenerationEU instrument, and by the Aalto Science Institute (ASCI) Visiting Doctoral Researcher Programme, which facilitated collaboration and knowledge exchange between Vrije Universiteit Amsterdam and Aalto University, Finland. Computing resources provided by the CSC -- IT Center for Science were used in our work.
