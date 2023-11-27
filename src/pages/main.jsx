import { useContext } from 'react';

import 'reactflow/dist/style.css';
import Sidebar from '../components/sidebar';

import { ThemeContext } from '../contexts/themeContext';

import Navbar from '../components/navbar';
import Flow from './Flow';


function Main() {
    const { theme } = useContext(ThemeContext)
    return (
        <main className={`${theme} text-foreground bg-background`}>
            <Navbar />
            <div  id='screen-container' className='screen-container' >
            <Sidebar />
                <Flow/>
            </div>
        </main>
    );
}

export default Main;
