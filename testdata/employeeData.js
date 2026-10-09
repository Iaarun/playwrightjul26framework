function createEmployeePayload(){
    const uniqueid = `${Date.now()}${Math.floor(Math.random() * 1000)}`
    const payload={
        "first_name": "Arun",
        "last_name": uniqueid,
        "email": `arun.${uniqueid}@adobe.com`
    }
    return payload;
}

function updatedEmployeePayload(){
    const uniqueid = `${Date.now()}${Math.floor(Math.random() * 1000)}`
    const payload={
        "first_name": "Arun",
        "last_name": uniqueid,
        "email": `arun.${uniqueid}@adobe.com`
    }
    return payload;
}

module.exports = { createEmployeePayload, updatedEmployeePayload }
