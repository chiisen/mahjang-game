/**
 * ===========================================
 * Mahjong Web Edition - Initialization & Error Handling
 * ===========================================
 */

// 全域錯誤處理
window.onerror = function(msg, url, line, col, error) {
    console.error('[全域錯誤]', {
        message: msg,
        url: url,
        line: line,
        column: col,
        error: error
    });
    alert('發生錯誤！請查看開發者工具主控台了解詳情。\n錯誤: ' + msg);
    return false;
};

// 未捕獲的 Promise 錯誤
window.onunhandledrejection = function(event) {
    console.error('[未處理的 Promise 錯誤]', event.reason);
    alert('發生錯誤！請查看開發者工具主控台了解詳情。');
};

console.log('%c🀄 麻將網頁版 - 開發者模式已啟用', 'font-size: 16px; font-weight: bold; color: #0D7377;');
console.log('%c錯誤會顯示在主控台，請注意 [麻將錯誤] 標籤', 'color: #666;');
