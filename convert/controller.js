/**

 Copyright 2021 University of Denver

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 */

'use strict';

const SERVICE = require('../convert/service');
const FS = require('fs');
const PATH = require('path');
const CONFIG = require('../config/config');
exports.default = function (req, res) {
    res.status(200).send({
        info: 'University of Denver Libraries - Digital Object Repository Convert Service'
    });
};

exports.get_image = function (req, res) {

    let image = req.query.filename;

    try {

        if(FS.existsSync( CONFIG.storagePath + image)) { // './storage/'
            res.set('Content-Type', 'image/jpeg');
            res.sendFile(PATH.join(__dirname, '../storage', image));
        } else {
            res.status(404).send({
                message: 'Resource not found.'
            });
        }

    } catch (error) {
        console.error(error);
    }
};

exports.convert_tiff = function (req, res) {
    SERVICE.convert_tiff(req, function (data) {
        res.status(data.status).send(data);
    });
};

exports.convert_batch = function (req, res) {
    SERVICE.convert_batch(req, function (data) {
        res.status(data.status).send(data);
    });
};