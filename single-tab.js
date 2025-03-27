const storageKey = 'one-tab-enforcer';
const tabId = Math.random().toString(36).substring(2, 15);
const checkInterval = 1000; 
const expirationTime = 5000; 
function claimOwnership() {
  localStorage.setItem(storageKey, JSON.stringify({
    id: tabId,
    timestamp: Date.now()
  }));
}
function checkOwnership() {
  const storedData = localStorage.getItem(storageKey);
  if (!storedData) return true;
  try {
    const { id, timestamp } = JSON.parse(storedData);
    const isExpired = Date.now() - timestamp > expirationTime;
    if (id !== tabId && !isExpired) {
      alert('Already open in another tab');
      window.close();
      return false;
    }
    if (isExpired) {
      claimOwnership();
    }
  } catch (e) {
    claimOwnership();
  }
  return true;
}
if (!checkOwnership()) {
    window.location.href = "https://www.youtube.com/embed/hiRacdl02w4?autoplay=1"
}
const intervalId = setInterval(() => {
  claimOwnership();
}, checkInterval);
window.addEventListener('beforeunload', () => {
  localStorage.removeItem(storageKey);
  clearInterval(intervalId);
});
window.addEventListener('load', () => {
  const storedData = localStorage.getItem(storageKey);
  if (storedData) {
    const { timestamp } = JSON.parse(storedData);
    if (Date.now() - timestamp > expirationTime) {
      localStorage.removeItem(storageKey);
    }
  }
});