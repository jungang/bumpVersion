/**
 * gulp-git-push
 * Pushes all committed changes to a remote repository.
 * 
 * @module gulp-git-push
 */

'use strict';

const through = require('through2');
const PluginError = require('plugin-error');
const log = require('fancy-log');
const colors = require('ansi-colors');
const git = require('gulp-git');

const PLUGIN_NAME = 'gulp-git-push';

/**
 * Default options for the plugin
 * @constant {Object}
 */
const DEFAULT_OPTIONS = Object.freeze({
    repository: 'origin',
    refspec: 'HEAD',
    options: Object.freeze({ args: '--follow-tags' })
});

/**
 * Validates and normalizes plugin options
 * @param {Object} options - User provided options
 * @returns {Object} Validated options object
 * @throws {PluginError} If options are invalid
 */
function validateOptions(options) {
    // Handle null/undefined - use all defaults
    if (options == null) {
        return { 
            repository: DEFAULT_OPTIONS.repository,
            refspec: DEFAULT_OPTIONS.refspec,
            options: { ...DEFAULT_OPTIONS.options }
        };
    }
    
    // Must be a plain object
    if (typeof options !== 'object' || Array.isArray(options)) {
        throw new PluginError(PLUGIN_NAME, 
            `Options must be a plain object, received: ${typeof options}`);
    }
    
    const validated = {};
    
    // Validate repository
    if (options.repository !== undefined) {
        if (typeof options.repository !== 'string') {
            throw new PluginError(PLUGIN_NAME,
                `options.repository must be a string, received: ${typeof options.repository}`);
        }
        if (options.repository.trim() === '') {
            throw new PluginError(PLUGIN_NAME,
                'options.repository cannot be an empty string');
        }
        validated.repository = options.repository;
    } else {
        validated.repository = DEFAULT_OPTIONS.repository;
    }
    
    // Validate refspec
    if (options.refspec !== undefined) {
        if (typeof options.refspec !== 'string') {
            throw new PluginError(PLUGIN_NAME,
                `options.refspec must be a string, received: ${typeof options.refspec}`);
        }
        if (options.refspec.trim() === '') {
            throw new PluginError(PLUGIN_NAME,
                'options.refspec cannot be an empty string');
        }
        validated.refspec = options.refspec;
    } else {
        validated.refspec = DEFAULT_OPTIONS.refspec;
    }
    
    // Validate git options
    if (options.options !== undefined) {
        if (typeof options.options !== 'object' || options.options === null || Array.isArray(options.options)) {
            throw new PluginError(PLUGIN_NAME,
                `options.options must be an object, received: ${typeof options.options}`);
        }
        validated.options = { ...DEFAULT_OPTIONS.options, ...options.options };
    } else {
        validated.options = { ...DEFAULT_OPTIONS.options };
    }
    
    return validated;
}

/**
 * Creates a gulp plugin stream that pushes to remote repository
 * 
 * Key improvement: Push happens ONCE at the end of the stream (in flush),
 * not for every file that passes through. This fixes the multiple-push bug.
 * 
 * @param {Object} [options] - Plugin options
 * @param {string} [options.repository='origin'] - Remote repository name
 * @param {string} [options.refspec='HEAD'] - Git refspec
 * @param {Object} [options.options={args: '--follow-tags'}] - Additional git push options
 * @returns {Transform} Transform stream
 * @throws {PluginError} If options are invalid or push fails
 * 
 * @example
 * // Basic usage
 * gulp.src('./package.json')
 *   .pipe(git.commit('bump version'))
 *   .pipe(push());
 * 
 * @example
 * // With options
 * gulp.src('./package.json')
 *   .pipe(git.commit('bump version'))
 *   .pipe(push({
 *     repository: 'upstream',
 *     refspec: 'main'
 *   }));
 */
module.exports = function(options) {
    // Validate options early to fail fast
    const opt = validateOptions(options);
    
    return through.obj(
        /**
         * Transform function - passes files through unchanged
         * @param {Vinyl} file - Vinyl file object
         * @param {string} encoding - File encoding
         * @param {Function} callback - Callback function
         */
        function transform(file, encoding, callback) {
            // Handle edge cases
            if (!file) {
                return callback();
            }
            
            // Streams are not supported
            if (file.isStream()) {
                return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            }
            
            // Pass file through unchanged (both null and buffer files)
            callback(null, file);
        },
        
        /**
         * Flush function - executes git push ONCE at end of stream
         * This is the key fix: push happens once, not per file
         * @param {Function} callback - Callback function
         */
        function flush(callback) {
            try {
                git.push(opt.repository, opt.refspec, opt.options, (error) => {
                    if (error) {
                        // Preserve original error if it's already an Error object
                        const pluginError = error instanceof Error
                            ? new PluginError(PLUGIN_NAME, error)
                            : new PluginError(PLUGIN_NAME, String(error));
                        return callback(pluginError);
                    }
                    
                    log(colors.green('Changes pushed to remote'));
                    callback();
                });
            } catch (syncError) {
                // Handle synchronous errors from git.push (unlikely but possible)
                callback(new PluginError(PLUGIN_NAME, syncError));
            }
        }
    );
};

// Export internals for testing
module.exports.validateOptions = validateOptions;
module.exports.PLUGIN_NAME = PLUGIN_NAME;
module.exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
