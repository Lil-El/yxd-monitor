# YXD-Monitor

## Target

- JS Error
- Source Error
- Interface Error(Ajax)
- White Page

## Experience

- Load Time
- TTFB(time to first byte)
- FCP(first content paint)
- FP(first paint)
- FMP(first meaningful paint)
- FID(first input delay)
- 卡顿

## Service

- PV：页面点击量或浏览量
- UV：访问站点的不同 IP 的人数
- wait time：用户停留的时间

## Process

1. 前端埋点
   - 代码埋点：GA 神策等
   - 可视化埋点：利用可视化交互手段配置事件
   - 无埋点：采用 SDK 进行监测，捕获
2. 数据上报
3. 分析计算
4. 可视展示
5. 监控警报

### Deps

```
webpack webpack-cli html-webpack-plugin user-agent webpack-dev-server

```
