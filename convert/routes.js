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

const CONVERT = require('../convert/controller'),
    KEY = require('../libs/key');

module.exports = function (app) {

    app.route('/convert')
        .get(CONVERT.default);

    app.route('/convert/api/v1/image')
        .get(KEY.verify, CONVERT.get_image);

    app.route('/convert/api/v1/convert/tiff')
        .post(KEY.verify, CONVERT.convert_tiff);

    app.route('/convert/api/v1/convert/batch')
        .post(KEY.verify, CONVERT.convert_batch);
};