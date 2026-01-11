import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  User, 
  Search, 
  ChevronRight, 
  Clock, 
  ArrowLeft,
  MessageCircle,
  Share2,
  Heart,
  Menu,
  X
} from 'lucide-react';

// --- 模擬資料與常數 ---
const CATEGORIES = ["全部", "生活隨筆", "技術分享", "設計美學", "旅行日記"];

const POSTS = [
  {
    id: 1,
    title: "探索極簡主義的生活方式",
    excerpt: "在這個繁忙的世界裡，如何透過減少物質需求來獲得心靈的自由？本文將分享我這三個月的實驗心得。",
    category: "生活隨筆",
    date: "2024-03-20",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800",
    content: `
      <p class="mb-4">極簡主義不只是丟掉東西，而是一種對生活的重新審視。我們常常被不必要的雜訊所包圍，忽略了真正重要的人事物。</p>
      <h3 class="text-xl font-bold my-4 text-gray-800">為什麼選擇極簡？</h3>
      <p class="mb-4">當我開始減少家中的物品時，我發現我的壓力也隨之減輕了。不再需要花時間維護那些我根本不使用的東西。</p>
      <blockquote class="border-l-4 border-[#abc5bc] pl-4 py-2 my-6 italic text-gray-600 bg-[#f1f7f5] rounded-r-lg">
        "Less is more." - Mies van der Rohe
      </blockquote>
      <p class="mb-4">透過減少物質的佔有，我們能騰出更多空間給體驗、關係與個人成長。</p>
    `
  },
  {
    id: 2,
    title: "2024 前端設計趨勢：圓角與柔和色彩",
    excerpt: "UI 設計正在回歸自然感。我們來看看為什麼現在的 App 都喜歡使用柔和的背景與圓潤的邊角。",
    category: "設計美學",
    date: "2024-03-18",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
    content: "<p>柔和的圓角設計（Round Corners）能有效降低介面的攻擊性...</p>"
  },
  {
    id: 3,
    title: "React Hooks 進階指南：自定義 Hook 的魅力",
    excerpt: "學會邏輯封裝，讓你的程式碼像詩一樣優雅。從基礎到實戰，一步步建構你的 Hook 庫。",
    category: "技術分享",
    date: "2024-03-15",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    content: "<p>自定義 Hook 讓邏輯複用變得前所未有的簡單...</p>"
  }
];

// --- 子元件 ---

const Navbar = ({ currentTab, setTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => { setTab('home'); setIsMenuOpen(false); }}
        >
          <div className="w-11 h-11 bg-[#c7d9d3] rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <BookOpen size={22} className="text-[#455e56]" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-gray-800">SoftBlog</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-10">
          {[
            { id: 'home', label: '首頁' },
            { id: 'list', label: '文章列表' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`text-sm font-bold transition-colors ${currentTab === item.id ? 'text-[#5c7e73]' : 'text-gray-400 hover:text-[#729d8f]'}`}
            >
              {item.label}
            </button>
          ))}
          <button className="px-6 py-2.5 bg-gray-900 text-white rounded-2xl text-sm font-bold hover:bg-gray-800 transition-all">
            訂閱我
          </button>
        </div>

        <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 手機版選單 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-8 space-y-4 animate-in slide-in-from-top duration-300">
          <button onClick={() => { setTab('home'); setIsMenuOpen(false); }} className="block w-full text-left font-bold text-gray-800">首頁</button>
          <button onClick={() => { setTab('list'); setIsMenuOpen(false); }} className="block w-full text-left font-bold text-gray-800">文章列表</button>
        </div>
      )}
    </nav>
  );
};

const PostCard = ({ post, onClick }) => (
  <div 
    className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
    onClick={() => onClick(post)}
  >
    <div className="relative h-64 overflow-hidden">
      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute top-6 left-6">
        <span className="px-4 py-1.5 bg-white/95 backdrop-blur shadow-sm rounded-full text-xs font-black text-[#5c7e73]">
          {post.category}
        </span>
      </div>
    </div>
    <div className="p-8 md:p-10">
      <div className="flex items-center space-x-4 text-xs font-bold text-gray-400 mb-4">
        <div className="flex items-center space-x-1.5">
          <Clock size={14} />
          <span>{post.readTime}</span>
        </div>
        <span>{post.date}</span>
      </div>
      <h3 className="text-2xl font-black text-gray-800 mb-4 leading-tight group-hover:text-[#5c7e73] transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center text-[#5c7e73] text-sm font-black group-hover:translate-x-2 transition-transform">
        繼續閱讀 <ChevronRight size={18} className="ml-1" />
      </div>
    </div>
  </div>
);

// --- 視圖元件 ---

