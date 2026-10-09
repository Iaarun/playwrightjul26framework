const logger = require('./logger.js');

class EmployeeApi{
    constructor(request){
        this.request = request;
        this.baseURL = `http://localhost:3000`;
    }

    async send(method,endpoint,data=null){
        const startedAt = Date.now();
        logger.info('Sending API request', { method, endpoint });

        try {
            const response = await this.request.fetch(endpoint, {
                method,
                data,
            });
            const context = {
                method,
                endpoint,
                status: response.status(),
                durationMs: Date.now() - startedAt,
            };

            if (response.ok()) {
                logger.info('API response received', context);
            } else {
                logger.warn('API request returned an unsuccessful response', context);
            }

            return response;
        } catch (error) {
            logger.error('API request failed', {
                method,
                endpoint,
                durationMs: Date.now() - startedAt,
                error: error.message,
            });
            throw error;
        }
    }

    getAll(){
        return this.send("GET",`${this.baseURL}/employees`)
    }

    getEmployeeById(id){
        return this.send("GET",`${this.baseURL}/employeees/${id}`)
    }

    createEmployee(payload){
        return this.send("POST",`${this.baseURL}/employees`,payload)
    }

    updateEmployee(id,payload){
        return this.send("PUT",`${this.baseURL}/employees/${id}`,payload)
    }

    deleteEmployee(id){
        return this.send("DELETE",`${this.baseURL}/${id}`)
    }

}

module.exports = { EmployeeApi, EmployeeAPI: EmployeeApi }