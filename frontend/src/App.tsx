import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Queue } from './pages/Queue';
import { Display } from './pages/Display';

import { Record } from './pages/Record';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/display" element={<Display />} />
            <Route path="/record" element={<Record />} />
        </Routes>
    );
}

export default App;
