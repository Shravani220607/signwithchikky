import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { VideoModal } from './components/common/VideoModal';

// Views
import { HomePage } from './views/HomePage';
import { DictionaryPage } from './views/DictionaryPage';
import { SignDetailPage } from './views/SignDetailPage';
import { TopicsPage } from './views/TopicsPage';
import { TopicDetailPage } from './views/TopicDetailPage';
import { FlashcardsPage } from './views/FlashcardsPage';
import { QuizzesPage } from './views/QuizzesPage';
import { TutorialPage } from './views/TutorialPage';
import { YouTubePage } from './views/YouTubePage';
import { InstagramPage } from './views/InstagramPage';
import { AboutPage } from './views/AboutPage';
import { AuthPage } from './views/AuthPage';

// Official SignWithChikky Content
import { CHIKKY_SIGNS, CHIKKY_TOPICS } from './data/chikkyContent';
import { Sign, Topic } from './types/sign';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [searchParams, setSearchParams] = useState<URLSearchParams>(() => {
    return new URLSearchParams(window.location.search);
  });

  // State populated with SignWithChikky published content
  const [signs] = useState<Sign[]>(CHIKKY_SIGNS);
  const [topics] = useState<Topic[]>(CHIKKY_TOPICS);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ embedId: string; title: string } | null>(null);

  // Browser navigation sync (Popstate for back/forward support)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setSearchParams(new URLSearchParams(window.location.search));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (url: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const [path, query] = url.split('?');
    window.history.pushState({}, '', url);
    setCurrentPath(path || '/');
    setSearchParams(new URLSearchParams(query || ''));
  };

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Parse path segments
  const pathParts = currentPath.split('/').filter(Boolean);
  const rootSection = pathParts[0] || '';
  const subParam = pathParts[1] || '';

  // Determine Sign Detail if route is /dictionary/:slug (e.g. /dictionary/apple, /dictionary/a, /dictionary/5, /dictionary/question-mark)
  const selectedSign =
    rootSection === 'dictionary' && subParam
      ? signs.find(
          (s) =>
            s.slug.toLowerCase() === subParam.toLowerCase() ||
            s.id.toLowerCase() === subParam.toLowerCase() ||
            s.word.toLowerCase() === subParam.toLowerCase()
        )
      : null;

  // Determine Topic Detail if route is /topics/:slug
  const selectedTopic =
    rootSection === 'topics' && subParam
      ? topics.find(
          (t) =>
            t.slug.toLowerCase() === subParam.toLowerCase() ||
            t.title.toLowerCase().replace(/\s+/g, '-') === subParam.toLowerCase()
        )
      : null;

  // Dynamic SEO Page Titles and Descriptions
  useEffect(() => {
    let title = 'SignWithChikky - Indian Sign Language Platform';
    let desc =
      'Explore Indian Sign Language (ISL) with a searchable dictionary of Alphabets, Numbers, Special Characters, and vocabulary signs, structured roadmap, 3D flashcards, and quizzes.';

    if (rootSection === 'dictionary') {
      if (selectedSign) {
        title = `${selectedSign.word} (${selectedSign.id}) - Indian Sign Language Dictionary | SignWithChikky`;
        desc = `Learn how to sign "${selectedSign.word}" in Indian Sign Language. ${selectedSign.howToSign.summary}`;
      } else {
        title = 'Indian Sign Language (ISL) Dictionary - Searchable Index | SignWithChikky';
        desc = 'Browse and search verified Indian Sign Language signs in Alphabetical Mode or Topic Wise Mode.';
      }
    } else if (rootSection === 'topics') {
      if (selectedTopic) {
        title = `${selectedTopic.title} Signs - Indian Sign Language | SignWithChikky`;
        desc = `${selectedTopic.description} Watch video lessons and practice signs in this topic.`;
      } else {
        title = 'ISL Topic Collections | SignWithChikky';
        desc = 'Explore Indian Sign Language vocabulary organized by thematic modules created by SignWithChikky.';
      }
    } else if (rootSection === 'flashcards') {
      title = 'Interactive 3D ISL Flashcards - Practice Sign Language | SignWithChikky';
      desc = 'Test your visual recall with modern 3D flip flashcards for Indian Sign Language.';
    } else if (rootSection === 'quizzes') {
      title = 'Indian Sign Language (ISL) Practice Quizzes | SignWithChikky';
      desc = 'Test your sign comprehension with interactive topic-specific recognition quizzes.';
    } else if (rootSection === 'tutorial') {
      title = 'Indian Sign Language Tutorial Roadmap - SignWithChikky';
      desc = 'A structured visual roadmap guiding you through the optimal order of learning Indian Sign Language: Learn → Flashcards → Quiz.';
    } else if (rootSection === 'youtube') {
      title = 'SignWithChikky YouTube Channel - ISL Video Lessons';
      desc = 'Watch full-length Indian Sign Language tutorials and fingerspelling guides on our official YouTube channel @signwithchikky.';
    } else if (rootSection === 'instagram') {
      title = 'SignWithChikky Instagram - Daily ISL Signs';
      desc = 'Follow @signwithchikky on Instagram for daily sign breakdowns and Deaf culture insights.';
    } else if (rootSection === 'about') {
      title = 'About SignWithChikky - Learn Indian Sign Language, One Sign at a Time';
      desc = 'SignWithChikky is a free public educational platform dedicated to Indian Sign Language.';
    } else if (rootSection === 'login') {
      title = 'Student Login - SignWithChikky Indian Sign Language';
      desc = 'Sign in to your free SignWithChikky student account.';
    } else if (rootSection === 'signup') {
      title = 'Create Free Account - SignWithChikky Indian Sign Language';
      desc = 'Register for your free student account to study Indian Sign Language.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
  }, [rootSection, selectedSign, selectedTopic]);

  // Render view router
  const renderCurrentView = () => {
    switch (rootSection) {
      case '':
        return (
          <HomePage
            signs={signs}
            topics={topics}
            onNavigate={navigate}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        );
      case 'dictionary':
        if (subParam) {
          if (!selectedSign) {
            return (
              <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
                <h2 className="text-2xl font-bold text-[#1A1A1A]">Sign Not Found</h2>
                <p className="text-sm text-[#374151]">
                  The sign entry &quot;{subParam}&quot; has not been added to the dictionary database yet.
                </p>
                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => navigate('/dictionary')}
                    className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    Back to Dictionary
                  </button>
                </div>
              </div>
            );
          }
          return (
            <SignDetailPage
              sign={selectedSign}
              allSigns={signs}
              topics={topics}
              onNavigate={navigate}
              onPracticeQuiz={(topicSlug) => {
                navigate(`/quizzes?topic=${topicSlug || 'all'}`);
              }}
            />
          );
        }
        return (
          <DictionaryPage
            signs={signs}
            topics={topics}
            initialSearchQuery={searchParams.get('q') || ''}
            initialTopic={searchParams.get('topic') || 'all'}
            onNavigateSign={(slug) => navigate(`/dictionary/${slug}`)}
            onNavigateTopic={(slug) => navigate(`/topics/${slug}`)}
          />
        );
      case 'topics':
        if (subParam) {
          if (!selectedTopic) {
            return (
              <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
                <h2 className="text-2xl font-bold text-[#1A1A1A]">Topic Not Found</h2>
                <p className="text-sm text-[#374151]">
                  The topic &quot;{subParam}&quot; does not exist in the curriculum.
                </p>
                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => navigate('/topics')}
                    className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    Back to Topics
                  </button>
                </div>
              </div>
            );
          }
          const signsInTopic = signs.filter((s) => s.topics.includes(selectedTopic.title));
          return (
            <TopicDetailPage
              topic={selectedTopic}
              allTopics={topics}
              signsInTopic={signsInTopic}
              onNavigate={navigate}
              onNavigateSign={(slug) => navigate(`/dictionary/${slug}`)}
              onPracticeFlashcards={(slug) => navigate(`/flashcards?topic=${slug}`)}
              onPracticeQuiz={(slug) => navigate(`/quizzes?topic=${slug}`)}
            />
          );
        }
        return (
          <TopicsPage
            topics={topics}
            signs={signs}
            onNavigateTopic={(slug) => navigate(`/topics/${slug}`)}
          />
        );
      case 'flashcards':
        return (
          <FlashcardsPage
            signs={signs}
            topics={topics}
            initialTopic={searchParams.get('topic') || 'all'}
            onNavigateSign={(slug) => navigate(`/dictionary/${slug}`)}
          />
        );
      case 'quizzes':
        return (
          <QuizzesPage
            signs={signs}
            topics={topics}
            initialTopicSlug={searchParams.get('topic') || undefined}
            onNavigateSign={(slug) => navigate(`/dictionary/${slug}`)}
          />
        );
      case 'tutorial':
        return (
          <TutorialPage
            signs={signs}
            topics={topics}
            onNavigate={navigate}
            onNavigateSign={(slug) => navigate(`/dictionary/${slug}`)}
          />
        );
      case 'youtube':
        return (
          <YouTubePage
            onSelectVideo={(embedId, title) => setActiveVideo({ embedId, title })}
          />
        );
      case 'instagram':
        return <InstagramPage />;
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      case 'login':
        return (
          <AuthPage
            initialMode="login"
            onNavigate={navigate}
          />
        );
      case 'signup':
        return (
          <AuthPage
            initialMode="signup"
            onNavigate={navigate}
          />
        );
      default:
        return (
          <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
            <h2 className="text-3xl font-extrabold text-[#1A1A1A]">Page Not Found</h2>
            <p className="text-[#374151]">The requested resource could not be found in the ISL directory.</p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white font-bold text-xs shadow-xs"
            >
              Return to Homepage
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A1A]">
      {/* Sticky Main Charcoal Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">{renderCurrentView()}</main>

      {/* Global Command Palette / Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
        signs={signs}
        topics={topics}
      />

      {/* Embedded Video Modal */}
      {activeVideo && (
        <VideoModal
          isOpen={Boolean(activeVideo)}
          onClose={() => setActiveVideo(null)}
          embedId={activeVideo.embedId}
          title={activeVideo.title}
        />
      )}

      {/* Platform Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
