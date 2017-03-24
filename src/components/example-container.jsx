import React from 'react';

export function withTitle(title, Component) {
    return () => (
        <div>
            <small className="badge badge-pill badge-default">{title}</small>
            <Component />
        </div>
    );
}