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

const CONFIG = require('../config/config'),
    LOGGER = require('../libs/log4'),
    HTTP = require('axios'),
    FS = require('fs'),
    // IM = require('imagemagick-convert'),
    JIMP = require('jimp'),
    STORAGE = './storage/',
    TIMEOUT = 60000,
    HEADER = {
        'Content-Type': 'application/json'
    };

/**
 * Converts TIFF to JPG
 * @param req
 * @param callback
 * @returns {boolean}
 */
exports.convert_tiff = function (req, callback) {

    let data = req.body;

    if (data.sip_uuid === undefined || data.sip_uuid.length === 0) {

        callback({
            status: 400,
            message: 'Bad request.'
        });

        return false;
    }

    (async () => {

        try {

            let endpoint = 'https://' + CONFIG.duraCloudUser + ':' + CONFIG.duraCloudPwd + '@' + CONFIG.duraCloudApi + 'dip-store/' + data.full_path;

            let response = await HTTP.get(endpoint, {
                responseType: 'arraybuffer',
                timeout: TIMEOUT,
                headers: HEADER
            });

            if (response.status !== 200) {

                LOGGER.module().error('ERROR: [/convert/service (convert_tiff)] Unable to get TIFF.');

                callback({
                    error: true,
                    status: 200,
                    data: 'Unable to get TIFF.'
                });

            } else if (response.status === 200) {

                try {

                    JIMP.read(response.data)
                        .then(function (file) {
                            file.quality(CONFIG.imageQuality).write(STORAGE + data.object_name);
                            LOGGER.module().info('INFO: [/convert/service (convert_tiff)] ' + data.object_name + ' saved.');
                        })
                        .catch(function (error) {
                            LOGGER.module().error('ERROR: [/convert/service (convert_tiff)] Error occurred while converting file: ' + error);

                        callback({
                            error: true,
                            status: 201,
                            data: {
                                message: error
                            }
                        });

                    });

                } catch (error) {
                    LOGGER.module().error('ERROR: [/convert/service (convert_tiff)] Error occurred while converting file: ' + error);
                }
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