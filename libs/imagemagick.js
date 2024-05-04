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
    IM = require('imagemagick-convert'),
    FS = require('fs'),
    LOGGER = require('../libs/log4'),
    STORAGE = './storage/';

exports.convert = async function(response, data) {

    try {

        let buffer = await IM.convert({
            srcData: response.data,
            srcFormat: 'TIFF', // 'TIFF', JP2
            quality: CONFIG.imageQuality,
            format: 'JPG'
        });

        FS.writeFile(STORAGE + data.object_name, buffer, function(error) {

            if (error) {
                LOGGER.module().error('ERROR: [/convert/service (convert_tiff)] Error occurred while writing to disk: ' + error.message);
            }

            LOGGER.module().info('INFO: [/convert/service (convert_tiff)] ' + data.object_name + ' saved.');
        });

    } catch(error) {

        LOGGER.module().error('ERROR: [/convert/service (convert_tiff)] Error occurred while converting file: ' + error);

        FS.writeFile(STORAGE + data.object_name, response.data, function(error) {

            if (error) {
                LOGGER.module().error('ERROR: [/convert/service (convert_tiff)] Error occurred while writing to disk: ' + error.message);
            }

            LOGGER.module().info('INFO: [/convert/service (convert_tiff)] ' + data.object_name + ' saved as tiff.');
        });
    }
};