const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeModal = document.getElementById('closeModal');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const checkoutBtn = document.getElementById('checkoutBtn');
        
 let cart = [];

        // Открыть модальное окно корзины
        cartBtn.addEventListener('click', () => {
            cartModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            renderCart();
        });
        
        // Закрыть модальное окно корзины
        closeModal.addEventListener('click', () => {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Закрыть модальное окно при клике вне его
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Добавление товара в корзину
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const name = button.getAttribute('data-name');
                const price = parseFloat(button.getAttribute('data-price'));
                
                // Проверяем, есть ли товар уже в корзине
                const existingItem = cart.find(item => item.id === id);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id,
                        name,
                        price,
                        quantity: 1
                    });
                }
                
                updateCartCount();
                animateAddToCart(button);
                
                // Временное уведомление
                showToast(`${name} добавлен в корзину`);
            });
        });
        
        // Обновление счетчика товаров в корзине
        function updateCartCount() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        // Отображение содержимого корзины
        function renderCart() {
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center;">Ваша корзина пуста</p>';
                cartTotalPrice.textContent = '$0';
                return;
            }
            
            cartItems.innerHTML = '';
            let totalPrice = 0;
            
            cart.forEach(item => {
                totalPrice += item.price * item.quantity;
                
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="cart-item-img">
                        <img src="${item.name}" alt="${item.name} гоночный FPV дрон" />
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>контроллер полёта</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="cart-item-remove" data-id="${item.id}">&times;</button>
                `;
                
                cartItems.appendChild(cartItemElement);
            });
            
            cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
            
            // Добавляем обработчики для кнопок +/-
            document.querySelectorAll('.decrease').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    decreaseItemQuantity(id);
                });
            });
            
            document.querySelectorAll('.increase').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    increaseItemQuantity(id);
                });
            });
            
            // Добавляем обработчики для кнопок удаления
            document.querySelectorAll('.cart-item-remove').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    removeFromCart(id);
                });
            });
        }
        
        // Увеличение количества товара
        function increaseItemQuantity(id) {
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity += 1;
                updateCartCount();
                renderCart();
            }
        }
        
        // Уменьшение количества товара
        function decreaseItemQuantity(id) {
            const item = cart.find(item => item.id === id);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    removeFromCart(id);
                    return;
                }
                updateCartCount();
                renderCart();
            }
        }
        
        // Удаление товара из корзины
        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            updateCartCount();
            renderCart();
            showToast('Товар удален из корзины');
        }
        
        // Оформление заказа
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showToast('Корзина пуста', 'error');
                return;
            }
            
            // Здесь должна быть логика оформления заказа
            alert(`Заказ оформлен! Сумма: $${cartTotalPrice.textContent.substring(1)}`);
            cart = [];
            updateCartCount();
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Анимация при добавлении в корзину
        function animateAddToCart(button) {
            button.textContent = 'Добавлено!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = 'В корзину';
                button.style.backgroundColor = 'var(--primary)';
            }, 1000);
        }
        
        // Всплывающее уведомление
        function showToast(message, type = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }
        
        // Добавляем стили для toast
        const toastStyles = document.createElement('style');
        toastStyles.textContent = `
            .toast {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 12px 24px;
                border-radius: 4px;
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 1000;
            }
            
            .toast.show {
                opacity: 1;
            }
            
            .toast-success {
                background-color: #4CAF50;
            }
            
            .toast-error {
                background-color: #f44336;
            }
        `;
        document.head.appendChild(toastStyles);
 