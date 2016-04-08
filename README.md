# laravel-elixir-svg-concat
Concatenates and minifies svg files

##Install
`npm install laravel-elixir-svg-concat --save-dev`

##Usage
```javascript
var Elixir = require('laravel-elixir');
require('laravel-elixir-svg-concat');
...

elixir(function(mix) {
  mix.svg(src, output, options);
});
```
