import React from 'react';
import { Helmet } from 'react-helmet';

const Title = () => {
    return (
        <Helmet>
            <title>Maxnet+ #Internet By KabelTelekom</title>
            <meta 
                name="description" 
                content="Maxnet+ provides high-speed and reliable internet solutions for homes and businesses. Explore our services and subscribe now!" 
            />
            <link rel="icon" href="/path/to/your/favicon.ico" />
            <meta property="og:image" content="/img/logo.jpeg" />
            <meta property="og:title" content="Maxnet+ #Internet By KabelTelekom" />
            <meta property="og:description" content="Maxnet+ provides high-speed and reliable internet solutions for homes and businesses." />
        </Helmet>
    );
};

export default Title;
