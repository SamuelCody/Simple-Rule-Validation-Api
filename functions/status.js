//Validation status for data of type Object
function validationStatusLengthTwo (result, rule, fieldLevel, dataField) {
    if (result) {
        return {
            message: `field ${rule.field} successfully validated.`,
            status: "success",
            data: {
                validation: {
                    error: false,
                    field: `${rule.field}`,
                    field_value: dataField,
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            }
        };
    }

    return {
        message: `field ${rule.field} failed validation.`,
        status: "error",
        data: {
            validation: {
                error: true,
                field: `${rule.field}`,
                field_value: dataField,
                condition: rule.condition,
                condition_value: rule.condition_value
            }
        }
    }
}

function validationStatusLengthOne (result, rule, fieldLevel, dataField) {
    if (result) {
        return {
            message: `field ${fieldLevel[0]} successfully validated.`,
            status: "success",
            data: {
                validation: {
                    error: false,
                    field: `${fieldLevel[0]}`,
                    field_value: dataField,
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            }
        };
    }

    return {
        message: `field ${fieldLevel[0]} failed validation.`,
        status: "error",
        data: {
            validation: {
                error: true,
                field: `${fieldLevel[0]}`,
                field_value: dataField,
                condition: rule.condition,
                condition_value: rule.condition_value
            }
        }
    };
}

//Validation status for data of type String & Array
function validationStatusStringArray (result, data, rule) {
    if (result) {
        return {
            message: `field ${rule.field} successfully validated.`,
            status: "success",
            data: {
                validation: {
                    error: false,
                    field: `${rule.field}`,
                    field_value: `${data[parseInt(rule.field)]}`,
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            }
        };
    }

    return {
        message: `field ${rule.field} failed validation.`,
        status: "error",
        data: {
            validation: {
                error: true,
                field: `${rule.field}`,
                field_value: `${data[parseInt(rule.field)]}`,
                condition: rule.condition,
                condition_value: rule.condition_value
            }
        }
    };
}
module.exports = { validationStatusLengthTwo, validationStatusLengthOne, validationStatusStringArray };