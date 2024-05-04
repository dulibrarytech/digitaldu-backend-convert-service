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

module.exports = {
    host: process.env.HOST,
    appName: process.env.APP_NAME,
    appVersion: process.env.APP_VERSION,
    organization: process.env.ORGANIZATION,
    apiKey: process.env.API_KEY,
    duraCloudApi: process.env.DURACLOUD_API,
    duraCloudUser: process.env.DURACLOUD_USER,
    duraCloudPwd: process.env.DURACLOUD_PWD,
    storagePath: process.env.STORAGE_PATH,
    imageQuality: parseInt(process.env.IMAGE_QUALITY)
};