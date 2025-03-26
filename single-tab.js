//yes it's defer i know
document.addEventListener('DOMContentLoaded', () => {
    const TAB_KEY = 'single_tab_allowed';
    const tabId = Date.now().toString();
    if (localStorage.getItem(TAB_KEY)) {
        alert("Only one tab is allowed.");
        window.close();
        window.location.href = "about:blank";
    } else {
        localStorage.setItem(TAB_KEY, tabId);
    }
    window.addEventListener('storage', (event) => {
        if (event.key === TAB_KEY && event.newValue !== tabId) {
            alert("Another tab was opened.");
            window.close();
            window.location.href = "about:blank";
        }
    });
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem(TAB_KEY);
    });
});