import React from 'react';

export function FormContainer({children}) {
    return (
        <div className="row">
            <div className="col-xs-12 col-sm-6">
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
                <h1>SyntaxCon</h1>
            </div>
        </div>
    );
}

