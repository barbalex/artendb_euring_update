/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var nano    = require('nano')('http://user:password@141.0.170.50:5984'),
    adb     = nano.db.use('artendb'),
    eurings = require('./euring'),
    _       = require('underscore');

_.each(eurings.rows, function (euring) {
    adb.get(euring.GUID, function (err, doc) {
        if (!err) {
            doc.Taxonomie.Eigenschaften.EURING = euring.EURING;
            adb.insert(doc);
        }
    });
});