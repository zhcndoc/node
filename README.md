# Node.js

Node.js 是一个开源、跨平台的 JavaScript 运行时环境。

有关 Node.js 的使用信息，请参阅 [Node.js 网站][]。

Node.js 项目采用[开放治理模式](./GOVERNANCE.md)。[OpenJS Foundation][] 为该项目提供支持。

我们期望贡献者以协作的方式推动项目发展。我们鼓励建设性地交流不同意见并达成妥协。[TSC](./GOVERNANCE.md#technical-steering-committee) 保留限制或阻止那些屡次以打击、耗尽或以其他方式对其他参与者造成负面影响的方式行事的贡献者的权利。

**本项目有一份[行为准则][]。**

## 目录

* [支持](#support)
* [发布类型](#release-types)
  * [下载](#download)
    * [Current 和 LTS 版本](#current-and-lts-releases)
    * [Nightly 版本](#nightly-releases)
    * [API 文档](#api-documentation)
  * [验证二进制文件](#verifying-binaries)
* [构建 Node.js](#building-nodejs)
* [安全](#security)
* [为 Node.js 做贡献](#contributing-to-nodejs)
* [当前项目团队成员](#current-project-team-members)
  * [TSC（技术指导委员会）](#tsc-technical-steering-committee)
  * [协作者](#collaborators)
  * [分类人员](#triagers)
  * [发布密钥](#release-keys)
* [许可证](#license)

## 支持

需要帮助？请查看[获取支持的说明](.github/SUPPORT.md)。

## 发布类型

* **Current**：正在积极开发。Current 版本的代码位于对应主版本号的分支中（例如，[v22.x](https://github.com/nodejs/node/tree/v22.x)）。Node.js 每 6 个月发布一个新的主版本，允许引入破坏性变更。发布时间为每年的 4 月和 10 月。每年 10 月发布的版本支持期限为 8 个月。每年 4 月发布的版本会在当年 10 月转为 LTS（见下文）。
* **LTS**：获得长期支持的版本，重点关注稳定性和安全性。每个偶数主版本都会成为 LTS 版本。LTS 版本会获得 12 个月的 _Active LTS_ 支持，随后还有 18 个月的 _Maintenance_ 支持。LTS 版本系列的代号按字母顺序排列，从 v4 Argon 开始。除某些特殊情况外，不会有破坏性变更或新增功能。
* **Nightly**：当有变更时，每 24 小时基于 Current 分支构建的代码。请谨慎使用。

Current 和 LTS 版本遵循[语义化版本规范](https://semver.org)。发布团队的一名成员会对每个 Current 和 LTS 版本进行[签名](#release-keys)。有关更多信息，请参阅[发布 README](https://github.com/nodejs/Release#readme)。

### 下载

可在 <https://nodejs.org/en/download/> 获取二进制文件、安装程序和源代码 tarball。

#### Current 和 LTS 版本

<https://nodejs.org/download/release/>

[latest](https://nodejs.org/download/release/latest/) 目录是指向最新 Current 版本的别名。latest-_codename_ 目录是指向 LTS 系列最新版本的别名。例如，[latest-hydrogen](https://nodejs.org/download/release/latest-hydrogen/) 目录包含最新的 Hydrogen（Node.js 18）版本。

#### Nightly 版本

<https://nodejs.org/download/nightly/>

每个目录和文件名都包含版本号（例如，`v22.0.0`），后接 UTC 日期（例如，2024 年 4 月 24 日对应 `20240424`），以及该版本 HEAD 的短提交 SHA（例如，`ddd0a9e494`）。例如，完整的目录名可能是 `v22.0.0-nightly20240424ddd0a9e494`。

#### API 文档

最新 Current 版本的文档位于 <https://nodejs.org/api/>。特定版本的文档可在每个发布目录的 _docs_ 子目录中找到。特定版本的文档也可在 <https://nodejs.org/download/docs/> 获取。

### 验证二进制文件

下载目录包含一个 `SHASUMS256.txt.asc` 文件，其中包含文件的 SHA 校验和以及发布者的 PGP 签名。

你可以从 nodejs/release-keys 获取受信任的密钥环，例如使用 `curl`：

```bash
curl -fsLo "/path/to/nodejs-keyring.kbx" "https://github.com/nodejs/release-keys/raw/HEAD/gpg/pubring.kbx"
```

或者，你可以将发布者密钥导入默认密钥环。如何执行此操作的命令，请参阅[发布密钥](#release-keys)。

然后，你可以验证已下载到本地的文件（如果使用默认密钥环，请传入 `--keyring="${GNUPGHOME:-~/.gnupg}/pubring.kbx"`）：

```bash
curl -fsO "https://nodejs.org/dist/${VERSION}/SHASUMS256.txt.asc" \
&& gpgv --keyring="/path/to/nodejs-keyring.kbx" --output SHASUMS256.txt < SHASUMS256.txt.asc \
&& shasum --check SHASUMS256.txt --ignore-missing
```

## 构建 Node.js

有关如何从源代码构建 Node.js 的说明以及支持的平台列表，请参阅 [BUILDING.md](BUILDING.md)。

## 安全

有关如何报告 Node.js 安全漏洞的信息，请参阅 [SECURITY.md](./SECURITY.md)。

## 为 Node.js 做贡献

* [为项目做贡献][]
* [工作组][]
* [战略计划][]
* [技术价值观和优先级][]

## 当前项目团队成员

有关 Node.js 项目治理的信息，请参阅 [GOVERNANCE.md](./GOVERNANCE.md)。

<!-- node-core-utils and find-inactive-tsc.mjs depend on the format of the TSC
     list. If the format changes, those utilities need to be tested and
     updated. -->

### TSC（技术指导委员会）

#### TSC 投票成员

<!--lint disable prohibited-strings-->

* [aduh95](https://github.com/aduh95) -
  **Antoine du Hamel** <<duhamelantoine1995@gmail.com>> (he/him)
* [anonrig](https://github.com/anonrig) -
  **Yagiz Nizipli** <<yagiz@nizipli.com>> (he/him)
* [benjamingr](https://github.com/benjamingr) -
  **Benjamin Gruenbaum** <<benjamingr@gmail.com>>
* [BridgeAR](https://github.com/BridgeAR) -
  **Ruben Bridgewater** <<ruben@bridgewater.de>> (he/him)
* [gireeshpunathil](https://github.com/gireeshpunathil) -
  **Gireesh Punathil** <<gpunathi@in.ibm.com>> (he/him)
* [jasnell](https://github.com/jasnell) -
  **James M Snell** <<jasnell@gmail.com>> (he/him)
* [joyeecheung](https://github.com/joyeecheung) -
  **Joyee Cheung** <<joyeec9h3@gmail.com>> (she/her)
* [legendecas](https://github.com/legendecas) -
  **Chengzhong Wu** <<legendecas@gmail.com>> (he/him)
* [marco-ippolito](https://github.com/marco-ippolito) -
  **Marco Ippolito** <<marcoippolito54@gmail.com>> (he/him)
* [mcollina](https://github.com/mcollina) -
  **Matteo Collina** <<matteo.collina@gmail.com>> (he/him)
* [panva](https://github.com/panva) -
  **Filip Skokan** <<panva.ip@gmail.com>> (he/him)
* [RafaelGSS](https://github.com/RafaelGSS) -
  **Rafael Gonzaga** <<rafael.nunu@hotmail.com>> (he/him)
* [RaisinTen](https://github.com/RaisinTen) -
  **Darshan Sen** <<raisinten@gmail.com>> (he/him)
* [richardlau](https://github.com/richardlau) -
  **Richard Lau** <<richard.lau@ibm.com>>
* [ronag](https://github.com/ronag) -
  **Robert Nagy** <<ronagy@icloud.com>>
* [ruyadorno](https://github.com/ruyadorno) -
  **Ruy Adorno** <<ruy@vlt.sh>> (he/him)
* [ShogunPanda](https://github.com/ShogunPanda) -
  **Paolo Insogna** <<paolo@cowtech.it>> (he/him)
* [tniessen](https://github.com/tniessen) -
  **Tobias Nießen** <<tniessen@tnie.de>> (he/him)

#### TSC 常规成员

* [BethGriggs](https://github.com/BethGriggs) -
  **Beth Griggs** <<bethanyngriggs@gmail.com>> (she/her)
* [bnoordhuis](https://github.com/bnoordhuis) -
  **Ben Noordhuis** <<info@bnoordhuis.nl>>
* [cjihrig](https://github.com/cjihrig) -
  **Colin Ihrig** <<cjihrig@gmail.com>> (he/him)
* [codebytere](https://github.com/codebytere) -
  **Shelley Vohr** <<shelley.vohr@gmail.com>> (she/her)
* [GeoffreyBooth](https://github.com/GeoffreyBooth) -
  **Geoffrey Booth** <<webadmin@geoffreybooth.com>> (he/him)
* [MoLow](https://github.com/MoLow) -
  **Moshe Atlow** <<moshe@atlow.co.il>> (he/him)
* [Trott](https://github.com/Trott) -
  **Rich Trott** <<rtrott@gmail.com>> (he/him)

<details>

<summary>TSC 荣誉成员</summary>

#### TSC 荣誉成员

* [addaleax](https://github.com/addaleax) -
  **Anna Henningsen** <<anna@addaleax.net>> (she/her)
* [apapirovski](https://github.com/apapirovski) -
  **Anatoli Papirovski** <<apapirovski@mac.com>> (he/him)
* [ChALkeR](https://github.com/ChALkeR) -
  **Сковорода Никита Андреевич** <<chalkerx@gmail.com>> (he/him)
* [chrisdickinson](https://github.com/chrisdickinson) -
  **Chris Dickinson** <<christopher.s.dickinson@gmail.com>>
* [danbev](https://github.com/danbev) -
  **Daniel Bevenius** <<daniel.bevenius@gmail.com>> (he/him)
* [danielleadams](https://github.com/danielleadams) -
  **Danielle Adams** <<adamzdanielle@gmail.com>> (she/her)
* [evanlucas](https://github.com/evanlucas) -
  **Evan Lucas** <<evanlucas@me.com>> (he/him)
* [fhinkel](https://github.com/fhinkel) -
  **Franziska Hinkelmann** <<franziska.hinkelmann@gmail.com>> (she/her)
* [Fishrock123](https://github.com/Fishrock123) -
  **Jeremiah Senkpiel** <<fishrock123@rocketmail.com>> (he/they)
* [gabrielschulhof](https://github.com/gabrielschulhof) -
  **Gabriel Schulhof** <<gabrielschulhof@gmail.com>>
* [gibfahn](https://github.com/gibfahn) -
  **Gibson Fahnestock** <<gibfahn@gmail.com>> (he/him)
* [indutny](https://github.com/indutny) -
  **Fedor Indutny** <<fedor@indutny.com>>
* [isaacs](https://github.com/isaacs) -
  **Isaac Z. Schlueter** <<i@izs.me>>
* [joshgav](https://github.com/joshgav) -
  **Josh Gavant** <<josh.gavant@outlook.com>>
* [mhdawson](https://github.com/mhdawson) -
  **Michael Dawson** <<midawson@redhat.com>> (he/him)
* [mmarchini](https://github.com/mmarchini) -
  **Mary Marchini** <<oss@mmarchini.me>> (she/her)
* [mscdex](https://github.com/mscdex) -
  **Brian White** <<mscdex@mscdex.net>>
* [MylesBorins](https://github.com/MylesBorins) -
  **Myles Borins** <<myles.borins@gmail.com>> (he/him)
* [nebrius](https://github.com/nebrius) -
  **Bryan Hughes** <<bryan@nebri.us>>
* [ofrobots](https://github.com/ofrobots) -
  **Ali Ijaz Sheikh** <<ofrobots@google.com>> (he/him)
* [orangemocha](https://github.com/orangemocha) -
  **Alexis Campailla** <<orangemocha@nodejs.org>>
* [piscisaureus](https://github.com/piscisaureus) -
  **Bert Belder** <<bertbelder@gmail.com>>
* [rvagg](https://github.com/rvagg) -
  **Rod Vagg** <<r@va.gg>>
* [sam-github](https://github.com/sam-github) -
  **Sam Roberts** <<vieuxtech@gmail.com>>
* [shigeki](https://github.com/shigeki) -
  **Shigeki Ohtsu** <<ohtsu@ohtsu.org>> (he/him)
* [targos](https://github.com/targos) -
  **Michaël Zasso** <<targos@protonmail.com>> (he/him)
* [thefourtheye](https://github.com/thefourtheye) -
  **Sakthipriyan Vairamani** <<thechargingvolcano@gmail.com>> (he/him)
* [TimothyGu](https://github.com/TimothyGu) -
  **Tiancheng "Timothy" Gu** <<timothygu99@gmail.com>> (he/him)
* [trevnorris](https://github.com/trevnorris) -
  **Trevor Norris** <<trev.norris@gmail.com>>

</details>

<!-- node-core-utils and find-inactive-collaborators.mjs depend on the format
     of the collaborator list. If the format changes, those utilities need to be
     tested and updated. -->

### 协作者

* [abmusse](https://github.com/abmusse) -
  **Abdirahim Musse** <<abdirahim.musse@ibm.com>>
* [addaleax](https://github.com/addaleax) -
  **Anna Henningsen** <<anna@addaleax.net>> (她/她)
* [Aditi-1400](https://github.com/Aditi-1400) -
  **Aditi Singh** <<aditisingh1400@gmail.com>> (她/她)
* [aduh95](https://github.com/aduh95) -
  **Antoine du Hamel** <<duhamelantoine1995@gmail.com>> (他/他) - [支持我](https://github.com/sponsors/aduh95)
* [anonrig](https://github.com/anonrig) -
  **Yagiz Nizipli** <<yagiz@nizipli.com>> (他/他) - [支持我](https://github.com/sponsors/anonrig)
* [araujogui](https://github.com/araujogui) -
  **Guilherme Araújo** <<arauujogui@gmail.com>> (他/他)
* [atlowChemi](https://github.com/atlowChemi) -
  **Chemi Atlow** <<chemi@atlow.co.il>> (他/他)
* [avivkeller](https://github.com/avivkeller) -
  **Aviv Keller** <<me@aviv.sh>> (他/他) - [支持我](https://github.com/sponsors/avivkeller)
* [Ayase-252](https://github.com/Ayase-252) -
  **Qingyu Deng** <<i@ayase-lab.com>>
* [bengl](https://github.com/bengl) -
  **Bryan English** <<bryan@bryanenglish.com>> (他/他)
* [benjamingr](https://github.com/benjamingr) -
  **Benjamin Gruenbaum** <<benjamingr@gmail.com>>
* [BethGriggs](https://github.com/BethGriggs) -
  **Beth Griggs** <<bethanyngriggs@gmail.com>> (她/她)
* [bnb](https://github.com/bnb) -
  **Tierney Cyren** <<hello@bnb.im>> (他们/他们)
* [bnoordhuis](https://github.com/bnoordhuis) -
  **Ben Noordhuis** <<info@bnoordhuis.nl>>
* [BridgeAR](https://github.com/BridgeAR) -
  **Ruben Bridgewater** <<ruben@bridgewater.de>> (他/他)
* [cclauss](https://github.com/cclauss) -
  **Christian Clauss** <<cclauss@me.com>> (他/他)
* [ChALkeR](https://github.com/ChALkeR) -
  **Сковорода Никита Андреевич** <<chalkerx@gmail.com>> (他/他)
* [cjihrig](https://github.com/cjihrig) -
  **Colin Ihrig** <<cjihrig@gmail.com>> (他/他)
* [codebytere](https://github.com/codebytere) -
  **Shelley Vohr** <<shelley.vohr@gmail.com>> (她/她)
* [cola119](https://github.com/cola119) -
  **Kohei Ueno** <<kohei.ueno119@gmail.com>> (他/他)
* [daeyeon](https://github.com/daeyeon) -
  **Daeyeon Jeong** <<daeyeon.dev@gmail.com>> (他/他)
* [dario-piotrowicz](https://github.com/dario-piotrowicz) -
  **Dario Piotrowicz** <<dario.piotrowicz@gmail.com>> (他/他)
* [deokjinkim](https://github.com/deokjinkim) -
  **Deokjin Kim** <<deokjin81.kim@gmail.com>> (他/他)
* [ErickWendel](https://github.com/ErickWendel) -
  **Erick Wendel** <<erick.workspace@gmail.com>> (他/他)
* [Ethan-Arrowood](https://github.com/Ethan-Arrowood) -
  **Ethan Arrowood** <<ethan@arrowood.dev>> (他/他)
* [Flarna](https://github.com/Flarna) -
  **Gerhard Stöbich** <<deb2001-github@yahoo.de>> (他/他们)
* [gabrielschulhof](https://github.com/gabrielschulhof) -
  **Gabriel Schulhof** <<gabrielschulhof@gmail.com>>
* [geeksilva97](https://github.com/geeksilva97) -
  **Edy Silva** <<edigleyssonsilva@gmail.com>> (他/他)
* [gengjiawen](https://github.com/gengjiawen) -
  **Jiawen Geng** <<technicalcute@gmail.com>>
* [GeoffreyBooth](https://github.com/GeoffreyBooth) -
  **Geoffrey Booth** <<webadmin@geoffreybooth.com>> (他/他)
* [gireeshpunathil](https://github.com/gireeshpunathil) -
  **Gireesh Punathil** <<gpunathi@in.ibm.com>> (他/他)
* [gurgunday](https://github.com/gurgunday) -
  **Gürgün Dayıoğlu** <<hey@gurgun.day>> (他/他)
* [guybedford](https://github.com/guybedford) -
  **Guy Bedford** <<guybedford@gmail.com>> (他/他)
* [H4ad](https://github.com/H4ad) -
  **Vinícius Lourenço Claro Cardoso** <<contact@viniciusl.com.br>> (他/他)
* [HarshithaKP](https://github.com/HarshithaKP) -
  **Harshitha K P** <<harshitha014@gmail.com>> (她/她)
* [himself65](https://github.com/himself65) -
  **Zeyu "Alex" Yang** <<himself65@outlook.com>> (他/他)
* [hybrist](https://github.com/hybrist) -
  **Jan Martin** <<jan.krems@gmail.com>> (他/他)
* [IlyasShabi](https://github.com/IlyasShabi) -
  **Ilyas Shabi** <<ilyasshabi94@gmail.com>> (他/他)
* [islandryu](https://github.com/islandryu) -
  **Ryuhei Shima** <<shimaryuhei@gmail.com>> (他/他)
* [jakecastelli](https://github.com/jakecastelli) -
  **Jake Yuesong Li** <<jake.yuesong@gmail.com>> (他/他)
* [JakobJingleheimer](https://github.com/JakobJingleheimer) -
  **Jacob Smith** <<jacob@frende.me>> (他/他)
* [jasnell](https://github.com/jasnell) -
  **James M Snell** <<jasnell@gmail.com>> (他/他)
* [jazelly](https://github.com/jazelly) -
  **Jason Zhang** <<xzha4350@gmail.com>> (他/他)
* [joyeecheung](https://github.com/joyeecheung) -
  **Joyee Cheung** <<joyeec9h3@gmail.com>> (她/她)
* [juanarbol](https://github.com/juanarbol) -
  **Juan José Arboleda** <<soyjuanarbol@gmail.com>> (他/他)
* [JungMinu](https://github.com/JungMinu) -
  **Minwoo Jung** <<nodecorelab@gmail.com>> (他/他)
* [KhafraDev](https://github.com/KhafraDev) -
  **Matthew Aitken** <<maitken033380023@gmail.com>> (他/他)
* [legendecas](https://github.com/legendecas) -
  **Chengzhong Wu** <<legendecas@gmail.com>> (他/他)
* [lemire](https://github.com/lemire) -
  **Daniel Lemire** <<daniel@lemire.me>>
* [LiviaMedeiros](https://github.com/LiviaMedeiros) -
  **LiviaMedeiros** <<livia@cirno.name>>
* [ljharb](https://github.com/ljharb) -
  **Jordan Harband** <<ljharb@gmail.com>>
* [lpinca](https://github.com/lpinca) -
  **Luigi Pinca** <<luigipinca@gmail.com>> (他/他)
* [Lxxyx](https://github.com/Lxxyx) -
  **Zijian Liu** <<lxxyxzj@gmail.com>> (他/他)
* [marco-ippolito](https://github.com/marco-ippolito) -
  **Marco Ippolito** <<marcoippolito54@gmail.com>> (他/他) - [支持我](https://github.com/sponsors/marco-ippolito)
* [marsonya](https://github.com/marsonya) -
  **Akhil Marsonya** <<akhil.marsonya27@gmail.com>> (他/他)
* [MattiasBuelens](https://github.com/MattiasBuelens) -
  **Mattias Buelens** <<mattias@buelens.com>> (他/他)
* [mcollina](https://github.com/mcollina) -
  **Matteo Collina** <<matteo.collina@gmail.com>> (他/他) - [支持我](https://github.com/sponsors/mcollina)
* [meixg](https://github.com/meixg) -
  **Xuguang Mei** <<meixuguang@gmail.com>> (他/他)
* [MikeMcC399](https://github.com/MikeMcC399) -
  **Mike McCready** <<66998419+MikeMcC399@users.noreply.github.com>> (他/他)
* [MoLow](https://github.com/MoLow) -
  **Moshe Atlow** <<moshe@atlow.co.il>> (他/他)
* [MrJithil](https://github.com/MrJithil) -
  **Jithil P Ponnan** <<jithil@outlook.com>> (他/他)
* [ovflowd](https://github.com/ovflowd) -
  **Claudio Wunder** <<cwunder@gnome.org>> (他/他们)
* [panva](https://github.com/panva) -
  **Filip Skokan** <<panva.ip@gmail.com>> (他/他) - [支持我](https://github.com/sponsors/panva)
* [pimterry](https://github.com/pimterry) -
  **Tim Perry** <<pimterry@gmail.com>> (他/他)
* [pmarchini](https://github.com/pmarchini) -
  **Pietro Marchini** <<pietro.marchini94@gmail.com>> (他/他)
* [Qard](https://github.com/Qard) -
  **Stephen Belanger** <<admin@stephenbelanger.com>> (他/他)
* [RafaelGSS](https://github.com/RafaelGSS) -
  **Rafael Gonzaga** <<rafael.nunu@hotmail.com>> (他/他) - [支持我](https://github.com/sponsors/RafaelGSS)
* [RaisinTen](https://github.com/RaisinTen) -
  **Darshan Sen** <<raisinten@gmail.com>> (他/他) - [支持我](https://github.com/sponsors/RaisinTen)
* [Renegade334](https://github.com/Renegade334) -
  **René** <<contact.9a5d6388@renegade334.me.uk>>
* [richardlau](https://github.com/richardlau) -
  **Richard Lau** <<richard.lau@ibm.com>>
* [rluvaton](https://github.com/rluvaton) -
  **Raz Luvaton** <<rluvaton@gmail.com>> (他/他)
* [ronag](https://github.com/ronag) -
  **Robert Nagy** <<ronagy@icloud.com>>
* [ruyadorno](https://github.com/ruyadorno) -
  **Ruy Adorno** <<ruy@vlt.sh>> (他/他)
* [santigimeno](https://github.com/santigimeno) -
  **Santiago Gimeno** <<santiago.gimeno@gmail.com>>
* [ShogunPanda](https://github.com/ShogunPanda) -
  **Paolo Insogna** <<paolo@cowtech.it>> (他/他)
* [srl295](https://github.com/srl295) -
  **Steven R Loomis** <<srl295@gmail.com>>
* [StefanStojanovic](https://github.com/StefanStojanovic) -
  **Stefan Stojanovic** <<stefan.stojanovic@janeasystems.com>> (他/他)
* [sxa](https://github.com/sxa) -
  **Stewart X Addison** <<sxa@redhat.com>> (他/他)
* [theanarkh](https://github.com/theanarkh) -
  **theanarkh** <<theratliter@gmail.com>> (他/他)
* [tniessen](https://github.com/tniessen) -
  **Tobias Nießen** <<tniessen@tnie.de>> (他/他)
* [trivikr](https://github.com/trivikr) -
  **Trivikram Kamat** <<trivikr.dev@gmail.com>>
* [Trott](https://github.com/Trott) -
  **Rich Trott** <<rtrott@gmail.com>> (他/他)
* [UlisesGascon](https://github.com/UlisesGascon) -
  **Ulises Gascón** <<ulisesgascongonzalez@gmail.com>> (他/他)
* [vmoroz](https://github.com/vmoroz) -
  **Vladimir Morozov** <<vmorozov@microsoft.com>> (他/他)
* [watilde](https://github.com/watilde) -
  **Daijiro Wachi** <<daijiro.wachi@gmail.com>> (他/他)
* [XadillaX](https://github.com/XadillaX) -
  **Khaidi Chu** <<i@2333.moe>> (他/他)
* [ZYSzys](https://github.com/ZYSzys) -
  **Yongsheng Zhang** <<zyszys98@gmail.com>> (他/他)

<details>

<summary>荣誉退休协作者</summary>

<!-- find-inactive-collaborators.mjs depends on the format of the emeriti list.
     If the format changes, those utilities need to be tested and updated. -->

### 荣誉退休协作者

* [ak239](https://github.com/ak239) -
  **Aleksei Koziatinskii** <<ak239spb@gmail.com>>
* [andrasq](https://github.com/andrasq) -
  **Andras** <<andras@kinvey.com>>
* [AndreasMadsen](https://github.com/AndreasMadsen) -
  **Andreas Madsen** <<amwebdk@gmail.com>> (he/him)
* [AnnaMag](https://github.com/AnnaMag) -
  **Anna M. Kedzierska** <<anna.m.kedzierska@gmail.com>>
* [antsmartian](https://github.com/antsmartian) -
  **Anto Aravinth** <<anto.aravinth.cse@gmail.com>> (he/him)
* [apapirovski](https://github.com/apapirovski) -
  **Anatoli Papirovski** <<apapirovski@mac.com>> (he/him)
* [aqrln](https://github.com/aqrln) -
  **Alexey Orlenko** <<eaglexrlnk@gmail.com>> (he/him)
* [AshCripps](https://github.com/AshCripps) -
  **Ash Cripps** <<email@ashleycripps.co.uk>>
* [bcoe](https://github.com/bcoe) -
  **Ben Coe** <<bencoe@gmail.com>> (he/him)
* [bmeck](https://github.com/bmeck) -
  **Bradley Farias** <<bradley.meck@gmail.com>>
* [bmeurer](https://github.com/bmeurer) -
  **Benedikt Meurer** <<benedikt.meurer@gmail.com>>
* [boneskull](https://github.com/boneskull) -
  **Christopher Hiller** <<boneskull@boneskull.com>> (he/him)
* [brendanashworth](https://github.com/brendanashworth) -
  **Brendan Ashworth** <<brendan.ashworth@me.com>>
* [bzoz](https://github.com/bzoz) -
  **Bartosz Sosnowski** <<bartosz@janeasystems.com>>
* [calvinmetcalf](https://github.com/calvinmetcalf) -
  **Calvin Metcalf** <<calvin.metcalf@gmail.com>>
* [chrisdickinson](https://github.com/chrisdickinson) -
  **Chris Dickinson** <<christopher.s.dickinson@gmail.com>>
* [claudiorodriguez](https://github.com/claudiorodriguez) -
  **Claudio Rodriguez** <<cjrodr@yahoo.com>>
* [danbev](https://github.com/danbev) -
  **Daniel Bevenius** <<daniel.bevenius@gmail.com>> (he/him)
* [danielleadams](https://github.com/danielleadams) -
  **Danielle Adams** <<adamzdanielle@gmail.com>> (she/her)
* [DavidCai1111](https://github.com/DavidCai1111) -
  **David Cai** <<davidcai1993@yahoo.com>> (he/him)
* [davisjam](https://github.com/davisjam) -
  **Jamie Davis** <<davisjam@vt.edu>> (he/him)
* [debadree25](https://github.com/debadree25) -
  **Debadree Chatterjee** <<debadree333@gmail.com>> (he/him)
* [devnexen](https://github.com/devnexen) -
  **David Carlier** <<devnexen@gmail.com>>
* [devsnek](https://github.com/devsnek) -
  **Gus Caplan** <<me@gus.host>> (they/them)
* [digitalinfinity](https://github.com/digitalinfinity) -
  **Hitesh Kanwathirtha** <<digitalinfinity@gmail.com>> (he/him)
* [dmabupt](https://github.com/dmabupt) -
  **Xu Meng** <<dmabupt@gmail.com>> (he/him)
* [dnlup](https://github.com/dnlup) -
  **dnlup** <<dnlup.dev@gmail.com>>
* [edsadr](https://github.com/edsadr) -
  **Adrian Estrada** <<edsadr@gmail.com>> (he/him)
* [eljefedelrodeodeljefe](https://github.com/eljefedelrodeodeljefe) -
  **Robert Jefe Lindstaedt** <<robert.lindstaedt@gmail.com>>
* [estliberitas](https://github.com/estliberitas) -
  **Alexander Makarenko** <<estliberitas@gmail.com>>
* [eugeneo](https://github.com/eugeneo) -
  **Eugene Ostroukhov** <<eostroukhov@google.com>>
* [evanlucas](https://github.com/evanlucas) -
  **Evan Lucas** <<evanlucas@me.com>> (he/him)
* [F3n67u](https://github.com/F3n67u) -
  **Feng Yu** <<F3n67u@outlook.com>> (he/him)
* [fhinkel](https://github.com/fhinkel) -
  **Franziska Hinkelmann** <<franziska.hinkelmann@gmail.com>> (she/her)
* [firedfox](https://github.com/firedfox) -
  **Daniel Wang** <<wangyang0123@gmail.com>>
* [Fishrock123](https://github.com/Fishrock123) -
  **Jeremiah Senkpiel** <<fishrock123@rocketmail.com>> (he/they)
* [gdams](https://github.com/gdams) -
  **George Adams** <<gadams@microsoft.com>> (he/him)
* [geek](https://github.com/geek) -
  **Wyatt Preul** <<wpreul@gmail.com>>
* [gibfahn](https://github.com/gibfahn) -
  **Gibson Fahnestock** <<gibfahn@gmail.com>> (he/him)
* [glentiki](https://github.com/glentiki) -
  **Glen Keane** <<glenkeane.94@gmail.com>> (he/him)
* [hashseed](https://github.com/hashseed) -
  **Yang Guo** <<yangguo@chromium.org>> (he/him)
* [hiroppy](https://github.com/hiroppy) -
  **Yuta Hiroto** <<hello@hiroppy.me>> (he/him)
* [iansu](https://github.com/iansu) -
  **Ian Sutherland** <<ian@iansutherland.ca>>
* [iarna](https://github.com/iarna) -
  **Rebecca Turner** <<me@re-becca.org>>
* [imran-iq](https://github.com/imran-iq) -
  **Imran Iqbal** <<imran@imraniqbal.org>>
* [imyller](https://github.com/imyller) -
  **Ilkka Myller** <<ilkka.myller@nodefield.com>>
* [indutny](https://github.com/indutny) -
  **Fedor Indutny** <<fedor@indutny.com>>
* [isaacs](https://github.com/isaacs) -
  **Isaac Z. Schlueter** <<i@izs.me>>
* [italoacasas](https://github.com/italoacasas) -
  **Italo A. Casas** <<me@italoacasas.com>> (he/him)
* [JacksonTian](https://github.com/JacksonTian) -
  **Jackson Tian** <<shyvo1987@gmail.com>>
* [jasongin](https://github.com/jasongin) -
  **Jason Ginchereau** <<jasongin@microsoft.com>>
* [jbergstroem](https://github.com/jbergstroem) -
  **Johan Bergström** <<bugs@bergstroem.nu>>
* [jdalton](https://github.com/jdalton) -
  **John-David Dalton** <<john.david.dalton@gmail.com>>
* [jhamhader](https://github.com/jhamhader) -
  **Yuval Brik** <<yuval@brik.org.il>>
* [joaocgreis](https://github.com/joaocgreis) -
  **João Reis** <<reis@janeasystems.com>>
* [joesepi](https://github.com/joesepi) -
  **Joe Sepi** <<sepi@joesepi.com>> (he/him)
* [JonasBa](https://github.com/JonasBa) -
  **Jonas Badalic** <<jonas.badalic@gmail.com>> (he/him)
* [joshgav](https://github.com/joshgav) -
  **Josh Gavant** <<josh.gavant@outlook.com>>
* [julianduque](https://github.com/julianduque) -
  **Julian Duque** <<julianduquej@gmail.com>> (he/him)
* [kfarnung](https://github.com/kfarnung) -
  **Kyle Farnung** <<kfarnung@microsoft.com>> (he/him)
* [kunalspathak](https://github.com/kunalspathak) -
  **Kunal Pathak** <<kunal.pathak@microsoft.com>>
* [kuriyosh](https://github.com/kuriyosh) -
  **Yoshiki Kurihara** <<yosyos0306@gmail.com>> (he/him)
* [kvakil](https://github.com/kvakil) -
  **Keyhan Vakil** <<kvakil@sylph.kvakil.me>>
* [lance](https://github.com/lance) -
  **Lance Ball** <<lball@redhat.com>> (he/him)
* [Leko](https://github.com/Leko) -
  **Shingo Inoue** <<leko.noor@gmail.com>> (he/him)
* [Linkgoron](https://github.com/Linkgoron) -
  **Nitzan Uziely** <<linkgoron@gmail.com>>
* [lucamaraschi](https://github.com/lucamaraschi) -
  **Luca Maraschi** <<luca.maraschi@gmail.com>> (he/him)
* [lukekarrys](https://github.com/lukekarrys) -
  **Luke Karrys** <<luke@lukekarrys.com>> (he/him)
* [lundibundi](https://github.com/lundibundi) -
  **Denys Otrishko** <<shishugi@gmail.com>> (he/him)
* [lxe](https://github.com/lxe) -
  **Aleksey Smolenchuk** <<lxe@lxe.co>>
* [maclover7](https://github.com/maclover7) -
  **Jon Moss** <<me@jonathanmoss.me>> (he/him)
* [mafintosh](https://github.com/mafintosh) -
  **Mathias Buus** <<mathiasbuus@gmail.com>> (he/him)
* [matthewloring](https://github.com/matthewloring) -
  **Matthew Loring** <<mattloring@google.com>>
* [Mesteery](https://github.com/Mesteery) -
  **Mestery** <<mestery@protonmail.com>> (he/him)
* [mhdawson](https://github.com/mhdawson) -
  **Michael Dawson** <<midawson@redhat.com>> (he/him)
* [micnic](https://github.com/micnic) -
  **Nicu Micleușanu** <<micnic90@gmail.com>> (he/him)
* [mikeal](https://github.com/mikeal) -
  **Mikeal Rogers** <<mikeal.rogers@gmail.com>>
* [miladfarca](https://github.com/miladfarca) -
  **Milad Fa** <<mfarazma@redhat.com>> (he/him)
* [mildsunrise](https://github.com/mildsunrise) -
  **Alba Mendez** <<me@alba.sh>> (she/her)
* [misterdjules](https://github.com/misterdjules) -
  **Julien Gilli** <<jgilli@netflix.com>>
* [mmarchini](https://github.com/mmarchini) -
  **Mary Marchini** <<oss@mmarchini.me>> (she/her)
* [monsanto](https://github.com/monsanto) -
  **Christopher Monsanto** <<chris@monsan.to>>
* [MoonBall](https://github.com/MoonBall) -
  **Chen Gang** <<gangc.cxy@foxmail.com>>
* [mscdex](https://github.com/mscdex) -
  **Brian White** <<mscdex@mscdex.net>>
* [MylesBorins](https://github.com/MylesBorins) -
  **Myles Borins** <<myles.borins@gmail.com>> (he/him)
* [not-an-aardvark](https://github.com/not-an-aardvark) -
  **Teddy Katz** <<teddy.katz@gmail.com>> (he/him)
* [ofrobots](https://github.com/ofrobots) -
  **Ali Ijaz Sheikh** <<ofrobots@google.com>> (he/him)
* [Olegas](https://github.com/Olegas) -
  **Oleg Elifantiev** <<oleg@elifantiev.ru>>
* [orangemocha](https://github.com/orangemocha) -
  **Alexis Campailla** <<orangemocha@nodejs.org>>
* [othiym23](https://github.com/othiym23) -
  **Forrest L Norvell** <<ogd@aoaioxxysz.net>> (they/them/themself)
* [oyyd](https://github.com/oyyd) -
  **Ouyang Yadong** <<oyydoibh@gmail.com>> (he/him)
* [petkaantonov](https://github.com/petkaantonov) -
  **Petka Antonov** <<petka_antonov@hotmail.com>>
* [phillipj](https://github.com/phillipj) -
  **Phillip Johnsen** <<johphi@gmail.com>>
* [piscisaureus](https://github.com/piscisaureus) -
  **Bert Belder** <<bertbelder@gmail.com>>
* [pmq20](https://github.com/pmq20) -
  **Minqi Pan** <<pmq2001@gmail.com>>
* [PoojaDurgad](https://github.com/PoojaDurgad) -
  **Pooja D P** <<Pooja.D.P@ibm.com>> (she/her)
* [princejwesley](https://github.com/princejwesley) -
  **Prince John Wesley** <<princejohnwesley@gmail.com>>
* [psmarshall](https://github.com/psmarshall) -
  **Peter Marshall** <<petermarshall@chromium.org>> (he/him)
* [puskin](https://github.com/puskin) -
  **Giovanni Bucci** <<github@puskin.it>> (he/him)
* [puzpuzpuz](https://github.com/puzpuzpuz) -
  **Andrey Pechkurov** <<apechkurov@gmail.com>> (he/him)
* [refack](https://github.com/refack) -
  **Refael Ackermann (רפאל פלחי)** <<refack@gmail.com>> (he/him/הוא/אתה)
* [rexagod](https://github.com/rexagod) -
  **Pranshu Srivastava** <<rexagod@gmail.com>> (he/him)
* [rickyes](https://github.com/rickyes) -
  **Ricky Zhou** <<0x19951125@gmail.com>> (he/him)
* [rlidwka](https://github.com/rlidwka) -
  **Alex Kocharin** <<alex@kocharin.ru>>
* [rmg](https://github.com/rmg) -
  **Ryan Graham** <<r.m.graham@gmail.com>>
* [robertkowalski](https://github.com/robertkowalski) -
  **Robert Kowalski** <<rok@kowalski.gd>>
* [romankl](https://github.com/romankl) -
  **Roman Klauke** <<romaaan.git@gmail.com>>
* [ronkorving](https://github.com/ronkorving) -
  **Ron Korving** <<ron@ronkorving.nl>>
* [RReverser](https://github.com/RReverser) -
  **Ingvar Stepanyan** <<me@rreverser.com>>
* [rubys](https://github.com/rubys) -
  **Sam Ruby** <<rubys@intertwingly.net>>
* [rvagg](https://github.com/rvagg) -
  **Rod Vagg** <<rod@vagg.org>>
* [ryzokuken](https://github.com/ryzokuken) -
  **Ujjwal Sharma** <<ryzokuken@disroot.org>> (he/him)
* [saghul](https://github.com/saghul) -
  **Saúl Ibarra Corretgé** <<s@saghul.net>>
* [sam-github](https://github.com/sam-github) -
  **Sam Roberts** <<vieuxtech@gmail.com>>
* [sebdeckers](https://github.com/sebdeckers) -
  **Sebastiaan Deckers** <<sebdeckers83@gmail.com>>
* [seishun](https://github.com/seishun) -
  **Nikolai Vavilov** <<vvnicholas@gmail.com>>
* [shigeki](https://github.com/shigeki) -
  **Shigeki Ohtsu** <<ohtsu@ohtsu.org>> (he/him)
* [shisama](https://github.com/shisama) -
  **Masashi Hirano** <<shisama07@gmail.com>> (he/him)
* [silverwind](https://github.com/silverwind) -
  **Roman Reiss** <<me@silverwind.io>>
* [starkwang](https://github.com/starkwang) -
  **Weijia Wang** <<starkwang@126.com>>
* [stefanmb](https://github.com/stefanmb) -
  **Stefan Budeanu** <<stefan@budeanu.com>>
* [targos](https://github.com/targos) -
  **Michaël Zasso** <<targos@protonmail.com>> (he/him)
* [tellnes](https://github.com/tellnes) -
  **Christian Tellnes** <<christian@tellnes.no>>
* [thefourtheye](https://github.com/thefourtheye) -
  **Sakthipriyan Vairamani** <<thechargingvolcano@gmail.com>> (he/him)
* [thlorenz](https://github.com/thlorenz) -
  **Thorsten Lorenz** <<thlorenz@gmx.de>>
* [TimothyGu](https://github.com/TimothyGu) -
  **Tiancheng "Timothy" Gu** <<timothygu99@gmail.com>> (he/him)
* [trevnorris](https://github.com/trevnorris) -
  **Trevor Norris** <<trev.norris@gmail.com>>
* [tunniclm](https://github.com/tunniclm) -
  **Mike Tunnicliffe** <<m.j.tunnicliffe@gmail.com>>
* [vdeturckheim](https://github.com/vdeturckheim) -
  **Vladimir de Turckheim** <<vlad2t@hotmail.com>> (he/him)
* [vkurchatkin](https://github.com/vkurchatkin) -
  **Vladimir Kurchatkin** <<vladimir.kurchatkin@gmail.com>>
* [VoltrexKeyva](https://github.com/VoltrexKeyva) -
  **Mohammed Keyvanzadeh** <<mohammadkeyvanzade94@gmail.com>> (he/him)
* [vsemozhetbyt](https://github.com/vsemozhetbyt) -
  **Vse Mozhet Byt** <<vsemozhetbyt@gmail.com>> (he/him)
* [watson](https://github.com/watson) -
  **Thomas Watson** <<w@tson.dk>>
* [whitlockjc](https://github.com/whitlockjc) -
  **Jeremy Whitlock** <<jwhitlock@apache.org>>
* [yashLadha](https://github.com/yashLadha) -
  **Yash Ladha** <<yash@yashladha.in>> (he/him)
* [yhwang](https://github.com/yhwang) -
  **Yihong Wang** <<yh.wang@ibm.com>>
* [yorkie](https://github.com/yorkie) -
  **Yorkie Liu** <<yorkiefixer@gmail.com>>
* [yosuke-furukawa](https://github.com/yosuke-furukawa) -
  **Yosuke Furukawa** <<yosuke.furukawa@gmail.com>>
* [zcbenz](https://github.com/zcbenz) -
  **Cheng Zhao** <<zcbenz@gmail.com>> (he/him)

</details>

<!--lint enable prohibited-strings-->

协作者在维护 Node.js 项目时遵循[协作者指南](./doc/contributing/collaborator-guide.md)。

### 分诊者

* [1ilsang](https://github.com/1ilsang) -
  **Sangchul Lee** <<1ilsang.dev@gmail.com>>（他/他）
* [bjohansebas](https://github.com/bjohansebas) -
  **Sebastian Beltran** <<bjohansebas@gmail.com>>
* [bmuenzenmeyer](https://github.com/bmuenzenmeyer) -
  **Brian Muenzenmeyer** <<brian.muenzenmeyer@gmail.com>>（他/他）
* [efekrskl](https://github.com/efekrskl) -
  **Efe Karasakal** <<hi@efe.dev>>（他/他）
* [gireeshpunathil](https://github.com/gireeshpunathil) -
  **Gireesh Punathil** <<gpunathi@in.ibm.com>>（他/他）
* [haramj](https://github.com/haramj) -
  **Haram Jeong** <<haramj.dev@gmail.com>>
* [HBSPS](https://github.com/HBSPS) -
  **Wiyeong Seo** <<hbsps.dev@gmail.com>>
* [iam-frankqiu](https://github.com/iam-frankqiu) -
  **Frank Qiu** <<iam.frankqiu@gmail.com>>（他/他）
* [inoway46](https://github.com/inoway46) -
  **Yuya Inoue** <<inoueyuya416@gmail.com>>（他/他）
* [milesguicent](https://github.com/milesguicent) -
  **Miles Guicent** <<guicent@pm.me>>（他/他）
* [preveen-stack](https://github.com/preveen-stack) -
  **Preveen Padmanabhan** <<wide4head@gmail.com>>（他/他）

分类人员在回复新问题时遵循[分类指南](./doc/contributing/issues.md#triaging-a-bug-report)。

### 发布密钥

Node.js 发布人员的主要 GPG 密钥（部分发布人员使用子密钥签名）：

* **Antoine du Hamel** <<duhamelantoine1995@gmail.com>>
  `5BE8A3F6C8A5C01D106C0AD820B1A390B168D356`
* **Juan José Arboleda** <<soyjuanarbol@gmail.com>>
  `DD792F5973C6DE52C432CBDAC77ABFA00DDBF2B7`
* **Marco Ippolito** <<marcoippolito54@gmail.com>>
  `CC68F5A3106FF448322E48ED27F5E38D5B0A215F`
* **Rafael Gonzaga** <<rafael.nunu@hotmail.com>>
  `890C08DB8579162FEE0DF9DB8BEAB4DFCF555EF4`
* **Richard Lau** <<richard.lau@ibm.com>>
  `C82FA3AE1CBEDC6BE46B9360C43CEC45C17AB93C`
* **Ruy Adorno** <<ruyadorno@hotmail.com>>
  `108F52B48DB57BB0CC439B2997B01419BD92F80A`
* **Stewart X Addison** <<sxa@ibm.com>>
  `655F3B5C1FB3FA8D1A0CA6BDE4A7D232B936D2FD`
* **Ulises Gascón** <<ulisesgascongonzalez@gmail.com>>
  `A363A499291CBBC940DD62E41F10027AF002F8B0`

你可以使用项目维护的密钥环，地址为
<https://github.com/nodejs/release-keys/raw/refs/heads/main/gpg-only-active-keys/pubring.kbx>。
或者，你也可以从公共密钥服务器导入这些密钥。请注意，项目无法保证服务器或该服务器上的密钥始终可用。

```bash
gpg --keyserver hkps://keys.openpgp.org --recv-keys 5BE8A3F6C8A5C01D106C0AD820B1A390B168D356 # Antoine du Hamel
gpg --keyserver hkps://keys.openpgp.org --recv-keys DD792F5973C6DE52C432CBDAC77ABFA00DDBF2B7 # Juan José Arboleda
gpg --keyserver hkps://keys.openpgp.org --recv-keys CC68F5A3106FF448322E48ED27F5E38D5B0A215F # Marco Ippolito
gpg --keyserver hkps://keys.openpgp.org --recv-keys 890C08DB8579162FEE0DF9DB8BEAB4DFCF555EF4 # Rafael Gonzaga
gpg --keyserver hkps://keys.openpgp.org --recv-keys C82FA3AE1CBEDC6BE46B9360C43CEC45C17AB93C # Richard Lau
gpg --keyserver hkps://keys.openpgp.org --recv-keys 108F52B48DB57BB0CC439B2997B01419BD92F80A # Ruy Adorno
gpg --keyserver hkps://keys.openpgp.org --recv-keys 655F3B5C1FB3FA8D1A0CA6BDE4A7D232B936D2FD # Stewart X Addison
gpg --keyserver hkps://keys.openpgp.org --recv-keys A363A499291CBBC940DD62E41F10027AF002F8B0 # Ulises Gascón
```

请参阅[验证二进制文件](#verifying-binaries)，了解如何使用这些密钥验证下载的文件。

<details>

<summary>用于签署某些早期版本的其他密钥</summary>

* **Antoine du Hamel** <<duhamelantoine1995@gmail.com>>
  `C0D6248439F1D5604AAFFB4021D900FFDB233756`
* **Beth Griggs** <<bethanyngriggs@gmail.com>>
  `4ED778F539E3634C779C87C6D7062848A1AB005C`
* **Bryan English** <<bryan@bryanenglish.com>>
  `141F07595B7B3FFE74309A937405533BE57C7D57`
* **Chris Dickinson** <<christopher.s.dickinson@gmail.com>>
  `9554F04D7259F04124DE6B476D5A82AC7E37093B`
* **Colin Ihrig** <<cjihrig@gmail.com>>
  `94AE36675C464D64BAFA68DD7434390BDBE9B9C5`
* **Danielle Adams** <<adamzdanielle@gmail.com>>
  `1C050899334244A8AF75E53792EF661D867B9DFA`
  `74F12602B6F1C4E913FAA37AD3A89613643B6201`
* **Evan Lucas** <<evanlucas@me.com>>
  `B9AE9905FFD7803F25714661B63B535A4C206CA9`
* **Gibson Fahnestock** <<gibfahn@gmail.com>>
  `77984A986EBC2AA786BC0F66B01FBB92821C587A`
* **Isaac Z. Schlueter** <<i@izs.me>>
  `93C7E9E91B49E432C2F75674B0A78B0A6C481CF6`
* **Italo A. Casas** <<me@italoacasas.com>>
  `56730D5401028683275BD23C23EFEFE93C4CFFFE`
* **James M Snell** <<jasnell@keybase.io>>
  `71DCFD284A79C3B38668286BC97EC7A07EDE3FC1`
* **Jeremiah Senkpiel** <<fishrock@keybase.io>>
  `FD3A5288F042B6850C66B31F09FE44734EB7990E`
* **Juan José Arboleda** <<soyjuanarbol@gmail.com>>
  `61FC681DFB92A079F1685E77973F295594EC4689`
* **Julien Gilli** <<jgilli@fastmail.fm>>
  `114F43EE0176B71C7BC219DD50A3051F888C628D`
* **Michaël Zasso** <<targos@protonmail.com>>
  `8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600`
* **Myles Borins** <<myles.borins@gmail.com>>
  `C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8`
* **Rod Vagg** <<rod@vagg.org>>
  `DD8F2338BAE7501E3DD5AC78C273792F7D83545D`
* **Ruben Bridgewater** <<ruben@bridgewater.de>>
  `A48C2BEE680E841632CD4E44F07496B3EB3C1762`
* **Shelley Vohr** <<shelley.vohr@gmail.com>>
  `B9E2F5981AA6E0CD28160D9FF13993A75599653C`
* **Timothy J Fontaine** <<tjfontaine@gmail.com>>
  `7937DFD2AB06298B2293C3187D33FF9D0246406D`

项目维护了一个密钥环，可用于验证 Node.js 的所有过往版本，地址为
<https://github.com/nodejs/release-keys/raw/refs/heads/main/gpg/pubring.kbx>。

</details>

### 安全发布负责人

在可能的情况下，由公司承诺参与安全发布负责人轮值，以确保担任安全负责人的个人能够获得雇主的支持和认可，从而优先处理安全发布。安全发布负责人按照[安全发布流程](./doc/contributing/security-release-process.md)中所述的方式轮值管理安全发布。

* [Datadog](https://www.datadoghq.com/)
  * [bengl](https://github.com/bengl) -
    **Bryan English** <<bryan@bryanenglish.com>>（他/他）
* [HeroDevs](https://www.herodevs.com/)
  * [juanarbol](https://github.com/juanarbol) - OpenJS Slack 用户名：`juanarbol`
    **Juan José Arboleda** <<soyjuanarbol@gmail.com>>（他/他）
  * [marco-ippolito](https://github.com/marco-ippolito) - OpenJS Slack 用户名：`Marco Ippolito`
    **Marco Ippolito** <<marcoippolito54@gmail.com>>（他/他）
* [NodeSource](https://nodesource.com/)
  * [RafaelGSS](https://github.com/RafaelGSS) - OpenJS Slack 用户名：`RafaelGSS`
    **Rafael Gonzaga** <<rafael.nunu@hotmail.com>>（他/他）
* [Platformatic](https://platformatic.dev/)
  * [mcollina](https://github.com/mcollina) - OpenJS Slack 用户名：`mcollina`
    **Matteo Collina** <<matteo.collina@gmail.com>>（他/他）
* [Red Hat](https://redhat.com) / [IBM](https://ibm.com)
  * [BethGriggs](https://github.com/BethGriggs) -
    **Beth Griggs** <<bethanyngriggs@gmail.com>>（她/她）
  * [sxa](https://github.com/sxa) -
    **Stewart X Addison** <<sxa@redhat.com>>（他/他）

## 许可证

Node.js 根据 [MIT 许可证](https://opensource.org/licenses/MIT)授权。

本项目还依赖可能采用不同开源许可证的外部库。有关所含许可证的完整列表，请参阅
[LICENSE](https://github.com/nodejs/node/blob/main/LICENSE) 文件。

如果你要贡献文档或源代码更改，请确保你的新增内容符合项目的许可证指南。

[行为准则]: https://github.com/nodejs/admin/blob/HEAD/CODE_OF_CONDUCT.md
[为项目做贡献]: CONTRIBUTING.md
[Node.js 网站]: https://nodejs.org/
[OpenJS Foundation]: https://openjsf.org/
[战略计划]: doc/contributing/strategic-initiatives.md
[技术价值观和优先级]: doc/contributing/technical-values.md
[工作组]: https://github.com/nodejs/TSC/blob/HEAD/WORKING_GROUPS.md
