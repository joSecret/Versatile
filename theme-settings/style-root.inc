<?php

/**
 * @file
 * Versatile Theme theme file.
 */

$color = [
  'white' => theme_get_setting('sc__white'),
  'black' => theme_get_setting('sc__black'),
  'gray-100' => theme_get_setting('sc__gray_100'),
  'gray-200' => theme_get_setting('sc__gray_200'),
  'gray-300' => theme_get_setting('sc__gray_300'),
  'gray-400' => theme_get_setting('sc__gray_400'),
  'gray-500' => theme_get_setting('sc__gray_500'),
  'gray-600' => theme_get_setting('sc__gray_600'),
  'gray-700' => theme_get_setting('sc__gray_700'),
  'gray-800' => theme_get_setting('sc__gray_800'),
  'gray-900' => theme_get_setting('sc__gray_900'),
  'primary' => theme_get_setting('sc__primary'),
  'secondary' => theme_get_setting('sc__secondary'),
  'success' => theme_get_setting('sc__success'),
  'warning' => theme_get_setting('sc__warning'),
  'info' => theme_get_setting('sc__info'),
  'danger' => theme_get_setting('sc__danger'),
  'light' => theme_get_setting('sc__light'),
  'dark' => theme_get_setting('sc__dark'),
];

$link = [
  'color' =>
  theme_get_setting('sl__custom') ?
  theme_get_setting('sl__color') :
  $color['primary'],
];

/**
 *
 */
function _root($color, $link) {
  $root = ':root {';

  foreach ($color as $v => $k) {
    $root .= '--c-' . $v . ': ' . $k . ';';
  }

  $root .= '
    --font-sans-serif: ' . theme_get_setting('sf__sans_serif') . ';
    --body-font-family: ' . theme_get_setting('sf__family') . ';
    --body-font-size: ' . theme_get_setting('sf__size') . 'rem;

    --link-d: ' . theme_get_setting('sl__decoration') . ';
    --link-d-h: ' . theme_get_setting('sl__h_decoration') . ';
  ';

  $root .= '}';
  return $root;
}

$page['#attached']['html_head'][] = [
  [
    '#tag' => 'style',
    '#value' => _root($color, $link),
  ],
  'cms--base',
];
