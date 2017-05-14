# 截图
![首页](http://ww1.sinaimg.cn/large/0060lm7Tgw1f3oc3xe42aj30m80qkaiy.jpg)
![播放列表](http://ww4.sinaimg.cn/large/0060lm7Tgw1f3oc3ytl2mj30qa0y0wq6.jpg)
# 说明
* 采用React作为View层，运用Electron加载实现的桌面应用，ES6/7语法，Webpack打包
* 实现功能：播放，暂停，切歌，单曲循环，随机播放，播放列表，网络搜索
* 曲库来源于SoundCloud API
* 搜索时提供自动补全与搜索建议，解决了精确搜索反而容易找不到想要的歌曲的麻烦
* 初期考虑到所需的应用逻辑与数据不是很多，选择将其作为根组件的state和方法存放，不过现在看来如果能使用Flux会更易于管理 
* 子组件的唯一数据来源是上层传递来的props，确保数据单向流动，解决了数据管理的问题
* 注重组件复用，例如考虑到搜索列表和播放列表的相似性，设计一个专门的列表组件实现具体功能，上层只负责调用和传递props，同时也方便了样式的编写 
