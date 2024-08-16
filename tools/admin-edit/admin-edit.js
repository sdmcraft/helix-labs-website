const fetchButton = document.getElementById('fetch');
const saveButton = document.getElementById('save');
const adminURL = document.getElementById('admin-url');
const textarea = document.getElementById('textarea');
const method = document.getElementById('method');
const console = document.getElementById('console');

function consoleLog(message) {
    console.value += `${message}\n`;
    console.scrollTop = console.scrollHeight;
}

fetchButton.addEventListener('click', async () => {
    localStorage.setItem('admin-url', adminURL.value);
    const resp = await fetch(adminURL.value);
    const text = await resp.text();
    textarea.value = text;
    consoleLog(`${resp.status} GET ${adminURL.value} ${resp.headers.get('x-error') || ''}`);
});

saveButton.addEventListener('click', async () => {
    localStorage.setItem('admin-url', adminURL.value);
    const resp = await fetch(adminURL.value, {
        method: method.value,
        body: textarea.value,
        headers: {
            'content-type': adminURL.value.endsWith('.yaml') ? 'text/yaml' : 'application/json',
        }
    });
    const text = await resp.text();
    consoleLog(`${resp.status} ${method.value} ${adminURL.value} ${resp.headers.get('x-error') || ''}`);
});

adminURL.value = localStorage.getItem('admin-url')||'https://admin.hlx.page/status/adobe/aem-boilerplate/main/';
