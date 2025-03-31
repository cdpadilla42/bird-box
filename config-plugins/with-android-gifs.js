const {
  createRunOncePlugin,
  WarningAggregator,
  withAppBuildGradle,
} = require('@expo/config-plugins');

const GIF_LIBRARY = {
  name: 'com.facebook.fresco:animated-gif',
  version: '2.0.0',
};

/**
 * Add Gif animation support for Android.
 * It does that by adding the missing Gradle libraries for gif animations.
 * @see https://reactnative.dev/docs/image#gif-and-webp-support-on-android
 */
const withAndroidGif = (config) => {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      config.modResults.contents = addGradleDependency(
        config.modResults.contents,
        GIF_LIBRARY
      );
    } else {
      WarningAggregator.addWarningAndroid(
        'android-gif-support',
        `Cannot add GIF libraries to project build.gradle if it's not groovy`
      );
    }
    return config;
  });
};

module.exports = createRunOncePlugin(
  withAndroidGif,
  'android-gif-support',
  '1.0.0'
);

function addGradleDependency(buildGradle, library) {
  if (buildGradle.includes(library.name)) {
    return buildGradle;
  }

  return buildGradle.replace(
    /dependencies\s?{/,
    `dependencies {
		implementation "${library.name}:${library.version}"`
  );
}
