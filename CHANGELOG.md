# Changelog

## 0.5.1

Iso is now escaping state information by default again.

The following tokens are escaped: `<` and `>`. If you need to escape any other
tokens you should do so yourself.

## 0.5.0

### Breaking Changes

* `meta` property no longer exists. You can use the custom renderer and selector in order to add your own
custom meta properties and retrieve them.

* `config` was removed. You now pass in a `name` into the constructor which is then used to build up the keys.
You can further configure hwo things are presented by passing in a custom renderer and/or selector.

* `on` was removed as a static method of Iso. You should use `bootstrap` and pass in your own selector.

IMPORTANT NOTE!

Iso no longer escapes state information by default when it is sent down to the client.

Previously the state was deployed into a data attribute in a div and thus the JSON stringified content had to be escaped for browsers to parse it correctly.
Now the state is being placed inside a script tag with a type of 'application/json' and no longer escaped. This means that if you're not escaping your own data
before passing it to iso, or you were relying on iso's escaping, you might have an XSS vulnerability and should carefully check your payloads.
