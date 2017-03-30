import Store from './store';

test('Store', () => {
    const mockSignup = () => Promise.resolve(true);
    const mockValidator = () => Promise.resolve(true);
    const s = new Store({signupService: mockSignup, validator: mockValidator})

    expect(s.info.username).toEqual('');
});