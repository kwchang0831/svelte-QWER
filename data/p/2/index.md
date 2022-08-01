---
title: Ubuntu 安裝 Fish Shell + Oh My Fish + Tide 與各種插件
description: 本篇文章紀錄安裝 Fish Shell 與各種好用插件讓開發環境更高效的流程。 包含安裝 Fish Shell, Oh My Fish, Fisher, Tide, Z, Sponge, autopair.fish, fzf.fish, fzf, fd, Bat, asdf 自動完成。
summary: 簡單好上手的 Shell，自帶自動完成功能，bash 或 zsh 用膩了可以來試試看
published: 2022-05-20
cover: ./cover.webp
coverCaption: 'credits: @test'
tags:
  - [開發環境, Fish]
  - os: [Linux]
---

<!-- <script lang="ts">
  import Webm from '$lib/components/extra/webm.svelte'
  import Img from '$lib/components/extra/zoom.svelte'
  import Infobox from '$lib/components/extra/infobox.svelte'
</script> -->

## 開頭

[Slant](https://www.slant.co/topics/513/~best-unix-shells) 2022 年票選第一推薦的 Unix Shell 是 Fish Shell。 如果你剛好 Zsh 也用膩了，不如一起來嘗試看看 Fish Shell。

本篇文章會安裝以下：

- [Fish Shell](https://fishshell.com/)
- [Oh My Fish](https://github.com/oh-my-fish/oh-my-fish)
- [Fisher](https://github.com/jorgebucaran/fisher)
- [Tide](https://github.com/IlanCosman/tide)
- [Z](https://github.com/jethrokuan/z)
- [Sponge](https://github.com/andreiborisov/sponge)
- [autopair.fish](https://github.com/jorgebucaran/autopair.fish)
- [fzf.fish](https://github.com/PatrickF1/fzf.fish)
  - [fzf](https://github.com/junegunn/fzf)
  - [fd](https://github.com/sharkdp/fd)
  - [Bat](https://github.com/sharkdp/bat)
- asdf 自動完成

安裝完，你會得到一個簡單好上手的指令介面。

![fig01](fig01.avif)

## 環境配置

我的使用環境為 Windows 10 的 Windows Terminal + pwsh 連進 Ubuntu 22.04 LTS 使用。

![fig02](fig02.avif)

## 安裝 必要套件

shell 輸入

```shell
sudo apt install wget git curl vim -y
```

## 安裝 Patched 字型

我們必須先安裝 Patched 過的字型，之後才能正確地顯示字型與圖示。

下載並安裝以下四個字型：

- [MesloLGS NF Regular.ttf](https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Regular.ttf)
- [MesloLGS NF Bold.ttf](https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Bold.ttf)
- [MesloLGS NF Italic.ttf](https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Italic.ttf)
- [MesloLGS NF Bold Italic.ttf](https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Bold%20Italic.ttf)

或是 shell 輸入

```shell
wget https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Regular.ttf &&
wget https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Bold.ttf &&
wget https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Italic.ttf &&
wget https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Bold%20Italic.ttf
```

- Windows

下載完成後在檔案點擊右鍵並選擇 **安裝** 或 **為所有使用者安裝**。

- Ubuntu

點擊兩下字型檔案，點擊 Install 。

## 更改字體

- Windows

到 Windows Terminal 的設定 > Ubuntu 設定檔 > 外觀， 更改字體為 **MesloLGS NF**。

- Ubuntu

使用內建的 Terminal，字型安裝完畢之後，就可以直接正常顯示不需用修改任何參數。

## 安裝 Fish shell

新增來源庫 > 更新 > 安裝 Fish shell

shell 輸入

```shell
sudo apt-add-repository ppa:fish-shell/release-3
sudo apt update
sudo apt install fish
```

### 設定預設 Shell

shell 輸入

```shell
chsh -s $(which fish)
```

## 安裝 Oh My Fish

Oh My Fish 是用來擴充 Fish Shell 的

shell 輸入

```shell
curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish
```

## 安裝 Fisher

Fisher 是插件管理員

shell 輸入

```shell
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
```

### 查看已安裝插件

shell 輸入

```shell
fisher list
```

結果

```shell
❯ fisher list
jorgebucaran/fisher
IlanCosman/tide@v5
jethrokuan/z
jorgebucaran/autopair.fish
andreiborisov/sponge
PatrickF1/fzf.fish
```

## 安裝 Tide 主題

還記得 Zsh 的 [PowerLevel10k](https://github.com/romkatv/powerlevel10k) 嗎? Tide 基本上就很像 PowerLevel10k。

<!-- https://github.com/IlanCosman/tide/raw/assets/animations/configuration_wizard.gif -->
<!-- <Webm webm="fish/w1.webm" title="Tide #Configuration Wizard"  w="1142" h="742"/> -->

安裝，shell 輸入

```shell
fisher install IlanCosman/tide@v5
```

### 設定 Tide 主題

shell 輸入

```shell
tide configure
```

## 安裝插件 Z

類似於 [autojump](https://github.com/wting/autojump) 的插件，比 `cd` 更快速地直接跳到想去的資料夾。

shell 輸入

```shell
fisher install jethrokuan/z
```

## 安裝插件 Sponge

讓指令歷史紀錄更乾淨，不會去紀錄失敗或是打錯的指令到歷史清單中。

shell 輸入

```shell
fisher install andreiborisov/sponge
```

### 清除指令歷史

shell 輸入

```shell
history clear
```

## 安裝插件 autopair

自動幫你補上 `()`， `[]`， `{}`， `""`， 還有 `''`

shell 輸入

```shell
fisher install jorgebucaran/autopair.fish
```

## 安裝插件 fzf.fish

這插件讓你的 Fish 互動性更強大。

找檔案 <kbd>Ctrl + Alt + F</kbd>

<!-- https://github.com/PatrickF1/fzf.fish/raw/assets/directory.gif -->
<!-- <Webm webm="fish/w2.webm" title="fzf.fish #File paths" w="1472" h="779"/> -->

找指令歷史紀錄 <kbd>Ctrl + R</kbd>

<!-- https://github.com/PatrickF1/fzf.fish/raw/assets/command_history.gif -->
<!-- <Webm webm="fish/w3.webm" title="fzf.fish #A previously run command" w="1472" h="779"/> -->

找 PID <kbd>Ctrl + Alt + P</kbd>

<!-- https://github.com/PatrickF1/fzf.fish/raw/assets/processes.gif -->
<!-- <Webm webm="fish/w4.webm" title="fzf.fish #Process ids" w="1472" h="779"/> -->

還有很多功能，請參考 [fzf.fish 來源庫](https://github.com/PatrickF1/fzf.fish)。

### 安裝前置套件 fzf

shell 輸入

```shell
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```

### 安裝前置套件 fd

shell 輸入

```shell
sudo apt install fd-find
```

因為已經有其他叫 fd 的套件，為了避免衝突，所以執行檔是叫 fdfind。我們這邊建立個連結在 `/usr/local/bin` 叫做 `fd` 讓我們可以使用 `fd` 這個指令。

shell 輸入

```shell
sudo ln -s $(which fdfind) /usr/local/bin/fd
```

### 安裝前置套件 bat

shell 輸入

```shell
sudo apt install bat
```

因為已經有其他叫 bat 的套件，為了避免衝突，所以執行檔是叫 batcat。我們這邊建立個連結在 `/usr/local/bin` 叫做 `bat` 讓我們可以使用 `bat` 這個指令。

shell 輸入

```shell
sudo ln -s $(which batcat) /usr/local/bin/bat
```

### 安裝 fzf.fish

shell 輸入

```shell
fisher install PatrickF1/fzf.fish
```

## 設定 asdf 自動完成

若已經有安裝使用 asdf 軟體版本管理器，設定自動完成如下

shell 輸入

```shell
vi ~/.config/fish/config.fish
```

在 `~/.config/fish/config.fish` 文件最後添加

```shell title="~/.config/fish/config.fish"
source ~/.asdf/asdf.fish
```

最後，shell 輸入以下指令，連結自動完成的功能

```shell
mkdir -p ~/.config/fish/completions; and ln -s ~/.asdf/completions/asdf.fish ~/.config/fish/completions
```

## 最後

安裝過程我個人覺得應該比 zsh 稍微簡單一些。

不知道各位同學嘗試之後，覺得跟 zsh 比較，哪個用起來比較舒服呢? 留言讓我知道 😀

## 完結
