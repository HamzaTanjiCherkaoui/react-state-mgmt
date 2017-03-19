import React from 'react';
import logo from '../core/logo.png';

export function Home() {
    return (
        <div className="card card-inverse card-primary mb-3 text-center">
            <div className="card-block">
                <img src={logo} />
            </div>
            <div className="card-block">
                <h3 className="card-title">
                    A FULL STACK CODE CONFERENCE FOR APPLICATION DEVELOPERS & ENGINERDS
                </h3>
            </div>
        </div>
    );
}