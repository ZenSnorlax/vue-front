# vue-front

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

具体的转换规则

    未支付：
        初始状态，用户创建订单但没有支付。
        可以转为 已支付（用户支付成功），或 已取消（用户取消订单）。
    
    已支付：
        用户完成支付，订单进入支付确认阶段。
        可以转为 已确认（订单被商家或系统确认无误），或 已取消（用户取消订单或支付出现问题）。
    
    已确认：
        系统或商家确认订单有效，可以开始后续处理（如安排电影、发货等）。
        可以转为 已观看（电影观看或服务完成），或 已取消（用户主动取消订单），或 已退款（用户申请退款）。
    
    已观看：
        订单已经完成，用户观看了电影或享受了服务。
        如果发生问题，可能转为 已退款（例如，电影质量问题导致退款）。
    
    已取消：
        订单在任何阶段都可能被取消，通常由用户或商家发起。
        如果订单取消后需要退款，状态会转为 已退款。
    
    已退款：
        用户已收到退款，订单状态最终定格为已退款，交易终止。