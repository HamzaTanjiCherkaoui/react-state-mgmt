import React from 'react';

export function withTitle(title, Component) {
    return () => (
        <div>
            <div className="clearfix mb-1">
                <small className="badge badge-pill badge-primary float-right">{title}</small>
            </div>

            <Component />
        </div>
    );
}
