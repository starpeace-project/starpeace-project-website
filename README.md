# starpeace-project-website
[![Build Status](https://travis-ci.org/starpeace-project/starpeace-project-website.svg)](https://travis-ci.org/starpeace-project/starpeace-project-website)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/starpeace-project/starpeace-project-website.svg)](https://github.com/starpeace-project/starpeace-project-website/stargazers)
[![Discord](https://img.shields.io/discord/449310464321650703.svg?logo=discord)](https://discord.gg/TF9Bmsj)
![Twitter Follow](https://img.shields.io/twitter/follow/starpeace_io.svg?style=social&label=Follow)

Website for [STARPEACE Project](https://www.starpeace-project.com): a Community for players and developers of the STARPEACE economic simulation and multiplayer game. https://www.starpeace-project.com

## STARPEACE

Looking to play STARPEACE or help contribute to a modern open-source re-build? Please explore the following repositories and join our [Discord chatroom](https://discord.gg/TF9Bmsj) to learn more!

### Client
* [starpeace-website](https://github.com/starpeace-project/starpeace-website) - static client homepage and license content
* [starpeace-client-website](https://github.com/starpeace-project/starpeace-client-website) - client game application logic and webgl rendering website
* [starpeace-client-website-assets](https://github.com/starpeace-project/starpeace-client-website-assets) - procedural generation and compilation logic of assets for client
* [starpeace-documentation-website](https://github.com/starpeace-project/starpeace-documentation-website) - static and dynamic documentation website

### Server - Multiverse (game-play and simulation server)
* [starpeace-server-multiverse-api](https://github.com/starpeace-project/starpeace-server-multiverse-api) - STARPEACE Multiverse API interface
* [starpeace-server-multiverse-nodejs](https://github.com/starpeace-project/starpeace-server-multiverse-nodejs) - STARPEACE Multiverse implementation in NodeJS using express

### Misc
* [starpeace-assets](https://github.com/starpeace-project/starpeace-assets) - raw media assets, gameplay resources, and simulation configurations
* [starpeace-assets-types](https://github.com/starpeace-project/starpeace-assets-types) - Javascript types representing gameplay resources and simulation configurations
* [starpeace-documents-public](https://github.com/starpeace-project/starpeace-documents-public) - public design, planning, and gameplay documents
* [starpeace-project-website](https://github.com/starpeace-project/starpeace-project-website) - project static content, auto-generated API documentation, and community information

Be sure to checkout [StarPeace Online](https://www.starpeaceonline.com) to play using legacy Windows client and servers.

## Security Vulnerabilities

If you discover a security vulnerability within STARPEACE, please send an e-mail to security@starpeace.io or open a [GitHub issue](https://github.com/starpeace-project/starpeace-project-website/issues). All security vulnerabilities will be promptly addressed.

## Development, Build, and Deployment

Please see [development manual](./DEVELOPMENT.md) for starpeace-project-website development instructions.

After building repository, website is compiled into static resources within the ```/dist/``` folder. These resources should be served as static assets from web application and can be cached if desired.

### www.starpeace-project.com

Repository is currently deployed to and hosted with AWS S3. Changes pushed to repository will activate webhook to AWS CodePipeline, triggering automatic rebuild and deployment of website resources.

## License

All media content (images, sounds) of starpeace-project-website is licensed under the [Creative Commons Attribution NonCommercial ShareAlike 4.0 license](https://creativecommons.org/licenses/by-nc-sa/4.0), all non-media content is licensed under the [Creative Commons Attribution 4.0 license](https://creativecommons.org/licenses/by/4.0), and the underlying source code used to format and display that content is licensed under the [MIT license](https://opensource.org/licenses/mit-license.php).
