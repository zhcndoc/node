# 维护根证书

Node.js 包含一组内置的根证书，用作 TLS 证书验证的信任锚点。

这些证书来自 Mozilla，具体来说是 NSS 的 `certdata.txt` 文件。

这些证书的 PEM 编码会被转换为 C 字符串，并提交到 `src/node_root_certs.h` 中。

## 何时更新

根证书应在 Mozilla 发布 NSS 版本之后的某个时间更新，请查看 [NSS 发布计划][]。

## 流程

`tools/dep_updaters/update-root-certs.mjs` 脚本会自动更新根证书，包括：

* 从 Mozilla 的源代码仓库下载 `certdata.txt`。
* 运行 `tools/mk-ca-bundle.pl` 转换证书并生成 `src/node_root_certs.h`。
* 使用 `git diff-files` 确定哪些证书已添加和/或移除。

下面折叠的部分包含手动说明。

<details>

以下命令假定当前工作目录是 nodejs/node 仓库检出的根目录。

1. 查找用于更新的 NSS 元数据。

   最新发布的 NSS 版本、发布日期、Firefox 版本以及 Firefox 发布日期可在 [NSS 发布计划][] 中找到。

   要获取 `certdata.txt` 的标签，可在 [标签列表][] 中按发布版本查找。

2. 从 NSS 发布标签更新 `certdata.txt`。

   在下面的命令中更新标签，然后运行：

   ```bash
   cd tools/
   ./mk-ca-bundle.pl -v 2>_before
   curl -O https://hg.mozilla.org/projects/nss/raw-file/NSS_3_41_RTM/lib/ckfw/builtins/certdata.txt
   ```

   `_before` 文件之后会用到。验证运行 `mk-ca-bundle` 后没有对 `src/node_root_certs.h` 做任何更改。如果有，说明上一次更新出了问题。请寻求帮助！

   在下面的消息中更新元数据，并提交 `certdata.txt`：

   ```text
   tools: update certdata.txt

   这是来自 NSS 3.41 的 certdata.txt[0]，发布于 2018-12-03。

   这是将随 Firefox 65 一起发布的 NSS 版本，发布时间为
   2018-12-11。

   [0] https://hg.mozilla.org/projects/nss/raw-file/NSS_3_41_RTM/lib/ckfw/builtins/certdata.txt
   ```

3. 从 `certdata.txt` 更新 `node_root_certs.h`。

   运行下面的命令：

   ```bash
   ./mk-ca-bundle.pl -v 2>_after
   ```

   确认 `../src/node_root_certs.h` 已更新。

   通过比较更新前后的文件来确定做了哪些更改：

   ```console
   % diff _before _after
   11d10
   < Parsing: Visa eCommerce Root
   106d104
   < Parsing: TÜRKTRUST Elektronik Sertifika Hizmet Sağlayıcısı H5
   113,117d110
   < Parsing: Certplus Root CA G1
   < Parsing: Certplus Root CA G2
   < Parsing: OpenTrust Root CA G1
   < Parsing: OpenTrust Root CA G2
   < Parsing: OpenTrust Root CA G3
   134c127,136
   < Done (133 CA certs processed, 20 skipped).
   ---
   > Parsing: GlobalSign Root CA - R6
   > Parsing: OISTE WISeKey Global Root GC CA
   > Parsing: GTS Root R1
   > Parsing: GTS Root R2
   > Parsing: GTS Root R3
   > Parsing: GTS Root R4
   > Parsing: UCA Global G2 Root
   > Parsing: UCA Extended Validation Root
   > Parsing: Certigna Root CA
   > Done (135 CA certs processed, 16 skipped).
   ```

   使用 diff 更新下面的消息，并提交 `src/node_root_certs.h`：

   ```text
   crypto: 更新根证书

   使用 tools/mk-ca-bundle.pl 更新 src/node_root_certs.h 中的根证书列表。

   已添加的证书：
   - GlobalSign Root CA - R6
   - OISTE WISeKey Global Root GC CA
   - GTS Root R1
   - GTS Root R2
   - GTS Root R3
   - GTS Root R4
   - UCA Global G2 Root
   - UCA Extended Validation Root
   - Certigna Root CA

   已移除的证书：
   - Visa eCommerce Root
   - TÜRKTRUST Elektronik Sertifika Hizmet Sağlayıcısı H5
   - Certplus Root CA G1
   - Certplus Root CA G2
   - OpenTrust Root CA G1
   - OpenTrust Root CA G2
   - OpenTrust Root CA G3
   ```

</details>

[NSS 发布计划]: https://wiki.mozilla.org/NSS:Release_Versions
[标签列表]: https://hg.mozilla.org/projects/nss/tags
