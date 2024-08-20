const { app, BrowserWindow } = require('electron');  
const path = require('path'); 
  
// 定义创建窗口的函数  
function createWindow() {  
  // 创建浏览器窗口  
  const win = new BrowserWindow({  
    width: 800,  
    height: 600,  
    webPreferences: {  
      preload: path.join(__dirname, 'preload.js')
      //nodeIntegration: true, // 注意：出于安全考虑，建议仅在需要时启用Node集成  
      //contextIsolation: false // 如果启用了nodeIntegration，则建议禁用contextIsolation  
      // 或者使用preload脚本来安全地暴露Node.js功能给渲染器进程  
    }  
  });  
  
  // 并为你的应用加载index.html  
  win.loadFile('index.html');  
  
  // 打开开发者工具（可选）  
  // win.webContents.openDevTools();  
}  
  
// 当 Electron 完成初始化并准备创建浏览器窗口时  
app.whenReady().then(() => {  
  createWindow();  
  
  // 监听所有窗口关闭事件  
  app.on('window-all-closed', function () {  
    // 对于 macOS，除非用户用 Cmd + Q 确定地退出，  
    // 否则通常用户关闭最后一个窗口时，应用及其菜单栏不会退出。  
    if (process.platform !== 'darwin') app.quit();  
  });  
  
  app.on('activate', function () {  
    // 对于 macOS，当单击 dock 图标并且没有其他窗口打开时，  
    // 通常在应用程序中重新创建一个窗口。  
    if (BrowserWindow.getAllWindows().length === 0) createWindow();  
  });  
});  
  
// 当 Electron 应用程序退出时  
app.on('will-quit', function () {  
  // 在这里可以执行一些清理工作  
});