const HomeView = ({ setTab, setSelectedPost }) => (
  <div className="animate-in fade-in duration-1000">
    <section className="px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#e3ede9] rounded-[3.5rem] p-10 md:p-20 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
          <div className="flex-1 z-10 text-center md:text-left">
            <span className="inline-block px-5 py-2 bg-[#729d8f] text-white rounded-full text-xs font-black mb-8 shadow-lg shadow-[#729d8f]/20">
              NEW BLOG SYSTEM
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.15] mb-8">
              讓閱讀成為一種<br />
              視覺的享受。
            </h1>
            <p className="text-gray-600 text-lg mb-10 max-w-md leading-relaxed">
              專為喜愛簡潔風格的讀者設計，結合柔和的色彩與直覺的排版，開啟您的沉浸式閱讀體驗。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <button 
                onClick={() => setTab('list')}
                className="w-full sm:w-auto px-10 py-5 bg-gray-900 text-white rounded-2xl font-black hover:bg-gray-800 hover:shadow-xl transition-all"
              >
                瀏覽文章
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-gray-800 rounded-2xl font-black border border-gray-100 hover:bg-gray-50 transition-all">
                關於作者
              </button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md z-10 hidden lg:block">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800" 
                className="rounded-[3rem] shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-700"
                alt="Main"
              />
              <div className="absolute -top-8 -right-8 bg-white p-8 rounded-[2rem] shadow-xl animate-bounce">
                <Heart className="text-red-400 fill-red-400" size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16 px-2">
          <div>
            <h2 className="text-3xl font-black text-gray-900">精選推薦</h2>
            <div className="h-2 w-16 bg-[#abc5bc] rounded-full mt-3"></div>
          </div>
          <button 
            onClick={() => setTab('list')}
            className="text-[#5c7e73] font-black text-sm flex items-center hover:opacity-70 transition-opacity"
          >
            查看所有文章 <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {POSTS.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onClick={(p) => { setSelectedPost(p); setTab('article'); }} 
            />
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ListView = ({ setTab, setSelectedPost }) => {
  const [filter, setFilter] = useState("全部");
  const filteredPosts = filter === "全部" ? POSTS : POSTS.filter(p => p.category === filter);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-8 duration-700">
      <div className="mb-16">
        <h1 className="text-5xl font-black text-gray-900 mb-10 text-center md:text-left">文章館藏</h1>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${
                filter === cat 
                ? 'bg-[#729d8f] text-white shadow-xl shadow-[#729d8f]/30' 
                : 'bg-white border border-gray-100 text-gray-400 hover:border-[#abc5bc] hover:text-[#5c7e73]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} onClick={(p) => { setSelectedPost(p); setTab('article'); }} />
        ))}
      </div>
    </div>
  );
};

const ArticleView = ({ post, setTab }) => {
  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <button 
        onClick={() => setTab('list')}
        className="flex items-center space-x-3 text-gray-400 hover:text-[#5c7e73] mb-12 transition-colors font-bold group"
      >
        <div className="p-2.5 rounded-2xl group-hover:bg-[#f1f7f5] transition-colors">
          <ArrowLeft size={20} />
        </div>
        <span>回到文章列表</span>
      </button>

      <header className="mb-16 text-center md:text-left">
        <span className="px-5 py-2 bg-[#f1f7f5] text-[#5c7e73] rounded-full text-xs font-black tracking-widest uppercase">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-10 leading-[1.2]">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center md:justify-start mt-10 gap-8 text-sm font-bold text-gray-400 border-b border-gray-100 pb-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#e3ede9] rounded-2xl overflow-hidden shadow-sm">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" alt="Avatar" />
            </div>
            <span className="text-gray-900">Alex Chen</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={18} />
            <span>約 {post.readTime} 分鐘</span>
          </div>
          <span>發佈於 {post.date}</span>
        </div>
      </header>

      <div className="rounded-[3.5rem] overflow-hidden shadow-2xl mb-16">
        <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
      </div>

      <article className="prose prose-lg max-w-none text-gray-700 leading-loose text-xl">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <div className="mt-20 p-10 bg-[#f1f7f5] rounded-[2.5rem] flex flex-col items-center text-center">
          <h4 className="text-xl font-black text-[#455e56] mb-4">覺得這篇文章有幫助嗎？</h4>
          <p className="text-[#729d8f] mb-8 font-bold">歡迎分享給更多朋友，或是在下方留下您的愛心！</p>
          <div className="flex space-x-6">
            <button className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg text-red-400 hover:scale-110 transition-all">
              <Heart size={28} />
            </button>
            <button className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg text-blue-400 hover:scale-110 transition-all">
              <Share2 size={28} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

// --- 主應用程式 ---

export default function App() {
  const [currentTab, setTab] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);

  // 頁面切換自動回捲
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  return (
    <div className="min-h-screen bg-[#fffefc] text-gray-800 font-sans selection:bg-[#c7d9d3] selection:text-[#455e56]">
      {/* 導覽列 */}
      <Navbar currentTab={currentTab} setTab={setTab} />
      
      {/* 主要內容區 */}
      <main className="pt-32 pb-24">
        {currentTab === 'home' && <HomeView setTab={setTab} setSelectedPost={setSelectedPost} />}
        {currentTab === 'list' && <ListView setTab={setTab} setSelectedPost={setSelectedPost} />}
        {currentTab === 'article' && <ArticleView post={selectedPost} setTab={setTab} />}
      </main>

      {/* 頁尾 */}
      <footer className="bg-gray-50 border-t border-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-sm">
            <BookOpen size={30} className="text-[#abc5bc]" />
          </div>
          <p className="text-gray-400 text-base italic mb-10">"在極簡的視覺中，感受文字的重量。"</p>
          <div className="flex justify-center space-x-10 mb-12">
            {['GitHub', 'Twitter', 'Instagram'].map(link => (
              <a key={link} href="#" className="text-sm font-black text-gray-400 hover:text-[#5c7e73] transition-colors">{link}</a>
            ))}
          </div>
          <p className="text-gray-300 text-xs font-bold tracking-widest">© 2024 SOFTBLOG DESIGN SYSTEM. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}