# 问数项目

- [前置要求](#前置要求)
- [安装依赖](#安装依赖)
- [运行](#运行)
- [环境变量](#环境变量)
- [打包](#打包)
- [部署](#部署)


## 前置要求
### Node
`node` 18.12.0

``` shell
node -v
```
## PNPM
```shell
npm install -g pnpm
```

## 安装依赖
`pnpm i`


## 运行
```shell
pnpm run dev

运行地址： http://localhost:3002
```

## 环境变量
查看环境变量文件
-  `.env` 任何环境都会加载
-  `.env.development` 开发环境

## 打包

根目录下运行以下命令，根据项目需要调整环境变量文件更改打包命令

```shell
正式环境： npm run build
```

## 部署

