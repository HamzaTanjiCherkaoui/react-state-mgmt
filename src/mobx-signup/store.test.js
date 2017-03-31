import Store from './store';

describe('Store', () => {
    let store;

    beforeEach(()=>{
        const mockSignup = () => Promise.resolve(true);
        const mockValidator = () => Promise.resolve(true);

        store = new Store({signupService: mockSignup, validator: mockValidator})
    });

    it('should check if defaults are specified', ()=>{
        expect(store.info.username).toEqual('');
    });

});

