// 登录处理
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // 模拟登录验证
    if (username && password) {
        // 存储用户信息到本地存储
        localStorage.setItem('user', JSON.stringify({ username }));
        
        // 显示成功消息
        showMessage('登录成功！正在跳转...', 'success');
        
        // 跳转到首页
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showMessage('请输入用户名和密码', 'error');
    }
}

// 注册处理
function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // 验证表单
    if (!username || !email || !password || !confirmPassword) {
        showMessage('请填写所有字段', 'error');
        return;
    }
    
    // 验证用户名长度
    if (username.length < 3 || username.length > 20) {
        showMessage('用户名长度需要在3-20个字符之间', 'error');
        return;
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('请输入有效的邮箱地址', 'error');
        return;
    }
    
    // 验证密码强度
    if (password.length < 6) {
        showMessage('密码长度至少需要6个字符', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('两次输入的密码不一致', 'error');
        return;
    }
    
    // 模拟注册
    // 实际项目中这里应该发送请求到服务器
    localStorage.setItem('user', JSON.stringify({ username, email }));
    
    // 显示成功消息
    showMessage('注册成功！正在跳转...', 'success');
    
    // 跳转到首页
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// 退出登录
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// 显示消息
function showMessage(text, type) {
    // 创建消息元素
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // 插入到表单上方
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(message, form);
        
        // 3秒后移除消息
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}

// 检查用户登录状态
function checkLoginStatus() {
    const user = localStorage.getItem('user');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const userMenu = document.getElementById('user-menu');
    const username = document.getElementById('username');
    const profileUsername = document.getElementById('profile-username');
    const profileEmail = document.getElementById('profile-email');
    
    if (user) {
        const userObj = JSON.parse(user);
        // 用户已登录
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userMenu) userMenu.style.display = 'block';
        if (username) {
            username.textContent = userObj.username;
        }
        // 更新个人中心页面的用户名和邮箱
        if (profileUsername) {
            profileUsername.textContent = userObj.username;
        }
        if (profileEmail && userObj.email) {
            profileEmail.textContent = '邮箱: ' + userObj.email;
        }
    } else {
        // 用户未登录
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
    }
}

// 商品数据
const products = [
    { id: 1, title: '高等数学教材', price: 25, category: 'books', location: '东区宿舍', icon: '📚', date: '2026-04-15' },
    { id: 2, title: '二手笔记本电脑', price: 1200, category: 'electronics', location: '西区教学楼', icon: '💻', date: '2026-04-14' },
    { id: 3, title: '无线蓝牙耳机', price: 80, category: 'electronics', location: '南区食堂', icon: '🎧', date: '2026-04-13' },
    { id: 4, title: '篮球', price: 50, category: 'sports', location: '体育馆', icon: '🏀', date: '2026-04-12' },
    { id: 5, title: '手机壳', price: 10, category: 'electronics', location: '北区超市', icon: '📱', date: '2026-04-11' },
    { id: 6, title: '运动T恤', price: 30, category: 'clothing', location: '东区宿舍', icon: '👕', date: '2026-04-10' },
    { id: 7, title: '数码相机', price: 500, category: 'electronics', location: '西区教学楼', icon: '📷', date: '2026-04-09' },
    { id: 8, title: '收纳盒', price: 15, category: 'daily', location: '南区食堂', icon: '🧺', date: '2026-04-08' },
    { id: 9, title: '线性代数教材', price: 20, category: 'books', location: '西区教学楼', icon: '📖', date: '2026-04-07' },
    { id: 10, title: '大学物理教材', price: 30, category: 'books', location: '南区食堂', icon: '📚', date: '2026-04-06' },
    { id: 11, title: '学习笔记', price: 15, category: 'books', location: '东区宿舍', icon: '✏️', date: '2026-04-05' },
    { id: 12, title: '绘图工具', price: 25, category: 'daily', location: '北区超市', icon: '📐', date: '2026-04-04' },
    { id: 13, title: '运动鞋', price: 80, category: 'clothing', location: '体育馆', icon: '👟', date: '2026-04-03' },
    { id: 14, title: '平板电脑', price: 800, category: 'electronics', location: '西区教学楼', icon: '📱', date: '2026-04-02' },
    { id: 15, title: '羽毛球拍', price: 45, category: 'sports', location: '体育馆', icon: '🏸', date: '2026-04-01' },
    { id: 16, title: '保温杯', price: 20, category: 'daily', location: '北区超市', icon: '🥤', date: '2026-03-31' },
    { id: 17, title: '英语词典', price: 35, category: 'books', location: '东区宿舍', icon: '📖', date: '2026-03-30' },
    { id: 18, title: '背包', price: 60, category: 'clothing', location: '南区食堂', icon: '🎒', date: '2026-03-29' },
    { id: 19, title: '鼠标', price: 25, category: 'electronics', location: '西区教学楼', icon: '🖱️', date: '2026-03-28' },
    { id: 20, title: '台灯', price: 30, category: 'daily', location: '北区超市', icon: '💡', date: '2026-03-27' },
    { id: 21, title: '瑜伽垫', price: 40, category: 'sports', location: '体育馆', icon: '🧘', date: '2026-03-26' },
    { id: 22, title: '键盘', price: 35, category: 'electronics', location: '东区宿舍', icon: '⌨️', date: '2026-03-25' },
    { id: 23, title: '耳机', price: 45, category: 'electronics', location: '南区食堂', icon: '🎧', date: '2026-03-24' },
    { id: 24, title: '运动裤', price: 25, category: 'clothing', location: '体育馆', icon: '👖', date: '2026-03-23' }
];

