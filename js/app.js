// ===== Settings =====

const COOL_OFF_MS = 48 * 60 * 60 * 1000;

// ===== Saving and loading =====

function loadItems() {
    const itemsJSON = localStorage.getItem('coolOffItems');
    if (itemsJSON === null) {
        return [];
    }
    try {
        return JSON.parse(itemsJSON);
    } catch (error) {
        document.getElementById('load-error').textContent =
            'Your saved items could not be loaded, so the cart is starting empty.';
        return [];
    }
}

function saveItems(items) {
    localStorage.setItem('coolOffItems', JSON.stringify(items));
}

function addItem(name, price, link) {
    const items = loadItems();
    const addedAt = Date.now();
    items.push({
        id: addedAt,
        name: name,
        price: price,
        link: link,
        addedAt: addedAt,
        unlockAt: addedAt + COOL_OFF_MS,
        status: 'waiting'
    });
    saveItems(items);
    displayItems();
}

function decideItem(id, choice) {
    const items = loadItems();
    items.forEach(item => {
        if (item.id === id) {
            item.status = choice;
        }
    });
    saveItems(items);
    displayItems();
}

// ===== Time left =====

function getTimeLeftText(unlockAt) {
    const timeLeft = unlockAt - Date.now();
    const totalHours = Math.floor(timeLeft / (60 * 60 * 1000));
    if (totalHours < 1) {
        return 'Unlocks in less than an hour';
    }
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    return `Unlocks in ${days}d ${hours}h`;
}

// ===== Money saved =====

function getMoneySaved(items) {
    let total = 0;
    items.forEach(item => {
        if (item.status === 'skipped') {
            total = total + item.price;
        }
    });
    return total;
}

// ===== Showing items =====

function displayItems() {
    const items = loadItems();
    const waitingList = document.getElementById('waiting-list');
    const readyList = document.getElementById('ready-list');
    waitingList.innerHTML = '';
    readyList.innerHTML = '';

    items.forEach(item => {
        if (item.status !== 'waiting') {
            return;
        }

        const listItem = document.createElement('li');

        const title = document.createElement('p');
        title.textContent = `${item.name} — $${item.price.toFixed(2)}`;
        listItem.appendChild(title);

        if (item.link !== '') {
            const link = document.createElement('a');
            link.href = item.link;
            link.textContent = 'View item';
            link.target = '_blank';
            link.rel = 'noopener';
            listItem.appendChild(link);
        }

        const status = document.createElement('p');
        if (item.unlockAt > Date.now()) {
            status.textContent = getTimeLeftText(item.unlockAt);
            listItem.appendChild(status);
            waitingList.appendChild(listItem);
        } else {
            status.textContent = 'Ready to decide. Do you still want it?';
            listItem.appendChild(status);

            const buyButton = document.createElement('button');
            buyButton.type = 'button';
            buyButton.className = 'btn-primary';
            buyButton.textContent = 'Buy it';
            buyButton.setAttribute('aria-label', `Buy ${item.name}`);
            buyButton.addEventListener('click', () => decideItem(item.id, 'bought'));

            const skipButton = document.createElement('button');
            skipButton.type = 'button';
            skipButton.className = 'btn-danger';
            skipButton.textContent = 'Skip it';
            skipButton.setAttribute('aria-label', `Skip ${item.name}`);
            skipButton.addEventListener('click', () => decideItem(item.id, 'skipped'));

            listItem.appendChild(buyButton);
            listItem.appendChild(skipButton);
            readyList.appendChild(listItem);
        }
    });

    if (waitingList.children.length === 0) {
        waitingList.innerHTML = '<li>Your cart is empty. Add something you\'re tempted to buy.</li>';
    }
    if (readyList.children.length === 0) {
        readyList.innerHTML = '<li>Nothing is ready yet.</li>';
    }

    const moneySaved = getMoneySaved(items);
    document.getElementById('money-saved').textContent =
        `Money saved: $${moneySaved.toFixed(2)}`;
}

// ===== Form =====

const itemForm = document.getElementById('item-form');
const nameInput = document.getElementById('item-name');
const priceInput = document.getElementById('item-price');
const linkInput = document.getElementById('item-link');
const formError = document.getElementById('form-error');

itemForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const link = linkInput.value.trim();

    if (name === '') {
        formError.textContent = 'Please enter an item name.';
        return;
    }
    if (priceInput.value === '' || isNaN(price) || price < 0) {
        formError.textContent = 'Please enter a price, like 24.99.';
        return;
    }
    if (link !== '' && !link.startsWith('http')) {
        formError.textContent = 'Links should start with http:// or https://.';
        return;
    }

    formError.textContent = '';
    addItem(name, price, link);
    itemForm.reset();
    nameInput.focus();
});

// ===== Start =====

displayItems();