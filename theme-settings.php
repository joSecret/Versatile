<?php

/**
 * @file
 * Versatile Theme theme file.
 *
 * Demo description with code and link
 *  '#description' => t('Demo code <code>.theme-colors</code> and link @demo_link.', [
 *    '@demo_link' => Link::fromTextAndUrl('Containers',
 *                    Url::fromUri('https://getbootstrap.com/docs/5.0/layout/containers/', [
 *                      'absolute' => TRUE,
 *                      'fragment' => 'containers'
 *                     ]))->toString(),
 *  ]),
 */

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StreamWrapper\StreamWrapperManager;

/**
 * Implements hook_form_FORM_ID_alter().
 */
function versatile_form_system_theme_settings_alter(&$form, FormStateInterface $form_state, $form_id = NULL) {
  if (isset($form_id)) {
    return;
  }

  $options_theme = [
    'none' => 'do not apply theme',
    'light' => 'light (dark text/links against a light background)',
    'dark' => 'dark (light/white text/links against a dark background)',
  ];

  $options_colour = [
    'default' => 'Use default color',
    'primary' => 'primary',
    'secondary' => 'secondary',
    'light' => 'light',
    'dark' => 'dark',
  ];

  $options_container = [
    'container' => 'Fixed',
    'container-fluid' => 'Fluid',
    'container-grid' => 'Grid container',
  ];

  $form['versatile'] = [
    '#type' => 'vertical_tabs',
    '#title' => t('Theme settings'),
    // '#prefix' => '<div class="h2">' . t('Some text before title') . '</div>',
    '#weight' => -10,
  ];

  // Main settings.
  $form['settings'] = [
    '#type'         => 'details',
    '#title'        => t('Main'),
      // '#description'  => t('some description'),
    '#group' => 'versatile',
    '#weight' => 1,
  ];
  include 'theme-settings/settings-global.inc';

  // Sections settings.
  $form['sections'] = [
    '#type'         => 'details',
    '#title'        => t('Sections'),
    '#group' => 'versatile',
    '#weight' => 2,
  ];
  include 'theme-settings/settings-sections.inc';

  // Style settings.
  $form['style'] = [
    '#type'         => 'details',
    '#title'        => t('Style'),
    '#description'  => t('Style colors, sizes etc'),
    '#group' => 'versatile',
    '#weight' => 3,
  ];
  include 'theme-settings/settings-style.inc';

  // Logo per language.
  $languages = \Drupal::config('language.negotiation')->get('url.prefixes');
  $language_entities = \Drupal::languageManager()->getLanguages();
  $theme = str_replace('.settings', '', $form['config_key']['#value']);
  foreach ($languages as $key => $language) {
    if (!empty($language)) {
      // Define array keys.
      $logo_key = 'logo_' . $key;
      $logo_settings_key = $logo_key . '_settings';
      $logo_default_key = 'versatile_default_logo_' . $key;
      $logo_path_key = 'versatile_' . $key . '_logo_path';
      $logo_upload_key = 'versatile_' . $key . '_logo_upload';

      // Clone logo form item.
      $form[$logo_key] = $form['logo'];
      $form[$logo_key]['#title'] = 'Logo - ' . $language_entities[$key]->getName();
      $form[$logo_key][$logo_default_key] = $form[$logo_key]['default_logo'];
      $form[$logo_key][$logo_default_key]['#default_value'] = theme_get_setting($logo_default_key, $theme);
      unset($form[$logo_key]['default_logo']);

      // Change cloned form item keys.
      $form[$logo_key][$logo_settings_key] = $form[$logo_key]['settings'];
      $form[$logo_key][$logo_settings_key][$logo_path_key] = $form[$logo_key]['settings']['logo_path'];
      $form[$logo_key][$logo_settings_key][$logo_path_key]['#default_value'] = theme_get_setting($logo_path_key, $theme);
      $form[$logo_key][$logo_settings_key][$logo_path_key]['#description'] = $form['logo']['settings']['logo_path']['#description'];
      $form[$logo_key][$logo_settings_key][$logo_upload_key] = $form[$logo_key]['settings']['logo_upload'];
      // Set validation extensions.
      $form[$logo_key][$logo_settings_key][$logo_upload_key]['#upload_validators'] = [
        'file_validate_extensions' => ['gif png jpg jpeg svg'],
      ];
      $form[$logo_key][$logo_settings_key][$logo_upload_key]['#default_value'] = theme_get_setting($logo_upload_key, $theme);
      $form[$logo_key][$logo_settings_key][$logo_upload_key]['#upload_location'] = \Drupal::config('system.file')->get('default_scheme') . '://';

      $form[$logo_key][$logo_settings_key]['#states']['invisible'] = [
        'input[name="' . $logo_default_key . '"]' => [
          'checked' => TRUE,
        ],
      ];
      // Unset unwanted items.
      unset($form[$logo_key]['settings']);
      unset($form[$logo_key][$logo_settings_key]['logo_path']);
      unset($form[$logo_key][$logo_settings_key]['logo_upload']);
    }
  }
  $form['#validate'][] = 'versatile_validate';
  $form['#submit'][] = 'versatile_theme_settings_submit';
}

