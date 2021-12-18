var Employee = require("../lib/Employee.js");

createTestEmployee = () => { return new Employee('Mickey Mouse', 100, 'mm@disney.com') };

describe('Employee', () => {

    describe('Test for retrieval of Employee name', () => {
        test('it should return Mickey Mouse', () => {
            const employee = createTestEmployee();
            expect(employee.getName()).toBe('Mickey Mouse');
        })
    })
    describe('Test for retrieval of Employee id', () => {
        test('it should return 100', () => {
            const employee = createTestEmployee();
            expect(employee.getId()).toBe(100);
        })
    })
    describe('Test for retrieval of Employee email', () => {
        test('it should return mm@disney.com', () => {
            const employee = createTestEmployee();
            expect(employee.getEmail()).toBe('mm@disney.com');
        })
    })
    describe('Test for retrieval of Employee role', () => {
        test('it should return Employee', () => {
            const employee = createTestEmployee();
            expect(employee.getRole()).toBe('Employee');
        })
    })
});