// 当前状态
let filteredProducts = [...products];
let currentPage = 1;
const itemsPerPage = 8;

// 从URL获取分类参数
function getCategoryFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category');
}

// 商品列表页面筛选
function filterProducts() {
    const categorySelect = document.querySelector('.filter-group select:first-of-type');
    const sortSelect = document.querySelector('.filter-group select:last-of-type');
    const searchTerm = document.getElementById('search-input') ? document.getElementById('search-input').value.toLowerCase().trim() : '';
    
    const category = categorySelect ? categorySelect.value : 'all';
    const sortType = sortSelect ? sortSelect.value : 'default';
    
    // 始终从原始数据开始筛选
    let tempProducts = [...products];
    
    // 按分类筛选
    if (category !== 'all') {
        tempProducts = tempProducts.filter(product => product.category === category);
    }
    
    // 按搜索关键词筛选
    if (searchTerm !== '') {
        tempProducts = tempProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.location.toLowerCase().includes(searchTerm)
        );
    }
    
    // 按价格排序
    if (sortType === 'price_asc') {
        tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price_desc') {
        tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortType === 'newest') {
        tempProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // 更新筛选后的商品
    filteredProducts = tempProducts;
    
    // 重置到第一页
    currentPage = 1;
    renderProducts();
    updatePagination();
    
    // 更新商品数量显示
    updateProductCount();
}

// 搜索商品
function searchProducts() {
    // 直接调用筛选函数，这样筛选和搜索会一起生效
    filterProducts();
}

// 更新商品数量显示
function updateProductCount() {
    const productCount = document.querySelector('.products-header h2');
    if (productCount) {
        const count = filteredProducts.length;
        productCount.textContent = `商品列表 (${count}件商品)`;
    }
}

// 渲染商品列表
function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    // 计算当前页的商品
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);
    
    // 清空现有商品
    productGrid.innerHTML = '';
    
    // 显示商品
    if (currentProducts.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px; color: #666;">没有找到相关商品</p>';
        return;
    }
    
    currentProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = () => showProductDetail(product.id);
        productCard.innerHTML = `
            <div class="product-img">${product.icon}</div>
            <h3>${product.title}</h3>
            <p class="price">¥${product.price}</p>
            <p class="location">${product.location}</p>
        `;
        productGrid.appendChild(productCard);
    });
}

// 显示商品详情
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // 存储商品信息到本地存储
        localStorage.setItem('currentProduct', JSON.stringify(product));
        // 跳转到商品详情页
        window.location.href = 'product-detail.html';
    }
}

