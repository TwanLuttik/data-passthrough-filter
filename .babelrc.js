const presets = ['@babel/preset-typescript', 'minify'];

const plugins = ['@babel/plugin-transform-typescript'];

const misc = { comments: false };

module.exports = { presets, plugins, ...misc };
