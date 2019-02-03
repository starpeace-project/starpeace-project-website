# starpeace-project-website
[![Build Status](https://travis-ci.org/starpeace-project/starpeace-project-website.svg)](https://travis-ci.org/starpeace-project/starpeace-project-website)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/starpeace-project/starpeace-project-website.svg)](https://github.com/starpeace-project/starpeace-project-website/stargazers)
[![Discord](https://img.shields.io/discord/449310464321650703.svg)](https://discord.gg/TF9Bmsj)
![Twitter Follow](https://img.shields.io/twitter/follow/starpeace_io.svg?style=social&label=Follow)

Website for [STARPEACE Project](https://www.starpeace-project.com): a Community for players and developers of the STARPEACE economic simulation and multiplayer game. https://www.starpeace-project.com

## STARPEACE

Looking to play STARPEACE or help contribute to a modern open-source re-build? Please explore the following repositories and join our [Discord chatroom](https://discord.gg/TF9Bmsj) to learn more!

### Client
* [starpeace-website](https://github.com/starpeace-project/starpeace-website) - static client homepage and license content
* [starpeace-website-client](https://github.com/starpeace-project/starpeace-website-client) - client game application logic and webgl rendering website
* [starpeace-website-client-assets](https://github.com/starpeace-project/starpeace-website-client-assets) - raw media assets, gameplay resources, and procedural generation logic for client
* [starpeace-website-documentation](https://github.com/starpeace-project/starpeace-website-documentation) - static and dynamic documentation website

### Server - Universe (identity management and galaxy directory)
* starpeace-server-univerese-api - STARPEACE Univerese API interface (TBD)

### Server - Galaxy (game-play and simulation server)
* [starpeace-server-galaxy-api](https://github.com/starpeace-project/starpeace-server-galaxy-api) - STARPEACE Galaxy API interface
* [starpeace-server-galaxy-nodejs](https://github.com/starpeace-project/starpeace-server-galaxy-nodejs) - STARPEACE Galaxy implementation in NodeJS using express

### Misc
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
