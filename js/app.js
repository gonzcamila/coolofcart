//
const COOL_OFF_MS = 1 * 60 * 1000;

function loadItems() {
    const itemsJSON = localStorage.getItem('coolOffItems');

    if (itemsJSON === null) {
        return [];
    }

    try {
       
        return JSON.parse(itemsJSON);
    } catch (error) {
        // Shows an error if the saved data cannot be read
        document.getElementById('load-error').textContent =
            'Your saved items could not be loaded, so the cart is empty.';
        return [];
    }
}

function saveItems(items) {
    localStorage.setItem('coolOffItems', JSON.stringify(items));
}

// Adds new item to the list
function addItem(name, price, link) {
    const items = loadItems();
    const addedAt = Date.now();

    //  new object with all the item info
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

    // Refreshes the page so the new item shows
    displayItems();
}

// Updates if the item was bought or pass
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

//how much time is left before an item unlocks
function getTimeLeftText(unlockAt) {
    const timeLeft = unlockAt - Date.now();
    const totalHours = Math.floor(timeLeft / (60 * 60 * 1000));

    // smaller message if it's under an hour
    if (totalHours < 1) {
        return 'Unlocks in less than an hour';
    }

    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    return `Unlocks in ${days}d ${hours}h`;
}

// ===== Money saved =====

// Adds up the prices of all passed items
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

// Displays all of the items on the page
function displayItems() {
    const items = loadItems();

    const waitingList = document.getElementById('waiting-list');
    const readyList = document.getElementById('ready-list');

    // Clears the old list before rebuilding it
    waitingList.innerHTML = '';
    readyList.innerHTML = '';

    items.forEach(item => {

        // Ignores items that have already been decided
        if (item.status !== 'waiting') {
            return;
        }

        const listItem = document.createElement('li');
        listItem.className = 'item-card';

        const title = document.createElement('p');
        title.className = 'item-name';
        title.textContent = `${item.name} — $${item.price.toFixed(2)}`;
        listItem.appendChild(title);

        //creates a link if one was entered
        if (item.link !== '') {
            const link = document.createElement('a');
            link.href = item.link;
            link.textContent = 'View item';
            link.target = '_blank';
            link.rel = 'noopener';
            listItem.appendChild(link);
        }

        const status = document.createElement('p');
        status.className = 'item-status';

        // Keeps the item in the waiting list until the timer is finished
        if (item.unlockAt > Date.now()) {
            status.textContent = getTimeLeftText(item.unlockAt);
            listItem.appendChild(status);
            waitingList.appendChild(listItem);
        } else {

            // how the decision buttons when the time is uo
            status.textContent = 'Ready to decide. Do you still want it?';
            listItem.appendChild(status);

            const buyButton = document.createElement('button');
            buyButton.type = 'button';
            buyButton.className = 'btn-primary';
            buyButton.textContent = 'Buy it';
            buyButton.setAttribute('aria-label', `Buy ${item.name}`);

            // saves the item as bought
            buyButton.addEventListener('click', () => decideItem(item.id, 'bought'));

            const skipButton = document.createElement('button');
            skipButton.type = 'button';
            skipButton.className = 'btn-danger';
            skipButton.textContent = 'Skip it';
            skipButton.setAttribute('aria-label', `Skip ${item.name}`);

            // Marks the item as skipped
            skipButton.addEventListener('click', () => decideItem(item.id, 'skipped'));

            listItem.appendChild(buyButton);
            listItem.appendChild(skipButton);

            readyList.appendChild(listItem);
        }
    });

    // Shows a message if there are no waiting items
    if (waitingList.children.length === 0) {
        waitingList.innerHTML = '<li class="empty-message">Your cart is empty. Add something you\'re tempted to buy.</li>';
    }

    // Shows a message if nothing is ready yet
    if (readyList.children.length === 0) {
        readyList.innerHTML = '<li class="empty-message">Nothing is ready yet.</li>';
    }

    // Updates the total money saved section
    const moneySaved = getMoneySaved(items);
    document.getElementById('money-saved').textContent =
        `Money saved: $${moneySaved.toFixed(2)}`;
}

// ===== Form =====

// this gets all the info of the product name, price, and link
const itemForm = document.getElementById('item-form');
const nameInput = document.getElementById('item-name');
const priceInput = document.getElementById('item-price');
const linkInput = document.getElementById('item-link');
const formError = document.getElementById('form-error');

//  when the form is submitted
itemForm.addEventListener('submit', event => {

    // Stops the page from refreshing
    event.preventDefault();

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const link = linkInput.value.trim();

    // Makes sure entered a name
    if (name === '') {
        formError.textContent = 'Please enter an item name.';
        return;
    }

    // Makes sure the price is valid
    if (priceInput.value === '' || isNaN(price) || price < 0) {
        formError.textContent = 'Please enter a price, like 24.99.';
        return;
    }


    // Clears any old error message
    formError.textContent = '';

    // Adds the new item
    addItem(name, price, link);

    // Clears the form for the next item
    itemForm.reset();

    // Puts the cursor back in the name box
    nameInput.focus();
});

// ===== Dark / light theme =====

const themeButton = document.getElementById('theme-toggle');

// Updates the button text so it always says what clicking will do
function updateThemeButton(isDark) {
    if (isDark) {
        themeButton.textContent = 'Light mode';
    } else {
        themeButton.textContent = 'Dark mode';
    }
    themeButton.setAttribute('aria-pressed', isDark);
}

// Uses the saved theme from localStorage when the page loads
function initializeTheme() {
    const isDark = localStorage.getItem('coolOffTheme') === 'dark';
    if (isDark) {
        document.body.classList.add('theme-dark');
    }
    updateThemeButton(isDark);
}

// Switches the theme and saves the choice
function toggleTheme() {
    const isDark = document.body.classList.toggle('theme-dark');
    if (isDark) {
        localStorage.setItem('coolOffTheme', 'dark');
    } else {
        localStorage.setItem('coolOffTheme', 'light');
    }
    updateThemeButton(isDark);
}

themeButton.addEventListener('click', toggleTheme);
initializeTheme();

// Shows any saved items as soon as the page loads.
displayItems();
