# font-family-no-missing-generic-family-keyword

Disallow a missing generic family keyword within font families.

<!-- prettier-ignore -->
```css
a { font-family: Arial, sans-serif; }
/**                     ↑
 * An example of generic family name */
```

The generic font family can be:

- placed anywhere in the font family list
- omitted if a keyword related to property inheritance or a system font is used

This rule checks the `font` and `font-family` properties.

## Options

### `true`

```json
{
  "font-family-no-missing-generic-family-keyword": true
}
```

The following patterns are considered problems:

<!-- prettier-ignore -->
```css
a { font-family: Helvetica, Arial, Verdana, Tahoma; }
```

<!-- prettier-ignore -->
```css
a { font: 1em/1.3 Times; }
```

The following patterns are _not_ considered problems:

<!-- prettier-ignore -->
```css
a { font-family: Helvetica, Arial, Verdana, Tahoma, sans-serif; }
```

<!-- prettier-ignore -->
```css
a { font: 1em/1.3 Times, serif, Apple Color Emoji; }
```

<!-- prettier-ignore -->
```css
a { font: inherit; }
```

<!-- prettier-ignore -->
```css
a { font: caption; }
```

<!-- prettier-ignore -->
```css
a { font-family: var(--font-family-common); }
```

<!-- prettier-ignore -->
```css
a { font-family: Helvetica, var(--font-family-common); }
```

## Optional secondary options

### `ignoreFontFamilies`

```json
{ "ignoreFontFamilies": ["array", "of", "font-families", "/regex/"] }
```

Given:

```json
{
  "font-family-no-missing-generic-family-keyword": [
    true,
    {
      "ignoreFontFamilies": ["custom-font"]
    }
  ]
}
```

The following pattern is _not_ considered a problem:

<!-- prettier-ignore -->
```css
a { font-family: custom-font; }
```

The following pattern is considered a problem:

<!-- prettier-ignore -->
```css
a { font-family: invalid-custom-font; }
```
