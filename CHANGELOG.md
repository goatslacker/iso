# Changelog

## 0.5.0

### Breaking Changes

* `meta` property no longer exists. You can use the custom renderer and selector in order to add your own
custom meta properties and retrieve them.

* `config` was removed. You now pass in a `name` into the constructor which is then used to build up the keys.
You can further configure hwo things are presented by passing in a custom renderer and/or selector.

* `on` was removed as a static method of Iso. You should use `bootstrap` and pass in your own selector.
