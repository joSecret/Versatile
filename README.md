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
* Drupal 8 and 9 compatible
* Can be used as is (subtheme is required for template overrides)
* Bootstrap v5.2.2 library
* Bootstrap v5.2.2 breakpoints

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
- To compile SASS and JS (minified version for live environment ) run `gulp`
- To compile SASS and JS (for developers will compile each time you change the .sass, .js and .twig files ) run `gulp watch`
<!-- - To lint SASS files run `npm run lint:sass` (it will fail build if lint fails) -->
<!-- - To lint JS files run `npm run lint:js` (it will fail build if lint fails) -->


## FAQ
### FAQ - Hidden markdown examples
Link: [current documentation](https://getbootstrap.com/docs/5.0/components/dropdowns/#menu-items).

List:
* List 1
* List 2

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
