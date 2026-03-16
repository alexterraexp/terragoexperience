import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import CookieBanner from './components/CookieBanner';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Experiences from './pages/Experiences';
import ExperienceDetail from './pages/ExperienceDetail';
import Seminaires from './pages/Seminaires';
import Particuliers from './pages/Particuliers';
import Engagement from './pages/Engagement';
import Host from './pages/Host';
import RecommendProducer from './pages/RecommendProducer';
import Auth from './pages/Auth';
import Booking from './pages/Booking';
import SeminairesPack from './pages/Seminaires-pack';
import ProducersPage from './pages/ProducersPage';
import ProducerDetailPage from './pages/ProducerDetailPage';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';

const PageTracker: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <CookieBanner />
      <PageTracker />
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
          <Route path="/partenaires" element={<ProducersPage />} />
          <Route path="/partenaires/:producerId" element={<ProducerDetailPage />} />
          <Route path="/entreprises" element={<Seminaires />} />
          <Route path="/seminaires-entreprise" element={<Seminaires />} />
          <Route path="/entreprises/offres" element={<SeminairesPack />} />
          <Route path="/entre-amis" element={<Particuliers />} />
          <Route path="/particuliers" element={<Particuliers />} />
          <Route path="/mission-engagements" element={<Engagement />} />
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