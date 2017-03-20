import React from 'react';
import {Link} from 'react-router-dom';

export function SignupCanceled({signupPath}) {
    return (
        <div className="card card-inverse bg-inverse mt-5">
            <div className="card-block">
                <h1 className="card-title text-muted">SyntaxCon</h1>
                <h3 className="card-title">Aww, not now?</h3>
                <p className="card-text">Are you sure? SyntaxCon has some awesome content. At your own risk then.</p>

                <Link to={signupPath} className="btn btn-primary btn-lg">Alright, Signup</Link>
            </div>
        </div>
    );
}
SignupCanceled.propTypes = {
    signupPath: React.PropTypes.string
};
