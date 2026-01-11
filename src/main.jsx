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
  Heart
} from 'lucide-react';

// --- 模擬資料 ---
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
    content: `<p>極簡主義不只是丟掉東西，而是一種對生活的重新審視...</p>`
  },
  {
    id: 2,
    title: "2024 前端設計趨勢：圓角與柔和色彩",
    excerpt: "UI 設計正在回歸自然感。我們來看看為什麼現在的 App 都喜歡使用柔和的背景與圓潤的邊角。",
    category: "設計美學",
    date: "2024-03-18",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
    content: "<p>柔和設計能減少視覺疲勞...</p>"
  },
  // 可以根據需求加入更多資料
];

// --- 分離元件 ---

const Navbar = ({ currentTab, setTab }) => (
  <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => setTab('home')}>
        <div className="w-10 h-10 bg-[#c7d9d3] rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
          <BookOpen size={20} className="text-[#455e56]" />
        </div>
        <span className="font-bold text-xl text-gray-800">SoftBlog</span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        {['home', 'list'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setTab(tab)}
            className={`text-sm font-medium transition-colors ${currentTab === tab ? 'text-[#5c7e73]' : 'text-gray-500 hover:text-[#729d8f]'}`}
          >
            {tab === 'home' ? '首頁' : '文章列表'}
          </button>
        ))}
      </div>
      <Search size={20} className="text-gray-400 cursor-pointer" />
    </div>
  </nav>
);

const PostCard = ({ post, onClick }) => (
  <div 
    className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    onClick={() => onClick(post)}
  >
    <div className="relative h-56 overflow-hidden">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute top-4 left-4">
        <span className="px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-[#455e56]">{post.category}</span>
      </div>
    </div>
    <div className="p-8">
      <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
        <span>{post.readTime}</span>
        <span>{post.date}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#5c7e73]">{post.title}</h3>
      <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
    </div>
  </div>
);

// --- 主應用 ---

export default function App() {
  const [currentTab, setTab] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [currentTab]);

  return (
    <div className="min-h-screen bg-[#fffefc] text-gray-800 selection:bg-[#c7d9d3]">
      <Navbar currentTab={currentTab} setTab={setTab} />
      
      <main className="pt-24 pb-12">
        {currentTab === 'home' && (
          <div className="max-w-5xl mx-auto px-6">
             <section className="bg-[#e3ede9] rounded-[3rem] p-12 mb-16">
                <h1 className="text-4xl font-black mb-6">在柔和的文字中，找尋靈感。</h1>
                <button onClick={() => setTab('list')} className="px-8 py-4 bg-gray-800 text-white rounded-2xl font-bold">開始閱讀</button>
             </section>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {POSTS.slice(0, 3).map(post => (
                  <PostCard key={post.id} post={post} onClick={(p) => { setSelectedPost(p); setTab('article'); }} />
                ))}
             </div>
          </div>
        )}

        {currentTab === 'list' && (
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-black mb-8">文章列表</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {POSTS.map(post => (
                <PostCard key={post.id} post={post} onClick={(p) => { setSelectedPost(p); setTab('article'); }} />
              ))}
            </div>
          </div>
        )}

        {currentTab === 'article' && selectedPost && (
          <div className="max-w-3xl mx-auto px-6">
            <button onClick={() => setTab('list')} className="flex items-center text-gray-400 mb-8"><ArrowLeft size={20} className="mr-2"/> 返回列表</button>
            <h1 className="text-4xl font-black mb-6">{selectedPost.title}</h1>
            <img src={selectedPost.image} className="w-full rounded-[2.5rem] mb-8" />
            <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
          </div>
        )}
      </main>

      <footer className="text-center py-12 border-t border-gray-100 text-gray-400 text-sm">
        © 2024 SoftBlog. All Rights Reserved.
      </footer>
    </div>
  );
}