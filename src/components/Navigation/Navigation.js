import { NavLink, useLocation } from "react-router-dom";
import styles from './Navigation.module.css';


const Navigation = () => {
    const location = useLocation();

    return (
    <nav>
        <NavLink to={{ pathname: `/`, state: { from: location }}} exact className={styles.link} activeClassName={styles.activeLink}>
            Home
        </NavLink>

        <NavLink to={{ pathname: `/movies`, state: { from: location }}} className={styles.link} activeClassName={styles.activeLink}>
            Movies
        </NavLink>
    </nav>
)};

export default Navigation;