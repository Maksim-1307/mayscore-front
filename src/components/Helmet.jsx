import React from 'react';
import { Helmet } from 'react-helmet';

export default (args) => {
    return (
        <Helmet>
            <title>{args.title}</title>
            <meta name="description" content={args.description} />
        </Helmet>
    );
}