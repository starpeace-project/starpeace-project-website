# starpeace-project-website
## Development

Local development can be accomplished in a few commands. The following build-time dependencies must be installed:

* [Node.js](https://nodejs.org/en/) javascript runtime and [npm](https://www.npmjs.com/get-npm) package manager

Retrieve copy of repository and navigate to root:

```
$ git clone https://github.com/starpeace-project/starpeace-project-website.git
$ cd starpeace-project-website
```

Install starpeace-project-website dependencies:

```
$ npm install
```

Build repository with npm command defined in package.json:

```
$ npm run generate
```

Local development with nuxtjs and interactive build can be started with a single command:

```
$ npm run dev
```

nuxtjs webserver is started locally and can be accessed at http://127.0.0.1:11050. Only this specific local URL is whitelisted to retrieve assets from CDN (normally cross-site errors).
