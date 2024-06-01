import './Layout.css'
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <header className="layout__header">
                <div className="layout__header-first-img"/>
                <p className="layout__header-text">
                    Справочник диетолога
                </p>
                <div className="layout__header-second-img"/>
            </header>
            <main className="layout__main">
                {children}
            </main>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
