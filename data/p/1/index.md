---
title: 升級 Ubuntu 從 20.04 至 22.04 (Jammy Jellyfish)
description: 升級 Ubuntu 從 20.04 至 22.04 (Jammy Jellyfish)
summary: 記錄一下過程，家裡還有很多台 Ubuntu 需要升級一下
published: 2022-05-31
cover: ./cover.webp
tags:
  - 開發環境
  - OS
  - lang: 中文
  - os: [Ubuntu, Windows]
  - year: 2022
---

## 開頭

這篇文章主要是紀錄一下從 Ubuntu 20.04 升級到 22.04 (Jammy Jellyfish) 的過程。

家裡還有很多台需要升級一下。

> ! 升級前記得要備份重要文件。

```js
/// showLineNumber
/// diff
/// hlLines: 1-4,6
function fancyAlert(arg) {
  if (arg) {
    $.facebox({ div: '#foo' });
  }
}

+console.log('added');
-console.log('removed');
```

## 環境

本文所使用的系統環境。

```shell
> lsb_release -a

No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 20.04.4 LTS
Release:        20.04
Codename:       focal
```

## 確認空間

最好確認一下有足夠空間可供升級使用，最好能有 25GB 以上。

```shell
df -H
```

## 開始更新

先把套件都更新與升級。

```shell
sudo apt update -y && sudo apt upgrade -y
```

```shell
sudo apt dist-upgrade
```

清除已經不需要的套件安裝檔案

```shell
sudo apt autoremove
```

確保有安裝 `updrate-manager-core` 套件

```shell
sudo apt install update-manager-core
```

重開機

```shell
sudo reboot
```

確認一下是否有升級。目前暫時還沒有 22.04 LTS。

```shell
> sudo do-release-upgrade --check-dist-upgrade-only

Checking for a new Ubuntu release
There is no development version of an LTS available.
To upgrade to the latest non-LTS development release
set Prompt=normal in /etc/update-manager/release-upgrades.
```

使用 `-d` 參數，繼續升級至最新開發版，即使 LTS 版本還沒出來。

```shell
sudo do-release-upgrade -d --allow-third-party
```

若是有提示會為 SSH 新開一個 Port 於 '1022'， 以免升級中途出了甚麼意外比較難處理。

輸入 y 繼續。然後按下 [Enter] 繼續。

詢問是否開始升級，輸入 y 確認升級。

<!--
![fig01.avif](./fig01.avif)
-->

選擇 [Yes] 不用再先詢問，全部都可以直接重啟服務，繼續。

<!--
![fig02.avif](./fig02.avif)
-->

接下來，升級會需要一段時間...

中間若有詢問其他問題，依個人需要決定 yes | no 。

最後會詢問是否重開機，選擇 'y' 重開機。

<!--
![fig03.avif](./fig03.avif)
-->

## 檢查升級

確認一下版本已經是 `22.04`。

```shell
> lsb_release -a

No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 22.04 LTS
Release:        22.04
Codename:       jammy
```

確認一下套件更新

```shell
sudo apt update -y && sudo apt upgrade -y
```

## 清除垃圾

```shell
sudo apt --purge autoremove
```

```shell
sudo apt autoclean
```

## 最後

這樣就完成升級了。

## 完結
