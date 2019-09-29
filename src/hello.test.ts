import greeter from './hello';

test('Hello, person.firstName + person.lastName',()=>{
    expect(greeter({firstName:'he',lastName:'zhong zheng'})).toBe('Hello, he zhong zheng');
});