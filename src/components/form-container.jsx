import React from 'react';
import logo from '../core/logo.png';

export function FormContainer({children}) {
    return (
        <div className="row">
            <div className="col-xs-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6">
                <Header />

                <form>
                    {children}
                </form>
            </div>
        </div>
    );
}

function Header() {
    return (
        <div className="card card-inverse card-primary text-center mb-3 mt-3">
            <div className="card-block">
                <h3>Welcome to</h3>
                <img src={logo} />
            </div>
        </div>
    );
}