/**
 * Validates submission values in the FORM_ID() form.
 */
function versatile_validate(array &$form, FormStateInterface $form_state) {
  // Logo per language.
  $languages = \Drupal::config('language.negotiation')->get('url.prefixes');
  foreach ($languages as $key => $language) {
    if (!empty($language)) {
      $logo_path_key = 'versatile_' . $key . '_logo_path';
      if (!empty($form_state->getValue($logo_path_key))) {
        if (!versatile_validate_path($form_state->getValue($logo_path_key))) {
          $form_state->setErrorByName($logo_path_key, t('The custom logo path is invalid.'));
        }
      }
      if (!empty($form_state->getValues()['versatile_' . $key . '_logo_upload'])) {
        $file = _file_save_upload_from_form($form['logo_' . $key]['logo_' . $key . '_settings']['versatile_' . $key . '_logo_upload'], $form_state, 0);
        if ($file) {
          $filename = \Drupal::service('file_system')->copy($file->getFileUri(), 'public://');
          $form_state->setValue('versatile_' . $key . '_logo_path', $filename);
          $form_state->setValue('versatile_' . $key . '_logo_upload', NULL);
        }
      }
    }
  }
}

/**
 * Custom submit handler for the theme settings form.
 */
function versatile_theme_settings_submit($form, FormStateInterface $form_state) {
  $languages = \Drupal::config('language.negotiation')->get('url.prefixes');
  $values = $form_state->getValues();
  foreach ($languages as $key => $language) {
    if (!empty($values['versatile_' . $key . '_logo_path'])) {
      \Drupal::configFactory()->getEditable('versatile.settings')
        ->set('versatile_' . $key . '_logo_path', $filename)
        ->save();
    }
  }
}

/**
 * Helper function for the system_theme_settings form.
 *
 * Attempts to validate normal system paths, paths relative to the public files
 * directory, or stream wrapper URIs. If the given path is any of the above,
 * returns a valid path or URI that the theme system can display.
 *
 * @param string $path
 *   A path relative to the Drupal root or to the public files directory, or
 *   a stream wrapper URI.
 *
 * @return mixed
 *   A valid path that can be displayed through the theme system, or FALSE if
 *   the path could not be validated.
 */
function versatile_validate_path($path) {
  // Absolute local file paths are invalid.
  if (\Drupal::service('file_system')->realpath($path) == $path) {
    return FALSE;
  }
  // A path relative to the Drupal root or a fully qualified URI is valid.
  if (is_file($path)) {
    return $path;
  }
  // Prepend 'public://' for relative file paths within public filesystem.
  if (StreamWrapperManager::getScheme($path) === FALSE) {
    $path = 'public://' . $path;
  }
  if (is_file($path)) {
    return $path;
  }
  return FALSE;
}
