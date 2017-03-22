import React from 'react';

export function FormField({title, type = 'text', value = '', onChange, error, enableValidation = false}) {
    const errorMessage = error && error[0];
    const validationClass = {
        group: enableValidation ? (error ? 'has-danger' : 'has-success') : '',
        control: enableValidation ? (error ? 'form-control-danger' : 'form-control-success') : ''
    };

    return (
        <div className={`form-group ${validationClass.group}`}>
            <label className="form-control-label" dangerouslySetInnerHTML={{__html: title}} />
            <input type={type}
                   className={`form-control ${validationClass.control}`}
                   value={value}
                   onChange={onChange} />
            {
                errorMessage && (
                    <div>
                        <small className="form-control-feedback">{errorMessage}</small>
                    </div>
                )
            }
        </div>
    );
}

FormField.propTypes = {
    title: React.PropTypes.string,
    type: React.PropTypes.oneOf(['text', 'checkbox', 'password']),
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    error: React.PropTypes.any,
    enableValidation: React.PropTypes.bool,
};

