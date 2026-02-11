
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Experiences from './pages/Experiences';
import ExperienceDetail from './pages/ExperienceDetail';
import Seminaires from './pages/Seminaires';
import Engagement from './pages/Engagement';
import Host from './pages/Host';
import RecommendProducer from './pages/RecommendProducer';
import Auth from './pages/Auth';
import Booking from './pages/Booking';
import ProducerSpace from './pages/ProducerSpace';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
          <Route path="/producteur/:hostId" element={<ProducerSpace />} />
          <Route path="/seminaires" element={<Seminaires />} />
          <Route path="/notre-engagement" element={<Engagement />} />
          <Route path="/nous-rejoindre" element={<Host />} />
          <Route path="/recommander-un-producteur" element={<RecommendProducer />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reservation" element={<Booking />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
        </Routes>
      </Layout>
    </Router>
  );
};
 
export default App;
