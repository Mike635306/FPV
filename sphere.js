  // Check if Three.js loaded
        if (typeof THREE === 'undefined') {
            document.getElementById('loading').innerHTML = '<div class="error">Error: Three.js failed to load.<br>Please check your internet connection.</div>';
        } else {
            initScene();
        }

        function initScene() {
            try {
                // Global variables
                let scene, camera, renderer, sphere, codeRing = [];
                let sphereGroup, ringGroup;
                
                // Code elements for display
                const codeElements = [
                    ' Абакан', 'Александров', ' Алупка', 'Алушта', 'Анадырь', 
                    'Анапа', 'Ангарск', 'Армавир', 'Архангельск', ' Астрахань',
                    ' Ахтубинск', 'Балаклава', 'Балаклава', 'Балаково', 'Балашиха',
                    'Балтийск', ' Барнаул', 'Бахчисарай', 'Белгород', 'Белокуриха',
                    'Белорецк', 'Бийск', 'Благовещенск', 'Бологое', 'Братск',
                    'Брянск','Буйнакск','Валдай','Великие Луки','Великий Новгород',
                    'Великий Устюг','Верхотурье','Владивосток',' Владикавказ','Владимир',
                    'Волгоград','Волгодонск','Вологда','Воркута','Воронеж','Выборг',
                    'Гатчина','Геленджик','Горно-Алтайск','Гороховец','Грозный','Гусев',
                    'Гусь-Хрустальный','Далматово','Дербент','Дзержинск','Дмитров','Долгопрудный',
                    'Дубна','Евпатория','Ейск','Екатеринбург','Елабуга','Ессентуки','Железноводск',
                    'Задонск','Звенигород','Зеленогорск','Зеленоградск','Златоуст','Иваново'
                 
                ];
     //Игарка, Ижевск, Иннополис, Иркутск, Истра, Йошкар-Ола, Казань, Калининград, Калуга, Калязин, Каспийск, Кемерово, Керчь, Кидекша, Киржач, Киров, Кисловодск, Клин, Ковров, Козельск, Коломна, Комсомольск-на-Амуре, Кострома, Красногорск, Краснодар, Красноярск, Кронштадт, Курган, Курск, Л Липецк, Магадан, Магас, Магнитогорск, Майкоп, Махачкала, Миасс, Минеральные Воды, Мирный, Мичуринск, Можайск, Москва, Мурманск, Муром, Мытищи, Мышкин, Набережные Челны, Назрань, Нальчик, Находка, Невинномысск, Невьянск, Неман, Нерехта, Нижневартовск, Нижнекамск, Нижний Новгород, Нижний Тагил, Новокузнецк, Новороссийск, Новосибирск, Новочеркасск, Новый Уренгой, Норильск, Омск, Орджоникидзе, Орёл, Оренбург, Орск, Осташков, П Палех, Пенза, Первоуральск, Переславль-Залесский, Пермь, Петергоф, Петрозаводск, Петропавловск-Камчатский, Печоры, Пионерский, Питкяранта, Плес, Подольск, Полесск, Пошехонье, Приморско-Ахтарск, Приозерск, Псков, Пушкин, Пятигорск, Ржев, Рославль, Ростов Великий, Ростов-на-Дону, Рыбинск, Рязань, Салехард, Самара, Санкт-Петербург, Саранск, Саратов, Светлогорск, Светогорск, Севастополь, Северодвинск, Североморск, Сергиев Посад, Симферополь, Смоленск, Советск, Сортавала, Сочи, Ставрополь, Старая Русса, Старый Крым, Стерлитамак, Стрельна, Судак, Суздаль, Сургут, Сызрань, Сыктывкар, Таганрог, Тамбов, Таруса, Тверь, Теберда, Темрюк, Тобольск, Тольятти, Томск, Торжок, Троицк, Туапсе, Тула, Тутаев, Тюмень, Углич, Улан-Удэ, Ульяновск, Уссурийск, Уфа, Ухта, Феодосия, Форос, Хабаровск, Ханты-Мансийск, Хасавюрт, Чебоксары, Челябинск, Череповец, Черняховск, Чита, Шлиссельбург, Щёлкино, Э Элиста, Энгельс, Ю Южно-Сахалинск, Юрьев-Польский, Я Якутск, Ялта, Ярославль. 
                function init() {
                    // Create scene
                    scene = new THREE.Scene();
                    
                    // Create camera
                    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.z = 8;
                    
                    // Create renderer
                    renderer = new THREE.WebGLRenderer({ antialias: true });
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    renderer.setClearColor(0x000000);
                    
                    const container = document.getElementById('container');
                    container.appendChild(renderer.domElement);
                    
                    // Hide loading
                    document.getElementById('loading').style.display = 'none';
                    
                    createSphere();
                    createCodeRing();
                    setupLighting();
                    
                    animate();
                }       

                function createSphere() {
                    sphereGroup = new THREE.Group();
                    
                    // Main sphere (shell)
                    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
                    const sphereMaterial = new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.8
                    });
                    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                    sphereGroup.add(sphere);
                    
                    // Inner sphere (core)
                    const coreGeometry = new THREE.SphereGeometry(1.5, 16, 16);
                    const coreMaterial = new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.3
                    });
                    const core = new THREE.Mesh(coreGeometry, coreMaterial);
                    sphereGroup.add(core);
                    
                    // Additional rings inside sphere
                    for (let i = 0; i < 3; i++) {
                        const ringGeometry = new THREE.RingGeometry(0.5 + i * 0.3, 0.6 + i * 0.3, 16);
                        const ringMaterial = new THREE.MeshBasicMaterial({
                            color: 0xffffff,
                            transparent: true,
                            opacity: 0.4,
                            side: THREE.DoubleSide
                        });
                        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                        ring.rotation.x = Math.PI / 2;
                        ring.rotation.z = i * Math.PI / 3;
                        sphereGroup.add(ring);
                    }
                    
                    scene.add(sphereGroup);
                }

                function createCodeRing() {
                    ringGroup = new THREE.Group();
                    
                    const radius = 4;
                    const elementCount = codeElements.length;
                    
                    for (let i = 0; i < elementCount; i++) {
                        const angle = (i / elementCount) * Math.PI * 2;
                        
                        // Create text texture
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.width = 256;
                        canvas.height = 68;
                        
                        // Clear canvas
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        
                        // Draw text
                        context.fillStyle = 'white';
                        context.font = 'bold 20px Courier New';
                        context.textAlign = 'center';
                        context.textBaseline = 'middle';
                        context.fillText(codeElements[i], canvas.width / 2, canvas.height / 2);
                        
                        const texture = new THREE.CanvasTexture(canvas);
                        texture.needsUpdate = true;
                        
                        const material = new THREE.MeshBasicMaterial({
                            map: texture,
                            transparent: true,
                            opacity: 0.9
                        });
                        
                        const geometry = new THREE.PlaneGeometry(2, 0.5);
                        const textMesh = new THREE.Mesh(geometry, material);
                        
                        // Position elements in circle
                        textMesh.position.x = Math.cos(angle) * radius;
                        textMesh.position.z = Math.sin(angle) * radius;
                        textMesh.position.y = (Math.random() - 0.5) * 2;
                        
                        // Rotate towards center
                        textMesh.lookAt(0, textMesh.position.y, 0);
                        
                        // Add random tilt
                        textMesh.rotation.x += (Math.random() - 0.5) * 0.5;
                        textMesh.rotation.z += (Math.random() - 0.5) * 0.5;
                        
                        codeRing.push(textMesh);
                        ringGroup.add(textMesh);
                    }
                    
                    scene.add(ringGroup);
                }

                function setupLighting() {
                    // Ambient light
                    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
                    scene.add(ambientLight);
                    
                    // Directional light
                    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                    directionalLight.position.set(5, 5, 5);
                    scene.add(directionalLight);
                }

                function animate() {
                    requestAnimationFrame(animate);
                    
                    // Rotate sphere
                    if (sphereGroup) {
                        sphereGroup.rotation.y += 0.005;
                        sphereGroup.rotation.x += 0.002;
                    }
                    
                    // Rotate code ring
                    if (ringGroup) {
                        ringGroup.rotation.y -= 0.008;
                    }
                    
                    // Individual rotation of code elements
                    codeRing.forEach((element, index) => {
                        element.rotation.y += 0.01 + (index * 0.001);
                        element.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
                    });
                    
                    renderer.render(scene, camera);
                }

                // Handle window resize
                function onWindowResize() {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                }

                window.addEventListener('resize', onWindowResize);
                
                // Start the application
                init();

            } catch (error) {
                console.error('Error initializing 3D scene:', error);
                document.getElementById('loading').innerHTML = '<div class="error">Error loading 3D scene.<br>Please refresh the page.</div>';
            }
        }