# Info

Theme name: Versatile Theme Theme
Theme machine name: versatile

## Abbreviations

#### themeMachineName.settings.yml

tsg - Theme settings global
ts - Theme settings

# Versatile Theme theme

## INTRODUCTION

Some description.

## FEATURES

- Drupal 11 compatible
- Can be used as is (subtheme is required for template overrides)

## REQUIREMENTS

[NPM](https://nodejs.org/en/)

### Installation: composer

INSTALLATION

<!-- `composer require drupal/versatile` -->

Head to `Appearance` and install versatile theme.

## CONFIGURATION

Head to `Appearance` and clicking versatile `settings`.

## Development and patching

- Install development dependencies by running `npm install`
- To compile PCSS (minified version for live environment ) run `npm run buil`
- To compile PCSS (for developers will compile each time you change the .pcss.css, and files ) run `npm run watch`
  <!-- - To lint SASS files run `npm run lint:sass` (it will fail build if lint fails) -->
  <!-- - To lint JS files run `npm run lint:js` (it will fail build if lint fails) -->

## FAQ

### FAQ - Hidden markdown examples

Link: [current documentation](https://getbootstrap.com/docs/5.0/components/dropdowns/#menu-items).

List:

- List 1
- List 2

Inline code `some code here`

Code section

```
/**
 * @file
 * Description.
*/

(function ($, Drupal) {
  Drupal.behaviors.general = {
    attach: function (context, settings) {
      // script.
    }
  };
});
```
