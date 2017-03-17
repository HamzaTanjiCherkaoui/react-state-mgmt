import React from 'react';

export function FormField({title, type = 'text', value = '', onChange, error, showValidation = false}) {
    const validationClass = {
        group: showValidation ? (error ? 'has-danger' : 'has-success') : '',
        control: showValidation ? (error ? 'form-control-danger' : 'form-control-success') : ''
    };

    return (
        <div className={`form-group ${validationClass.group}`}>
            <label className="form-control-label" dangerouslySetInnerHTML={{__html: title}} />
            <input type={type}
                   className={`form-control ${validationClass.control}`}
                   value={value}
                   onChange={onChange} />
        </div>
    );
}

FormField.propTypes = {
    title: React.PropTypes.string,
    type: React.PropTypes.oneOf(['text', 'checkbox', 'password']),
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    error: React.PropTypes.bool,
    showValidation: React.PropTypes.bool,
};

