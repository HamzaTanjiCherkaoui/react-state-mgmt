import React from 'react';

export class SignupForm extends React.Component {
    render() {
        return (
        <div className="row">
            <div className="col-xs-12 col-sm-6">
                <div className="card card-inverse card-primary text-center">
                    <div className="card-block">
                        <h3>Welcome to</h3>
                        <h1>SyntaxCon</h1>
                    </div>
                </div>
                <form>
                    <FormField title="Pick a username" value="" onChange={null} />

                    <FormField title="Pick a strong password" value="" onChange={null} />

                    <div className="row">
                        <div className="col">
                            <FormField title="First Name" value="" onChange={null} />
                        </div>
                        <div className="col">
                            <FormField title="Last Name" value="" onChange={null} />
                        </div>
                    </div>

                    <FormField title="Email" value="" onChange={null} />

                    <div className="row">
                        <div className="col">
                            <button className="btn btn-primary">Sign up</button>
                            <button className="btn btn-link">Not now</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        );
    }
}

function FormField({title, value, onChange}) {
    return (
        <div className="form-group">
            <label>{title}</label>
            <input type="text" className="form-control" value={value} onChange={onChange} />
        </div>
    );
}
