var Intern = require("../lib/Intern.js");

createTestIntern = () => { return new Intern('Mickey Mouse', 100, 'mm@disney.com', 'UNC @ Chapel Hill') };

describe('Intern', () => {

    describe('Test for retrieval of Intern name', () => {
        test('it should return Mickey Mouse', () => {
            const intern = createTestIntern();
            expect(intern.getName()).toBe('Mickey Mouse');
        })
    })
    describe('Test for retrieval of Intern id', () => {
        test('it should return 100', () => {
            const intern = createTestIntern();
            expect(intern.getId()).toBe(100);
        })
    })
    describe('Test for retrieval of Intern email', () => {
        test('it should return mm@disney.com', () => {
            const intern = createTestIntern();
            expect(intern.getEmail()).toBe('mm@disney.com');
        })
    })
    describe('Test for retrieval of Intern role', () => {
        test('it should return Intern', () => {
            const intern = createTestIntern();
            expect(intern.getRole()).toBe('Intern');
        })
    })
    describe('Test for retrieval of Intern shool', () => {
        test('it should return UNC @ Chapel Hill', () => {
            const intern = createTestIntern();
            expect(intern.getSchool()).toBe('UNC @ Chapel Hill');
        })
    })
});