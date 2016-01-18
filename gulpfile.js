'use strict';

var gulp = require('gulp');
var Q = require('q');
var release = require('.').release
var spawn = require('child_process').spawn;

gulp.task('release', function() {
    return release(
        {
            releaseCallback: function() {
                var deferred = Q.defer();
                spawn('npm', ['publish'], {stdio: 'inherit'})
                    .on('close', function(err) {
                        if (err) {
                            deferred.reject(err);
                        }
                        deferred.resolve();
                    });
                return deferred.promise;
            }
        });
});
