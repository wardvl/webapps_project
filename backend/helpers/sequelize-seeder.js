/**
 * Contains the file system module.
 */
var fs = require('fs');

/**
 * Seeds the specified model with the specified objects.
 * @param model The model that needs seeding.
 * @param objects The model instances.
 */
module.exports.seedModel = (model, objects) => {
        model.bulkCreate(objects);
};

/**
 * Seeds the specified model with the objects in the specified json file.
 * @param model The model that needs seeding.
 * @param objects The path to the json file.
 */
module.exports.seedModelFromJsonFile = (model, jsonFile) => {
        return new Promise(function (resolve, reject) {
                fs.readFile(jsonFile, 'utf8', function (err, data) {
                        if (err) {
                                reject(err);
                                return;
                        }
                        resolve(module.exports.seedModel(model, JSON.parse(data)));
                });
        })

};