//This function here creates the rule that the data (Object) is validated on
function validationObject (dataField, conditionValue, condition) {
    if (condition === "eq") {
        if (dataField === conditionValue) {
            return true;
        }
        return false;
    }

    if (condition === "neq") {
        if (dataField !== conditionValue) {
            return true;
        }
        return false
    }

    if (condition === "gt") {
        if (dataField > conditionValue) {
            return true;
        }
        return false;
    }

    if (condition === "gte") {
        if (dataField >= conditionValue) {
            return true;
        }
        return false;
    }

    if (condition === "contains") {
        if (conditionValue.includes(dataField)) {
            return true
        }

        return false;
    }
}

//This function here creates the rule that the data (String & Array) is validated on
function validationStringArray (data, rule) {
    if (rule.condition === "eq") {
        if (data[parseInt(rule.field)] === rule.condition_value) {
            return true;
        }
        return false;
    }

    if (rule.condition === "neq") {
        if (data[parseInt(rule.field)] !== rule.condition_value) {
            return true;
        }
        return false;
    }

    if (rule.condition === "gt") {
        if (data[parseInt(rule.field)] > rule.condition_value) {
            return true;
        }
        return false;
    }

    if (rule.condition === "gte") {
        if (data[parseInt(rule.field)] >= rule.condition_value) {
            return true;
        }
        return false;
    }

    if (rule.condition === "contains") {
        if (rule.condition_value.includes(data[parseInt(rule.field)])) {
            return true;
        }
        return false;
    }
}

module.exports = { validationObject, validationStringArray };