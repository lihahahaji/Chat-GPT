const { app, BrowserWindow, globalShortcut } = require("electron");
// app，它着您应用程序的事件生命周期。
// BrowserWindow，它负责创建和管理应用窗口。

// createWindow 函数用于创建一个应用窗口
const createWindow = () => {
	const win = new BrowserWindow({
		// 设置宽高
		width: 800,
		height: 600,
		titleBarStyle: "customButtonsOnHover",
        // 失去焦点的时候隐藏窗口
        // hiddenInMissionControl:true,
        vibrancy:"sheet",
	});

	win.once("ready-to-show", () => {
		win.show();
	});

	// // 在关闭窗口时，将窗口隐藏而不是关闭
	// win.on("close", (e) => {
	// 	e.preventDefault();
	// 	win.hide();
	// });

	// 当点击程序坞中的应用图标时，显示窗口
	app.on("activate", () => {
		if (win.isVisible() === false) {
			win.show();
		}
	});

	// 注册隐藏窗口的快捷键为Cmd+W
	const hideWindowShortcut = globalShortcut.register(
		"CommandOrControl+W",
		() => {
			win.hide();
		}
	);

	app.on("will-quit", () => {
		// 解除Cmd+W快捷键的注册
		globalShortcut.unregister("CommandOrControl+W");
	});

	app.on("window-all-closed", () => {
		app.quit(); // 退出应用
	});

	// 加载静态页面
	//   win.loadFile('index.html')
	// 加载网址
	win.loadURL("https://chat.openai.com");
};

// 在应用准备就绪时调用函数 创建窗口
app.whenReady().then(() => {
	createWindow();
});
