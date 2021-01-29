const check = require("../functions/validation");
const status = require("../functions/status");

exports.validate = function (req, res, next) {
    try {
        //accept JSON data
        const payload = req.body;
        const { rule, data } = payload;

        //rule and data field are required
        if (!rule) {
            return res.status(400).json({
                message: "rule is required.",
                status: "error",
                data: null
            });
        }

        if (!data) {
            return res.status(400).json({
                message: "data is required.",
                status: "error",
                data: null
            });
        }

        //check rule field if it is of the wrong type
        if (typeof rule !== 'object') {
            return res.status(400).json({
                message: "rule should be an object.",
                status: "error",
                data: null
            });
        }

        //check data field if it is of the wrong type
        if (typeof data !== 'object' && !Array.isArray(data) && typeof data !== 'string') {
            return res.status(400).json({
                message: "data should be a|an object, array or string.",
                status: "error",
                data: null
            });
        }

        //rule field should be a valid json object
        if (!rule.hasOwnProperty("field") || !rule.hasOwnProperty("condition") || !rule.hasOwnProperty("condition_value")) {
            return res.status(400).json({
                message: "Invalid JSON payload passed.",
                status: "error",
                data: null
            });
        }

        //check the field property in the rule object
        const { field } = rule;
        const fieldLevel = field.split(".", 2);
        
        //Check to see if the field specified in the rule object is missing from the data passed
        if (!data.hasOwnProperty(fieldLevel[0])) {
            return res.status(400).json({
                message: `field ${fieldLevel[0]} is missing from data.`,
                status: "error",
                data: null
            });
        }

        //for two level nesting
        if (fieldLevel.length > 1) {
            if (typeof data[fieldLevel[0]] !== 'object' || !data[fieldLevel[0]].hasOwnProperty(fieldLevel[1])) {
                return res.status(400).json({
                    message: `field ${field} is missing from data.`,
                    status: "error",
                    data: null
                });
            }
        }

        //Validate data of type Object
        if (typeof data === 'object'){
            if (fieldLevel.length === 2) {
                let dataField = data[fieldLevel[0]];
                dataField = dataField[fieldLevel[1]];
                const result = check.validationObject(dataField, rule.condition_value, rule.condition);
                
                if (result) {
                    return res.status(200).json(status.validationStatusLengthTwo(result, rule, fieldLevel, dataField));
                }

                return res.status(400).json(status.validationStatusLengthTwo(result, rule, fieldLevel, dataField));
            }

            if (fieldLevel.length === 1) {
                const dataField = data[fieldLevel[0]];
                const result = check.validationObject(dataField, rule.condition_value, rule.condition);

                if (result) {
                    return res.status(200).json(status.validationStatusLengthOne(result, rule, fieldLevel, dataField));
                }

                return res.status(400).json(status.validationStatusLengthOne(result, rule, fieldLevel, dataField));
            }
        }

        //Validate data of type String
        if (typeof data === 'string') {
            const result = check.validationStringArray(data, rule);

            if (result) {
                return res.status(200).json(status.validationStatusStringArray(result, data, rule));
            }

            return res.status(400).json(status.validationStatusStringArray(result, data, rule));
        }

        //Validate data of type Array
        if (Array.isArray(data)) {
            const result = check.validationStringArray(data, rule);

            if (result) {
                return res.status(200).json(status.validationStatusStringArray(result, data, rule));
            }

            return res.status(400).json(status.validationStatusStringArray(result, data, rule));
        }
    } catch (err) {
        return res.status(400).json({
            message: "Invalid JSON payload passed.",
            status: "error",
            data: null
        });
    }
}