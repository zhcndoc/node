新闻
====

本文档简要概述了 OpenSSL 各个版本之间的主要更改。有关更多详细信息，请阅读 CHANGES 文件。

OpenSSL 版本
----------------

 - [OpenSSL 3.5](#openssl-35)
 - [OpenSSL 3.4](#openssl-34)
 - [OpenSSL 3.3](#openssl-33)
 - [OpenSSL 3.2](#openssl-32)
 - [OpenSSL 3.1](#openssl-31)
 - [OpenSSL 3.0](#openssl-30)
 - [OpenSSL 1.1.1](#openssl-111)
 - [OpenSSL 1.1.0](#openssl-110)
 - [OpenSSL 1.0.2](#openssl-102)
 - [OpenSSL 1.0.1](#openssl-101)
 - [OpenSSL 1.0.0](#openssl-100)
 - [OpenSSL 0.9.x](#openssl-09x)

OpenSSL 3.5
-----------

### OpenSSL 3.5.5 和 OpenSSL 3.5.6 之间的主要更改 [2026 年 4 月 7 日]

OpenSSL 3.5.6 是一个安全补丁版本。此版本修复的最严重的 CVE 为中危。

此版本包含以下错误修复和缓解措施：

  * 修复了 RSA KEM RSASVE 封装中不正确的故障处理。
    ([CVE-2026-31790])

  * 修复了当在密钥协商组列表的服务器端配置中使用 `DEFAULT` 关键字时，密钥协商组元组结构丢失的问题。
    ([CVE-2026-2673])

  * 修复了 DANE 客户端代码中潜在的释放后使用问题。
    ([CVE-2026-28387])

  * 修复了处理增量 CRL 时出现的 NULL 指针解引用问题。
    ([CVE-2026-28388])

  * 修复了处理 CMS KeyAgreeRecipientInfo 时可能出现的 NULL 解引用问题。
    ([CVE-2026-28389])

  * 修复了处理 CMS KeyTransportRecipientInfo 时可能出现的 NULL 解引用问题。
    ([CVE-2026-28390])

  * 修复了十六进制转换中的堆缓冲区溢出问题。
    ([CVE-2026-31789])

### OpenSSL 3.5.4 和 OpenSSL 3.5.5 之间的主要更改 [2025 年 1 月 27 日]

OpenSSL 3.5.5 是一个安全补丁版本。此版本修复的最严重的 CVE 为高危。

此版本包含以下错误修复和缓解措施：

  * 修复了 PKCS#12 MAC 验证中 PBMAC1 参数的验证不当问题。
    ([CVE-2025-11187])

  * 修复了 CMS `AuthEnvelopedData` 解析中的堆栈缓冲区溢出问题。
    ([CVE-2025-15467])

  * 修复了在未知密码 ID 时 `SSL_CIPHER_find()` 函数中的 NULL 解引用问题。
    ([CVE-2025-15468])

  * 修复了 `openssl dgst` 单次执行代码路径会静默截断大于 16 MiB 的输入。
    ([CVE-2025-15469])

  * 修复了 TLS 1.3 `CompressedCertificate` 过度内存分配问题。
    ([CVE-2025-66199])

  * 修复了短写入时 `BIO_f_linebuffer` 中的堆越界写入问题。
    ([CVE-2025-68160])

  * 修复了低级 OCB 函数调用中未经验证/未加密的尾部字节问题。
    ([CVE-2025-69418])

  * 修复了 `PKCS12_get_friendlyname()` UTF-8 转换中的越界写入问题。
    ([CVE-2025-69419])

  * 修复了 `TS_RESP_verify_response()` 函数中缺少 `ASN1_TYPE` 验证的问题。
    ([CVE-2025-69420])

  * 修复了 `PKCS12_item_decrypt_d2i_ex()` 函数中的 NULL 指针解引用问题。
    ([CVE-2025-69421])

  * 修复了 PKCS#12 解析中缺少 `ASN1_TYPE` 验证的问题。
    ([CVE-2026-22795])

  * 修复了 `PKCS7_digest_from_attributes()` 函数中的 `ASN1_TYPE` 类型混淆问题。
    ([CVE-2026-22796])

### OpenSSL 3.5.3 和 OpenSSL 3.5.4 之间的主要更改 [2025 年 9 月 30 日]

OpenSSL 3.5.4 是一个安全补丁版本。此版本修复的最严重的 CVE 为中危。

此版本包含以下错误修复和缓解措施：

  * 修复了 RFC 3211 KEK Unwrap 中的越界读写问题。
    ([CVE-2025-9230])

  * 修复了 64 位 ARM 上 SM2 算法中的时序侧信道问题。
    ([CVE-2025-9231])

  * 修复了 HTTP 客户端 no_proxy 处理中的越界读取问题。
    ([CVE-2025-9232])

  * 恢复了发布版本中合成的 `OPENSSL_VERSION_NUMBER` 更改，因为它破坏了一些依赖于先前 3.x 语义的现有应用程序，如 `OpenSSL_version(3)` 中所述。

### OpenSSL 3.5.2 和 OpenSSL 3.5.3 之间的主要更改 [2025 年 9 月 16 日]

OpenSSL 3.5.3 是一个错误修复版本。

此版本包含以下错误修复和缓解措施：

  * 在 DH 密钥生成中添加了 FIPS 140-3 PCT。

  * 修复了合成的 `OPENSSL_VERSION_NUMBER`。

  * 从 FIPS 提供程序中删除了密钥导入的 PCT，因为它不是标准所必需的。

### OpenSSL 3.5.1 和 OpenSSL 3.5.2 之间的主要更改 [2025 年 8 月 5 日]

OpenSSL 3.5.2 是一个错误修复版本。

此版本包含以下错误修复和缓解措施：

  * FIPS 提供程序现在对 RSA、EC 和 ECX 的密钥导入执行 PCT。

### OpenSSL 3.5.0 和 OpenSSL 3.5.1 之间的主要更改 [2025 年 7 月 1 日]

OpenSSL 3.5.1 是一个安全补丁版本。此版本修复的最严重的 CVE 为低危。

此版本包含以下错误修复和缓解措施：

  * 修复了 x509 应用程序添加了受信任使用而不是拒绝使用的问题。
    ([CVE-2025-4575])

### OpenSSL 3.4 和 OpenSSL 3.5.0 之间的主要更改 [2025 年 4 月 8 日]

OpenSSL 3.5.0 是一个功能版本，为 OpenSSL 添加了重要的全新功能。

此版本包含以下潜在的重要或不兼容的更改：

  * `req`、`cms` 和 `smime` 应用程序的默认加密密码从 `des-ede3-cbc` 更改为 `aes-256-cbc`。

  * 默认 TLS 支持的组列表已更改为包含并优先使用混合 PQC KEM 组。从默认列表中删除了一些实际上未使用的组。

  * 默认 TLS 密钥共享已更改为提供 X25519MLKEM768 和 X25519。

  * 所有 `BIO_meth_get_*()` 函数已被弃用。

此版本添加了以下新功能：

  * 支持服务器端 QUIC (RFC 9000)

  * 支持第三方 QUIC 堆栈，包括 0-RTT 支持

  * 支持 PQC 算法（ML-KEM、ML-DSA 和 SLH-DSA）

  * 新的配置选项 `no-tls-deprecated-ec`，用于禁用对 RFC8422 中已弃用的 TLS 组的支持

  * 新的配置选项 `enable-fips-jitter`，用于使 FIPS 提供程序使用 `JITTER` 种子源

  * 支持 CMP 中的集中密钥生成

  * 添加了对不透明对称密钥对象 (EVP_SKEY) 的支持

  * 支持多个 TLS 密钥共享和改进的 TLS 密钥建立组可配置性

  * API 支持提供程序中的密码算法流水线

3.5.0 中的已知问题

  * <https://github.com/openssl/openssl/issues/27282>
    从 SSL_accept_connection 返回的对象调用 SSL_accept 会导致错误。预期调用此函数会推进已建立连接的 SSL 握手，但目前不会。可以通过调用 SSL_do_handshake 来处理此问题。计划在 OpenSSL 3.5.1 中修复。

OpenSSL 3.4
-----------

### OpenSSL 3.4.0 和 OpenSSL 3.4.1 之间的主要更改 [2025 年 2 月 11 日]

OpenSSL 3.4.1 是一个安全补丁版本。此版本修复的最严重的 CVE 为高危。

此版本包含以下错误修复和缓解措施：

  * 修复了 RFC7250 握手与未经验证的服务器不按预期中止的问题。
    ([CVE-2024-12797])

  * 修复了 ECDSA 签名计算中的时序侧信道问题。
    ([CVE-2024-13176])

### OpenSSL 3.3 和 OpenSSL 3.4.0 之间的主要更改 [2024 年 10 月 22 日]

OpenSSL 3.4.0 是一个功能版本，为 OpenSSL 添加了重要的全新功能。

此版本包含以下潜在的重要或不兼容的更改：

  * 弃用了 TS_VERIFY_CTX_set_* 函数，并添加了具有改进语义的替换函数 TS_VERIFY_CTX_set0_*。

  * 重新设计了 Windows 上 OPENSSLDIR/ENGINESDIR/MODULESDIR 的使用方式，以前的构建时位置现在可以通过注册表项在运行时定义。

  * FIPS 提供程序中的 X25519 和 X448 密钥交换实现未经批准，并具有 `fips=no` 属性。

  * SHAKE-128 和 SHAKE-256 实现不再具有默认摘要长度。这意味着除非在之前设置了 `xoflen` 参数，否则无法将这些算法与 EVP_DigestFinal/_ex() 一起使用。

  * 在配置文件中设置 `config_diagnostics=1` 将导致在 ssl 模块配置存在错误时从 SSL_CTX_new() 和 SSL_CTX_new_ex() 返回错误。

  * 对于最低 TLS 版本大于 1.0 的所有连接，将在 TLS 客户端问候语中使用空的重新协商扩展，而不是空的重新协商 SCSV。

  * 弃用了 SSL_SESSION_get_time()、SSL_SESSION_set_time() 和 SSL_CTX_flush_sessions() 函数，转而使用各自的 `_ex` 函数，这些函数在具有 Y2038 安全 `time_t` 的平台上是 Y2038 安全的。

此版本添加了以下新功能：

  * 支持直接获取的复合签名算法，例如 RSA-SHA2-256，包括新的 API 函数。

  * FIPS 提供程序中的 FIPS 指示符支持，以及未来 FIPS 140-3 验证所需的 FIPS 提供程序的各种更新。

  * 在 PKCS#12 中实现了 RFC 9579 (PBMAC1)。

  * 一个可选的附加随机种子源 RNG `JITTER`，使用静态链接的 jitterentropy 库。

  * `req` 和 `x509` 应用程序创建的证书的新的 `-not_before` 和 `-not_after` 选项，用于显式设置开始和结束日期。

  * 在 TLS 1.3 中支持 RFC 9150 中定义的仅完整性密码套件 TLS_SHA256_SHA256 和 TLS_SHA384_SHA384。

  * 支持在 CMP 中检索证书请求模板和 CRL。

  * 支持与属性证书相关的其他 X.509v3 扩展。

  * 初始属性证书 (RFC 5755) 支持。

  * 可以自定义 ECC 组初始化，以使用预计算值来节省 CPU 时间，以及 P-256 实现对此功能的使用。

OpenSSL 3.3
-----------

### OpenSSL 3.3.2 和 OpenSSL 3.3.3 之间的主要更改 [开发中]

OpenSSL 3.3.3 是一个安全补丁版本。此版本修复的最严重的 CVE 为低危。

此版本包含以下错误修复和缓解措施：

  * 修复了使用无效的低级 GF(2^m) 椭圆曲线参数时可能发生的 OOB 内存访问。
    ([CVE-2024-9143])

### OpenSSL 3.3.1 和 OpenSSL 3.3.2 之间的主要更改 [2024 年 9 月 3 日]

OpenSSL 3.3.2 是一个安全补丁版本。此版本修复的最严重的 CVE 为中危。

此版本包含以下错误修复和缓解措施：

  * 修复了 X.509 名称检查中可能出现的拒绝服务问题。
    ([CVE-2024-6119])

  * 修复了 SSL_select_next_proto() 中可能出现的缓冲区越读问题。
    ([CVE-2024-5535])

### OpenSSL 3.3.0 和 OpenSSL 3.3.1 之间的主要更改 [2024 年 6 月 4 日]

OpenSSL 3.3.1 是一个安全补丁版本。此版本修复的最严重的 CVE 为低危。

此版本包含以下错误修复和缓解措施：

  * 修复了调用 SSL_free_buffers() 后可能出现的释放后使用问题。
    ([CVE-2024-4741])

  * 修复了检查过长的 DSA 密钥或参数可能非常慢的问题。
    ([CVE-2024-4603])

### OpenSSL 3.2 和 OpenSSL 3.3.0 之间的主要更改 [2024 年 4 月 9 日]

OpenSSL 3.3.0 是一个功能版本，为 OpenSSL 添加了重要的全新功能。

此版本添加了以下新功能：

  * 添加了用于跟踪 QUIC 连接的 qlog 支持。

  * 添加了 API 以允许配置 QUIC 连接协商的空闲超时时间，并允许确定当前可以为 QUIC 连接创建的附加流的数量。

  * 添加了 API 以允许禁用 QUIC SSL 对象的隐式 QUIC 事件处理。

  * 添加了 API 以允许查询 QUIC 流写缓冲区的尺寸和利用率。

  * 新 API `SSL_write_ex2`，在使用 QUIC 时可以用于以优化方式发送流结束 (FIN) 条件。

  * 对 QUIC 连接和流对象的非阻塞轮询提供了有限的支持。

  * 添加了新的 EVP_DigestSqueeze() API。这允许 SHAKE 进行多次挤压，输出大小不同。

  * 为 Unix 和 Windows 添加了 CMake 导出器，以及 pkg-config 导出器。

  * BLAKE2s 哈希算法支持可配置输出长度，与 BLAKE2b 相同。

  * EVP_PKEY_fromdata 函数已得到增强，允许在请求时推导 CRT (中国剩余定理) 参数。

  * 添加了 API 函数 SSL_SESSION_get_time_ex()、SSL_SESSION_set_time_ex()，使用 Y2038 安全的 time_t，在 32 位系统上启用 64 位时间时。

  * TLS SignatureAlgorithms、ClientSignatureAlgorithms 配置选项以及对 SSL[_CTX]_set1_sigalgs() 和 SSL[_CTX]_set1_client_sigalgs() 的相应调用中以 `?` 字符开头的未知条目将被忽略，并且仍将使用配置。

  * 向 `openssl x509` 添加了 `-set_issuer` 和 `-set_subject` 选项，用于在创建证书时覆盖颁发者和主题。`-subj` 选项现在是 `-set_subject` 的别名。

  * 添加了 RFC 9480 和 RFC 9483 中定义的 CMPv3 的几项新功能。

  * 新选项 `SSL_OP_PREFER_NO_DHE_KEX`，允许配置 TLS1.3 服务器在两者都可用时，优先使用仅 PSK 的密钥交换而不是带 DHE 的 PSK 进行会话恢复。

  * 新的 atexit 配置开关，用于控制在 libcrypto 卸载时是否注册 OPENSSL_cleanup。

  * 添加了 X509_STORE_get1_objects，以避免在多线程应用程序中出现与现有 X509_STORE_get0_objects API 相关的问题。

  * 支持在 CMP 中使用证书配置文件和扩展的延迟交付。

此版本包含以下潜在的重要或不兼容的更改：

  * 将 AES-GCM unroll8 优化应用于 Microsoft Azure Cobalt 100。

  * 优化了 ARM Neoverse V1 和 V2 的 AES-CTR。

  * 在基于 Apple Silicon M3 的 MacOS 系统上启用了与 M1/M2 类似的 AES 和 SHA3 优化。

  * 使用 RISC-V 向量加密扩展对加密例程进行了各种优化。

  * 为 loongarch64 添加了 md5 的汇编实现。

  * 接受 TLS 1.2 导出器的更长上下文。

  * openssl.cnf 中提供程序的 activate 和 soft_load 配置设置已更新，要求值为 [1|yes|true|on]（不区分大小写）才能启用该设置。反之，值为 [0|no|false|off] 将禁用该设置。

  * 在 `openssl speed` 中，将 `hmac` 使用的默认哈希函数从 `md5` 更改为 `sha256`。

  * `openssl crl` 和 `openssl req` 的 `-verify` 选项将在失败时使程序退出并返回 1。

  * d2i_ASN1_GENERALIZEDTIME()、d2i_ASN1_UTCTIME()、ASN1_TIME_check() 和相关函数已得到增强，以根据 ITU-T X.690 第 11.7 和 11.8 节检查输入字符串的最小长度。

  * OPENSSL_sk_push() 和 sk_<TYPE>_push() 函数在与 NULL 堆栈参数调用时现在返回 0 而不是 -1。

  * 在 HTTP 客户端中引入了对 HTTP 响应头的新限制。默认限制设置为 256 个头行。

此版本包含以下错误修复和缓解措施：

  * BIO_get_new_index() 函数最多只能调用 127 次，之后将达到 BIO_TYPE_MASK 的上限，现在一旦耗尽将返回 -1。

此版本中更改的更详细列表可以在 [CHANGES.md] 文件中找到。

鼓励用户使用新的 QUIC 功能的用户阅读 [QUIC 的 README 文件][README-QUIC.md]，其中提供了相关文档和示例代码的链接。

一如既往，有关 OpenSSL 的错误报告和问题可以在 [我们的问题跟踪器][issue tracker] 上提交。

OpenSSL 3.2
-----------

### OpenSSL 3.2.1 和 OpenSSL 3.2.2 之间的主要变更 [开发中]

OpenSSL 3.2.2 是一个安全补丁版本。此版本中修复的最严重 CVE 为低危。

此版本包含以下错误修复和缓解措施：

  * 修复了 TLSv1.3 会话处理中无界内存增长的问题
    ([CVE-2024-2511])

### OpenSSL 3.2.0 和 OpenSSL 3.2.1 之间的主要变更 [2024 年 1 月 30 日]

OpenSSL 3.2.1 是一个安全补丁版本。此版本中修复的最严重 CVE 为低危。

此版本包含以下错误修复和缓解措施：

  * 修复了 PKCS12 解码崩溃的问题
    ([CVE-2024-0727])

  * 修复了检查无效 RSA 公钥时花费的过多时间
    ([CVE-2023-6237])

  * 修复了 POLY1305 MAC 实现损坏支持 PowerISA 2.07 的 PowerPC CPU 上的向量寄存器
    ([CVE-2023-6129])

### OpenSSL 3.1 和 OpenSSL 3.2.0 之间的主要变更 [2023 年 11 月 23 日]

OpenSSL 3.2.0 是一个功能版本，为 OpenSSL 增加了重要的全新功能。

此版本包含以下潜在的重要或不兼容的更改：

  * 默认 SSL/TLS 安全级别已从 1 更改为 2。

  * `x509`、`ca` 和 `req` 应用程序现在始终生成 X.509v3 证书。

  * X.509 对象中的主题或颁发者名称现在默认显示为 UTF-8 字符串。此外，DN 输出中 `=` 周围的空格已被移除。

此版本增加了以下新功能：

  * 支持客户端 QUIC，包括对多流的支持 (RFC 9000)

  * 除了现有的 Ed25519 和 Ed448 支持外，还支持 Ed25519ctx、Ed25519ph 和 Ed448ph (RFC 8032)

  * 支持确定性 ECDSA 签名 (RFC 6979)

  * 支持 AES-GCM-SIV，一种抗 nonce 误用 AEAD (RFC 8452)

  * 支持 Argon2 KDF，以及支持线程池功能 (RFC 9106)

  * 支持混合公钥加密 (HPKE) (RFC 9180)

  * 支持 SM4-XTS

  * 支持 TLS 1.3 中的 Brainpool 曲线

  * 支持 TLS 原始公钥 (RFC 7250)

  * 在 Linux、macOS 和 FreeBSD 上支持 TCP Fast Open，前提是已启用并支持 (RFC 7413)

  * 支持 TLS 证书压缩，包括对 zlib、Brotli 和 zstd 的库支持 (RFC 8879)

  * 支持基于提供程序的插件式签名算法，用于 TLS 1.3，并支持 CMS 和 X.509 功能

    使用合适的提供程序，这可以实现后量子/量子安全密码学的应用。

  * 支持使用 Windows 系统证书存储作为受信任根证书的来源

    此功能尚未默认启用，必须通过环境变量激活。未来功能版本可能会默认启用此功能。

  * 支持在 TLS 密码套件配置中使用 IANA 标准名称

  * CMP 协议支持的多个新功能和改进

此版本存在以下已知问题，将在未来版本中修复：

  * 基于提供程序的签名算法无法使用 `SignatureAlgorithms` 配置文件参数进行配置 (#22761)

此版本包含以下文档增强：

  * 添加了关于 OpenSSL 库的多个教程，特别是关于使用 libssl 编写各种客户端（使用 TLS 和 QUIC 协议）的教程

    请参阅 [OpenSSL 指南]。

此版本包含以下错误修复和缓解措施：

  * 修复了在 DH 检查/生成大 Q 参数值时花费的过多时间
    ([CVE-2023-5678])

此版本中更详细的更改列表可以在 [CHANGES.md] 文件中找到。

鼓励有兴趣使用新 QUIC 功能的用户阅读 [QUIC 的 README 文件][README-QUIC.md]，其中提供了相关文档和示例代码的链接。

一如既往，有关 OpenSSL 的错误报告和问题可以在 [我们的问题跟踪器][issue tracker] 上提交。

OpenSSL 3.1
-----------

### OpenSSL 3.1.3 和 OpenSSL 3.1.4 之间的主要变更 [2023 年 10 月 24 日]

  * 缓解了对称密码密钥和 IV 的不正确调整大小处理问题。
    ([CVE-2023-5363])

### OpenSSL 3.1.2 和 OpenSSL 3.1.3 之间的主要变更 [2023 年 9 月 19 日]

  * 修复了 POLY1305 MAC 实现损坏 Windows 上 XMM 寄存器的问题
    ([CVE-2023-4807])

### OpenSSL 3.1.1 和 OpenSSL 3.1.2 之间的主要变更 [2023 年 8 月 1 日]

  * 修复了检查 DH q 参数值时花费的过多时间 ([CVE-2023-3817])
  * 修复了检查过大模数的 DH_check() 时花费的过多时间 ([CVE-2023-3446])
  * AES-SIV 不再忽略空的关联数据条目 ([CVE-2023-2975])
  * 使用 `enable-fips` 选项构建并使用生成的 FIPS 提供程序时，TLS 1.2 默认将强制使用扩展主密钥和 Hash 和 HMAC DRBG 将不使用截断的摘要进行操作。

### OpenSSL 3.1.0 和 OpenSSL 3.1.1 之间的主要变更 [2023 年 5 月 30 日]

  * 缓解了 `OBJ_obj2txt()` 处理巨型对象标识符子标识符时性能非常慢的问题。 ([CVE-2023-2650])
  * 修复了 ARM 64 位平台上 AES-XTS 解密中的缓冲区越读问题
    ([CVE-2023-1255])
  * 修复了 X509_VERIFY_PARAM_add0_policy() 的文档 ([CVE-2023-0466])
  * 修复了叶子证书中无效证书策略的处理问题
    ([CVE-2023-0465])
  * 限制了策略树中创建的节点数量 ([CVE-2023-0464])

### OpenSSL 3.0 和 OpenSSL 3.1.0 之间的主要变更 [2023 年 3 月 14 日]

  * SSL 3、TLS 1.0、TLS 1.1 和 DTLS 1.0 仅在安全级别 0 下工作。
  * 性能增强和新平台支持，包括新的汇编代码算法实现。
  * 弃用了 LHASH 统计函数。
  * FIPS 140-3 合规性更改。

OpenSSL 3.0
-----------

### OpenSSL 3.0.7 和 OpenSSL 3.0.8 之间的主要变更 [2023 年 2 月 7 日]

  * 修复了 PKCS7 数据验证期间的 NULL 解引用问题 ([CVE-2023-0401])
  * 修复了 X.509 GeneralName 中 X.400 地址类型混淆问题 ([CVE-2023-0286])
  * 修复了验证 DSA 公钥期间的 NULL 解引用问题 ([CVE-2023-0217])
  * 修复了 d2i_PKCS7 函数中的无效指针解引用问题 ([CVE-2023-0216])
  * 修复了调用 BIO_new_NDEF 后出现的 Use-after-free 问题 ([CVE-2023-0215])
  * 修复了调用 PEM_read_bio_ex 后出现的双重释放问题 ([CVE-2022-4450])
  * 修复了 RSA 解密中的时序攻击问题 ([CVE-2022-4304])
  * 修复了 X.509 名称约束读取缓冲区溢出问题 ([CVE-2022-4203])
  * 修复了 X.509 策略约束双重锁定问题 ([CVE-2022-3996])

### OpenSSL 3.0.6 和 OpenSSL 3.0.7 之间的主要变更 [2022 年 11 月 1 日]

  * 在默认提供程序中添加了 RIPEMD160。
  * 修复了 3.0.6 版本引入的回归问题。
  * 修复了 punycode 解码函数中的两个缓冲区溢出问题。
    ([CVE-2022-3786]) 和 ([CVE-2022-3602])

### OpenSSL 3.0.5 和 OpenSSL 3.0.6 之间的主要变更 [2022 年 10 月 11 日]

  * 修复了自定义密码以防止意外使用 NULL 加密的问题
    ([CVE-2022-3358])

### OpenSSL 3.0.4 和 OpenSSL 3.0.5 之间的主要变更 [2022 年 7 月 5 日]

  * 修复了 RSA 私钥操作中的堆内存损坏问题
    ([CVE-2022-2274])
  * 修复了 32 位 x86 平台上 AES OCB 加密某些字节失败的问题
    ([CVE-2022-2097])

### OpenSSL 3.0.3 和 OpenSSL 3.0.4 之间的主要变更 [2022 年 6 月 21 日]

  * 修复了 c_rehash 脚本中未正确清理 shell 元字符以防止命令注入的其他错误
    ([CVE-2022-2068])

### OpenSSL 3.0.2 和 OpenSSL 3.0.3 之间的主要变更 [2022 年 5 月 3 日]

  * 修复了 c_rehash 脚本中未正确清理 shell 元字符以防止命令注入的错误 ([CVE-2022-1292])
  * 修复了 `OCSP_basic_verify` 函数中验证 OCSP 响应上签名者证书的错误 ([CVE-2022-1343])
  * 修复了 RC4-MD5 密码套件错误地将 AAD 数据用作 MAC 密钥的错误 ([CVE-2022-1434])
  * 修复了 OPENSSL_LH_flush() 函数中破坏已删除哈希表条目所占内存重用的错误 ([CVE-2022-1473])

### OpenSSL 3.0.1 和 OpenSSL 3.0.2 之间的主要变更 [2022 年 3 月 15 日]

  * 修复了 BN_mod_sqrt() 函数中可能导致非素数模数无限循环的错误 ([CVE-2022-0778])

### OpenSSL 3.0.0 和 OpenSSL 3.0.1 之间的主要变更 [2021 年 12 月 14 日]

  * 修复了 BN_mod_exp 中的进位错误，该错误可能在 MIPS 上产生不正确的结果
    ([CVE-2021-4160])
  * 修复了 libssl 中 X509_verify_cert() 内部错误的无效处理问题
    ([CVE-2021-4044])
  * 如果属性查询仍允许，则允许从拥有不可导出密钥的提供程序获取操作作为回退。

### OpenSSL 1.1.1 和 OpenSSL 3.0.0 之间的主要变更 [2021 年 9 月 7 日]

  * 使用许多新选项增强了 'openssl list'。
  * 向 man7 添加了迁移指南。
  * 实现对完全“可插入”的 TLSv1.3 组的支持。
  * 添加了对内核 TLS (KTLS) 的支持。
  * 将许可证更改为 Apache License v2.0。
  * 将 CAST5、BF、IDEA、SEED、RC2、RC4、RC5 和 DES 的所有 EVP 密码变体移至 legacy 提供程序。
  * 将 MD2、MD4、MDC2、WHIRLPOOL 和 RIPEMD-160 的 EVP 摘要移至 legacy 提供程序。
  * 添加了生成非对称密钥对的便捷函数。
  * 弃用了 `OCSP_REQ_CTX` 类型和函数。
  * 弃用了 `EC_KEY` 和 `EC_KEY_METHOD` 类型和函数。
  * 弃用了 `RSA` 和 `RSA_METHOD` 类型和函数。
  * 弃用了 `DSA` 和 `DSA_METHOD` 类型和函数。
  * 弃用了 `DH` 和 `DH_METHOD` 类型和函数。
  * 弃用了 `ERR_load_` 函数。
  * 删除了 `RAND_DRBG` API。
  * 弃用了 `ENGINE` API。
  * 添加了 `OSSL_LIB_CTX`，一个 libcrypto 库上下文。
  * 在 OpenSSL API 中添加了各种 `_ex` 函数，支持使用非默认的 `OSSL_LIB_CTX`。
  * 从 'openssl' 程序中删除了交互模式。
  * X25519、X448、Ed25519、Ed448、SHAKE128 和 SHAKE256 算法包含在 FIPS 提供程序中。
  * 使用 SHA1 签名的 X509 证书在安全级别 1 或更高版本中不再被允许。TLS 的默认安全级别为 1，因此默认情况下不再信任使用 SHA1 签名的证书来验证服务器或客户端。
  * `enable-crypto-mdebug` 和 `enable-crypto-mdebug-backtrace` 大部分被禁用；项目改用地址消毒器/泄漏检测器。
  * 添加了证书管理协议 (CMP, RFC 4210) 实现，还涵盖了 CRMF (RFC 4211) 和 HTTP 传输 (RFC 6712)。
    它是 crypto 库的一部分，并添加了一个带有演示配置的 'cmp' 应用程序。
    所有广泛使用的 CMP 功能都支持客户端和服务器。
  * 添加了一个标准的 HTTP 客户端，支持带可选重定向的 GET、POST、任意请求和响应内容类型、TLS、持久连接、通过 HTTP(s) 代理的连接、通过用户定义的 BIO 的连接和交换（允许隐式连接）以及超时检查。
  * 添加了 util/check-format.pl 用于检查是否符合编码指南。
  * 添加了 OSSL_ENCODER，一个通用的编码器 API。
  * 添加了 OSSL_DECODER，一个通用的解码器 API。
  * 添加了 OSSL_PARAM_BLD，一个更易于使用的 OSSL_PARAM API。
  * 添加了错误引发宏 `ERR_raise()` 和 `ERR_raise_data()`。
  * 弃用了 `ERR_put_error()`、`ERR_get_error_line()`、`ERR_get_error_line_data()`、`ERR_peek_error_line_data()`、`ERR_peek_last_error_line_data()` 和 `ERR_func_error_string()`。
  * 添加了 `OSSL_PROVIDER_available()`，用于检查提供程序可用性。
  * 添加了 'openssl mac'，它使用 EVP_MAC API。
  * 添加了 'openssl kdf'，它使用 EVP_KDF API。
  * 添加了 `OPENSSL_info()` 和 'openssl info' 以获取内置数据。
  * 添加了通过跟踪和调试输出来启用 इंस्ट्रmentation 的支持。
  * 更改了版本号方案并将下一个主要版本设置为 3.0.0
  * 添加了 EVP_MAC，一个 EVP 层 MAC API，以及一个通用的 EVP_PKEY 到 EVP_MAC 桥接。支持的 MAC 包括：BLAKE2、CMAC、GMAC、HMAC、KMAC、POLY1305 和 SIPHASH。
  * 删除了 DTLS 功能中的心跳消息。
  * 添加了 EVP_KDF，一个 EVP 层 KDF 和 PRF API，以及一个通用的 EVP_PKEY 到 EVP_KDF 桥接。支持的 KDF 包括：HKDF、KBKDF、KRB5 KDF、PBKDF2、PKCS12 KDF、SCRYPT、SSH KDF、SSKDF、TLS1 PRF、X9.42 KDF 和 X9.63 KDF。
  * 所有低级 MD2、MD4、MD5、MDC2、RIPEMD160、SHA1、SHA224、SHA256、SHA384、SHA512 和 Whirlpool 摘要函数均已弃用。
  * 所有低级 AES、Blowfish、Camellia、CAST、DES、IDEA、RC2、RC4、RC5 和 SEED 密码函数均已弃用。
  * 所有低级 DH、DSA、ECDH、ECDSA 和 RSA 公钥函数均已弃用。
  * SSL 3、TLS 1.0、TLS 1.1 和 DTLS 1.0 仅在安全级别 0 下工作，除非使用不带 SHA1 的 RSA 密钥交换。
  * 添加了提供程序，这是一个新的可插入概念，将取代 ENGINE API 和 ENGINE 实现。

OpenSSL 1.1.1
-------------

### OpenSSL 1.1.1k 和 OpenSSL 1.1.1l 之间的主要变更 [2021 年 8 月 24 日]

  * 修复了 SM2 解密缓冲区溢出 ([CVE-2021-3711])
  * 修复了处理 ASN.1 字符串时各种读取缓冲区溢出 ([CVE-2021-3712])

### OpenSSL 1.1.1j 和 OpenSSL 1.1.1k 之间的主要变更 [2021 年 3 月 25 日]

  * 修复了在使用 X509_V_FLAG_X509_STRICT 标志验证证书链时出现的问题 ([CVE-2021-3450])
  * 修复了 OpenSSL TLS 服务器在收到来自客户端的恶意构造的重新协商 ClientHello 消息时可能崩溃的问题 ([CVE-2021-3449])

### OpenSSL 1.1.1i 和 OpenSSL 1.1.1j 之间的主要变更 [2021 年 2 月 16 日]

  * 修复了 X509_issuer_and_serial_hash() 函数中的 NULL 指针解引用 ([CVE-2021-23841])
  * 修复了 RSA_padding_check_SSLv23() 函数和 RSA_SSLV23_PADDING 填充模式，以正确检查回滚攻击
  * 修复了 EVP_CipherUpdate、EVP_EncryptUpdate 和 EVP_DecryptUpdate 函数中的溢出 ([CVE-2021-23840])
  * 修复了 SRP_Calc_client_key，使其以恒定时间运行

### OpenSSL 1.1.1h 和 OpenSSL 1.1.1i 之间的主要变更 [2020 年 12 月 8 日]

  * 修复了 GENERAL_NAME_CMP 中的 NULL 指针解引用 ([CVE-2020-1971])

### OpenSSL 1.1.1g 和 OpenSSL 1.1.1h 之间的主要变更 [2020 年 9 月 22 日]

  * 在使用 X509_V_FLAG_X509_STRICT 时，禁止在验证链中使用显式曲线参数
  * 启用 'MinProtocol' 和 'MaxProtocol' 来配置 TLS 和 DTLS 上下文
  * Oracle Developer Studio 将开始报告弃用警告

### OpenSSL 1.1.1f 和 OpenSSL 1.1.1g 之间的主要变更 [2020 年 4 月 21 日]

  * 修复了 SSL_check_chain() 中的段错误 ([CVE-2020-1967])

### OpenSSL 1.1.1e 和 OpenSSL 1.1.1f 之间的主要变更 [2020 年 3 月 31 日]

  * 撤销了通过 SSL_ERROR_SSL 报告的意外 EOF

### OpenSSL 1.1.1d 和 OpenSSL 1.1.1e 之间的主要变更 [2020 年 3 月 17 日]

  * 修复了 x86_64 Montgomery 平方过程中的溢出错误，该过程用于 512 位模数的指数运算 ([CVE-2019-1551])

### OpenSSL 1.1.1c 和 OpenSSL 1.1.1d 之间的主要变更 [2019 年 9 月 10 日]

  * 修复了 fork 保护问题 ([CVE-2019-1549])
  * 修复了 PKCS7_dataDecode 和 CMS_decrypt_set1_pkey 中的填充预言 ([CVE-2019-1563])
  * 对于内置 EC 曲线，即使在解析显式参数时，也要确保使用从曲线名称构建的 EC_GROUP
  * 在 EC_GROUP 构建期间计算 ECC 余因子（如果未提供）([CVE-2019-1547])
  * 改进了旧版 Linux 系统从 DEVRANDOM 种子源获取的早期启动熵质量
  * 校正了 EBCDIC 系统上的扩展主密钥常量
  * 在 mingw 构建中使用 Windows 安装路径 ([CVE-2019-1552])
  * 更改了 DH_check 以接受具有阶 q 和 2q 子群的参数
  * 通过随机池显著减少安全内存使用
  * 撤销了 Linux 系统的 DEVRANDOM_WAIT 功能

### OpenSSL 1.1.1b 和 OpenSSL 1.1.1c 之间的主要变更 [2019 年 5 月 28 日]

  * 防止 ChaCha20-Poly1305 中的非随机数过长 ([CVE-2019-1543])

### OpenSSL 1.1.1a 和 OpenSSL 1.1.1b 之间的主要变更 [2019 年 2 月 26 日]

  * 更改了 TLSv1.3 中握手后消息交换开始和结束的信息回调信号。
  * 修复了 DTLS over SCTP 中的一个错误。这会破坏与 OpenSSL 旧版本（如 OpenSSL 1.1.0 和 OpenSSL 1.0.2）的互操作性。

### OpenSSL 1.1.1 和 OpenSSL 1.1.1a 之间的主要变更 [2018 年 11 月 20 日]

  * DSA 签名生成中的时序漏洞 ([CVE-2018-0734])
  * ECDSA 签名生成中的时序漏洞 ([CVE-2018-0735])

### OpenSSL 1.1.0i 和 OpenSSL 1.1.1 之间的主要变更 [2018 年 9 月 11 日]

  * 添加了对 TLSv1.3 的支持。TLSv1.3 实现包括：
    * 默认完全符合 RFC8446 (TLSv1.3) 的实现
    * 早期数据 (0-RTT)
    * 握手后认证和密钥更新
    * 中间件兼容模式
    * TLSv1.3 PSK
    * 支持所有五个 RFC8446 密码套件
    * RSA-PSS 签名算法（向后移植到 TLSv1.2）
    * 可配置的会话票据支持
    * 无状态服务器支持
    * 重写了数据包构造代码以实现“更安全”的数据包处理
    * 重写了扩展处理代码
    有关更多重要信息，请参阅 OpenSSL Wiki 中的 [TLS1.3 页面](
    https://github.com/openssl/openssl/wiki/TLS1.3)。

  * 重写了 OpenSSL 随机数生成器，以引入以下功能：
      * 默认的 RAND 方法现在根据 NIST 标准 SP 800-90Ar1 使用 AES-CTR DRBG。
      * 支持具有种子链接的多个 DRBG 实例。
      * 有公共和私有 DRBG 实例。
      * DRBG 实例是 fork 安全的。
      * 如果启用了安全堆，则将所有全局 DRBG 实例保留在安全堆上。
      * 公共和私有 DRBG 实例是每个线程的，以实现无锁操作
  * 支持各种新的加密算法，包括：
      * SHA3
      * SHA512/224 和 SHA512/256
      * EdDSA（Ed25519 和 Ed448），包括 X509 和 TLS 支持
      * X448（添加到 1.1.0 中现有的 X25519 支持）
      * 多素数 RSA
      * SM2
      * SM3
      * SM4
      * SipHash
      * ARIA（包括 TLS 支持）
  * 重大的侧信道攻击安全改进
  * 添加了一个新的 ClientHello 回调，以便在早期阶段调整 SSL 对象。
  * 添加了“最大片段长度”TLS 扩展协商和支持
  * 一个新的 STORE 模块，它实现了一个统一的、基于 URI 的存储读取器，该存储可以包含密钥、证书、CRL 和许多其他对象。
  * 将配置数据的显示移至 configdata.pm。
  * 允许将 GNU 风格的“make 变量”与 Configure 一起使用。
  * 声明了 OSSL 和 OPENSSL 的命名空间，表示为符号前缀
  * 重写了 devcrypto 引擎

OpenSSL 1.1.0
-------------

### OpenSSL 1.1.0k 和 OpenSSL 1.1.0l 之间的主要变更 [2019 年 9 月 10 日]

  * 修复了 PKCS7_dataDecode 和 CMS_decrypt_set1_pkey 中的填充预言 ([CVE-2019-1563])
  * 对于内置 EC 曲线，即使在解析显式参数时，也要确保使用从曲线名称构建的 EC_GROUP
  * 在 EC_GROUP 构建期间计算 ECC 余因子（如果未提供）([CVE-2019-1547])
  * 在 mingw 构建中使用 Windows 安装路径 ([CVE-2019-1552])

### OpenSSL 1.1.0j 和 OpenSSL 1.1.0k 之间的主要变更 [2019 年 5 月 28 日]

  * 防止 ChaCha20-Poly1305 中的非随机数过长 ([CVE-2019-1543])

### OpenSSL 1.1.0i 和 OpenSSL 1.1.0j 之间的主要变更 [2018 年 11 月 20 日]

  * DSA 签名生成中的时序漏洞 ([CVE-2018-0734])
  * ECDSA 签名生成中的时序漏洞 ([CVE-2018-0735])

### OpenSSL 1.1.0h 和 OpenSSL 1.1.0i 之间的主要变更 [2018 年 8 月 14 日]

  * 由于 DH 参数过大导致的客户端拒绝服务 ([CVE-2018-0732])
  * RSA 密钥生成中的缓存时序漏洞 ([CVE-2018-0737])

### OpenSSL 1.1.0g 和 OpenSSL 1.1.0h 之间的主要变更 [2018 年 3 月 27 日]

  * 具有递归定义的构造 ASN.1 类型可能超出堆栈 ([CVE-2018-0739])
  * HP-UX PA-RISC 上的 CRYPTO_memcmp 不正确 ([CVE-2018-0733])
  * x86_64 上的 rsaz_1024_mul_avx2 溢出错误 ([CVE-2017-3738])

### OpenSSL 1.1.0f 和 OpenSSL 1.1.0g 之间的主要变更 [2017 年 11 月 2 日]

  * x86_64 上的 bn_sqrx8x_internal 进位错误 ([CVE-2017-3736])
  * 格式错误的 X.509 IPAddressFamily 可能导致 OOB 读取 ([CVE-2017-3735])

### OpenSSL 1.1.0e 和 OpenSSL 1.1.0f 之间的主要变更 [2017 年 5 月 25 日]

  * config 现在识别 64 位 mingw 并选择 mingw64 而不是 mingw

### OpenSSL 1.1.0d 和 OpenSSL 1.1.0e 之间的主要变更 [2017 年 2 月 16 日]

  * 加密后 MAC 重新协商崩溃 ([CVE-2017-3733])

### OpenSSL 1.1.0c 和 OpenSSL 1.1.0d 之间的主要变更 [2017 年 1 月 26 日]

  * 截断的数据包可能因 OOB 读取而崩溃 ([CVE-2017-3731])
  * 不正确的 (EC)DHE 参数导致客户端崩溃 ([CVE-2017-3730])
  * BN_mod_exp 在 x86_64 上可能产生不正确的结果 ([CVE-2017-3732])

### OpenSSL 1.1.0b 和 OpenSSL 1.1.0c 之间的主要变更 [2016 年 11 月 10 日]

  * ChaCha20/Poly1305 堆缓冲区溢出 ([CVE-2016-7054])
  * CMS Null 解引用 ([CVE-2016-7053])
  * Montgomery 乘法可能产生不正确的结果 ([CVE-2016-7055])

### OpenSSL 1.1.0a 和 OpenSSL 1.1.0b 之间的主要变更 [2016 年 9 月 26 日]

  * 修复了大型消息尺寸的 Use After Free ([CVE-2016-6309])

### OpenSSL 1.1.0 和 OpenSSL 1.1.0a 之间的主要变更 [2016 年 9 月 22 日]

  * OCSP 状态请求扩展无界内存增长 ([CVE-2016-6304])
  * SSL_peek() 在空记录上挂起 ([CVE-2016-6305])
  * tls_get_message_header() 中过多的内存分配 ([CVE-2016-6307])
  * dtls1_preprocess_fragment() 中过多的内存分配 ([CVE-2016-6308])

### OpenSSL 1.0.2h 和 OpenSSL 1.1.0 之间的主要变更 [2016 年 8 月 25 日]

  * 版权文本已缩减为指向许可证的样板文件
  * “共享”构建现在是默认选项（如果可能）
  * 添加了对“流水线”的支持
  * 添加了 AFALG 引擎
  * 实现新的线程 API
  * 在 libcrypto 和 libssl 中添加了对 ChaCha20 和 Poly1305 的支持
  * 支持扩展主密钥
  * CCM 密码套件
  * 重构了测试套件，现在基于 perl、Test::Harness 和 Test::More
  * *大多数* libcrypto 和 libssl 公共结构已变为不透明，包括：
    BIGNUM 和相关类型、EC_KEY 和 EC_KEY_METHOD、
    DH 和 DH_METHOD、DSA 和 DSA_METHOD、RSA 和 RSA_METHOD、
    BIO 和 BIO_METHOD、EVP_MD_CTX、EVP_MD、EVP_CIPHER_CTX、
    EVP_CIPHER、EVP_PKEY 和相关类型、HMAC_CTX、
    X509、X509_CRL、X509_OBJECT、X509_STORE_CTX、X509_STORE、
    X509_LOOKUP、X509_LOOKUP_METHOD
  * libssl 内部结构已变为不透明
  * 删除了 SSLv2 支持
  * 删除了 Kerberos 密码套件支持
  * RC4 已从 libssl 的 DEFAULT 密码套件中移除
  * libssl 已移除 40 位和 56 位密码支持
  * 所有公共头文件已移至 include/openssl，不再使用符号链接
  * 重写了 SSL/TLS 状态机、版本协商和记录层
  * EC 修订：现在操作使用新的 EC_KEY_METHOD。
  * 在 libcrypto 中添加了对 OCB 模式的支持
  * 在 libcrypto 和 libssl 中添加了对异步加密操作的支持
  * 弃用的接口现在可以在构建时禁用，方法是相对于最新版本使用“no-deprecated”Configure 参数，或者通过“--api=1.1.0|1.0.0|0.9.8”选项。
  * 应用程序软件可以通过编译 -DOPENSSL_API_COMPAT=version 来确保不会暴露在该版本中弃用的功能。
  * 支持 RFC6698/RFC7671 DANE TLSA 对等认证
  * 更改了 Configure 以使用 --prefix 作为主要的安装目录位置，而不是 --openssldir。后者仅成为证书、私钥和 openssl.cnf 的目录。
  * 重构了 BIO 网络库，完全支持 IPv6。
  * 新的“统一”构建系统
  * 新的安全级别
  * 支持 scrypt 算法
  * 支持 X25519
  * 使用配置文件扩展了 SSL_CONF 支持
  * KDF 算法支持。将 TLS PRF 实现为 KDF。
  * 支持证书透明度
  * HKDF 支持。

OpenSSL 1.0.2
-------------

### 主要变更 OpenSSL 1.0.2s 和 OpenSSL 1.0.2t 之间 [2019 年 9 月 10 日]

  * 修复了 PKCS7_dataDecode 和 CMS_decrypt_set1_pkey 中的填充预言 ([CVE-2019-1563])
  * 对于内置 EC 曲线，确保即使在解析显式参数时也使用从曲线名称构建的 EC_GROUP
  * 在 EC_GROUP 构建期间计算 ECC 协因子（如果未提供） ([CVE-2019-1547])
  * 记录了 Windows 不同版本安装路径的问题 ([CVE-2019-1552])

### 主要变更 OpenSSL 1.0.2r 和 OpenSSL 1.0.2s 之间 [2019 年 5 月 28 日]

  * 无

### 主要变更 OpenSSL 1.0.2q 和 OpenSSL 1.0.2r 之间 [2019 年 2 月 26 日]

  * 0 字节记录填充预言 ([CVE-2019-1559])

### 主要变更 OpenSSL 1.0.2p 和 OpenSSL 1.0.2q 之间 [2018 年 11 月 20 日]

  * ECC 标量乘法中的微架构时序漏洞 ([CVE-2018-5407])
  * DSA 签名生成中的时序漏洞 ([CVE-2018-0734])

### 主要变更 OpenSSL 1.0.2o 和 OpenSSL 1.0.2p 之间 [2018 年 8 月 14 日]

  * 由于 DH 参数过大导致的客户端 DoS ([CVE-2018-0732])
  * RSA 密钥生成中的缓存时序漏洞 ([CVE-2018-0737])

### 主要变更 OpenSSL 1.0.2n 和 OpenSSL 1.0.2o 之间 [2018 年 3 月 27 日]

  * 具有递归定义的构造 ASN.1 类型可能超出堆栈 ([CVE-2018-0739])

### 主要变更 OpenSSL 1.0.2m 和 OpenSSL 1.0.2n 之间 [2017 年 12 月 7 日]

  * SSL 对象处于错误状态后进行读/写 ([CVE-2017-3737])
  * x86_64 上的 rsaz_1024_mul_avx2 溢出错误 ([CVE-2017-3738])

### 主要变更 OpenSSL 1.0.2l 和 OpenSSL 1.0.2m 之间 [2017 年 11 月 2 日]

  * x86_64 上的 bn_sqrx8x_internal 进位错误 ([CVE-2017-3736])
  * 格式错误的 X.509 IPAddressFamily 可能导致 OOB 读取 ([CVE-2017-3735])

### 主要变更 OpenSSL 1.0.2k 和 OpenSSL 1.0.2l 之间 [2017 年 5 月 25 日]

  * config 现在识别 64 位 mingw 并选择 mingw64 而不是 mingw

### 主要变更 OpenSSL 1.0.2j 和 OpenSSL 1.0.2k 之间 [2017 年 1 月 26 日]

  * 截断的数据包可能通过 OOB 读取导致崩溃 ([CVE-2017-3731])
  * BN_mod_exp 在 x86_64 上可能产生不正确的结果 ([CVE-2017-3732])
  * Montgomery 乘法可能产生不正确的结果 ([CVE-2016-7055])

### 主要变更 OpenSSL 1.0.2i 和 OpenSSL 1.0.2j 之间 [2016 年 9 月 26 日]

  * 缺少 CRL 健全性检查 ([CVE-2016-7052])

### 主要变更 OpenSSL 1.0.2h 和 OpenSSL 1.0.2i 之间 [2016 年 9 月 22 日]

  * OCSP 状态请求扩展无界内存增长 ([CVE-2016-6304])
  * SWEET32 缓解措施 ([CVE-2016-2183])
  * MDC2_Update() 中的 OOB 写入 ([CVE-2016-6303])
  * 格式错误的 SHA512 票证 DoS ([CVE-2016-6302])
  * BN_bn2dec() 中的 OOB 写入 ([CVE-2016-2182])
  * TS_OBJ_print_bio() 中的 OOB 读取 ([CVE-2016-2180])
  * 指针算术未定义行为 ([CVE-2016-2177])
  * DSA 签名中未保留的恒定时间标志 ([CVE-2016-2178])
  * DTLS 缓冲消息 DoS ([CVE-2016-2179])
  * DTLS 重放保护 DoS ([CVE-2016-2181])
  * 证书消息 OOB 读取 ([CVE-2016-6306])

### 主要变更 OpenSSL 1.0.2g 和 OpenSSL 1.0.2h 之间 [2016 年 5 月 3 日]

  * 防止 AES-NI CBC MAC 检查中的填充预言 ([CVE-2016-2107])
  * 修复 EVP_EncodeUpdate 溢出 ([CVE-2016-2105])
  * 修复 EVP_EncryptUpdate 溢出 ([CVE-2016-2106])
  * 防止 ASN.1 BIO 过度内存分配 ([CVE-2016-2109])
  * EBCDIC 过读 ([CVE-2016-2176])
  * 修改 ALPN 的行为，使其在 SNI/servername 回调之后调用回调，以便对 SSL_CTX 的更新会影响 ALPN。
  * 从 DEFAULT 密码列表中移除 LOW。这将从默认设置中移除单 DES。
  * 仅使用 no-ssl2-method 选项移除 SSLv2 方法。

### 主要变更 OpenSSL 1.0.2f 和 OpenSSL 1.0.2g 之间 [2016 年 3 月 1 日]

  * 在 OpenSSL 的默认构建中禁用 SSLv3 及以上版本中的弱密码。
  * 禁用 SSLv2 默认构建、默认协商和弱密码 ([CVE-2016-0800])
  * 修复 DSA 代码中的双重释放 ([CVE-2016-0705])
  * 禁用 SRP 伪造用户种子以解决服务器内存泄漏问题 ([CVE-2016-0798])
  * 修复 BN_hex2bn/BN_dec2bn NULL 指针解引用/堆损坏 ([CVE-2016-0797])
  * 修复 BIO_*printf 函数中的内存问题 ([CVE-2016-0799])
  * 修复模幂运算中的侧信道攻击 ([CVE-2016-0702])

### 主要变更 OpenSSL 1.0.2e 和 OpenSSL 1.0.2f 之间 [2016 年 1 月 28 日]

  * DH 小子群 ([CVE-2016-0701])
  * SSLv2 未阻止禁用密码 ([CVE-2015-3197])

### 主要变更 OpenSSL 1.0.2d 和 OpenSSL 1.0.2e 之间 [2015 年 12 月 3 日]

  * BN_mod_exp 在 x86_64 上可能产生不正确的结果 ([CVE-2015-3193])
  * 缺少 PSS 参数的证书验证崩溃 ([CVE-2015-3194])
  * X509_ATTRIBUTE 内存泄漏 ([CVE-2015-3195])
  * 重写 EVP_DecodeUpdate（base64 解码）以修复多个错误
  * 在 DSA_generate_parameters_ex 中，如果提供的种子太短，则返回错误

### 主要变更 OpenSSL 1.0.2c 和 OpenSSL 1.0.2d 之间 [2015 年 7 月 9 日]

  * 备用链证书伪造 ([CVE-2015-1793])
  * 处理 PSK 身份提示时的竞态条件 ([CVE-2015-3196])

### 主要变更 OpenSSL 1.0.2b 和 OpenSSL 1.0.2c 之间 [2015 年 6 月 12 日]

  * 修复 HMAC ABI 不兼容性

### 主要变更 OpenSSL 1.0.2a 和 OpenSSL 1.0.2b 之间 [2015 年 6 月 11 日]

  * 格式错误的 ECParameters 导致无限循环 ([CVE-2015-1788])
  * X509_cmp_time 中可利用的越界读取 ([CVE-2015-1789])
  * 缺少 EnvelopedContent 的 PKCS7 崩溃 ([CVE-2015-1790])
  * 未知哈希函数的 CMS 验证无限循环 ([CVE-2015-1792])
  * 处理 NewSessionTicket 时的竞态条件 ([CVE-2015-1791])

### 主要变更 OpenSSL 1.0.2 和 OpenSSL 1.0.2a 之间 [2015 年 3 月 19 日]

  * OpenSSL 1.0.2 ClientHello sigalgs DoS 修复 ([CVE-2015-0291])
  * 多块损坏指针修复 ([CVE-2015-0290])
  * DTLSv1_listen 中的段错误修复 ([CVE-2015-0207])
  * ASN1_TYPE_CMP 中的段错误修复 ([CVE-2015-0286])
  * 无效 PSS 参数的段错误修复 ([CVE-2015-0208])
  * ASN.1 结构重用内存损坏修复 ([CVE-2015-0287])
  * PKCS7 NULL 指针解引用修复 ([CVE-2015-0289])
  * SSLv2 服务器中可达断言的 DoS 修复 ([CVE-2015-0293])
  * 客户端身份验证和 DHE 的空 CKE ([CVE-2015-1787])
  * 未播种 PRNG 的握手修复 ([CVE-2015-0285])
  * d2i_ECPrivatekey 错误后的使用后释放修复 ([CVE-2015-0209])
  * X509_to_X509_REQ NULL 指针解引用修复 ([CVE-2015-0288])
  * 从 DEFAULT 密码中移除了导出密码

### 主要变更 OpenSSL 1.0.1l 和 OpenSSL 1.0.2 之间 [2015 年 1 月 22 日]

  * TLS 1.2 和 DTLS 1.2 的 Suite B 支持
  * 支持 DTLS 1.2
  * TLS 自动 EC 曲线选择。
  * 设置 TLS 支持的签名算法和曲线的 API
  * SSL_CONF 配置 API。
  * TLS Brainpool 支持。
  * ALPN 支持。
  * CMS 支持 RSA-PSS、RSA-OAEP、ECDH 和 X9.42 DH。

OpenSSL 1.0.1
-------------

### 主要变更 OpenSSL 1.0.1t 和 OpenSSL 1.0.1u 之间 [2016 年 9 月 22 日]

  * OCSP 状态请求扩展无界内存增长 ([CVE-2016-6304])
  * SWEET32 缓解措施 ([CVE-2016-2183])
  * MDC2_Update() 中的 OOB 写入 ([CVE-2016-6303])
  * 格式错误的 SHA512 票证 DoS ([CVE-2016-6302])
  * BN_bn2dec() 中的 OOB 写入 ([CVE-2016-2182])
  * TS_OBJ_print_bio() 中的 OOB 读取 ([CVE-2016-2180])
  * 指针算术未定义行为 ([CVE-2016-2177])
  * DSA 签名中未保留的恒定时间标志 ([CVE-2016-2178])
  * DTLS 缓冲消息 DoS ([CVE-2016-2179])
  * DTLS 重放保护 DoS ([CVE-2016-2181])
  * 证书消息 OOB 读取 ([CVE-2016-6306])

### 主要变更 OpenSSL 1.0.1s 和 OpenSSL 1.0.1t 之间 [2016 年 5 月 3 日]

  * 防止 AES-NI CBC MAC 检查中的填充预言 ([CVE-2016-2107])
  * 修复 EVP_EncodeUpdate 溢出 ([CVE-2016-2105])
  * 修复 EVP_EncryptUpdate 溢出 ([CVE-2016-2106])
  * 防止 ASN.1 BIO 过度内存分配 ([CVE-2016-2109])
  * EBCDIC 过读 ([CVE-2016-2176])
  * 修改 ALPN 的行为，使其在 SNI/servername 回调之后调用回调，以便对 SSL_CTX 的更新会影响 ALPN。
  * 从 DEFAULT 密码列表中移除 LOW。这将从默认设置中移除单 DES。
  * 仅使用 no-ssl2-method 选项移除 SSLv2 方法。

### 主要变更 OpenSSL 1.0.1r 和 OpenSSL 1.0.1s 之间 [2016 年 3 月 1 日]

  * 在 OpenSSL 的默认构建中禁用 SSLv3 及以上版本中的弱密码。
  * 禁用 SSLv2 默认构建、默认协商和弱密码 ([CVE-2016-0800])
  * 修复 DSA 代码中的双重释放 ([CVE-2016-0705])
  * 禁用 SRP 伪造用户种子以解决服务器内存泄漏问题 ([CVE-2016-0798])
  * 修复 BN_hex2bn/BN_dec2bn NULL 指针解引用/堆损坏 ([CVE-2016-0797])
  * 修复 BIO_*printf 函数中的内存问题 ([CVE-2016-0799])
  * 修复模幂运算中的侧信道攻击 ([CVE-2016-0702])

### 主要变更 OpenSSL 1.0.1q 和 OpenSSL 1.0.1r 之间 [2016 年 1 月 28 日]

  * 防止 DH 小子群攻击
  * SSLv2 未阻止禁用密码 ([CVE-2015-3197])

### 主要变更 OpenSSL 1.0.1p 和 OpenSSL 1.0.1q 之间 [2015 年 12 月 3 日]

  * 缺少 PSS 参数的证书验证崩溃 ([CVE-2015-3194])
  * X509_ATTRIBUTE 内存泄漏 ([CVE-2015-3195])
  * 重写 EVP_DecodeUpdate（base64 解码）以修复多个错误
  * 在 DSA_generate_parameters_ex 中，如果提供的种子太短，则返回错误

### 主要变更 OpenSSL 1.0.1o 和 OpenSSL 1.0.1p 之间 [2015 年 7 月 9 日]

  * 备用链证书伪造 ([CVE-2015-1793])
  * 处理 PSK 身份提示时的竞态条件 ([CVE-2015-3196])

### 主要变更 OpenSSL 1.0.1n 和 OpenSSL 1.0.1o 之间 [2015 年 6 月 12 日]

  * 修复 HMAC ABI 不兼容性

### 主要变更 OpenSSL 1.0.1m 和 OpenSSL 1.0.1n 之间 [2015 年 6 月 11 日]

  * 格式错误的 ECParameters 导致无限循环 ([CVE-2015-1788])
  * X509_cmp_time 中可利用的越界读取 ([CVE-2015-1789])
  * 缺少 EnvelopedContent 的 PKCS7 崩溃 ([CVE-2015-1790])
  * 未知哈希函数的 CMS 验证无限循环 ([CVE-2015-1792])
  * 处理 NewSessionTicket 时的竞态条件 ([CVE-2015-1791])

### 主要变更 OpenSSL 1.0.1l 和 OpenSSL 1.0.1m 之间 [2015 年 3 月 19 日]

  * ASN1_TYPE_CMP 中的段错误修复 ([CVE-2015-0286])
  * ASN.1 结构重用内存损坏修复 ([CVE-2015-0287])
  * PKCS7 NULL 指针解引用修复 ([CVE-2015-0289])
  * SSLv2 服务器中可达断言的 DoS 修复 ([CVE-2015-0293])
  * d2i_ECPrivatekey 错误后的使用后释放修复 ([CVE-2015-0209])
  * X509_to_X509_REQ NULL 指针解引用修复 ([CVE-2015-0288])
  * 从 DEFAULT 密码中移除了导出密码

### 主要变更 OpenSSL 1.0.1k 和 OpenSSL 1.0.1l 之间 [2015 年 1 月 15 日]

  * Windows 和 OpenVMS 平台的构建修复

### 主要变更 OpenSSL 1.0.1j 和 OpenSSL 1.0.1k 之间 [2015 年 1 月 8 日]

  * 修复 [CVE-2014-3571]
  * 修复 [CVE-2015-0206]
  * 修复 [CVE-2014-3569]
  * 修复 [CVE-2014-3572]
  * 修复 [CVE-2015-0204]
  * 修复 [CVE-2015-0205]
  * 修复 [CVE-2014-8275]
  * 修复 [CVE-2014-3570]

### 主要变更 OpenSSL 1.0.1i 和 OpenSSL 1.0.1j 之间 [2014 年 10 月 15 日]

  * 修复 [CVE-2014-3513]
  * 修复 [CVE-2014-3567]
  * 缓解 [CVE-2014-3566]（SSL 协议漏洞）
  * 修复 [CVE-2014-3568]

### 主要变更 OpenSSL 1.0.1h 和 OpenSSL 1.0.1i 之间 [2014 年 8 月 6 日]

  * 修复 [CVE-2014-3512]
  * 修复 [CVE-2014-3511]
  * 修复 [CVE-2014-3510]
  * 修复 [CVE-2014-3507]
  * 修复 [CVE-2014-3506]
  * 修复 [CVE-2014-3505]
  * 修复 [CVE-2014-3509]
  * 修复 [CVE-2014-5139]
  * 修复 [CVE-2014-3508]

### 主要变更 OpenSSL 1.0.1g 和 OpenSSL 1.0.1h 之间 [2014 年 6 月 5 日]

  * 修复 [CVE-2014-0224]
  * 修复 [CVE-2014-0221]
  * 修复 [CVE-2014-0198]
  * 修复 [CVE-2014-0195]
  * 修复 [CVE-2014-3470]
  * 修复 [CVE-2010-5298]

### 主要变更 OpenSSL 1.0.1f 和 OpenSSL 1.0.1g 之间 [2014 年 4 月 7 日]

  * 修复 [CVE-2014-0160]
  * 为有问题的服务器添加 TLS 填充扩展的变通方法。
  * 修复 [CVE-2014-0076]

### 主要变更 OpenSSL 1.0.1e 和 OpenSSL 1.0.1f 之间 [2014 年 1 月 6 日]

  * 不要在 TLS 服务器和客户端的随机值中包含 gmt_unix_time
  * 修复 TLS 记录篡改错误 ([CVE-2013-4353])
  * 修复 TLS 版本检查错误 ([CVE-2013-6449])
  * 修复 DTLS 重传错误 ([CVE-2013-6450])

### 主要变更 OpenSSL 1.0.1d 和 OpenSSL 1.0.1e 之间 [2013 年 2 月 11 日]

  * 修正了 ([CVE-2013-0169]) 的修复

### 主要变更 OpenSSL 1.0.1c 和 OpenSSL 1.0.1d 之间 [2013 年 2 月 4 日]

  * 通过使用正确的 TLS 版本修复 TLS 1.1、1.2 中的重新协商。
  * 包括 fips 配置模块。
  * 修复 OCSP 坏密钥 DoS 攻击 ([CVE-2013-0166])
  * 修复 SSL/TLS/DTLS CBC 明文恢复攻击 ([CVE-2013-0169])
  * 修复 TLS AESNI 记录处理缺陷 ([CVE-2012-2686])

### 主要变更 OpenSSL 1.0.1b 和 OpenSSL 1.0.1c 之间 [2012 年 5 月 10 日]

  * 修复 TLS/DTLS 记录长度检查错误 ([CVE-2012-2333])
  * 在 FIPS 模式下不尝试使用非 FIPS 复合密码。

### 主要变更 OpenSSL 1.0.1a 和 OpenSSL 1.0.1b 之间 [2012 年 4 月 26 日]

  * 修复非 x86 平台上的编译错误。
  * 使 FIPS 兼容的 OpenSSL 密码在非 FIPS 模式下工作。
  * 修复 OpenSSL 1.0.0 中 SSL_OP_NO_TLSv1_1 与 SSL_OP_ALL 的冲突

### 主要变更 OpenSSL 1.0.1 和 OpenSSL 1.0.1a 之间 [2012 年 4 月 19 日]

  * 修复 ASN1 溢出错误 ([CVE-2012-2110])
  * 针对某些在长客户端问候语时挂起的服务器的变通方法。
  * 修复 AES 代码中的 SEGV。

### 主要变更 OpenSSL 1.0.0h 和 OpenSSL 1.0.1 之间 [2012 年 3 月 14 日]

  * TLS/DTLS heartbeat 支持。
  * SCTP 支持。
  * RFC 5705 TLS 密钥材料导出器。
  * RFC 5764 DTLS-SRTP 协商。
  * 下一协议协商。
  * 证书、请求和 CRL 中的 PSS 签名。
  * 支持 CMS 的基于密码的收件人信息。
  * 支持 TLS v1.2 和 TLS v1.1。
  * 未经验证的 2.0 FIPS 模块的初步 FIPS 功能。
  * SRP 支持。

OpenSSL 1.0.0
-------------

### OpenSSL 1.0.0s 和 OpenSSL 1.0.0t 之间主要变更 [2015年12月3日]

  * X509_ATTRIBUTE 内存泄漏 (([CVE-2015-3195]))
  * 处理 PSK 身份提示的竞态条件 ([CVE-2015-3196])

### OpenSSL 1.0.0r 和 OpenSSL 1.0.0s 之间主要变更 [2015年6月11日]

  * 格式错误的 ECParameters 导致无限循环 ([CVE-2015-1788])
  * X509_cmp_time 中可利用的越界读取 ([CVE-2015-1789])
  * PKCS7 在缺少 EnvelopedContent 时崩溃 ([CVE-2015-1790])
  * CMS 验证在遇到未知哈希函数时无限循环 ([CVE-2015-1792])
  * 处理 NewSessionTicket 的竞态条件 ([CVE-2015-1791])

### OpenSSL 1.0.0q 和 OpenSSL 1.0.0r 之间主要变更 [2015年3月19日]

  * ASN1_TYPE_cmp 段错误修复 ([CVE-2015-0286])
  * ASN.1 结构重用内存损坏修复 ([CVE-2015-0287])
  * PKCS7 NULL 指针解引用修复 ([CVE-2015-0289])
  * 通过 SSLv2 服务器中可达到的断言导致拒绝服务修复 ([CVE-2015-0293])
  * d2i_ECPrivatekey 错误后使用已释放内存修复 ([CVE-2015-0209])
  * X509_to_X509_REQ NULL 指针解引用修复 ([CVE-2015-0288])
  * 从 DEFAULT 密码套件中移除了出口密码套件

### OpenSSL 1.0.0p 和 OpenSSL 1.0.0q 之间主要变更 [2015年1月15日]

  * Windows 和 OpenVMS 平台的构建修复

### OpenSSL 1.0.0o 和 OpenSSL 1.0.0p 之间主要变更 [2015年1月8日]

  * [CVE-2014-3571] 修复
  * [CVE-2015-0206] 修复
  * [CVE-2014-3569] 修复
  * [CVE-2014-3572] 修复
  * [CVE-2015-0204] 修复
  * [CVE-2015-0205] 修复
  * [CVE-2014-8275] 修复
  * [CVE-2014-3570] 修复

### OpenSSL 1.0.0n 和 OpenSSL 1.0.0o 之间主要变更 [2014年10月15日]

  * [CVE-2014-3513] 修复
  * [CVE-2014-3567] 修复
  * [CVE-2014-3566] (SSL 协议漏洞) 的缓解措施
  * [CVE-2014-3568] 修复

### OpenSSL 1.0.0m 和 OpenSSL 1.0.0n 之间主要变更 [2014年8月6日]

  * [CVE-2014-3510] 修复
  * [CVE-2014-3507] 修复
  * [CVE-2014-3506] 修复
  * [CVE-2014-3505] 修复
  * [CVE-2014-3509] 修复
  * [CVE-2014-3508] 修复

  OpenSSL 1.0.0m 中的已知问题：

  * EAP-FAST 和其他使用 tls_session_secret_cb 的应用程序
    将无法恢复会话。已在 1.0.0n-dev 中修复
  * s3_pkt.c 在某些平台上因缺少 `<limits.h>` 而编译失败。
    已在 1.0.0n-dev 中修复

### OpenSSL 1.0.0l 和 OpenSSL 1.0.0m 之间主要变更 [2014年6月5日]

  * [CVE-2014-0224] 修复
  * [CVE-2014-0221] 修复
  * [CVE-2014-0198] 修复
  * [CVE-2014-0195] 修复
  * [CVE-2014-3470] 修复
  * [CVE-2014-0076] 修复
  * [CVE-2010-5298] 修复

### OpenSSL 1.0.0k 和 OpenSSL 1.0.0l 之间主要变更 [2014年1月6日]

  * DTLS 重传错误修复 ([CVE-2013-6450])

### OpenSSL 1.0.0j 和 OpenSSL 1.0.0k 之间主要变更 [2013年2月5日]

  * SSL/TLS/DTLS CBC 明文恢复攻击修复 ([CVE-2013-0169])
  * OCSP 坏密钥拒绝服务攻击修复 ([CVE-2013-0166])

### OpenSSL 1.0.0i 和 OpenSSL 1.0.0j 之间主要变更 [2012年5月10日]

  * DTLS 记录长度检查错误修复 ([CVE-2012-2333])

### OpenSSL 1.0.0h 和 OpenSSL 1.0.0i 之间主要变更 [2012年4月19日]

  * ASN1 溢出错误修复 ([CVE-2012-2110])

### OpenSSL 1.0.0g 和 OpenSSL 1.0.0h 之间主要变更 [2012年3月12日]

  * CMS/PKCS#7 MMA 修复 ([CVE-2012-0884])
  * ([CVE-2011-4619]) 的修复已更正
  * 多项 DTLS 修复。

### OpenSSL 1.0.0f 和 OpenSSL 1.0.0g 之间主要变更 [2012年1月18日]

  * DTLS 拒绝服务问题修复 ([CVE-2012-0050])

### OpenSSL 1.0.0e 和 OpenSSL 1.0.0f 之间主要变更 [2012年1月4日]

  * DTLS 明文恢复攻击修复 ([CVE-2011-4108])
  * 清除 SSL 3.0 记录的块填充字节 ([CVE-2011-4576])
  * 只允许一次 SGC 握手重启 ([CVE-2011-4619])
  * 检查 GOST ENGINE 中的参数是否为 NULL ([CVE-2012-0027])
  * 检查格式错误的 RFC3779 数据 ([CVE-2011-4577])

### OpenSSL 1.0.0d 和 OpenSSL 1.0.0e 之间主要变更 [2011年9月6日]

  * CRL 漏洞问题修复 ([CVE-2011-3207])
  * ECDH 崩溃修复 ([CVE-2011-3210])
  * 防止 EC 时序攻击。
  * 支持使用 SHA2 算法的证书的 ECDH 密码套件。
  * 多项 DTLS 修复。

### OpenSSL 1.0.0c 和 OpenSSL 1.0.0d 之间主要变更 [2011年2月8日]

  * 安全问题修复 ([CVE-2011-0014])

### OpenSSL 1.0.0b 和 OpenSSL 1.0.0c 之间主要变更 [2010年12月2日]

  * 安全问题修复 ([CVE-2010-4180])
  * ([CVE-2010-4252]) 修复
  * 修复了对缺失的 EC 点格式扩展的处理不当问题。
  * 修复了多个平台编译问题。
  * 更正了安全问题 ([CVE-2010-3864]) 的修复。

### OpenSSL 1.0.0a 和 OpenSSL 1.0.0b 之间主要变更 [2010年11月16日]

  * 安全问题修复 ([CVE-2010-3864])。
  * ([CVE-2010-2939]) 修复
  * 修复了 GOST ENGINE 的 WIN32 构建系统。

### OpenSSL 1.0.0 和 OpenSSL 1.0.0a 之间主要变更 [2010年6月1日]

  * 安全问题修复 ([CVE-2010-1633])。
  * GOST MAC 和 CFB 修复。

### OpenSSL 0.9.8n 和 OpenSSL 1.0.0 之间主要变更 [2010年3月29日]

  * RFC3280 路径验证：足以处理 PKITS 测试。
  * 集成了对 PVK 文件和 keyblobs 的支持。
  * 将默认私钥格式更改为 PKCS#8。
  * CMS 支持：能够处理 RFC4134 中的所有示例
  * PKCS#7 和 CMS 的流式 ASN1 编码支持。
  * PKCS#7 和 CMS 的多个签名者和签名者添加支持。
  * ASN1 打印支持。
  * 添加了 Whirlpool 哈希算法。
  * RFC3161 时间戳支持。
  * 新的通用公钥 API，支持基于 ENGINE 的算法。
  * 新的通用公钥 API 工具。
  * 支持 GOST 算法的新 ENGINE。
  * SSL/TLS GOST 密码套件支持。
  * PKCS#7 和 CMS GOST 支持。
  * RFC4279 PSK 密码套件支持。
  * ECC 密码套件支持支持的点格式扩展。
  * ecdsa-with-SHA224/256/384/512 签名类型。
  * dsa-with-SHA224 和 dsa-with-SHA256 签名类型。
  * 不透明 PRF 输入 TLS 扩展支持。
  * 更新了时间例程以避免操作系统限制。

OpenSSL 0.9.x
-------------

### OpenSSL 0.9.8m 和 OpenSSL 0.9.8n 之间主要变更 [2010年3月24日]

  * CFB 密码定义修复。
  * 修复安全问题 [CVE-2010-0740] 和 [CVE-2010-0433]。

### OpenSSL 0.9.8l 和 OpenSSL 0.9.8m 之间主要变更 [2010年2月25日]

  * 密码定义修复。
  * 针对某些 WIN32 版本上 RAND_poll() 缓慢的临时解决方案。
  * 从算法表中移除 MD2。
  * SPKAC 处理修复。
  * 支持 RFC5746 TLS 重新协商扩展。
  * 压缩内存泄漏已修复。
  * 压缩会话恢复已修复。
  * Ticket 和 SNI 共存修复。
  * DTLS 处理的多项修复。

### OpenSSL 0.9.8k 和 OpenSSL 0.9.8l 之间主要变更 [2009年11月5日]

  * [CVE-2009-3555] 的临时解决方案：禁用重新协商。

### OpenSSL 0.9.8j 和 OpenSSL 0.9.8k 之间主要变更 [2009年3月25日]

  * 修复了多个构建问题。
  * 修复安全问题 [CVE-2009-0590]、[CVE-2009-0591]、[CVE-2009-0789]

### OpenSSL 0.9.8i 和 OpenSSL 0.9.8j 之间主要变更 [2009年1月7日]

  * 修复安全问题 ([CVE-2008-5077])
  * 合并 FIPS 140-2 分支代码。

### OpenSSL 0.9.8g 和 OpenSSL 0.9.8h 之间主要变更 [2008年5月28日]

  * CryptoAPI ENGINE 支持。
  * 多项预防措施。
  * 修复了影响证书请求创建的错误。
  * 支持 PKCS#12 文件中的本地计算机密钥集属性。

### OpenSSL 0.9.8f 和 OpenSSL 0.9.8g 之间主要变更 [2007年10月19日]

  * 将 CMS 功能移植到 0.9.8。
  * 修复了 0.9.8f 中引入的错误。

### OpenSSL 0.9.8e 和 OpenSSL 0.9.8f 之间主要变更 [2007年10月11日]

  * 添加 gcc 4.2 支持。
  * 添加了对 VC++ 构建的 AES 和 SSE2 汇编语言优化的支持
  * 支持在编译时显式选择的 RFC4507bis 和服务器名称扩展。
  * DTLS 改进。
  * RFC4507bis 支持。
  * TLS 扩展支持。

### OpenSSL 0.9.8d 和 OpenSSL 0.9.8e 之间主要变更 [2007年2月23日]

  * 多项密码套件选择修复。
  * RFC3779 支持。

### OpenSSL 0.9.8c 和 OpenSSL 0.9.8d 之间主要变更 [2006年9月28日]

  * 引入限制以防止恶意密钥拒绝服务 ([CVE-2006-2940])
  * 修复安全问题 [CVE-2006-2937]、[CVE-2006-3737]、[CVE-2006-4343]
  * 对密码套件选择算法的更改

### OpenSSL 0.9.8b 和 OpenSSL 0.9.8c 之间主要变更 [2006年9月5日]

  * 修复 Daniel Bleichenbacher 伪造签名攻击，[CVE-2006-4339]
  * 新密码 Camellia

### OpenSSL 0.9.8a 和 OpenSSL 0.9.8b 之间主要变更 [2006年5月4日]

  * 密码字符串修复。
  * VC++ 2005 修复。
  * 更新了 ECC 密码套件支持。
  * 新函数 EVP_CIPHER_CTX_new() 和 EVP_CIPHER_CTX_free()。
  * Zlib 压缩使用修复。
  * 在 Win32 上内置了动态引擎编译支持。
  * 修复了 Win32 中自动动态引擎加载。

### OpenSSL 0.9.8 和 OpenSSL 0.9.8a 之间主要变更 [2005年10月11日]

  * 修复潜在的 SSL 2.0 回滚漏洞 ([CVE-2005-2969])
  * 扩展了 Windows CE 支持

### OpenSSL 0.9.7g 和 OpenSSL 0.9.8 之间主要变更 [2005年7月5日]

  * 对 BIGNUM 库进行了大量工作，以提高效率并使操作更流畅、矛盾更少。这是对 BIGNUM 库进行大规模审计的结果。
  * 添加了用于 GF(2^m) 域和 NIST 曲线的 BIGNUM 函数，以支持椭圆加密函数。
  * 对椭圆加密进行了大量工作；添加了 ECDH 和 ECDSA，包括通过 EVP、X509 和 ENGINE 的使用。
  * 新的 ASN.1 小型编译器，可通过 OpenSSL 配置文件使用。
  * 添加了对 ASN.1 无限长度构造编码的支持。
  * 新的 PKCS#12 '中级' API，用于操作 PKCS#12 文件。
  * 通过单独的 Makefile.shared 完全重新构建了共享库的构建和链接程序（静态或共享库）。
  * 重新构建了 Makefile 之间参数的传递。
  * 更改了 ENGINE 框架，使其能够从指定的目录自动加载动态引擎模块。
  * CertificatePair 的新结构和 ASN.1 函数。
  * 将 ZLIB 压缩方法更改为有状态的。
  * 将密钥生成和素性测试的“进度”机制更改为接受包含计时器函数和参数的结构。
  * 新引擎模块：GMP（执行私钥指数运算）。
  * 新引擎模块：VIA C3 Nehemiah 处理器中的 VIA PadLOck ACE 扩展。
  * 在证书扩展中添加了对 IPv6 地址的支持。请参阅 RFC 1884，第 2.2 节。
  * 添加了对证书策略映射、策略约束和名称约束的支持。
  * 在 OpenSSL 配置文件中添加了对多值 AVA 的支持。
  * 在 'openssl ca' 索引文件中添加了对具有相同主题的多个证书的支持。
  * 使使用 'openssl ca -selfsign' 创建自签名证书成为可能。
  * 使使用 'openssl ca -create_serial' 生成序列号文件成为可能。
  * 具有扩展功能的新二进制搜索函数。
  * 新的 BUF 函数。
  * 新的 STORE 结构和库，用于提供与各种数据存储库的接口。支持存储公钥和私钥、证书、CRL、数字和任意二进制数据。此库不幸尚未完成，在 OpenSSL 中未使用。
  * 错误堆栈的新控件函数。
  * 更改了 PKCS#7 库以支持单次 S/MIME 处理。
  * 通过 OPENSSL_NO_DEPRECATED 宏或 config 和 Configure 脚本的 'no-deprecated' 参数，添加了在不使用旧弃用功能的情况下进行编译的可能性。
  * 所有 ASN.1 转换函数以及其他受影响函数的 const 化。
  * 改进了对 PowerPC 平台的支持。
  * 新的 FIPS 180-2 算法（SHA-224、-256、-384 和 -512）。
  * 新的 X509_VERIFY_PARAM 结构，用于支持 X.509 路径验证的参数化。
  * 对 Intel P4、IA-64 和 AMD64 上的 RC4 性能进行了重大改进。
  * 更改了 Configure 脚本，使某些算法默认禁用。可以使用新的 'enable-xxx' 参数形式显式启用它们。
  * 将 'openssl' 命令中的默认摘要从 MD5 更改为 SHA-1。
  * 添加了对 DTLS 的支持。
  * 新的 BIGNUM 盲化。
  * 添加了对 RSA-PSS 加密方案的支持
  * 添加了对 RSA X.931 填充的支持。
  * 在 NetWare 上添加了对 BSD 套接字的支持。
  * 添加了对大于 2GB 的文件的支持。
  * 添加了对 Win64 的初步支持。
  * 添加了备用的 pkg-config 文件。

### OpenSSL 0.9.7l 和 OpenSSL 0.9.7m 之间主要变更 [2007年2月23日]

  * FIPS 1.1.1 模块链接。
  * 多项密码套件选择修复。

### OpenSSL 0.9.7k 和 OpenSSL 0.9.7l 之间主要变更 [2006年9月28日]

  * 引入限制以防止恶意密钥拒绝服务 ([CVE-2006-2940])
  * 修复安全问题 [CVE-2006-2937]、[CVE-2006-3737]、[CVE-2006-4343]

### OpenSSL 0.9.7j 和 OpenSSL 0.9.7k 之间主要变更 [2006年9月5日]

  * 修复 Daniel Bleichenbacher 伪造签名攻击，[CVE-2006-4339]

### OpenSSL 0.9.7i 和 OpenSSL 0.9.7j 之间主要变更 [2006年5月4日]

  * Visual C++ 2005 修复。
  * 更新了 FIPS 的 Windows 构建系统。

### OpenSSL 0.9.7h 和 OpenSSL 0.9.7i 之间主要变更 [2005年10月14日]

  * 将 EVP_MAX_MD_SIZE 设置为旧值，FIPS 构建除外。

### OpenSSL 0.9.7g 和 OpenSSL 0.9.7h 之间主要变更 [2005年10月11日]

  * 修复 SSL 2.0 回滚漏洞 ([CVE-2005-2969])
  * 允许对 DSA 签名使用固定长度指数
  * 默认使用固定窗口 RSA、DSA、DH 私钥操作

### OpenSSL 0.9.7f 和 OpenSSL 0.9.7g 之间主要变更 [2005年4月11日]

  * 修复了更多编译问题。
  * 适应更现代的 Kerberos API。
  * 增强或修正了 Solaris64、Mingw 和 Cygwin 的配置。
  * 增强了 x86_64 汇编器 BIGNUM 模块。
  * 更多的 const 化。
  * 添加了对代理证书（RFC 3820）的处理。

### OpenSSL 0.9.7e 和 OpenSSL 0.9.7f 之间主要变更 [2005年3月22日]

  * 修复了几个编译问题。
  * 添加了许多内存分配失败检查。
  * 改进了 X509 名称类型的比较。
  * 对证书进行了强制性基本检查。
  * 性能改进。

### OpenSSL 0.9.7d 和 OpenSSL 0.9.7e 之间主要变更 [2004年10月25日]

  * 修复了 CRL 检查代码中的竞态条件。
  * 修复了 PKCS#7 (S/MIME) 代码。

### OpenSSL 0.9.7c 和 OpenSSL 0.9.7d 之间主要变更 [2004年3月17日]

  * 安全：修复 Kerberos 密码套件 SSL/TLS 握手错误
  * 安全：修复 do_change_cipher_spec() 中的空指针赋值
  * 允许 CA 索引中存在具有相同主题的多个活动证书
  * 多项 X509 验证修复
  * 加快 HMAC 和其他操作的速度

### OpenSSL 0.9.7b 和 OpenSSL 0.9.7c 之间主要变更 [2003年9月30日]

  * 安全：修复各种 ASN1 解析错误。
  * OCSP 工具新增 -ignore_err 选项。
  * S/MIME 代码中的各种互操作性和错误修复。
  * SSL/TLS 协议修复，用于处理未请求的客户端证书。

### OpenSSL 0.9.7a 和 OpenSSL 0.9.7b 之间主要变更 [2003年4月10日]

  * 安全：对抗 Klima-Pokorny-Rosa 对 Bleichbacher 攻击的扩展
  * 安全：将 RSA 盲化设为默认值。
  * 配置：修复 Irix、AIX，改进 mingw 支持。
  * 支持新平台：linux-ia64-ecc。
  * 构建：共享库支持修复。
  * ASN.1：正确处理 domainComponent。
  * 文档：修复和补充。

### OpenSSL 0.9.7 和 OpenSSL 0.9.7a 之间主要变更 [2003年2月19日]

  * 安全：重要的安全相关错误修复。
  * 增强了与 MIT Kerberos 的兼容性。
  * 可以不构建 ENGINE 框架。
  * IA32 汇编器增强。
  * 支持新平台：FreeBSD/IA64 和 FreeBSD/Sparc64。
  * 配置：no-err 选项现在可以正常工作。
  * SSL/TLS：现在可以处理手动证书链构建。
  * SSL/TLS：修正了某些会话 ID 故障。

### OpenSSL 0.9.6 和 OpenSSL 0.9.7 之间主要变更 [2002年12月30日]

  * 新的库部分 OCSP。
  * 完全重写了 ASN1 代码。
  * 在 verify 代码和 openssl 工具中进行 CRL 检查。
  * 'ca' 工具中的扩展复制。
  * 'ca' 工具中的灵活显示选项。
  * 对 UTF8 国际字符的临时支持。
  * 外部加密设备（'engine'）的支持不再是单独的分发。
  * 新的椭圆曲线库部分。
  * 新的 AES (Rijndael) 库部分。
  * 支持新平台：Windows CE、Tandem OSS、A/UX、AIX 64 位、
    Linux x86_64、Linux 64 位 Sparc v9
  * 扩展了对某些平台的支持：VxWorks
  * 增强了对共享库的支持。
  * 现在仅在请求共享库支持时才构建 PIC 代码。
  * 支持 pkg-config。
  * 大量新手册。
  * 创建手册的符号链接或副本，以涵盖所有描述的功能。
  * 更改 DES API 以清理命名空间（某些应用程序也链接到提供同名函数的 libdes）。
    提供向后兼容的宏（将来将被删除）。
  * 统一处理加密算法（软件和引擎），可通过 EVP 例程用于非对称和对称密码。
  * NCONF：新的配置处理例程。
  * 更改 API 以使用更多 'const' 修饰符，以改进错误检查并帮助优化器。
  * 最终移除对 RSAref 的引用。
  * 重构了 BIGNUM 代码的部分内容。
  * 支持新引擎：Broadcom ubsec、加速加密处理、IBM 4758。
  * 在 demos 区域添加了一些新引擎。
  * 扩展和修正了 OID（对象标识符）表。
  * PRNG：在更多位置查询随机设备，在多个位置自动查询 EGD 风格的随机源。
  * SSL/TLS：允许根据服务器偏好进行可选的密码选择。
  * SSL/TLS：允许服务器显式设置新的会话 ID。
  * SSL/TLS：支持 Kerberos 密码套件（RFC2712）。
    目前仅支持 MIT Kerberos。
  * SSL/TLS：允许更精确地控制重新协商和会话。
  * SSL/TLS：添加回调以检索 SSL/TLS 消息。
  * SSL/TLS：支持 AES 密码套件（RFC3268）。

### OpenSSL 0.9.6j 和 OpenSSL 0.9.6k 之间主要变更 [2003年9月30日]

  * 安全：修复各种 ASN1 解析错误。
  * SSL/TLS 协议修复，用于处理未请求的客户端证书。

### OpenSSL 0.9.6i 和 OpenSSL 0.9.6j 之间主要变更 [2003年4月10日]

  * 安全：对抗 Klima-Pokorny-Rosa 对 Bleichbacher 攻击的扩展
  * 安全：将 RSA 盲化设为默认值。
  * 构建：共享库支持修复。

### OpenSSL 0.9.6h 和 OpenSSL 0.9.6i 之间主要变更 [2003年2月19日]

  * 重要的安全相关错误修复。

### OpenSSL 0.9.6g 和 OpenSSL 0.9.6h 之间主要变更 [2002年12月5日]

  * Tandem OSS 和 A/UX 的新配置目标。
  * Microsoft 属性的新 OID。
  * 更好地处理 SSL 会话缓存。
  * 更好地比较区分名称。
  * 在混合 GNU/非 GNU 环境中更好地处理共享库。
  * 支持 Borland C 的汇编器代码。
  * 长度问题修复。
  * 未初始化变量修复。
  * 内存泄漏、一些异常崩溃和一些竞态条件修复。
  * 较小的构建问题修复。
  * 更新了手册、FAQ 和其他说明性文档。

### OpenSSL 0.9.6f 和 OpenSSL 0.9.6g 之间主要变更 [2002年8月9日]

  * Unix 上的重要构建修复。

### OpenSSL 0.9.6e 和 OpenSSL 0.9.6f 之间主要变更 [2002年8月8日]

  * 多项重要的错误修复。

### OpenSSL 0.9.6d 和 OpenSSL 0.9.6e 之间主要变更 [2002年7月30日]

  * 重要的安全相关错误修复。
  * 多项 SSL/TLS 库错误修复。

### OpenSSL 0.9.6c 和 OpenSSL 0.9.6d 之间主要变更 [2002年5月9日]

  * 多项 SSL/TLS 库错误修复。
  * 修复了 DH 参数生成中的“非标准”生成器。

### OpenSSL 0.9.6b 和 OpenSSL 0.9.6c 之间主要变更 [2001年12月21日]

  * 多项 SSL/TLS 库错误修复。
  * BIGNUM 库修复。
  * RSA OAEP 和随机数生成修复。
  * 对象标识符已更正和添加。
  * 为 IA64 添加了汇编器 BN 例程。
  * 添加了对 OS/390 Unix、带 gcc 的 UnixWare、OpenUNIX 8、
    MIPS Linux 的支持；为 Irix、HP-UX 添加了共享库支持。
  * 为 AEP、Baltimore SureWare、
    Broadcom 和 Cryptographic Appliance 的密钥服务器添加了加密加速器支持
    [在 0.9.6c-engine 版本中]。

### OpenSSL 0.9.6a 和 OpenSSL 0.9.6b 之间主要变更 [2001年7月9日]

  * 安全修复：PRNG 改进。
  * 安全修复：RSA OAEP 检查。
  * 安全修复：重新插入并修复了 Bleichbacher 攻击的对策。
  * MIPS BIGNUM 错误修复。
  * "openssl enc" 中的错误修复。
  * X.509 打印例程中的错误修复。
  * DSA 验证例程和 DSA S/MIME 验证中的错误修复。
  * 使 PRNG 线程安全的错误修复。
  * RAND_file_name() 中的错误修复。
  * 兼容模式信任设置中的错误修复。
  * blowfish EVP 中的错误修复。
  * 增加了 BIO 缓冲过滤器的大小。
  * 某些脚本中的兼容性修复。

### OpenSSL 0.9.6 和 OpenSSL 0.9.6a 之间主要变更 [2001年4月5日]

  * 安全修复：更改 OpenSSL 的行为，避免在以 root 身份运行时使用环境变量。
  * 安全修复：检查 RSA-CRT 的结果，以减少从不正确计算的签名推断私钥的可能性。
  * 安全修复：防止 Bleichbacher 的 DSA 攻击。
  * 安全修复：在 DH 密码套件中，在导出主密钥后将预主密钥清零。
  * 重新实现了 SSL_peek()，它存在各种问题。
  * 兼容性修复：函数 des_encrypt() 重命名为 des_encrypt1()，以避免与某些 Unixen libc 冲突。
  * Win32、HP/UX 和 Irix 的错误修复。
  * BIGNUM、SSL、PKCS#7、PKCS#12、X.509、CONF 和内存检查例程中的错误修复。
  * 线程化环境中的 RSA 操作错误修复。
  * 杂项 openssl 应用程序中的错误修复。
  * 移除了几个潜在的内存泄漏。
  * 添加了对 BIGNUM 例程的更严格检查。
  * 共享库支持已重构以实现通用性。
  * 更多文档。
  * 新函数 BN_rand_range()。
  * 向 openssl s_client 和 s_server 添加了 "-rand" 选项。

### OpenSSL 0.9.5a 和 OpenSSL 0.9.6 之间主要变更 [2000年10月10日]

  * BIO 和 SSL 库的一些文档。
  * 使用密钥标识符增强了链验证。
  * 'dgst' 应用程序的新签名和验证选项。
  * 'smime' 应用程序支持 DER 和 PEM 编码的消息。
  * 新的 'rsautl' 应用程序，低级 RSA 工具。
  * 已包含 MD4。
  * SSL 回滚填充检查的错误修复。
  * 支持外部加密设备 [1]。
  * 增强的 EVP 接口。

  [1] 对外部加密设备的支持目前是单独分发的。请参阅 README-Engine.md 文件。

### OpenSSL 0.9.5 和 OpenSSL 0.9.5a 之间主要变更 [2000年4月1日]

  * Win32、SuSE Linux、NeXTSTEP 和 FreeBSD 2.2.8 的错误修复
  * HPUX 和 Solaris-gcc 的共享库支持
  * 支持 Linux/IA64
  * Mingw32 的汇编器支持
  * 新的 'rand' 应用程序
  * 从脚本检查算法存在的新方法

### OpenSSL 0.9.4 和 OpenSSL 0.9.5 之间主要变更 [2000年5月25日]

  * 新的 'smime' 命令中的 S/MIME 支持
  * OpenSSL 命令行应用程序的文档
  * 'req' 应用程序的自动化
  * 修复使 s_client、s_server 在 Windows 下工作
  * 支持 SPKAC 中的多个字段名
  * 新的 SPKAC 命令行实用程序和相关的库函数
  * 允许从各种来源获取密码的选项
  * 新的公钥 PEM 格式和处理它的选项
  * 命令行实用程序的许多其他修复和增强
  * 可用的证书链验证
  * 证书用途检查
  * 证书信任设置
  * 支持权威信息访问扩展
  * 证书请求中的扩展
  * 简化的 X509 名称和属性例程
  * 国际字符集的初步（不完整）支持
  * 新的 DH_METHOD、DSA_METHOD 和增强的 RSA_METHOD
  * 只读内存 BIO 和简化的创建函数
  * TLS/SSL 协议错误修复：接受 SSL 3.0 记录中的 TLS 'client hello'；允许握手和其他数据的分片和交错
  * TLS/SSL 代码现在“容忍”MS SGC
  * 针对 Netscape 客户端证书挂起错误的解决方法
  * RSA_NULL 选项，它移除 RSA 专利代码但保留其他 RSA 功能
  * 内存泄漏检测现在允许应用程序通过每个线程堆栈添加额外信息
  * PRNG 鲁棒性得到改进
  * EGD 支持
  * BIGNUM 库错误修复
  * 更快的 DSA 参数生成
  * 增强了对 Alpha Linux 的支持
  * 实验性的 macOS 支持

### OpenSSL 0.9.3 和 OpenSSL 0.9.4 之间主要变更 [1999年8月9日]

  * 对 PKCS#8 格式私钥的透明支持：这些私钥被许多软件包使用，并且比标准格式更安全
  * PKCS#5 v2.0 实现
  * 密码回调函数现在有一个新的 void * 参数用于应用程序数据
  * 避免各种内存泄漏
  * 新的类似管道的 BIO，允许在必须由应用程序处理实际 I/O 时使用 SSL 库（BIO 对）

### OpenSSL 0.9.2b 和 OpenSSL 0.9.3 之间主要变更 [1999年5月24日]

  * 对配置机制进行了大量增强和清理
  * RSA OEAP 相关修复
  * 添加了 "openssl ca -revoke" 选项用于撤销证书
  * 源清理：const 正确性、类型安全的堆栈和 ASN.1 SETs
  * 源树清理：删除了大量过时文件
  * Thawte SXNet、证书策略和 CRL 分发点扩展支持
  * 初步（实验性）S/MIME 支持
  * 支持 ASN.1 UTF8String 和 VisibleString
  * PKCS#12 代码的完全集成
  * Sparc 汇编器 bignum 实现，优化的哈希函数
  * 禁用选定密码的选项

### OpenSSL 0.9.1c 和 OpenSSL 0.9.2b 之间主要变更 [1999年3月22日]

  * 修复了与会话恢复相关的安全漏洞
  * 修复了 p < q 情况下的 RSA 加密例程
  * 密码列表中的 "ALL" 现在表示“除 NULL 密码外所有内容”
  * 支持 Triple-DES CBCM 密码
  * 支持 RSA 的最优非对称加密填充 (OAEP)
  * 对新 TLSv1 密码的首次支持
  * 添加了几个新的 BIO（syslog BIO、可靠 BIO）
  * 扩展了对 DSA 证书/密钥的支持。
  * 扩展了对证书签名请求 (CSR) 的支持
  * 对 X.509v3 扩展的初步支持
  * 扩展了对 SSL 记录层内压缩的支持
  * 彻底检查了 Win32 构建
  * 对大数 (BN) 库的清理和修复
  * 支持 ASN.1 GeneralizedTime
  * 将 ASN.1 SETs 与 SEQUENCEs 分开
  * Netscape 证书序列的 ASN1 和 PEM 支持
  * 彻底检查了 Perl 接口
  * 大量源树清理。
  * 大量内存泄漏修复。
  * 大量错误修复。

### SSLeay 0.9.0b 和 OpenSSL 0.9.1c 之间主要变更 [1998年12月23日]

  * 集成了流行的 NO_RSA/NO_DSA 补丁
  * 对 SSL 记录层内压缩的初步支持
  * 添加了 BIO 代理和过滤功能
  * 扩展了大数 (BN) 库
  * 添加了 RIPE MD160 消息摘要
  * 添加了对 RC2/64 位密码的支持
  * 扩展了 ASN.1 解析例程
  * 对 CVS 的源树调整
  * 支持各种新平台

<!-- Links -->
[CHANGES.md]: ./CHANGES.md
[CMVP]: https://csrc.nist.gov/projects/cryptographic-module-validation-program
[CVE-2005-2969]: https://openssl-library.org/news/vulnerabilities/#CVE-2005-2969
[CVE-2006-2937]: https://openssl-library.org/news/vulnerabilities/#CVE-2006-2937
[CVE-2006-2940]: https://openssl-library.org/news/vulnerabilities/#CVE-2006-2940
[CVE-2006-3737]: https://openssl-library.org/news/vulnerabilities/#CVE-2006-3737
[CVE-2006-4339]: https://openssl-library.org/news/vulnerabilities/#CVE-2006-4339
[CVE-2006-4343]: https://openssl-library.org/news/vulnerabilities/#CVE-2006-4343
[CVE-2008-5077]: https://openssl-library.org/news/vulnerabilities/#CVE-2008-5077
[CVE-2009-0590]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-0590
[CVE-2009-0591]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-0591
[CVE-2009-0789]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-0789
[CVE-2009-3555]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-3555
[CVE-2010-0433]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-0433
[CVE-2010-0740]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-0740
[CVE-2010-1633]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-1633
[CVE-2010-2939]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-2939
[CVE-2010-3864]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-3864
[CVE-2010-4180]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-4180
[CVE-2010-4252]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-4252
[CVE-2010-5298]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-5298
[CVE-2011-0014]: https://openssl-library.org/news/vulnerabilities/#CVE-2011-0014
[CVE-2011-3207]: https://openssl-library.org/news/vulnerabilities/#CVE-2011-3207
[CVE-2011-3210]: https://openssl-library.org/news/vulnerabilities/#CVE-2011-3210
[CVE-2011-4108]: https://openssl-library.org/news/vulnerabilities/#CVE-2011-4108
[CVE-2011-4576]: https://openssl-library.org/news/vulnerabilities/#CVE-2011-4576
[CVE-2011-4577]: https://openssl-library.org/news/vulnerabilities/#CVE-2011-4577
[CVE-2011-4619]: https://openssl-library.org/news/vulnerabilities/#CVE-2011-4619
[CVE-2012-0027]: https://openssl-library.org/news/vulnerabilities/#CVE-2012-0027
[CVE-2012-0050]: https://openssl-library.org/news/vulnerabilities/#CVE-2012-0050
[CVE-2012-0884]: https://openssl-library.org/news/vulnerabilities/#CVE-2012-0884
[CVE-2012-2110]: https://openssl-library.org/news/vulnerabilities/#CVE-2012-2110
[CVE-2012-2333]: https://openssl-library.org/news/vulnerabilities/#CVE-2012-2333
[CVE-2012-2686]: https://openssl-library.org/news/vulnerabilities/#CVE-2012-2686
[CVE-2013-0166]: https://openssl-library.org/news/vulnerabilities/#CVE-2013-0166
[CVE-2013-0169]: https://openssl-library.org/news/vulnerabilities/#CVE-2013-0169
[CVE-2013-4353]: https://openssl-library.org/news/vulnerabilities/#CVE-2013-4353
[CVE-2013-6449]: https://openssl-library.org/news/vulnerabilities/#CVE-2013-6449
[CVE-2013-6450]: https://openssl-library.org/news/vulnerabilities/#CVE-2013-6450
[CVE-2014-0076]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-0076
[CVE-2014-0160]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-0160
[CVE-2014-0195]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-0195
[CVE-2014-0198]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-0198
[CVE-2014-0221]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-0221
[CVE-2014-0224]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-0224
[CVE-2014-3470]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3470
[CVE-2014-3505]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3505
[CVE-2014-3506]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3506
[CVE-2014-3507]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3507
[CVE-2014-3508]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3508
[CVE-2014-3509]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3509
[CVE-2014-3510]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3510
[CVE-2014-3511]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3511
[CVE-2014-3512]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3512
[CVE-2014-3513]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3513
[CVE-2014-3566]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3566
[CVE-2014-3567]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3567
[CVE-2014-3568]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3568
[CVE-2014-3569]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3569
[CVE-2014-3570]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3570
[CVE-2014-3571]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3571
[CVE-2014-3572]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-3572
[CVE-2014-5139]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-5139
[CVE-2014-8275]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-8275
[CVE-2015-0204]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0204
[CVE-2015-0205]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0205
[CVE-2015-0206]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0206
[CVE-2015-0207]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0207
[CVE-2015-0208]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0208
[CVE-2015-0209]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0209
[CVE-2015-0285]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0285
[CVE-2015-0286]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0286
[CVE-2015-0287]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0287
[CVE-2015-0288]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0288
[CVE-2015-0289]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0289
[CVE-2015-0290]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0290
[CVE-2015-0291]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0291
[CVE-2015-0293]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-0293
[CVE-2015-1787]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-1787
[CVE-2015-1788]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-1788
[CVE-2015-1789]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-1789
[CVE-2015-1790]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-1790
[CVE-2015-1791]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-1791
[CVE-2015-1792]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-1792
[CVE-2015-1793]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-1793
[CVE-2015-3193]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-3193
[CVE-2015-3194]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-3194
[CVE-2015-3195]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-3195
[CVE-2015-3196]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-3196
[CVE-2015-3197]: https://openssl-library.org/news/vulnerabilities/#CVE-2015-3197
[CVE-2016-0701]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-0701
[CVE-2016-0702]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-0702
[CVE-2016-0705]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-0705
[CVE-2016-0797]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-0797
[CVE-2016-0798]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-0798
[CVE-2016-0799]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-0799
[CVE-2016-0800]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-0800
[CVE-2016-2105]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-2105
[CVE-2016-2106]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-2106
[CVE-2016-2107]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-2107
[CVE-2016-2109]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-2109
[CVE-2016-2176]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-2176
[CVE-2016-2177]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-2177
[CVE-2016-2178]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-2178
[CVE-2016-2179]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-2179
[CVE-2016-2180]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-2180
[CVE-2016-2181]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-2181
[CVE-2016-2182]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-2182
[CVE-2016-2183]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-2183
[CVE-2016-6302]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-6302
[CVE-2016-6303]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-6303
[CVE-2016-6304]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-6304
[CVE-2016-6305]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-6305
[CVE-2016-6306]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-6306
[CVE-2016-6307]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-6307
[CVE-2016-6308]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-6308
[CVE-2016-6309]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-6309
[CVE-2016-7052]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-7052
[CVE-2016-7053]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-7053
[CVE-2016-7054]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-7054
[CVE-2016-7055]: https://openssl-library.org/news/vulnerabilities/#CVE-2016-7055
[CVE-2017-3730]: https://openssl-library.org/news/vulnerabilities/#CVE-2017-3730
[CVE-2017-3731]: https://openssl-library.org/news/vulnerabilities/#CVE-2017-3731
[CVE-2017-3732]: https://openssl-library.org/news/vulnerabilities/#CVE-2017-3732
[CVE-2017-3733]: https://openssl-library.org/news/vulnerabilities/#CVE-2017-3733
[CVE-2017-3735]: https://openssl-library.org/news/vulnerabilities/#CVE-2017-3735
[CVE-2017-3736]: https://openssl-library.org/news/vulnerabilities/#CVE-2017-3736
[CVE-2017-3737]: https://openssl-library.org/news/vulnerabilities/#CVE-2017-3737
[CVE-2017-3738]: https://openssl-library.org/news/vulnerabilities/#CVE-2017-3738
[CVE-2018-0732]: https://openssl-library.org/news/vulnerabilities/#CVE-2018-0732
[CVE-2018-0733]: https://openssl-library.org/news/vulnerabilities/#CVE-2018-0733
[CVE-2018-0734]: https://openssl-library.org/news/vulnerabilities/#CVE-2018-0734
[CVE-2018-0735]: https://openssl-library.org/news/vulnerabilities/#CVE-2018-0735
[CVE-2018-0737]: https://openssl-library.org/news/vulnerabilities/#CVE-2018-0737
[CVE-2018-0739]: https://openssl-library.org/news/vulnerabilities/#CVE-2018-0739
[CVE-2018-5407]: https://openssl-library.org/news/vulnerabilities/#CVE-2018-5407
[CVE-2019-1543]: https://openssl-library.org/news/vulnerabilities/#CVE-2019-1543
[CVE-2019-1547]: https://openssl-library.org/news/vulnerabilities/#CVE-2019-1547
[CVE-2019-1549]: https://openssl-library.org/news/vulnerabilities/#CVE-2019-1549
[CVE-2019-1551]: https://openssl-library.org/news/vulnerabilities/#CVE-2019-1551
[CVE-2019-1552]: https://openssl-library.org/news/vulnerabilities/#CVE-2019-1552
[CVE-2019-1559]: https://openssl-library.org/news/vulnerabilities/#CVE-2019-1559
[CVE-2019-1563]: https://openssl-library.org/news/vulnerabilities/#CVE-2019-1563
[CVE-2020-1967]: https://openssl-library.org/news/vulnerabilities/#CVE-2020-1967
[CVE-2020-1971]: https://openssl-library.org/news/vulnerabilities/#CVE-2020-1971
[CVE-2022-2097]: https://openssl-library.org/news/vulnerabilities/#CVE-2022-2097
[CVE-2022-2274]: https://openssl-library.org/news/vulnerabilities/#CVE-2022-2274
[CVE-2022-3996]: https://openssl-library.org/news/vulnerabilities/#CVE-2022-3996
[CVE-2022-4203]: https://openssl-library.org/news/vulnerabilities/#CVE-2022-4203
[CVE-2022-4304]: https://openssl-library.org/news/vulnerabilities/#CVE-2022-4304
[CVE-2022-4450]: https://openssl-library.org/news/vulnerabilities/#CVE-2022-4450
[CVE-2023-0215]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-0215
[CVE-2023-0216]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-0216
[CVE-2023-0217]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-0217
[CVE-2023-0286]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-0286
[CVE-2023-0401]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-0401
[CVE-2023-0464]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-0464
[CVE-2023-0465]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-0465
[CVE-2023-0466]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-0466
[CVE-2023-1255]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-1255
[CVE-2023-2650]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-2650
[CVE-2023-2975]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-2975
[CVE-2023-3446]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-3446
[CVE-2023-3817]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-3817
[CVE-2023-4807]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-4807
[CVE-2023-5363]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-5363
[CVE-2023-5678]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-5678
[CVE-2023-6129]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-6129
[CVE-2023-6237]: https://openssl-library.org/news/vulnerabilities/#CVE-2023-6237
[CVE-2024-0727]: https://openssl-library.org/news/vulnerabilities/#CVE-2024-0727
[CVE-2024-2511]: https://openssl-library.org/news/vulnerabilities/#CVE-2024-2511
[CVE-2024-4603]: https://openssl-library.org/news/vulnerabilities/#CVE-2024-4603
[CVE-2024-4741]: https://openssl-library.org/news/vulnerabilities/#CVE-2024-4741
[CVE-2024-5535]: https://openssl-library.org/news/vulnerabilities/#CVE-2024-5535
[CVE-2024-6119]: https://openssl-library.org/news/vulnerabilities/#CVE-2024-6119
[CVE-2024-9143]: https://openssl-library.org/news/vulnerabilities/#CVE-2024-9143
[CVE-2024-13176]: https://openssl-library.org/news/vulnerabilities/#CVE-2024-13176
[CVE-2025-4575]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-4575
[CVE-2025-9230]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-9230
[CVE-2025-9231]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-9231
[CVE-2025-9232]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-9232
[CVE-2025-11187]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-11187
[CVE-2025-15467]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-15467
[CVE-2025-15468]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-15468
[CVE-2025-15469]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-15469
[CVE-2025-66199]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-66199
[CVE-2025-68160]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-68160
[CVE-2025-69418]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-69418
[CVE-2025-69419]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-69419
[CVE-2025-69420]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-69420
[CVE-2025-69421]: https://openssl-library.org/news/vulnerabilities/#CVE-2025-69421
[CVE-2026-2673]: https://openssl-library.org/news/vulnerabilities/#CVE-2026-2673
[CVE-2026-22795]: https://openssl-library.org/news/vulnerabilities/#CVE-2026-22795
[CVE-2026-22796]: https://openssl-library.org/news/vulnerabilities/#CVE-2026-22796
[CVE-2026-28387]: https://openssl-library.org/news/vulnerabilities/#CVE-2026-28387
[CVE-2026-28388]: https://openssl-library.org/news/vulnerabilities/#CVE-2026-28388
[CVE-2026-28389]: https://openssl-library.org/news/vulnerabilities/#CVE-2026-28389
[CVE-2026-28390]: https://openssl-library.org/news/vulnerabilities/#CVE-2026-28390
[CVE-2026-31789]: https://openssl-library.org/news/vulnerabilities/#CVE-2026-31789
[CVE-2026-31790]: https://openssl-library.org/news/vulnerabilities/#CVE-2026-31790
[ESV]: https://csrc.nist.gov/Projects/cryptographic-module-validation-program/entropy-validations
[OpenSSL Guide]: https://www.openssl.org/docs/manmaster/man7/ossl-guide-introduction.html
[README-QUIC.md]: ./README-QUIC.md
[issue tracker]: https://github.com/openssl/openssl/issues
[jitterentropy-library]: https://github.com/smuellerDD/jitterentropy-library
