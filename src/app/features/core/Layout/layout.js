import React from 'react';
import LayoutStyles from './layout.module.scss';
import Routes from '../../../routes/routes';

const Layout = () => {
    return (      
            <div className={LayoutStyles['parent-wrapper']}>
                <Routes />
            </div>
    )
}

export default Layout;