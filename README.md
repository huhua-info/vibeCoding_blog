# vibeCoding_blog
my-blog/
├── index.html            # 入口 HTML 檔案
├── package.json          # 專案依賴與腳本設定
├── vite.config.js        # Vite 打包配置
├── src/
│   ├── main.jsx          # React 渲染起點
│   └── App.jsx           # 部落格主要邏輯與元件
└── README.md             # 專案說明與部署指令

影片中相關資源與 Prompts 整理如下：

🔗 ChatGPT 連結（Vibe Coding 功能）
• https://chatgpt.com/

🔗 GitHub 連結（專案建置與部署）
• https://github.com/

📝 示範 Prompts 範例 （ 可參考影片中的 Prompts，依照自己的需求調整產出的內容）

給我一個 App
我想做一個部落格網站
包含首頁、內頁、文章頁
使用柔和顏色與圓角設計風格

請提供給我啟動、部署專案所需要的檔案，至少包含：package.json、index.html、main.jsx、App.jsx、打包設定用的 config
同時告知專案的資料夾結構，並提供能部署到 GitHub Page 的相關指令。

🔧 常用指令整理

📦 套件安裝指令
• 安裝專案依賴：yarn install
• 安裝 GitHub Pages 套件：yarn add gh-pages

🛠 專案打包指令
• yarn build（⚠ 正常情況是透過這個指令，但假如 package.json 寫的不一樣，要以 package.json 為主）

🚀 專案部署指令
• yarn deploy（⚠ 正常情況是透過這個指令，但假如 package.json 寫的不一樣，要以 package.json 為主）

如果你部署時有遇到問題，歡迎留言貼出你的 GitHub Repository 連結，我會盡量幫忙看看是哪邊卡住 🙌
祝大家都能成功部署出自己的網站！

