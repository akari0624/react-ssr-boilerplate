# react + redux + reactRouter with SSR setting complete boilerplate

### feature
- isomorphic / universal server side rendering
- base on a express server
- support hot reload in development mode (via webpack Hot Module Replacement)

### usage
``` shell
git clone https://github.com/akari0624/react-ssr-boilerplate.git 
```

``` shell
cd react-ssr-boilerplate
```

``` shell
npm install
```

development mode support hot reload
``` shell
npm run ssr_dev
```

production mode that will generate real js bundle files
``` shell
npm run ssr_prod
```