import { test, expect } from '@playwright/test';
const{EmployeeAPI} = require('../utils/employeeApi.js');
const employeedata = require('../testdata/employeeData.js');

test.describe('Employee API Tests', () => {
   test('GET  list of employees', async ({ request }) => {
    // const response = await request.get('http://localhost:3000/employees');
    const api=   new EmployeeAPI(request)
    const response = await api.getAll();
    expect(response.status()).toBe(200);
   })

   test.only('Get employeeby ID', async ({ request }) => {

    // const uniqueid = `${Date.now()}${Math.floor(Math.random() * 1000)}`
    // const payload={
    //     "first_name": "Arun",
    //     "last_name": uniqueid,
    //     "email": `arun.${uniqueid}@adobe.com`
    // }
    const api=   new EmployeeAPI(request)
   const createemppayload=   employeedata.createEmployeePayload();
   // const creatempresponse=  await request.post('http://localhost:3000/employees', { data: payload });
     const creatempresponse=  await api.createEmployee(createemppayload); 
     expect(creatempresponse.status()).toBe(201);
     const createemployee = await creatempresponse.json(); 
    const response = await  api.getEmployeeById(createemployee.id);
    //const response = await request.get(`http://localhost:3000/employees/${createemployee.id}`);
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(createemployee);
   })

});

