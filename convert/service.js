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

const CONFIG = require('../config/config');
const LOGGER = require('../libs/log4');
const JIMP = require('../libs/jimp');
const IMG = require('../libs/imagemagick');
const HTTP = require('axios');
const TIMEOUT = 60000;
const HEADER = {
        'Content-Type': 'application/json'
    };

/**
 * Converts TIFF to JPG
 * @param data
 * @param callback
 */
exports.convert_tiff = function (data, callback) {

    (async () => {

        try {

            let endpoint = 'https://' + CONFIG.duraCloudUser + ':' + CONFIG.duraCloudPwd + '@' + CONFIG.duraCloudApi + 'dip-store/' + data.full_path;

            let response = await HTTP.get(endpoint, {
                responseType: 'arraybuffer',
                timeout: TIMEOUT,
                headers: HEADER
            });

            if (response.status === 200) {
                JIMP.convert(response, data);
                // IMG.convert(response, data);
            }

            return false;

        } catch(error) {
            LOGGER.module().error('ERROR: [/convert/service (convert_tiff)] Unable to process TIFF: ' + error);
        }

    })();

    callback({
        error: false,
        status: 201,
        data: 'Processing ' + data.object_name
    });
};
