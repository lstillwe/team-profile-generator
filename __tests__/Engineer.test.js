var Engineer = require("../lib/Engineer.js");

createTestEngineer = () => { return new Engineer('Mickey Mouse', 100, 'mm@disney.com', 'mickeyman') };

describe('Engineer', () => {

    describe('Test for retrieval of Engineer name', () => {
        test('it should return Mickey Mouse', () => {
            const engineer = createTestEngineer();
            expect(engineer.getName()).toBe('Mickey Mouse');
        })
    })
    describe('Test for retrieval of Engineer id', () => {
        test('it should return 100', () => {
            const engineer = createTestEngineer();
            expect(engineer.getId()).toBe(100);
        })
    })
    describe('Test for retrieval of Engineer email', () => {
        test('it should return mm@disney.com', () => {
            const engineer = createTestEngineer();
            expect(engineer.getEmail()).toBe('mm@disney.com');
        })
    })
    describe('Test for retrieval of Engineer role', () => {
        test('it should return Engineer', () => {
            const engineer = createTestEngineer();
            expect(engineer.getRole()).toBe('Engineer');
        })
    })
    describe('Test for retrieval of Engineer Github name', () => {
        test('it should return mickeyman', () => {
            const engineer = createTestEngineer();
            expect(engineer.getGithub()).toBe('mickeyman');
        })
    })
});