// 分页功能
function updatePagination() {
    const paginationDiv = document.querySelector('.pagination');
    if (!paginationDiv) return;
    
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    
    // 清空现有分页按钮
    paginationDiv.innerHTML = '';
    
    // 上一页按钮
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn-secondary';
    prevBtn.textContent = '上一页';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = goToPrevPage;
    paginationDiv.appendChild(prevBtn);
    
    // 页码按钮
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = i === currentPage ? 'btn-primary' : 'btn-secondary';
        pageBtn.textContent = i;
        pageBtn.onclick = () => goToPage(i);
        paginationDiv.appendChild(pageBtn);
    }
    
    // 下一页按钮
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-secondary';
    nextBtn.textContent = '下一页';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = goToNextPage;
    paginationDiv.appendChild(nextBtn);
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderProducts();
        updatePagination();
        // 滚动到商品列表顶部
        const productsContainer = document.querySelector('.products-container');
        if (productsContainer) {
            productsContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function goToPrevPage() {
    goToPage(currentPage - 1);
}

function goToNextPage() {
    goToPage(currentPage + 1);
}

// 加载商品详情
function loadProductDetail() {
    const product = localStorage.getItem('currentProduct');
    if (product) {
        const productObj = JSON.parse(product);
        
        // 更新页面内容
        const titleEl = document.querySelector('.product-detail-header h1');
        const priceEl = document.querySelector('.product-detail-price');
        const iconEl = document.querySelector('.main-image');
        const metaElements = document.querySelectorAll('.product-detail-meta span');
        
        if (titleEl) titleEl.textContent = productObj.title;
        if (priceEl) priceEl.textContent = '¥' + productObj.price;
        if (iconEl) iconEl.textContent = productObj.icon;
        
        // 更新元信息
        if (metaElements.length >= 2) {
            metaElements[0].textContent = '发布时间: ' + productObj.date;
            metaElements[1].textContent = '交易地点: ' + productObj.location;
        }
        
        // 更新标题
        document.title = productObj.title + ' - 校园二手交易平台';
        
        // 加载相关推荐
        loadRelatedProducts(productObj.category, productObj.id);
        
        // 初始化收藏按钮状态
        initFavoriteButton(productObj.id);
        
        // 初始化联系卖家按钮
        initContactButton();
        
        // 初始化分享按钮
        initShareButton(productObj.title);
    }
}

// 初始化联系卖家按钮
function initContactButton() {
    const contactBtn = document.querySelector('.product-detail-actions .btn-primary');
    if (contactBtn && contactBtn.textContent.includes('联系')) {
        contactBtn.onclick = () => {
            const user = localStorage.getItem('user');
            if (!user) {
                showMessage('请先登录后再联系卖家', 'error');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                showMessage('正在连接卖家...', 'success');
            }
        };
    }
}

// 初始化分享按钮
function initShareButton(title) {
    const shareBtn = document.querySelectorAll('.product-detail-actions .btn-secondary');
    shareBtn.forEach(btn => {
        if (btn.textContent.includes('分享')) {
            btn.onclick = () => {
                const url = window.location.href;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(url).then(() => {
                        showMessage('链接已复制到剪贴板', 'success');
                    }).catch(() => {
                        showMessage('复制失败，请手动复制', 'error');
                    });
                } else {
                    showMessage('浏览器不支持复制功能', 'error');
                }
            };
        }
    });
}

// 初始化收藏按钮
function initFavoriteButton(productId) {
    const favoriteBtn = document.querySelector('.product-detail-actions .btn-secondary');
    if (favoriteBtn && favoriteBtn.textContent.includes('收藏')) {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isFavorited = favorites.includes(productId);
        
        if (isFavorited) {
            favoriteBtn.textContent = '已收藏';
            favoriteBtn.onclick = () => toggleFavorite(productId, false);
        } else {
            favoriteBtn.textContent = '收藏商品';
            favoriteBtn.onclick = () => toggleFavorite(productId, true);
        }
    }
}

