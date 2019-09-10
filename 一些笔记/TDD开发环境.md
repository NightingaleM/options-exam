# 简单的TDD环境搭建（TS）
其实啥都不装，就用`console.assert()`一样能成。
~~ 但是还不够装`13`。 ~~
你写几个，再看看文档就知道为什么要用了。绝对真香。
主角：`mocha`,`chai`,`sinon`,`sinon-chai`
安装过程：
```
yarn global add ts-node mocha
// 项目内
yarn init -y
yarn add chai mocha --dev
yarn add @types/chai @types/mocha --dev
// 创建 test/index.ts
// mocha -r ts-node/register test/index.ts
yarn add sinon sinon-chai --dev
yarn add @types/sinon @types/sinon-chai --dev

```

