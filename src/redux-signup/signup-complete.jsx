import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../core/logo.png';

export function SignupComplete() {
    return (
        <div className="card mt-5">
            <div className="card-block">
                <h3 className="card-title text-info">Welcome to</h3>
                <img src={logo} />
                <p className="card-text">Awesome content awaits you!</p>

                <Link to={'/home'} className="btn btn-primary btn-lg">Let's go</Link>
            </div>
        </div>
    );
}
