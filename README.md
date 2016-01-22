React/Relay/Redux Boilerplate
---

# Rationale

This repo mostly serves as documentation of my current foray into React/Relay with Redux to manage local state. It doesn't do much at the moment — it just provides the necessary setup for creating/updating basic user accounts. I'll continue to update it as I get a better sense of what (not) to do with this setup.

It goes without saying, but all of the dependencies are the sole intellectual property of their (awesome) creators.

# Highlights

- [React](https://github.com/facebook/react): Components!
- [Relay](https://github.com/facebook/relay): Colocation (etc.)!
- [Redux](https://github.com/rackt/redux): Local state!
- [React Relay Router](https://github.com/relay-tools/react-router-relay): Based on the awesome [React Router](https://github.com/rackt/react-router)
- [Webpack](https://github.com/webpack/webpack): I'd love to get [hot module reloading](https://github.com/gaearon/react-transform-hmr) working again.

Also, [Basscss](http://www.basscss.com/) is the honest-to-goodness shit.

# Can I use it?

Sure, but it's not production-ready. You'll need to update `index.js` and `webpack.config.js` according to your production needs. (I'm working on figuring out what _my_ production needs are, and will update those files accordingly once I have some idea.)

Just fork and run the following and you should be good to go:

```
$ git clone git@github.com:[YOUR_USERNAME]/react-relay-redux-boilerplate.git
$ cd react-relay-redux-boilerplate
$ npm install
$ npm run db:migrate
$ npm test # only if you really want to
$ npm run dev
```

# License

The MIT License (MIT)

Copyright (c) 2016 Charles Pletcher

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