// 切换收藏状态
function toggleFavorite(productId, add) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (add) {
        if (!favorites.includes(productId)) {
            favorites.push(productId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            showMessage('已添加到收藏', 'success');
        }
    } else {
        favorites = favorites.filter(id => id !== productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showMessage('已取消收藏', 'success');
    }
    
    // 更新按钮状态
    const favoriteBtn = document.querySelector('.product-detail-actions .btn-secondary');
    if (favoriteBtn && favoriteBtn.textContent.includes('收藏')) {
        if (add) {
            favoriteBtn.textContent = '已收藏';
            favoriteBtn.onclick = () => toggleFavorite(productId, false);
        } else {
            favoriteBtn.textContent = '收藏商品';
            favoriteBtn.onclick = () => toggleFavorite(productId, true);
        }
    }
}

// 加载相关推荐
function loadRelatedProducts(category, currentId) {
    const relatedGrid = document.querySelectorAll('.hot-products .product-grid')[1];
    if (!relatedGrid) return;
    
    // 查找同类商品
    const relatedProducts = products
        .filter(p => p.category === category && p.id !== currentId)
        .slice(0, 4);
    
    // 清空现有推荐
    relatedGrid.innerHTML = '';
    
    // 添加相关商品
    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = () => showProductDetail(product.id);
        productCard.innerHTML = `
            <div class="product-img">${product.icon}</div>
            <h3>${product.title}</h3>
            <p class="price">¥${product.price}</p>
            <p class="location">${product.location}</p>
        `;
        relatedGrid.appendChild(productCard);
    });
}

// 发布商品处理
function handlePublish(event) {
    event.preventDefault();
    
    // 获取表单数据
    const title = document.getElementById('product-title').value;
    const category = document.getElementById('product-category').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const location = document.getElementById('product-location').value;
    
    // 验证表单
    if (!title || !category || !price || !description || !location) {
        showMessage('请填写所有必填字段', 'error');
        return;
    }
    
    // 检查是否登录
    const user = localStorage.getItem('user');
    if (!user) {
        showMessage('请先登录后再发布商品', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    const userObj = JSON.parse(user);
    
    // 创建新商品
    const newProduct = {
        id: products.length + 1,
        title: title,
        price: parseFloat(price),
        category: category,
        location: location,
        icon: getCategoryIcon(category),
        date: new Date().toISOString().split('T')[0],
        description: description,
        seller: userObj.username
    };
    
    // 保存到本地存储
    const myProducts = JSON.parse(localStorage.getItem('myProducts') || '[]');
    myProducts.push(newProduct);
    localStorage.setItem('myProducts', JSON.stringify(myProducts));
    
    // 添加到全局商品数组
    products.push(newProduct);
    
    showMessage('商品发布成功！', 'success');
    
    // 清空表单
    document.getElementById('publish-form').reset();
}

// 获取分类图标
function getCategoryIcon(category) {
    const icons = {
        'books': '📚',
        'electronics': '💻',
        'clothing': '👕',
        'daily': '🏠',
        'sports': '🏀',
        'other': '📱'
    };
    return icons[category] || '📱';
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    checkLoginStatus();
    
    // 初始化商品列表
    if (document.querySelector('.product-grid')) {
        // 检查URL是否有分类参数
        const urlCategory = getCategoryFromUrl();
        if (urlCategory) {
            // 设置分类选择器的值
            const categorySelect = document.querySelector('.filter-group select:first-of-type');
            if (categorySelect) {
                categorySelect.value = urlCategory;
            }
            // 执行筛选
            filterProducts();
        } else {
            renderProducts();
            updatePagination();
            updateProductCount();
        }
    }
    
    // 注册表单验证
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // 登录表单验证
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // 搜索框回车事件
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
    
    // 商品详情页初始化
    if (document.querySelector('.product-detail')) {
        loadProductDetail();
    }
    
    // 发布表单处理
    const publishForm = document.getElementById('publish-form');
    if (publishForm) {
        publishForm.addEventListener('submit', handlePublish);
    }
    
    // 首页静态商品卡片点击事件
    const staticProductCards = document.querySelectorAll('.product-card');
    staticProductCards.forEach(card => {
        // 只有未绑定onclick的卡片才添加点击事件（避免与动态生成的卡片冲突）
        if (!card.onclick) {
            const title = card.querySelector('h3').textContent;
            const product = products.find(p => p.title === title);
            if (product) {
                card.addEventListener('click', () => showProductDetail(product.id));
            }
        }
    });
    
    // 分类卡片点击事件
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // 获取分类参数并跳转到商品列表页
            const category = card.dataset.category;
            window.location.href = `products.html?category=${category}`;
        });
    });
    
    // 英雄区域按钮点击事件
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            window.location.href = 'publish.html';
        });
    }
    
    // 导航链接平滑滚动
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // 个人中心标签切换
    const profileTabs = document.querySelectorAll('.profile-tab');
    const profileContent = document.querySelector('.profile-content');
    profileTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的active类
            profileTabs.forEach(t => t.classList.remove('active'));
            // 添加当前标签的active类
            this.classList.add('active');
            
            // 根据标签切换内容
            const tabName = this.textContent;
            if (tabName === '我的发布') {
                loadMyProducts();
            } else if (tabName === '我的收藏') {
                loadMyFavorites();
            } else if (tabName === '个人信息') {
                loadProfileInfo();
            } else if (tabName === '设置') {
                loadSettings();
            }
        });
    });
    
    // 初始化加载我的发布
    if (document.querySelector('.profile-container')) {
        loadMyProducts();
    }
});

