var Manager = require("../lib/Manager.js");

createTestManager = () => { return new Manager('Mickey Mouse', 100, 'mm@disney.com', '253C') };

describe('Manager', () => {

    describe('Test for retrieval of Manager name', () => {
        test('it should return Mickey Mouse', () => {
            const manager = createTestManager();
            expect(manager.getName()).toBe('Mickey Mouse');
        })
    })
    describe('Test for retrieval of Manager id', () => {
        test('it should return 100', () => {
            const manager = createTestManager();
            expect(manager.getId()).toBe(100);
        })
    })
    describe('Test for retrieval of Manager email', () => {
        test('it should return mm@disney.com', () => {
            const manager = createTestManager();
            expect(manager.getEmail()).toBe('mm@disney.com');
        })
    })
    describe('Test for retrieval of Manager role', () => {
        test('it should return Manager', () => {
            const manager = createTestManager();
            expect(manager.getRole()).toBe('Manager');
        })
    })
    describe('Test for retrieval of Manager office numer', () => {
        test('it should return 253C', () => {
            const manager = createTestManager();
            expect(manager.getOfficeNumber()).toBe('253C');
        })
    })
});