// 加载我的发布
function loadMyProducts() {
    const profileContent = document.querySelector('.profile-content');
    if (!profileContent) return;
    
    const myProducts = JSON.parse(localStorage.getItem('myProducts') || '[]');
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null;
    
    const userProducts = myProducts.filter(p => p.seller === userObj?.username);
    
    if (userProducts.length === 0) {
        profileContent.innerHTML = `
            <h3>我的发布</h3>
            <p style="text-align: center; padding: 40px; color: #666;">您还没有发布任何商品</p>
        `;
        return;
    }
    
    let html = '<h3>我的发布</h3><div class="product-grid">';
    userProducts.forEach(product => {
        html += `
            <div class="product-card" onclick="showProductDetail(${product.id})">
                <div class="product-img">${product.icon}</div>
                <h3>${product.title}</h3>
                <p class="price">¥${product.price}</p>
                <p class="location">${product.location}</p>
            </div>
        `;
    });
    html += '</div>';
    profileContent.innerHTML = html;
}

// 加载我的收藏
function loadMyFavorites() {
    const profileContent = document.querySelector('.profile-content');
    if (!profileContent) return;
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.length === 0) {
        profileContent.innerHTML = `
            <h3>我的收藏</h3>
            <p style="text-align: center; padding: 40px; color: #666;">您还没有收藏任何商品</p>
        `;
        return;
    }
    
    const favoriteProducts = products.filter(p => favorites.includes(p.id));
    
    let html = '<h3>我的收藏</h3><div class="product-grid">';
    favoriteProducts.forEach(product => {
        html += `
            <div class="product-card" onclick="showProductDetail(${product.id})">
                <div class="product-img">${product.icon}</div>
                <h3>${product.title}</h3>
                <p class="price">¥${product.price}</p>
                <p class="location">${product.location}</p>
            </div>
        `;
    });
    html += '</div>';
    profileContent.innerHTML = html;
}

// 加载个人信息
function loadProfileInfo() {
    const profileContent = document.querySelector('.profile-content');
    if (!profileContent) return;
    
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null;
    
    profileContent.innerHTML = `
        <h3>个人信息</h3>
        <div style="padding: 20px;">
            <p><strong>用户名:</strong> ${userObj?.username || '未登录'}</p>
            <p><strong>邮箱:</strong> ${userObj?.email || '未设置'}</p>
            <p><strong>注册时间:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
    `;
}

// 加载设置页面
function loadSettings() {
    const profileContent = document.querySelector('.profile-content');
    if (!profileContent) return;
    
    profileContent.innerHTML = `
        <h3>设置</h3>
        <div style="padding: 20px;">
            <p><strong>账号设置</strong></p>
            <button class="btn-primary" onclick="logout()" style="margin-top: 10px;">退出登录</button>
        </div>
    `;
}