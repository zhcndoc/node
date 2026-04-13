OpenSSL CHANGES
===============

This is a detailed breakdown of significant changes. For a high-level overview
of changes in each release, see [NEWS.md](./NEWS.md).

For a full list of changes, see the [git commit log][log] and pick the
appropriate release branch.

  [log]: https://github.com/openssl/openssl/commits/

OpenSSL Releases
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

### Changes between 3.5.5 and 3.5.6 [7 Apr 2026]

 * Fixed incorrect failure handling in RSA KEM RSASVE encapsulation.

   Severity: Moderate

   Issue summary: Applications using RSASVE key encapsulation to establish
   a secret encryption key can send contents of an uninitialized memory buffer
   to a malicious peer.

   Impact summary: The uninitialized buffer might contain sensitive data
   from the previous execution of the application process which leads
   to sensitive data leakage to an attacker.

   Reported by: Simo Sorce (Red Hat).

   ([CVE-2026-31790])

   *Nikola Pajkovsky*

 * Fixed loss of key agreement group tuple structure when the `DEFAULT` keyword
   is used in the server-side configuration of the key-agreement group list.

   Severity: Low

   Issue summary: An OpenSSL TLS 1.3 server may fail to negotiate the expected
   preferred key exchange group when its key exchange group configuration
   includes the default by using the 'DEFAULT' keyword.

   Impact summary: A less preferred key exchange may be used even when a more
   preferred group is supported by both client and server, if the group
   was not included among the client's initial predicated keyshares.
   This will sometimes be the case with the new hybrid post-quantum groups,
   if the client chooses to defer their use until specifically requested by
   the server.
   <!-- https://github.com/openssl/openssl/pull/30111 -->

   ([CVE-2026-2673])

   *Viktor Dukhovni*

 * Fixed potential use-after-free in DANE client code.

   Severity: Low

   Issue summary: An uncommon configuration of clients performing DANE
   TLSA-based server authentication, when paired with uncommon server DANE TLSA
   records, may result in a use-after-free and/or double-free on the client
   side.

   Impact summary: A use after free can have a range of potential consequences
   such as the corruption of valid data, crashes, or execution of arbitrary
   code.

   Reported by: Igor Morgenstern (Aisle Research).

   ([CVE-2026-28387])

   *Viktor Dukhovni*

 * Fixed NULL pointer dereference when processing a delta CRL.

   Severity: Low

   Issue summary: When a delta CRL that contains a Delta CRL Indicator extension
   is processed, a NULL pointer dereference might happen if the required CRL
   Number extension is missing.

   Impact summary: A NULL pointer dereference can trigger a crash which
   leads to a Denial of Service for an application.

   Reported by: Igor Morgenstern (Aisle Research).

   ([CVE-2026-28388])

   *Igor Morgenstern*

 * Fixed possible NULL dereference when processing CMS KeyAgreeRecipientInfo.

   Severity: Low

   Issue summary: During processing of a crafted CMS EnvelopedData message
   with KeyAgreeRecipientInfo a NULL pointer dereference can happen.

   Impact summary: Applications that process attacker-controlled CMS data may
   crash before authentication or cryptographic operations occur resulting in
   Denial of Service.

   Reported by: Nathan Sportsman (Praetorian), Daniel Rhea,
   Jaeho Nam (Seoul National University), Muhammad Daffa,
   Zhanpeng Liu (Tencent Xuanwu Lab), Guannan Wang (Tencent Xuanwu Lab),
   Guancheng Li (Tencent Xuanwu Lab), and Joshua Rogers.

   ([CVE-2026-28389])

   *Neil Horman*

 * Fixed possible NULL dereference when processing CMS
   KeyTransportRecipientInfo.

   Severity: Low

   Issue summary: During processing of a crafted CMS EnvelopedData message
   with KeyTransportRecipientInfo a NULL pointer dereference can happen.

   Impact summary: Applications that process attacker-controlled CMS data may
   crash before authentication or cryptographic operations occur resulting in
   Denial of Service.

   Reported by: Muhammad Daffa, Zhanpeng Liu (Tencent Xuanwu Lab),
   Guannan Wang (Tencent Xuanwu Lab), Guancheng Li (Tencent Xuanwu Lab),
   Joshua Rogers, and Chanho Kim.

   ([CVE-2026-28390])

   *Neil Horman*

 * Fixed heap buffer overflow in hexadecimal conversion.

   Severity: Low

   Issue summary: Converting an excessively large OCTET STRING value to
   a hexadecimal string leads to a heap buffer overflow on 32 bit platforms.

   Impact summary: A heap buffer overflow may lead to a crash or possibly
   an attacker controlled code execution or other undefined behavior.

   Reported by: Quoc Tran (Xint.io - US Team).

   ([CVE-2026-31789])

   *Igor Ustinov*

 * Fixed usage of `openssl s_client -connect HOST -proxy PROXY` with `HOST`
   containing a raw IPv6 address.
   <!-- https://github.com/openssl/openssl/pull/30384 -->

   *Peter Zhang*

 * Fixed broken detection of plantext HTTP over TLS.
   <!-- https://github.com/openssl/openssl/pull/30411 -->

   *Matt Caswell*

### Changes between 3.5.4 and 3.5.5 [27 Jan 2026]

 * Fixed Improper validation of PBMAC1 parameters in PKCS#12 MAC verification.

   Severity: Moderate

   Issue summary: PBMAC1 parameters in PKCS#12 files are missing validation
   which can trigger a stack-based buffer overflow, invalid pointer or NULL
   pointer dereference during MAC verification.

   Impact summary: The stack buffer overflow or NULL pointer dereference may
   cause a crash leading to Denial of Service for an application that parses
   untrusted PKCS#12 files. The buffer overflow may also potentially enable
   code execution depending on platform mitigations.

   Reported by: Stanislav Fort (Aisle Research) and Petr Šimeček (Aisle
   Research) and Hamza (Metadust)

   ([CVE-2025-11187])

   *Tomáš Mráz*

 * Fixed Stack buffer overflow in CMS `AuthEnvelopedData` parsing.

   Severity: High

   Issue summary: Parsing CMS `AuthEnvelopedData` message with maliciously
   crafted AEAD parameters can trigger a stack buffer overflow.

   Impact summary: A stack buffer overflow may lead to a crash, causing Denial
   of Service, or potentially remote code execution.

   Reported by: Stanislav Fort (Aisle Research)

   ([CVE-2025-15467])

   *Igor Ustinov*

 * Fixed NULL dereference in `SSL_CIPHER_find()` function on unknown cipher ID.

   Severity: Low

   Issue summary: If an application using the `SSL_CIPHER_find()` function
   in a QUIC protocol client or server receives an unknown cipher suite from
   the peer, a NULL dereference occurs.

   Impact summary: A NULL pointer dereference leads to abnormal termination
   of the running process causing Denial of Service.

   Reported by: Stanislav Fort (Aisle Research)

   ([CVE-2025-15468])

   *Stanislav Fort*

 * Fixed `openssl dgst` one-shot codepath silently truncates inputs >16 MiB.

   Severity: Low

   Issue summary: The `openssl dgst` command-line tool silently truncates input
   data to 16 MiB when using one-shot signing algorithms and reports success
   instead of an error.

   Impact summary: A user signing or verifying files larger than 16 MiB with
   one-shot algorithms (such as Ed25519, Ed448, or ML-DSA) may believe the
   entire file is authenticated while trailing data beyond 16 MiB remains
   unauthenticated.

   Reported by: Stanislav Fort (Aisle Research)

   ([CVE-2025-15469])

   *Viktor Dukhovni*

 * Fixed TLS 1.3 `CompressedCertificate` excessive memory allocation.

   Severity: Low

   Issue summary: A TLS 1.3 connection using certificate compression can be
   forced to allocate a large buffer before decompression without checking
   against the configured certificate size limit.

   Impact summary: An attacker can cause per-connection memory allocations
   of up to approximately 22 MiB and extra CPU work, potentially leading
   to service degradation or resource exhaustion (Denial of Service).

   Reported by: Tomas Dulka (Aisle Research) and Stanislav Fort (Aisle
   Research)

   ([CVE-2025-66199])

   *Tomas Dulka and Stanislav Fort*

 * Fixed Heap out-of-bounds write in `BIO_f_linebuffer` on short writes.

   Severity: Low

   Issue summary: Writing large, newline-free data into a BIO chain using the
   line-buffering filter where the next BIO performs short writes can trigger
   a heap-based out-of-bounds write.

   Impact summary: This out-of-bounds write can cause memory corruption
   which typically results in a crash, leading to Denial of Service for
   an application.

   Reported by: Petr Simecek (Aisle Research) and Stanislav Fort (Aisle
   Research)

   ([CVE-2025-68160])

   *Stanislav Fort and Neil Horman*

 * Fixed Unauthenticated/unencrypted trailing bytes with low-level OCB
   function calls.

   Severity: Low

   Issue summary: When using the low-level OCB API directly with AES-NI or
   other hardware-accelerated code paths, inputs whose length is not a multiple
   of 16 bytes can leave the final partial block unencrypted and
   unauthenticated.

   Impact summary: The trailing 1-15 bytes of a message may be exposed in
   cleartext on encryption and are not covered by the authentication tag,
   allowing an attacker to read or tamper with those bytes without detection.

   Reported by: Stanislav Fort (Aisle Research)

   ([CVE-2025-69418])

   *Stanislav Fort*

 * Fixed Out of bounds write in `PKCS12_get_friendlyname()` UTF-8 conversion.

   Severity: Low

   Issue summary: Calling `PKCS12_get_friendlyname()` function on a maliciously
   crafted PKCS#12 file with a `BMPString` (UTF-16BE) friendly name containing
   non-ASCII BMP code point can trigger a one byte write before the allocated
   buffer.

   Impact summary: The out-of-bounds write can cause a memory corruption
   which can have various consequences including a Denial of Service.

   Reported by: Stanislav Fort (Aisle Research)

   ([CVE-2025-69419])

   *Norbert Pócs*

 * Fixed Missing `ASN1_TYPE` validation in `TS_RESP_verify_response()` function.

   Severity: Low

   Issue summary: A type confusion vulnerability exists in the TimeStamp
   Response verification code where an `ASN1_TYPE` union member is accessed
   without first validating the type, causing an invalid or NULL pointer
   dereference when processing a malformed `TimeStamp` Response file.

   Impact summary: An application calling `TS_RESP_verify_response()`
   with a malformed TimeStamp Response can be caused to dereference an invalid
   or NULL pointer when reading, resulting in a Denial of Service.

   Reported by: Luigino Camastra (Aisle Research)

   ([CVE-2025-69420])

   *Bob Beck*

 * Fixed NULL Pointer Dereference in `PKCS12_item_decrypt_d2i_ex()` function.

   Severity: Low

   Issue summary: Processing a malformed PKCS#12 file can trigger a NULL
   pointer dereference in the `PKCS12_item_decrypt_d2i_ex()` function.

   Impact summary: A NULL pointer dereference can trigger a crash which leads
   to Denial of Service for an application processing PKCS#12 files.

   Reported by: Luigino Camastra (Aisle Research)

   ([CVE-2025-69421])

   *Luigino Camastra*

 * Fixed Missing `ASN1_TYPE` validation in PKCS#12 parsing.

   Severity: Low

   Issue summary: An invalid or NULL pointer dereference can happen in
   an application processing a malformed PKCS#12 file.

   Impact summary: An application processing a malformed PKCS#12 file can be
   caused to dereference an invalid or NULL pointer on memory read, resulting
   in a Denial of Service.

   Reported by: Luigino Camastra (Aisle Research)

   ([CVE-2026-22795])

   *Bob Beck*

 * Fixed `ASN1_TYPE` Type Confusion in the `PKCS7_digest_from_attributes()`
   function.

   Severity: Low

   Issue summary: A type confusion vulnerability exists in the signature
   verification of signed PKCS#7 data where an `ASN1_TYPE` union member
   is accessed without first validating the type, causing an invalid or NULL
   pointer dereference when processing malformed PKCS#7 data.

   Impact summary: An application performing signature verification of PKCS#7
   data or calling directly the `PKCS7_digest_from_attributes()` function can be
   caused to dereference an invalid or NULL pointer when reading, resulting in
   a Denial of Service.

   Reported by: Luigino Camastra (Aisle Research)

   ([CVE-2026-22796])

   *Bob Beck*

 * RISC-V capabilities string format has changed to include the base
   architecture and the vector length for the V extension.
   <!-- https://github.com/openssl/openssl/pull/28760 -->

   *Bernd Edlinger*

 * Fixed incorrect acceptance of some malformed ECDSA signatures on s390x.
   <!-- https://github.com/openssl/openssl/pull/29214 -->

   *Holger Dengler*

 * Source code has been reformatted with `clang-format`.
   <!-- https://github.com/openssl/openssl/pull/29262 -->

   *Bob Beck*

### Changes between 3.5.3 and 3.5.4 [30 Sep 2025]

 * Fix Out-of-bounds read & write in RFC 3211 KEK Unwrap

   Issue summary: An application trying to decrypt CMS messages encrypted using
   password based encryption can trigger an out-of-bounds read and write.

   Impact summary: This out-of-bounds read may trigger a crash which leads to
   Denial of Service for an application. The out-of-bounds write can cause
   a memory corruption which can have various consequences including
   a Denial of Service or Execution of attacker-supplied code.

   The issue was reported by Stanislav Fort (Aisle Research).

   ([CVE-2025-9230])

   *Viktor Dukhovni*

 * Fix Timing side-channel in SM2 algorithm on 64 bit ARM

   Issue summary: A timing side-channel which could potentially allow remote
   recovery of the private key exists in the SM2 algorithm implementation on
   64 bit ARM platforms.

   Impact summary: A timing side-channel in SM2 signature computations on
   64 bit ARM platforms could allow recovering the private key by an attacker.

   The issue was reported by Stanislav Fort (Aisle Research).

   ([CVE-2025-9231])

   *Stanislav Fort and Tomáš Mráz*

 * Fix Out-of-bounds read in HTTP client no_proxy handling

   Issue summary: An application using the OpenSSL HTTP client API functions
   may trigger an out-of-bounds read if the "no_proxy" environment variable is
   set and the host portion of the authority component of the HTTP URL is an
   IPv6 address.

   Impact summary: An out-of-bounds read can trigger a crash which leads to
   Denial of Service for an application.

   The issue was reported by Stanislav Fort (Aisle Research).

   ([CVE-2025-9232])

   *Stanislav Fort*

 * The FIPS provider no longer performs a PCT on key import for ECX keys
   (that was introduced in 3.5.2), following the latest update
   on that requirement in FIPS 140-3 IG 10.3.A additional comment 1.

   *Eugene Syromiatnikov*

 * Fixed the length of the ASN.1 sequence for the SM3 digests of RSA-encrypted
   signatures.

   *Xiao Lou Dong Feng*

 * Reverted the synthesised `OPENSSL_VERSION_NUMBER` change for the release
   builds, as it broke some exiting applications that relied on the previous
   3.x semantics, as documented in `OpenSSL_version(3)`.

   *Richard Levitte*

### Changes between 3.5.2 and 3.5.3 [16 Sep 2025]

 * Avoided a potential race condition introduced in 3.5.1, where
   `OSSL_STORE_CTX` kept open during lookup while potentially being used
   by multiple threads simultaneously, that could lead to potential crashes
   when multiple concurrent TLS connections are served.

   *Matt Caswell*

 * The FIPS provider no longer performs a PCT on key import for RSA, DH,
   and EC keys (that was introduced in 3.5.2), following the latest update
   on that requirement in FIPS 140-3 IG 10.3.A additional comment 1.

   *Dr Paul Dale*

 * Secure memory allocation calls are no longer used for HMAC keys.

   *Dr Paul Dale*

 * `openssl req` no longer generates certificates with an empty extension list
   when SKID/AKID are set to `none` during generation.

   *David Benjamin*

 * The man page date is now derived from the release date provided
   in `VERSION.dat` and not the current date for the released builds.

   *Enji Cooper*

 * Hardened the provider implementation of the RSA public key "encrypt"
   operation to add a missing check that the caller-indicated output buffer
   size is at least as large as the byte count of the RSA modulus.  The issue
   was reported by Arash Ale Ebrahim from SYSPWN.

   This operation is typically invoked via `EVP_PKEY_encrypt(3)`.  Callers that
   in fact provide a sufficiently large buffer, but fail to correctly indicate
   its size may now encounter unexpected errors.  In applications that attempt
   RSA public encryption into a buffer that is too small, an out-of-bounds
   write is now avoided and an error is reported instead.

   *Viktor Dukhovni*

 * Added FIPS 140-3 PCT on DH key generation.

   *Nikola Pajkovsky*

 * Fixed the synthesised `OPENSSL_VERSION_NUMBER`.

   *Richard Levitte*

### Changes between 3.5.1 and 3.5.2 [5 Aug 2025]

 * The FIPS provider now performs a PCT on key import for RSA, EC and ECX.
   This is mandated by FIPS 140-3 IG 10.3.A additional comment 1.

   *Dr Paul Dale*

### Changes between 3.5.0 and 3.5.1 [1 Jul 2025]

 * Fix x509 application adds trusted use instead of rejected use.

   Issue summary: Use of -addreject option with the openssl x509 application adds
   a trusted use instead of a rejected use for a certificate.

   Impact summary: If a user intends to make a trusted certificate rejected for
   a particular use it will be instead marked as trusted for that use.

   ([CVE-2025-4575])

   *Tomas Mraz*

 * Aligned the behaviour of TLS and DTLS in the event of a no_renegotiation
   alert being received. Older versions of OpenSSL failed with DTLS if a
   no_renegotiation alert was received. All versions of OpenSSL do this for TLS.
   From 3.2 a bug was exposed that meant that DTLS ignored no_rengotiation. We
   have now restored the original behaviour and brought DTLS back into line with
   TLS.

   *Matt Caswell*

### Changes between 3.4 and 3.5.0 [8 Apr 2025]

 * Added server side support for QUIC

   *Hugo Landau, Matt Caswell, Tomáš Mráz, Neil Horman, Sasha Nedvedicky, Andrew Dinh*

 * Tolerate PKCS#8 version 2 with optional public keys. The public key data
   is currently ignored.

   *Viktor Dukhovni*

 * Signature schemes without an explicit signing digest in CMS are now supported.
   Examples of such schemes are ED25519 or ML-DSA.

   *Michael Schroeder*

 * The TLS Signature algorithms defaults now include all three ML-DSA variants as
   first algorithms.

   *Viktor Dukhovni*

 * Added a `no-tls-deprecated-ec` configuration option.

   The `no-tls-deprecated-ec` option disables support for TLS elliptic curve
   groups deprecated in RFC8422 at compile time.  This does not affect use of
   the associated curves outside TLS.  By default support for these groups is
   compiled in, but, as before, they are not included in the default run-time
   list of supported groups.

   With the `enable-tls-deprecated-ec` option these TLS groups remain enabled at
   compile time even if the default configuration is changed, provided the
   underlying EC curves remain implemented.

   *Viktor Dukhovni*

 * Added new API to enable 0-RTT for 3rd party QUIC stacks.

   *Cheng Zhang*

 * Added support for a new callback registration `SSL_CTX_set_new_pending_conn_cb`,
   which allows for application notification of new connection SSL object
   creation, which occurs independently of calls to `SSL_accept_connection()`.
   Note: QUIC objects passed through SSL callbacks should not have their state
   mutated via calls back into the SSL api until such time as they have been
   received via a call to `SSL_accept_connection()`.

   *Neil Horman*

 * Add SLH-DSA as specified in FIPS 205.

   *Shane Lontis and Dr Paul Dale*

 * ML-KEM as specified in FIPS 203.

   Based on the original implementation in BoringSSL, ported from C++ to C,
   refactored, and integrated into the OpenSSL default and FIPS providers.
   Including also the X25519MLKEM768, SecP256r1MLKEM768, SecP384r1MLKEM1024
   TLS hybrid key post-quantum/classical key agreement schemes.

   *Michael Baentsch, Viktor Dukhovni, Shane Lontis and Paul Dale*

 * Add ML-DSA as specified in FIPS 204.

   The base code was derived from BoringSSL C++ code.

   *Shane Lontis, Viktor Dukhovni and Paul Dale*

 * Added new API calls to enable 3rd party QUIC stacks to use the OpenSSL TLS
   implementation.

   *Matt Caswell*

 * The default DRBG implementations have been changed to prefer to fetch
   algorithm implementations from the default provider (the provider the
   DRBG implementation is built in) regardless of the default properties
   set in the configuration file. The code will still fallback to find
   an implementation, as done previously, if needed.

   *Simo Sorce*

 * Initial support for opaque symmetric keys objects (EVP_SKEY). These
   replace the ad-hoc byte arrays that are pervasive throughout the library.

   *Dmitry Belyavskiy and Simo Sorce*

 * The default TLS group list setting is now set to:
   `?*X25519MLKEM768 / ?*X25519:?secp256r1 / ?X448:?secp384r1:?secp521r1 / ?ffdhe2048:?ffdhe3072`

   This means two key shares (X25519MLKEM768 and X25519) will be sent by
   default by the TLS client. GOST groups and FFDHE groups larger than 3072
   bits are no longer enabled by default.

   The group names in the group list setting are now also case insensitive.

   *Viktor Dukhovni*

 * For TLSv1.3: Add capability for a client to send multiple key shares.
   Extend the scope of `SSL_OP_CIPHER_SERVER_PREFERENCE` to cover
   server-side key exchange group selection.

   Extend the server-side key exchange group selection algorithm and related
   group list syntax to support multiple group priorities, e.g. to prioritize
   (hybrid-)KEMs.

   *David Kelsey*, *Martin Schmatz*

 * A new random generation API has been introduced which modifies all
   of the L<RAND_bytes(3)> family of calls so they are routed through a
   specific named provider instead of being resolved via the normal DRBG
   chaining.  In a future OpenSSL release, this will obsolete RAND_METHOD.

   *Dr Paul Dale*

 * New inline functions were added to support loads and stores of unsigned
   16-bit, 32-bit and 64-bit integers in either little-endian or big-endian
   form, regardless of the host byte-order.  See the `OPENSSL_load_u16_le(3)`
   manpage for details.

   *Viktor Dukhovni*

 * All the `BIO_meth_get_*()` functions allowing reuse of the internal OpenSSL
   BIO method implementations were deprecated. The reuse is unsafe due to
   dependency on the code of the internal methods not changing.

   *Tomáš Mráz*

 * Support DEFAULT keyword and '-' prefix in `SSL_CTX_set1_groups_list()`.
   `SSL_CTX_set1_groups_list()` now supports the DEFAULT keyword which sets the
   available groups to the default selection. The '-' prefix allows the calling
   application to remove a group from the selection.

   *Frederik Wedel-Heinen*

 * Updated the default encryption cipher for the `req`, `cms`, and `smime` applications
   from `des-ede3-cbc` to `aes-256-cbc`.

   AES-256 provides a stronger 256-bit key encryption than legacy 3DES.

   *Aditya*

 * Enhanced PKCS#7 inner contents verification.
   In the `PKCS7_verify()` function, the BIO *indata parameter refers to the
   signed data if the content is detached from p7. Otherwise, indata should be
   NULL, and then the signed data must be in p7.

   The previous OpenSSL implementation only supported MIME inner content
   [RFC 5652, section 5.2].

   The added functionality now enables support for PKCS#7 inner content
   [RFC 2315, section 7].

   *Małgorzata Olszówka*

 * The `-rawin` option of the `pkeyutl` command is now implied (and thus no
   longer required) when using `-digest` or when signing or verifying with an
   Ed25519 or Ed448 key.
   The `-digest` and `-rawin` option may only be given with `-sign` or `verify`.

   *David von Oheimb*

 * `X509_PURPOSE_add()` has been modified
   to take `sname` instead of `id` as the primary purpose identifier.
   For its convenient use, `X509_PURPOSE_get_unused_id()` has been added.

   This work was sponsored by Siemens AG.

   *David von Oheimb*

 * Added support for central key generation in CMP.

   This work was sponsored by Siemens AG.

   *Rajeev Ranjan*

 * Optionally allow the FIPS provider to use the `JITTER` entropy source.
   Note that using this option will require the resulting FIPS provider
   to undergo entropy source validation [ESV] by the [CMVP], without this
   the FIPS provider will not be FIPS compliant.  Enable this using the
   configuration option `enable-fips-jitter`.

   *Paul Dale*

 * Extended `OPENSSL_ia32cap` support to accommodate additional `CPUID`
   feature/capability bits in leaf `0x7` (Extended Feature Flags) as well
   as leaf `0x24` (Converged Vector ISA).

   *Dan Zimmerman, Alina Elizarova*

 * Cipher pipelining support for provided ciphers with new API functions
   EVP_CIPHER_can_pipeline(), EVP_CipherPipelineEncryptInit(),
   EVP_CipherPipelineDecryptInit(), EVP_CipherPipelineUpdate(),
   and EVP_CipherPipelineFinal(). Cipher pipelining support allows application to
   submit multiple chunks of data in one cipher update call, thereby allowing the
   provided implementation to take advantage of parallel computing. There are
   currently no built-in ciphers that support pipelining. This new API replaces
   the legacy pipeline API [SSL_CTX_set_max_pipelines](https://docs.openssl.org/3.3/man3/SSL_CTX_set_split_send_fragment/) used with Engines.

   *Ramkumar*

 * Add CMS_NO_SIGNING_TIME flag to CMS_sign(), CMS_add1_signer()

   Previously there was no way to create a CMS SignedData signature without a
   signing time attribute, because CMS_SignerInfo_sign added it unconditionally.
   However, there is a use case (PAdES signatures [ETSI EN 319 142-1](https://www.etsi.org/deliver/etsi_en/319100_319199/31914201/01.01.01_60/en_31914201v010101p.pdf) )
   where this attribute is not allowed, so a new flag was added to the CMS API
   that causes this attribute to be omitted at signing time.

   The new `-no_signing_time` option of the `cms` command enables this flag.

   *Juhász Péter*

 * Parallel dual-prime 1024/1536/2048-bit modular exponentiation for
   AVX_IFMA capable processors (Intel Sierra Forest and its successor).

   This optimization brings performance enhancement, ranging from 1.8 to 2.2
   times, for the sign/decryption operations of rsaz-2k/3k/4k (`openssl speed rsa`)
   on the Intel Sierra Forest.

   *Zhiguo Zhou, Wangyang Guo (Intel Corp)*

 * VAES/AVX-512 support for AES-XTS.

   For capable processors (>= Intel Icelake), this provides a
   vectorized implementation of AES-XTS with a throughput improvement
   between 1.3x to 2x, depending on the block size.

   *Pablo De Lara Guarch, Dan Pittman*

 * Fixed EVP_DecodeUpdate() to not write padding zeros to the decoded output.

   According to the documentation, for every 4 valid base64 bytes processed
   (ignoring whitespace, carriage returns and line feeds), EVP_DecodeUpdate()
   produces 3 bytes of binary output data (except at the end of data
   terminated with one or two padding characters). However, the function
   behaved like an EVP_DecodeBlock(). It produced exactly 3 output bytes for
   every 4 input bytes. Such behaviour could cause writes to a non-allocated
   output buffer if a user allocates its size based on the documentation and
   knowing the padding size.

   The fix makes EVP_DecodeUpdate() produce exactly as many output bytes as
   in the initial non-encoded message.

   *Valerii Krygin*

 * Added support for aAissuingDistributionPoint, allowedAttributeAssignments,
   timeSpecification, attributeDescriptor, roleSpecCertIdentifier,
   authorityAttributeIdentifier and attributeMappings X.509v3 extensions.

   *Jonathan M. Wilbur*

 * Added a new CLI option `-provparam` and API functions for setting of
   provider configuration parameters.

   *Viktor Dukhovni*

 * Added a new trace category for PROVIDER calls and added new tracing calls
   in provider and algorithm fetching API functions.

   *Neil Horman*

 * Fixed benchmarking for AEAD ciphers in the `openssl speed` utility.

   *Mohammed Alhabib*

 * Added a build configuration option `enable-sslkeylog` for enabling support
   for SSLKEYLOGFILE environment variable to log TLS connection secrets.

   *Neil Horman*

 * Added EVP_get_default_properties() function to retrieve the current default
   property query string.

   *Dmitry Belyavskiy*

OpenSSL 3.4
-----------

### 3.4.1 和 3.4.2 之间的更改 [xx XXX xxxx]

* 在 openssl 应用程序中显示区分名称时，默认转义控制字符。

  *Tomáš Mráz*

### 3.4.0 和 3.4.1 之间的更改 [2025 年 2 月 11 日]

* 修复了 RFC7250 握手与未经验证的服务器不按预期中止的问题。

  使用 RFC7250 公钥 (RPK) 验证服务器的客户端可能无法注意到服务器未经验证，因为当设置 SSL_VERIFY_PEER 验证模式时，握手不会按预期中止。

  ([CVE-2024-12797])

  *Viktor Dukhovni*

* 修复了 ECDSA 签名计算中的时序侧信道。

  当反转的 ECDSA 随机数值的最高字为零时，存在大约 300 纳秒的时序信号。这仅对某些支持的椭圆曲线有相当大的概率发生。特别是 NIST P-521 曲线受到影响。为了能够测量此泄露，攻击者进程必须位于同一台物理计算机上，或者必须具有非常快速且低延迟的网络连接。

  ([CVE-2024-13176])

  *Tomáš Mráz*

* 恢复了 3.4.0 版本中 CMS_get1_certs() 和 CMS_get1_crls() 的行为更改。如果 CMS 对象中没有证书或 CRL，这些函数现在会再次返回 NULL。

  *Tomáš Mráz*

### 3.3 和 3.4.0 之间的更改 [2024 年 10 月 22 日]

* 仅限 FIPS 提供程序，用连续健康检查模块替换了主 DRBG。这也删除了现在禁止的 DRBG 链接。

  *Paul Dale*

* 改进了 base64 BIO 的正确性和错误报告。

  *Viktor Dukhovni*

* 添加了对直接获取的复合签名算法（如 RSA-SHA2-256）的支持，包括 EVP_PKEY_sign、EVP_PKEY_verify 和 EVP_PKEY_verify_recover 组中的新 API 函数。

  *Richard Levitte*

* XOF 摘要 API 改进

  EVP_MD_CTX_get_size() 和 EVP_MD_CTX_size 是宏，它们被别名为 EVP_MD_get_size，后者返回一个常量值。像 SHAKE 这样的 XOF 摘要具有不固定的输出大小，因此调用 EVP_MD_get_size() 不够。现有的宏现在指向新函数 EVP_MD_CTX_get_size_ex()，该函数将检索 XOF 摘要的“大小”，否则将回退调用 EVP_MD_get_size()。请注意，SHAKE 实现以前没有上下文获取器，因此“大小”只能使用新提供程序检索。

  还添加了一个 EVP_xof() 辅助函数。

  *Shane Lontis*

* 向 FIPS 提供程序添加了 FIPS 指示符。

  FIPS 140-3 要求如果 FIPS 提供程序允许非批准的算法，则使用指示符。如果算法通过了所有必需的检查（例如最小密钥大小），则该算法被批准。默认情况下，如果任何检查失败，将发生错误。为了向后兼容，各个算法可以通过使用 FIPS 配置中的选项或在代码中使用算法上下文设置器来覆盖检查。覆盖检查意味着该算法不符合 FIPS 标准。可以调用 OSSL_INDICATOR_set_callback() 来记录未批准的算法。在任何算法操作结束时，可以使用算法上下文获取器查询批准状态。FIPS 提供程序配置选项使用 'openssl fipsinstall' 设置。

  请注意，已强制执行新的 FIPS 140-3 限制，例如使用 PKCS1 填充的 RSA 加密不再被批准。相关更改的文档可以在 [fips_module(7)] 手册页中找到。

  [fips_module(7)]: https://docs.openssl.org/master/man7/fips_module/#FIPS indicators

  *Shane Lontis, Paul Dale, Po-Hsing Wu 和 Dimitri John Ledkov*

* 添加了对 S390x 架构上 HMAC 硬件加速的支持。

  *Ingo Franzki*

* 为 Unix 平台添加了 debuginfo Makefile 目标，以便从相应的共享库生成单独的 DWARF 信息文件。

  *Neil Horman*

* 在 pkeyutl 命令中添加了对封装和解封装操作的支持。

  *Dmitry Belyavskiy*

* 在 PKCS#12 中添加了 RFC 9579 (PBMAC1) 的实现。

  *Dmitry Belyavskiy*

* 添加了一个新的随机种子源 RNG `JITTER`，它使用静态链接的 jitterentropy 库。

  *Dimitri John Ledkov*

* 添加了一项功能，用于检索配置的 TLS 签名算法，例如通过 openssl list 命令。

  *Michael Baentsch*

* 弃用了 TS_VERIFY_CTX_set_* 函数，并添加了具有改进语义的替换函数 TS_VERIFY_CTX_set0_*。

  *Tobias Erbsland*

* 重新设计了 Windows 对 OPENSSLDIR/ENGINESDIR/MODULESDIR 的使用，以便以前在构建时确定的位置现在可以通过注册表项在运行时定义。请参阅 NOTES-WINDOWS.md。

  *Neil Horman*

* 为使用 `req` 和 `x509` 命令创建的证书添加了 `-not_before` 和 `-not_after` 选项，用于显式设置开始和结束日期。还将这些选项作为 `-startdate` 和 `-enddate` 选项的别名添加到 `ca` 命令中。

  *Stephan Wurm*

* FIPS 提供程序中的 X25519 和 X448 密钥交换实现未获批准，并具有 `fips=no` 属性。

  *Tomáš Mráz*

* SHAKE-128 和 SHAKE-256 实现不再具有默认摘要长度。这意味着除非在设置 `xoflen` 参数之前，否则无法将这些算法与 EVP_DigestFinal/_ex() 一起使用。

  此更改是必要的，因为预先存在的默认长度是这些算法支持的完全抗碰撞性所需长度的一半。

  *Tomáš Mráz*

* 在配置文件中设置 `config_diagnostics=1` 将导致在 ssl 模块配置中出现错误时，从 SSL_CTX_new() 和 SSL_CTX_new_ex() 返回错误。

  *Tomáš Mráz*

* 对于最小 TLS 版本大于 1.0 的所有连接，将在 TLS 客户端 hello 中使用空的重新协商扩展，而不是空的重新协商 SCSV。

  *Tim Perry*

* 在 TLS 1.3 中添加了对 RFC 9150 中定义的仅完整性密码套件 TLS_SHA256_SHA256 和 TLS_SHA384_SHA384 的支持。

  这项工作由西门子股份公司赞助。

  *Rajeev Ranjan*

* 在 CMP 中添加了对检索证书请求模板和 CRL 的支持，以及相应的 CLI 选项 `-template`、`-crlcert`、`-oldcrl`、`-crlout`、`-crlform>` 和 `-rsp_crl`。

  这项工作由西门子股份公司赞助。

  *Rajeev Ranjan*

* 添加了对 issuedOnBehalfOf、auditIdentity、basicAttConstraints、userNotice、acceptablePrivilegePolicies、acceptableCertPolicies、subjectDirectoryAttributes、associatedInformation、delegatedNameConstraints、holderNameConstraints 和 targetingInformation X.509v3 扩展的支持。

  *Jonathan M. Wilbur*

* 添加了属性证书 (RFC 5755) 支持。可以通过公共 API 创建、解析、修改和打印属性证书。目前没有命令行工具支持。

  *Damian Hobson-Garcia*

* 添加了构建位置无关可执行文件 (PIE) 的支持。配置选项 `enable-pie` 配置 cflag '-fPIE' 和 ldflag '-pie'，以支持 openssl 可执行文件中的地址空间布局随机化 (ASLR)，消除了对外部工具链配置的依赖。

  *Craig Lorentzen*

* SSL_SESSION_get_time()/SSL_SESSION_set_time()/SSL_CTX_flush_sessions() 已被弃用，取而代之的是其各自的 ..._ex() 替换函数，这些函数是 Y2038 安全的。

  *Alexander Kanavin*

* ECC 组现在可以自定义其初始化，通过使用预计算值来节省 CPU。P-256 实现使用了此功能。

  *Watson Ladd*

OpenSSL 3.3
-----------

### 3.3.2 和 3.3.3 之间的更改 [xx XXX xxxx]

* 修复了使用无效的低级 GF(2^m) 椭圆曲线参数时可能发生的 OOB 内存访问。

  使用低级 GF(2^m) 椭圆曲线 API 和无效的字段多项式显式值可能导致越界内存读写。处理包含“奇异”显式二进制 (GF(2^m)) 曲线参数的应用程序，这些参数可以通过上述或类似 API 表示具有零常数项的无效字段多项式，可能会因读取或写入数组边界之外而突然终止。远程代码执行无法轻易排除。

  ([CVE-2024-9143])

  *Viktor Dukhovni*

### 3.3.1 和 3.3.2 之间的更改 [2024 年 9 月 3 日]

* 修复了 X.509 名称检查中可能发生的拒绝服务。

  执行证书名称检查的应用程序（例如，TLS 客户端检查服务器证书）在比较预期名称与 X.509 证书的 `otherName` 主体备用名称时，可能会尝试读取无效的内存地址。这可能导致异常终止应用程序。

  ([CVE-2024-6119])

  *Viktor Dukhovni*

* 修复了 SSL_select_next_proto() 中可能发生的缓冲区溢出。

  调用 OpenSSL API 函数 SSL_select_next_proto 时，如果支持的客户端协议缓冲区为空，可能会导致崩溃或将内存内容发送给对端。

  ([CVE-2024-5535])

  *Matt Caswell*

### 3.3.0 和 3.3.1 之间的更改 [2024 年 6 月 4 日]

* 修复了调用 SSL_free_buffers() 后可能发生的释放后使用问题。

  SSL_free_buffers 函数用于释放 OpenSSL 在处理来自网络的传入记录时使用的内部缓冲区。该调用仅在缓冲区当前未使用时才应成功。然而，已发现两种场景，即使缓冲区仍在被使用，它也会被释放。

  第一种场景发生在已从网络接收并由 OpenSSL 处理了记录头，但完整的记录体尚未到达。在这种情况下，调用 SSL_free_buffers 将成功，即使记录仅被部分处理且缓冲区仍在被使用。

  第二种场景发生在已接收并由 OpenSSL 处理了包含应用程序数据的完整记录，但应用程序仅读取了部分数据。同样，调用 SSL_free_buffers 将成功，即使缓冲区仍在被使用。

  ([CVE-2024-4741])

  *Matt Caswell*

* 修复了检查过长的 DSA 密钥或参数可能非常慢的问题。

  使用 EVP_PKEY_param_check() 或 EVP_PKEY_public_check() 函数来检查 DSA 公钥或 DSA 参数的应用程序可能会遇到长时间延迟。如果正在检查的密钥或参数来自不受信任的源，这可能导致拒绝服务。

  为了解决此问题，大于 OPENSSL_DSA_MAX_MODULUS_BITS 的 DSA 密钥现在将立即失败检查，并带有 DSA_R_MODULUS_TOO_LARGE 错误原因。

  ([CVE-2024-4603])

  *Tomáš Mráz*

* 改进了 EC/DSA 随机数生成例程，以避免偏差和时序侧信道泄露。

  感谢来自吕贝克大学的 Florian Sieck 和来自 Red Hat 的 George Pantelakis 和 Hubert Kario 报告了这些问题。

  *Tomáš Mráz 和 Paul Dale*

### 3.2 和 3.3.0 之间的更改 [2024 年 4 月 9 日]

* `openssl crl` 和 `openssl req` 的 `-verify` 选项将在失败时使程序退出并返回 1。

  *Vladimír Kotal*

* BIO_get_new_index() 函数最多只能调用 127 次，然后才会达到 BIO_TYPE_MASK 的上限。现在，一旦耗尽，它将正确返回 -1 的错误。用户可能需要在 BIO_find_type() 所需的情况下保留此函数的使用。可以使用 BIO_TYPE_NONE 或 BIO_get_new_index() 为 BIO_meth_new() 提供类型。

  *Shane Lontis*

* 添加了 API 函数 SSL_SESSION_get_time_ex()、SSL_SESSION_set_time_ex()，使用 time_t，在 32 位系统上启用 64 位时间时（例如通过设置 glibc 宏 _TIME_BITS=64）是 Y2038 安全的。

  *Ijtaba Hussain*

* d2i_ASN1_GENERALIZEDTIME()、d2i_ASN1_UTCTIME()、ASN1_TIME_check() 和相关函数已得到增强，以检查输入字符串的最小长度，符合 ITU-T X.690 第 11.7 和 11.8 节。

  *Job Snijders*

* TLS SignatureAlgorithms、ClientSignatureAlgorithms 配置选项中以 `?` 字符开头的未知条目以及对 SSL[_CTX]_set1_sigalgs() 和 SSL[_CTX]_set1_client_sigalgs() 的相应调用将被忽略，并且仍将使用配置。

  同样，以 `?` 字符开头的未知条目在 TLS Groups 配置选项中或通过 SSL[_CTX]_set1_groups_list() 设置时将被忽略，并且仍将使用配置。

  在这两种情况下，如果结果列表为空，则会返回错误。

  *Tomáš Mráz*

* EVP_PKEY_fromdata 函数已得到增强，允许在请求时推导 CRT（中国剩余定理）参数。请参阅 EVP_PKEY-RSA 文档中的 OSSL_PKEY_PARAM_RSA_DERIVE_FROM_PQ 参数。

  *Neil Horman*

* openssl.cnf 中提供程序的 activate 和 soft_load 配置设置已更新，要求值为 [1|yes|true|on]（不区分大小写）才能启用该设置。反之，值为 [0|no|false|off] 将禁用该设置。所有其他值，或省略这些设置的值将导致错误。

  *Neil Horman*

* 向 `openssl x509` 添加了 `-set_issuer` 和 `-set_subject` 选项，用于在创建证书时覆盖颁发者和主题。`-subj` 选项现在是 `-set_subject` 的别名。

  *Job Snijders, George Michaelson*

* OPENSSL_sk_push() 和 sk_<TYPE>_push() 函数现在在与 NULL 堆栈参数调用时返回 0 而不是 -1。

  *Tomáš Mráz*

* 在 `openssl speed` 中，将 `hmac` 使用的默认哈希函数从 `md5` 更改为 `sha256`。

  *James Muir*

* 添加了 RFC 9480 和 RFC 9483 中定义的 CMPv3 的几项新功能：
  - `certProfile` 请求消息头和相应的 `-profile` CLI 选项
  - 支持所有类型的响应消息的延迟交付

  这项工作由西门子股份公司赞助。

  *David von Oheimb*

* 导出器（例如 pkg-config 的 `.pc` 文件）的构建已得到清理，使其在构建文件模板中的硬编码程度降低，并允许更轻松地添加更多导出器。同时，还添加了 CMake 的导出器。

  *Richard Levitte*

* BLAKE2s 哈希算法支持可配置输出长度，与 BLAKE2b 相同。

  *Ahelenia Ziemiańska*

* 新选项 `SSL_OP_PREFER_NO_DHE_KEX`，它允许将 TLS1.3 服务器配置为优先使用 PSK 密钥交换进行会话恢复，而不是使用带 DHE 的 PSK，如果两者都可用。

  *Markus Minichmayr, Tapkey GmbH*

* 新 API `SSL_write_ex2`，可用于在 QUIC 中以优化方式发送结束流 (FIN) 条件。

  *Hugo Landau*

* 新的 atexit 配置开关，用于控制在卸载 libcrypto 时是否注册 OPENSSL_cleanup。在 NonStop 配置上将其关闭，因为该平台上的加载器与 Linux 相比存在差异。

  *Randall S. Becker*

* 添加了对 QUIC 连接跟踪的 qlog 支持。

  OpenSSL 的 qlog 输出目前使用 qlog 的预标准草案版本。OpenSSL 的输出将在未来的版本中以不兼容的方式更改，并且目前不受任何格式稳定性或兼容性保证的约束。此功能可以通过构建时选项 `no-unstable-qlog` 禁用。有关详细信息，请参阅 openssl-qlog(7) 手册页。

  *Hugo Landau*

* 添加了 API，允许配置 QUIC 连接的协商空闲超时，并允许确定当前可为 QUIC 连接创建的附加流的数量。

  *Hugo Landau*

* 添加了 API，允许禁用 QUIC SSL 对象的隐式 QUIC 事件处理，从而允许应用程序控制事件处理发生的时间。有关详细信息，请参阅 SSL_get_value_uint(3) 手册页。

  *Hugo Landau*

* 限制了对 QUIC 连接和流对象的非阻塞轮询支持。有关详细信息，请参阅 SSL_poll(3) 手册页。

  *Hugo Landau*

* 添加了 API，允许查询 QUIC 流写入缓冲区的的大小和利用率。有关详细信息，请参阅 SSL_get_value_uint(3) 手册页。

  *Hugo Landau*

* 在 HTTP 客户端中引入了对 HTTP 响应头的新限制。默认限制设置为 256 个头行。如果超出限制，响应处理将停止并出现错误 HTTP_R_RESPONSE_TOO_MANY_HDRLINES。应用程序可以调用 OSSL_HTTP_REQ_CTX_set_max_response_hdr_lines(3) 来更改默认值。将值设置为 0 将禁用该限制。

  *Alexandr Nedvedicky*

* 将 AES-GCM unroll8 优化应用于 Microsoft Azure Cobalt 100

  *Tom Cosgrove*

* 添加了 X509_STORE_get1_objects，以避免在多线程应用程序中出现现有 X509_STORE_get0_objects API 的问题。有关详细信息，请参阅文档。

  *David Benjamin*

* 在 loongarch64 上为 md5 添加了汇编实现

  *Min Zhou*

* 优化了 ARM Neoverse V1 和 V2 的 AES-CTR

  *Fisher Yu*

* 在基于 Apple Silicon M3 的 MacOS 系统上启用了 AES 和 SHA3 优化，类似于 M1/M2。

  *Tom Cosgrove*

* 添加了一个新的 EVP_DigestSqueeze() API。这允许 SHAKE 使用不同的输出大小进行多次挤压。

  *Shane Lontis, Holger Dengler*

* 使用 RISC-V 向量加密扩展对加密例程进行了各种优化

  *Christoph Müllner, Charalampos Mitrodimas, Ard Biesheuvel, Phoebe Chen, Jerry Shih*

* 接受 TLS 1.2 导出器的更长上下文

  虽然 RFC 5705 暗示导出器的上下文的最大长度为 65535 字节（因为长度嵌入在 uint16 中），但之前的实现强制执行了远小于 1024 字节的限制。此限制已被移除。

  *Daiki Ueno*

OpenSSL 3.2
-----------

### 3.2.1 和 3.2.2 之间的更改 [xx XXX xxxx]

* 修复了一个问题，即某些非默认的 TLS 服务器配置可能导致在处理 TLSv1.3 会话时内存无界增长。攻击者可以利用某些服务器配置触发无界内存增长，从而导致拒绝服务。

  在 TLSv1.3 中，如果使用了非默认的 SSL_OP_NO_TICKET 选项，则可能发生此问题（但如果还配置了 early_data 并使用了默认的防重放保护，则不会）。在这种情况下，在某些条件下，会话缓存可能会进入不正确的状态，并且在填充时无法正确刷新。会话缓存将继续无界增长。恶意客户端可以故意创建此故障场景来强制执行拒绝服务。在正常操作中也可能意外发生。

  ([CVE-2024-2511])

  *Matt Caswell*

* 修复了 SSL_export_keying_material() 无法与 QUIC 连接一起使用的问题。(#23560)

  *Hugo Landau*

### 3.2.0 和 3.2.1 之间的更改 [30 Jan 2024]

* PKCS12 格式的文件可以包含证书和密钥，并且可能来自不受信任的来源。PKCS12 规范允许某些字段为 NULL，但 OpenSSL 未能正确检查这种情况。已应用修复程序以防止 NULL 指针解引用导致 OpenSSL 崩溃。如果应用程序使用 OpenSSL API 处理来自不受信任来源的 PKCS12 文件，则在修复之前，该应用程序将容易受到此问题的影响。

  易受此问题影响的 OpenSSL API 包括：PKCS12_parse()、PKCS12_unpack_p7data()、PKCS12_unpack_p7encdata()、PKCS12_unpack_authsafes() 和 PKCS12_newpass()。

  我们还修复了 SMIME_write_PKCS7() 中的类似问题。但是，由于此函数与写入数据相关，因此我们不认为它具有安全重要性。

  ([CVE-2024-0727])

  *Matt Caswell*

* 当调用 EVP_PKEY_public_check() 函数处理 RSA 公钥时，会进行计算以确认 RSA 模数 n 是复合数。对于有效的 RSA 密钥，n 是两个或多个大素数的乘积，此计算会很快完成。但是，如果 n 是一个过大的素数，则此计算将花费很长时间。

  调用 EVP_PKEY_public_check() 并提供从不受信任来源获得的 RSA 密钥的应用程序可能会容易受到拒绝服务攻击。

  函数 EVP_PKEY_public_check() 不会从其他 OpenSSL 函数调用，但它会从 OpenSSL pkey 命令行应用程序调用。因此，该应用程序在使用 "-pubin" 和 "-check" 选项处理不受信任的数据时也容易受到攻击。

  为了解决此问题，大于 OPENSSL_RSA_MAX_MODULUS_BITS 的 RSA 密钥现在将立即以 RSA_R_MODULUS_TOO_LARGE 错误原因失败检查。

  ([CVE-2023-6237])

  *Tomáš Mráz*

* 将 SM2 私钥信息和主题公钥信息的编码恢复为包含的 AlgorithmIdentifier.algorithm 设置为 id-ecPublicKey 而不是 SM2。

  *Richard Levitte*

* OpenSSL 中用于 PowerPC CPU 的 POLY1305 MAC（消息认证码）实现保存向量寄存器内容的方式与恢复方式不同。因此，在返回调用者时，某些向量寄存器的内容会损坏。易受攻击的代码仅在新式支持 PowerISA 2.07 指令的 PowerPC 处理器上使用。

  这种内部应用程序状态损坏的后果可能多种多样——如果调用应用程序完全不依赖于非易失性 XMM 寄存器的内容，则可能没有后果；最坏的情况是攻击者可能完全控制应用程序进程。但是，除非编译器使用向量寄存器存储指针，否则最可能的后果（如果有的话）将是某些应用程序相关计算的结果不正确或崩溃导致拒绝服务。

  ([CVE-2023-6129])

  *Rohan McLure*

* 当 OpenSSL 配置为 `no-apps` 时，禁用构建 QUIC 服务器实用程序。

  *Vitalii Koshura*

### 3.1 和 3.2.0 之间的更改 [23 Nov 2023]

* 修复了使用较大的 Q 参数值时 DH 检查/生成花费过多时间的问题。

  使用 DH_generate_key() 函数生成 X9.42 DH 密钥的应用程序可能会遇到长时间延迟。同样，使用 DH_check_pub_key()、DH_check_pub_key_ex() 或 EVP_PKEY_public_check() 检查 X9.42 DH 密钥或 X9.42 DH 参数的应用程序可能会遇到长时间延迟。如果被检查的密钥或参数是从不受信任的来源获得的，这可能会导致拒绝服务。

  ([CVE-2023-5678])

  *Richard Levitte*

* BLAKE2b 哈希算法支持通过设置“size”参数来配置输出长度。

  *Čestmír Kalina 和 Tomáš Mráz*

* 为 Windows 上的 GHASH、RAND 和 AES 启用了额外的 Arm64 优化。

  *Evgeny Karpov*

* 添加了一个通过 URI 删除对象的函数 - OSSL_STORE_delete() 和相应的提供程序管理 API 函数 OSSL_FUNC_store_delete()。

  *Dmitry Belyavskiy*

* 添加了 OSSL_FUNC_store_open_ex() 提供程序管理 API 函数，以便在打开存储时传递密码回调。

  *Simo Sorce*

* 将 PBES2 KDF（PBKDF2 和 scrypt）使用的默认盐长度从 8 字节更改为 16 字节。
  PKCS5 (RFC 8018) 标准对 PBE 使用 64 位盐长度，并建议 PBES2 的最小盐长度为 64 位。对于 FIPS 合规性，PBKDF2 需要 128 位盐长度。这会影响 OpenSSL 命令行应用程序，例如“genrsa”和“pkcs8”，以及依赖于默认值的 API，例如 PEM_write_bio_PrivateKey()。
  已为 OpenSSL 命令行应用程序的“pkcs8”和“enc”添加了额外的命令行选项 'saltlen'，以允许将盐长度设置为非默认值。

  *Shane Lontis*

* 更改了 `ess_cert_id_alg` 配置选项的默认值，该选项用于计算 TSA 的公钥证书标识符。默认算法已更新为 sha256 而不是 sha1。

  *Małgorzata Olszówka*

* 为 aarch64 上的 SM2 算法添加了优化。它使用一个巨大的预计算表来进行基点的点乘，这使得 libcrypto 的大小从 4.4 MB 增加到 4.9 MB。已添加新的配置选项 `no-sm2-precomp` 来禁用预计算表。

  *Xu Yizhou*

* 添加了对 QUIC 的客户端支持

  *Hugo Landau, Matt Caswell, Paul Dale, Tomáš Mráz, Richard Levitte*

* 在 OpenSSL 库中添加了多个教程，特别是关于使用 libssl 编写各种客户端（使用 TLS 和 QUIC 协议）。

  *Matt Caswell*

* 使用 Solinas 的约简实现了 secp384r1，以提高 NIST P-384 椭圆曲线的速度。要启用此实现，必须使用构建选项 `enable-ec_nistp_64_gcc_128`。

  *Rohan McLure*

* 改进了 asn1parse 命令对 RFC7468 的合规性。

  *Matthias St. Pierre*

* 添加了 SHA256/192 算法支持。

  *Fergus Dall*

* 通过在适当的地方使用更多读锁来改进全局写锁的争用。

  *Matt Caswell*

* 改进了性能关键的提供程序函数中 OSSL_PARAM 查找的性能。

  *Paul Dale*

* 添加了 SSL_get0_group_name() 函数，以提供对用于 TLS 密钥交换的组名称的访问。

  *Alex Bozarth*

* 提供了一个新的配置选项 `no-http`，可用于禁用 HTTP 支持。提供新的配置选项 `no-apps` 和 `no-docs` 来禁用 openssl 命令行应用程序和文档的构建。

  *Vladimír Kotal*

* 提供了一个新的配置选项 `no-ecx`，可用于禁用 X25519、X448 和 EdDSA 支持。

  *Yi Li*

* 当多个 OSSL_KDF_PARAM_INFO 参数传递给 EVP_KDF_CTX_set_params() 函数时，它们现在会被连接起来，不仅适用于 HKDF 算法，也适用于 SSKDF 和 X9.63 KDF 算法。

  *Paul Dale*

* 添加了 OSSL_FUNC_keymgmt_im/export_types_ex() 提供程序函数，这些函数将提供程序上下文作为参数。

  *Ingo Franzki*

* TLS 往返时间计算由杨百翰大学的一个Capstone团队与桑迪亚国家实验室合作完成。ssl_lib 中的一个新函数 SSL_get_handshake_rtt 将计算并检索此值。

  *Jairus Christensen*

* 向 s_client 添加了 "-quic" 选项以启用与 QUIC 服务器的连接。QUIC 要求使用 ALPN，因此必须通过 "-alpn" 选项指定。建议使用 "-adv" 选项使用“高级”s_client 命令。

  *Matt Caswell*

* 向 s_client 添加了一个“高级”命令模式。使用 "-adv" 选项进行此操作。旧的“基本”命令模式识别某些必须始终出现在行首且无法转义的字母。高级命令模式允许在任何地方输入命令，并且有一个转义机制。使用 "-adv" 启动 s_client 后，键入 "{help}" 可显示可用命令列表。

  *Matt Caswell*

* 添加了对原始公钥 (RFC7250) 的支持。身份验证通过将密钥与本地策略（从预期密钥合成的 TLSA 记录）或 DANE（应用程序从 DNS 获取的 TLSA 记录）进行匹配来支持。如果未使用 RPK 进行协商，TLSA 记录也将匹配服务器证书中的相同密钥。

  *Todd Short*

* 为 S390x 架构添加了对模块化指数运算和 CRT 卸载的支持。

  *Juergen Christ*

* 为 RISC-V 架构添加了更多汇编代码。

  *Christoph Müllner*

* 添加了 EC_GROUP_to_params()，它从给定的 EC_GROUP 创建一个 OSSL_PARAM 数组。

  *Oliver Mihatsch*

* 改进了在解析 PKCS#12 文件时对非默认库上下文和属性查询的支持。

  *Shane Lontis*

* 实现对 RFC8032 中所有五个 EdDSA 实例的支持：Ed25519、Ed25519ctx、Ed25519ph、Ed448 和 Ed448ph。
  哈希 EdDSA 变体（Ed25519ph 和 Ed448ph）的流式处理尚不支持。

  *James Muir*

* 为 ARM 处理器添加了 SM4 优化，使用了 ASIMD 和 AES HW 指令。

  *Xu Yizhou*

* 实现 SM4-XTS 支持。

  *Xu Yizhou*

* 添加了平台无关的 OSSL_sleep() 函数。

  *Richard Levitte*

* 实现确定性 ECDSA 签名 (RFC6979) 支持。

  *Shane Lontis*

* 实现 AES-GCM-SIV (RFC8452) 支持。

  *Todd Short*

* 添加了对可插拔（基于提供程序）TLS 签名算法的支持。这使得可以使用 OpenSSL 中未默认包含的提供程序中嵌入的算法进行 TLS 1.3 身份验证操作。结合已有的可插拔 KEM 和 X.509 支持，这使得例如合适的提供程序能够为 OpenSSL 用户提供后量子或量子安全密码学。

  *Michael Baentsch*

* 添加了对可插拔（基于提供程序）CMS 签名算法的支持。这使得可以使用 OpenSSL 中未默认包含的提供程序中嵌入的算法进行 CMS 签名和验证操作。

  *Michael Baentsch*

* 添加了对混合公钥加密 (HPKE) 的支持，如 RFC9180 中所述。HPKE 是 TLS 加密客户端问候 (ECH)、消息层安全 (MLS) 和其他 IETF 规范所必需的。HPKE 也可以被其他需要加密“到”ECDH 公钥的应用程序使用。外部 API 在 include/openssl/hpke.h 中定义，并在 doc/man3/OSSL_HPKE_CTX_new.pod 中记录。

  *Stephen Farrell*

* 在 HPKE (RFC9180) API 使用的提供程序中实现了 HPKE DHKEM 支持。

  *Shane Lontis*

* 添加了对证书压缩 (RFC8879) 的支持，包括对 Brotli 和 Zstandard 压缩的库支持。

  *Todd Short*

* 添加了向 PKCS12 文件添加自定义属性的功能。添加了一个新的 API PKCS12_create_ex2，它与现有的 PKCS12_create_ex 相同，但允许用户指定的函数和可选参数。
  添加了一个新的 PKCS12_SAFEBAG_set0_attr，它允许将新属性添加到现有的 STACK_OF 属性中。

  *Graham Woodward*

* libssl 记录层的主要重构。

  *Matt Caswell*

* 为 pkcs12 命令添加了一个 mac 盐长度选项。

  *Xinping Chen*

* 添加了 RFC8723 和 RFC8269 中的更多 SRTP 保护配置文件。

  *Kijin Kim*

* 将内核 TLS (KTLS) 扩展到支持 TLS 1.3 接收卸载。

  *Daiki Ueno, John Baldwin 和 Dmitry Podgorny*

* 在支持并启用的 macOS、Linux 和 FreeBSD 上添加了对 TCP 快速打开 (RFC7413) 的支持。

  *Todd Short*

* 将基于 DHE_PSK (RFC 4279) 和 ECDHE_PSK (RFC 5489) 的密码套件添加到提供完美前向保密的密码套件列表中，如 SECLEVEL >= 3 所要求的。

  *Dmitry Belyavskiy, Nicola Tuveri*

* 添加了新的 SSL API 以帮助高效实现 TLS/SSL 指纹识别。SSL_CTRL_GET_IANA_GROUPS 控制代码（公开为类似 SSL_get0_iana_groups() 的宏）检索对端发送的支持的组列表。
  SSL_client_hello_get_extension_order() 函数将客户端问候中存在的扩展类型的列表按出现顺序填充到调用者提供的数组中。

  *Phus Lu*

* 修复了 PEM_write_bio_PKCS8PrivateKey() 和 PEM_write_bio_PKCS8PrivateKey_nid()，使其能够使用空密码字符串。

  *Darshan Sen*

* PKCS12_parse() 函数现在支持无 MAC 的 PKCS12 文件。

  *Daniel Fiala*

* 添加了 ASYNC_set_mem_functions() 和 ASYNC_get_mem_functions() 调用，以便能够更改用于分配异步调用堆栈内存的函数。

  *Arran Cudbard-Bell*

* 在 OSSL_PARAM API 中添加了对签名 BIGNUM 的支持。

  *Richard Levitte*

* 当使用 openssl x509 命令检查证书属性且检查失败时，将返回失败退出代码。

  *Rami Khaldi*

* 默认 SSL/TLS 安全级别已从 1 更改为 2。以前默认接受的 1024 位及以上且小于 2048 位的 RSA、DSA 和 DH 密钥以及 160 位及以上且小于 224 位的 ECC 密钥现在不再允许。默认情况下，TLS 压缩在之前的 OpenSSL 版本中已禁用。在安全级别 2 下，无法启用它。

  *Matt Caswell*

* SSL_CTX_set_cipher_list 系列函数现在接受使用其 IANA 标准名称的密码。

  *Erik Lax*

* PVK 密钥派生函数已从 b2i_PVK_bio_ex() 移动到遗留加密提供程序中作为 EVP_KDF。需要此 KDF 的应用程序需要加载遗留加密提供程序。

  *Paul Dale*

* TLS 中的 CCM8 密码套件已降级到安全级别零，因为它们使用较短的认证标签，这降低了它们的强度。

  *Paul Dale*

* X.509 对象中的主题或颁发者名称现在默认显示为 UTF-8 字符串。DN 输出中 `=` 周围的空格也被删除。

  *Dmitry Belyavskiy*

* 添加了 X.509 证书代码签名目的以及根据 CA/Browser Forum 对叶子证书的关键用法和扩展关键用法的相关检查。

  *Lutz Jänicke*

* `x509`、`ca` 和 `req` 命令现在生成 X.509 v3 证书。`req` 的 `-x509v1` 选项优先生成 X.509 v1 证书。`X509_sign()` 和 `X509_sign_ctx()` 确保如果证书信息包含 X.509 扩展，则证书为 X.509 版本 3。

  *David von Oheimb*

* 修复并扩展了证书处理以及 `x509`、`verify` 等命令，例如添加了用于调试证书链构建的跟踪功能。

  *David von Oheimb*

* 对 CMP+CRMF 实现以及 `cmp` 应用程序进行了各种修复和扩展，特别是支持各种类型的 genm/genp 交换，例如获取 CA 证书和 CMP 更新 [RFC 9480] 中定义的根 CA 证书更新，以及 `-srvcertout` 和 `-serial` CLI 选项。
  这项工作由西门子股份公司赞助。

  *David von Oheimb*

* 对 `apps/` 中的 HTTP 客户端和 HTTP 服务器进行了修复和扩展，例如纠正了 TLS 和代理支持，并添加了用于调试的跟踪。

  *David von Oheimb*

* 扩展了 CMS API 以处理 `CMS_SignedData` 和 `CMS_EnvelopedData`。

  *David von Oheimb*

* `CMS_add0_cert()` 和 `CMS_add1_cert()` 不再在要添加的证书已存在时抛出错误。`CMS_sign_ex()` 和 `CMS_sign()` 现在会忽略其 `certs` 参数中的任何重复证书，并且不再为它们抛出错误。

  *David von Oheimb*

* 修复并扩展了 `util/check-format.pl` 以检查是否符合编码风格 <https://www.openssl.org/policies/technical/coding-style.html>。
  这些检查现在更加完整，并且产生的误报更少。

  *David von Oheimb*

* 添加了 BIO_s_dgram_pair() 和 BIO_s_dgram_mem()，它们提供具有数据报语义的基于内存的 BIO，并支持 BIO_sendmmsg() 和 BIO_recvmmsg() 调用。它们可用作 QUIC 的传输 BIO。

  *Hugo Landau, Matt Caswell 和 Tomáš Mráz*

* 添加了新的 BIO_sendmmsg() 和 BIO_recvmmsg() BIO 方法，允许在一次调用中发送和接收多个消息。为 BIO_dgram 提供了实现。有关更多详细信息，请参阅 BIO_sendmmsg(3)。

  *Hugo Landau*

* 添加了从 Windows 证书存储加载根证书的支持。该支持以一种识别 `org.openssl.winstore://` URI 字符串的存储形式提供。此 URI 方案目前不接受任何参数。此存储默认构建，并可以使用新的编译时选项 `no-winstore` 禁用。此存储目前不默认使用，必须使用上述存储 URI 显式加载。预计将来会默认加载它。

  *Hugo Landau*

* 启用 KTLS 与 TLS 1.3 CCM 模式密码套件。请注意，一些支持 KTLS 的 Linux 内核版本在 CCM 处理方面存在已知错误。该错误已在 5.4.164、5.10.84、5.15.7 的稳定版本以及 5.16 以后的所有版本中修复。KTLS 与 CCM 密码套件应仅在这些版本上使用。

  *Tianjia Zhang*

* 向 `s_server` 和 `s_client` 命令添加了 `-ktls` 选项以启用 KTLS 支持。

  *Tianjia Zhang*

* Linux 上的零拷贝 KTLS sendfile() 支持。

  *Maxim Mikityanskiy*

* OBJ_ 调用现在使用全局锁实现线程安全。

  *Paul Dale*

* openssl cms 命令的新参数 `-digest`，允许对预计算的摘要进行签名，以及支持该功能的新 CMS API 函数。

  *Viktor Söderqvist*

* OPENSSL_malloc() 和其他分配函数现在在分配失败时引发错误。调用者无需显式引发错误，除非他们出于跟踪目的想要这样做。

  *David von Oheimb*

* 在 RSA PKCS#1 v1.5 解密中添加并默认启用了隐式拒绝，以防止类似 Bleichenbacher 的攻击。如果 RSA 解密 API 在检查 PKCS#1 v1.5 解密期间的填充时检测到错误，它将返回一个随机生成的确定性消息而不是错误。这是针对 CVE-2020-25659 和 CVE-2020-25657 等问题的通用保护。可以通过在 RSA 解密上下文上调用 `EVP_PKEY_CTX_ctrl_str(ctx, "rsa_pkcs1_implicit_rejection". "0")` 来禁用此保护。

  *Hubert Kario*

* 为 TLS-1.3 添加了对 Brainpool 曲线的支持。

  *Bernd Edlinger 和 Matt Caswell*

* 添加了 OpenBSD 特定构建目标。

  *David Carlier*

* 添加了对 Argon2d、Argon2i、Argon2id KDF 的支持，以及为选定平台实现的基本线程池。

  *Čestmír Kalina*

OpenSSL 3.1
-----------

### 3.1.3 和 3.1.4 之间的更改 [2023 年 10 月 24 日]

*   修复了在使用 OSSL_PARAM 参数调用 EVP_EncryptInit_ex2()、EVP_DecryptInit_ex2() 或 EVP_CipherInit_ex2() 时，密钥和 IV 大小调整不正确的问题，这些参数会更改密钥或 IV 的长度（[CVE-2023-5363]）。

    *Paul Dale*

### 3.1.2 和 3.1.3 之间的更改 [2023 年 9 月 19 日]

*   修复了 POLY1305 MAC 实现损坏 Windows 上的 XMM 寄存器的问题。

    OpenSSL 中的 POLY1305 MAC（消息认证码）实现，在计算大于 64 字节的数据的 MAC 时，不会在 Windows 64 位平台上保存非易失性 XMM 寄存器的内容。在返回给调用者之前，所有 XMM 寄存器都被设置为零，而不是恢复其先前的内容。易受攻击的代码仅用于支持 AVX512-IFMA 指令的新型 x86_64 处理器。

    这种内部应用程序状态损坏的后果可能多种多样——从没有后果（如果调用应用程序根本不依赖于非易失性 XMM 寄存器的内容），到最坏的后果（攻击者可能完全控制应用程序进程）。然而，鉴于寄存器的内容只是被清零，攻击者无法放入任意值，最可能的后果（如果有的话）是某些应用程序依赖的计算结果不正确或崩溃导致拒绝服务。

    ([CVE-2023-4807])

    *Bernd Edlinger*

### 3.1.1 和 3.1.2 之间的更改 [2023 年 8 月 1 日]

*   修复了检查 DH q 参数值花费过多时间的问题。

    DH_check() 函数对 DH 参数执行各种检查。在修复 CVE-2023-3446 后发现，较大的 q 参数值也可能在某些检查期间触发过长的计算。如果存在正确的 q 值，它不能大于模数 p 参数，因此在 q 大于 p 时执行这些检查是不必要的。

    如果使用这样的 q 参数值调用 DH_check()，则会设置 DH_CHECK_INVALID_Q_VALUE 返回标志，并跳过计算密集型检查。

    ([CVE-2023-3817])

    *Tomáš Mráz*

*   修复了 DH_check() 处理过大模数时花费过多时间的问题。

    DH_check() 函数对 DH 参数执行各种检查。其中一项检查确认模数（“p”参数）不过大。尝试使用非常大的模数速度很慢，OpenSSL 通常不会使用长度超过 10,000 位的模数。

    然而，DH_check() 函数会检查所提供密钥或参数的许多方面。其中一些检查会使用提供的模数值，即使它已被发现过大。

    DH_check() 中增加了一个新的限制，为 32,768 位。提供超过此大小的模数的密钥/参数将导致 DH_check() 失败。

    ([CVE-2023-3446])

    *Matt Caswell*

*   不要忽略 AES-SIV 的空关联数据条目。

    AES-SIV 算法允许对多个关联数据条目进行身份验证以及加密。要对空数据进行身份验证，应用程序必须调用 `EVP_EncryptUpdate()`（或 `EVP_CipherUpdate()`），将输出缓冲区设置为 NULL 指针，并将输入缓冲区长度设置为 0。OpenSSL 中的 AES-SIV 实现仅为此类调用返回成功，而不是执行关联数据身份验证操作。因此，空数据将不会被身份验证。（[CVE-2023-2975]）

    感谢 Google 的 Juerg Wullschleger 发现此问题。

    此修复程序会更改身份验证标签值和密文，适用于使用 AES-SIV 的空关联数据条目的应用程序。要解密使用先前版本 OpenSSL 加密的数据，应用程序必须跳过对空关联数据条目的 `EVP_DecryptUpdate()` 调用。

    *Tomáš Mráz*

*   当使用 `enable-fips` 选项构建并使用生成的 FIPS provider 时，TLS 1.2 默认将强制使用扩展主密钥（FIPS 140-3 IG G.Q），并且 Hash 和 HMAC DRBG 将不会使用截断的摘要进行操作（FIPS 140-3 IG G.R）。

    *Paul Dale*

### 3.1.0 和 3.1.1 之间的更改 [2023 年 5 月 30 日]

*   缓解了 `OBJ_obj2txt` 将巨大的 OBJECT IDENTIFIER 子标识符转换为规范数字文本形式所需的时间。

    OBJ_obj2txt() 会将任何大小的 OBJECT IDENTIFIER 转换为规范数字文本形式。对于巨大的子标识符，这将花费很长时间，时间复杂度为 O(n^2)，其中 n 是该子标识符的大小。（[CVE-2023-2650]）

    为了缓解这个问题，`OBJ_obj2txt()` 仅在 OBJECT IDENTIFIER 的大小小于或等于 586 字节时才将其转换为规范数字文本形式，否则将失败。

    此限制基于 [RFC 2578 (STD 58), section 3.5]。OBJECT IDENTIFIER 值规定，OBJECT IDENTIFIER 最多可以有 128 个子标识符，每个子标识符的最大值可以是 2^32-1（十进制为 4294967295）。

    对于每个子标识符的每个字节，只有低 7 位是值的一部分，因此具有这些限制的 OBJECT IDENTIFIER 可能占用的最大字节数为 32 * 128 / 7，约为 586 字节。

    *Richard Levitte*

*   修复了 ARM BE 平台上的多个算法实现问题。

    *Liu-ErMeng*

*   向 fipsinstall 添加了 `-pedantic` 选项，该选项会调整各种设置以确保严格符合 FIPS 标准，而不是向后兼容。

    *Paul Dale*

*   修复了 ARM 64 位平台上的 AES-XTS 解密中的缓冲区越读问题，当缓冲区大小为 16 字节 AES 块的 4 mod 5 时会发生此问题。如果缓冲区之后的内存未映射，这可能会触发使用 AES-XTS 解密的应用程序崩溃。
    感谢 Amazon 的 Anton Romanov 发现此问题。
    ([CVE-2023-1255])

    *Nevine Ebeid*

*   重构了 RSA 解密中的时序攻击修复程序（[CVE-2022-4304]）。
    先前对该时序侧信道的修复导致与 3.0.7 相比，在典型用例中性能严重下降 2-3 倍。新的修复程序使用了现有的恒定时间代码路径，恢复了之前的性能水平，同时完全消除了所有现有的时序侧信道。
    该修复程序由 Bernd Edlinger 开发，Hubert Kario 提供测试支持。

    *Bernd Edlinger*

*   添加了 FIPS provider 配置选项，以禁止将截断的摘要与 Hash 和 HMAC DRBG 一起使用（参见 FIPS 140-3 IG D.R.）。
    可以通过将选项 `'-no_drbg_truncated_digests'` 可选地提供给 `'openssl fipsinstall'` 来实现。

    *Paul Dale*

*   更正了 X509_VERIFY_PARAM_add0_policy() 的文档，指出它不会启用策略检查。感谢 David Benjamin 发现此问题。
    ([CVE-2023-0466])

    *Tomáš Mráz*

*   修复了叶子证书中的无效证书策略被 OpenSSL 默默忽略，并且该证书的其他证书策略检查被跳过的问题。恶意的 CA 可以利用此问题故意断言无效的证书策略，从而完全规避对该证书的策略检查。
    ([CVE-2023-0465])

    *Matt Caswell*

*   限制了策略树中创建的节点数量，以缓解 CVE-2023-0464。默认限制设置为 1000 个节点，这对于大多数安装来说应该足够了。如果需要，可以通过将 OPENSSL_POLICY_TREE_NODES_MAX 构建时定义设置为所需的节点最大数量或零以允许无限增长来调整限制。
    ([CVE-2023-0464])

    *Paul Dale*

### 3.0 和 3.1.0 之间的更改 [2023 年 3 月 14 日]

*   添加了 FIPS provider 配置选项，以强制在 TLS1_PRF KDF 期间进行扩展主密钥（EMS）检查。
    可以通过将选项 `'-ems_check'` 可选地提供给 `'openssl fipsinstall'` 来实现。

    *Shane Lontis*

*   FIPS provider 包含一些非批准的算法以实现向后兼容性，并且必须使用 "fips=yes" 属性查询来获取所有算法，以确保 FIPS 合规性。

    包含但未批准的算法是 Triple DES ECB、Triple DES CBC 和 EdDSA。

    *Paul Dale*

*   在 KBKDF 中添加了对 KMAC 的支持。

    *Shane Lontis*

*   在 provider 函数中支持 RNDR 和 RNDRRS，为 Arm CPU (aarch64) 提供随机数生成。

    *Orr Toledano*

*   `s_client` 和 `s_server` 命令现在会明确指出 TLS 版本是否不包含重新协商机制。这避免了该场景与 TLS 版本包含安全重新协商但对端不支持该机制之间的混淆。

    *Felipe Gasper*

*   使用 AVX512 vAES 和 vPCLMULQDQ 启用了 AES-GCM。

    *Tomasz Kantecki, Andrey Matyukov*

*   各种 OBJ_* 函数现在是线程安全的。

    *Paul Dale*

*   为支持 AVX512_IFMA 的处理器实现了并行双素数 1536/2048 位模幂运算。

    *Sergey Kirillov, Andrey Matyukov (Intel Corp)*

*   函数 `OPENSSL_LH_stats`、`OPENSSL_LH_node_stats`、`OPENSSL_LH_node_usage_stats`、`OPENSSL_LH_stats_bio`、`OPENSSL_LH_node_stats_bio` 和 `OPENSSL_LH_node_usage_stats_bio` 从 OpenSSL 3.1 开始被标记为已弃用，并且可以通过定义 `OPENSSL_NO_DEPRECATED_3_1` 来禁用。

    宏 `DEFINE_LHASH_OF` 现在被弃用，取而代之的是宏 `DEFINE_LHASH_OF_EX`，它会忽略这些函数的相应类型特定函数定义，而不管是否定义了 `OPENSSL_NO_DEPRECATED_3_1`。

    `DEFINE_LHASH_OF` 的用户可能会收到关于这些函数的弃用警告，无论他们是否正在使用它们。建议用户迁移到新的宏 `DEFINE_LHASH_OF_EX`。

    *Hugo Landau*

*   在生成安全素数 DH 参数时，将推荐的私钥长度设置为等同于 RFC 7919 中的最小密钥长度。

    *Tomáš Mráz*

*   将 PKCS#1 RSASSA-PSS 签名的默认 salt 长度更改为小于或等于摘要长度的最大值，以符合 FIPS 186-4 第 5 部分。这是通过 `rsa_pss_saltlen` 参数的新选项 `OSSL_PKEY_RSA_PSS_SALT_LEN_AUTO_DIGEST_MAX`（"auto-digestmax"）实现的，该选项现在是默认值。签名验证不受此更改的影响，并且继续按原样工作。

    *Clemens Lang*

OpenSSL 3.0
-----------

对于 OpenSSL 3.0，已添加 [迁移指南][]，因此此处列出的 CHANGES 条目仅为简要描述。
迁移指南包含有关新功能、重大更改以及已弃用函数的大量列表的映射的更详细信息。

[迁移指南]: https://github.com/openssl/openssl/tree/master/doc/man7/migration_guide.pod

### 3.0.7 和 3.0.8 之间的更改 [2023 年 2 月 7 日]

* 修复了 PKCS7 数据验证期间的 NULL 解引用。

  在验证 PKCS7 已签名或已签名和已加密数据上的签名时，可能会发生 NULL 指针解引用。如果 OpenSSL 库知道签名所使用的哈希算法，但哈希算法的实现不可用，则摘要初始化将失败。缺少对初始化函数返回值的检查，这会导致后续对摘要 API 的无效使用，很可能导致崩溃。
  ([CVE-2023-0401])

  PKCS7 数据通过 SMIME 库调用和时间戳 (TS) 库调用进行处理。OpenSSL 中的 TLS 实现不调用这些函数，但是如果第三方应用程序调用这些函数来验证不受信任数据上的签名，则会受到影响。

  *Tomáš Mráz*

* 修复了 X.509 GeneralName 中的 X.400 地址类型混淆。

  在 X.509 GeneralName 中的 X.400 地址处理方面存在类型混淆漏洞。X.400 地址被解析为 ASN1_STRING，但 GENERAL_NAME 的公共结构定义错误地将 x400Address 字段的类型指定为 ASN1_TYPE。该字段随后被 OpenSSL 函数 GENERAL_NAME_cmp 解释为 ASN1_TYPE 而不是 ASN1_STRING。

  当启用 CRL 检查时（即应用程序设置 X509_V_FLAG_CRL_CHECK 标志），此漏洞可能允许攻击者将任意指针传递给 memcmp 调用，从而使他们能够读取内存内容或造成拒绝服务。
  ([CVE-2023-0286])

  *Hugo Landau*

* 修复了验证 DSA 公钥时的 NULL 解引用。

  当应用程序尝试通过 EVP_PKEY_public_check() 函数检查格式错误的 DSA 公钥时，可能会触发无效的读取指针解引用。这很可能导致应用程序崩溃。此函数可以应用于来自不受信任来源的公钥，这可能允许攻击者发起拒绝服务攻击。

  OpenSSL 中的 TLS 实现不调用此函数，但如果 FIPS 140-3 等标准施加了额外的安全要求，应用程序可能会调用此函数。
  ([CVE-2023-0217])

  *Shane Lontis, Tomáš Mráz*

* 修复了 d2i_PKCS7 函数中无效的指针解引用。

  当应用程序尝试使用 d2i_PKCS7()、d2i_PKCS7_bio() 或 d2i_PKCS7_fp() 函数加载格式错误的 PKCS7 数据时，可能会触发无效的读取指针解引用。

  解引用的结果是应用程序崩溃，这可能导致拒绝服务攻击。OpenSSL 中的 TLS 实现不调用此函数，但第三方应用程序可能会在不受信任的数据上调用这些函数。
  ([CVE-2023-0216])

  *Tomáš Mráz*

* 修复了 BIO_new_NDEF 之后的 Use-after-free。

  公共 API 函数 BIO_new_NDEF 是一个辅助函数，用于通过 BIO 流式传输 ASN.1 数据。它主要在 OpenSSL 内部用于支持 SMIME、CMS 和 PKCS7 流式传输功能，但也可以由最终用户应用程序直接调用。

  该函数从调用者接收一个 BIO，将其前面添加一个新 BIO_f_asn1 过滤器 BIO，形成一个 BIO 链，然后将新的 BIO 链头部返回给调用者。在某些条件下，例如 CMS 接收方公钥无效，新的过滤器 BIO 会被释放，函数返回 NULL 表示失败。但是，在这种情况下，BIO 链没有被正确清理，调用者传入的 BIO 仍然保留对先前已释放的过滤器 BIO 的内部指针。如果调用者随后对 BIO 调用 BIO_pop()，则会发生 use-after-free。这很可能导致崩溃。
  ([CVE-2023-0215])

  *Viktor Dukhovni, Matt Caswell*

* 修复了调用 PEM_read_bio_ex 后发生的双重释放。

  PEM_read_bio_ex() 函数从 BIO 读取 PEM 文件，并解析和解码“名称”（例如，“CERTIFICATE”）、任何头部数据和有效负载数据。如果函数成功，则“name_out”、“header”和“data”参数将填充包含相关解码数据的缓冲区指针。调用者负责释放这些缓冲区。可以构造一个 PEM 文件，该文件导致有效负载数据为 0 字节。在这种情况下，PEM_read_bio_ex() 将返回失败代码，但会将 header 参数填充为指向已释放缓冲区的指针。如果调用者也释放此缓冲区，则会发生双重释放。这很可能导致崩溃。

  PEM_read_bio() 和 PEM_read() 函数是 PEM_read_bio_ex() 的简单包装器，因此这些函数也直接受到影响。

  这些函数还被许多其他 OpenSSL 函数间接调用，包括 PEM_X509_INFO_read_bio_ex() 和 SSL_CTX_use_serverinfo_file()，这些函数也存在漏洞。OpenSSL 内部对这些函数的一些使用不存在漏洞，因为调用者在 PEM_read_bio_ex() 返回失败代码时不会释放 header 参数。
  ([CVE-2022-4450])

  *Kurt Roeckx, Matt Caswell*

* 修复了 RSA 解密中的时序 Oracle。

  OpenSSL RSA 解密实现中存在一个基于时序的侧信道，这足以在 Bleichenbacher 式攻击中通过网络恢复明文。为了成功解密，攻击者必须能够发送大量的试探性消息进行解密。该漏洞会影响所有 RSA 填充模式：PKCS#1 v1.5、RSA-OEAP 和 RSASVE。
  ([CVE-2022-4304])

  *Dmitry Belyavsky, Hubert Kario*

* 修复了 X.509 名称约束读取缓冲区溢出。

  在 X.509 证书验证中，特别是在名称约束检查中，可能会触发读取缓冲区溢出。读取缓冲区溢出可能导致崩溃，从而导致拒绝服务攻击。在 TLS 客户端中，可以通过连接到恶意服务器来触发此问题。在 TLS 服务器中，如果服务器请求客户端身份验证并且有恶意客户端连接，则可以触发此问题。
  ([CVE-2022-4203])

  *Viktor Dukhovni*

* 修复了 X.509 策略约束双重锁定安全问题。

  如果 X.509 证书包含格式错误的策略约束并且启用了策略处理，则会递归地获取写锁两次。在某些操作系统（最常见的是 Windows）上，这会导致受影响的进程挂起，从而造成拒绝服务。在面向公众的服务器上启用策略处理不被认为是常见设置。
  ([CVE-2022-3996])

  *Paul Dale*

* 我们提供商实现的 EC 和 SM2 密钥的 `OSSL_FUNC_KEYMGMT_EXPORT` 和 `OSSL_FUNC_KEYMGMT_GET_PARAMS` 现在会根据设置的 `OSSL_PKEY_PARAM_EC_POINT_CONVERSION_FORMAT`（默认为 `POINT_CONVERSION_UNCOMPRESSED`）来处理 `OSSL_PKEY_PARAM_PUB_KEY` 的导出，而不是像之前的 3.x 版本那样无条件使用 `POINT_CONVERSION_COMPRESSED`。
  为了对称性，我们对遗留 EC 和 SM2 密钥的 `EVP_PKEY_ASN1_METHOD->export_to` 实现也进行了类似的更改，以便在通过 `EVP_PKEY_export()` 调用此函数时，能够根据导出的底层 `EC_KEY` 对象中指定的等效转换格式来处理。

  *Nicola Tuveri*

### 3.0.6 和 3.0.7 之间的更改 [2022 年 11 月 1 日]

* 修复了 punycode 解码函数中的两个缓冲区溢出。

  在 X.509 证书验证中，特别是在名称约束检查中，可能会触发缓冲区溢出。请注意，这发生在证书链签名验证之后，并且需要 CA 签署了恶意证书，或者应用程序在无法构建到受信任发行者的路径时继续进行证书验证。

  在 TLS 客户端中，可以通过连接到恶意服务器来触发此问题。在 TLS 服务器中，如果服务器请求客户端身份验证并且有恶意客户端连接，则可以触发此问题。

  攻击者可以构造一个恶意的电子邮件地址，在堆栈上溢出任意数量包含“.”字符（十进制 46）的字节。此缓冲区溢出可能导致崩溃（造成拒绝服务）。
  ([CVE-2022-3786])

  攻击者可以构造一个恶意的电子邮件地址，在堆栈上溢出四个攻击者控制的字节。此缓冲区溢出可能导致崩溃（造成拒绝服务），或者根据给定平台/编译器的堆栈布局，可能导致远程代码执行。
  ([CVE-2022-3602])

  *Paul Dale*

* 删除了 OpenSSL 代码中对无效 OSSL_PKEY_PARAM_RSA CRT 参数名称的所有引用。
  应用程序不应使用名称 OSSL_PKEY_PARAM_RSA_FACTOR、OSSL_PKEY_PARAM_RSA_EXPONENT 和 OSSL_PKEY_PARAM_RSA_COEFFICIENT。
  使用编号名称，例如 OSSL_PKEY_PARAM_RSA_FACTOR1。
  使用这些无效名称可能会导致算法使用忽略 CRT 参数的较慢方法。

  *Shane Lontis*

* 修复了 3.0.6 版本中引入的导致某些堆栈操作出错的回归问题。

  *Tomáš Mráz*

* 修复了 3.0.6 版本中引入的未在签名证书之前刷新要签名的证书数据的回归问题。

  *Gibeom Gwon*

* 将 RIPEMD160 添加到默认提供程序。

  *Paul Dale*

* 确保为密钥交换发送或接受的密钥共享组允许用于协议版本。

  *Matt Caswell*

### 3.0.5 和 3.0.6 之间的更改 [2022 年 10 月 11 日]

* OpenSSL 支持通过遗留的 EVP_CIPHER_meth_new() 函数和相关函数调用创建自定义密码。此函数在 OpenSSL 3.0 中已弃用，应用程序作者应改用新的提供程序机制来实现自定义密码。

  OpenSSL 版本 3.0.0 至 3.0.5 错误地处理传递给 EVP_EncryptInit_ex2()、EVP_DecryptInit_ex2() 和 EVP_CipherInit_ex2() 函数（以及其他类似命名的加密和解密初始化函数）的遗留自定义密码。它没有直接使用自定义密码，而是错误地尝试从可用提供程序中获取等效密码。等效密码是根据传递给 EVP_CIPHER_meth_new() 的 NID 找到的。此 NID 应代表给定密码的唯一 NID。但是，应用程序可能会在调用 EVP_CIPHER_meth_new() 时错误地将 NID_undef 作为此值传递。当以这种方式使用 NID_undef 时，OpenSSL 加密/解密初始化函数会将 NULL 密码匹配为等效项，并从可用提供程序中获取它。如果已加载默认提供程序（或已加载提供此密码的第三方提供程序），则此操作将成功。使用 NULL 密码意味着明文被作为密文发出。

  只有在调用 EVP_CIPHER_meth_new() 并使用 NID_undef，然后将其用于加密/解密初始化函数调用时，应用程序才会受到此问题的影响。仅使用 SSL/TLS 的应用程序不受此问题的影响。
  ([CVE-2022-3358])

  *Matt Caswell*

* 修复了 LLVM 与 Apple LLVM 版本号混淆的问题，该问题导致 MacOS 10.11 上的构建失败。

  *Richard Levitte*

* 修复了 linux-mips64 Configure 目标，该目标缺少 SIXTY_FOUR_BIT bn_ops 标志。这导致该平台上的堆损坏。

  *Adam Joseph*

* 修复了 TLSv1.3 中返回 0 的 ticket 密钥回调的处理，以不发送 ticket。

  *Matt Caswell*

* 正确处理 DTLS 中的重传 ClientHello。

  *Matt Caswell*

* 修复了 Linux 交叉编译环境中 ktls 支持的检测。

  *Tomas Mraz*

* 修复了运行 3.0.0 FIPS 提供程序与 3.0.x 时的某些回归和测试失败。

  *Paul Dale*

* 修复了 DTLS 下 SSL_pending() 和 SSL_has_pending() 在某些情况下未能报告正确结果的问题。

  *Matt Caswell*

* 通过定义 VirtualLock 来修复 UWP 构建。

  *Charles Milette*

* 对于已知的安全素数，使用 RFC 7919 所需的最小密钥长度。
  更长的私钥大小会不必要地增加计算共享密钥所需的周期，而不会增加实际安全性。这修复了 1.1.1 中为已知安全素数生成这些较短密钥的回归问题。

  *Tomas Mraz*

* 添加了 loongarch64 目标。

  *Shi Pujin*

* 修复了 EC ASM 标志传递。EC 曲线的 ASM 实现的标志仅传递给 FIPS 提供程序，而未传递给默认或遗留提供程序。

  *Juergen Christ*

* 修复了 aarch64 上报告的性能下降问题。恢复了提交 2621751（“aes/asm/aesv8-armx.pl: 避免在 CTR 模式下进行 32 位通道分配”）之前的实现，仅适用于 64 位目标，因为据报道其速度慢 2-17%，并且硅片勘误仅影响 32 位目标。
  新算法仍用于 32 位目标。

  *Bernd Edlinger*

* 添加了 memcmp 所需的缺失头文件，该文件导致某些平台上的编译失败。

  *Gregor Jasny*

### 3.0.4 和 3.0.5 之间的更改 [2022 年 7 月 5 日]

* OpenSSL 3.0.4 版本在支持 AVX512IFMA 指令的 X86_64 CPU 的 RSA 实现中引入了一个严重错误。
  此问题导致此类机器上的 RSA 实现（使用 2048 位私钥）不正确，并且在计算过程中会发生内存损坏。作为内存损坏的结果，攻击者可能能够在执行计算的机器上触发远程代码执行。

  在支持 X86_64 架构的 AVX512IFMA 指令的机器上运行的、使用 2048 位 RSA 私钥的 SSL/TLS 服务器或其他服务器会受到此问题的影响。
  ([CVE-2022-2274])

  *Xi Ruoyao*

* 针对使用 AES-NI 程序集优化实现的 32 位 x86 平台的 AES OCB 模式，在某些情况下不会加密全部数据。这可能会暴露内存中已存在但未写入的十六个字节的数据。在“原地”加密的特殊情况下，会暴露十六个字节的明文。

  由于 OpenSSL 不支持 TLS 和 DTLS 的基于 OCB 的密码套件，因此两者均不受影响。
  ([CVE-2022-2097])

  *Alex Chernyakhovsky, David Benjamin, Alejandro Sedeño*

### 3.0.3 和 3.0.4 之间的更改 [2022 年 6 月 21 日]

* 除了在 CVE-2022-1292 中发现的 c_rehash shell 命令注入之外，还修复了 c_rehash 脚本未能正确清理 shell 元字符以防止命令注入的进一步错误。

  在修复 CVE-2022-1292 时，并未发现脚本中存在其他地方可能将正在哈希的证书的文件名传递给通过 shell 执行的命令。

  此脚本由某些操作系统以自动执行的方式分发。在这些操作系统上，攻击者可以以脚本的权限执行任意命令。

  c_rehash 脚本的使用被认为已过时，应替换为 OpenSSL rehash 命令行工具。
  (CVE-2022-2068)

  *Daniel Fiala, Tomáš Mráz*

* 不区分大小写的字符串比较不再使用区域设置。它已被直接实现。

  *Paul Dale*

### 3.0.2 和 3.0.3 之间的更改 [2022 年 5 月 3 日]

* 不区分大小写的字符串比较通过新的与区域设置无关的比较函数 OPENSSL_str[n]casecmp 重新实现，始终使用 POSIX 区域设置进行比较。之前的实现在使用土耳其语区域设置时存在问题。

  *Dmitry Belyavsky*

* 修复了 c_rehash 脚本中的一个错误，该脚本未能正确清理 shell 元字符以防止命令注入。此脚本由某些操作系统以自动执行的方式分发。在这些操作系统上，攻击者可以以脚本的权限执行任意命令。

  c_rehash 脚本的使用被认为已过时，应替换为 OpenSSL rehash 命令行工具。
  (CVE-2022-1292)

  *Tomáš Mráz*

* 修复了 `OCSP_basic_verify` 函数中的一个错误，该函数用于验证 OCSP 响应上的签名者证书。在（非默认）OCSP_NOCHECKS 标志被使用的情况下，该错误导致函数返回正响应（表示验证成功），即使响应签名证书验证失败。

  预计大多数 `OCSP_basic_verify` 用户不会使用 OCSP_NOCHECKS 标志。在这种情况下，`OCSP_basic_verify` 函数将在证书验证失败的情况下返回负值（表示致命错误）。在这种情况下，正常的预期返回值将是 0。

  此问题也影响命令行 OpenSSL "ocsp" 应用程序。当使用 "-no_cert_checks" 选项验证 ocsp 响应时，命令行应用程序将报告验证成功，即使它实际上已失败。在这种情况下，不正确的成功响应也将伴随显示失败并与明显成功的結果相矛盾的错误消息。
  ([CVE-2022-1343])

  *Matt Caswell*

* 修复了 RC4-MD5 密码套件错误地将 AAD 数据用作 MAC 密钥的错误。这使得 MAC 密钥可以轻易预测。

  攻击者可以通过执行中间人攻击来修改从一个端点发送到 OpenSSL 3.0 接收方的数据，从而使修改后的数据仍然通过 MAC 完整性检查。

  请注意，从 OpenSSL 3.0 端点发送到非 OpenSSL 3.0 端点的数据将始终被接收方拒绝，并且连接将在该点失败。许多应用程序协议要求首先从客户端发送数据到服务器。因此，在这种情况下，只有 OpenSSL 3.0 服务器在与非 OpenSSL 3.0 客户端通信时会受到影响。

  如果两个端点都是 OpenSSL 3.0，则攻击者可以修改两个方向发送的数据。在这种情况下，无论应用程序协议如何，客户端和服务器都可能受到影响。

  请注意，在没有攻击者的情况下，此错误意味着 OpenSSL 3.0 端点与非 OpenSSL 3.0 端点通信时，在使用此密码套件时将无法完成握手。

  此问题不会影响数据的机密性，即攻击者无法解密使用此密码套件加密的数据 - 他们只能修改它。

  为了使此攻击生效，两个端点必须合法地协商 RC4-MD5 密码套件。此密码套件在 OpenSSL 3.0 中默认不编译，并且在默认提供程序或默认密码套件列表中不可用。如果已协商 TLSv1.3，则永远不会使用此密码套件。为了使 OpenSSL 3.0 端点使用此密码套件，必须发生以下情况：

  1) OpenSSL 必须使用（非默认）编译时选项 enable-weak-ssl-ciphers 进行编译。

  2) OpenSSL 必须已显式加载遗留提供程序（通过应用程序代码或配置文件）。

  3) 必须将密码套件显式添加到密码套件列表中。

  4) libssl 安全级别必须设置为 0（默认为 1）。

  5) 必须协商低于 TLSv1.3 的 SSL/TLS 版本。

  6) 两个端点必须协商 RC4-MD5 密码套件，而不是两者都通用的任何其他密码套件。
  ([CVE-2022-1434])

  *Matt Caswell*

* 修复了 OPENSSL_LH_flush() 函数中的一个错误，该错误会破坏被移除哈希表条目所占用的内存的重用。

  此函数在解码证书或密钥时使用。如果一个长期运行的进程会定期解码证书或密钥，其内存使用量将无限增长，并且该进程可能会被操作系统终止，从而导致拒绝服务。此外，遍历空哈希表条目将花费越来越多的时间。

  通常，这种长期运行的进程可能是配置为接受客户端证书身份验证的 TLS 客户端或 TLS 服务器。
  (CVE-2022-1473)

  *Hugo Landau, Aliaksei Levin*

* `OPENSSL_LH_stats` 和 `OPENSSL_LH_stats_bio` 函数现在仅报告 `num_items`、`num_nodes` 和 `num_alloc_nodes` 统计信息。所有其他统计信息不再受支持。为了兼容性，这些统计信息仍列在输出中，但现在始终报告为零。

  *Hugo Landau*

### 3.0.1 和 3.0.2 之间的更改 [2022 年 3 月 15 日]

* 修复了 BN_mod_sqrt() 函数中的一个错误，该错误可能导致其对非素数模数无限循环。

  此函数在内部用于解析包含压缩形式椭圆曲线公钥的证书，或包含压缩形式基点的显式椭圆曲线参数。

  可以通过构造一个具有无效显式曲线参数的证书来触发无限循环。

  由于证书解析发生在验证证书签名之前，因此解析外部提供的证书的任何进程都可能遭受拒绝服务攻击。解析构造的私钥时也可以达到无限循环，因为它们可能包含显式椭圆曲线参数。

  因此，易受攻击的情况包括：

   - 使用服务器证书的 TLS 客户端
   - 使用客户端证书的 TLS 服务器
   - 托管提供商从客户那里获取证书或私钥
   - 证书颁发机构解析订阅者的证书请求
   - 任何其他解析 ASN.1 椭圆曲线参数的内容

  此外，任何使用 BN_mod_sqrt() 且攻击者可以控制参数值的应用程序都容易受到此 DoS 问题的影响。
  ([CVE-2022-0778])

  *Tomáš Mráz*

* 添加了基于 DHE_PSK (RFC 4279) 和 ECDHE_PSK (RFC 5489) 的密码套件到提供 Perfect Forward Secrecy 的密码套件列表中，如 SECLEVEL >= 3 所要求。

  *Dmitry Belyavsky, Nicola Tuveri*

* 使 AES 常量时间代码（用于无汇编配置）成为可选的，因为其导致 95% 的性能下降。
  可以通过以下方式启用 AES 常量时间代码（用于无汇编构建）：./config no-asm -DOPENSSL_AES_CONST_TIME

  *Paul Dale*

* 修复了 PEM_write_bio_PKCS8PrivateKey()，使其可以使用空密码字符串。

  *Darshan Sen*

* 撤销了对证书验证回调的负返回值处理。替代方法是使用 SSL_set_retry_verify() 函数设置验证重试状态。

  *Tomáš Mráz*

### 3.0.0 和 3.0.1 之间的更改 [2021 年 12 月 14 日]

* 修复了 BN_mod_exp 中的进位错误，该错误可能在 MIPS 过程的平方运算中产生不正确的结果。许多 EC 算法受到影响，包括一些 TLS 1.3 的默认曲线。由于攻击的先决条件被认为不太可能发生，并且包括重用私钥，因此影响尚未得到详细分析。分析表明，由于此缺陷导致的 RSA 和 DSA 攻击将非常难以执行，并且不认为可能发生。DH 攻击被认为只是可行（尽管非常困难），因为推导出私钥信息所需的大部分工作可以在离线完成。
  此类攻击所需的资源量将很大。
  然而，为了使 TLS 攻击有意义，服务器必须在多个客户端之间共享 DH 私钥，这自 CVE-2016-0701 起已不再可能。
  该问题仅影响 OpenSSL 在 MIPS 平台上的运行。
  ([CVE-2021-4160])

  *Bernd Edlinger*

* 修复了 libssl 中 X509_verify_cert() 内部错误的无效处理。在 OpenSSL 中，libssl 在客户端使用 X509_verify_cert() 来验证服务器提供的证书。该函数可能返回负值表示内部错误（例如内存不足）。OpenSSL 会错误地处理这种负返回值，导致 IO 函数（如 SSL_connect() 或 SSL_do_handshake()）不指示成功，并且后续调用 SSL_get_error() 返回 SSL_ERROR_WANT_RETRY_VERIFY 值。此返回值仅应在应用程序先前调用 SSL_CTX_set_cert_verify_callback() 时由 OpenSSL 返回。由于大多数应用程序不这样做，SSL_get_error() 的 SSL_ERROR_WANT_RETRY_VERIFY 返回值将完全出乎意料，并且应用程序可能因此行为不正确。具体行为将取决于应用程序，但可能导致崩溃、无限循环或其他类似的错误响应。

  此问题因 OpenSSL 3.0 中另一个导致 X509_verify_cert() 在处理证书链时指示内部错误的错误而变得更加严重。当证书不包含主题备用名称扩展名，但证书颁发机构强制执行名称约束时，就会发生这种情况。即使是有效的链也可能发生此问题。
  ([CVE-2021-4044])

  *Matt Caswell*

* 修正了构建、安装和设置脚本中的一些文件名和文件引用错误，这些错误导致安装验证失败。略微增强了安装验证脚本。

  *Richard Levitte*

* 修复了 EVP_PKEY_eq()，使其可以与严格私有的密钥一起使用。

  *Richard Levitte*

* 修复了 PVK 编码器以正确查询密码。

  *Tomáš Mráz*

* 对 OSSL_HTTP API 函数进行了多项修复。

  *David von Oheimb*

* 允许 OSSL_PARAM_allocate_from_text() 对 OSSL_PARAM_INTEGER 数据类型进行符号扩展，并对与 OSSL_PARAM_UNSIGNED_INTEGER 数据类型一起使用的负数返回错误。使 OSSL_PARAM_BLD_push_BN{,_pad}() 对负数返回错误。

  *Richard Levitte*

* 允许使用 EVP_MD_CTX_copy_ex 复制未初始化的摘要上下文。

  *Tomáš Mráz*

* 修复了 FreeBSD 上 ARMv7 和 ARM64 CPU 功能的检测。

  *Allan Jude*

* 多项多线程修复。

  *Matt Caswell*

* 添加了 NULL 摘要实现以保持与 1.1.1 版本的兼容性。

  *Tomáš Mráz*

* 允许从拥有不可导出密钥的提供程序获取操作，作为回退（如果属性查询仍允许）。

  *Richard Levitte*

### 1.1.1 和 3.0.0 之间的更改 [2021 年 9 月 7 日]

 * `TLS_MAX_VERSION`、`DTLS_MAX_VERSION` 和 `DTLS_MIN_VERSION` 常量现已
   弃用。

   *Matt Caswell*

 * `OPENSSL_s390xcap` 环境变量可用于将 S390X 能力向量中的位设置为零。
   这简化了在 S390X 架构上对不同代码路径的测试。

   *Patrick Steuer*

 * 根据 FIPS 140-2 IG A.5“SP 800-38D 中的密钥/IV 对唯一性要求”，
   不允许使用 AES-GCM 加密超过 2^64 个 TLS 记录。通信将在此时失败。

   *Paul Dale*

 * `EC_GROUP_clear_free()` 函数已弃用，因为 EC_GROUP 数据中没有机密信息。

   *Nicola Tuveri*

 * 如果在 PEM 格式文件的开头遇到字节顺序标记 (BOM) 字符，则会忽略该字符。

   *Dmitry Belyavskiy*

 * 为俄罗斯 GOST 算法添加了 CMS 支持。

   *Dmitry Belyavskiy*

 * 由于加密操作的实现已移至 provider，因此各种操作参数的验证可能会推迟
   到实际执行操作时，而以前是在设置操作参数时立即发生的。

   例如，在使用 `EVP_PKEY_CTX_set_ec_paramgen_curve_nid()` 设置不支持的曲线时，
   此函数调用不会失败，但之后使用 `EVP_PKEY_CTX` 的密钥生成操作将失败。

   *OpenSSL 团队成员和许多第三方贡献者*

 * `EVP_get_cipherbyname()` 函数将为“AES-128-SIV”、“AES-128-CBC-CTS”和
   “CAMELLIA-128-CBC-CTS”等算法返回 NULL，这些算法以前只能通过低级接口访问。
   请改用 `EVP_CIPHER_fetch()` 从 provider 中检索这些算法。

   *Shane Lontis*

 * 在构建配置中设置了多库后缀的构建目标上，libdir 目录会根据系统上是否存在
   带有多库后缀的 lib 目录而变化。这种不可预测的行为已被移除，最终的多库后缀
   现在始终添加到默认的 libdir。如果添加后缀是不希望的，请使用 `--libdir=lib`
   覆盖 libdir。

   *Jan Lána*

 * Triple DES 密钥封装功能现在符合 RFC 3217，但不再与 OpenSSL 1.1.1
   互操作。

   *Paul Dale*

 * `ERR_GET_FUNC()` 函数已被移除。由于有意义的函数代码丢失，此函数只会给调用应用程序
   带来问题。

   *Paul Dale*

 * 添加了一个可配置的标志，用于将日期格式输出为 ISO 8601。不更改默认日期格式。

   *William Edmisten*

 * 早于 1300 的 MSVC 版本可能会出现链接警告，如果设置了未记录的 -DI_CAN_LIVE_WITH_LNK4049，
   则可以抑制这些警告。已移除对该标志的支持。

   *Rich Salz*

 * 重构并使 DEBUG 宏保持一致。移除未使用的 -DCONF_DEBUG、-DBN_CTX_DEBUG 和
   REF_PRINT。添加了一个新的跟踪类别，并使用它来打印引用计数。将 -DDEBUG_UNUSED
   重命名为 -DUNUSED_RESULT_DEBUG。修复 BN_DEBUG_RAND 以使其可以编译，并在设置时强制
   设置 DEBUG_RAND。将 engine_debug_ref 重命名为 ENGINE_REF_PRINT，以保持一致性。

   *Rich Salz*

 * 用于获取和设置 SSL 和 SSL_CTX 对象选项的函数签名从“unsigned long”更改为
   “uint64_t”类型。可能需要一些源代码更改。

   *Rich Salz*

 * `conf_method_st` 和 `conf_st` 的公共定义已弃用。它们将在未来的版本中被设为不透明。

   *Rich Salz 和 Tomáš Mráz*

 * 客户端发起的重新协商默认禁用。要允许它，请根据需要使用 `-client_renegotiation`
   选项、`SSL_OP_ALLOW_CLIENT_RENEGOTIATION` 标志或“ClientRenegotiation”配置参数。

   *Rich Salz*

 * 在配置文件中添加了“abspath”和“includedir”pragma，以防止或修改相对路径名包含。

   *Rich Salz*

 * OpenSSL 包含一个旨在通过 FIPS 140-2 验证的加密模块。请参阅 README-FIPS 和
   README-PROVIDERS 文件以及迁移指南。

   *OpenSSL 团队成员和许多第三方贡献者*

 * 对于 DH 和 DHX 密钥类型，允许设置的参数现在不同。

   *Shane Lontis*

 * 读取密钥、证书和 CRL 的 openssl 命令现在会自动检测输入文件的 PEM 或 DER 格式。

   *Dmitry Belyavskiy, Richard Levitte, 和 Tomáš Mráz*

 * 添加了增强的 PKCS#12 API，这些 API 接受库上下文。

   *Jon Spillett*

 * 默认的手册页后缀 ($MANSUFFIX) 已更改为“ossl”。

   *Matt Caswell*

 * 添加了对内核 TLS (KTLS) 的支持。

   *Boris Pismenny, John Baldwin 和 Andrew Gallatin*

 * 现在默认要求 RFC 5746 安全重新协商的支持才能使 SSL 或 TLS 连接成功。

   *Benjamin Kaduk*

 * `EVP_PKEY_meth_set_copy()` 函数的 `copy` 功能参数签名已更改，因此其 `src` 参数
   现在是 `const EVP_PKEY_CTX *` 而不是 `EVP_PKEY_CTX *`。类似地，`EVP_PKEY_asn1_set_public()`
   函数的 `pub_decode` 功能参数签名已更改，因此其 `pub` 参数现在是 `const X509_PUBKEY *`
   而不是 `X509_PUBKEY *`。

   *David von Oheimb*

 * 一些控制调用 (ctrl) 的错误返回值已更改。

   *Paul Dale*

 * 现在在 `EVP_PKEY_derive_set_peer()` 期间执行公钥检查。

   *Shane Lontis*

 * EVP 命名空间中许多从实现或上下文中获取值的函数已被重命名，以在其名称中包含
   get 或 get0。旧名称作为宏别名提供以保持兼容性，并且不被弃用。

   *Tomáš Mráz*

 * `EVP_PKEY_CTRL_PKCS7_ENCRYPT`、`EVP_PKEY_CTRL_PKCS7_DECRYPT`、
   `EVP_PKEY_CTRL_PKCS7_SIGN`、`EVP_PKEY_CTRL_CMS_ENCRYPT`、
   `EVP_PKEY_CTRL_CMS_DECRYPT` 和 `EVP_PKEY_CTRL_CMS_SIGN` 控制操作已弃用。

   *Tomáš Mráz*

 * `EVP_PKEY_public_check()` 和 `EVP_PKEY_param_check()` 函数现在适用于
   更多密钥类型。

 * 命令行应用程序的输出可能有一些小的更改。

   *Paul Dale*

 * 许多“打印”命令的输出可能有一些小的更改。

   *David von Oheimb*

 * 在支持的操作系统上，Windows 线程同步使用读/写原语 (SRWLock)，否则继续使用
   CriticalSection。

   *Vincent Drake*

 * 添加了过滤 BIO `BIO_f_readbuffer()`，它允许 `BIO_tell()` 和 `BIO_seek()`
   在不支持这些函数的只读 BIO 源/接收器上工作。这允许将文件 BIO 通过 stdin
   进行管道传输或重定向，并缓冲到内存中。这在 `OSSL_DECODER_from_bio()` 中内部使用。

   *Shane Lontis*

 * `OSSL_STORE_INFO_get_type()` 现在可能返回一个额外的值。在 1.1.1 中，此函数将返回
   OSSL_STORE_INFO_NAME、OSSL_STORE_INFO_PKEY、OSSL_STORE_INFO_PARAMS、
   OSSL_STORE_INFO_CERT 或 OSSL_STORE_INFO_CRL 的值之一。在 1.1.1 中，解码的公钥将
   被报告为类型 OSSL_STORE_INFO_PKEY。在 3.0 中，解码的公钥现在被报告为具有新类型
   OSSL_STORE_INFO_PUBKEY。使用此函数的应用程序应进行修改以处理更改的返回值。

   *Richard Levitte*

 * 提高了 TSP 和 CMS 高级电子签名 (CAdES) 实现对增强安全服务 (ESS, RFC 2634 和 RFC 5035)
   的遵循程度。根据 RFC 5035 的要求，如果 ESSCertID 和 ESSCertIDv2 都存在，则同时检查两者。
   在 ESSCertID{,v2} 包含多个证书标识符的情况下，更正了检查验证链的语义：这意味着那里引用的所有证书必须是验证链的一部分。

   *David von Oheimb*

 * 旧 EVP 密码（与 CAST、IDEA、SEED、RC2、RC4、RC5、DESX 和 DES 相关）的实现已移至
   legacy provider。

   *Matt Caswell*

 * EVP 摘要 MD2、MD4、MDC2、WHIRLPOOL 和 RIPEMD-160 的实现已移至
   legacy provider。

   *Matt Caswell*

 * 弃用的函数 `EVP_PKEY_get0()` 在为提供的密钥调用时现在返回 NULL。

   *Dmitry Belyavskiy*

 * 弃用的函数 `EVP_PKEY_get0_RSA()`、`EVP_PKEY_get0_DSA()`、
   `EVP_PKEY_get0_EC_KEY()`、`EVP_PKEY_get0_DH()`、`EVP_PKEY_get0_hmac()`、
   `EVP_PKEY_get0_poly1305()` 和 `EVP_PKEY_get0_siphash()` 以及同名的“get1”函数在
   OpenSSL 3.0 中的行为不同。

   *Matt Caswell*

 * 一些处理低级密钥或引擎的函数已被弃用，包括 `EVP_PKEY_set1_engine()`、
   `EVP_PKEY_get0_engine()`、`EVP_PKEY_assign()`、`EVP_PKEY_get0()`、
   `EVP_PKEY_get0_hmac()`、`EVP_PKEY_get0_poly1305()` 和
   `EVP_PKEY_get0_siphash()`。

   *Matt Caswell*

 * PKCS#5 PBKDF1 密钥派生已从 `PKCS5_PBE_keyivgen()` 移至 legacy crypto provider
   作为 EVP_KDF。需要此 KDF 的应用程序需要加载 legacy crypto provider。这包括使用此 KDF 的 PBE
   算法：
   - NID_pbeWithMD2AndDES_CBC
   - NID_pbeWithMD5AndDES_CBC
   - NID_pbeWithSHA1AndRC2_CBC
   - NID_pbeWithMD2AndRC2_CBC
   - NID_pbeWithMD5AndRC2_CBC
   - NID_pbeWithSHA1AndDES_CBC

   *Jon Spillett*

 * 弃用了过时的 BIO_set_callback()、BIO_get_callback() 和
   BIO_debug_callback() 函数。

   *Tomáš Mráz*

 * 弃用了过时的 EVP_PKEY_CTX_get0_dh_kdf_ukm() 和
   EVP_PKEY_CTX_get0_ecdh_kdf_ukm() 函数。

   *Tomáš Mráz*

 * RAND_METHOD API 已弃用。

   *Paul Dale*

 * SRP API 已弃用。

   *Matt Caswell*

 * 添加了一个编译时选项以防止缓存 provider 获取的算法。
   通过在配置时包含 no-cached-fetch 选项来启用此选项。

   *Paul Dale*

 * pkcs12 现在使用 PBKDF2、AES 和 SHA-256 作为默认值，MAC 迭代计数为
   PKCS12_DEFAULT_ITER。

   *Tomáš Mráz 和 Sahana Prasad*

 * openssl speed 命令不再使用低级 API 调用。

   *Tomáš Mráz*

 * 支持 AVX512_IFMA 处理器的并行双素数 1024 位模幂运算。

   *Ilya Albrekht, Sergey Kirillov, Andrey Matyukov (Intel Corp)*

 * 合并 Configure 选项 no-ec 和 no-dh 不再禁用 TLSv1.3。

   *Matt Caswell*

 * 实现对完全“可插拔”的 TLSv1.3 组的支持。这意味着 provider 可以提供自己的组实现（使用“密钥交换”或“密钥封装”方法），这些实现将被 libssl 自动检测和使用。

   *Matt Caswell, Nicola Tuveri*

 * 未记录的函数 X509_certificate_type() 已弃用；

   *Rich Salz*

 * 弃用了过时的 BN_pseudo_rand() 和 BN_pseudo_rand_range()。

   *Tomáš Mráz*

 * 移除了 SSLv23 的 RSA 填充模式（仅用于 SSLv2）。这包括函数
   RSA_padding_check_SSLv23() 和 RSA_padding_add_SSLv23() 以及已弃用的
   `rsautl` 命令中的 `-ssl` 选项。

   *Rich Salz*

 * 弃用了过时的 X9.31 RSA 密钥生成相关函数。

 * 通过 `SSL_CTX_set_cert_verify_callback()` 设置的回调函数虽然不允许返回大于 1 的值，
   但现在不再将其视为失败。

   *Viktor Dukhovni 和 David von Oheimb*

 * 弃用了过时的 X9.31 RSA 密钥生成相关函数
   BN_X931_generate_Xpq()、BN_X931_derive_prime_ex() 和
   BN_X931_generate_prime_ex()。

   *Tomáš Mráz*

 * 普通 2-素数 RSA 密钥的默认密钥生成方法已更改为 FIPS 186-4 B.3.6 方法。

   *Shane Lontis*

 * 弃用了 BN_is_prime_ex() 和 BN_is_prime_fasttest_ex() 函数。

   *Kurt Roeckx*

 * 弃用了 EVP_MD_CTX_set_update_fn() 和 EVP_MD_CTX_update_fn()。

   *Rich Salz*

 * 弃用了类型 OCSP_REQ_CTX 和函数 OCSP_REQ_CTX_*()，并用 OSSL_HTTP_REQ_CTX
   和函数 OSSL_HTTP_REQ_CTX_*() 替换。

   *Rich Salz, Richard Levitte, 和 David von Oheimb*

 * 弃用了 `X509_http_nbio()` 和 `X509_CRL_http_nbio()`。

   *David von Oheimb*

 * 弃用了 `OCSP_parse_url()`。

   *David von Oheimb*

 * SM2 密钥的验证已与常规 EC 密钥的验证分开。

   *Nicola Tuveri*

 * `pkey` 命令的行为已更改，
   在使用 `-check` 或 `-pubcheck`
   开关时：验证失败会触发提前退出，向父进程返回失败退出状态。

   *Nicola Tuveri*

 * 更改了 `SSL_CTX_set_ciphersuites()` 和 `SSL_set_ciphersuites()` 的行为，
   以忽略未知的密码套件。

   *Otto Hollmann*

 * `list` 命令行实用程序的 `-cipher-commands` 和 `-digest-commands`
   选项已弃用。
   请改用 `-cipher-algorithms` 和 `-digest-algorithms` 选项。

   *Dmitry Belyavskiy*

 * 添加了用于生成非对称密钥对的便捷函数：
   “快速”一次性（但功能有限）函数 L<EVP_PKEY_Q_keygen(3)>
   以及最常见情况的宏：<EVP_RSA_gen(3)> 和 L<EVP_EC_gen(3)>。

   *David von Oheimb*

 * 所有低级 EC_KEY 函数都已弃用。

   *Shane Lontis, Paul Dale, Richard Levitte, 和 Tomáš Mráz*

 * 弃用了所有 libcrypto 和 libssl 错误字符串加载函数。

   *Richard Levitte*

 * 函数 `SSL_CTX_set_tmp_dh_callback` 和 `SSL_set_tmp_dh_callback`，
   以及宏 `SSL_CTX_set_tmp_dh()` 和 `SSL_set_tmp_dh()` 已弃用。

   *Matt Caswell*

 * `passwd` 命令行工具的 `-crypt` 选项已被移除。

   *Paul Dale*

 * `x509`、`dhparam`、`dsaparam` 和 `ecparam` 命令的 -C 选项已被移除。

   *Rich Salz*

 * 向 EVP 层添加了 AES 密钥封装逆向密码的支持。

   *Shane Lontis*

 * 弃用了 `EVP_PKEY_set1_tls_encodedpoint()` 和
   `EVP_PKEY_get1_tls_encodedpoint()`。

   *Matt Caswell*

 * 安全回调（可由应用程序代码自定义）支持安全操作
   SSL_SECOP_TMP_DH。一个“其他”参数的位置错误地传递了一个 DH 对象。
   现在在所有情况下都传递了一个 EVP_PKEY。

   *Matt Caswell*

 * 向公共接口添加了 `PKCS7_get_octet_string()` 和 `PKCS7_type_is_other()`。
   它们的功能保持不变。

   *Jordan Montgomery*

 * 为“openssl list”添加了新选项“-providers”，它将显示已加载的 provider、
   它们的名称、版本和状态。它还可以选择显示它们可获取的参数。

   *Paul Dale*

 * 移除了 `EVP_PKEY_set_alias_type()`。

   *Richard Levitte*

 * 弃用了 `EVP_PKEY_CTX_set_rsa_keygen_pubexp()` 并引入了
   `EVP_PKEY_CTX_set1_rsa_keygen_pubexp()`，后者现在更受推荐。

   *Jeremy Walch*

 * 将所有“STACK”函数从内联函数更改为宏。宏参数仍然通过辅助内联函数在编译时进行类型安全检查。

   *Matt Caswell*

 * 移除了 RAND_DRBG API。

   *Paul Dale 和 Matthias St. Pierre*

 * 允许 `SSL_set1_host()` 和 `SSL_add1_host()` 接受 IP 字面量地址以及实际主机名。

   *David Woodhouse*

 * “MinProtocol”和“MaxProtocol”配置命令现在在配置基于 DTLS 的上下文时静默忽略 TLS 协议版本边界，反之亦然，在配置基于 TLS 的上下文时静默忽略 DTLS 协议版本边界。
   这些命令可以重复设置两种类型的边界。对于同时使用 TLS 和 DTLS 的应用程序，
   相应的“min_protocol”和“max_protocol”命令行开关也适用。

   为固定协议版本创建的 SSL_CTX 实例（例如 `TLSv1_server_method()`）也静默忽略版本边界。
   以前，尝试将边界应用于这些协议版本会产生错误。现在只有“版本灵活”的 SSL_CTX 实例会受到配置文件和命令行选项的限制。

   *Viktor Dukhovni*

 * `ENGINE` API 已弃用。今后应使用 providers 替换 Engines。

   *Paul Dale*

 * 重构了记录的 ERR 代码，为系统错误腾出更多空间。
   为了区分它们，宏 `ERR_SYSTEM_ERROR()` 指示给定的代码是否为系统错误（true）或 OpenSSL 错误（false）。

   *Richard Levitte*

 * 重构了测试 perl 框架，以更好地支持并行测试。

   *Nicola Tuveri 和 David von Oheimb*

 * 在 providers 中添加了密文窃取算法 AES-128-CBC-CTS、AES-192-CBC-CTS 和
   AES-256-CBC-CTS。支持 CS1、CS2 和 CS3 变体。

   *Shane Lontis*

 * “Configure”已更改为在未在命令行中给出目标时自动确定配置目标。
   因此，“config”脚本现在只是一个简单的包装器。所有文档都已更改为仅提及“Configure”。

   *Rich Salz 和 Richard Levitte*

 * 添加了一个库上下文 `OSSL_LIB_CTX`，应用程序和其他库可以使用它来形成一个单独的上下文，
   在该上下文中执行 libcrypto 操作。

   *Richard Levitte*

 * 向 OpenSSL API 添加了各种 `_ex` 函数，这些函数支持使用非默认的 `OSSL_LIB_CTX`。

   *OpenSSL 团队*

 * 如果在重新协商时丢弃了扩展主密钥扩展，则握手现在会失败。

   *Tomáš Mráz*

 * 从 `openssl` 程序中删除了交互模式。

   *Richard Levitte*

 * 弃用了 `EVP_PKEY_cmp()` 和 `EVP_PKEY_cmp_parameters()`。

   *David von Oheimb 和 Shane Lontis*

 * 弃用了 `EC_METHOD_get_field_type()`。

   *Billy Bob Brumley*

 * 弃用了 `EC_GFp_simple_method()`、`EC_GFp_mont_method()`、
   `EC_GF2m_simple_method()`、`EC_GFp_nist_method()`、`EC_GFp_nistp224_method()`、
   `EC_GFp_nistp256_method()` 和 `EC_GFp_nistp521_method()`。

   *Billy Bob Brumley*

 * 弃用了 `EC_GROUP_new()`、`EC_GROUP_method_of()` 和 `EC_POINT_method_of()`。

   *Billy Bob Brumley*

 * 添加了 CAdES-BES 签名验证支持，主要源自 Marek Klein 对 ESSCertIDv2 TS (RFC 5816)
   的贡献。

   *Filipe Raimundo da Silva*

 * 向 CMS API 添加了 CAdES-BES 签名方案和属性支持 (RFC 5126)。

   *Antonio Iacono*

 * 为 Cryptographic Message Syntax (CMS) 添加了 AuthEnvelopedData 内容类型结构 (RFC 5083)
   以及 AES-GCM 参数 (RFC 5084)。

   *Jakub Zelenka*

 * 弃用了 `EC_POINT_make_affine()` 和 `EC_POINTs_make_affine()`。

   *Billy Bob Brumley*

 * 弃用了 `EC_GROUP_precompute_mult()`、`EC_GROUP_have_precompute_mult()` 和
   `EC_KEY_precompute_mult()`。

   *Billy Bob Brumley*

 * 弃用了 `EC_POINTs_mul()`。

   *Billy Bob Brumley*

 * 移除了 `FIPS_mode()` 和 `FIPS_mode_set()`。

   *Shane Lontis*

 * 引入了新的 SSL 选项 `SSL_OP_IGNORE_UNEXPECTED_EOF`。

   *Dmitry Belyavskiy*

 * 弃用了 `EC_POINT_set_Jprojective_coordinates_GFp()` 和
   `EC_POINT_get_Jprojective_coordinates_GFp()`。

   *Billy Bob Brumley*

 * 向公共接口添加了 `OSSL_PARAM_BLD`。这允许通过一系列实用函数更轻松地构建
   `OSSL_PARAM` 数组。使用 `OSSL_PARAM_BLD_new()` 创建参数构建器，使用各种 push 函数添加参数，
   最后使用 `OSSL_PARAM_BLD_to_param()` 转换为可传递的 `OSSL_PARAM` 数组。

   *Paul Dale*

 * TLS 中基于 SHA1 和 MD5 的签名的安全强度已降低。

   *Kurt Roeckx*

 * 添加了 `EVP_PKEY_set_type_by_keymgmt()`，用于初始化一个 EVP_PKEY 以包含 provider
   端的内部密钥。

   *Richard Levitte*

 * `ASN1_verify()`、`ASN1_digest()` 和 `ASN1_sign()` 已弃用。

   *Richard Levitte*

 * 尚未具有正确文件名扩展名的项目文本文件（`HACKING`、`LICENSE`、`NOTES*`、
   `README*`、`VERSION`）已重命名为 `*.md`（如果合理），否则为 `*.txt`，以便更好地与文件管理器配合使用。

   *David von Oheimb*

 * 主要项目文档（README、NEWS、CHANGES、INSTALL、SUPPORT）已转换为 Markdown，目标是生成不仅在浏览器中在线查看时美观，而且在纯文本编辑器中仍易于阅读的文档。
   为了实现此目标，应用了“极简主义”Markdown 风格，该风格避免了对文本文件阅读流程干扰过大的格式化元素。例如，它：

   * 避免使用 [ATX 标题][]，而是使用 [setext 标题][]
     （仅适用于 `<h1>` 和 `<h2>` 标题）。
   * 避免使用 [行内链接][]，而是使用 [引用链接][]。
   * 避免使用 [围栏代码块][]，而是使用 [缩进代码块][]。

     [ATX 标题]:         https://github.github.com/gfm/#atx-headings
     [setext 标题]:      https://github.github.com/gfm/#setext-headings
     [行内链接]:         https://github.github.com/gfm/#inline-link
     [引用链接]:      https://github.github.com/gfm/#reference-link
     [围栏代码块]:   https://github.github.com/gfm/#fenced-code-blocks
     [缩进代码块]: https://github.github.com/gfm/#indented-code-blocks

   *Matthias St. Pierre*

 * 测试套件已更改为保留每个测试配方的结果。
   为此，在构建树中创建了一个名为 test-runs/ 的新目录，其中包含与测试配方同名的子目录。

   *Richard Levitte*

 * 添加了 CMP 和 CRMF (RFC 4210, RFC 4211 RFC 6712) 的实现。
   这添加了 `crypto/cmp/`、`crpyto/crmf/`、`apps/cmp.c` 和 `test/cmp_*`。
   请参阅 L<openssl-cmp(1)> 和 L<OSSL_CMP_exec_IR_ses(3)> 作为起点。

   *David von Oheimb, Martin Peylo*

 * 将 `crypto/ocsp/` 中的 HTTP 客户端代码通用化到 `crpyto/http/`。
   它支持任意的请求和响应内容类型、GET 重定向、TLS、通过 HTTP(S) 代理的连接、
   通过用户定义的 BIO 的连接和交换（允许隐式连接）、持久连接以及超时检查。
   有关详细信息，请参阅 L<OSSL_HTTP_transfer(3)> 等。
   保留了面向 OCSP 的（且仅部分文档化的）旧版 API 以保持向后兼容性，但其中大部分已弃用。

   *David von Oheimb*

 * 添加了 `util/check-format.pl`，一个用于检查是否符合 OpenSSL 编码风格
   <https://www.openssl.org/policies/codingstyle.html> 的工具。
   执行的检查不完整，并会产生一些误报。
   尽管如此，该工具仍应有助于检测大多数常见的故障。

   *David von Oheimb*

 * `BIO_do_connect()` 和 `BIO_do_handshake()` 已扩展：
   如果域名解析产生多个 IP 地址，在 `connect()` 失败后将尝试所有这些地址。

   *David von Oheimb*

 * 所有低级 RSA 函数都已弃用。

   *Paul Dale*

 * 使用 SHA1 签名的 X509 证书不再允许在安全级别 1 及以上使用。

   *Kurt Roeckx*

 * 命令行实用程序 `dhparam`、`dsa`、`gendsa` 和 `dsaparam` 已修改为使用 PKEY API。
   这些命令现在处于维护模式，不会添加新功能。

   *Paul Dale*

 * `rsautl` 命令行实用程序已弃用。

   *Paul Dale*

 * `genrsa` 和 `rsa` 命令行实用程序已修改为使用 PKEY API。它们现在默认写入 PKCS#8 密钥。
   这些命令现在处于维护模式，不会添加新功能。

   *Paul Dale*

 * 所有低级 DH 函数都已弃用。

   *Paul Dale 和 Matt Caswell*

 * 所有低级 DSA 函数都已弃用。

   *Paul Dale*

 * 重构了具有 SM2 曲线的 EC EVP_PKEY 的处理方式，使其自动变为 EVP_PKEY_SM2 而不是 EVP_PKEY_EC。

   *Richard Levitte*

 * 弃用了低级 ECDH 和 ECDSA 函数。

   *Paul Dale*

 * 弃用了 `EVP_PKEY_decrypt_old()` 和 `EVP_PKEY_encrypt_old()`。

   *Richard Levitte*

 * 增强了 `EVP_PKEY_get_size()`、`EVP_PKEY_get_bits()` 和
   `EVP_PKEY_get_security_bits()` 的文档。特别是 `EVP_PKEY_get_size()`
   需要新的表述来包含它可以用于所有事情，以及注意事项。

   *Richard Levitte*

 * `SSL_CTX_set_tlsext_ticket_key_cb(3)` 函数已弃用。

   *Paul Dale*

 * 所有低级 HMAC 函数都已弃用。

   *Paul Dale 和 David von Oheimb*

 * 对文档进行了两千多项修复，包括：
   - 公共选项（如 -rand/-writerand、TLS 版本控制等）已重构，并指向 openssl.pod 中新增强的描述。
   - 为所有选项添加了样式一致性（在 Richard Levitte 的帮助下），记录了所有报告的缺失选项，添加了 CI 构建以检查所有选项是否都已记录并且没有记录未实现选项。
   - 记录了一些内部细节，例如所有环境变量的使用。
   - 解决了所有内部损坏的 L<> 引用。

   *Rich Salz*

 * 所有低级 CMAC 函数都已弃用。

   *Paul Dale*

 * 低级 MD2、MD4、MD5、MDC2、RIPEMD160 和 Whirlpool 摘要函数已弃用。

   *Paul Dale 和 David von Oheimb*

 * 修正了 `EVP_DigestSign*` 函数集返回值的文档。文档中提到了某些错误的负值，但实际上从未出现过，因此删除了对负值的提及。
   遵循文档并因此检查类似 `EVP_DigestSignInit(...) <= 0` 的代码将继续正常工作。

   *Richard Levitte*

 * 所有低级密码函数都已弃用。

   *Matt Caswell 和 Paul Dale*

 * 移除了 `include/openssl/opensslconf.h.in` 并替换为
   `include/openssl/configuration.h.in`，后者不同之处在于不包含
   `<openssl/macros.h>`。添加了一个简短的头文件 `include/openssl/opensslconf.h`
   以包含两者。

   这允许内部 hack，例如在需要修改已配置宏集时：

       #include <openssl/configuration.h>

       #undef OPENSSL_NO_DEPRECATED
       #define OPENSSL_SUPPRESS_DEPRECATED

       #include <openssl/macros.h>

   使用导出符号的应用程序不应使用此方法，否则会导致链接错误。

   *Richard Levitte*

 * 修复了 x86_64 Montgomery 过程中的溢出错误，该过程用于模数为 512 位的指数运算。
   没有 EC 算法受到影响。分析表明，由于此缺陷导致的针对 2-prime RSA1024、
   3-prime RSA1536 和 DSA1024 的攻击将非常难以执行，并且不认为可能发生。
   针对 DH512 的攻击被认为只是可行。但是，要进行攻击，目标必须重用 DH512 私钥，
   而这无论如何都不推荐。此外，直接使用低级 API BN_mod_exp 的应用程序可能会受到影响，
   如果它们使用 BN_FLG_CONSTTIME。
   ([CVE-2019-1551])

   *Andy Polyakov*

 * 大多数内存调试功能已弃用，其功能已被替换为 no-ops。

   *Rich Salz*

 * 添加了 STACK API 的文档。

   *Rich Salz*

 * 引入了一种新的方法类型和 API，OSSL_ENCODER，用于表示通用编码器。
   它们执行与 PEM 写入器和 d2i 函数类似的工作，但支持由 providers 提供的
   方法，并且 providers 有可能支持其他格式。

   *Richard Levitte*

 * 引入了一种新的方法类型和 API，OSSL_DECODER，用于表示通用解码器。
   它们执行与 PEM 读取器和 i2d 函数类似的工作，但支持由 providers 提供的
   方法，并且 providers 有可能支持其他格式。

   *Richard Levitte*

 * 在配置文件语法中添加了 `.pragma` 指令，以允许以受支持且可预测的方式改变行为。
   当前添加的 pragma：

           .pragma dollarid:on

   这允许美元符号成为关键字字符，除非它后面跟着一个开括号或圆括号。
   这对于美元符号经常用于名称的平台很有用，例如 VMS 上的卷名和系统目录名。

   *Richard Levitte*

 * 添加了从用户数据创建 EVP_PKEY 的功能。

   *Richard Levitte*

 * 更改了 `--api` 配置选项的解释，表示这是一个期望的 API 兼容性级别，没有其他含义。
   以前的解释是，这还将意味着移除直到并包括给定版本的所有弃用符号，现在需要
   在配置中也使用 `no-deprecated`。

   构建应用程序时，可以通过 OPENSSL_API_COMPAT 宏设置期望的 API 兼容性级别，
   就像以前一样。对于低于 3.0 的 API 兼容性版本，旧式数值仍然有效，例如
   -DOPENSSL_API_COMPAT=0x10100000L。
   对于 3.0 及更高版本，期望的值是根据主版本号和次版本号计算的十进制值，如下所示：

           MAJOR * 10000 + MINOR * 100

   示例：

           -DOPENSSL_API_COMPAT=30000             对于 3.0
           -DOPENSSL_API_COMPAT=30200             对于 3.2

   要隐藏直到并包括给定 API 兼容性级别的声明，在构建应用程序时还必须提供
   -DOPENSSL_NO_DEPRECATED。

   *Richard Levitte*

 * 添加了 X509_LOOKUP_METHOD 称为 X509_LOOKUP_store，以允许通过 URI 和 OSSL_STORE
   加载器访问证书和 CRL 存储。

   这添加了以下函数：

   - X509_LOOKUP_store()
   - X509_STORE_load_file()
   - X509_STORE_load_path()
   - X509_STORE_load_store()
   - SSL_add_store_cert_subjects_to_stack()
   - SSL_CTX_set_default_verify_store()
   - SSL_CTX_load_verify_file()
   - SSL_CTX_load_verify_dir()
   - SSL_CTX_load_verify_store()

   *Richard Levitte*

 * 在 VMS 上添加了一种收集熵的新方法，基于 SYS$GET_ENTROPY。
   此系统服务的存在在运行时确定。

   *Richard Levitte*

 * 添加了根据 provider 的方法从数据创建 EVP_PKEY 上下文的功能。
   这接受算法名称和属性查询字符串，并仅存储它们，目的是任何使用此上下文的操作都将使用这些字符串来隐式获取所需的方法，从而使移植为预 3.0 OpenSSL 编写的应用程序更容易。

   *Richard Levitte*

 * 未记录的函数 NCONF_WIN32() 已弃用；有关转换详细信息，请参阅 doc/man5/config.pod 的 HISTORY 部分。

   *Rich Salz*

 * 引入了新的函数 `EVP_DigestSignInit_ex()` 和
   `EVP_DigestVerifyInit_ex()`。宏 `EVP_DigestSignUpdate()` 和
   `EVP_DigestVerifyUpdate()` 已转换为函数。有关详细信息，请参阅手册页。

   *Matt Caswell*

 * 对文档进行了超过两千项修复，包括：
   添加了缺失的命令标志，改进了样式一致性，记录了内部细节等。

   *Rich Salz, Richard Levitte*

 * s390x 程序集包：为 P-256、P-384、P-521、X25519、X448、Ed25519 和 Ed448 添加了硬件支持。

   *Patrick Steuer*

 * 使用“openssl pkcs12”打印 PKCS#12 属性的所有值，而不仅仅是第一个值。

   *Jon Spillett*

 * 弃用了 `ERR_STATE` 的公共定义以及函数 `ERR_get_state()`。
   这是为了准备将 `ERR_STATE` 设为不透明类型。

   *Richard Levitte*

 * 添加了 ERR 功能，使调用者可以访问已替换旧函数代码的函数名。

   新函数是 `ERR_peek_error_func()`、`ERR_peek_last_error_func()`、
   `ERR_peek_error_data()`、`ERR_peek_last_error_data()`、`ERR_get_error_all()`、
   `ERR_peek_error_all()` 和 `ERR_peek_last_error_all()`。

   弃用了 ERR 函数 `ERR_get_error_line()`、`ERR_get_error_line_data()`、
   `ERR_peek_error_line_data()`、`ERR_peek_last_error_line_data()` 和
   `ERR_func_error_string()`。

   *Richard Levitte*

 * 扩展了测试以仅对失败的测试进行详细输出。可以使用 make 变量
   VERBOSE_FAILURE 或 VF 来启用此功能：

           $ make VF=1 test                           # Unix
           $ mms /macro=(VF=1) test                   ! OpenVMS
           $ nmake VF=1 test                          # Windows

   *Richard Levitte*

 * 向 `x509` 命令添加了 `-copy_extensions` 选项，用于与 `-req` 和 `-x509toreq`
   结合使用。当使用 `copy` 或 `copyall` 参数时，请求中的所有扩展都会被复制到证书，反之亦然。

   *David von Oheimb*, *Kirill Stefanenkov <kirill_stefanenkov@rambler.ru>*

 * 向 `req` 命令添加了 `-copy_extensions` 选项，用于与 `-x509` 结合使用。
   当使用 `copy` 或 `copyall` 参数时，证书请求中的所有扩展都会被复制到证书。

   *David von Oheimb*

 * `x509`、`req` 和 `ca` 命令现在确保它们生成的 X.509v3 证书默认符合 RFC 5280，
   具体如下：
   存在一个 subjectKeyIdentifier 扩展，其中包含公钥的哈希值；对于非自签名证书，
   存在一个 authorityKeyIdentifier 扩展，其中包含 keyIdentifier 字段或标识签名密钥的颁发者信息。
   除非某些配置覆盖了新的默认行为，例如 `subjectKeyIdentifier = none` 和
   `authorityKeyIdentifier = none`。

   *David von Oheimb*

 * 根据 RFC 5280 中的要求，在 `X509_verify_cert()` 中添加了多项检查，
   前提是设置了 `X509_V_FLAG_X509_STRICT`（可以通过 CLI 选项 `-x509_strict` 设置）：
   * CA 证书的 basicConstraints 必须标记为 critical。
   * CA 证书必须显式包含 keyUsage 扩展。
   * 如果提供了 pathlenConstraint，则必须允许 keyUsage keyCertSign。
   * 任何证书的颁发者名称不得为空。
   * CA 证书、具有 keyUsage crlSign 的证书以及没有 subjectAlternativeName 的证书的主题名称不得为空。
   * 如果提供了 subjectAlternativeName 扩展，则不得为空。
   * signatureAlgorithm 字段和证书签名必须一致。
   * 任何给定的 authorityKeyIdentifier 和任何给定的 subjectKeyIdentifier 都不得标记为 critical。
   * 对于 X.509v3 证书，必须提供 authorityKeyIdentifier，除非它们是自签名的。
   * 对于所有 X.509v3 CA 证书，必须提供 subjectKeyIdentifier。

   *David von Oheimb*

 * 根据 RFC 5480 的要求，使用 `X509_verify_cert()` 进行证书验证现在会拒绝具有显式曲线参数（specifiedCurve）的 EC 密钥。

   *Tomáš Mráz*

 * 对于内置 EC 曲线，即使在解析显式参数、加载编码密钥或调用 `EC_GROUP_new_from_ecpkparameters()`/
   `EC_GROUP_new_from_ecparameters()` 时，也要确保使用从曲线名称构建的 EC_GROUP。
   这可以防止绕过安全加固和性能优势，特别是对于具有专用 EC_METHOD 的曲线。
   默认情况下，如果加载了一个用显式参数编码的密钥，并且之后又对其进行编码，则输出仍然用显式参数编码，即使内部使用了“命名”EC_GROUP 进行计算。

   *Nicola Tuveri*

 * 在 EC_GROUP 构建期间，如果未提供，则计算 ECC 协因子。在此更改之前，
   `EC_GROUP_set_generator` 会接受 order 和/或 cofactor 为 NULL。在此更改之后，
   只有 cofactor 参数可以为 NULL。它还会对传入的 order 进行一些最小的健全性检查。
   ([CVE-2019-1547])

   *Billy Bob Brumley*

 * 修复了 PKCS7_dataDecode 和 CMS_decrypt_set1_pkey 中的填充预言机。
   如果第一个 CMS_recipientInfo 有效但第二个 CMS_recipientInfo 是选择的密文，则攻击很简单。
   如果第二个 recipientInfo 解码为 PKCS #1 v1.5 形式的明文，则正确的加密密钥将被垃圾数据替换，消息无法解码，但如果 RSA 解密失败，则使用正确的加密密钥，收件人不会注意到攻击。
   作为对这种潜在攻击的解决方法，在证书未提供且尝试了所有 recipientInfo 时，解密密钥的长度必须等于密码的默认密钥长度。
   可以通过设置 CMS_DEBUG_DECRYPT 标志来在 CMS 代码中重新启用旧行为。

   *Bernd Edlinger*

 * 改进了早期启动时来自 DEVRANDOM 种子源的熵质量，适用于较旧的 Linux 系统。
   RAND 子系统将等待 /dev/random 开始输出，然后才从 /dev/urandom 播种。
   播种的状态将存储起来，供将来使用系统全局共享内存段的库初始化使用。
   可以通过定义 OPENSSL_RAND_SEED_DEVRANDOM_SHM_ID 为所需值来配置共享内存标识符。
   默认标识符为 114。

   *Paul Dale*

 * 修改了 BN_generate_prime_ex，在计算 RSA 密钥的素数时，不避免 p-1 中的因子 2..17863。
   由于我们以前总是为 RSA 密钥生成 == 2 (mod 3) 的素数，因此 2-素数和 3-素数 RSA 模数很容易区分，因为 `N = p*q = 1 (mod 3)`，而 `N = p*q*r = 2 (mod 3)`。因此，可以通过计算 N mod 3 来指纹识别 2-素数与 3-素数 RSA 密钥。
   这可以避免对新生成的 RSA 模数进行可能的指纹识别。

   *Bernd Edlinger*

 * 修正了 EBCDIC 系统上的扩展主密钥常量。没有此修复，具有此修复的 EBCDIC 系统与没有此修复的 EBCDIC 系统之间的 TLS 连接将失败。
   不幸的是，这也意味着具有此修复的 EBCDIC 系统与非 EBCDIC 系统之间的 TLS 连接将失败（如果它们协商 EMS）。

   *Matt Caswell*

 * 更改了库初始化，使配置文件现在默认加载。这对于 libssl 来说已经是这样了。
   现在它同时发生在 libcrypto 和 libssl 上。使用 `OPENSSL_init_crypto()` 的
   `OPENSSL_INIT_NO_LOAD_CONFIG` 选项可以抑制自动加载配置文件。

   *Matt Caswell*

 * 引入了新的错误引发宏 `ERR_raise()` 和 `ERR_raise_data()`，前者作为
   `ERR_put_error()` 的替代品，后者替换了 `ERR_put_error()` + `ERR_add_error_data()`
   的组合。`ERR_raise_data()` 通过接受格式字符串和其后的任意数量的参数，
   并使用 `BIO_snprintf()` 进行处理，提供了更大的灵活性。

   *Richard Levitte*

 * 引入了一个新函数 `OSSL_PROVIDER_available()`，可用于检查命名的 provider 是否已加载并可用。
   调用时，它还将激活所有回退 provider（如果仍然存在）。

   *Richard Levitte*

 * 强制 DH 模数大小最小为 512 位。

   *Bernd Edlinger*

 * 更改了 DH 参数以生成 order q 子群而不是 2q。
   先前生成的 DH 参数仍被 DH_check 接受，但 DH_generate_key 通过清除私钥的第 0 位来处理这些参数。
   这可以避免泄露私钥的第 0 位。

   *Bernd Edlinger*

 * 大幅减少了随机池的安全内存使用。

   *Paul Dale*

 * `{CRYPTO,OPENSSL}_mem_debug_{push,pop}` 现在是 no-ops 并已弃用。

   *Rich Salz*

 * 引入了一个新的类型 EVP_KEYEXCH，用于表示密钥交换算法。可以通过函数
   `EVP_KEYEXCH_fetch()` 获取密钥交换算法的实现。EVP_KEYEXCH 算法可以在调用
   `EVP_PKEY_derive_init_ex()` 时使用，该函数的工作方式与旧的
   `EVP_PKEY_derive_init()` 函数类似。有关新函数的详细信息，请参阅手册页。

   *Matt Caswell*

 * EVP_PKEY_CTX_set_dh_pad() 宏现在已转换为函数。

   *Matt Caswell*

 * 移除了函数名从错误消息中移除，并弃用了 xxx_F_xxx define's。

   *Richard Levitte*

 * 移除了 NextStep 支持和宏 OPENSSL_UNISTD。

   *Rich Salz*

 * 移除了 DES_check_key。还移除了 OPENSSL_IMPLEMENT_GLOBAL、OPENSSL_GLOBAL_REF、
   OPENSSL_DECLARE_GLOBAL。
   还移除了“将变量导出为函数”的功能；我们只导出函数，不导出变量。

   *Rich Salz*

 * RC5_32_set_key 已更改为返回 int 类型，其中 0 表示错误，1 表示成功。在以前的 OpenSSL 版本中，这是一个 void 类型。如果设置的密钥长度超过最大可能长度，则会导致崩溃。

   *Matt Caswell*

 * 支持 X509 证书的 SM2 签名和验证方案。

   *Paul Yang*

 * 在 `ts` 应用程序中，使用 SHA256 作为 TS 查询的默认摘要。

   *Tomáš Mráz*

 * 将 PBKDF2 更改为符合 SP800-132 而不是旧的 PKCS5 RFC2898。

   *Shane Lontis*

 * 默认的密码列表/套件现在可以通过一个函数获得，宏定义已弃用。

   *Todd Short*

 * 在 Windows OneCore 目标中添加了 VC-WIN32-UWP、VC-WIN64A-UWP、VC-WIN32-ARM-UWP 和
   VC-WIN64-ARM-UWP 目标，以便更容易地为 Windows 应用商店应用构建库。此外，还添加了“no-uplink”选项。

   *Kenji Mouri*

 * 合并了 crypto/x509 和 crypto/x509v3 目录。

   *Richard Levitte*

 * 添加了命令 'openssl kdf'，它使用 EVP_KDF API。

   *Shane Lontis*

 * 添加了命令 'openssl mac'，它使用 EVP_MAC API。

   *Shane Lontis*

 * 添加了 OPENSSL_info() 以获取各种内置的 OpenSSL 数据，例如默认目录。
   还添加了命令 'openssl info' 以用于脚本编写。

   *Richard Levitte*

 * AES_ige_encrypt() 和 AES_bi_ige_encrypt() 函数已弃用。

   *Matt Caswell*

 * 在 DRBG 重新播种过程中添加了预测抵抗能力。

   *Paul Dale*

 * 根据 IEEE Std 1619-2018 的规定，将 AES-XTS 的数据单元块数限制为 2^20。

   *Paul Dale*

 * 向使用 openssl dgst 的文件名添加了换行符转义功能。此输出格式是为了复制 `*sum`
   校验和程序中找到的输出格式。这旨在保持向后兼容性。

   *Matt Eaton, Richard Levitte, 和 Paul Dale*

 * 移除了 DTLS 心跳消息功能，因为它使用量很少，似乎没有实现有价值的目的。
   配置选项现已弃用。

   *Richard Levitte*

 * 更改了 'openssl {digestname} < file' 的输出，以在其输出中显示摘要名称。

   *Richard Levitte*

 * 添加了一个新的通用跟踪 API，该 API 支持通过跟踪输出来启用仪器化。

   *Richard Levitte & Matthias St. Pierre*

 * 添加了 C++ 的构建测试。这些是生成的文件，只做一件事，即包含一个公共 OpenSSL 头文件。
   这测试了公共头文件是否可以在 C++ 应用程序中有用地包含。

   此测试默认不启用。可以通过选项 'enable-buildtest-c++' 来启用它。

   *Richard Levitte*

 * 在 EVP_KDF 中添加了 KB KDF (EVP_KDF_KB)。

   *Robbie Harwood*

 * 在 EVP_KDF 中添加了 SSH KDF (EVP_KDF_SSHKDF) 和 KRB5 KDF (EVP_KDF_KRB5KDF)。

   *Simo Sorce*

 * 在 EVP_KDF 中添加了单步 KDF (EVP_KDF_SS)、X963 KDF 和 X942 KDF。

   *Shane Lontis*

 * 在 EVP_MAC 中添加了 KMAC。

   *Shane Lontis*

 * 向核心添加了基于属性的算法实现选择框架。

   *Paul Dale*

 * 添加了 SCA 加固，用于 EC_GROUP 中的模场求逆，通过新的专用 field_inv() 指针在 EC_METHOD 中实现。
   这还解决了影响从射影坐标到仿射坐标转换的泄漏问题。

   *Billy Bob Brumley, Nicola Tuveri*

 * 添加了 EVP_KDF，一个 EVP 层 KDF API，用于简化添加 KDF 和 PRF 实现。
   这包括一个 EVP_PKEY 到 EVP_KDF 的桥接，用于那些已经通过 EVP_PKEY API 支持的算法（scrypt、TLS1 PRF 和 HKDF）。
   PBKDF2 和 scrypt 的低级 KDF 函数现在是调用 EVP_KDF 的包装器。

   *David Makepeace*

 * 将 devcrypto 引擎构建为动态引擎。

   *Eneas U de Queiroz*

 * 向 EVP_MAC 添加了密钥 BLAKE2。

   *Antoine Salon*

 * 修复了 DTLS over SCTP 使用的端点对共享密钥计算中的一个错误。这破坏了与旧版本 OpenSSL（如 OpenSSL 1.1.0 和 OpenSSL 1.0.2）的互操作性。有一个运行时开关
   SSL_MODE_DTLS_SCTP_LABEL_LENGTH_BUG（默认关闭），用于启用与此类损坏实现的互操作性。然而，启用此开关会破坏与正确实现的互操作性。

 * 修复了 d2i_X509_PUBKEY 中在使用重复使用的 X509_PUBKEY 对象时，如果第二个 PUBKEY 格式错误，则可能发生的释放后使用错误。

   *Bernd Edlinger*

 * 将严格性检查从 EVP_PKEY_asn1_new() 移至 EVP_PKEY_asn1_add0()。

   *Richard Levitte*

 * 将许可证更改为 Apache License v2.0。

   *Richard Levitte*

 * 切换到新的版本方案，使用三个数字 MAJOR.MINOR.PATCH。

   - 主版本发布（通过增加 MAJOR 版本号表示）可能引入不兼容的 API/ABI 更改。
   - 次版本发布（通过增加 MINOR 版本号表示）可能引入新功能，但保持 API/ABI 兼容性。
   - 补丁版本发布（通过增加 PATCH 号表示）仅用于错误修复和其他现有功能的改进（如提高性能或添加文档），并保持 API/ABI 兼容性。

   *Richard Levitte*

 * 添加了对 RFC5297 SIV 模式（siv128）的支持，包括 AES-SIV。

   *Todd Short*

 * 移除了 'dist' 目标并添加了一个 tarball 构建脚本。
   'dist' 目标已不再使用，并且不需要配置即可创建源代码分发。

   *Richard Levitte*

 * 重新创建了 OS390-Unix 配置目标。它不再依赖于像 OpenSSL pre-1.1.0 那样的特殊脚本。

   *Richard Levitte*

 * 在 Configure 中列出源目录，而不是添加一个 'build.info' 关键字 SUBDIRS 来指示要查找的子目录。

   *Richard Levitte*

 * 向 EVP_MAC 添加了 GMAC。

   *Paul Dale*

 * 将 HMAC、CMAC 和 SipHash EVP_PKEY_METHODs 移植到 EVP_MAC。

   *Richard Levitte*

 * 添加了 EVP_MAC，一个 EVP 层 MAC API，用于简化添加 MAC 实现。
   这包括一个通用的 EVP_PKEY 到 EVP_MAC 桥接，以方便在 `EVP_DigestSign*` 和
   `EVP_DigestVerify*` 等功能中继续通过原始私钥使用 MAC。

   *Richard Levitte*

 * 弃用了 ECDH_KDF_X9_62()。

   *Antoine Salon*

 * 添加了 EVP_PKEY_ECDH_KDF_X9_63 和 ecdh_KDF_X9_63() 作为 EVP_PKEY_ECDH_KDF_X9_62
   KDF 类型和 ECDH_KDF_X9_62() 的替代品。为了向后兼容，保留了旧名称。

   *Antoine Salon*

 * AES-XTS 模式现在强制要求其两个密钥不同，以缓解 Phillip Rogaway 在“Efficient Instantiations of Tweakable Blockciphers and Refinements to Modes OCB and PMAC”中描述的攻击。
   有关此攻击的详细信息，请访问：
   <http://web.cs.ucdavis.edu/%7Erogaway/papers/offsets.pdf>

   *Paul Dale*

 * 重命名了目标文件，即给它们起不同于先前版本的文件名。
   它们的名字现在包括最终产品的名称以及其类型助记符（bin、lib、shlib）。

   *Richard Levitte*

 * 为 'openssl list' 添加了新选项 '-objects'，它将显示内置对象的列表，即带有名称的 OID。

   *Richard Levitte*

 * 向 `openssl ca` 添加了 `-crl_lastupdate` 和 `-crl_nextupdate` 选项，允许显式设置生成的 CRL 中的 `lastUpdate` 和 `nextUpdate` 字段。

   *Chris Novakovic*

 * 添加了对 Linux 内核 TLS 数据路径的支持。Linux 内核数据路径通过移除数据副本并为应用程序提供零拷贝系统调用（如 sendfile 和 splice）来提高应用程序性能。

   *Boris Pismenny*

 * 引入了新的 SSL 选项 `SSL_OP_CLEANSE_PLAINTEXT`。

   *Martin Elshuber*

 * `PKCS12_parse` 现在在通过 `*ca` 输出证书时保持解析顺序（而不是反转它）。

   *David von Oheimb*

 * 弃用了 pthread fork 支持方法。

   *Randall S. Becker*

 * 添加了对 TLS 1.3 中 FFDHE 密钥交换的支持。

   *Raja Ashok*

 * 为 OpenSSL 添加了一个新的可插拔概念：providers。
   此功能旨在替换 ENGINE API 和 ENGINE 实现，并且更加动态，允许 provider 作者引入新算法等，只要存在支持该算法类型的 API。

   随着这个概念的出现，出现了一个用于 libcrypto 和 provider 实现之间交互的新核心 API。
   希望使用 providers 的公共 libcrypto 函数通过此核心 API 进行操作。

   此核心 API 的主要文档位于
   doc/man7/provider.pod、doc/man7/provider-base.pod，它们又引用了描述支持的算法类型（也称为操作）的特定 API 的其他手册。

   *The OpenSSL team*

OpenSSL 1.1.1
-------------

### 1.1.1m 和 1.1.1n 之间的更改 [xx XXX xxxx]

### 1.1.1l 和 1.1.1m 之间的更改 [2021 年 12 月 14 日]

 * 避免加载动态引擎两次。

   *Bernd Edlinger*

 * 优先考虑 DANE TLSA 颁发者证书而不是对等证书

   *Viktor Dukhovni*

 * 修复了 10.12 之前的 MacOS 的随机 API

   这些 MacOS 版本不支持 CommonCrypto API

   *Lenny Primak*

### 1.1.1k 和 1.1.1l 之间的更改 [2021 年 8 月 24 日]

 * 修复了 SM2 解密缓冲区溢出。

   为了解密 SM2 加密数据，应用程序需要
   调用 API 函数 EVP_PKEY_decrypt()。通常应用程序会
   调用此函数两次。第一次调用时，入口参数“out”
   可以为 NULL，出口时，“outlen”参数将填充
   保存解密后的明文所需的缓冲区大小。应用程序
   然后可以分配足够大小的缓冲区并再次调用 EVP_PKEY_decrypt()，
   但这次传递一个非 NULL 值给“out”参数。

   SM2 解密代码实现中的一个错误意味着第一次调用 EVP_PKEY_decrypt()
   返回的保存明文所需的缓冲区大小的计算可能小于第二次调用实际所需的
   大小。这可能导致应用程序第二次调用 EVP_PKEY_decrypt() 时发生缓冲区溢出，
   因为缓冲区太小。

   能够向应用程序提供 SM2 内容进行解密的恶意攻击者
   可能会导致攻击者选择的数据溢出缓冲区，最多溢出 62 字节，
   从而改变缓冲区后面的其他数据的内容，可能改变应用程序行为或导致
   应用程序崩溃。缓冲区的位置取决于应用程序，但通常是堆分配的。
   ([CVE-2021-3711])

   *Matt Caswell*

 * 修复了处理 ASN.1 字符串时各种读取缓冲区溢出

   ASN.1 字符串在 OpenSSL 内部表示为 ASN1_STRING 结构，该结构包含一个
   保存字符串数据的缓冲区和一个保存缓冲区长度的字段。这与普通 C 字符串不同，
   普通 C 字符串表示为保存字符串数据的缓冲区，该缓冲区以 NUL (0) 字节终止。

   虽然不是严格要求，但使用 OpenSSL 自带的“d2i”函数（和其他类似的解析函数）
   解析的 ASN.1 字符串，以及使用 ASN1_STRING_set() 函数设置的任何字符串值，
   都会额外地在 ASN1_STRING 结构中对字节数组进行 NUL 终止。

   然而，应用程序可以直接构造不进行 NUL 终止的有效 ASN1_STRING 结构，
   通过直接设置 ASN1_STRING 数组中的“data”和“length”字段。
   使用 ASN1_STRING_set0() 函数也可以发生这种情况。

   许多打印 ASN.1 数据的 OpenSSL 函数都假定 ASN1_STRING 字节数组是 NUL 终止的，
   尽管对于直接构造的字符串来说这并不保证。当应用程序请求打印 ASN.1 结构，
   并且该 ASN.1 结构包含应用程序直接构造但未对“data”字段进行 NUL 终止的 ASN1_STRING 时，
   可能会发生读取缓冲区溢出。

   在处理证书的名称约束时，也可能发生同样的情况（例如，如果证书是应用程序直接构造的，
   而不是通过 OpenSSL 解析函数加载的，并且证书包含未 NUL 终止的 ASN1_STRING 结构）。
   在 X509_get1_email()、X509_REQ_get1_email() 和 X509_get1_ocsp() 函数中也可能发生这种情况。

   如果恶意行为者能够导致应用程序直接构造 ASN1_STRING，然后通过受影响的 OpenSSL 函数之一进行处理，
   则可能触发此问题。这可能导致崩溃（导致拒绝服务攻击）。它还可能导致私有内存内容（如私钥或敏感明文）的泄露。
   ([CVE-2021-3712])

   *Matt Caswell*

### 1.1.1j 和 1.1.1k 之间的更改 [2021 年 3 月 25 日]

 * 修复了使用 X509_V_FLAG_X509_STRICT 标志验证证书链时出现的问题。此标志启用对证书链中存在的证书的额外安全检查。它默认不设置。

   从 OpenSSL 版本 1.1.1h 开始，添加了一个检查以禁止在链中出现显式编码的椭圆曲线参数的证书，作为额外的严格检查。

   此检查实现中的一个错误意味着先前用于确认证书链中证书是有效 CA 证书的检查结果被覆盖了。这实际上绕过了非 CA 证书不得颁发其他证书的检查。

   如果已配置了“purpose”，则后续有机会检查证书是否为有效的 CA。libcrypto 中实现的所有命名“purpose”值都执行此检查。因此，在设置了 purpose 的情况下，即使使用了 strict 标志，证书链仍将被拒绝。libssl 客户端和服务器证书验证例程默认设置 purpose，但应用程序可以覆盖或删除它。

   为了受到影响，应用程序必须显式设置 X509_V_FLAG_X509_STRICT 验证标志，并且要么不为证书验证设置 purpose，要么在 TLS 客户端或服务器应用程序的情况下，覆盖默认 purpose。
   ([CVE-2021-3450])

   *Tomáš Mráz*

 * 修复了 OpenSSL TLS 服务器在收到来自客户端的恶意构造的重新协商 ClientHello 消息时可能崩溃的问题。如果 TLSv1.2 重新协商 ClientHello 省略了 signature_algorithms 扩展（在初始 ClientHello 中存在），但包含了一个 signature_algorithms_cert 扩展，则会导致 NULL 指针解引用，从而导致崩溃和拒绝服务攻击。

   服务器仅在启用了 TLSv1.2 和重新协商（这是默认配置）的情况下才易受攻击。OpenSSL TLS 客户端不受此问题影响。
   ([CVE-2021-3449])

   *Peter Kästle 和 Samuel Sapalski*

### 1.1.1i 和 1.1.1j 之间的更改 [2021 年 2 月 16 日]

 * 修复了 X509_issuer_and_serial_hash() 函数。它尝试基于 X509 证书中包含的颁发者和序列号数据创建唯一的哈希值。然而，它未能正确处理在解析颁发者字段时可能发生的任何错误（如果颁发者字段被恶意构造，则可能发生）。这随后可能导致 NULL 指针解引用和崩溃，从而导致潜在的拒绝服务攻击。
   ([CVE-2021-23841])

   *Matt Caswell*

 * 修复了 RSA_padding_check_SSLv23() 函数和 RSA_SSLV23_PADDING 填充模式以正确检查回滚攻击。这被认为是 OpenSSL 1.1.1 中的一个错误，因为它不支持 SSLv2。在 1.0.2 中，这是 CVE-2021-23839。

   *Matt Caswell*

   修复了 EVP_CipherUpdate、EVP_EncryptUpdate 和 EVP_DecryptUpdate 函数。以前，在输入长度接近平台整数最大允许长度的情况下，它们可能会溢出输出长度参数。在这种情况下，函数调用的返回值将是 1（表示成功），但输出长度值将为负数。这可能导致应用程序行为不正确或崩溃。
   ([CVE-2021-23840])

   *Matt Caswell*

 * 修复了 SRP_Calc_client_key 以使其以恒定时间运行。以前的实现调用了 BN_mod_exp 而没有设置 BN_FLG_CONSTTIME。这可能被利用于侧信道攻击以恢复密码。由于攻击仅限于本地主机，因此这超出了当前的 OpenSSL 威胁模型，因此未分配 CVE。

   感谢 Mohammed Sabt 和 Daniel De Almeida Braga 报告此问题。

   *Matt Caswell*

### 1.1.1h 和 1.1.1i 之间的更改 [2020 年 12 月 8 日]

 * 修复了 GENERAL_NAME_CMP 函数中的 NULL 指针解引用
   如果两个 GENERAL_NAME 都包含 EDIPARTYNAME，此函数可能会崩溃。
   如果攻击者可以控制正在比较的两个项目，则可能导致拒绝服务攻击。OpenSSL 本身使用
   GENERAL_NAME_CMP 函数进行两个目的：
   1) 比较可用 CRL 和 X509 证书中嵌入的 CRL 分发点名称
   2) 验证时间戳响应令牌签名者是否与时间戳颁发机构名称匹配时（通过 API 函数
      TS_RESP_verify_response 和 TS_RESP_verify_token 暴露）
   ([CVE-2020-1971])

   *Matt Caswell*

### 1.1.1g 和 1.1.1h 之间的更改 [2020 年 9 月 22 日]

 * 如果使用 X509_V_FLAG_X509_STRICT 标志，则现在不允许在验证链中使用具有显式曲线参数的证书。

   *Tomáš Mráz*

 * 'MinProtocol' 和 'MaxProtocol' 配置命令现在会静默忽略 DTLS 相关上下文的 TLS 协议版本边界，反之亦然，静默忽略 TLS 相关上下文的 DTLS 协议版本边界。命令可以重复设置两种类型的边界。对于同时使用 TLS 和 DTLS 的应用程序，命令行开关“min_protocol”和“max_protocol”也适用。

   为固定协议版本创建的 SSL_CTX 实例（例如，TLSv1_server_method()）也静默忽略版本边界。以前尝试将边界应用于这些协议版本会产生错误。现在只有“版本灵活”的 SSL_CTX 实例会受到配置文件和命令行选项中限制的影响。

   *Viktor Dukhovni*

 * 如果在重新协商时丢弃了 Extended Master Secret 扩展，则握手现在会失败。

   *Tomáš Mráz*

 * Oracle Developer Studio 编译器将开始报告已弃用的 API

### 1.1.1f 和 1.1.1g 之间的更改 [2020 年 4 月 21 日]

 * 修复了 SSL_check_chain() 中的段错误
   在 TLS 1.3 握手期间或之后调用 SSL_check_chain() 函数的服务器或客户端应用程序可能会由于不正确的处理
   “signature_algorithms_cert”TLS 扩展而导致的 NULL 指针解引用而崩溃。如果收到来自对等方的无效
   或未识别的签名算法，则会发生崩溃。这可能被恶意对等方利用进行拒绝服务攻击。
   ([CVE-2020-1967])

   *Benjamin Kaduk*

 * 为无汇编配置添加了 AES consttime 代码
   当构建 openssl 以用于无汇编时，添加了 AES 的可选恒定时间支持
   启用方式：./config no-asm -DOPENSSL_AES_CONST_TIME
   禁用方式：./config no-asm -DOPENSSL_NO_AES_CONST_TIME
   目前此功能默认禁用。
   它将在 3.0 中默认启用。

   *Bernd Edlinger*

### 1.1.1e 和 1.1.1f 之间的更改 [2020 年 3 月 31 日]

 * 恢复 libssl 中读取时的 EOF 检测更改，以避免依赖当前 EOF 报告方式的应用程序出现回归。由于现有方法不完全准确，因此将 EOF 通过 SSL_ERROR_SSL 报告的更改保留在当前开发分支上，并将出现在 3.0 版本中。

   *Tomáš Mráz*

 * 修改了 BN_generate_prime_ex，使其在计算 RSA 密钥的素数时，不避免 p-1 中的因子 3..17863
   由于我们之前总是为 RSA 密钥生成素数 == 2 (mod 3)，因此 2 素数和 3 素数 RSA 模易于区分，因为
   N = p*q = 1 (mod 3)，而 N = p*q*r = 2 (mod 3)。因此，通过计算 N mod 3 可以指纹识别 2 素数与 3 素数 RSA 密钥。
   这可以避免对新生成的 RSA 模进行可能的指纹识别。

   *Bernd Edlinger*

### 1.1.1d 和 1.1.1e 之间的更改 [2020 年 3 月 17 日]

 * 正确检测 libssl 读取时的 EOF。以前，如果我们遇到 libssl 读取时的 EOF，我们会向应用程序报告错误（SSL_ERROR_SYSCALL），但 errno 为 0。我们现在向堆栈添加一个错误（这意味着我们返回 SSL_ERROR_SSL），因此可以提示出了什么问题。

   *Matt Caswell*

 * 检查 ed25519 和 ed448 是否被安全级别允许。以前，未使用 MD 的签名算法未被检查是否被安全级别允许。

   *Kurt Roeckx*

 * 修复了 SSL_get_servername() 的行为。SSL_get_servername() 的行为不太正确。在恢复和正常握手中，行为不一致，并且与历史行为也不完全一致。已澄清各种场景下的行为，并已更新以使其尽可能接近历史行为。

   *Matt Caswell*

 * *[仅限 VMS]* VMS 编译器自动包含的头文件 `__DECC_INCLUDE_PROLOGUE.H` 和 `__DECC_INCLUDE_EPILOGUE.H` 使用 C++ 编译器无法理解的 pragma。这是编译器的缺点，但可以使用 `__cplusplus` 保护来解决。

   使用 OpenSSL 库的 C++ 应用程序必须使用限定符 `/NAMES=(AS_IS,SHORTENED)` 进行编译，才能使用所有 OpenSSL 函数。否则，只能使用符号长度小于 31 个字符的函数，因为链接器将无法成功解析更长名称的符号。

   *Richard Levitte*

 * 添加了一种新的 VMS 熵收集方法，基于 SYS$GET_ENTROPY。
   此系统服务的存在在运行时确定。

   *Richard Levitte*

 * 使用 'openssl pkcs12' 打印 PKCS#12 属性的所有值，而不仅仅是第一个值。

   *Jon Spillett*

### 1.1.1c 和 1.1.1d 之间的更改 [2019 年 9 月 10 日]

 * 修复了 fork 保护问题。OpenSSL 1.1.1 引入了重写的随机数生成器 (RNG)。这旨在在 fork() 系统调用发生时提供保护，以确保父进程和子进程不共享相同的 RNG 状态。然而，在默认情况下并未启用此保护。

   此问题的一个部分缓解措施是，来自高精度计时器的输出会混合到 RNG 状态中，因此父进程和子进程共享状态的可能性大大降低。

   如果应用程序已显式使用 OPENSSL_INIT_ATFORK 调用 OPENSSL_init_crypto()，则此问题根本不会发生。
   ([CVE-2019-1549])

   *Matthias St. Pierre*

 * 对于内置 EC 曲线，即使在解析显式参数、加载编码密钥或调用 `EC_GROUP_new_from_ecpkparameters()`/`EC_GROUP_new_from_ecparameters()` 时，也要确保使用从曲线名称构建的 EC_GROUP。
   这可以防止绕过安全加固和性能提升，特别是对于具有专用 EC_METHOD 的曲线。
   默认情况下，如果加载了一个用显式参数编码的密钥，并且稍后对其进行编码，则输出仍然用显式参数编码，即使在内部使用“命名”EC_GROUP 进行计算。

   *Nicola Tuveri*

 * 如果在 EC_GROUP 构建期间未提供 ECC 协因子，则计算它。在此更改之前，EC_GROUP_set_generator 会接受阶数和/或协因子为 NULL。在此更改之后，只有协因子参数可以为 NULL。它还对传递的阶数进行了一些最小的健全性检查。
   ([CVE-2019-1547])

   *Billy Bob Brumley*

 * 修复了 PKCS7_dataDecode 和 CMS_decrypt_set1_pkey 中的填充预言。
   攻击很简单，如果第一个 CMS_recipientInfo 有效但第二个 CMS_recipientInfo 是选择密文。如果第二个
   recipientInfo 解码为 PKCS #1 v1.5 格式的明文，则正确的加密密钥将被垃圾替换，消息无法解码，但如果 RSA 解密失败，则使用正确的加密密钥，收件人不会注意到攻击。
   作为对这种潜在攻击的解决方法，在未提供证书且尝试了所有 recipientInfo 的情况下，解密密钥的长度必须等于密码的默认密钥长度。
   可以通过设置 CMS_DEBUG_DECRYPT 标志来重新启用 CMS 代码中的旧行为。
   ([CVE-2019-1563])

   *Bernd Edlinger*

 * 改进了早期 Linux 系统的 DEVRANDOM 种子源的熵质量。RAND 子系统将等待 /dev/random 开始输出，然后再从 /dev/urandom 播种。
   播种的状态会存储起来，供将来使用系统全局共享内存段的库初始化使用。可以通过定义 OPENSSL_RAND_SEED_DEVRANDOM_SHM_ID 为所需值来配置共享内存标识符。默认标识符为 114。

   *Paul Dale*

 * 校正 EBCDIC 系统上的扩展主密钥常量。没有此修复，具有此修复的 EBCDIC 系统与非 EBCDIC 系统之间的 TLS 连接（如果协商了 EMS）将失败。不幸的是，这也意味着具有此修复的 EBCDIC 系统与没有此修复的 EBCDIC 系统之间的 TLS 连接（如果协商了 EMS）将失败。

   *Matt Caswell*

 * 在 mingw 构建中使用 Windows 安装路径

   Mingw 本身不是 POSIX 环境，这意味着安装应使用 Windows 路径。
   ([CVE-2019-1552])

   *Richard Levitte*

 * 更改 DH_check 以接受具有阶数 q 和 2q 子群的参数。
   对于阶数 2q 子群，私钥的位 0 不是秘密的，但 DH_generate_key 通过清除这些私钥的位 0 来解决此问题。这可以避免泄露私钥的位 0。

   *Bernd Edlinger*

 * 大幅减少随机池的安全内存使用。

   *Paul Dale*

 * 恢复 Linux 系统的 DEVRANDOM_WAIT 功能

   DEVRANDOM_WAIT 功能添加了一个 select() 调用，用于在读取 /dev/urandom 设备之前等待 /dev/random 设备可读。

   事实证明，此更改对性能产生了不可接受的负面影响。经过讨论，决定恢复此功能，并将其留给操作系统或平台维护者来确保在早期引导期间进行适当的初始化。

   *Matthias St. Pierre*

### 1.1.1b 和 1.1.1c 之间的更改 [2019 年 5 月 28 日]

 * 添加 C++ 的构建测试。这些是生成的文件，它们只做一件事，即包含一个公共 OpenSSL 头文件。这测试了公共头文件是否可以有效地包含在 C++ 应用程序中。

   此测试默认不启用。可以使用选项 'enable-buildtest-c++' 启用它。

   *Richard Levitte*

 * 为 ECDSA 和 DSA 启用 SHA3 预哈希。

   *Patrick Steuer*

 * 将默认 RSA、DSA 和 DH 大小更改为 2048 位而不是 1024 位。
   这会更改使用 `genpkey` 命令时的大小（如果未指定大小）。
   它修复了早期更改中遗漏的问题，这些更改已将所有 RSA、DSA 和 DH 生成命令默认设置为使用 2048 位。

   *Kurt Roeckx*

 * 重新组织手册页，使其始终按 RETURN VALUES、EXAMPLES、SEE ALSO 和 HISTORY 的顺序排列，并相应地调整 util/fix-doc-nits。

   *Paul Yang, Joshua Lock*

 * 添加了缺失的访问器 EVP_PKEY_get0_engine()

   *Matt Caswell*

 * 让 `s_client` 和 `s_server` 等命令在调试时输出签名方案以及其他密码套件参数。

   *Lorinczy Zsigmond*

 * 使 OPENSSL_config() 再次不区分错误。

   *Richard Levitte*

 * 以恒定时间执行 RSA 解密的错误处理。

   *Bernd Edlinger*

 * 防止 ChaCha20-Poly1305 中的非长 nonce。

   ChaCha20-Poly1305 是一种 AEAD 密码，需要为每次加密操作提供唯一的 nonce 输入。RFC 7539 指定 nonce 值 (IV) 应为 96 位（12 字节）。OpenSSL 允许可变 nonce 长度，如果 nonce 小于 12 字节，则用 0 字节进行前填充。然而，它也错误地允许 nonce 最长为 16 字节。在这种情况下，只有最后 12 个字节是重要的，任何额外的领先字节都会被忽略。

   使用此密码的要求是 nonce 值必须是唯一的。使用重复 nonce 值加密的消息容易受到严重的机密性和完整性攻击。如果应用程序更改默认 nonce 长度使其超过 12 字节，然后更改 nonce 的前导字节，期望新值是一个新的唯一 nonce，那么这样的应用程序可能会无意中用重复的 nonce 加密消息。

   此外，长 nonce 中被忽略的字节不受此密码完整性保证的保护。任何依赖长 nonce 前导字节完整性的应用程序都可能受到影响。任何使用此密码的 OpenSSL 内部使用，包括在 SSL/TLS 中，都是安全的，因为没有此类使用设置如此长的 nonce 值。然而，直接使用此密码并设置超过 12 字节的非默认 nonce 长度的用户应用程序可能存在漏洞。

   此问题于 2019 年 3 月 16 日由 Ronomon 的 Joran Dirk Greef 报告给 OpenSSL。
   ([CVE-2019-1543])

   *Matt Caswell*

 * 为 Linux 系统添加 DEVRANDOM_WAIT 功能

   在没有 getrandom() 系统调用的旧 Linux 系统上，OpenSSL 通常使用 /dev/urandom 设备来播种其 CSPRNG。
   与 getrandom() 不同，/dev/urandom 在内核 CSPRNG 尚未播种的早期引导期间不会阻塞。

   为了缓解此已知弱点，使用 select() 在读取 /dev/urandom 之前等待 /dev/random 可读。

 * 确保 SM2 只使用 SM3 作为摘要算法

   *Paul Yang*

### 1.1.1a 和 1.1.1b 之间的更改 [2019 年 2 月 26 日]

 * 更改 TLSv1.3 的握手后消息交换开始和结束的信息回调信号。在 1.1.1/1.1.1a 中，我们使用了 SSL_CB_HANDSHAKE_START 和 SSL_CB_HANDSHAKE_DONE。经验表明，许多应用程序对此感到困惑，并假设 TLSv1.2 重新协商已开始。这可能会破坏 KeyUpdate 处理。相反，我们不再发出握手后消息交换的开始和结束信号（尽管消息本身仍会发出信号）。这可能会破坏一些期望旧信号的应用程序。然而，没有这个 KeyUpdate 对许多应用程序来说是不可用的。

   *Matt Caswell*

### 1.1.1 和 1.1.1a 之间的更改 [2018 年 11 月 20 日]

 * DSA 签名生成中的时序漏洞

   OpenSSL DSA 签名算法已被证明容易受到时序侧信道攻击。攻击者可以利用签名算法中的变化来恢复私钥。

   此问题于 2018 年 10 月 16 日由 Samuel Weiser 报告给 OpenSSL。
   ([CVE-2018-0734])

   *Paul Dale*

 * ECDSA 签名生成中的时序漏洞

   OpenSSL ECDSA 签名算法已被证明容易受到时序侧信道攻击。攻击者可以利用签名算法中的变化来恢复私钥。

   此问题于 2018 年 10 月 25 日由 Samuel Weiser 报告给 OpenSSL。
   ([CVE-2018-0735])

   *Paul Dale*

 * 修复了 RAND_add()/RAND_seed() 静默丢弃长度超过 4096 字节的随机输入的问题。限制已提高到两千兆字节的缓冲区大小，并改进了错误处理。

   此问题由 Dr. Falko Strenzke 报告给 OpenSSL。它被归类为普通错误，而不是安全问题，因为 DRBG 会自动重新播种，并且即使没有应用程序提供的额外随机性，也能完全正常工作。

### 1.1.0i 和 1.1.1 之间的更改 [2018 年 9 月 11 日]

 * 添加新的 ClientHello 回调。提供了一个回调接口，使应用程序能够在 ClientHello 处理的最早阶段（在扩展收集后但处理之前）调整新的 SSL 对象。特别是，此回调可以根据 ClientHello 的内容调整支持的 TLS 版本。

   *Benjamin Kaduk*

 * 添加 SM2 基本算法支持。

   *Jack Lloyd*

 * s390x 汇编包：为以下加密原语添加（改进的）硬件支持：sha3、shake、aes-gcm、aes-ccm、aes-ctr、aes-ofb、aes-cfb/cfb8、aes-ecb。

   *Patrick Steuer*

 * 使 EVP_PKEY_asn1_new() 对其输入更加严格。不再接受 NULL pem_str 参数，因为它会导致表损坏。NULL pem_str 仅保留给别名条目。

   *Richard Levitte*

 * 使用新的 ec_scalar_mul_ladder 框架来实现素数曲线的专用阶梯步长。新实现基于 Izu-Takagi 的“一种快速并行椭圆曲线乘法，可抵抗侧信道攻击”中的齐次射影坐标中的微分加倍和加法公式，以及 Brier-Joye 的“Weierstrass 椭圆曲线和侧信道攻击”公式（8）用于 y 坐标恢复，并修改为在射影坐标中工作。

   *Billy Bob Brumley, Nicola Tuveri*

 * 更改素数的生成和检查，以便素数失败的错误率取决于输入大小的预期用途。
   对于较大的素数，这将导致更多的 Miller-Rabin 轮次。
   对于大于 1080 位的素数，最大错误率降低到 2^-128。

   *Kurt Roeckx, Annie Yousar*

 * 将 DSA 密钥生成的 Miller-Rabin 轮数增加到 64。

   *Kurt Roeckx*

 * 'tsget' 脚本已重命名为 'tsget.pl'，以避免在系统之间移动时产生混淆，并避免在使用 mingw 与 MSVC 进行 Windows 构建时产生混淆。对于 POSIX 安装，仍然有一个名为 'tsget' 的符号链接或副本以避免混淆。

   *Richard Levitte*

 * 恢复 ECDSA 签名中的盲化，而是使有问题的加法长度不变。甚至切换到定长 Montgomery 乘法。

   *Andy Polyakov*

 * 使用新的 ec_scalar_mul_ladder 框架来实现二元曲线的专用阶梯步长。新实现基于混合 Lopez-Dahab 射影坐标中的微分加倍和加法公式，并修改为独立盲化操作数。

   *Billy Bob Brumley, Sohaib ul Hassan, Nicola Tuveri*

 * 添加一个框架，用于可选地增强 `ec_scalar_mul_ladder`（以前称为 `ec_mul_consttime`）的 Montgomery 阶梯实现，允许 EC_METHOD 实现自己的专用“阶梯步长”，以利用更有利的坐标系统或更有效的微分加倍和加法算法。

   *Billy Bob Brumley, Sohaib ul Hassan, Nicola Tuveri*

 * 修改了基于随机设备的种子源，使其保持相关的文件描述符打开，而不是在每次访问时重新打开它们。
   这允许此类源在 chroot() 监狱中运行，而无需相关的设备节点可用。此行为可以使用 RAND_keep_random_devices_open() 进行控制。

   *Paul Dale*

 * 应用了许多侧信道攻击缓解措施。这可能会对某些算法的性能产生影响，以换取更高的安全性。具体的更改由各自的作者在此更改日志中注明。

   *Matt Caswell*

 * AIX 共享库支持大修。切换到 AIX 处理共享库的“自然”方式，这意味着将不同版本和位数的共享对象收集到一个公共存档中。这可以缓解 1.0 和 1.1 并行安装之间的冲突。它不影响第三方应用程序的链接方式，只影响多版本安装的管理方式。

   *Andy Polyakov*

 * 使 ec_group_do_inverse_ord() 更健壮并可供其他 EC 加密系统使用，以便无论 BN_FLG_CONSTTIME 如何，SCA 缓解措施都会应用于回退 BN_mod_inverse()。
   当直接使用此函数而不是 BN_mod_inverse() 时，新的 EC 加密系统实现将默认更安全。

   *Billy Bob Brumley*

 * 为 EC_POINT 添加坐标盲化，并为通用素数曲线实现射影坐标盲化，作为对选择点 SCA 攻击的对策。

   *Sohaib ul Hassan, Nicola Tuveri, Billy Bob Brumley*

 * 在 ECDSA 和 DSA 签名中添加盲化，以防止 Keegan Ryan (NCC Group) 发现的侧信道攻击。

   *Matt Caswell*

 * 在 `pkeyutl` 命令中强制执行检查，以确保在执行签名、验证或 verifyrecover 操作时，输入长度不超过支持的最大摘要长度。

   *Matt Caswell*

 * SSL_MODE_AUTO_RETRY 默认启用。使用阻塞 I/O 结合 select() 或 poll() 等的应用程序将挂起。可以使用 SSL_CTX_clear_mode() 再次将其关闭。
   许多应用程序无法正确处理非应用程序数据记录，而 TLS 1.3 发送更多此类记录。设置 SSL_MODE_AUTO_RETRY 可以解决这些应用程序中的问题，但也会破坏一些应用程序。
   建议再次阅读有关 SSL_read()、SSL_write()、SSL_get_error()、SSL_shutdown()、SSL_CTX_set_mode() 和 SSL_CTX_set_read_ahead() 的手册页。

   *Kurt Roeckx*

 * 解锁受密码保护的 PEM 文件或 PKCS#8 容器时，现在允许使用空（零字符）密码。

   *Richard Levitte*

 * 对二元域模逆运算应用盲化，并移除已申请专利（OPENSSL_SUN_GF2M_DIV）的 BN_GF2m_mod_div 实现。

   *Billy Bob Brumley*

 * 弃用 ec2_mult.c 并统一二元和素数椭圆曲线的标量乘法代码路径。

   *Billy Bob Brumley*

 * 移除 ECDSA nonce 填充：EC_POINT_mul 现在负责恒定时间的定点乘法。

   *Billy Bob Brumley*

 * 使用时序攻击防御措施修改椭圆曲线标量乘法：ec_wNAF_mul 在计算定点和变点乘法时重定向到恒定时间实现（在 OpenSSL 中，这些主要用于密钥生成、签名、ECDH 派生操作中的私有标量）。
   *Billy Bob Brumley, Nicola Tuveri, Cesar Pereida García,
    Sohaib ul Hassan*

 * 更新了 CONTRIBUTING

   *Rich Salz*

 * 更新了 DRBG / RAND 以从系统请求 nonce 和其他低熵随机性。

   *Matthias St. Pierre*

 * 更新了 'openssl rehash' 以使用 OpenSSL 一致的默认值。

   *Richard Levitte*

 * 将 ssl_conf 模块的加载移至 libcrypto，这有助于在 libssl 初始化之前加载 libssl 使用的引擎。

   *Matt Caswell*

 * 为 EdDSA 添加了 EVP_PKEY_sign() 和 EVP_PKEY_verify()

   *Matt Caswell*

 * 修复了 X509_NAME_ENTRY_set 以在所有情况下正确处理多值 RDN。

   *Ingo Schwarze, Rich Salz*

 * 在 'openssl s_server' 中添加了接受的 IP 地址和端口的输出

   *Richard Levitte*

 * 为 TLSv1.3 密码套件添加了新的 API：
      SSL_CTX_set_ciphersuites()
      SSL_set_ciphersuites()

   *Matt Caswell*

 * 内存分配失败会一致地向错误堆栈添加错误。

   *Rich Salz*

 * 在作为 setuid/setgid 运行时，不要在 libcrypto 中使用 OPENSSL_ENGINES 和 OPENSSL_CONF 环境变量。

   *Bernd Edlinger*

 * 默认加载任何配置文件，当使用 libssl 时。

   *Matt Caswell*

 * 添加了新的公共头文件 <openssl/rand_drbg.h> 和 RAND_DRBG API 的文档。有关概述，请参阅 RAND_DRBG(7) 手册页。

   *Matthias St. Pierre*

 * 删除了 QNX 支持（找不到贡献者来批准许可证更改）。

   *Rich Salz*

 * 已实现 TLSv1.3 的早期数据重放保护。有关详细信息，请参阅 SSL_read_early_data() 手册页。

   *Matt Caswell*

 * 将 TLSv1.3 密码套件配置与 TLSv1.2 密码套件配置分开。TLSv1.3 密码套件与 TLSv1.2 及以下版本不兼容。同样，TLSv1.2 密码套件与 TLSv1.3 不兼容。
   为了避免旧的 TLSv1.2 密码套件配置无意中禁用所有 TLSv1.3 密码套件的问题，已将配置分开。有关更多信息，请参阅 ciphers 手册页或 SSL_CTX_set_ciphersuites() 手册页。

   *Matt Caswell*

 * 在 POSIX（BSD、Linux 等）系统上，以响应者模式运行的 ocsp(1) 命令现在支持新的“-multi”选项，该选项会生成指定数量的子进程来处理 OCSP 请求。
   “-timeout”选项现在还限制了 OCSP 响应者在接受新连接后等待接收完整客户端请求的耐心。根据需要重新生成子进程，并在 CA 索引文件更改时自动重新加载。这使得“ocsp”响应者可以作为长期运行的服务运行，从而使 OpenSSL CA 更具功能性。在此模式下，进入事件循环后记录的大多数诊断消息都通过 syslog(3) 记录，而不是写入 stderr。

   *Viktor Dukhovni*

 * 添加了对 X448 和 Ed448 的支持。大量基于 Mike Hamburg 的原始工作。

   *Matt Caswell*

 * 扩展 OSSL_STORE 以支持搜索和缩小加载对象的集合。这添加了 OSSL_STORE_expect() 和 OSSL_STORE_find() 函数以及构建搜索和从中获取搜索数据所需的工具。

   *Richard Levitte*

 * 添加了对 TLSv1.3 的支持。请注意，从早期 OpenSSL 版本升级的用户应审查其配置设置，以确保它们仍然适用于 TLSv1.3。有关更多信息，请参阅：
   <https://github.com/openssl/openssl/wiki/TLS1.3>

   *Matt Caswell*

 * OpenSSL 随机数生成器的大规模重新设计

   默认的 RAND 方法现在根据 NIST 标准 SP 800-90Ar1 使用 AES-CTR DRBG。新的随机数生成器本质上是 OpenSSL FIPS 2.0 对象模块的默认随机数生成器的端口。它是一个混合确定性随机位生成器，使用 AES-CTR 位流，并使用受信任的系统熵源自动播种和重新播种。

   它的一些新功能包括：
    - 支持具有种子链的多个 DRBG 实例。
    - 默认 RAND 方法使用 DRBG。
    - 有一个公共和私有 DRBG 实例。
    - DRBG 实例是 fork 安全的。
    - 如果启用了安全堆，则将所有全局 DRBG 实例保留在安全堆上。
    - 公共和私有 DRBG 实例是每个线程的，用于无锁操作。

   *Paul Dale, Benjamin Kaduk, Kurt Roeckx, Rich Salz, Matthias St. Pierre*

 * 更改了 Configure，使其只说明它做了什么，并且不转储大量数据。
   相反，应使用 ./configdata.pm 作为脚本来显示各种配置数据。

   *Richard Levitte*

 * 将“make 变量”的处理添加到 Configure。

   *Richard Levitte*

 * 添加了 SHA512/224 和 SHA512/256 算法支持。

   *Paul Dale*

 * 删除了 Netware 支持的最后痕迹，该支持在 1.1.0 中首次删除。

   *Rich Salz*

 * 删除了 Makefile.shared，并在此过程中，使某些文件（rc.obj 或从序数文件中生成的 .def/.map/.opt 文件）的处理更加可见，并希望更容易跟踪和调试（或保持静默）。

   *Richard Levitte*

 * 使环境变量赋值可以作为参数传递给 config / Configure。

   *Richard Levitte*

 * 添加了多素数 RSA (RFC 8017) 支持。

   *Paul Yang*

 * 根据 GB/T 32905-2016 添加了 SM3 实现
   *Jack Lloyd <jack.lloyd@ribose.com>,*
   *Ronald Tse <ronald.tse@ribose.com>,*
   *Erick Borsboom <erick.borsboom@ribose.com>*

 * 添加了 RFC6066 中记录的“最大片段长度”TLS 扩展协商和支持。
   基于 Tomasz Moń 的补丁

   *Filipe Raimundo da Silva*

 * 根据 GB/T 32907-2016 添加了 SM4 实现。
   *Jack Lloyd <jack.lloyd@ribose.com>,*
   *Ronald Tse <ronald.tse@ribose.com>,*
   *Erick Borsboom <erick.borsboom@ribose.com>*

 * 重新实现了 -newreq-nodes 和 ERR_error_string_n；
   原始作者不同意许可证更改。

   *Rich Salz*

 * 添加了 ARIA AEAD TLS 支持。

   *Jon Spillett*

 * 删除了对 VS6 的一些宏定义。自 1.1.0 起，Visual Studio 6 一直无法正常工作。

   *Rich Salz*

 * 添加了 ERR_clear_last_mark()，允许调用者在不清除错误的情况下清除最后一个标记。

   *Richard Levitte*

 * 添加了“atfork”函数。如果构建在不支持 pthreads 的系统上，请参阅 doc/man3/OPENSSL_fork_prepare.pod 获取应用程序要求。RAND 工具现在使用/需要此功能。

   *Rich Salz*

 * 添加了 SHA3。

   *Andy Polyakov*

 * UI API 成为 libcrypto 的永久且不可或缺的一部分，即
   无法完全禁用。然而，仍然可以禁用控制台读取 UI 方法 UI_OpenSSL()（使用 UI_null()
   作为回退）。

   要禁用，请使用 'no-ui-console' 进行配置。仍然可以使用 'no-ui' 作为别名。
   在编译时使用宏 OPENSSL_NO_UI_CONSOLE 进行检查。仍然可以检查宏 OPENSSL_NO_UI，它是 OPENSSL_NO_UI_CONSOLE 的别名。

   *Richard Levitte*

 * 添加了一个 STORE 模块，它实现了一个统一的、基于 URI 的存储读取器，该存储可以包含密钥、证书、CRL 和许多其他对象。
   主 API 松散地基于一些 stdio 函数，包括 OSSL_STORE_open、OSSL_STORE_load、OSSL_STORE_eof、
   OSSL_STORE_error 和 OSSL_STORE_close。
   该实现使用称为“加载器”的后端来实现任意 URI 方案。有一个内置的“加载器”用于“file”方案。

   *Richard Levitte*

 * 添加了 devcrypto 引擎。它已针对 cryptodev-linux 实现，然后调整为在 FreeBSD 8.4 上也能工作。
   通过使用 'enable-devcryptoeng' 进行配置来启用。在所有 BSD 实现上默认执行此操作，因为假定 cryptodev.h 存在于所有实现上。

   *Richard Levitte*

 * 模块名称可以以 OSSL_ 或 OPENSSL_ 作为前缀。这会影响 util/mkerr.pl，它被调整为允许这些前缀，从而导致如下错误代码调用：

           OSSL_FOOerr(OSSL_FOO_F_SOMETHING, OSSL_FOO_R_WHATEVER);

   通过此更改，我们以可以编码为 C 的方式声明 OSSL 和 OPENSSL 命名空间。在可预见的未来，这只会影响新模块。

   *Richard Levitte 和 Tim Hudson*

 * 删除了 BSD cryptodev 引擎。

   *Rich Salz*

 * 添加了一个构建目标 'build_all_generated'，用于构建所有生成的文件，仅此而已。这可以用于准备所有需要 Perl 等内容的文件，然后将所有内容移动到该系统上并在那里完成其余的构建。

   *Richard Levitte*

 * 在 UI 接口中，可以复制用户数据。这可以被需要比传递用户数据的调用更长时间地保留数据的引擎使用。

   *Richard Levitte*

 * 忽略 '-named_curve auto' 值以兼容应用程序与 OpenSSL 1.0.2。

   *Tomáš Mráz <tmraz@fedoraproject.org>*

 * 不再接受分段的 SSL/TLS 警报。警报消息长 2 字节。理论上，在 SSLv3 - TLSv1.2 中，可以将此类警报分段到多个记录中（其中一些可以是空的）。实际上，发送空警报记录或分段警报没有意义。TLSv1.3 完全禁止此操作，其他库（BoringSSL、NSS）根本不支持。支持它会给记录层增加显著的复杂性，并且其移除不太可能导致互操作性问题。

   *Matt Caswell*

 * 添加了 ASN.1 类型 INT32、UINT32、INT64、UINT64 和带有 Z 前缀的变体。这些旨在替换 LONG 和 ZLONG，并且是大小安全的。
   不鼓励使用 LONG 和 ZLONG，并计划在 OpenSSL 1.2.0 中弃用。

   *Richard Levitte*

 * 在 BIO_printf() 等格式化字符串中添加了 'z' 和 'j' 修饰符，'z' 用于 [s]size_t，'j' 用于 [u]int64_t。

   *Richard Levitte, Andy Polyakov*

 * 添加了 EC_KEY_get0_engine()，它为 EC_KEY 提供了 RSA_get0_engine() 等的功能。

   *Richard Levitte*

 * 让 'config' 识别 64 位 mingw 并选择 'mingw64' 作为目标平台而不是 'mingw'。

   *Richard Levitte*

 * X509_STORE_add_cert 和 X509_STORE_add_crl 函数在被要求添加已存在于存储中的对象时返回成功。此更改会级联到其他加载证书和 CRL 的函数。

   *Paul Dale*

 * x86_64 汇编包：用 DWARF CFI 指令注释代码，以便从汇编子例程进行堆栈展开。

   *Andy Polyakov*

 * 删除了 VAX C 特定的 OPENSSL_EXPORT、OPENSSL_EXTERN 定义。
   还删除了 OPENSSL_GLOBAL，因为它已成为一个无操作。

   *Richard Levitte*

 * 删除了 crypto/o_times.c 中的 VMS 特定重写版本 gmtime。
   自 V7.1 起，VMS C 的 RTL 就拥有完全最新的 gmtime() 和 gmtime_r()，这是我们支持的最低版本。

   *Richard Levitte*

 * 证书时间验证 (X509_cmp_time) 强制更严格地遵守 RFC 5280。不再允许小数秒和时区偏移。

   *Emilia Käsper*

 * 添加了对 ARIA 的支持

   *Paul Dale*

 * s_client 现在将默认发送服务器名称指示 (SNI) 扩展，除非使用新的“-noservername”选项。服务器名称基于提供给“-connect”选项的主机，除非使用“-servername”覆盖。

   *Matt Caswell*

 * 添加了对 SipHash 的支持

   *Todd Short*

 * OpenSSL 现在在收到 TLS1.0 或 TLS1.1 中的未知记录类型时失败。以前这只发生在 SSLv3 和 TLS1.2 中。这是为了防止出现没有进展且对等方不断发送未知记录类型，从而消耗资源处理它们的问题。

   *Matt Caswell*

 * 'openssl passwd' 现在可以生成基于 SHA256 和 SHA512 的输出，使用 <https://www.akkadia.org/drepper/SHA-crypt.txt> 中定义的算法。

   *Richard Levitte*

 * 已删除心跳支持；ABI 已更改。

   *Richard Levitte, Rich Salz*

 * 支持 SSL_OP_NO_ENCRYPT_THEN_MAC 在 SSL_CONF_cmd 中。

   *Emilia Käsper*

 * RSA 的“null”方法，部分支持以避免专利问题，已被替换为始终返回 NULL。

   *Rich Salz*

OpenSSL 1.1.0
-------------

### 1.1.0k 和 1.1.0l 之间的变更 [2019 年 9 月 10 日]

* 对于内置的 EC 曲线，请确保即使在解析显式参数、加载编码密钥或调用 `EC_GROUP_new_from_ecpkparameters()`/`EC_GROUP_new_from_ecparameters()` 时，也使用从曲线名称构建的 EC_GROUP。
   这可以防止绕过安全加固和性能提升，特别是对于具有专用 EC_METHOD 的曲线。
   默认情况下，如果加载的密钥是用显式参数编码的，并且稍后进行编码，则输出仍然是用显式参数编码的，即使在内部使用“命名”的 EC_GROUP 进行计算。

   *Nicola Tuveri*

* 如果在 EC_GROUP 构建期间未提供 ECC 协因子，则计算它。在此更改之前，`EC_GROUP_set_generator` 会接受阶数和/或协因子为 NULL。在此更改之后，只有协因子参数可以为 NULL。它还会对传入的阶数进行一些最小的健全性检查。
   ([CVE-2019-1547])

   *Billy Bob Brumley*

* 修复了 PKCS7_dataDecode 和 CMS_decrypt_set1_pkey 中的填充预言。
   如果第一个 CMS_recipientInfo 有效，但第二个 CMS_recipientInfo 是选择密文，则攻击很简单。如果第二个 recipientInfo 解码为 PKCS #1 v1.5 形式的明文，则正确的加密密钥将被垃圾数据替换，并且消息无法解码，但如果 RSA 解密失败，则会使用正确的加密密钥，并且接收者不会注意到攻击。
   作为此潜在攻击的解决方法，在未提供证书且尝试了所有 recipientInfo 的情况下，解密密钥的长度必须等于密码的默认密钥长度。
   可以通过设置 CMS_DEBUG_DECRYPT 标志来在 CMS 代码中重新启用旧行为。
   ([CVE-2019-1563])

   *Bernd Edlinger*

* 在 mingw 构建中使用 Windows 安装路径

   Mingw 本身不是 POSIX 环境，这意味着安装应使用 Windows 路径。
   ([CVE-2019-1552])

   *Richard Levitte*

### 1.1.0j 和 1.1.0k 之间的变更 [2019 年 5 月 28 日]

* 将默认 RSA、DSA 和 DH 大小更改为 2048 位而不是 1024 位。
   这会更改使用 `genpkey` 命令时的大小（如果未指定大小）。
   它修复了早期更改中的疏忽，这些更改已将所有 RSA、DSA 和 DH 生成命令默认设置为使用 2048 位。

   *Kurt Roeckx*

* 防止 ChaCha20-Poly1305 中的非随机数过长。

   ChaCha20-Poly1305 是一种 AEAD 密码，需要为每次加密操作提供唯一的非随机数输入。RFC 7539 指定非随机数值 (IV) 应为 96 位 (12 字节)。OpenSSL 允许可变非随机数长度，如果非随机数小于 12 字节，则用 0 字节进行前导填充。但是，它也错误地允许设置长达 16 字节的非随机数。在这种情况下，只有最后 12 个字节才有意义，任何额外的领先字节都会被忽略。

   使用此密码的要求是非随机数必须是唯一的。使用重复非随机数加密的消息容易受到严重的机密性和完整性攻击。如果应用程序将默认非随机数长度更改为大于 12 字节，然后更改非随机数的领先字节，期望新值是一个新的唯一非随机数，那么这样的应用程序可能会无意中用重复的非随机数加密消息。

   此外，长非随机数中被忽略的字节不受此密码完整性保证的保护。任何依赖这些被忽略的领先字节完整性的应用程序可能会受到进一步影响。OpenSSL 内部对此密码的任何使用，包括在 SSL/TLS 中，都是安全的，因为没有此类使用设置如此长的非随机数值。然而，直接使用此密码并设置非默认非随机数长度大于 12 字节的用户应用程序可能存在漏洞。

   此问题于 2019 年 3 月 16 日由 Ronomon 的 Joran Dirk Greef 报告给 OpenSSL。
   ([CVE-2019-1543])

   *Matt Caswell*

* 通过 EC_METHOD 中的新专用 field_inv() 指针，为 EC_GROUP 中的模场求逆添加了 SCA 加固。
   这还解决了影响从射影坐标到仿射坐标转换的泄露问题。

   *Billy Bob Brumley, Nicola Tuveri*

* 修复了 d2i_X509_PUBKEY 中在使用第二个 PUBKEY 格式错误时覆盖重用 X509_PUBKEY 对象的“使用后释放”错误。

   *Bernd Edlinger*

* 将严格性检查从 EVP_PKEY_asn1_new() 移至 EVP_PKEY_asn1_add0()。

   *Richard Levitte*

* 删除了 'dist' 目标并添加了一个 tarball 构建脚本。'dist' 目标已不再使用，并且不应仅为了创建源分发版而进行配置。

   *Richard Levitte*

### 1.1.0i 和 1.1.0j 之间的变更 [2018 年 11 月 20 日]

* DSA 签名生成中的时序漏洞

   OpenSSL DSA 签名算法已被证明容易受到时序侧信道攻击。攻击者可以利用签名算法中的变化来恢复私钥。

   此问题于 2018 年 10 月 16 日由 Samuel Weiser 报告给 OpenSSL。
   ([CVE-2018-0734])

   *Paul Dale*

* ECDSA 签名生成中的时序漏洞

   OpenSSL ECDSA 签名算法已被证明容易受到时序侧信道攻击。攻击者可以利用签名算法中的变化来恢复私钥。

   此问题于 2018 年 10 月 25 日由 Samuel Weiser 报告给 OpenSSL。
   ([CVE-2018-0735])

   *Paul Dale*

* 为 EC_POINT 添加了坐标混淆，并实现了通用素数曲线的射影坐标混淆，作为对选择点 SCA 攻击的对策。

   *Sohaib ul Hassan, Nicola Tuveri, Billy Bob Brumley*

### 1.1.0h 和 1.1.0i 之间的变更 [2018 年 8 月 14 日]

* 由于 DH 参数过大导致的客户端 DoS

   在使用基于 DH(E) 的密码套件的 TLS 握手中进行密钥协商期间，恶意服务器可以向客户端发送一个非常大的素数。这将导致客户端花费异常长的时间来为该素数生成密钥，从而导致挂起直到客户端完成。这可能被用于拒绝服务攻击。

   此问题于 2018 年 6 月 5 日由 Guido Vranken 报告给 OpenSSL
   ([CVE-2018-0732])

   *Guido Vranken*

* RSA 密钥生成中的缓存时序漏洞

   OpenSSL RSA 密钥生成算法已被证明容易受到缓存时序侧信道攻击。能够在此 RSA 密钥生成过程中进行缓存时序攻击的攻击者可以恢复私钥。

   此问题于 2018 年 4 月 4 日由 Alejandro Cabrera Aldaya、Billy Brumley、Cesar Pereida Garcia 和 Luis Manuel Alvarez Tapia 报告给 OpenSSL。
   ([CVE-2018-0737])

   *Billy Brumley*

* 使 EVP_PKEY_asn1_new() 对其输入更加严格。不再接受 NULL pem_str 参数，因为它会导致表损坏。NULL pem_str 仅保留给别名条目。

   *Richard Levitte*

* 撤销 ECDSA 签名中的混淆，而是使有问题的加法长度不变。甚至切换到固定长度的蒙哥马利乘法。

   *Andy Polyakov*

* 更改素数的生成和检查方式，使素数不合格的错误率取决于输入大小的预期用途。
   对于较大的素数，这将导致更多的 Miller-Rabin 轮次。
   大于 1080 位的素数的最大错误率降低到 2^-128。

   *Kurt Roeckx, Annie Yousar*

* 将 DSA 密钥生成的 Miller-Rabin 轮数增加到 64。

   *Kurt Roeckx*

* 向 ECDSA 和 DSA 签名添加混淆，以防止 Keegan Ryan (NCC Group) 发现的侧信道攻击。

   *Matt Caswell*

* 在解锁受密码保护的 PEM 文件或 PKCS#8 容器时，现在允许使用空（零字符）密码。

   *Richard Levitte*

* 证书时间验证 (X509_cmp_time) 强制执行更严格的 RFC 5280 合规性。不再允许小数秒和时区偏移。

   *Emilia Käsper*

* 修复了 CMS 中的文本规范化错误

   当 CMS 分离签名与文本内容一起使用时，文本在签名或验证签名之前会经过规范化过程。此过程会剥离行尾的空格，将行终止符转换为 CRLF，并删除文件末尾的其他尾随行终止符。规范化过程中的一个错误意味着某些字符（如换页符）被错误地视为空格并被删除。这与规范 (RFC5485) 相悖。此修复可能意味着使用早期版本的 OpenSSL 1.1.0 签名的分离文本数据在使用修复后的版本进行验证时可能会失败，或者使用修复后的 OpenSSL 签名的文本数据在使用早期版本的 OpenSSL 1.1.0 进行验证时可能会失败。解决方法是仅验证规范化后的文本数据，并使用“-binary”标志（用于“cms”命令行应用程序）或设置 SMIME_BINARY/PKCS7_BINARY/CMS_BINARY 标志（如果使用 CMS_verify()）。

   *Matt Caswell*

### 1.1.0g 和 1.1.0h 之间的变更 [2018 年 3 月 27 日]

* 具有递归定义的构造 ASN.1 类型可能超出堆栈

   具有递归定义的构造 ASN.1 类型（如 PKCS7 中所见）在给定具有过度递归的恶意输入时，最终可能超出堆栈。这可能导致拒绝服务攻击。SSL/TLS 中没有来自不受信任来源的此类结构，因此这被认为是安全的。

   此问题于 2018 年 1 月 4 日由 OSS-fuzz 项目报告给 OpenSSL。
   ([CVE-2018-0739])

   *Matt Caswell*

* HP-UX PA-RISC 上的 CRYPTO_memcmp 错误

   由于实现错误，PA-RISC CRYPTO_memcmp 函数实际上只比较每个字节的最低有效位。这允许攻击者以低于方案安全声明保证的尝试次数伪造被视为已认证的消息。该模块只能由 HP-UX 汇编器编译，因此只有 HP-UX PA-RISC 目标会受到影响。

   此问题于 2018 年 3 月 2 日由 Peter Waltenberg (IBM) 报告给 OpenSSL。
   ([CVE-2018-0733])

   *Andy Polyakov*

* 添加了一个构建目标 'build_all_generated'，用于构建所有生成的文件，仅此而已。这可用于为缺少 perl 的系统准备所有需要 perl 等的内容，然后将所有内容移动到该系统并在那里完成其余的构建。

   *Richard Levitte*

* 向后移植 SSL_OP_NO_RENGOTIATION

   OpenSSL 1.0.2 及更早版本可以使用（未记录的）SSL3_FLAGS_NO_RENEGOTIATE_CIPHERS 标志禁用重新协商。由于不透明性更改，这在 1.1.0 中不再可能。因此，已将 1.1.1-dev 中的新 SSL_OP_NO_RENEGOTIATION 选项向后移植到 1.1.0，以提供等效功能。

   请注意，如果使用针对 1.1.0h 头文件（或更高版本）构建的应用程序使用较旧版本的 1.1.0（1.1.0h 之前）运行，则该选项将被接受但不会执行任何操作，即不会阻止重新协商。

   *Matt Caswell*

* 删除了 OS390-Unix 配置目标。它依赖于一个不存在的脚本。

   *Rich Salz*

* x86_64 上的 rsaz_1024_mul_avx2 溢出错误

   在使用 1024 位模数的指数运算中使用的 AVX2 蒙哥马利乘法过程中存在溢出错误。没有 EC 算法受到影响。分析表明，由于此缺陷导致的 RSA 和 DSA 攻击非常难以执行，并且不认为可能发生。DH1024 的攻击被认为只是可行，因为推断私钥信息所需的大部分工作可以在离线完成。此类攻击所需的资源量将是巨大的。但是，为了使 TLS 攻击有意义，服务器必须在多个客户端之间共享 DH1024 私钥，而自 CVE-2016-0701 起这已不再是选项。

   这仅影响支持 AVX2 但不支持 ADX 扩展的处理器，例如 Intel Haswell（第 4 代）。

   此问题由 David Benjamin (Google) 报告给 OpenSSL。该问题最初是通过 OSS-Fuzz 项目发现的。
   ([CVE-2017-3738])

   *Andy Polyakov*

### 1.1.0f 和 1.1.0g 之间的变更 [2017 年 11 月 2 日]

* bn_sqrx8x_internal x86_64 上的进位错误

   x86_64 蒙哥马利平方过程中存在进位传播错误。没有 EC 算法受到影响。分析表明，由于此缺陷导致的 RSA 和 DSA 攻击非常难以执行，并且不认为可能发生。DH 的攻击被认为只是可行（尽管非常困难），因为推断私钥信息所需的大部分工作可以在离线完成。此类攻击所需的资源量将非常巨大，并且可能只有少数攻击者能够获得。攻击者还需要在线访问一个未打补丁的系统，该系统在具有持久 DH 参数和在多个客户端之间共享的私钥的场景中使用目标私钥。

   这仅影响支持 BMI1、BMI2 和 ADX 扩展的处理器，例如 Intel Broadwell（第 5 代）及更高版本或 AMD Ryzen。

   此问题由 OSS-Fuzz 项目报告给 OpenSSL。
   ([CVE-2017-3736])

   *Andy Polyakov*

* 格式错误的 X.509 IPAddressFamily 可能导致 OOB 读取

   如果 X.509 证书具有格式错误的 IPAddressFamily 扩展，OpenSSL 可能会执行一次字节的缓冲区越界读取。最可能的结果是证书在文本格式中显示错误。

   此问题由 OSS-Fuzz 项目报告给 OpenSSL。
   ([CVE-2017-3735])

   *Rich Salz*

### 1.1.0e 和 1.1.0f 之间的变更 [2017 年 5 月 25 日]

* 使 'config' 能够识别 64 位 mingw 并选择 'mingw64' 作为目标平台，而不是 'mingw'。

   *Richard Levitte*

* 从 crypto/o_times.c 中删除了 VMS 特定的 gmtime 重实现。
   VMS C 的 RTL 自 V7.1 起就具有完全最新的 gmtime() 和 gmtime_r()，这是我们支持的最低版本。

   *Richard Levitte*

### 1.1.0d 和 1.1.0e 之间的变更 [2017 年 2 月 16 日]

* 加密后 MAC 重新协商崩溃

   在重新协商握手中，如果协商了加密后 MAC 扩展，而原始握手中没有（反之亦然），则可能导致 OpenSSL 崩溃（取决于密码套件）。客户端和服务器都受到影响。

   此问题由 Joe Orton (Red Hat) 报告给 OpenSSL。
   ([CVE-2017-3733])

   *Matt Caswell*

### 1.1.0c 和 1.1.0d 之间的变更 [2017 年 1 月 26 日]

* 截断的数据包可能因 OOB 读取而崩溃

   如果 SSL/TLS 路径的一侧运行在 32 位主机上并使用了特定的密码，则截断的数据包可能导致该主机执行越界读取，通常会导致崩溃。

   此问题由 Robert Święcki (Google) 报告给 OpenSSL。
   ([CVE-2017-3731])

   *Andy Polyakov*

* 错误的 (EC)DHE 参数导致客户端崩溃

   如果恶意服务器为 DHE 或 ECDHE 密钥交换提供了错误的参数，则可能导致客户端尝试解引用 NULL 指针，从而导致客户端崩溃。这可能被用于拒绝服务攻击。

   此问题由 Guido Vranken 报告给 OpenSSL。
   ([CVE-2017-3730])

   *Matt Caswell*

* BN_mod_exp 在 x86_64 上可能产生不正确的结果

   x86_64 蒙哥马利平方过程中存在进位传播错误。没有 EC 算法受到影响。分析表明，由于此缺陷导致的 RSA 和 DSA 攻击非常难以执行，并且不认为可能发生。DH 的攻击被认为只是可行（尽管非常困难），因为推断私钥信息所需的大部分工作可以在离线完成。此类攻击所需的资源量将非常巨大，并且可能只有少数攻击者能够获得。攻击者还需要在线访问一个未打补丁的系统，该系统在具有持久 DH 参数和在多个客户端之间共享的私钥的场景中使用目标私钥。例如，这默认发生在 OpenSSL 基于 DHE 的 SSL/TLS 密码套件中。注意：此问题与 CVE-2015-3193 非常相似，但必须视为一个独立的问题。

   此问题由 OSS-Fuzz 项目报告给 OpenSSL。
   ([CVE-2017-3732])

   *Andy Polyakov*

### 1.1.0b 和 1.1.0c 之间的变更 [2016 年 11 月 10 日]

* ChaCha20/Poly1305 堆缓冲区溢出

   使用 `*-CHACHA20-POLY1305` 密码套件的 TLS 连接容易受到通过损坏较大有效载荷的 DoS 攻击。这可能导致 OpenSSL 崩溃。此问题不被认为可被利用于 DoS 之外的攻击。

   此问题由 Robert Święcki (Google Security Team) 报告给 OpenSSL
   ([CVE-2016-7054])

   *Richard Levitte*

* CMS NULL 解引用

   解析无效 CMS 结构的应用程序可能会因 NULL 指针解引用而崩溃。这是由于 OpenSSL 1.1.0 中处理 ASN.1 CHOICE 类型时的一个错误，该错误可能导致在尝试释放某些无效编码时将 NULL 值传递给回调函数。只有使用不处理 NULL 值的回调的 CHOICE 结构会受到影响。

   此问题由 Tyler Nighswander (ForAllSecure) 报告给 OpenSSL。
   ([CVE-2016-7053])

   *Stephen Henson*

* 蒙哥马利乘法可能产生不正确的结果

   Broadwell 特定的蒙哥马利乘法过程中存在进位传播错误，该过程处理长度可被 256 位整除但大于 256 位的输入。分析表明，针对 RSA、DSA 和 DH 私钥的攻击是不可能的。这是因为所讨论的子程序本身不用于私钥操作，也不用于攻击者直接选择的输入。否则，该错误可能表现为瞬时身份验证和密钥协商失败，或使用特制输入的可重现的公钥操作结果错误。在 EC 算法中，只有 Brainpool P-512 曲线受到影响，并且可以攻击 ECDH 密钥协商。影响尚未详细分析，因为攻击的先决条件被认为不太可能。即，多个客户端必须选择所讨论的曲线，并且服务器必须在它们之间共享私钥，这两者都不是默认行为。即使如此，也只有选择了该曲线的客户端才会受到影响。

   此问题作为瞬时故障被公开报告，最初未被识别为安全问题。感谢 Richard Morgan 提供可重现的案例。
   ([CVE-2016-7055])

   *Andy Polyakov*

* 删除了共享库和可执行文件中的自动 RPATH 添加，因为这是 OpenSSL 1.0.x 的遗留物，现在不再需要。

   *Richard Levitte*

### 1.1.0a 和 1.1.0b 之间的变更 [2016 年 9 月 26 日]

* 修复了大型消息大小的“使用后释放”问题

   为解决 CVE-2016-6307 而应用的补丁导致了一个问题，即如果接收到大于约 16k 的消息，则用于存储传入消息的底层缓冲区将被重新分配和移动。不幸的是，旧位置的悬空指针仍然存在，这会导致尝试写入先前已释放的位置。这很可能导致崩溃，但也有可能导致任意代码执行。

   此问题仅影响 OpenSSL 1.1.0a。

   此问题由 Robert Święcki 报告给 OpenSSL。
   ([CVE-2016-6309])

   *Matt Caswell*

### 1.1.0 和 1.1.0a 之间的变更 [2016 年 9 月 22 日]

* OCSP 状态请求扩展无界内存增长

   恶意客户端可以发送一个过大的 OCSP 状态请求扩展。如果该客户端持续请求重新协商，每次发送一个大的 OCSP 状态请求扩展，服务器上的内存将无界增长。这最终将通过内存耗尽导致拒绝服务攻击。即使服务器不支持 OCSP，默认配置的服务器也易受攻击。使用“no-ocsp”构建时选项的构建不受影响。

   此问题由 Shi Lei (Gear Team, Qihoo 360 Inc.) 报告给 OpenSSL
   ([CVE-2016-6304])

   *Matt Caswell*

* 空记录上的 SSL_peek() 挂起

   如果对端发送一个空记录，OpenSSL 1.1.0 SSL/TLS 在调用 SSL_peek() 时会挂起。这可能被恶意对端利用于拒绝服务攻击。

   此问题由 Alex Gaynor 报告给 OpenSSL。
   ([CVE-2016-6305])

   *Matt Caswell*

* tls_get_message_header() 和 dtls1_preprocess_fragment() 中过多的内存分配

   (D)TLS 消息在其消息头中包含 3 个字节用于长度。这将允许消息长度高达 16Mb。如此长的消息是过度的，OpenSSL 包含一个检查以确保对端发送合理大小的消息，以避免消耗过多内存来服务连接。1.1.0 版本逻辑中的一个缺陷意味着内存分配得太早，早于过大的消息长度检查。由于 OpenSSL 中内存分配的方式，这可能意味着攻击者可以为服务连接分配高达 21Mb 的内存。这可能通过内存耗尽导致拒绝服务。但是，过大的消息长度检查仍然会发生，这将导致连接立即失败。假设应用程序在连接失败的情况下及时调用 SSL_free()，那么分配的 21Mb 内存将立即被释放。因此，过多的内存分配是短暂的。这然后意味着只有在以下情况下才存在安全影响：

   1) 应用程序在连接失败的情况下未及时调用 SSL_Free()
   或
   2) 应用程序在可用内存非常少的受限环境中运行
   或
   3) 攻击者发起多个连接尝试，使得有多个连接处于已分配内存的状态；尚未调用 SSL_Free()；并且没有足够的内存来服务多个请求。

   除了上述情况 (1) 外，任何拒绝服务都可能是短暂的，因为一旦连接失败，内存将在 SSL_Free() 调用中随后被释放。然而，由于内存不足，应用程序崩溃的风险会增加——这会造成更严重的拒绝服务。

   此问题由 Shi Lei (Gear Team, Qihoo 360 Inc.) 报告给 OpenSSL (CVE-2016-6307 和 CVE-2016-6308)

   *Matt Caswell*

* solaris-x86-cc，即使用供应商编译器的 32 位配置，
   不得不被移除。主要原因是供应商汇编器无法使用 -KPIC 标志汇编我们的模块。结果是，汇编支持甚至不可用作选项。但它的缺乏意味着缺乏抗侧信道攻击的代码，这与当今的标准安全不兼容。幸运的是，gcc 是一个现成的预打包选项，我们强烈推荐它……

   *Andy Polyakov*

### 1.0.2h 和 1.1.0 之间的变更 [2016 年 8 月 25 日]

 * Windows 命令行工具支持 UTF-8 选项用于参数和控制台输入。设置 OPENSSL_WIN32_UTF8 环境变量（任意值）允许 Windows 用户访问使用 Windows CryptoAPI 生成并受非 ASCII 密码保护的 PKCS#12 文件，以及在 Linux 的 UTF-8 区域设置下生成并受非 ASCII 密码保护的文件。

   *Andy Polyakov*

 * 为缓解 SWEET32 攻击（[CVE-2016-2183]），3DES 密码套件默认已禁用，并已从 DEFAULT 中移除，就像 RC4 一样。请参阅下面的 RC4 条目以重新启用两者。

   *Rich Salz*

 * 查找 Windows RAND 种子文件存储位置的方法已更改。首先检查 %RANDFILE%。如果未设置，则按顺序检查 %HOME%、%USERPROFILE% 和 %SYSTEMROOT% 目录。如果所有方法都失败，则回退到 C:\。

   *Matt Caswell*

 * EVP_EncryptUpdate() 函数的返回类型已从 void 更改为 int。返回 0 表示错误，返回 1 表示成功。

   *Matt Caswell*

 * 之前提供禁用 RSA、DSA 和 DH 常量时间实现的标志 RSA_FLAG_NO_CONSTTIME、DSA_FLAG_NO_EXP_CONSTTIME 和 DH_FLAG_NO_EXP_CONSTTIME 已被设为无操作并弃用。

   *Matt Caswell*

 * Windows RAND 实现已简化，仅通过调用 CryptGenRandom() 获取熵。其他与 RAND 相关的票据也已关闭。

   *Joseph Wylie Yandle, Rich Salz*

 * stack 和 lhash API 已分别重命名为 `OPENSSL_SK_` 和 `OPENSSL_LH_`。旧名称仍可用以保持 API 兼容性。新名称现在已完全文档化。

   *Rich Salz*

 * 统一 TYPE_up_ref(obj) 方法签名。
   SSL_CTX_up_ref()、SSL_up_ref()、X509_up_ref()、EVP_PKEY_up_ref()、
   X509_CRL_up_ref()、X509_OBJECT_up_ref_count() 方法现在返回 int（而不是 void），就像所有其他 TYPE_up_ref() 方法一样。
   因此，这些方法现在也检查 CRYPTO_atomic_add() 的返回值以及对象引用计数器的有效性。

   *fdasilvayy@gmail.com*

 * 对于 Windows Visual Studio 构建，.pdb 文件将与安装的库和可执行文件一起安装。对于静态库安装，ossl_static.pdb 是链接程序时使用的关联的编译器生成的 .pdb 文件。

   *Richard Levitte*

 * 移除 openssl.spec。打包文件属于打包者。

   *Richard Levitte*

 * Darwin/OSX 自动配置已更新，现在可以自动识别 x86_64 架构。您仍然可以通过环境变量 KERNEL_BITS（可以是 32 或 64）来构建不同位数的版本，例如：

           KERNEL_BITS=32 ./config

   *Richard Levitte*

 * 将 pkcs8 工具中的默认算法更改为使用 PKCS#5 v2.0、256 位 AES 和带 SHA256 的 HMAC。

   *Steve Henson*

 * 移除对 IRIX（仅限 IRIX）上 MIPS o32 ABI 的支持。

   *Andy Polyakov*

 * Triple-DES 密码已从 HIGH 移至 MEDIUM。

   *Rich Salz*

 * 为了使用户能够拥有自己的配置文件和构建文件模板，Configure 会在 OPENSSL_LOCAL_CONFIG_DIR 环境变量指示的目录以及源内 Configurations/ 目录中查找。在 VMS 上，OPENSSL_LOCAL_CONFIG_DIR 被期望是一个逻辑名称，并按原样使用。

   *Richard Levitte*

 * 以下数据类型已设为不透明：X509_OBJECT、X509_STORE_CTX、X509_STORE、X509_LOOKUP 和 X509_LOOKUP_METHOD。未使用的类型 X509_CERT_FILE_CTX 已被移除。

   *Rich Salz*

 * "shared" 构建现在是默认设置。要仅创建静态库，请使用 "no-shared" Configure 选项。

   *Matt Caswell*

 * 移除 no-aes、no-hmac、no-rsa、no-sha 和 no-md5 Configure 选项。所有这些选项已失效一段时间，并且是基本算法。

   *Matt Caswell*

 * 将各种清理例程设为无操作并标记为已弃用。大多数全局清理函数不再需要，因为它们通过自动反初始化进行处理（请参阅 OPENSSL_init_crypto 和 OPENSSL_init_ssl man 页）。显式反初始化可能会导致问题（例如，当使用 OpenSSL 的库反初始化，但应用程序仍在继续使用它时）。受影响的函数是 CONF_modules_free()、ENGINE_cleanup()、OBJ_cleanup()、EVP_cleanup()、BIO_sock_cleanup()、CRYPTO_cleanup_all_ex_data()、RAND_cleanup()、SSL_COMP_free_compression_methods()、ERR_free_strings() 和 COMP_zlib_cleanup()。

   *Matt Caswell*

 * --strict-warnings 不再启用运行时调试选项，如 REF_DEBUG。相反，调试选项会在 '--debug' 构建中自动启用。

   *Andy Polyakov, Emilia Käsper*

 * DH 和 DH_METHOD 已设为不透明。用于管理 DH 对象的结构已移出公共头文件。已添加用于管理这些对象的新函数。

   *Matt Caswell*

 * RSA 和 RSA_METHOD 已设为不透明。用于管理 RSA 对象的结构已移出公共头文件。已添加用于管理这些对象的新函数。

   *Richard Levitte*

 * DSA 和 DSA_METHOD 已设为不透明。用于管理 DSA 对象的结构已移出公共头文件。已添加用于管理这些对象的新函数。

   *Matt Caswell*

 * BIO 和 BIO_METHOD 已设为不透明。用于管理 BIO 的结构已移出公共头文件。已添加用于管理这些对象的新函数。

   *Matt Caswell*

 * 移除了 no-rijndael 作为配置选项。Rijndael 是 AES 的旧名称。

   *Matt Caswell*

 * 移除了 mk1mf 构建脚本。

   *Richard Levitte*

 * 头文件现在已根据需要用 OPENSSL_NO_xxx 包装，因此 #include 头文件现在始终是安全的。

   *Rich Salz*

 * 移除了旧的 BC-32 配置及其所有支持脚本。

   *Richard Levitte*

 * 移除了对 Ultrix、Netware 和 OS/2 的支持。

   *Rich Salz*

 * 添加了对 HKDF 的支持。

   *Alessandro Ghedini*

 * 添加了对 blake2b 和 blake2s 的支持。

   *Bill Cox*

 * 添加了对“pipelining”的支持。具有 EVP_CIPH_FLAG_PIPELINE 标志的密码具有同时处理多个加密/解密的能力。目前没有内置具有此属性的密码，但预计引擎将能够提供它以显著提高吞吐量。支持已扩展到 libssl，以便可以一次处理单个连接的多个记录（对于 >=TLS 1.1）。

   *Matt Caswell*

 * 添加了 AFALG 引擎。这是一个异步功能的引擎，能够将工作卸载到 Linux 内核。在此初始版本中，它仅支持 AES128-CBC。内核版本必须大于或等于 4.1.0。

   *Catriona Lucey*

 * OpenSSL 现在使用新的线程 API。在多线程环境中不再需要设置锁定回调来使用 OpenSSL。支持两种线程模型：pthreads 和 windows threads。还可以通过编译时配置 OpenSSL 以实现“no-threads”。旧的线程 API 不应再使用。这些函数已被“no-op”兼容宏替换。

   *Alessandro Ghedini, Matt Caswell*

 * 修改了 ALPN 的行为，使其在 SNI/servername 回调之后调用，以便对 SSL_CTX 的更新会影响 ALPN。

   *Todd Short*

 * 添加了用于身份验证和密钥交换的 SSL_CIPHER 查询。

   *Todd Short*

 * 对 DEFAULT 密码列表的更改：
   - 优先使用 (EC)DHE 握手而不是纯 RSA。
   - 优先使用 AEAD 密码而不是旧式密码。
   - 当 RSA 和 ECDSA 证书都可用时，优先使用 ECDSA 而不是 RSA。
   - 优先使用 TLSv1.2 密码/PRF。
   - 从默认密码列表中移除 DSS、SEED、IDEA、CAMELLIA 和 AES-CCM。

   *Emilia Käsper*

 * 将 ECC 默认曲线列表更改为按顺序排列：x25519、secp256r1、secp521r1、secp384r1。

   *Rich Salz*

 * 基于 RC4 的 libssl 密码套件现在被归类为“弱”密码，并且默认禁用。可以使用 Configure 的 enable-weak-ssl-ciphers 选项重新启用它们。

   *Matt Caswell*

 * 如果服务器配置了 ALPN，但不支持客户端广告的任何协议，则发送致命的“no_application_protocol”警报。此行为在 RFC 7301 中是强制性的，尽管其他服务器并未普遍实现。

   *Emilia Käsper*

 * 添加 X25519 支持。
   为 X25519 添加了 ASN.1 和 EVP_PKEY 方法。这包括支持使用 draft-ietf-curdle-pkix-02 中记录的格式进行公钥和私钥编码。相应的 EVP_PKEY 方法支持密钥生成和密钥派生。

   TLS 支持符合 draft-ietf-tls-rfc4492bis-08 并使用 X25519(29)。

   *Steve Henson*

 * 弃用 SRP_VBASE_get_by_user。
   SRP_VBASE_get_by_user 具有不一致的内存管理行为。为了修复无法避免的内存泄漏（[CVE-2016-0798]），SRP_VBASE_get_by_user 被更改为忽略“fake user”SRP 种子，即使种子已配置。

   用户应改用 SRP_VBASE_get1_by_user。请注意，在 SRP_VBASE_get1_by_user 中，调用者必须释放返回的值。另请注意，即使配置 SRP 种子会尝试通过使用虚假凭据继续握手来隐藏无效用户名，但此行为不是恒定时间的，并且不作任何强有力的保证，即握手与有效用户的握手无法区分。

   *Emilia Käsper*

 * 配置更改；现在可以构建动态引擎而无需构建共享库，反之亦然。这仅适用于 `engines/` 中的引擎，`crypto/engine/` 中的引擎将始终构建到 libcrypto 中（即“静态”）。

   默认启用动态引擎构建；要禁用，请使用配置选项 "disable-dynamic-engine"。

   构建动态引擎的唯一要求是存在 DSO 模块并使用位置无关代码进行构建，因此如果使用 "disable-dso" 或 "disable-pic" 进行配置，它们也将自动禁用。

   宏 OPENSSL_NO_STATIC_ENGINE 和 OPENSSL_NO_DYNAMIC_ENGINE 也已从 openssl/opensslconf.h 中移除，因为它们无关紧要。

   *Richard Levitte*

 * 配置更改；如果存在已知的编译位置无关代码的标志，它将始终应用于 libcrypto 和 libssl 的对象文件，而从不应用于应用程序的对象文件。这意味着使用 libcrypto / libssl 例程的其他库可以构建为共享库，而不管 OpenSSL 如何配置。

   如果这不是期望的行为，可以使用配置选项 "disable-pic" 或 "no-pic" 来禁用 PIC 的使用。这也将禁用共享库和动态引擎的构建。

   *Richard Levitte*

 * 移除了 JPAKE 代码。它是实验性的，没有广泛使用。

   *Rich Salz*

 * INSTALL_PREFIX Makefile 变量已重命名为 DESTDIR。这样可以减少对该变量用途的混淆。此外，还移除了 --install_prefix 配置选项。

   *Richard Levitte*

 * TLS 心跳已移除，并且默认情况下对 DTLS 禁用；使用 enable-heartbeats 进行配置。使用旧 #define 的代码可能需要更新。

   *Emilia Käsper, Rich Salz*

 * 将 REF_CHECK 重命名为 REF_DEBUG。

   *Rich Salz*

 * 新的“统一”构建系统

   “统一”构建系统旨在成为我们支持的所有平台的通用系统。它带来了对 VMS 的新支持。

   该系统支持在与源树不同的目录树中进行构建。它会生成一个 Makefile（用于类 Unix 系列）或一个 descrip.mms（用于 VMS）。

   用于生成 Makefile / descrip.mms 的信息来源是名为 'build.info' 的小型文件，其中包含每个具有源文件的目录的必要编译信息，以及 Configurations 中的模板，如 unix-Makefile.tmpl 或 descrip.mms.tmpl。

   随着此更改，库名称在 Windows 和 VMS 上也已重命名。它们现在具有更接近 Unix 标准的名称，并包含主版本号，在某些情况下还包含构建它们的架构。请参阅 INSTALL 中的“关于共享库的说明”。

   我们严重依赖 perl 模块 Text::Template。

   *Richard Levitte*

 * 添加了库的自动初始化和反初始化支持。OpenSSL 不再需要调用显式的 init 或 deinit 例程，除非在某些情况下。有关更多信息，请参阅 OPENSSL_init_crypto() 和 OPENSSL_init_ssl() man 页。

   *Matt Caswell*

 * DTLSv1_listen 函数的参数已更改。具体来说，“peer”参数现在期望是一个 BIO_ADDR 对象。

 * BIO 网络库重写。BIO 库缺乏对 IPv6 的一致支持，添加它需要一些更广泛的修改。这引入了 BIO_ADDR 和 BIO_ADDRINFO 类型，它们保存所有类型的地址和地址信息链。它还引入了一个新 API，其中包含 BIO_socket、BIO_connect、BIO_listen、BIO_lookup 等函数，以及对 BIO_accept 的重写。源/宿 BIO BIO_s_connect、BIO_s_accept 和 BIO_s_datagram 已相应调整。

   *Richard Levitte*

 * RSA_padding_check_PKCS1_type_1 现在接受带前导 0 字节和不带前导 0 字节的输入。

   *Emilia Käsper*

 * CRIME 防护：默认禁用压缩，即使 OpenSSL 是使用 zlib 编译的。应用程序仍然可以通过调用 SSL_CTX_clear_options(ctx, SSL_OP_NO_COMPRESSION) 或使用 SSL_CONF 库配置压缩来启用压缩。

   *Emilia Käsper*

 * 使用 SSL_CTX_sess_set_get_cb 配置的会话回调的签名已更改。只读输入缓冲区被显式标记为 `const unsigned char*` 而不是 `unsigned char*`。

   *Emilia Käsper*

 * 始终 DPURIFY。移除了 RNG 中未初始化的内存使用以及其他条件性的 DPURIFY 使用。这使得 -DPURIFY 成为一个无操作。

   *Emilia Käsper*

 * 移除了许多过时的配置项，包括：
      DES_PTR、DES_RISC1、DES_RISC2、DES_INT
      MD2_CHAR、MD2_INT、MD2_LONG
      BF_PTR、BF_PTR2
      IDEA_SHORT、IDEA_LONG
      RC2_SHORT、RC2_LONG、RC4_LONG、RC4_CHUNK、RC4_INDEX

   *Rich Salz，在 Andy Polyakov 的建议下*

 * 许多 BN 内部结构已移至内部头文件。

   *Rich Salz 在 Andy Polyakov 的帮助下*

 * 配置及其结果的写入方式已更改。Makefile、include/openssl/opensslconf.h 等文件现在通过通用模板生成，例如 Makefile.in 和 crypto/opensslconf.h.in，并借助 perl 模块 Text::Template。

   此外，配置信息的中心不再是 Makefile。相反，Configure 会在 configdata.pm 中生成一个 perl 模块，其中包含大部分配置数据（在哈希表 %config 中），以及来自 `Configurations/*.conf` 文件之一中的目标配置的目标数据（在 %target 中）。

   *Richard Levitte*

 * 为了明确其预期用途，Configure 选项 --prefix 和 --openssldir 更改了其语义，变得更加直接且相互依赖性降低。

   --prefix 仅用于指定程序、脚本、库、头文件和手册的安装位置 INSTALLTOP。默认值为 /usr/local。

   --openssldir 仅用于指定证书、私钥、CRL 的默认管理位置 OPENSSLDIR。这也是默认的 openssl.cnf 被安装的位置。
   如果使用此选项指定的目录是相对路径，则 --prefix 值和 --openssldir 值将组合起来成为 OPENSSLDIR。
   --openssldir 的默认值为 INSTALLTOP/ssl。

   任何使用 --openssldir 指定 OpenSSL 安装位置的用户必须更改为使用 --prefix。

   *Richard Levitte*

 * GOST 引擎已过时，因此已被移除。更新的 GOST 引擎现在维护在一个外部存储库中。请参阅：<https://github.com/openssl/openssl/wiki/Binaries>。Libssl 仍然保留对 GOST 密码套件的支持（这些仅在存在 GOST 引擎时激活）。

   *Matt Caswell*

 * 默认不再支持 EGD；在配置时使用 enable-egd。

   *Ben Kaduk 和 Rich Salz*

 * 发行版现在包含 Makefile.in 文件，这些文件在运行 Configure 时用于创建 Makefile。*在尝试构建之前必须先运行 Configure*。

   *Rich Salz*

 * SSL_CIPHER_description() 函数在错误条件下的返回值已更改。

   *Rich Salz*

 * 支持 RFC6698/RFC7671 DANE TLSA 对等身份验证。

   获取和执行 TLSA 记录的 DNSSEC 验证是应用程序的责任。应用程序将其选择的 TLSA 记录提供给 OpenSSL，然后这些记录用于验证对等方。

   TLSA 记录甚至不必来自 DNS。它们可以，例如，用于实现本地终端实体证书或信任锚“固定”，其中“固定”数据采用 TLSA 记录的形式，这些记录可以增强或替换基于通常的 WebPKI 公共证书颁发机构的验证。

   *Viktor Dukhovni*

 * 恢复默认的 OPENSSL_NO_DEPRECATED 设置。相反，OpenSSL 在默认构建中继续支持已弃用的接口。然而，强烈建议应用程序使用 -DOPENSSL_API_COMPAT=0x10100000L 编译其源文件，这将隐藏 0.9.8、1.0.0 或 1.1.0 版本中所有已弃用接口的声明。

   在所有应用程序都已移植到不使用任何已弃用接口的环境中，OpenSSL 的 Configure 脚本应使用 --api=1.1.0 选项进行配置，以完全移除对已弃用功能的支持，并无条件地在安装的头文件中禁用它们。使用 Configure 的 "no-deprecated" 参数可以实现基本相同效果，但它总是会将构建限制在最新的 API，而不是固定的 API 版本。

   随着应用程序移植到 API 的未来版本，它们应相应地更新其编译时 OPENSSL_API_COMPAT 定义，但在大多数情况下，它们应该能够继续与后续版本进行编译。

   1.0.0 和 0.9.8 的 OPENSSL_API_COMPAT 版本分别为 0x10000000L 和 0x00908000L。然而，这些版本不支持 OPENSSL_API_COMPAT 功能，因此应用程序通常不会针对仅支持这两个版本中未弃用功能的显式支持进行测试。

   *Viktor Dukhovni*

 * 添加了设置最小和最大支持协议的支持。可以通过 SSL_set_min_proto_version() 和 SSL_set_max_proto_version() 或通过 SSL_CONF 的 MinProtocol 和 MaxProtocol 进行设置。建议使用新的 API 来禁用协议，而不是使用 SSL_set_options() 或 SSL_CONF 的 Protocol 来禁用单个协议。此更改还移除了通过定义 OPENSSL_NO_TLS1_2_CLIENT 在编译时禁用 OpenSSL TLS 客户端的支持。

   *Kurt Roeckx*

 * 为 libcrypto 和 libssl 添加了 ChaCha20 和 Poly1305 支持。

   *Andy Polyakov*

 * 新的 EC_KEY_METHOD，它取代了旧的 ECDSA_METHOD 和 ECDH_METHOD，并将 ECDSA 和 ECDH 功能集成到 EC 中。实现现在可以重定向密钥生成，并且不再需要转换为或从 ECDSA_SIG 格式转换。

   注意：ecdsa.h 和 ecdh.h 头文件现在不再需要，只需包含 ec.h 头文件即可。

   *Steve Henson*

 * 移除了对所有 40 位和 56 位密码的支持。这包括所有不再支持的导出密码，并放弃了对临时 RSA 密钥交换的支持。LOW 密码目前不包含任何密码。

   *Kurt Roeckx*

 * EVP_MD_CTX、EVP_MD、EVP_CIPHER_CTX、EVP_CIPHER 和 HMAC_CTX 已设为不透明。对于 HMAC_CTX，添加了以下构造函数和析构函数：

       HMAC_CTX *HMAC_CTX_new(void);
       void HMAC_CTX_free(HMAC_CTX *ctx);

   对于 EVP_MD 和 EVP_CIPHER，已添加完整的 API 来创建、填充和销毁这些方法。请参阅 EVP_MD_meth_new(3) 和 EVP_CIPHER_meth_new(3) 以获取文档。

   其他更改：
   1) 移除了 `EVP_MD_CTX_cleanup()`、`EVP_CIPHER_CTX_cleanup()` 和 `HMAC_CTX_cleanup()`。应改用 `HMAC_CTX_reset()` 和 `EVP_MD_CTX_reset()` 来重新初始化已创建的结构。
   2) 为了与我们大多数对象创建者和销毁者保持一致，`EVP_MD_CTX_(create|destroy)` 已重命名为 `EVP_MD_CTX_(new|free)`。旧名称作为宏保留用于已弃用的构建。

   *Richard Levitte*

 * 添加了 ASYNC 支持。Libcrypto 现在包含 async 子库，以使加密操作能够异步执行，只要使用异步功能的引擎。有关更多详细信息，请参阅 ASYNC_start_job() man 页。通过引入新的模式 SSL_MODE_ASYNC 和相关的错误 SSL_ERROR_WANT_ASYNC，libssl 也集成了此功能。请参阅 SSL_CTX_set_mode() 和 SSL_get_error() man 页。这项工作是与 Intel Corp. 合作开发的。

   *Matt Caswell*

 * SSL_{CTX_}set_ecdh_auto() 已被移除，并且 ECDH 支持现在始终启用。如果您想禁用该支持，应使用支持的密码列表将其排除。这也意味着 s_server 中已移除 "-no_ecdhe" 选项。

   *Kurt Roeckx*

 * SSL_{CTX}_set_tmp_ecdh()（可以设置 1 个 EC 曲线）现在内部调用 SSL_{CTX_}set1_Curves()（可以设置一个列表）。

   *Kurt Roeckx*

 * 移除了对 SSL_{CTX_}set_tmp_ecdh_callback() 的支持。您应该使用 SSL_{CTX_}set1_Curves() 设置您想支持的曲线。

   *Kurt Roeckx*

 * 状态机重写。状态机代码已得到显著重构，以消除大量代码重复并解决旧代码的问题（有关详细信息，请参阅 [ssl/statem/README.md](ssl/statem/README.md)）。此更改确实带来了一些相关的 API 更改。特别是，SSL_state() 函数已被移除，并被 SSL_get_state 取代，后者现在返回一个 "OSSL_HANDSHAKE_STATE" 而不是 int。SSL_set_state() 已完全移除。之前在 ssl.h 和 ssl3.h 中定义的握手状态也已移除。

   *Matt Caswell*

 * 公共 API 中的所有 "ssleay" 字符串实例都已替换为 OpenSSL（区分大小写；例如，#define 的 OPENSSL_VERSION）。与内部 RSA_eay API 相关的一些错误代码已重命名。

   *Rich Salz*

 * crypto/threads 中的演示文件已移至 demo/threads。

   *Rich Salz*

 * 移除了过时的引擎：4758cca、aep、atalla、cswift、nuron、gmp、sureware 和 ubsec。

   *Matt Caswell, Rich Salz*

 * 新的 ASN.1 嵌入宏。

   新的 ASN.1 宏 ASN1_EMBED。它与 ASN1_SIMPLE 相同，只是结构不被分配：它是父结构的一部分。即，代替

           FOO *x;

   必须是：

           FOO x;

   这减少了内存碎片，并使得不可能意外地将强制字段设置为 NULL。

   目前这仅适用于某些字段，特别是 SEQUENCE、CHOICE 或 ASN1_STRING 类型，它们是父 SEQUENCE 的一部分。由于它等同于 ASN1_SIMPLE，因此不能标记、OPTIONAL、SET OF 或 SEQUENCE OF。

   *Steve Henson*

 * 移除 EVP_CHECK_DES_KEY，这是一个从未编译过的编译时选项。

   *Emilia Käsper*

 * 从 DEFAULT 中移除了 DES 和 RC4 密码套件。还移除了 RC2，尽管在 1.0.2 中 EXPORT 已被移除，并且唯一的 RC2 密码套件也是 EXPORT 的。COMPLEMENTOFDEFAULT 已相应更新以添加 DES 和 RC4 密码套件。

   *Matt Caswell*

 * 重写 EVP_DecodeUpdate（base64 解码）以修复多个错误。这会更改某些无效消息的解码行为，尽管更改主要朝着更宽松的方向发展，并且尽可能保留了旧行为。

   *Emilia Käsper*

 * 修复了 no-stdio 构建。
   *David Woodhouse <David.Woodhouse@intel.com> 和*
   *Ivan Nestlerode <ivan.nestlerode@sonos.com>*

 * 新的测试框架
   测试框架已大部分重写，现在使用 perl 和 perl 模块 Test::Harness 以及 Test::More 的扩展变体 OpenSSL::Test 来完成工作。test/ 中的所有测试脚本都已重写为测试配方，并且对 test/Makefile 中可执行文件的所有直接调用都已成为使用简化的测试 OpenSSL::Test::Simple 的单个配方。

   有关我们的测试模块的文档，请执行：

           perldoc test/testlib/OpenSSL/Test/Simple.pm
           perldoc test/testlib/OpenSSL/Test.pm

   *Richard Levitte*

 * 改进了内存调试；仅使用 -DCRYPTO_MDEBUG 和 -DCRYPTO_MDEBUG_ABORT；后者在内存泄漏时中止（通常在退出时检查）。移除了某些未文档化的“set malloc, etc., hooks”函数，并更改了其他函数。所有这些现在都已文档化。

   *Rich Salz*

 * 在 DSA_generate_parameters_ex 中，如果提供的种子太短，则返回错误。

   *Rich Salz 和 Ismo Puustinen <ismo.puustinen@intel.com>*

 * 重写 PSK 以支持 ECDHE_PSK、DHE_PSK 和 RSA_PSK。添加了 RFC4279、RFC4785、RFC5487、RFC5489 中的密码套件。

   感谢 Christian J. Dietrich 和 Giuseppe D'Angelo 提供的原始 RSA_PSK 补丁。

   *Steve Henson*

 * 放弃了对 SSL3_FLAGS_DELAY_CLIENT_FINISHED 标志的支持。这个 SSLeay 时代的标志在代码库中从未被设置（只读取）。还移除了 SSL3_FLAGS_POP_BUFFER，它仅在 SSL3_FLAGS_DELAY_CLIENT_FINISHED 也被设置时使用。

   *Matt Caswell*

 * 将 "ca"、"crl" 和 "x509" 命令中的默认名称选项从 "compat" 更改为 "oneline"。

   *Richard Levitte*

 * 移除了 SSL_OP_TLS_BLOCK_PADDING_BUG。这是 SSLeay 的遗留问题，我们不知道仍存在此错误的客户端，并且该解决方法已有一段时间未能正常工作。

   *Emilia Käsper*

 * BIO_number_read() 和 BIO_number_written() 的返回值以及 BIO 结构中相应的 num_read 和 num_write 成员已从 unsigned long 更改为 uint64_t。在 unsigned long 为 32 位（例如 Windows）的平台上，如果传输的字节数超过 4GB，这些计数器可能会溢出。

   *Matt Caswell*

 * 鉴于 TLS 扩展的普遍性，不建议在没有支持的情况下运行 OpenSSL。这也意味着在代码中维护 OPENSSL_NO_TLSEXT 选项非常麻烦（而且可能未经充分测试）。因此，已移除 OPENSSL_NO_TLSEXT 选项。

   *Matt Caswell*

 * 移除了对两个导出级静态 DH 密码套件 EXP-DH-RSA-DES-CBC-SHA 和 EXP-DH-DSS-DES-CBC-SHA 的支持。这两个密码套件（以及其他一些静态 DH 密码套件）已添加到 1.0.2 中。然而，这两个导出密码套件自引入以来*从未*工作过。无论如何，添加新的导出密码套件似乎很奇怪，而且鉴于“logjam”，修复它们似乎也不正确。

   *Matt Caswell*

 * 版本协商已重写。特别是，SSLv23_method()、SSLv23_client_method() 和 SSLv23_server_method() 已被弃用，并被宏替换，这些宏仅调用新的首选函数名 TLS_method()、TLS_client_method() 和 TLS_server_method()。所有新代码都应使用新名称。此外，作为此更改的一部分，ssl23.h 头文件已被移除。

   *Matt Caswell*

 * 移除了对 TLS 中 Kerberos 密码套件（RFC2712）的支持。此代码和相关标准不再被认为适合使用。

   *Matt Caswell*

 * 关闭了 RT2547。生成私钥时，尝试使输出文件仅对所有者可读。此行为更改在与其他软件交互时可能会显现。

 * 文档化了所有 exdata 函数。添加了 CRYPTO_free_ex_index。
   添加了一个测试。

   *Rich Salz*

 * 在 ocsp 命令行工具中添加了 HTTP GET 支持。

   *Rich Salz*

 * 将 dgst 和 enc 命令的默认摘要从 MD5 更改为 sha256。

   *Rich Salz*

 * RAND_pseudo_bytes 已被弃用。用户应改用 RAND_bytes。

   *Matt Caswell*

 * 添加了对 TLS 扩展主密钥的支持，来自 draft-ietf-tls-session-hash-03.txt。感谢 Alfredo Pironti 提供的初始补丁，它在开发过程中提供了极大的帮助。

   *Steve Henson*

 * libssl 中的所有内部结构都已从公共头文件中移除，并且 OPENSSL_NO_SSL_INTERN 选项已移除（因为它现在是多余的）。用户不应尝试直接访问内部结构。相反，他们应该使用提供的 API 函数。

   *Matt Caswell*

 * config 已更改，默认情况下使用 OPENSSL_NO_DEPRECATED。可以通过运行带有 "enable-deprecated" 的 config 来重新启用对已弃用函数的访问。此外，希望使用已弃用函数的应用程序必须定义 OPENSSL_USE_DEPRECATED。请注意，此新行为默认情况下将禁用之前存在于头文件中的一些传递包含（例如，ec.h 默认情况下将不再包含 bn.h）。

   *Matt Caswell*

 * 添加了对 OCB 模式的支持。OpenSSL 已获得与 OpenSSL 许可证兼容的 OCB 使用专利许可。详情请参阅 <https://www.openssl.org/source/OCB-patent-grant-OpenSSL.pdf>。可以通过调用带有 no-ocb 的 config 来移除对 OCB 的支持。

   *Matt Caswell*

 * 已移除 SSLv2 支持。它仍然支持接收 SSLv2 兼容的客户端 hello。

   *Kurt Roeckx*

 * 将最小 RSA 密钥长度从 256 位增加到 512 位 [Rich Salz]，在修复了密钥太小的情况的错误代码时完成。

   *Annie Yousar <a.yousar@informatik.hu-berlin.de>*

 * CA.sh 已移除；改用 CA.pl。

   *Rich Salz*

 * 移除了旧的 DES API。

   *Rich Salz*

 * 移除了各种不受支持的平台：
      Sony NEWS4
      BEOS 和 BEOS_R5
      NeXT
      SUNOS
      MPE/iX
      Sinix/ReliantUNIX RM400
      DGUX
      NCR
      Tandem
      Cray
      16 位平台，如 WIN16

   *Rich Salz*

 * 清理 OPENSSL_NO_xxx #define's
   - 使用 setbuf() 并移除 OPENSSL_NO_SETVBUF_IONBF
   - 将 OPENSSL_SYSNAME_xxx 重命名为 OPENSSL_SYS_xxx
   - OPENSSL_NO_EC{DH,DSA} 合并到 OPENSSL_NO_EC
   - OPENSSL_NO_RIPEMD160、OPENSSL_NO_RIPEMD 合并到 OPENSSL_NO_RMD160
   - OPENSSL_NO_FP_API 合并到 OPENSSL_NO_STDIO
   - 移除 OPENSSL_NO_BIO、OPENSSL_NO_BUFFER、OPENSSL_NO_CHAIN_VERIFY
     OPENSSL_NO_EVP、OPENSSL_NO_FIPS_ERR、OPENSSL_NO_HASH_COMP
     OPENSSL_NO_LHASH、OPENSSL_NO_OBJECT、OPENSSL_NO_SPEED、OPENSSL_NO_STACK
     OPENSSL_NO_X509、OPENSSL_NO_X509_VERIFY
   - 移除 MS_STATIC；它是 32 位以下平台的遗留物。

   *Rich Salz*

 * 清理了死代码
     移除了除一个 '#ifdef undef' 之外的所有代码，该代码将被检查。

   *Rich Salz*

 * 清理 xxx_free 例程的调用。
      就像 free() 一样，修复了大多数 xxx_free 例程以接受 NULL。从调用者中移除了非 NULL 检查。节省了大量代码。

   *Rich Salz*

 * 为私钥存储添加了安全堆（如果可能）。
   添加了 BIO_s_secmem()、CBIGNUM 等。
   由 Akamai Technologies 根据我们的公司 CLA 贡献。

   *Rich Salz*

 * 新的、快速的、无偏的素数候选生成器 bn_probable_prime_dh_coprime() 的实验性支持。目前未被任何素数生成器使用。

   *Felix Laurie von Massenbach <felix@erbridge.co.uk>*

 * sess_id 命令行工具中的新输出格式 NSS。这允许以 NSS keylog 格式导出会话 ID 和主密钥。

   *Martin Kaiser <martin@kaiser.cx>*

 * 统一版本及其文档。-f 标志用于显示编译标志。

   *mancha <mancha1@zoho.com>*

 * 修复 eckey_priv_encode，使其在 i2d_ECPrivateKey 失败时立即返回错误。感谢 Ted Unangst 对此问题的反馈。

   *mancha <mancha1@zoho.com>*

 * 修复了一些双重释放。这些不被认为是可利用的。

   *mancha <mancha1@zoho.com>*

 * TLS 心跳扩展处理中缺少边界检查可用于向连接的客户端或服务器泄露多达 64k 的内存。

   感谢 Google 安全的 Neel Mehta 发现此错误，以及 Adam Langley <agl@chromium.org> 和 Bodo Moeller <bmoeller@acm.org> 准备修复程序（[CVE-2014-0160]）。

   *Adam Langley, Bodo Moeller*

 * 修复了论文“使用 FLUSH+RELOAD 缓存侧信道攻击恢复 OpenSSL ECDSA Nonces”中描述的攻击。详细信息可从以下网址获取：<http://eprint.iacr.org/2014/140>

   感谢 Yuval Yarom 和 Naomi Benger 发现此漏洞，并感谢 Yuval Yarom 提供修复程序（[CVE-2014-0076]）。

   *Yuval Yarom 和 Naomi Benger*

 * 在 SSL_CTX_use_certificate_chain_file() 中使用算法特定的链：这修复了 OpenSSL 早期版本中的一个限制。

   *Steve Henson*

 * 实验性的加密-然后-MAC 支持。

   对 draft-gutmann-tls-encrypt-then-mac-02.txt 的加密-然后-MAC 的实验性支持。

   要启用它，请使用适当的扩展号（测试服务器为 0x42），例如使用 -DTLSEXT_TYPE_encrypt_then_mac=0x42。

   对于不兼容的对等方（即几乎所有对等方），这应该没有影响。

   警告：实验性，可能更改。

   *Steve Henson*

 * 为密钥包装算法添加 EVP 支持，以避免与现有代码的问题，必须在 EVP_CIPHER_CTX 中设置标志 EVP_CIPHER_CTX_WRAP_ALLOW，否则将返回错误。添加 AES 和 DES3 包装算法并包含测试用例。

   *Steve Henson*

 * 扩展 CMS 代码以支持 RSA-PSS 签名和用于加密数据的 RSA-OAEP。

   *Steve Henson*

 * 通过 EVP_PKEY API 扩展 RSA OAEP 支持。指定摘要、MGF1 摘要和 OAEP 标签的选项。

   *Steve Henson*

 * 使 openssl verify 返回错误。

   *Chris Palmer <palmer@google.com> 和 Ben Laurie*

 * 新函数 ASN1_TIME_diff 用于计算两个 ASN1_TIME 结构之间或一个结构与当前时间之间的差异。

   *Steve Henson*

 * 更新 fips_test_suite 以支持多个命令行选项。新的测试用于按顺序诱导所有自检错误并检查预期的失败。

   *Steve Henson*

 * 添加 FIPS_{rsa,dsa,ecdsa}_{sign,verify} 函数，该函数在一个操作中完成摘要和签名或验证。

   *Steve Henson*

 * 添加 fips_algvs：一个多调用 fips 工具，集成了所有算法测试程序和 fips_test_suite。包括直接解析 fipsalgest.pl 的最小脚本输出的功能。

   *Steve Henson*

 * 向 FIPS_module_mode_set() 添加授权参数。

   *Steve Henson*

 * 为使用 P-224 和 B-233 曲线的 ECDH 算法添加 FIPS 自检。

   *Steve Henson*

 * 使用 DRBG 的内部和外部标志的单独字段。新函数 FIPS_drbg_health_check() 用于执行按需健康检查。向 fips_test_suite 添加生成测试，并缩短健康检查间隔以演示周期性健康检查。添加 "nodh" 选项到 fips_test_suite 以跳过非常慢的 DH 测试。

   *Steve Henson*

 * 新函数 FIPS_get_cipherbynid() 用于根据 NID 查找 FIPS 支持的密码。

   *Steve Henson*

 * 更广泛的 DRBG 健康检查，检查更多故障模式。新函数 FIPS_selftest_drbg_all() 用于处理所有可能的 DRBG 组合：在 fips_test_suite 中调用此函数。

   *Steve Henson*

 * 添加对 DSA 参数 'g' 的规范生成支持。请参阅 FIPS 186-3 A.2.3。

 * 添加对 SP800-90 的 HMAC DRBG 的支持。更新 DRBG 算法测试和 POST 以处理 HMAC 情况。

   *Steve Henson*

 * 添加函数 FIPS_module_version() 和 FIPS_module_version_text() 以返回 FIPS 模块号的数字和文本版本。

   *Steve Henson*

 * 将 FIPS_mode_set 和 FIPS_mode 重命名为 FIPS_module_mode_set 和 FIPS_module_mode。FIPS_mode 和 FIPS_mode_set 将在 FIPS 功能 OpenSSL 中位于已验证模块之外实现。

   *Steve Henson*

 * DRBG 熵回调语义的微小更改。在某些情况下，在 min_len 和 max_len 之间没有块长度的倍数。允许回调返回多于 max_len 字节的熵，但丢弃任何额外的字节：回调负责确保丢弃的额外数据不会影响请求的熵量。

   *Steve Henson*

 * 向 RSA、DSA 和 ECDSA 添加 PRNG 安全强度检查，使用 FIPS186-3、SP800-57 和 SP800-131A 中的信息。

   *Steve Henson*

 * 通过 EVP 支持 CCM 模式。接口与 GCM 情况非常相似，只是我们必须一次性提供所有数据（即，没有 update、final），并且在使用 AAD 时必须提供消息长度。添加算法测试支持。

   *Steve Henson*

 * POST 重写的初始版本。添加 POST 回调以允许监视 POST 状态和/或诱导故障。修改 fips_test_suite 以使用回调。始终运行所有自检，即使一个失败。

   *Steve Henson*

 * XTS 支持，包括 fips_gcmtest 程序中的算法测试驱动程序。注意：这确实将最大密钥长度从 32 字节增加到 64 字节，但不会有二进制兼容性问题，因为现有应用程序永远不会使用 XTS 模式。

   *Steve Henson*

 * 对 FIPS PRNG 行为进行了广泛的重新组织。移除了对 OpenSSL RAND 代码的所有依赖，并替换为微小的 FIPS RAND API，该 API 还对未经批准的 PRNG 类型执行算法阻塞。也不在 FIPS_mode_set() 中设置 PRNG 类型：将此留给应用程序。添加默认的 OpenSSL DRBG 处理：设置 FIPS PRNG 并使用标准的 OpenSSL PRNG 进行种子设置：将附加数据设置为日期时间向量。

   *Steve Henson*

 * 将旧的 X9.31 PRNG 函数（形式为 `FIPS_rand*`）重命名为 `FIPS_x931*`。这不应引起任何不兼容问题，因为应用程序不应直接使用它们，而任何使用的应用程序都将需要重新考虑，因为 X9.31 PRNG 现在已被 FIPS 140-2 弃用。

   *Steve Henson*

 * SP800-90 DRBG 所需的广泛的自检和健康检查。移除了 FIPS_drbg_instantiate 中的强度参数，并始终以最大支持的强度进行实例化。

   *Steve Henson*

 * 向 fips 模块和 fips_ecdhvs 添加 ECDH 代码，仅用于原语测试。

   *Steve Henson*

 * 新的算法测试程序 fips_dhvs，用于处理 DH 原语的仅测试。

   *Steve Henson*

 * 新函数 DH_compute_key_padded() 用于计算 DH 密钥并用前导零填充（如果需要）：这符合 SP800-56A 等标准。

   *Steve Henson*

 * SP800-90 DRBGs（用于 Hash 和 CTR）的初始实现。目前未被任何东西使用，不完整，可能更改，并且在很大程度上未经测试。

   *Steve Henson*

 * 修改 fipscanisteronly 构建选项，使其仅构建必要的对象文件，方法是过滤 crypto/Makefile 中的 FIPS_EX_OBJ 通过 perl 脚本。

   *Steve Henson*

 * 添加实验性选项 FIPSSYMS 以提供 fipscanister.o 和 FIPS 或 fips 前缀的所有符号。这将避免与 OpenSSL 未来版本发生冲突。添加 perl 脚本 util/fipsas.pl 来预处理汇编语言源文件并重命名任何受影响的符号。

   *Steve Henson*

 * 在 FIPS 模式下添加自检检查和非 FIPS 算法的算法块。从自检中移除 DES2。

   *Steve Henson*

 * 添加 FIPS 模块中的 ECDSA 代码。添加微小的 fips_ecdsa_check 以仅返回内部方法，没有任何 ENGINE 依赖。添加新的微小 fips 签名和验证函数。

   *Steve Henson*

 * 新的构建选项 no-ec2m 以禁用特征 2 代码。

   *Steve Henson*

 * 新的构建选项 "fipscanisteronly"。这仅构建 fipscanister.o 和（目前）相关的 fips 工具。使用 Makefile.fips 文件而不是 Makefile.org 作为原型。

   *Steve Henson*

 * 向 GCM 添加一些 FIPS 模式限制。添加内部 IV 生成器。更新 fips_gcmtest 以使用 IV 生成器。

   *Steve Henson*

 * AES-GCM 的初始、实验性 EVP 支持。可以通过将输出缓冲区设置为 NULL 来输入 AAD。必须调用 `*Final` 函数，尽管它不会检索任何额外数据。标签可以通过 ctrl 设置或检索。IV 长度默认为 12 字节（96 位），但可以设置为替代值。如果 IV 长度超过最大 IV 长度（当前为 16 字节），则不能在密钥之前设置。

   *Steve Henson*

 * 密码中的新标志：EVP_CIPH_FLAG_CUSTOM_CIPHER。这意味着底层 do_cipher 函数本身处理所有密码语义，包括填充和最终化。如果（例如）引擎密码本身处理块填充，则此标志很有用。如果设置了此标志，do_cipher 的行为会略有改变：返回值是写入输出缓冲区的字符数（零不再是错误代码）或负错误代码。此外，如果输入缓冲区为 NULL 且长度为 0，则应执行最终化。

   *Steve Henson*

 * 如果候选发行方证书已是已构建路径的一部分，则忽略它：此情况下的新调试通知 X509_V_ERR_PATH_LOOP。

   *Steve Henson*

 * 改进前向安全性支持：添加函数

           void SSL_CTX_set_not_resumable_session_callback(
                    SSL_CTX *ctx, int (*cb)(SSL *ssl, int is_forward_secure))
           void SSL_set_not_resumable_session_callback(
                    SSL *ssl, int (*cb)(SSL *ssl, int is_forward_secure))

   供 SSL/TLS 服务器使用；每当创建新会话时都会调用回调函数，并决定是否可以缓存会话以使其可恢复（返回 0）或不可恢复（返回 1）。（根据 SSL/TLS 协议规范，服务器发送的 session_id 将为空，表示会话不可恢复；此外，服务器不会生成 RFC 4507（RFC 5077）会话票证。）

   一个简单合理的实现是返回 is_forward_secure。此参数将设置为 1 或 0，具体取决于 SSL/TLS 服务器库选择的密码套件，指示它是否可以提供前向安全性。

   *Emilia Käsper <emilia.kasper@esat.kuleuven.be> (Google)*

 * 命令行工具中的新选项 -verify_name，用于按名称设置验证参数。

   *Steve Henson*

 * 初始 CMAC 实现。警告：实验性，API 可能更改。添加 CMAC pkey 方法。

   *Steve Henson*

 * s_server -www 模式下的实验性重新协商。如果客户端浏览 /reneg，则重新协商连接。如果浏览 /renegcert，则重新协商并请求证书。

   *Steve Henson*

 * 向 s_server 添加用于调试目的的“外部”会话缓存。这有助于跟踪通常仅在已部署的多进程服务器中才显现的问题。

   *Steve Henson*

 * 对 libcrypto 进行广泛的审计，使用 DEBUG_UNUSED。修复了许多忽略返回值的情况。注意。RAND_add()、RAND_seed()、BIO_set_cipher() 和一些晦涩的 PEM 函数已更改，因此它们现在可以返回错误。RAND 的更改需要更改 RAND_METHOD 结构。

   *Steve Henson*

 * 新宏 `__owur` 用于“OpenSSL Warn Unused Result”。它利用 gcc 属性来警告是否忽略了函数的返回值。如果设置了 DEBUG_UNUSED，则启用此功能。添加到 evp.h 中的几个函数，这些函数的返回值经常被忽略。

   *Steve Henson*

 * s_client 的新选项 -noct、-requestct、-requirect 和 -ctlogfile。这些选项允许在建立连接时请求和验证 SCT（签名证书时间戳）。

   *Rob Percival <robpercival@google.com>*

 * SSLv3 默认在构建时禁用。未配置为 "enable-ssl3" 的构建将不支持 SSLv3。

   *Kurt Roeckx*

OpenSSL 1.0.2
-------------

### 1.0.2s 和 1.0.2t 之间的更改 [2019 年 9 月 10 日]

* 对于内置的 EC 曲线，请确保即使在解析显式参数、加载编码密钥或调用 `EC_GROUP_new_from_ecpkparameters()`/`EC_GROUP_new_from_ecparameters()` 时，也使用从曲线名称构建的 EC_GROUP。
   这可以防止绕过安全加固和性能提升，尤其对于具有专用 EC_METHOD 的曲线。
   默认情况下，如果加载的密钥使用显式参数进行编码，并在之后进行编码，则输出仍会使用显式参数进行编码，即使在内部使用“命名”的 EC_GROUP 进行计算。

   *Nicola Tuveri*

* 在 EC_GROUP 构建期间，如果未提供，则计算 ECC 协因子。在此更改之前，`EC_GROUP_set_generator` 会接受 `order` 和/或 `cofactor` 为 NULL。在此更改之后，只有 `cofactor` 参数可以为 NULL。它还会对传入的 `order` 进行一些最小的健全性检查。
   ([CVE-2019-1547])

   *Billy Bob Brumley*

* 修复了 PKCS7_dataDecode 和 CMS_decrypt_set1_pkey 中的填充预言。
   如果第一个 CMS_recipientInfo 有效，但第二个 CMS_recipientInfo 是选择的密文，则攻击很简单。如果第二个 recipientInfo 解码为 PKCS #1 v1.5 形式的明文，则正确的加密密钥将被垃圾数据替换，并且消息无法解码，但如果 RSA 解密失败，则会使用正确的加密密钥，收件人不会注意到攻击。
   作为此潜在攻击的解决方法，在未提供证书且尝试所有 recipientInfo 的情况下，解密密钥的长度必须等于密码的默认密钥长度。
   可以通过设置 `CMS_DEBUG_DECRYPT` 标志来在 CMS 代码中重新启用旧行为。
   ([CVE-2019-1563])

   *Bernd Edlinger*

* 文档化了 Windows 不同版本安装路径的问题

   '/usr/local/ssl' 是安装 OpenSSL 二进制文件和运行时配置文件位置的不安全前缀。
   ([CVE-2019-1552])

   *Richard Levitte*

### 1.0.2r 和 1.0.2s 之间的更改 [2019 年 5 月 28 日]

* 将默认 RSA、DSA 和 DH 大小更改为 2048 位，而不是 1024 位。
   这会更改使用 `genpkey` 命令时的大小（如果未指定大小）。
   它修复了早期更改中遗漏的部分，这些更改已将所有 RSA、DSA 和 DH 生成命令默认更改为使用 2048 位。

   *Kurt Roeckx*

* 为 Android Arm 64 位添加了 FIPS 支持

   在 OpenSSL FIPS 对象模块 2.0.10 版本中添加了对 Android Arm 64 位的支持。出于某种原因，OpenSSL 1.0.2 中缺少相应的目标 'android64-aarch64'，因此无法在 Android Arm 64 位上使用 FIPS 支持进行构建。此遗漏已得到修复。

   *Matthias St. Pierre*

### 1.0.2q 和 1.0.2r 之间的更改 [2019 年 2 月 26 日]

* 0 字节记录填充预言

   如果应用程序遇到致命协议错误，然后调用两次 `SSL_shutdown()`（一次发送 `close_notify`，一次接收 `close_notify`），则 OpenSSL 可能对调用应用程序的响应不同，具体取决于接收到具有无效填充的 0 字节记录，还是接收到具有无效 MAC 的 0 字节记录。如果应用程序随后基于此以远程对等方可检测的方式做出不同响应，则这相当于一个可用于解密数据的填充预言。

   为了使此漏洞可利用，必须使用“非拼接”密码套件。“拼接”密码套件是某些常用密码套件的优化实现。此外，即使发生了协议错误，应用程序也必须调用两次 `SSL_shutdown()`（应用程序不应这样做，但有些应用程序仍然会这样做）。

   此问题由 Juraj Somorovsky、Robert Merget 和 Nimrod Aviram 发现，并由 Steven Collison 和 Andrew Hourselt 进行了进一步调查。于 2018 年 12 月 10 日报告给 OpenSSL。
   ([CVE-2019-1559])

   *Matt Caswell*

* 将严格性检查从 `EVP_PKEY_asn1_new()` 移动到 `EVP_PKEY_asn1_add0()`。

   *Richard Levitte*

### 1.0.2p 和 1.0.2q 之间的更改 [2018 年 11 月 20 日]

* ECC 标量乘法的微架构计时漏洞

   OpenSSL ECC 标量乘法（例如在 ECDSA 和 ECDH 中使用）已被证明容易受到微架构计时侧信道攻击。拥有足够权限在 ECDSA 签名生成期间进行本地计时攻击的攻击者可以恢复私钥。

   此问题于 2018 年 10 月 26 日由 Alejandro Cabrera Aldaya、Billy Brumley、Sohaib ul Hassan、Cesar Pereida Garcia 和 Nicola Tuveri 报告给 OpenSSL。
   ([CVE-2018-5407])

   *Billy Brumley*

* DSA 签名生成的计时漏洞

   OpenSSL DSA 签名算法已被证明容易受到计时侧信道攻击。攻击者可以利用签名算法中的变化来恢复私钥。

   此问题于 2018 年 10 月 16 日由 Samuel Weiser 报告给 OpenSSL。
   ([CVE-2018-0734])

   *Paul Dale*

* 解决了与 FIPS 对象模块的 EC_GROUP 处理兼容性问题，该问题在从开发分支回溯安全修复时意外引入，并阻碍了 ECC 在 FIPS 模式下的使用。

   *Nicola Tuveri*

### 1.0.2o 和 1.0.2p 之间的更改 [2018 年 8 月 14 日]

* 客户端因大型 DH 参数而拒绝服务

   在具有 DH(E) 基于的密码套件的 TLS 握手中进行密钥协商期间，恶意服务器可以向客户端发送非常大的素数。这将导致客户端花费不合理长的时间来为该素数生成密钥，从而导致挂起直到客户端完成。这可能被用于拒绝服务攻击。

   此问题于 2018 年 6 月 5 日由 Guido Vranken 报告给 OpenSSL
   ([CVE-2018-0732])

   *Guido Vranken*

* RSA 密钥生成的缓存计时漏洞

   OpenSSL RSA 密钥生成算法已被证明容易受到缓存计时侧信道攻击。拥有足够权限在 RSA 密钥生成过程中进行缓存计时攻击的攻击者可以恢复私钥。

   此问题于 2018 年 4 月 4 日由 Alejandro Cabrera Aldaya、Billy Brumley、Cesar Pereida Garcia 和 Luis Manuel Alvarez Tapia 报告给 OpenSSL。
   ([CVE-2018-0737])

   *Billy Brumley*

* 使 `EVP_PKEY_asn1_new()` 对其输入更加严格。不再接受 NULL `pem_str` 参数，因为它会导致表损坏。NULL `pem_str` 保留给别名条目。

   *Richard Levitte*

* 恢复 ECDSA 签名中的盲化，而是使有问题的加法长度不变。甚至切换到固定长度的蒙哥马利乘法。

   *Andy Polyakov*

* 更改素数的生成和检查方式，使得不为素数的错误率取决于输入大小的预期用途。
   对于较大的素数，这将导致更多的 Miller-Rabin 轮次。
   大于 1080 位的素数的最大错误率降低到 2^-128。

   *Kurt Roeckx, Annie Yousar*

* 将 DSA 密钥生成的 Miller-Rabin 轮数增加到 64。

   *Kurt Roeckx*

* 添加盲化到 ECDSA 和 DSA 签名，以防止 Keegan Ryan (NCC Group) 发现的侧信道攻击。

   *Matt Caswell*

* 解锁受密码保护的 PEM 文件或 PKCS#8 容器时，现在允许空（零字符）密码。

   *Richard Levitte*

* 证书时间验证 (X509_cmp_time) 强制更严格地遵守 RFC 5280。不再允许小数秒和时区偏移。

   *Emilia Käsper*

### 1.0.2n 和 1.0.2o 之间的更改 [2018 年 3 月 27 日]

* 具有递归定义的构造 ASN.1 类型可能超出堆栈

   具有递归定义的构造 ASN.1 类型（例如 PKCS7 中找到的）在遇到具有过度递归的恶意输入时，最终可能超出堆栈。这可能导致拒绝服务攻击。SSL/TLS 中没有使用来自不受信任来源的此类结构，因此认为它是安全的。

   此问题于 2018 年 1 月 4 日由 OSS-fuzz 项目报告给 OpenSSL。
   ([CVE-2018-0739])

   *Matt Caswell*

### 1.0.2m 和 1.0.2n 之间的更改 [2017 年 12 月 7 日]

* SSL 对象处于错误状态下的读/写

   OpenSSL 1.0.2（从 1.0.2b 版本开始）引入了“错误状态”机制。目的是如果握手期间发生致命错误，OpenSSL 将进入错误状态，并且如果您尝试继续握手，将立即失败。这对于显式握手函数（`SSL_do_handshake()`、`SSL_accept()` 和 `SSL_connect()`）按设计工作，但由于一个错误，如果直接调用 `SSL_read()` 或 `SSL_write()`，则它无法正常工作。在这种情况下，如果握手失败，将在初始函数调用中返回致命错误。如果应用程序随后为同一个 SSL 对象调用 `SSL_read()`/`SSL_write()`，它将成功，并且数据将直接从 SSL/TLS 记录层传递，而无需解密/加密。

   为了利用此问题，应用程序必须存在一个导致在已收到致命错误后调用 `SSL_read()`/`SSL_write()` 的错误。

   此问题由 David Benjamin (Google) 报告给 OpenSSL。
   ([CVE-2017-3737])

   *Matt Caswell*

* x86_64 上的 rsaz_1024_mul_avx2 溢出错误

   在 1024 位模数的指数运算中使用的 AVX2 蒙哥马利乘法过程中存在溢出错误。没有 EC 算法受到影响。分析表明，由于此缺陷导致的 RSA 和 DSA 攻击可能非常难以执行，并且不被认为可能发生。DH1024 的攻击被认为只是可行，因为推断私钥信息所需的大部分工作可以离线完成。此类攻击所需的资源量将是巨大的。然而，为了使对 TLS 的攻击有意义，服务器必须在多个客户端之间共享 DH1024 私钥，而自 CVE-2016-0701 起已不再可能。

   这仅影响支持 AVX2 但不支持 ADX 扩展的处理器，例如 Intel Haswell（第 4 代）。

   此问题由 David Benjamin (Google) 通过 OSS-Fuzz 项目报告给 OpenSSL。
   ([CVE-2017-3738])

   *Andy Polyakov*

### 1.0.2l 和 1.0.2m 之间的更改 [2017 年 11 月 2 日]

* x86_64 上的 bn_sqrx8x_internal 进位错误

   x86_64 蒙哥马利平方过程中存在进位传播错误。没有 EC 算法受到影响。分析表明，由于此缺陷导致的 RSA 和 DSA 攻击可能非常难以执行，并且不被认为可能发生。DH 的攻击被认为只是可行（尽管非常困难），因为推断私钥信息所需的大部分工作可以离线完成。此类攻击所需的资源量将非常巨大，并且可能只有少数攻击者能够获得。攻击者还需要在线访问使用目标私钥的未修补系统，在存在持久 DH 参数和在多个客户端之间共享的私钥的情况下。

   这仅影响支持 BMI1、BMI2 和 ADX 扩展的处理器，例如 Intel Broadwell（第 5 代）及更高版本或 AMD Ryzen。

   此问题由 OSS-Fuzz 项目报告给 OpenSSL。
   ([CVE-2017-3736])

   *Andy Polyakov*

* 格式错误的 X.509 IPAddressFamily 可能导致 OOB 读取

   如果 X.509 证书具有格式错误的 IPAddressFamily 扩展，OpenSSL 可能会进行一次字节的缓冲区越界读取。最可能的结果是在文本格式中错误地显示证书。

   此问题由 OSS-Fuzz 项目报告给 OpenSSL。

   *Rich Salz*

### 1.0.2k 和 1.0.2l 之间的更改 [2017 年 5 月 25 日]

* 使 'config' 能够识别 64 位 mingw 并选择 'mingw64' 作为目标平台，而不是 'mingw'。

   *Richard Levitte*

### 1.0.2j 和 1.0.2k 之间的更改 [2017 年 1 月 26 日]

* 截断的数据包可能因 OOB 读取而崩溃

   如果 SSL/TLS 路径的一端运行在 32 位主机上并使用了特定的密码，则截断的数据包可能导致该主机执行越界读取，通常会导致崩溃。

   此问题由 Google 的 Robert Święcki 报告给 OpenSSL。
   ([CVE-2017-3731])

   *Andy Polyakov*

* BN_mod_exp 在 x86_64 上可能产生不正确的结果

   x86_64 蒙哥马利平方过程中存在进位传播错误。没有 EC 算法受到影响。分析表明，由于此缺陷导致的 RSA 和 DSA 攻击可能非常难以执行，并且不被认为可能发生。DH 的攻击被认为只是可行（尽管非常困难），因为推断私钥信息所需的大部分工作可以离线完成。此类攻击所需的资源量将非常巨大，并且可能只有少数攻击者能够获得。攻击者还需要在线访问使用目标私钥的未修补系统，在存在持久 DH 参数和在多个客户端之间共享的私钥的情况下。例如，这可以通过 OpenSSL DHE 基于的 SSL/TLS 密码套件默认发生。注意：此问题与 CVE-2015-3193 非常相似，但必须视为一个独立的问题。

   此问题由 OSS-Fuzz 项目报告给 OpenSSL。
   ([CVE-2017-3732])

   *Andy Polyakov*

* 蒙哥马利乘法可能产生不正确的结果

   处理长度可被 256 位整除但大于 256 位的输入的 Broadwell 特定蒙哥马利乘法过程中存在进位传播错误。分析表明，针对 RSA、DSA 和 DH 私钥的攻击是不可能的。这是因为所讨论的子程序本身不用于私钥操作，也不用于攻击者直接选择的输入。否则，该错误可能表现为瞬时身份验证和密钥协商失败，或通过特意构造的输入可重现的公钥操作错误结果。在 EC 算法中，只有 Brainpool P-512 曲线受到影响，并且可能可以攻击 ECDH 密钥协商。由于攻击的先决条件被认为不太可能，因此未详细分析影响。即，多个客户端必须选择所讨论的曲线，并且服务器必须在它们之间共享私钥，这两者都不是默认行为。即使如此，也只有选择了该曲线的客户端会受到影响。

   此问题作为瞬时故障公开报告，最初未被识别为安全问题。感谢 Richard Morgan 提供可重现的案例。
   ([CVE-2016-7055])

   *Andy Polyakov*

* OpenSSL 现在在 TLS1.0 或 TLS1.1 中收到无法识别的记录类型时会失败。以前这只发生在 SSLv3 和 TLS1.2 中。这是为了防止在没有进展且对等方不断发送无法识别的记录类型，消耗资源处理它们的问题。

   *Matt Caswell*

### 1.0.2i 和 1.0.2j 之间的更改 [2016 年 9 月 26 日]

* 缺少 CRL 基本检查

   一个包含 CRL 基本检查的错误修复已添加到 OpenSSL 1.1.0 中，但被省略在 OpenSSL 1.0.2i 中。因此，任何尝试在 OpenSSL 1.0.2i 中使用 CRL 的行为都会因空指针异常而崩溃。

   此问题仅影响 OpenSSL 1.0.2i
   ([CVE-2016-7052])

   *Matt Caswell*

### 1.0.2h 和 1.0.2i 之间的更改 [2016 年 9 月 22 日]

* OCSP 状态请求扩展无界内存增长

   恶意客户端可以发送过大的 OCSP 状态请求扩展。如果该客户端不断请求重新协商，每次发送一个大的 OCSP 状态请求扩展，服务器上的内存将无界增长。这最终将通过内存耗尽导致拒绝服务攻击。即使服务器不支持 OCSP，默认配置的服务器也易受攻击。使用“no-ocsp”构建时选项的构建不受影响。

   此问题由绿盟科技奇虎360团队的史磊报告给 OpenSSL
   ([CVE-2016-6304])

   *Matt Caswell*

* 为了缓解 SWEET32 攻击，DES 密码已从 HIGH 移至 MEDIUM。

   此问题由 INRIA 的 Karthikeyan Bhargavan 和 Gaetan Leurent 报告给 OpenSSL
   ([CVE-2016-2183])

   *Rich Salz*

* MDC2_Update() 中的 OOB 写入

   如果在直接调用或通过使用 MDC2 的 `EVP_DigestUpdate()` 函数调用时，MDC2_Update() 中可能发生溢出。如果攻击者在具有部分块的 `EVP_EncryptUpdate()` 的先前调用后能够提供大量输入数据，则长度检查可能会溢出，导致堆损坏。

   所需数据量与 SIZE_MAX 相当，在大多数平台上都不切实际。

   此问题由绿盟科技奇虎360团队的史磊报告给 OpenSSL。
   ([CVE-2016-6303])

   *Stephen Henson*

* 格式错误的 SHA512 票证 DoS

   如果服务器在 TLS 会话票证 HMAC 中使用 SHA512，则它容易受到 DoS 攻击，其中格式错误的票证将导致 OOB 读取，最终导致崩溃。

   SHA512 在 TLS 会话票证中的使用相对较少，因为它需要自定义服务器回调和票证查找机制。

   此问题由绿盟科技奇虎360团队的史磊报告给 OpenSSL。
   ([CVE-2016-6302])

   *Stephen Henson*

* BN_bn2dec() 中的 OOB 写入

   `BN_bn2dec()` 函数未检查 `BN_div_word()` 的返回值。如果应用程序使用此函数处理过大的 BIGNUM，则可能导致 OOB 写入。如果从不受信任的来源打印过大的证书或 CRL，这可能是一个问题。TLS 不受影响，因为记录限制会在解析之前拒绝过大的证书。

   此问题由绿盟科技奇虎360团队的史磊报告给 OpenSSL。
   ([CVE-2016-2182])

   *Stephen Henson*

* TS_OBJ_print_bio() 中的 OOB 读取

   `TS_OBJ_print_bio()` 函数错误地使用了 `OBJ_obj2txt()`：返回值是 OID 文本表示将使用的总长度，而不是写入的数据量。当出现大的 OID 时，这将导致 OOB 读取。

   此问题由绿盟科技奇虎360团队的史磊报告给 OpenSSL。
   ([CVE-2016-2180])

   *Stephen Henson*

* 指针算术未定义行为

   避免一些未定义的指针算术

   代码库中的一个常见模式是按以下方式检查限制：
   "p + len > limit"

   其中 "p" 指向大小为 SIZE 的某个 malloc'd 数据，
   limit == p + SIZE

   这里的 "len" 可以来自某个外部提供的数据（例如，来自 TLS 消息）。

   C 指针算术的规则是，“p + len”仅在 len <= SIZE 时才明确定义。因此，上述模式实际上是未定义行为。

   例如，如果某个 malloc 实现为 "p" 提供了一个地址，使得对于 len 值过大的情况 "p + len" 实际上溢出，因此 p + len < limit，这可能会导致问题。

   此问题由 Guido Vranken 报告给 OpenSSL
   ([CVE-2016-2177])

   *Matt Caswell*

* DSA 签名中未保留的恒定时间标志

   DSA 签名算法中的操作应以恒定时间运行，以避免侧信道攻击。OpenSSL DSA 实现中的一个缺陷意味着某些操作会遵循非恒定时间代码路径。通过缓存计时攻击已证明这足以让攻击者恢复 DSA 私钥。

   此问题由 César Pereida（阿尔托大学）、Billy Brumley（坦佩雷理工大学）和 Yuval Yarom（阿德莱德大学和 NICTA）报告。
   ([CVE-2016-2178])

   *César Pereida*

* DTLS 缓冲消息 DoS

   在 DTLS 连接中，如果握手消息乱序到达，OpenSSL 尚未准备好处理的消息将被缓冲以供以后使用。在某些情况下，逻辑中的一个缺陷意味着即使握手已完成，这些消息也不会从缓冲区中删除。攻击者可以强制最多约 15 条消息保留在缓冲区中，而它们不再需要。这些消息将在 DTLS 连接关闭时清除。消息的默认最大大小为 100k。因此，攻击者每连接可以强制消耗额外的 1500k。通过打开许多并发连接，攻击者可能通过内存耗尽导致 DoS 攻击。

   此问题由 Quan Luo 报告给 OpenSSL。
   ([CVE-2016-2179])

   *Matt Caswell*

* DTLS 重放保护 DoS

   DTLS 重放攻击保护机制中的一个缺陷意味着到达未来 epoch 的记录会在记录的 MAC 验证之前更新重放保护“窗口”。攻击者可以通过发送一个属于下一个 epoch 的记录（不需要解密或具有有效的 MAC），并带有非常大的序列号来利用这一点。这意味着所有后续的合法数据包都将被丢弃，导致特定 DTLS 连接的拒绝服务。

   此问题由 OCAP 审计团队报告给 OpenSSL。
   ([CVE-2016-2181])

   *Matt Caswell*

* 证书消息 OOB 读取

   在 OpenSSL 1.0.2 及更早版本中，一些缺失的消息长度检查可能导致最多超出分配缓冲区 2 个字节的 OOB 读取。存在理论上的 DoS 风险，但在常见平台上尚未在实践中观察到。

   受影响的消息是客户端证书、客户端证书请求和服务器证书。因此，攻击只能针对启用客户端身份验证的客户端或服务器执行。

   此问题由绿盟科技奇虎360团队的史磊报告给 OpenSSL。
   ([CVE-2016-6306])

   *Stephen Henson*

### 1.0.2g 和 1.0.2h 之间的更改 [2016 年 5 月 3 日]

* 防止 AES-NI CBC MAC 检查中的填充预言

   当连接使用 AES CBC 密码且服务器支持 AES-NI 时，MITM 攻击者可以使用填充预言攻击来解密流量。

   此问题是在修复 Lucky 13 填充攻击 ([CVE-2013-0169]) 时引入的。填充检查被重写为恒定时间，通过确保始终读取并与 MAC 或填充字节进行比较相同的字节。但它不再检查是否有足够的数据来同时包含 MAC 和填充字节。

   此问题由 Juraj Somorovsky 使用 TLS-Attacker 报告。

   *Kurt Roeckx*

* 修复 EVP_EncodeUpdate 溢出

   `EVP_EncodeUpdate()` 函数（用于二进制数据的 Base64 编码）中可能发生溢出。如果攻击者能够提供大量输入数据，则长度检查可能会溢出，导致堆损坏。

   在 OpenSSL 内部，`EVP_EncodeUpdate()` 函数主要由 `PEM_write_bio*` 系列函数使用。这些主要在 OpenSSL 命令行应用程序中使用，因此任何处理来自不受信任来源的数据并将其输出为 PEM 文件的应用程序都应被视为易受此问题影响。直接使用大量不受信任数据调用这些 API 的用户应用程序也可能易受攻击。

   此问题由 Guido Vranken 报告。
   ([CVE-2016-2105])

   *Matt Caswell*

* 修复 EVP_EncryptUpdate 溢出

   `EVP_EncryptUpdate()` 函数中可能发生溢出。如果攻击者在具有部分块的 `EVP_EncryptUpdate()` 的先前调用后能够提供大量输入数据，则长度检查可能会溢出，导致堆损坏。在分析了所有 OpenSSL 内部对 `EVP_EncryptUpdate()` 函数的使用后，所有使用都属于以下两种形式之一。第一种形式是 `EVP_EncryptUpdate()` 调用已知是 `EVP_EncryptInit()` 之后的第一个调用函数，因此该特定调用必须是安全的。第二种形式是传递给 `EVP_EncryptUpdate()` 的长度可以从代码中看出是一个很小的值，因此没有溢出的可能性。由于所有实例都属于这两种形式之一，因此认为此问题不会在内部代码中导致溢出。应注意，`EVP_DecryptUpdate()` 在某些代码路径中可以调用 `EVP_EncryptUpdate()`。此外，`EVP_CipherUpdate()` 是 `EVP_EncryptUpdate()` 的同义词。所有这些调用的实例也已进行了分析，并认为在内部使用中没有可能发生溢出的实例。

   此问题由 Guido Vranken 报告。
   ([CVE-2016-2106])

   *Matt Caswell*

* 防止 ASN.1 BIO 过度内存分配

   当使用 `d2i_CMS_bio()` 等函数从 BIO 读取 ASN.1 数据时，一个简短的无效编码可能导致分配大量内存，可能消耗过多资源或耗尽内存。

   任何通过 d2i BIO 函数解析不受信任数据的应用程序都会受到影响。内存函数（如 `d2i_X509()`）不受影响。由于 TLS 库使用内存函数，因此 TLS 应用程序不受影响。

   此问题由 Brian Carpenter 报告。
   ([CVE-2016-2109])

   *Stephen Henson*

* EBCDIC 越界读取

   在 EBCDIC 系统上使用 `X509_NAME_oneline()` 函数的应用程序中，长度超过 1024 字节的 ASN1 字符串可能导致越界读取。这可能导致任意堆栈数据在缓冲区中返回。

   此问题由 Guido Vranken 报告。
   ([CVE-2016-2176])

   *Matt Caswell*

* 修改 ALPN 的行为，使其在 SNI/servername 回调之后调用回调，以便对 `SSL_CTX` 的更新会影响 ALPN。

   *Todd Short*

* 从 DEFAULT 密码列表中删除 LOW。这会从默认设置中删除 DES 单个密码。

   *Kurt Roeckx*

* 仅在使用 no-ssl2-method 选项时删除 SSLv2 方法。当启用方法但禁用 ssl2 时，方法返回 NULL。

   *Kurt Roeckx*

### 1.0.2f 和 1.0.2g 之间的更改 [2016 年 3 月 1 日]

* 在默认 OpenSSL 构建的 SSLv3 及更高版本中禁用弱密码。
  未配置为“enable-weak-ssl-ciphers”的构建将不提供任何“EXPORT”或“LOW”强度的密码。

  *Viktor Dukhovni*

* 禁用 SSLv2 默认构建、默认协商和弱密码。SSLv2 默认在构建时禁用。未配置为“enable-ssl2”的构建将不支持 SSLv2。即使使用了“enable-ssl2”，希望通过版本灵活的 `SSLv23_method()` 协商 SSLv2 的用户也需要显式调用以下任一命令：

      `SSL_CTX_clear_options(ctx, SSL_OP_NO_SSLv2);`
  或
      `SSL_clear_options(ssl, SSL_OP_NO_SSLv2);`

  视情况而定。即使使用了其中任何一个，或者应用程序显式使用了版本特定的 `SSLv2_method()` 或其客户端和服务器变体，也已删除了易受穷举搜索密钥恢复攻击的 SSLv2 密码。具体来说，SSLv2 40 位 EXPORT 密码和 SSLv2 56 位 DES 不再可用。
  ([CVE-2016-0800])

   *Viktor Dukhovni*

* 修复 DSA 代码中的双重释放

   在 OpenSSL 解析格式错误的 DSA 私钥时发现了一个双重释放错误，这可能导致应用程序从不受信任的来源接收 DSA 私钥时出现 DoS 攻击或内存损坏。这种情况被认为很少见。

   此问题由 Adam Langley (Google/BoringSSL) 使用 libFuzzer 报告给 OpenSSL。
   ([CVE-2016-0705])

   *Stephen Henson*

* 禁用 SRP 伪用户种子以解决服务器内存泄漏问题。

   添加了一个新方法 `SRP_VBASE_get1_by_user`，该方法可以正确处理种子。

   `SRP_VBASE_get_by_user` 具有不一致的内存管理行为。为了修复无法避免的内存泄漏，`SRP_VBASE_get_by_user` 被更改为忽略“伪用户”SRP 种子，即使种子已配置。

   用户应改用 `SRP_VBASE_get1_by_user`。请注意，在 `SRP_VBASE_get1_by_user` 中，调用者必须释放返回的值。另请注意，即使配置 SRP 种子试图通过使用伪凭据继续握手来隐藏无效用户名，这种行为也不是恒定时间的，并且不提供强有力的保证，即握手与有效用户的握手无法区分。
   ([CVE-2016-0798])

   *Emilia Käsper*

* 修复 BN_hex2bn/BN_dec2bn NULL 指针解引用/堆损坏

   在 `BN_hex2bn` 函数中，十六进制数字的数量使用整数值 `i` 计算。稍后使用 `i * 4` 调用 `bn_expand`。对于 `i` 的大值，这可能导致 `bn_expand` 不分配任何内存，因为 `i * 4` 为负数。这可能导致内部 BIGNUM 数据字段为 NULL，从而导致后续的 NULL 指针解引用。对于 `i` 的非常大的值，计算 `i * 4` 可能是一个小于 `i` 的正值。在这种情况下，会为内部 BIGNUM 数据字段分配内存，但其大小不足，导致堆损坏。`BN_dec2bn` 中存在类似问题。如果用户应用程序使用非常大的不受信任的十六进制/十进制数据调用 BN_hex2bn/BN_dec2bn，这可能会产生安全后果。预计这种情况很少见。

   所有 OpenSSL 内部使用这些函数都使用不被视为不受信任的数据，例如配置文件数据或应用程序命令行参数。如果用户开发的应用程序基于不受信任的数据生成配置文件数据，那么这也可能导致安全后果。预计这种情况也很少见。

   此问题由 Guido Vranken 报告给 OpenSSL。
   ([CVE-2016-0797])

   *Matt Caswell*

* 修复 `BIO_*printf` 函数中的内存问题

   `BIO_*printf` 函数中处理 "%s" 格式字符串时使用的内部 `fmtstr` 函数在计算字符串长度时可能溢出，并在打印非常长的字符串时导致 OOB 读取。

   此外，在内存分配失败的情况下，内部 `doapr_outch` 函数可能会尝试写入 OOB 内存位置（相对于 NULL 指针的偏移量）。在 1.0.2 及更早版本中，当要分配的缓冲区大小大于 INT_MAX 时，可能会发生这种情况。例如，这可能发生在处理非常长的 "%s" 格式字符串时。还可能发生内存泄漏。

   第一个问题可能会根据编译器行为掩盖第二个问题。这些问题可能导致攻击者在将大量不受信任的数据传递给 `BIO_*printf` 函数时受到攻击。如果应用程序以这种方式使用这些函数，则它们可能易受攻击。OpenSSL 本身在使用打印 ASN.1 数据的人类可读转储时使用这些函数。因此，打印此数据的应用程序如果数据来自不受信任的来源，则可能易受攻击。OpenSSL 命令行应用程序在打印 ASN.1 数据时，或者如果不受信任的数据作为命令行参数传递时，也可能易受攻击。

   Libssl 不被认为直接易受攻击。此外，通过 libssl 通过远程连接接收的证书等不太可能触发这些问题，因为 libssl 内部强制执行了消息大小限制。

   此问题由 Guido Vranken 报告给 OpenSSL。
   ([CVE-2016-0799])

   *Matt Caswell*

* 模块化指数运算的侧信道攻击

   发现了一种利用 Intel Sandy-Bridge 微架构上的缓存银行冲突的侧信道攻击，该攻击可能导致 RSA 密钥的恢复。利用此问题的能力受到限制，因为它依赖于能够控制在与执行解密操作的受害者线程相同的超线程核心上运行的线程中的代码的攻击者。

   此问题由 Yuval Yarom（阿德莱德大学和 NICTA）、Daniel Genkin（以色列理工学院和特拉维夫大学）以及 Nadia Heninger（宾夕法尼亚大学）报告给 OpenSSL，更多信息请参见 <http://cachebleed.info>。
   ([CVE-2016-0702])

   *Andy Polyakov*

* 更改 `req` 命令以默认生成 2048 位 RSA/DSA 密钥，如果未在 `default_bits` 中指定密钥大小。这修复了早期更改中遗漏的部分，该更改已将所有 RSA/DSA 密钥生成命令默认更改为使用 2048 位。

   *Emilia Käsper*

### 1.0.2e 和 1.0.2f 之间的更改 [2016 年 1 月 28 日]

* DH 小子群

   历史上，OpenSSL 只生成基于“安全”素数的 DH 参数。最近（在 1.0.2 版本中），提供了生成 X9.42 风格参数文件的支持（例如，支持 RFC 5114 所需的文件）。此类文件中的素数可能不是“安全”的。当应用程序使用基于非“安全”素数的参数配置的 DH 时，攻击者可以利用这一点来查找对等方的私有 DH 指数。此攻击要求攻击者完成多个握手，在这些握手中对等方使用相同的私有 DH 指数。例如，如果 TLS 服务器重用相同的私有 DH 指数或使用静态 DH 密码套件，则可以利用此攻击来发现其私有 DH 指数。

   OpenSSL 为 TLS 中的临时 DH (DHE) 提供了 `SSL_OP_SINGLE_DH_USE` 选项。它默认不开启。如果未设置该选项，则服务器在服务器进程的生命周期内重用相同的私有 DH 指数，并将易受此攻击的影响。据信，许多流行的应用程序确实设置了此选项，因此不会面临风险。

   此问题的修复程序添加了一个额外的检查，其中提供了 "q" 参数（如 X9.42 基于的参数中所示）。这可以检测唯一已知的攻击，并且是静态 DH 密码套件的唯一可能防御措施。这可能会对性能产生一些影响。

   此外，`SSL_OP_SINGLE_DH_USE` 选项已默认开启，并且无法禁用。这可能会对性能产生一些影响。

   此问题由 Antonio Sanso (Adobe) 报告给 OpenSSL。
   ([CVE-2016-0701])

   *Matt Caswell*

* SSLv2 不阻止禁用密码

   恶意客户端可以协商服务器上已禁用的 SSLv2 密码，并完成 SSLv2 握手，即使所有 SSLv2 密码都已被禁用，前提是 SSLv2 协议未通过 `SSL_OP_NO_SSLv2` 禁用。

   此问题于 2015 年 12 月 26 日由 Nimrod Aviram 和 Sebastian Schinzel 报告给 OpenSSL。
   ([CVE-2015-3197])

   *Viktor Dukhovni*

### 1.0.2d 和 1.0.2e 之间的更改 [2015 年 12 月 3 日]

* BN_mod_exp 在 x86_64 上可能产生不正确的结果

   x86_64 蒙哥马利平方过程中存在进位传播错误。没有 EC 算法受到影响。分析表明，由于此缺陷导致的 RSA 和 DSA 攻击可能非常难以执行，并且不被认为可能发生。DH 的攻击被认为只是可行（尽管非常困难），因为推断私钥信息所需的大部分工作可以离线完成。此类攻击所需的资源量将非常巨大，并且可能只有少数攻击者能够获得。攻击者还需要在线访问使用目标私钥的未修补系统，在存在持久 DH 参数和在多个客户端之间共享的私钥的情况下。例如，这可以通过 OpenSSL DHE 基于的 SSL/TLS 密码套件默认发生。

   此问题由 Hanno Böck 报告给 OpenSSL。
   ([CVE-2015-3193])

   *Andy Polyakov*

* 缺少 PSS 参数的证书验证崩溃

   如果遇到使用 RSA PSS 算法且缺少掩码生成函数参数的 ASN.1 签名，签名验证例程将因 NULL 指针解引用而崩溃。由于这些例程用于验证证书签名算法，因此可用于崩溃任何证书验证操作，并被利用于 DoS 攻击。任何执行证书验证的应用程序都易受攻击，包括启用客户端身份验证的 OpenSSL 客户端和服务器。

   此问题由 Loïc Jonas Etienne (Qnective AG) 报告给 OpenSSL。
   ([CVE-2015-3194])

   *Stephen Henson*

* X509_ATTRIBUTE 内存泄漏

   当遇到格式错误的 X509_ATTRIBUTE 结构时，OpenSSL 会泄漏内存。此结构由 PKCS#7 和 CMS 例程使用，因此任何从不受信任的来源读取 PKCS#7 或 CMS 数据的应用程序都会受到影响。SSL/TLS 不受影响。

   此问题由 Adam Langley (Google/BoringSSL) 使用 libFuzzer 报告给 OpenSSL。
   ([CVE-2015-3195])

   *Stephen Henson*

* 重写 EVP_DecodeUpdate（base64 解码）以修复多个错误。
   这会改变某些无效消息的解码行为，尽管更改主要偏向更宽松的方向，并且尽可能保留了旧行为。

   *Emilia Käsper*

* 在 `DSA_generate_parameters_ex` 中，如果提供的种子太短，则返回错误

   *Rich Salz 和 Ismo Puustinen <ismo.puustinen@intel.com>*

### 1.0.2c 和 1.0.2d 之间的更改 [2015 年 7 月 9 日]

* 备用链证书伪造

   在证书验证期间，OpenSSL 会尝试查找备用证书链，如果首次构建链的尝试失败。此逻辑实现中的一个错误可能意味着攻击者可以绕过对某些不受信任证书的检查，例如 CA 标志，从而允许他们使用有效的叶证书充当 CA 并“颁发”无效证书。

   此问题由 Adam Langley/David Benjamin (Google/BoringSSL) 报告给 OpenSSL。

   *Matt Caswell*

### 1.0.2b 和 1.0.2c 之间的更改 [2015 年 6 月 12 日]

* 修复 HMAC ABI 不兼容性。前一个版本在 HMAC 处理中引入了 ABI 不兼容性。现已恢复之前的 ABI。

   *Matt Caswell*

### 1.0.2a 和 1.0.2b 之间的更改 [2015 年 6 月 11 日]

* 格式错误的 ECParameters 导致无限循环

   在处理 ECParameters 结构时，如果指定的曲线位于特制的格式错误的二项式域上，OpenSSL 会进入无限循环。

   这可用于对任何处理公钥、证书请求或证书的系统执行拒绝服务。这包括启用客户端身份验证的 TLS 客户端和 TLS 服务器。

   此问题由 Joseph Barr-Pixton 报告给 OpenSSL。
   ([CVE-2015-1788])

   *Andy Polyakov*

* X509_cmp_time 中可利用的越界读取

   X509_cmp_time 未能正确检查 ASN1_TIME 字符串的长度，并可能读取超出边界的几个字节。此外，X509_cmp_time 接受时间字符串中任意数量的小数秒。

   攻击者可以利用此漏洞制作各种大小的格式错误的证书和 CRL，并可能导致分段错误，从而导致验证证书或 CRL 的应用程序出现 DoS。验证 CRL 的 TLS 客户端会受到影响。启用客户端身份验证的 TLS 客户端和服务器可能会受到影响，如果它们使用自定义验证回调。

   此问题由 Robert Swiecki (Google) 和独立地由 Hanno Böck 报告给 OpenSSL。
   ([CVE-2015-1789])

   *Emilia Käsper*

* PKCS7 缺少 EnvelopedContent 导致崩溃

   PKCS#7 解析代码未能正确处理缺失的内部 EncryptedContent。攻击者可以制作格式错误的 ASN.1 编码 PKCS#7 blob，其中缺少内容，并在解析时触发 NULL 指针解引用。

   解密 PKCS#7 数据或以其他方式从不受信任的来源解析 PKCS#7 结构的应用程序会受到影响。OpenSSL 客户端和服务器不受影响。

   此问题由 Michal Zalewski (Google) 报告给 OpenSSL。
   ([CVE-2015-1790])

   *Emilia Käsper*

* CMS 未知哈希函数导致验证无限循环

   在验证 signedData 消息时，如果 CMS 代码遇到未知的哈希函数 OID，可能会进入无限循环。这可用于对使用 CMS 代码验证 signedData 消息的任何系统执行拒绝服务。
   此问题由 Johannes Bauer 报告给 OpenSSL。
   ([CVE-2015-1792])

   *Stephen Henson*

* 处理 NewSessionTicket 时的竞争条件

   如果多线程客户端在尝试重用先前票证时收到 NewSessionTicket，则可能发生竞争条件，可能导致票证数据被双重释放。
   ([CVE-2015-1791])

   *Matt Caswell*

* 仅支持 'ecdh_auto' 设置（服务器）或默认（客户端）的 256 位或更强的椭圆曲线。在支持的曲线中，优先选择 P-256（两者）。

   *Emilia Kasper*

### 1.0.2 和 1.0.2a 之间的更改 [2015 年 3 月 19 日]

* ClientHello sigalgs DoS 修复

   如果客户端连接到 OpenSSL 1.0.2 服务器并使用无效的签名算法扩展进行重新协商，则会发生 NULL 指针解引用。这可以被利用于针对服务器的 DoS 攻击。

   此问题由斯坦福大学的 David Ramos 报告给 OpenSSL。
   ([CVE-2015-0291])

   *Stephen Henson 和 Matt Caswell*

* 多块损坏指针修复

   OpenSSL 1.0.2 引入了“多块”性能改进。此功能仅在支持 AES NI 指令的 64 位 x86 架构平台上适用。多块实现的缺陷可能导致在使用非阻塞 IO 时，OpenSSL 的内部写入缓冲区被错误地设置为 NULL。通常，当用户应用程序使用套接字 BIO 进行写入时，这只会导致连接失败。但是，如果使用其他 BIO，则很可能会触发分段错误，从而可能导致 DoS 攻击。

   此问题由 Daniel Danner 和 Rainer Mueller 报告给 OpenSSL。
   ([CVE-2015-0290])

   *Matt Caswell*

* DTLSv1_listen 中的分段错误修复

   DTLSv1_listen 函数旨在无状态，并处理来自许多对等方的初始 ClientHello。用户代码通常会循环调用 DTLSv1_listen 直到收到带有关联 cookie 的有效 ClientHello。DTLSv1_listen 实现中的一个缺陷意味着状态会在 SSL 对象中从一次调用保留到下一次调用，这可能导致分段错误。处理初始 ClientHello 的错误可能会触发这种情况。一个此类错误的示例是，仅 DTLS1.0 的客户端尝试连接到仅 DTLS1.2 的服务器。

   此问题由 Per Allansson 报告给 OpenSSL。
   ([CVE-2015-0207])

   *Matt Caswell*

* ASN1_TYPE_CMP 中的分段错误修复

   如果尝试比较 ASN.1 布尔类型，ASN1_TYPE_CMP 函数将因无效读取而崩溃。由于 ASN1_TYPE_CMP 用于检查证书签名算法的一致性，因此可用于崩溃任何证书验证操作，并被利用于 DoS 攻击。任何执行证书验证的应用程序都易受攻击，包括启用客户端身份验证的 OpenSSL 客户端和服务器。
   ([CVE-2015-0286])

   *Stephen Henson*

* 无效 PSS 参数的分段错误修复

   如果遇到使用 RSA PSS 算法且参数无效的 ASN.1 签名，签名验证例程将因 NULL 指针解引用而崩溃。由于这些例程用于验证证书签名算法，因此可用于崩溃任何证书验证操作，并被利用于 DoS 攻击。任何执行证书验证的应用程序都易受攻击，包括启用客户端身份验证的 OpenSSL 客户端和服务器。

   此问题由 Brian Carpenter 报告给 OpenSSL。
   ([CVE-2015-0208])

   *Stephen Henson*

* ASN.1 结构重用内存损坏修复

   在 ASN.1 解析中重用结构可能会允许攻击者通过无效写入导致内存损坏。这种重用已被强烈反对，并且被认为很少见。

   解析包含 CHOICE 或 ANY DEFINED BY 组件的结构的应用程序可能会受到影响。但是，证书解析（d2i_X509 及相关函数）不受影响。OpenSSL 客户端和服务器不受影响。
   ([CVE-2015-0287])

   *Stephen Henson*

* PKCS7 NULL 指针解引用修复

   PKCS#7 解析代码未能正确处理缺失的外部 ContentInfo。攻击者可以制作格式错误的 ASN.1 编码 PKCS#7 blob，其中缺少内容，并在解析时触发 NULL 指针解引用。

   验证 PKCS#7 签名、解密 PKCS#7 数据或以其他方式从不受信任的来源解析 PKCS#7 结构的应用程序会受到影响。OpenSSL 客户端和服务器不受影响。

   此问题由 Michal Zalewski (Google) 报告给 OpenSSL。
   ([CVE-2015-0289])

   *Emilia Käsper*

* SSLv2 服务器中可达断言的 DoS 修复

   恶意客户端可以通过发送特制的 SSLv2 CLIENT-MASTER-KEY 消息来触发支持 SSLv2 并启用导出密码套件的服务器上的 OPENSSL_assert（即中止）。

   此问题由 Sean Burford (Google) 和 Emilia Käsper（OpenSSL 开发团队）发现。
   ([CVE-2015-0293])

   *Emilia Käsper*

* 客户端身份验证和 DHE 的空 CKE 修复

   如果使用客户端身份验证，则在选择 DHE 密码套件且客户端发送零长度的 ClientKeyExchange 消息时，服务器可能会发生分段错误。这可能被利用于 DoS 攻击。
   ([CVE-2015-1787])

   *Matt Caswell*

* 未播种 PRNG 的握手修复

   在某些条件下，OpenSSL 1.0.2 客户端可以与未播种的 PRNG 完成握手。条件是：
   - 客户端位于 PRNG 未自动播种且用户未手动播种的平台上
   - 使用了特定于协议的客户端方法版本（即不是 `SSL_client_methodv23`）
   - 使用的密码套件不需要 PRNG 的额外随机数据（除了初始 ClientHello 客户端随机数）（例如，PSK-RC4-SHA）。

   如果握手成功，则使用的客户端随机数将从熵不足的 PRNG 生成，因此输出可能是可预测的。

   例如，在未播种的 openssl 上使用以下命令在未修补的平台上成功：

   openssl s_client -psk 1a2b3c4d -tls1_2 -cipher PSK-RC4-SHA
   ([CVE-2015-0285])

   *Matt Caswell*

* d2i_ECPrivatekey 错误后的 Use After Free 修复

   通过 d2i_ECPrivateKey 函数使用的格式错误的 EC 私钥文件可能导致 Use After Free 条件。这反过来可能导致几个私钥解析函数（如 d2i_PrivateKey 或 EVP_PKCS82PKEY）中的双重释放，并可能导致应用程序从不受信任的来源接收 EC 私钥时出现 DoS 攻击或内存损坏。这种情况被认为很少见。

   此问题由 BoringSSL 项目发现，并在其提交 517073cd4b 中修复。
   ([CVE-2015-0209])

   *Matt Caswell*

* X509_to_X509_REQ NULL 指针解引用修复

   如果证书密钥无效，X509_to_X509_REQ 函数将因 NULL 指针解引用而崩溃。此函数在实践中很少使用。

   此问题由 Brian Carpenter 发现。
   ([CVE-2015-0288])

   *Stephen Henson*

* 从 DEFAULT 密码中删除了导出密码

   *Kurt Roeckx*

### 1.0.1l 和 1.0.2 之间的更改 [2015 年 1 月 22 日]

 * 促进针对一系列 ARM ISA（例如 ARMv5 到 ARMv8）的“通用”ARM 构建，而不是将其“锁定”到单个 ISA。
   到目前为止，那些必须针对多个平台的人会做出妥协，并争辩说针对 ARMv5 的二进制文件仍然可以在 ARMv8 上执行。“通用”构建通过在较新平台上提供近乎最佳的性能来解决这种妥协。

   *Andy Polyakov*

 * 加速 x86_64 的 NIST P-256 椭圆曲线实现（其他平台待定）。

   *Shay Gueron & Vlad Krasnov (Intel Corp), Andy Polyakov*

 * 添加对 RFC6962 中 SignedCertificateTimestampList 证书和 OCSP 响应扩展的支持。

   *Rob Stradling*

 * 修复 ec_GFp_simple_points_make_affine（因此，EC_POINTs_mul 等）的边界情况。
   （某些无穷远处的输入点可能导致错误结果，非无穷远处的输入点也被映射到无穷远处。）

   *Bodo Moeller*

 * 对 PowerISA 2.0.7 的初步支持，首次在 POWER8 中实现。
   这涵盖了 AES、SHA256/512 和 GHASH。“初步”意味着大多数常见情况都已优化，并且仍有进一步改进的空间。还添加了用于 Altivec 的向量置换 AES。

   *Andy Polyakov*

 * 添加对 little-endian ppc64 Linux 目标的支持。

   *Marcelo Cerri (IBM)*

 * 对 AMRv8 ISA 加密扩展的初步支持。这涵盖了 AES、SHA1、SHA256 和 GHASH。“初步”意味着大多数常见情况都已优化，并且仍有进一步改进的空间。
   支持 32 位和 64 位模式。

   *Andy Polyakov, Ard Biesheuvel (Linaro)*

 * 改进了 ARMv7 NEON 支持。

   *Andy Polyakov*

 * 对 SPARC Architecture 2011 加密扩展的支持，首次在 SPARC T4 中实现。
   这涵盖了 AES、DES、Camellia、SHA1、SHA256/512、MD5、GHASH 和模幂运算。

   *Andy Polyakov, David Miller*

 * 加速 Intel 处理器的模幂运算，又名 RSAZ。

   *Shay Gueron & Vlad Krasnov (Intel Corp)*

 * 支持新的和即将推出的 Intel 处理器，包括 AVX2、BMI 和 SHA ISA 扩展。
   这包括额外的“拼接”实现、AESNI-SHA256 和 GCM，以及 TLS 加密的多缓冲区支持。

   这项工作由 Intel Corp. 赞助。

   *Andy Polyakov*

 * 支持 DTLS 1.2。这添加了两组 DTLS 方法：DTLS_*_method()
   支持 DTLS 1.2 和 1.0，应使用对端支持的任何版本，而 DTLSv1_2_*_method()
   仅支持 DTLS 1.2。

   *Steve Henson*

 * 在 SSL_CTX_use_certificate_chain_file() 中使用特定于算法的链：
   这修复了 OpenSSL 早期版本中的一个限制。

   *Steve Henson*

 * 通过 EVP_PKEY API 扩展了 RSA OAEP 支持。提供指定摘要、
   MGF1 摘要和 OAEP 标签的选项。

   *Steve Henson*

 * 为密钥封装算法添加了 EVP 支持，以避免与现有代码的问题，必须在
   EVP_CIPHER_CTX 中设置标志 EVP_CIPHER_CTX_WRAP_ALLOW，否则将返回错误。
   添加了 AES 和 DES3 封装算法，并包含测试用例。

   *Steve Henson*

 * 添加了用于分配和设置 ECDSA_METHOD 结构字段的函数。

   *Douglas E. Engert, Steve Henson*

 * 新函数 OPENSSL_gmtime_diff 和 ASN1_TIME_diff，用于查找两个 tm 或 ASN1_TIME 结构之间的天数和秒数差异。

   *Steve Henson*

 * 向 s_server 添加了 -rev 测试选项，用于仅反转客户端接收到的字符顺序并将其发送回服务器。
   还打印连接参数的缩写摘要。

   *Steve Henson*

 * s_client 和 s_server 的新选项 -brief，用于打印连接参数的简要摘要。

   *Steve Henson*

 * 为任意 TLS 扩展添加了回调。

   *Trevor Perrin <trevp@trevp.net> 和 Ben Laurie*

 * 几个 openssl 工具中的新选项 -crl_download，用于从证书中的 CRLDP 扩展下载 CRL。

   *Steve Henson*

 * s_client 和 s_server 的新选项 -CRL 和 -CRLform，用于 CRL。

   *Steve Henson*

 * 新函数 X509_CRL_diff，用于从两个完整 CRL 的差异生成增量 CRL。
   为“crl”实用程序添加了支持。

   *Steve Henson*

 * 新函数用于设置 lookup_crls 函数和检索
   X509_STORE_CTX 中的 X509_STORE。

   *Steve Henson*

 * 打印证书中已弃用的颁发者和主体唯一 ID 字段。

   *Steve Henson*

 * 扩展了 OCSP I/O 函数，使其可用于简单的通用用途
   HTTP 以及 OCSP。新的包装函数可用于下载
   使用 OCSP API 的 CRL。

   *Steve Henson*

 * 将 s_client/s_server 中的命令行处理委托给 SSL_CONF API。

   *Steve Henson*

 * `SSL_CONF*` 函数。这些函数提供了一个通用的应用程序配置框架，
   使用配置文件或命令行。

   *Steve Henson*

 * SSL/TLS 跟踪代码。这使用消息回调解析 SSL/TLS 记录并打印结果。
   需要编译时选项“enable-ssl-trace”。s_client 和 s_server 的新选项用于启用跟踪。

   *Steve Henson*

 * 新的 ctrl 和宏用于检索支持的证书扩展。
   在 s_server 和 s_client 中打印扩展。

   *Steve Henson*

 * 新函数用于检索证书签名和签名
   OID NID。

   *Steve Henson*

 * 添加了用于检索和操作客户端发送给 OpenSSL 的原始密码列表的函数。

   *Steve Henson*

 * 为 TLS 代码添加了新的 Suite B 模式。这些模式使用并强制执行 RFC6460 的要求：
   限制密码套件，仅允许 Suite B 算法，并且仅使用 Suite B 曲线。
   可以通过使用字符串“SUITEB128”、“SUITEB192”或“SUITEB128ONLY”来设置 Suite B 模式
   用于密码字符串。

   *Steve Henson*

 * 为 Suite B 安全级别添加了新的链验证标志。当在 X509_verify_cert 中设置标志时，检查算法是否可接受。

   *Steve Henson*

 * 使 tls1_check_chain 返回一组标志，指示证书链通过的检查。
   添加了额外的测试来处理客户端证书：检查匹配的证书类型和颁发者名称比较。

   *Steve Henson*

 * 如果尝试使用对端首选列表中不存在的签名算法，则中止握手。
   如果客户端在响应证书请求时没有合适的签名算法，则不使用该证书。

   *Steve Henson*

 * 如果服务器 EC 临时密钥不在客户端首选列表中，则中止握手。

   *Steve Henson*

 * 添加了对 CERT 结构中证书存储的支持。这使得每个 SSL 结构都可以拥有不同的存储，或者在父 SSL_CTX 中拥有一个存储。
   包括用于证书链验证和链构建的独立存储。新的 ctrl SSL_CTRL_BUILD_CERT_CHAIN
   用于在 CERT 结构中构建和存储证书链：如果无法构建链，则返回错误：这将允许应用程序
   测试链是否配置正确。

   注意：如果未设置基于 CERT 的存储，则使用父 SSL_CTX
   存储以保持与现有行为的兼容性。

   *Steve Henson*

 * 新函数 ssl_set_client_disabled，用于根据当前会话设置密码套件禁用掩码，
   在发送客户端问候语和检查请求的密码套件时检查掩码。

   *Steve Henson*

 * 新的 ctrls 用于在证书请求消息中检索和设置证书类型。
   在 s_client 中打印收到的值。如果证书类型未设置为自定义值，则根据
   支持的签名算法设置合理的值。

   *Steve Henson*

 * 支持客户端和服务器支持的独立签名算法。

   *Steve Henson*

 * 添加了证书回调。如果设置了此回调，则在客户端或服务器需要证书时调用。
   应用程序可以根据任意标准决定呈现哪个证书链：例如，支持的签名算法。
   在 s_server 中添加了一个非常简单的示例。
   这修复了现有客户端证书回调的许多问题和限制：例如，您现在可以清除现有证书并指定整个链。

   *Steve Henson*

 * 向 CERT_PKEY 结构添加了新的“valid_flags”字段，该字段确定证书可用于（如果适用）什么。
   在新的 tls1_check_chain 函数中设置 valid_flags 字段。简化了 ssl_set_cert_masks，
   该函数以前也有类似的检查。

   向 CERT 结构添加了新的“cert_flags”字段，并包含“严格模式”。
   这强制执行了一些 TLS 证书要求（例如，仅允许包含在支持算法扩展中的证书签名算法），
   而某些实现会忽略这些要求：此选项应谨慎使用，因为它可能导致互操作性问题。

   *Steve Henson*

 * 更新和整理签名算法扩展处理。根据首选项和对端算法计算共享签名算法，
   并在 s_client 和 s_server 中打印它们。如果没有共享签名算法则中止握手。

   *Steve Henson*

 * 添加了新的函数，允许为 SSL 和 SSL_CTX 结构自定义支持的签名算法。
   向 s_client 和 s_server 添加了支持它们的选项。

   *Steve Henson*

 * 新函数 SSL_certs_clear()，用于从 SSL 结构中删除所有证书引用。
   在此之前，一旦添加了证书，就无法将其删除。

   *Steve Henson*

 * 集成了主机名、电子邮件地址和 IP 地址检查与证书验证。
   新的验证选项支持在 openssl 实用程序中进行检查。

   *Steve Henson*

 * 修复了主机名和电子邮件检查函数中的错误以及通配符匹配支持。
   添加了手册页。

   *Florian Weimer (Red Hat Product Security Team)*

 * 新函数用于将主机名、电子邮件或 IP 地址与证书进行匹配。
   向 x509 实用程序添加了选项以打印与证书进行匹配的检查结果。

   *Steve Henson*

 * 修复了 OCSP 检查。

   *Rob Stradling <rob.stradling@comodo.com> 和 Ben Laurie*

 * 对显式信任的非根 CA 的初步实验性支持。
   OpenSSL 仍然尝试构建到根的完整链，但如果中间 CA 包含信任设置，则会使用该设置。
   使用第一个设置：是信任（例如，x509 实用程序的 -addtrust 选项）还是拒绝。

   *Steve Henson*

 * 添加了 -trusted_first 选项，该选项尝试在信任的存储中查找证书，即使提供了不受信任的链。

   *Steve Henson*

 * MIPS 程序集包更新：支持 MIPS32r2 和 SmartMIPS ASE，
   支持 Linux 和 Android 平台。

   *Andy Polyakov*

 * 支持 x86_64 框架中的 linux-x32、ILP32 环境。

   *Andy Polyakov*

 * 对 FIPS 兼容 OpenSSL 的多实现初步实验性支持。
   在 FIPS 模式下，批准的实现正常使用；在非 FIPS 模式下，则使用内部未经批准的版本。
   这意味着 FIPS 兼容的 OpenSSL 在非 FIPS 模式下不会被迫使用（通常性能较低的）FIPS 实现。

   *Steve Henson*

 * 在调用 PEM_read_bio_DHparameters 时透明支持 X9.42 DH 参数。
   这意味着现有应用程序可以自动处理新的参数格式。

   *Steve Henson*

 * 对 X9.42 DH 参数格式的初步实验性支持：主要用于支持 RFC5114 参数的“q”参数的使用。

   *Steve Henson*

 * 将 RFC5114 中的 DH 参数以及测试数据添加到 dhtest。

   *Steve Henson*

 * 支持自动 EC 临时密钥参数选择。如果启用，将自动使用最首选的 EC 参数，而不是硬编码的固定参数。
   现在服务器只需调用：
   SSL_CTX_set_ecdh_auto(ctx, 1)，服务器将自动支持 ECDH 并使用最合适的参数。

   *Steve Henson*

 * 增强和整理 EC 曲线和点格式 TLS 扩展代码。如果使用默认值，则使用静态结构而不是分配。
   新的 ctrls 用于设置我们希望支持的曲线以及检索共享曲线。
   在 s_server 中打印共享曲线。s_server 和 s_client 的新选项用于设置支持的曲线列表。

   *Steve Henson*

 * 新的 ctrls 用于以 NID 数组的形式检索支持的签名算法和支持的曲线值。
   扩展 openssl 实用程序以打印收到的值。

   *Steve Henson*

 * 添加了新的 API EC_curve_nist2nid 和 EC_curve_nid2nist，它们在 NID 和更常见的 NIST 名称（如“P-256”）之间进行转换。
   增强了 ecparam 实用程序和 ECC 方法以识别曲线的 NIST 名称。

   *Steve Henson*

 * 增强了 SSL/TLS 证书链处理，以支持每个证书的不同链，而不是父 SSL_CTX 中的一个链。

   *Steve Henson*

 * 支持固定 DH 密码套件客户端身份验证：服务器和客户端都使用具有通用参数的 DH 证书。

   *Steve Henson*

 * 支持固定 DH 密码套件：那些需要 DH 服务器证书的。

   *Steve Henson*

 * 新函数 i2d_re_X509_tbs 用于重新编码证书的 TBS 部分。
   注意：相关的 1.0.2-beta 特定宏 X509_get_cert_info、
   X509_CINF_set_modified、X509_CINF_get_issuer、X509_CINF_get_extensions 和
   X509_CINF_get_signature 在内部团队审查后被恢复。

OpenSSL 1.0.1
-------------

### 1.0.1u 和 1.0.1t 之间的变更 [2016 年 9 月 22 日]

* OCSP 状态请求扩展无界内存增长

  恶意客户端可以发送一个过大的 OCSP 状态请求扩展。如果该客户端持续请求重新协商，每次都发送一个大的 OCSP 状态请求扩展，那么服务器上的内存将无界增长。这将最终导致通过内存耗尽进行的拒绝服务攻击。即使服务器不启用 OCSP，默认配置的服务器也易受攻击。使用“no-ocsp”构建选项构建的版本不受影响。

  此问题由 Shi Lei（奇虎 360 公司 Gear Team）报告给 OpenSSL ([CVE-2016-6304])

  *Matt Caswell*

* 为了缓解 SWEET32 攻击，DES 密码套件已从 HIGH 移至 MEDIUM。

  此问题由 Karthikeyan Bhargavan 和 Gaetan Leurent（INRIA）报告给 OpenSSL
  ([CVE-2016-2183])

  *Rich Salz*

* MDC2_Update() 中的越界写入

  如果直接调用 MDC2_Update() 或通过使用 MDC2 的 EVP_DigestUpdate() 函数调用，可能会发生溢出。如果攻击者在之前调用 EVP_EncryptUpdate() 并处理了部分块后，能够提供非常大的输入数据，那么长度检查可能会溢出，导致堆损坏。

  所需数据量与 SIZE_MAX 相当，在大多数平台上都不切实际。

  此问题由 Shi Lei（奇虎 360 公司 Gear Team）报告给 OpenSSL ([CVE-2016-6303])

  *Stephen Henson*

* 格式错误的 SHA512 票证拒绝服务

  如果服务器使用 SHA512 进行 TLS 会话票证 HMAC，则容易受到拒绝服务攻击，其中格式错误的票证会导致越界读取，最终导致崩溃。

  TLS 会话票证中使用 SHA512 相对较少，因为它需要自定义服务器回调和票证查找机制。

  此问题由 Shi Lei（奇虎 360 公司 Gear Team）报告给 OpenSSL ([CVE-2016-6302])

  *Stephen Henson*

* BN_bn2dec() 中的越界写入

  BN_bn2dec() 函数未检查 BN_div_word() 的返回值。如果应用程序使用此函数处理过大的 BIGNUM，则可能导致越界写入。如果从不受信任的来源打印过大的证书或 CRL，这可能会成为一个问题。TLS 不受影响，因为记录限制会在解析过大的证书之前拒绝它。

  此问题由 Shi Lei（奇虎 360 公司 Gear Team）报告给 OpenSSL ([CVE-2016-2182])

  *Stephen Henson*

* TS_OBJ_print_bio() 中的越界读取

  TS_OBJ_print_bio() 函数错误地使用了 OBJ_obj2txt()：返回值是 OID 文本表示将使用的总长度，而不是写入的数据量。当出现大的 OID 时，这将导致越界读取。

  此问题由 Shi Lei（奇虎 360 公司 Gear Team）报告给 OpenSSL ([CVE-2016-2180])

  *Stephen Henson*

* 指针算术未定义行为

  避免某些未定义的指针算术

  代码库中的一个常见习惯是按以下方式检查限制：“p + len > limit”

  其中“p”指向大小为 SIZE 的某个 malloc 分配的数据，
  limit == p + SIZE

  这里的“len”可能来自某些外部提供的数据（例如来自 TLS 消息）。

  C 指针算术的规则是，“p + len”仅在 len <= SIZE 时才被正确定义。因此，上述习惯实际上是未定义行为。

  例如，如果某个 malloc 实现为“p”提供了一个地址，使得对于过大的 len 值，“p + len”实际上会溢出，因此 p + len < limit，这可能会导致问题。

  此问题由 Guido Vranken 报告给 OpenSSL
  ([CVE-2016-2177])

  *Matt Caswell*

* DSA 签名中未保留的恒定时间标志

  为了避免侧信道攻击，DSA 签名算法中的操作应以恒定时间运行。OpenSSL DSA 实现中的一个缺陷意味着某些操作会遵循非恒定时间代码路径。通过缓存计时攻击已证明这足以让攻击者恢复私有 DSA 密钥。

  此问题由 César Pereida（奥卢大学）、Billy Brumley（坦佩雷理工大学）和 Yuval Yarom（阿德莱德大学和 NICTA）报告。
  ([CVE-2016-2178])

  *César Pereida*

* DTLS 缓冲消息拒绝服务

  在 DTLS 连接中，如果握手消息乱序到达，OpenSSL 尚未准备好处理的消息将被缓冲以供以后使用。在某些情况下，逻辑中的一个缺陷意味着即使握手已完成，这些消息也不会从缓冲区中移除。攻击者可以在不需要时强制最多约 15 条消息保留在缓冲区中。这些消息将在 DTLS 连接关闭时清除。消息的默认最大大小为 100k。因此，攻击者每连接可以强制额外消耗 1500k。通过打开许多并发连接，攻击者可以通过内存耗尽进行拒绝服务攻击。

  此问题由 Quan Luo 报告给 OpenSSL。
  ([CVE-2016-2179])

  *Matt Caswell*

* DTLS 重放保护拒绝服务

  DTLS 重放攻击保护机制中的一个缺陷意味着到达未来 epoch 的记录会在记录的 MAC 被验证之前更新重放保护“窗口”。攻击者可以通过发送一个针对下一个 epoch 的记录（不需要解密或具有有效 MAC），并带有非常大的序列号来利用这一点。这意味着所有后续的合法数据包都会被丢弃，导致特定 DTLS 连接的拒绝服务。

  此问题由 OCAP 审计团队报告给 OpenSSL。
  ([CVE-2016-2181])

  *Matt Caswell*

* 证书消息越界读取

  在 OpenSSL 1.0.2 及更早版本中，一些缺失的消息长度检查可能导致最多超出分配缓冲区 2 个字节的越界读取。存在理论上的拒绝服务风险，但在常见平台上尚未在实践中观察到。

  受影响的消息是客户端证书、客户端证书请求和服务器证书。因此，攻击只能针对启用客户端身份验证的客户端或服务器执行。

  此问题由 Shi Lei（奇虎 360 公司 Gear Team）报告给 OpenSSL ([CVE-2016-6306])

  *Stephen Henson*

### 1.0.1t 和 1.0.1s 之间的变更 [2016 年 5 月 3 日]

* 防止 AES-NI CBC MAC 检查中的填充预言

  当连接使用 AES CBC 密码套件且服务器支持 AES-NI 时，MITM 攻击者可以使用填充预言攻击解密流量。

  此问题是在修复 Lucky 13 填充攻击 ([CVE-2013-0169]) 时引入的。填充检查被重写为恒定时间，通过确保始终读取并与 MAC 或填充字节进行比较相同的字节。但它不再检查是否有足够的数据来同时包含 MAC 和填充字节。

  此问题由 Juraj Somorovsky 使用 TLS-Attacker 报告。
  ([CVE-2016-2107])

  *Kurt Roeckx*

* 修复 EVP_EncodeUpdate 溢出

  EVP_EncodeUpdate() 函数用于二进制数据的 Base64 编码，可能会发生溢出。如果攻击者能够提供大量输入数据，则长度检查可能会溢出，导致堆损坏。

  在 OpenSSL 内部，EVP_EncodeUpdate() 函数主要由 `PEM_write_bio*` 系列函数使用。这些函数主要在 OpenSSL 命令行应用程序中使用，因此任何处理来自不受信任来源的数据并将其输出为 PEM 文件的应用程序都应被视为易受此问题影响。直接使用大量不受信任数据调用这些 API 的用户应用程序也可能易受攻击。

  此问题由 Guido Vranken 报告。
  ([CVE-2016-2105])

  *Matt Caswell*

* 修复 EVP_EncryptUpdate 溢出

  EVP_EncryptUpdate() 函数可能会发生溢出。如果攻击者在之前调用 EVP_EncryptUpdate() 并处理了部分块后，能够提供大量输入数据，那么长度检查可能会溢出，导致堆损坏。在分析了所有 OpenSSL 内部使用 EVP_EncryptUpdate() 函数的情况后，所有使用情况都属于以下两种形式之一。第一种形式是 EVP_EncryptUpdate() 调用已知是 EVP_EncryptInit() 之后的第一个调用函数，因此该特定调用是安全的。第二种形式是传递给 EVP_EncryptUpdate() 的长度可以从代码中看出是一个较小的值，因此不存在溢出的可能性。由于所有实例都属于这两种形式之一，因此认为内部代码中不会因该问题而发生溢出。应注意，EVP_DecryptUpdate() 在某些代码路径中可以调用 EVP_EncryptUpdate()。此外，EVP_CipherUpdate() 是 EVP_EncryptUpdate() 的同义词。所有这些调用的实例也已进行了分析，并且认为内部使用中不存在可能发生溢出的情况。

  此问题由 Guido Vranken 报告。
  ([CVE-2016-2106])

  *Matt Caswell*

* 防止 ASN.1 BIO 过度内存分配

  当使用 d2i_CMS_bio() 等函数从 BIO 读取 ASN.1 数据时，一个简短的无效编码可能导致分配大量内存，从而可能消耗过多资源或耗尽内存。

  任何通过 d2i BIO 函数解析不受信任数据的应用程序都会受到影响。基于内存的函数（如 d2i_X509()）不受影响。由于 TLS 库使用基于内存的函数，因此 TLS 应用程序不受影响。

  此问题由 Brian Carpenter 报告。
  ([CVE-2016-2109])

  *Stephen Henson*

* EBCDIC 越读

  在使用 X509_NAME_oneline() 函数的 EBCDIC 系统上，超过 1024 字节的 ASN1 字符串可能导致越读。这可能导致任意堆栈数据被返回到缓冲区中。

  此问题由 Guido Vranken 报告。
  ([CVE-2016-2176])

  *Matt Caswell*

* 修改 ALPN 的行为，使其在 SNI/服务器名称回调之后调用回调，以便对 SSL_CTX 的更新会影响 ALPN。

  *Todd Short*

* 从 DEFAULT 密码列表中删除 LOW。这将从默认列表中删除 DES 单个密码。

  *Kurt Roeckx*

* 仅在使用 no-ssl2-method 选项时删除 SSLv2 方法。当启用方法且禁用 ssl2 时，方法返回 NULL。

  *Kurt Roeckx*

### 1.0.1s 和 1.0.1r 之间的变更 [2016 年 3 月 1 日]

* 在 SSLv3 及更高版本中禁用默认构建 OpenSSL 中的弱密码。
  未配置“enable-weak-ssl-ciphers”的构建将不提供任何“EXPORT”或“LOW”强度的密码。

  *Viktor Dukhovni*

* 禁用 SSLv2 默认构建、默认协商和弱密码。SSLv2 默认在构建时禁用。未配置“enable-ssl2”的构建将不支持 SSLv2。即使使用了“enable-ssl2”，希望通过版本灵活的 SSLv23_method() 协商 SSLv2 的用户也需要显式调用以下任一命令：

      SSL_CTX_clear_options(ctx, SSL_OP_NO_SSLv2);
  或
      SSL_clear_options(ssl, SSL_OP_NO_SSLv2);

  视情况而定。即使使用了其中任何一个，或者应用程序显式使用了版本特定的 SSLv2_method() 或其客户端和服务器变体，已移除易受穷举密钥恢复攻击的 SSLv2 密码。具体来说，SSLv2 40 位 EXPORT 密码和 SSLv2 56 位 DES 不再可用。
  ([CVE-2016-0800])

  *Viktor Dukhovni*

* 修复 DSA 代码中的双重释放

  在 OpenSSL 解析格式错误的 DSA 私钥时，发现了一个双重释放错误，这可能导致拒绝服务攻击或内存损坏，影响从不受信任的来源接收 DSA 私钥的应用程序。这种情况被认为是罕见的。

  此问题由 Adam Langley（Google/BoringSSL）使用 libFuzzer 报告给 OpenSSL。
  ([CVE-2016-0705])

  *Stephen Henson*

* 禁用 SRP 伪用户种子以解决服务器内存泄漏问题。

  添加了一个新方法 SRP_VBASE_get1_by_user，该方法可以正确处理种子。

  SRP_VBASE_get_by_user 具有不一致的内存管理行为。
  为了修复无法避免的内存泄漏，SRP_VBASE_get_by_user
  被更改为忽略“伪用户”SRP 种子，即使种子已配置。

  用户应改用 SRP_VBASE_get1_by_user。请注意，在
  SRP_VBASE_get1_by_user 中，调用者必须释放返回的值。另请注意，尽管配置 SRP 种子会尝试通过继续使用伪
  凭据进行握手来隐藏无效用户名，但这种行为不是恒定时间的，并且不提供握手与有效用户握手无法区分的强有力保证。
  ([CVE-2016-0798])

  *Emilia Käsper*

* 修复 BN_hex2bn/BN_dec2bn NULL 指针解引用/堆损坏

  在 BN_hex2bn 函数中，十六进制数字的数量使用整数值 `i` 计算。稍后使用 `i * 4` 调用 `bn_expand`。对于较大的 `i` 值，这可能导致 `bn_expand` 不分配任何内存，因为 `i * 4` 为负数。这可能导致内部 BIGNUM 数据字段为 NULL，从而导致后续的 NULL 指针解引用。对于非常大的 `i` 值，计算 `i * 4` 可能是一个小于 `i` 的正值。在这种情况下，会为内部 BIGNUM 数据字段分配内存，但其大小不足，导致堆损坏。BN_dec2bn 中存在类似问题。如果用户应用程序使用非常大的不受信任的十六进制/十进制数据调用 BN_hex2bn/BN_dec2bn，这可能会产生安全后果。预计这种情况很少发生。

  所有 OpenSSL 内部使用这些函数的数据都不是不受信任的，例如配置文件数据或应用程序命令行参数。如果用户开发的应用程序基于不受信任的数据生成配置文件数据，那么这也可能导致安全后果。预计这种情况也很少见。

  此问题由 Guido Vranken 报告给 OpenSSL。
  ([CVE-2016-0797])

  *Matt Caswell*

* 修复 `BIO_*printf` 函数中的内存问题

  在 `BIO_*printf` 函数中处理“%s”格式字符串时使用的内部 `fmtstr` 函数在计算字符串长度时可能会溢出，并在打印非常长的字符串时导致越界读取。

  此外，在内存分配失败的情况下，内部 `doapr_outch` 函数可能会尝试写入越界内存位置（相对于 NULL 指针的偏移量）。在 1.0.2 及更早版本中，当要分配的缓冲区大小大于 INT_MAX 时，可能会发生这种情况。例如，这可能发生在处理非常长的“%s”格式字符串时。还可能发生内存泄漏。

  第一个问题可能会掩盖第二个问题，具体取决于编译器的行为。这些问题可能导致攻击者在将大量不受信任的数据传递给 `BIO_*printf` 函数时受到攻击。如果应用程序以这种方式使用这些函数，它们可能会易受攻击。OpenSSL 本身在打印 ASN.1 数据的可读转储时使用这些函数。因此，打印此数据的应用程序如果数据来自不受信任的来源，可能会易受攻击。OpenSSL 命令行应用程序在打印 ASN.1 数据时，或者如果不受信任的数据作为命令行参数传递时，也可能易受攻击。

  Libssl 不被认为直接易受攻击。此外，通过 libssl 通过远程连接接收的证书等不太可能触发这些问题，因为 libssl 内部强制执行了消息大小限制。

  此问题由 Guido Vranken 报告给 OpenSSL。
  ([CVE-2016-0799])

  *Matt Caswell*

* 对模块化指数运算进行侧信道攻击

  发现了一种侧信道攻击，该攻击利用了 Intel Sandy-Bridge 微架构上的缓存银行冲突，可能导致 RSA 密钥的恢复。利用此问题的能力受到限制，因为它依赖于能够控制在与执行解密操作的受害者线程运行在同一超线程核心上的线程中运行的代码的攻击者。

  此问题由 Yuval Yarom（阿德莱德大学和 NICTA）、Daniel Genkin（以色列理工学院和特拉维夫大学）以及 Nadia Heninger（宾夕法尼亚大学）报告，更多信息请参见
  <http://cachebleed.info>。
  ([CVE-2016-0702])

  *Andy Polyakov*

* 更改 req 命令以默认生成 2048 位 RSA/DSA 密钥，
  如果未指定 default_bits 的密钥大小。这修复了早期更改中遗漏的部分，该更改将所有 RSA/DSA 密钥生成命令默认设置为使用 2048 位。

  *Emilia Käsper*

### 1.0.1r 和 1.0.1q 之间的变更 [2016 年 1 月 28 日]

* 防止 DH 小子群攻击

  作为预防措施，SSL_OP_SINGLE_DH_USE 选项已默认启用，并且无法禁用。这可能会对性能产生一些影响。

  *Matt Caswell*

* SSLv2 不会阻止禁用密码

  恶意客户端可以协商服务器上已禁用的 SSLv2 密码，并完成 SSLv2 握手，即使所有 SSLv2 密码都已禁用，前提是 SSLv2 协议未通过 SSL_OP_NO_SSLv2 禁用。

  此问题由 Nimrod Aviram 和 Sebastian Schinzel 于 2015 年 12 月 26 日报告给 OpenSSL。
  ([CVE-2015-3197])

  *Viktor Dukhovni*

* 拒绝参数长度小于 1024 位的 DH 握手。

  *Kurt Roeckx*

### 1.0.1q 和 1.0.1p 之间的变更 [2015 年 12 月 3 日]

* 证书验证因缺少 PSS 参数而崩溃

  如果遇到使用 RSA PSS 算法且缺少掩码生成函数参数的 ASN.1 签名，签名验证例程将因 NULL 指针解引用而崩溃。由于这些例程用于验证证书签名算法，因此可用于崩溃任何证书验证操作，并被利用进行拒绝服务攻击。任何执行证书验证的应用程序都易受攻击，包括启用客户端身份验证的 OpenSSL 客户端和服务器。

  此问题由 Loïc Jonas Etienne（Qnective AG）报告给 OpenSSL。
  ([CVE-2015-3194])

  *Stephen Henson*

* X509_ATTRIBUTE 内存泄漏

  当遇到格式错误的 X509_ATTRIBUTE 结构时，OpenSSL 会泄漏内存。此结构用于 PKCS#7 和 CMS 例程，因此任何从不受信任的来源读取 PKCS#7 或 CMS 数据的应用程序都会受到影响。SSL/TLS 不受影响。

  此问题由 Adam Langley（Google/BoringSSL）使用 libFuzzer 报告给 OpenSSL。
  ([CVE-2015-3195])

  *Stephen Henson*

* 重写 EVP_DecodeUpdate（base64 解码）以修复多个错误。
  这会改变某些无效消息的解码行为，尽管更改主要朝着更宽松的方向发展，并且尽可能保留了旧行为。

  *Emilia Käsper*

* 在 DSA_generate_parameters_ex 中，如果提供的种子太短，
  则使用随机种子，如文档所述。

  *Rich Salz 和 Ismo Puustinen <ismo.puustinen@intel.com>*

### 1.0.1p 和 1.0.1o 之间的变更 [2015 年 7 月 9 日]

* 交替链证书伪造

  在证书验证期间，OpenSSL 会尝试查找备用证书链，如果构建此类链的第一次尝试失败。此逻辑实现中的一个错误可能意味着攻击者可以绕过对不受信任证书的某些检查，例如 CA 标志，从而允许他们使用有效的叶子证书充当 CA 并“颁发”无效证书。

  此问题由 Adam Langley/David Benjamin（Google/BoringSSL）报告给 OpenSSL。
  ([CVE-2015-1793])

  *Matt Caswell*

* 处理 PSK 身份提示的竞态条件

  如果多线程客户端收到 PSK 身份提示，则这些值会被错误地更新到父 SSL_CTX 结构中。这可能导致竞态条件，最终导致身份提示数据的双重释放。
  ([CVE-2015-3196])

  *Stephen Henson*

### 1.0.1o 和 1.0.1n 之间的变更 [2015 年 6 月 12 日]

* 修复 HMAC ABI 不兼容性。前一个版本在 HMAC 处理中引入了 ABI 不兼容性。现已恢复之前的 ABI。

### 1.0.1n 和 1.0.1m 之间的变更 [2015 年 6 月 11 日]

* 格式错误的 ECParameters 导致无限循环

  在处理 ECParameters 结构时，如果指定的曲线位于一个特殊格式错误的二项式域上，OpenSSL 会进入无限循环。

  这可用于对任何处理公钥、证书请求或证书的系统进行拒绝服务攻击。这包括启用客户端身份验证的 TLS 客户端和 TLS 服务器。

  此问题由 Joseph Barr-Pixton 报告给 OpenSSL。
  ([CVE-2015-1788])

  *Andy Polyakov*

* X509_cmp_time 中可利用的越界读取

  X509_cmp_time 未能正确检查 ASN1_TIME 字符串的长度，并可能读取超出边界的几个字节。此外，X509_cmp_time 接受时间字符串中任意数量的小数秒。

  攻击者可以利用此漏洞制作各种大小的格式错误证书和 CRL，并可能导致段错误，从而对验证证书或 CRL 的应用程序造成拒绝服务。验证 CRL 的 TLS 客户端会受到影响。如果使用自定义验证回调，启用客户端身份验证的 TLS 客户端和服务器可能会受到影响。

  此问题由 Robert Swiecki（Google）以及 Hanno Böck 独立报告给 OpenSSL。
  ([CVE-2015-1789])

  *Emilia Käsper*

* PKCS7 缺少 EnvelopedContent 时崩溃

  PKCS#7 解析代码未能正确处理缺失的内部 EncryptedContent。攻击者可以制作格式错误的 ASN.1 编码 PKCS#7 blob 并缺少内容，从而在解析时触发 NULL 指针解引用。

  解密 PKCS#7 数据或从不受信任的来源解析 PKCS#7 结构的应用程序会受到影响。OpenSSL 客户端和服务器不受影响。

  此问题由 Michal Zalewski（Google）报告给 OpenSSL。
  ([CVE-2015-1790])

  *Emilia Käsper*

* CMS 验证在哈希函数未知时无限循环

  在验证 signedData 消息时，如果遇到未知的哈希函数 OID，CMS 代码可能会进入无限循环。这可用于对使用 CMS 代码验证 signedData 消息的任何系统进行拒绝服务攻击。
  此问题由 Johannes Bauer 报告给 OpenSSL。
  ([CVE-2015-1792])

  *Stephen Henson*

* 处理 NewSessionTicket 的竞态条件

  如果多线程客户端在尝试重用先前票证时收到 NewSessionTicket，则可能发生竞态条件，最终导致票证数据的双重释放。
  ([CVE-2015-1791])

  *Matt Caswell*

* 拒绝参数长度小于 768 位的 DH 握手。

  *Kurt Roeckx 和 Emilia Kasper*

* dhparam：默认生成 2048 位参数。

  *Kurt Roeckx 和 Emilia Kasper*

### 1.0.1m 和 1.0.1l 之间的变更 [2015 年 3 月 19 日]

* ASN1_TYPE_CMP 中的段错误修复

  如果尝试比较 ASN.1 布尔类型，ASN1_TYPE_CMP 函数将因无效读取而崩溃。由于 ASN1_TYPE_CMP 用于检查证书签名算法的一致性，因此可用于崩溃任何证书验证操作，并被利用进行拒绝服务攻击。任何执行证书验证的应用程序都易受攻击，包括启用客户端身份验证的 OpenSSL 客户端和服务器。
  ([CVE-2015-0286])

  *Stephen Henson*

* ASN.1 结构重用内存损坏修复

  重用 ASN.1 解析中的结构可能会允许攻击者通过无效写入导致内存损坏。这种重用已被强烈不鼓励，并且被认为很少见。

  解析包含 CHOICE 或 ANY DEFINED BY 组件的结构的应用程序可能会受到影响。然而，证书解析（d2i_X509 及相关函数）不受影响。OpenSSL 客户端和服务器不受影响。
  ([CVE-2015-0287])

  *Stephen Henson*

* PKCS7 NULL 指针解引用修复

  PKCS#7 解析代码未能正确处理缺失的外部 ContentInfo。攻击者可以制作格式错误的 ASN.1 编码 PKCS#7 blob 并缺少内容，从而在解析时触发 NULL 指针解引用。

  验证 PKCS#7 签名、解密 PKCS#7 数据或从不受信任的来源解析 PKCS#7 结构的应用程序会受到影响。OpenSSL 客户端和服务器不受影响。

  此问题由 Michal Zalewski（Google）报告给 OpenSSL。
  ([CVE-2015-0289])

  *Emilia Käsper*

* 通过可达的 assert 拒绝服务（SSLv2 服务器）修复

  恶意客户端可以通过发送特制的 SSLv2 CLIENT-MASTER-KEY 消息，在同时支持 SSLv2 和启用导出密码套件的服务器上触发 OPENSSL_assert（即中止）。

  此问题由 Sean Burford（Google）和 Emilia Käsper（OpenSSL 开发团队）发现。
  ([CVE-2015-0293])

  *Emilia Käsper*

* d2i_ECPrivatekey 错误后的使用后释放修复

  通过 d2i_ECPrivateKey 函数使用的格式错误的 EC 私钥文件可能导致使用后释放。这反过来可能导致几个私钥解析函数（如 d2i_PrivateKey 或 EVP_PKCS82PKEY）中的双重释放，并可能导致拒绝服务攻击或内存损坏，影响从不受信任的来源接收 EC 私钥的应用程序。这种情况被认为是罕见的。

  此问题由 BoringSSL 项目发现，并在其提交 517073cd4b 中修复。
  ([CVE-2015-0209])

  *Matt Caswell*

* X509_to_X509_REQ NULL 指针解引用修复

  如果证书密钥无效，X509_to_X509_REQ 函数将因 NULL 指针解引用而崩溃。此函数在实践中很少使用。

  此问题由 Brian Carpenter 发现。
  ([CVE-2015-0288])

  *Stephen Henson*

* 从 DEFAULT 密码中移除导出密码

  *Kurt Roeckx*

### 1.0.1l 和 1.0.1k 之间的变更 [2015 年 1 月 15 日]

* Windows 和 OpenVMS 平台的构建修复

  *Matt Caswell 和 Richard Levitte*

### 1.0.1k 和 1.0.1j 之间的变更 [2015 年 1 月 8 日]

* 修复 DTLS dtls1_get_record 中的段错误。精心构造的 DTLS 消息可能因 NULL 指针解引用而在 OpenSSL 中导致段错误。这可能导致拒绝服务攻击。感谢 Cisco Systems, Inc. 的 Markus Stenberg 报告此问题。
  ([CVE-2014-3571])

  *Steve Henson*

* 修复 dtls1_buffer_record 中的 DTLS 内存泄漏。在某些条件下，dtls1_buffer_record 函数中可能发生内存泄漏。特别是，如果攻击者发送具有相同序列号但属于下一个 epoch 的重复 DTLS 记录，则可能发生这种情况。攻击者可以通过内存耗尽的拒绝服务攻击来利用内存泄漏。感谢 Chris Mueller 报告此问题。
  ([CVE-2015-0206])

  *Matt Caswell*

* 修复 no-ssl3 配置将方法设置为 NULL 的问题。当 openssl 使用 no-ssl3 选项构建时，如果收到 SSL v3 ClientHello，则 ssl 方法将被设置为 NULL，这可能导致后续的 NULL 指针解引用。感谢 Frank Schmirler 报告此问题。
  ([CVE-2014-3569])

  *Kurt Roeckx*

* 对于临时 ECDH 密码套件，如果省略了服务器密钥交换消息，则中止握手。

  感谢 INRIA 的 PROSECCO 团队的 Karthikeyan Bhargavan 报告此问题。
  ([CVE-2014-3572])

  *Steve Henson*

* 移除客户端和服务器上的非导出临时 RSA 代码。此代码违反了 TLS 标准，允许在非导出密码套件中使用临时 RSA 密钥，并可被服务器用于有效地将使用的 RSA 密钥长度降级到小于服务器证书的值。感谢 INRIA 的 PROSECCO 团队的 Karthikeyan Bhargavan 报告此问题。
  ([CVE-2015-0204])

  *Steve Henson*

* 修复了 DH 客户端证书在未经验证的情况下被接受的问题。
  OpenSSL 服务器将接受用于客户端身份验证的 DH 证书，而无需证书验证消息。这实际上允许客户端在不使用私钥的情况下进行身份验证。这仅影响信任颁发包含 DH 密钥的证书的客户端证书颁发机构的服务器：这些服务器非常罕见，几乎不被遇到。感谢 INRIA 的 PROSECCO 团队的 Karthikeyan Bhargavan 报告此问题。
  ([CVE-2015-0205])

  *Steve Henson*

* 确保在通过 SSL_set_SSL_CTX 更新 SSL 的 SSL_CTX 时更新 SSL 的会话 ID 上下文。

  会话 ID 上下文通常从父 SSL_CTX 设置，并且可以随 CTX 而变化。

  *Adam Langley*

* 修复各种证书指纹问题。

  通过使用证书签名部分之外的非 DER 或无效编码，可以在不破坏签名的情况下更改指纹。
  尽管证书的签名部分没有任何细节可以更改，但这可能会导致某些应用程序出现问题：例如，那些使用
  证书指纹进行黑名单的应用程序。

  1. 拒绝未使用位非零的签名。

  如果签名所在的 BIT STRING 的未使用位非零，则拒绝签名。所有当前签名算法都需要零未使用位。

  2. 检查证书算法一致性。

  检查 TBS 中的 AlgorithmIdentifier 是否与证书签名中的 AlgorithmIdentifier 匹配。注意：这将导致某些损坏的证书出现签名失败错误。

  感谢 Google 的 Konrad Kraszewski 报告此问题。

  3. 检查 DSA/ECDSA 签名是否使用 DER。

  重新编码 DSA/ECDSA 签名并与原始接收到的签名进行比较。如果存在不匹配，则返回错误。

  这将拒绝各种情况，包括签名后的垃圾数据（感谢 Codenomicon CROSS 计划的 Antti Karjalainen 和 Tuomo Untinen 发现此情况）以及 BER 或无效 ASN.1 INTEGER（负数或带前导零）的使用。

  OpenSSL 核心团队的 Stephen Henson 进行了进一步分析并开发了修复程序。

  ([CVE-2014-8275])

  *Steve Henson*

* 校正大数平方。大数平方（BN_sqr）在某些平台（包括 x86_64）上可能产生不正确的结果。此错误以非常低的概率随机发生，并且已知不会以任何方式被利用，尽管其确切影响难以确定。感谢 Pieter
  Wuille（Blockstream）报告此问题并提出初步修复。OpenSSL 开发团队和 Google 的 Adam Langley 进行了进一步分析。最终修复由 OpenSSL 核心团队的 Andy Polyakov 开发。
  ([CVE-2014-3570])

  *Andy Polyakov*

* 如果协商的协议版本与会话的版本不匹配，则服务器不恢复会话。虽然 RFC 没有严格禁止，但使用不同版本恢复会话的合理性值得怀疑，并且会破坏所有已知客户端。

  *David Benjamin, Emilia Käsper*

* 收紧 ChangeCipherSpec (CCS) 消息的处理：在重新协商期间拒绝过早的 CCS 消息。（请注意，由于重新协商是加密的，因此此过早的 CCS 不可利用。）

  *Emilia Käsper*

* 收紧客户端会话票证处理在重新协商期间：确保客户端仅在服务器在 ServerHello 中重新发送扩展时才接受会话票证。以前，TLS 客户端会重用旧的扩展状态，从而接受在初始 ServerHello 中宣布的会话票证。

  同样，确保客户端在 ServerHello 中声明了会话票证时要求提供会话票证。以前，TLS 客户端会忽略缺失的 NewSessionTicket 消息。

  *Emilia Käsper*

### 1.0.1j 和 1.0.1i 之间的变更 [2014 年 10 月 15 日]

* SRTP 内存泄漏。

  DTLS SRTP 扩展解析代码中的一个缺陷允许攻击者发送精心构造的握手消息，导致 OpenSSL 未能释放多达 64k 的内存，从而导致内存泄漏。这可能被用于拒绝服务攻击。此问题影响 OpenSSL
  1.0.1 服务器实现，无论是否使用或配置 SRTP，适用于 SSL/TLS 和 DTLS。使用 OPENSSL_NO_SRTP 定义编译的 OpenSSL 实现不受影响。

  修复由 OpenSSL 团队开发。
  ([CVE-2014-3513])

  *OpenSSL 团队*

* 会话票证内存泄漏。

  当 OpenSSL SSL/TLS/DTLS 服务器收到会话票证时，首先会验证该票证的完整性。如果会话票证完整性检查失败，OpenSSL 将无法释放内存，导致内存泄漏。通过发送大量无效的会话票证，攻击者可以通过拒绝服务攻击来利用此问题。
  ([CVE-2014-3567])

  *Steve Henson*

* no-ssl3 构建选项不完整。

  当 OpenSSL 使用“no-ssl3”作为构建选项进行配置时，服务器可以接受并完成 SSL 3.0 握手，并且客户端可以配置为发送它们。
  ([CVE-2014-3568])

  *Akamai 和 OpenSSL 团队*

* 添加对 TLS_FALLBACK_SCSV 的支持。
  进行回退重试的客户端应用程序应调用
  SSL_set_mode(s, SSL_MODE_SEND_FALLBACK_SCSV)。
  ([CVE-2014-3566])

  *Adam Langley, Bodo Moeller*

* 添加其他 DigestInfo 检查。

  在验证 RSA 签名时，将 DigestInfo 重新编码为 DER 并与原始签名进行比较：这将拒绝任何编码不正确的 DigestInfo 结构。

  注意：这是一项预防措施，目前未发现任何攻击。

  *Steve Henson*

### 1.0.1h 和 1.0.1g 之间的变更 [2014 年 8 月 6 日]

* 修复 SRP 缓冲区溢出漏洞。传递给 SRP 代码的无效参数可能导致内部缓冲区溢出。向 SRP 代码添加了健全性检查，确保 g、A、B < N。

  感谢 Cryptography Services, NCC Group 的 Sean Devlin 和 Watson Ladd 发现此问题。
  ([CVE-2014-3512])

  *Steve Henson*

* OpenSSL SSL/TLS 服务器代码中的一个缺陷会导致服务器在客户端 Hello 消息分片严重时协商 TLS 1.0 而不是更高协议版本。这允许中间人攻击者强制降级到 TLS 1.0，即使服务器和客户端都支持更高协议版本，方法是修改客户端的 TLS 记录。

  感谢 David Benjamin 和 Adam Langley（Google）发现并研究此问题。
  ([CVE-2014-3511])

  *David Benjamin*

* 启用匿名 (EC)DH 密码套件的 OpenSSL DTLS 客户端容易受到拒绝服务攻击。恶意服务器可以通过指定匿名 (EC)DH 密码套件并发送精心构造的握手消息，通过 NULL 指针解引用（读取）来崩溃客户端。

  感谢 Felix Gröbert（Google）发现并研究此问题。
  ([CVE-2014-3510])

  *Emilia Käsper*

* 通过发送精心构造的 DTLS 数据包，攻击者可能导致 openssl 泄漏内存。这可以通过拒绝服务攻击来利用。感谢 Adam Langley 发现并研究此问题。
  ([CVE-2014-3507])

  *Adam Langley*

* 攻击者可能导致 openssl 在处理 DTLS 握手消息时消耗大量内存。这可以通过拒绝服务攻击来利用。
  感谢 Adam Langley 发现并研究此问题。
  ([CVE-2014-3506])

  *Adam Langley*

* 攻击者可能导致一个错误条件，该条件导致 openssl 在处理 DTLS 数据包时因内存被释放两次而崩溃。这可以通过拒绝服务攻击来利用。
  感谢 Adam Langley 和 Wan-Teh Chang 发现并研究此问题。
  ([CVE-2014-3505])

  *Adam Langley*

* 如果多线程客户端使用恢复的会话连接到恶意服务器，并且服务器发送了 ec 点格式扩展，则可能会将最多 255 字节写入已释放的内存。

  感谢 Gabor Tyukasz（LogMeIn Inc）发现并研究此问题。
  ([CVE-2014-3509])

  *Gabor Tyukasz*

* 恶意服务器可以通过指定 SRP 密码套件（即使它未与客户端正确协商）来崩溃 OpenSSL 客户端，出现 NULL 指针解引用（读取）。这可以通过拒绝服务攻击来利用。

  感谢 Joonas Kuorilehto 和 Riku Hietamäki（Codenomicon）发现并研究此问题。
  ([CVE-2014-5139])

  *Steve Henson*

* OBJ_obj2txt 中的一个缺陷可能导致 pretty printing 函数（如
  X509_name_oneline、X509_name_print_ex 等）从堆栈中泄漏一些信息。如果应用程序将 pretty printing 输出回显给攻击者，则应用程序可能会受到影响。

  感谢 Ivan Fratric（Google）发现此问题。
  ([CVE-2014-3508])

  *Emilia Käsper 和 Steve Henson*

* 修复 ec_GFp_simple_points_make_affine（因此，EC_POINTs_mul 等）
  的边界情况。（某些无穷远点输入可能导致错误结果，非无穷远点也被映射到无穷远。）

  *Bodo Moeller*

### 1.0.1g 和 1.0.1f 之间的变更 [2014 年 6 月 5 日]

* SSL/TLS MITM 漏洞修复。攻击者通过精心构造的
  握手可以强制 OpenSSL
  SSL/TLS 客户端和服务器使用弱密钥材料。

  感谢 KIKUCHI Masashi（Lepidum Co. Ltd.）发现并
  研究此问题。([CVE-2014-0224])

  *KIKUCHI Masashi, Steve Henson*

* 修复 DTLS 递归漏洞。通过向 OpenSSL DTLS 客户端发送无效的 DTLS 握手，代码可能会递归调用，最终在拒绝服务攻击中崩溃。

  感谢 Imre Rad（Search-Lab Ltd.）发现此问题。
  ([CVE-2014-0221])

  *Imre Rad, Steve Henson*

* 修复 DTLS 无效分片漏洞。通过向 OpenSSL DTLS
  客户端或服务器发送无效的 DTLS 分片，可以触发缓冲区溢出攻击。这可能被利用来在易受攻击的客户端或服务器上运行任意代码。

  感谢 Jüri Aedla 报告此问题。([CVE-2014-0195])

  *Jüri Aedla, Steve Henson*

* 修复 TLS 代码中的一个错误，该错误导致启用匿名 ECDH 密码套件的客户端容易受到拒绝服务攻击。

  感谢 Google 的 Felix Gröbert 和 Ivan Fratric 发现
  此问题。([CVE-2014-3470])

  *Felix Gröbert, Ivan Fratric, Steve Henson*

* 统一版本及其文档。-f 标志用于显示编译标志。

  *mancha <mancha1@zoho.com>*

* 修复 eckey_priv_encode，使其在 i2d_ECPrivateKey 失败时立即返回错误。

  *mancha <mancha1@zoho.com>*

* 修复一些双重释放。这些不被认为可利用。

  *mancha <mancha1@zoho.com>*

### 1.0.1f 和 1.0.1e 之间的变更 [2014 年 4 月 7 日]

* TLS heartbeat 扩展处理中缺少边界检查，可用于向已连接的客户端或服务器泄露多达 64k 的内存。

  感谢 Google 安全团队的 Neel Mehta 发现此错误，以及 Adam Langley <agl@chromium.org> 和 Bodo Moeller <bmoeller@acm.org> 准备修复 ([CVE-2014-0160])

  *Adam Langley, Bodo Moeller*

* 修复论文“使用 FLUSH+RELOAD 缓存侧信道攻击恢复 OpenSSL
  ECDSA Nonces”中描述的攻击。
  详细信息可从以下网址获取：
  <http://eprint.iacr.org/2014/140>

  感谢 Yuval Yarom 和 Naomi Benger 发现此漏洞，以及 Yuval Yarom 提供修复 ([CVE-2014-0076])

  *Yuval Yarom 和 Naomi Benger*

* TLS 填充扩展：draft-agl-tls-padding-03

  针对“TLS 挂起错误”（请参阅 FAQ 和 PR#2771）的解决方法：如果 TLS 客户端 Hello 记录长度值否则将大于 255 且小于 512，则用包含零的虚拟扩展进行填充，使其至少为 512 字节长。

  *Adam Langley, Steve Henson*

### 1.0.1e 和 1.0.1d 之间的变更 [2014 年 1 月 6 日]

* TLS 记录篡改错误修复。精心构造的无效
  握手可能导致 OpenSSL 因 NULL 指针异常而崩溃。感谢 Anton Johansson 报告此问题。
  ([CVE-2013-4353])

* 在重传结构中保留原始 DTLS 摘要和加密上下文，以便在需要重发时可以使用之前的会话参数。([CVE-2013-6450])

  *Steve Henson*

* 添加选项 SSL_OP_SAFARI_ECDHE_ECDSA_BUG（SSL_OP_ALL 的一部分），该选项可避免在客户端似乎是 OS X 上的 Safari 时优先选择 ECDHE-ECDSA 密码。Safari 在 OS X 10.8..10.8.3 上支持
  多种 ECDHE-ECDSA 密码，但无法成功协商。该错误在 OS X 10.8.4 中已修复，但 Apple 已排除对 10.8..10.8.3 进行热修复或强制用户升级到 10.8.4 或更高版本。

  *Rob Stradling, Adam Langley*

### 1.0.1d 和 1.0.1c 之间的变更 [2013 年 2 月 11 日]

* CVE-2013-0169 的正确修复。原始修复在支持 AES-NI 的平台上或传输小记录时无效。

  *Andy Polyakov, Steve Henson*

### 1.0.1c 和 1.0.1d 之间的变更 [2013 年 2 月 5 日]

* 使 SSLv3、TLS 和 DTLS CBC 记录的解码成为恒定时间。

  这解决了由 Nadhem Alfardan 和 Kenny Paterson 发现的 CBC 记录处理中的缺陷。此攻击的详细信息可在以下网址找到：<http://www.isg.rhul.ac.uk/tls/>

  感谢伦敦皇家霍洛威大学信息安全组（www.isg.rhul.ac.uk）的 Nadhem Alfardan 和 Kenny Paterson 发现此缺陷，以及 Adam Langley 和
  Emilia Käsper 提供的初始补丁。
  ([CVE-2013-0169])

  *Emilia Käsper, Adam Langley, Ben Laurie, Andy Polyakov, Steve Henson*

* 修复了 TLS 1.2 和 1.1 记录的 AESNI 在 CBC 模式密码套件中的缺陷，该缺陷可能被用于拒绝服务攻击。感谢 Adam Langley <agl@chromium.org> 发现并检测到此错误，以及 Wolfgang Ettlinger
  <wolfgang.ettlinger@gmail.com> 独立发现此问题。
  ([CVE-2012-2686])

  *Adam Langley*

* 在检查 OCSP 签名时，当密钥为 NULL 时返回错误。
  这修复了一个拒绝服务攻击。([CVE-2013-0166])

  *Steve Henson*

* 使 openssl verify 返回错误。

  *Chris Palmer <palmer@google.com> 和 Ben Laurie*

* 在选择密码套件后调用 OCSP Stapling 回调，以便可以贴上正确的响应。还更改 SSL_get_certificate()
  使其返回实际发送的证书。
  参见 <http://rt.openssl.org/Ticket/Display.html?id=2836>。

  *Rob Stradling <rob.stradling@comodo.com>*

* 修复了解码公钥时可能发生的死锁。

  *Steve Henson*

* 如果重新协商，则不要在初始客户端 Hello 中使用 TLS 1.0 记录版本号。

  *Steve Henson*

### 1.0.1b 和 1.0.1c 之间的变更 [2012 年 5 月 10 日]

* 在 TLS 1.2、1.1 和 DTLS 中跳过显式 IV 之前进行记录长度健全性检查，以修复拒绝服务攻击。

  感谢 Codenomicon 使用 Fuzz-o-Matic 模糊测试即服务测试平台发现此问题。
  ([CVE-2012-2333])

  *Steve Henson*

* 在加密 CMS 消息时正确初始化 tkeylen。
  感谢 Openwall 的 Solar Designer 报告此问题。

  *Steve Henson*

* 在 FIPS 模式下，不要尝试使用复合密码，因为它们未经批准。

  *Steve Henson*

### 1.0.1a 和 1.0.1b 之间的变更 [2012 年 4 月 26 日]

* OpenSSL 1.0.0 将 SSL_OP_ALL 设置为 0x80000FFFL，而 OpenSSL 1.0.1 和
  1.0.1a 将 SSL_OP_NO_TLSv1_1 设置为 0x00000400L，这将导致任何针对 OpenSSL 1.0.0 头文件编译并设置 SSL_OP_ALL 的应用程序也会设置 SSL_OP_NO_TLSv1_1，从而无意中禁用 TLS 1.1。通过将 SSL_OP_NO_TLSv1_1 的值更改为
  0x10000000L 来修复此问题。任何先前针对 OpenSSL 1.0.1 或 1.0.1a 头文件编译并且关心 SSL_OP_NO_TLSv1_1 的应用程序都需要重新编译。如果不这样做，将导致无法专门禁用 TLS 1.1，并且在客户端上下文中，在罕见情况下，将最大支持版本限制为 TLS 1.0 [见下文]。

  *Steve Henson*

* 为了确保互操作性，SSL_OP_NO_protocolX 不仅禁用协议 X，还禁用 X 之上的所有协议 *如果* X 之下的协议仍被启用。更实际地说，这意味着如果应用程序希望禁用 TLS1.0 而启用 TLS1.1 及以上版本，则仅传递 `SSL_OP_NO_TLSv1` 是不够的，必须传递
  `SSL_OP_NO_TLSv1|SSL_OP_NO_SSLv3|SSL_OP_NO_SSLv2`。这适用于客户端。

  *Andy Polyakov*

### 1.0.1 和 1.0.1a 之间的变更 [2012 年 4 月 19 日]

* 检查 asn1_d2i_read_bio
  BUF_mem_grow 和 BUF_mem_grow_clean 中可能被利用的溢出。拒绝在 CRYPTO_realloc_clean 中收缩缓冲区的尝试。

  感谢 Google 安全团队的 Tavis Ormandy 发现此问题，以及 Adam Langley <agl@chromium.org> 进行修复。
  ([CVE-2012-2110])

  *Adam Langley（Google）、Tavis Ormandy、Google 安全团队*

* 不允许在 TLS 1.0、1.1 连接中使用 TLS 1.2 SHA-256 密码套件。

  *Adam Langley*

* 针对某些“挂起”的损坏服务器的解决方法，如果客户端 Hello 记录长度超过 255 字节。

  1. 在初始客户端
     Hello 中不使用大于 TLS 1.0 的记录版本号：一些（但不是全部）挂起的服务器现在可以工作。
  2. 如果我们设置 OPENSSL_MAX_TLS1_2_CIPHER_LENGTH，它将截断
     客户端 Hello 中发送的密码数量。应将其设置为偶数，例如 50，例如通过传递：
     -DOPENSSL_MAX_TLS1_2_CIPHER_LENGTH=50 给 config 或 Configure。
     大多数损坏的服务器现在应该可以工作了。
  3. 如果所有其他方法都失败，设置 OPENSSL_NO_TLS1_2_CLIENT 将完全禁用 TLS 1.2 客户端支持。

  *Steve Henson*

* 修复 OpenSSH 中观察到的 Vector Permutation AES 模块中的 SEGV。

  *Andy Polyakov*

### 1.0.0h 和 1.0.1 之间的变更 [2012 年 3 月 14 日]

 * 添加对使用 ASN1 OCTET STRING 而非 DigestInfo 格式的旧 MDC2 签名的兼容性。

   *Steve Henson*

 * MDC2 RSA 签名使用的格式在 EVP 和 RSA_sign/RSA_verify 函数之间不一致。当 OpenSSL 在 1.0.0 及更高版本中对某些 RSA 签名（特别是那些通过 EVP_PKEY_METHOD 的签名）使用 RSA_sign/RSA_verify 时，这一点更加明显。在 RSA_verify 中检测正确的格式，以便两种形式都能透明地工作。

   *Steve Henson*

 * 一些支持 TLS 1.0 的服务器在我们最初指示支持 TLS 1.2 并随后使用 RSA 加密的预主密钥通过 TLS 1.0 进行重新协商时可能会崩溃。作为一种变通方法，在客户端问候语中使用允许的最大客户端版本，这应该能让这些服务器满意，并且仍然与旧版本的 OpenSSL 一起工作。

   *Steve Henson*

 * 添加对 TLS/DTLS 心跳的支持。

   *Robin Seggelmann <seggelmann@fh-muenster.de>*

 * 添加对 SCTP 的支持。

   *Robin Seggelmann <seggelmann@fh-muenster.de>*

 * 改进了 VOS 的 PRNG 播种。

   *Paul Green <Paul.Green@stratus.com>*

 * 大量的汇编器包更新，最值得注意的是：

   - x86[_64]: AES-NI, PCLMULQDQ, RDRAND 支持；
   - x86[_64]: SSSE3 支持（SHA1, 向量置换 AES）；
   - x86_64: 位切片 AES 实现；
   - ARM: NEON 支持，当代平台优化；
   - s390x: z196 支持；
   - `*`: GHASH 和 GF(2^m) 乘法实现；

   *Andy Polyakov*

 * 使 TLS-SRP 代码符合 RFC 5054 API 清理（移除不必要的代码）
   （移除不必要的代码）

   *Peter Sylvester <peter.sylvester@edelweb.fr>*

 * 添加 RFC 5705 中定义的 TLS 密钥材料导出器。

   *Eric Rescorla*

 * 添加 RFC 5764 中定义的 DTLS-SRTP 协商。

   *Eric Rescorla*

 * 添加下一个协议协商，
   <http://tools.ietf.org/html/draft-agl-tls-nextprotoneg-00>。可以通过在 config 或 Configure 中使用 no-npn 标志禁用。代码由 Google 捐赠。

   *Adam Langley <agl@google.com> 和 Ben Laurie*

 * 添加可选的 64 位优化实现椭圆曲线 NIST-P224、NIST-P256、NIST-P521，在典型输入上具有恒定时间单点乘法。使用此功能需要编译器支持非标准类型 `__uint128_t`（在 gcc 4.4 及更高版本中可用，用于 64 位构建）。代码在 Apache 许可证 2.0 版本下提供。

   在 Configure（或 config）命令行的“enable-ec_nistp_64_gcc_128”指定以在 OpenSSL 构建中包含此内容，并运行“make depend”（或“make update”）。这将启用以下 EC_METHODs：

           EC_GFp_nistp224_method()
           EC_GFp_nistp256_method()
           EC_GFp_nistp521_method()

   EC_GROUP_new_by_curve_name() 将自动使用这些（而 EC_GROUP_new_curve_GFp() 目前倾向于更灵活的实现）。

   *Emilia Käsper、Adam Langley、Bodo Moeller (Google)*

 * 使用类型 ossl_ssize_t 而不是 ssize_t，因为后者并非在所有平台上都可用。将 ssize_t 定义从 e_os.h 移动到公共头文件 e_os2.h，因为它现在出现在公共头文件 cms.h 中。

   *Steve Henson*

 * 为 ca、req 和 x509 工具添加新的 -sigopt 选项。可以使用此选项传递其他签名参数，特别是 PSS。

   *Steve Henson*

 * 添加 RSA PSS 签名函数。这将生成并设置 PSS 的适当 AlgorithmIdentifiers，基于 EVP_MD_CTX 结构中的相应标识符。目前尚无应用程序支持。

   *Steve Henson*

 * 支持伴随的算法特定 ASN1 签名例程。新函数 ASN1_item_sign_ctx() 对预先初始化的 EVP_MD_CTX 结构进行签名，并根据适当的参数设置 AlgorithmIdentifiers。

   *Steve Henson*

 * 为 EVP_PKEY_ASN1_METHOD 添加新的算法特定 ASN1 验证初始化函数：此函数不在 EVP_PKEY_METHOD 中，因为 ASN1 处理将与所使用的 EVP_PKEY_METHOD 无关。添加 PSS 处理程序以支持 PSS 签名的验证：已与多个示例证书进行了检查。

   *Steve Henson*

 * 添加 PSS 的签名打印。添加 PSS OID。

   *Steve Henson、Martin Kaiser <lists@kaiser.cx>*

 * 添加算法特定的签名打印。单个 ASN1 方法现在可以打印签名，而不是标准的十六进制转储。

   更复杂的签名（例如 PSS）可以打印出更有意义的信息。包括打印签名参数 r、s 的 DSA 版本。

   *Steve Henson*

 * 为 CMS 库添加基于密码的收件人信息支持：实现 RFC3211。

   *Steve Henson*

 * 将基于密码的加密拆分为 PBES2 和 PBKDF2 函数。这可以整齐地将代码分离到密码和 PBE 部分，并且对于某些将 PBES2 分为独立部分的算法（如基于密码的 CMS）是必需的。

   *Steve Henson*

 * 会话处理修复：
   - 修复处理正在使用会话 ID 恢复的连接，但同时也支持会话票证。
   - 修复了一个错误，该错误在客户端提供带有过期会话的票证时会阻止颁发新票证。
   - 尝试将票证生存期提示设置为合理的值。
   - 通过排除不相关的信息来缩短票证。
   - 在客户端，不要忽略续订的票证。

   *Adam Langley、Bodo Moeller (Google)*

 * 修复 PSK 会话表示。

   *Bodo Moeller*

 * 添加 RC4-MD5 和 AESNI-SHA1 的“缝合”实现。

   这项工作由 Intel 赞助。

   *Andy Polyakov*

 * 向 TLS 库添加 GCM 支持。需要一些自定义代码来分割 IV，使其介于固定部分（来自 PRF）和显式部分（来自 TLS 记录）之间。这添加了 RFC5288 和 RFC5289 支持的所有 GCM 密码套件。将一些 `AES*` 密码字符串通用化以包含 GCM，并添加一个仅用于 GCM 的特殊 AESGCM 字符串。

   *Steve Henson*

 * 扩展 AES GCM 的 ctrls 范围。允许在解密时设置调用字段，仅在加密时检索调用字段。

   *Steve Henson*

 * 添加 RFC5289 中的 HMAC ECC 密码套件。包括 SHA384 PRF 支持。
   根据 RFC5289 的要求，这些密码套件不能用于 TLS 1.2 之前的版本。

   *Steve Henson*

 * 对于支持 FIPS 的 OpenSSL，将 NULL 默认公钥方法解释为未设置，并返回适当的默认值，但*不*设置默认值。
   这意味着我们可以为在 FIPS 和非 FIPS 模式之间切换的应用程序返回适当的方法。

   *Steve Henson*

 * 在 FIPS 模式下将 HMAC 和 CMAC 操作重定向到 FIPS 模块。如果使用了 ENGINE，则 FIPS 模块无法处理，因此只有在允许非 FIPS 操作时才保留原始代码。

   *Steve Henson*

 * 为 openssl 工具添加 -attime 选项。

   *Peter Eckersley <pde@eff.org>、Ben Laurie 和 Steve Henson*

 * 在 FIPS 模式下将 DSA 和 DH 操作重定向到 FIPS 模块。

   *Steve Henson*

 * 在 FIPS 模式下将 ECDSA 和 ECDH 操作重定向到 FIPS 模块。目前还无条件地使用 FIPS EC 方法。

   *Steve Henson*

 * 新的构建选项 no-ec2m 用于禁用特征 2 代码。

   *Steve Henson*

 * 从 1.1.0-dev 向后移植 libcrypto 的返回值检查审计；并非所有情况都能涵盖，因为有些情况会引入二进制不兼容性。

   *Steve Henson*

 * 将 RSA 操作重定向到 FIPS 模块，包括密钥生成、加密、解密、签名和验证。阻止使用非 FIPS RSA 方法。

   *Steve Henson*

 * 添加类似的低级 API 阻塞到密码。

   *Steve Henson*

 * 低级摘要 API 在 FIPS 模式下不被批准：任何尝试使用它们的行为都将导致致命错误。确实*需要*使用它们的应用程序可以使用 `private_*` 版本代替。

   *Steve Henson*

 * 在 FIPS 构建中将密码操作重定向到 FIPS 模块。

   *Steve Henson*

 * 在 FIPS 构建中将摘要操作重定向到 FIPS 模块。

   *Steve Henson*

 * 更新构建系统以添加“fips”标志，该标志将链接 fipscanister.o 以进行静态和共享库构建，并在需要时嵌入签名。

   *Steve Henson*

 * 按首选顺序输出 TLS 支持的曲线，而不是按数值顺序。目前硬编码为最高阶曲线优先。
   这应该是可配置的，以便应用程序可以权衡速度与强度。

   *Steve Henson*

 * 添加 TLS v1.2 服务器对客户端身份验证的支持。

   *Steve Henson*

 * 在 ssl 库中添加对 FIPS 模式的支持：禁用 SSLv3、非 FIPS 密码并启用 MD5。

   *Steve Henson*

 * 函数 FIPS_mode_set() 和 FIPS_mode() 调用底层 FIPS 模块版本。

   *Steve Henson*

 * 添加 TLS v1.2 客户端对客户端身份验证的支持。保留更长的握手记录缓存，因为我们直到收到证书请求消息后才知道要使用的哈希算法。

   *Steve Henson*

 * 初始 TLS v1.2 客户端支持。添加默认的签名算法扩展，包括我们支持的所有算法。解析客户端密钥交换中的新签名格式。根据 RFC5246 的指示，放宽 TLS v1.2 的一些 ECC 签名限制。

   *Steve Henson*

 * 添加服务器对 TLS v1.2 签名算法扩展的支持。在需要时根据客户端的摘要偏好切换到新的签名格式。所有服务器密码套件现在应该在 TLS v1.2 中正常工作。目前尚无客户端支持，也没有客户端证书支持。

   *Steve Henson*

 * 初始 TLS v1.2 支持。向 ssl 代码添加新的 SHA256 摘要，在 TLS v1.2 及更高版本中使用 SHA256 进行 PRF。添加新的基于 SHA256 的密码套件。目前只有 RSA 密钥交换密码套件适用于 TLS v1.2。添加用于 TLS v1.2 的新选项，取代旧的且已废弃的 SSL_OP_PKCS1_CHECK 标志，使用 SSL_OP_NO_TLSv1_2。新的 TLSv1.2 方法和版本检查。

   *Steve Henson*

 * 新选项 OPENSSL_NO_SSL_INTERN。如果应用程序可以定义此选项进行编译，则它不会受到 ssl 内部结构任何更改的影响。添加几个实用函数以允许 openssl 应用程序在定义 OPENSSL_NO_SSL_INTERN 的情况下工作。

   *Steve Henson*

 * EdelWeb（Peter Sylvester 和 Christophe Renou）提供的长期支持 SRP 的补丁已集成。
   *Christophe Renou <christophe.renou@edelweb.fr>、Peter Sylvester <peter.sylvester@edelweb.fr>、Tom Wu <tjw@cs.stanford.edu> 和 Ben Laurie*

 * 添加复制 EVP_PKEY_METHOD 和检索标志及 ID 的函数。

   *Steve Henson*

 * 使用函数 SSL_renegotiate_abbreviated() 允许在重新协商时进行缩写握手。

   *Robin Seggelmann <seggelmann@fh-muenster.de>*

 * 在 ENGINE_load_builtin_engines() 中添加对 ENGINE_register_all_complete() 的调用，以便某些实现自动使用，而无需显式的应用程序支持。

   *Steve Henson*

 * 添加对 RFC5705 中描述的 TLS 密钥导出器的支持。

   *Robin Seggelmann <seggelmann@fh-muenster.de>、Steve Henson*

 * 初始 TLSv1.1 支持。由于 TLSv1.1 与 TLS v1.0 非常相似，因此只需要进行少量更改：

     添加 SSL_OP_NO_TLSv1_1 标志。
     添加 TLSv1_1 方法。
     更新版本检查逻辑以处理版本 1.1。
     添加显式 IV 处理（从 DTLS 代码移植）。
     向 s_client/s_server 添加命令行选项。

   *Steve Henson*

OpenSSL 1.0.0
-------------

### 1.0.0s 和 1.0.0t 之间的更改 [2015 年 12 月 3 日]

 * X509_ATTRIBUTE 内存泄漏

   当遇到格式错误的 X509_ATTRIBUTE 结构时，OpenSSL 会泄漏内存。此结构由 PKCS#7 和 CMS 例程使用，因此任何从不受信任的源读取 PKCS#7 或 CMS 数据的应用程序都会受到影响。SSL/TLS 不受影响。

   此问题由 Adam Langley (Google/BoringSSL) 使用 libFuzzer 向 OpenSSL 报告。
   ([CVE-2015-3195])

   *Stephen Henson*

 * 处理 PSK 身份提示的竞态条件

   如果多线程客户端收到 PSK 身份提示，则值会在父 SSL_CTX 结构中错误地更新。这可能导致竞态条件，最终可能导致身份提示数据被双重释放。
   ([CVE-2015-3196])

   *Stephen Henson*

### 1.0.0r 和 1.0.0s 之间的更改 [2015 年 6 月 11 日]

 * 格式错误的 ECParameters 导致无限循环

   在处理 ECParameters 结构时，如果指定的曲线位于特制的格式错误的二项式域上，OpenSSL 会进入无限循环。

   这可用于对处理公钥、证书请求或证书的任何系统执行拒绝服务攻击。这包括 TLS 客户端和启用了客户端身份验证的 TLS 服务器。

   此问题由 Joseph Barr-Pixton 向 OpenSSL 报告。
   ([CVE-2015-1788])

   *Andy Polyakov*

 * X509_cmp_time 中可利用的越界读取

   X509_cmp_time 未能正确检查 ASN1_TIME 字符串的长度，并可能越界读取几个字节。此外，X509_cmp_time 接受时间字符串中任意数量的小数秒。

   攻击者可以利用此漏洞制作各种大小的格式错误证书和 CRL，并可能导致分段错误，从而对验证证书或 CRL 的应用程序造成拒绝服务。验证 CRL 的 TLS 客户端会受到影响。启用了客户端身份验证的 TLS 客户端和服务器，如果使用自定义验证回调，可能会受到影响。

   此问题由 Robert Swiecki (Google) 和 Hanno Böck 独立报告给 OpenSSL。
   ([CVE-2015-1789])

   *Emilia Käsper*

 * PKCS7 在缺少 EnvelopedContent 时崩溃

   PKCS#7 解析代码未能正确处理缺失的内部 EncryptedContent。攻击者可以制作格式错误的 ASN.1 编码 PKCS#7 blob，其中缺少内容，并在解析时触发 NULL 指针解引用。

   解密 PKCS#7 数据或以其他方式从不受信任的源解析 PKCS#7 结构的应用程序会受到影响。OpenSSL 客户端和服务器不受影响。

   此问题由 Michal Zalewski (Google) 向 OpenSSL 报告。
   ([CVE-2015-1790])

   *Emilia Käsper*

 * CMS 验证在遇到未知哈希函数时无限循环

   在验证 signedData 消息时，如果遇到未知的哈希函数 OID，CMS 代码可能会进入无限循环。这可用于对使用 CMS 代码验证 signedData 消息的任何系统执行拒绝服务攻击。
   此问题由 Johannes Bauer 向 OpenSSL 报告。
   ([CVE-2015-1792])

   *Stephen Henson*

 * 处理 NewSessionTicket 的竞态条件

   如果多线程客户端在尝试重用先前票证时收到 NewSessionTicket，则可能发生竞态条件，最终可能导致票证数据被双重释放。
   ([CVE-2015-1791])

   *Matt Caswell*

### 1.0.0q 和 1.0.0r 之间的更改 [2015 年 3 月 19 日]

 * ASN1_TYPE_CMP 段错误修复

   如果尝试比较 ASN.1 布尔类型，函数 ASN1_TYPE_CMP 会因无效读取而崩溃。由于 ASN1_TYPE_CMP 用于检查证书签名算法的一致性，因此可用于崩溃任何证书验证操作，并可能在拒绝服务攻击中被利用。任何执行证书验证的应用程序都易受攻击，包括启用客户端身份验证的 OpenSSL 客户端和服务器。
   ([CVE-2015-0286])

   *Stephen Henson*

 * ASN.1 结构重用内存损坏修复

   在 ASN.1 解析中重用结构可能会允许攻击者通过无效写入导致内存损坏。这种重用被强烈不鼓励，并且被认为很少见。

   解析包含 CHOICE 或 ANY DEFINED BY 组件的结构的应用程序可能会受到影响。但是，证书解析（d2i_X509 及相关函数）不受影响。OpenSSL 客户端和服务器不受影响。
   ([CVE-2015-0287])

   *Stephen Henson*

 * PKCS7 NULL 指针解引用修复

   PKCS#7 解析代码未能正确处理缺失的外部 ContentInfo。攻击者可以制作格式错误的 ASN.1 编码 PKCS#7 blob，其中缺少内容，并在解析时触发 NULL 指针解引用。

   验证 PKCS#7 签名、解密 PKCS#7 数据或以其他方式从不受信任的源解析 PKCS#7 结构的应用程序会受到影响。OpenSSL 客户端和服务器不受影响。

   此问题由 Michal Zalewski (Google) 向 OpenSSL 报告。
   ([CVE-2015-0289])

   *Emilia Käsper*

 * SSLv2 服务器中可达到的断言的拒绝服务修复

   恶意客户端可以通过发送特制的 SSLv2 CLIENT-MASTER-KEY 消息，在同时支持 SSLv2 和启用导出密码套件的服务器中触发 OPENSSL_assert（即中止）。

   此问题由 Sean Burford (Google) 和 Emilia Käsper (OpenSSL 开发团队) 发现。
   ([CVE-2015-0293])

   *Emilia Käsper*

 * d2i_ECPrivatekey 错误后的使用后释放修复

   通过 d2i_ECPrivateKey 函数消耗的格式错误的 EC 私钥文件可能导致使用后释放。这反过来可能导致多个私钥解析函数（如 d2i_PrivateKey 或 EVP_PKCS82PKEY）中的双重释放，并可能导致接收来自不受信任源的 EC 私钥的应用程序遭受拒绝服务攻击或内存损坏。这种情况被认为很少见。

   此问题由 BoringSSL 项目发现，并在其提交 517073cd4b 中修复。
   ([CVE-2015-0209])

   *Matt Caswell*

 * X509_to_X509_REQ NULL 指针解引用修复

   如果证书密钥无效，函数 X509_to_X509_REQ 会因 NULL 指针解引用而崩溃。此函数在实践中很少使用。

   此问题由 Brian Carpenter 发现。
   ([CVE-2015-0288])

   *Stephen Henson*

 * 移除了 DEFAULT 密码中的导出密码

   *Kurt Roeckx*

### 1.0.0p 和 1.0.0q 之间的更改 [2015 年 1 月 15 日]

 * Windows 和 OpenVMS 平台的构建修复

   *Matt Caswell 和 Richard Levitte*

### 1.0.0o 和 1.0.0p 之间的更改 [2015 年 1 月 8 日]

 * 修复 DTLS 段错误 dtls1_get_record。一个精心构造的 DTLS
   消息可能由于 NULL 指针解引用而在 OpenSSL 中导致段错误。这可能导致拒绝服务攻击。感谢 Cisco Systems, Inc. 的 Markus Stenberg 报告此问题。
   ([CVE-2014-3571])

   *Steve Henson*

 * 修复 dtls1_buffer_record 中的 DTLS 内存泄漏。在某些条件下，dtls1_buffer_record 函数可能发生内存泄漏。特别是，如果攻击者发送具有相同序列号但属于下一个 epoch 的重复 DTLS 记录，则可能发生这种情况。攻击者可以通过内存耗尽的拒绝服务攻击来利用此内存泄漏。感谢 Chris Mueller 报告此问题。
   ([CVE-2015-0206])

   *Matt Caswell*

 * 修复了 no-ssl3 配置将方法设置为 NULL 的问题。当 openssl
   使用 no-ssl3 选项构建时，并且收到 SSL v3 ClientHello，ssl
   方法将被设置为 NULL，这可能导致后续的 NULL 指针解引用。感谢 Frank Schmirler 报告此问题。
   ([CVE-2014-3569])

   *Kurt Roeckx*

 * 对于临时 ECDH 密码套件，如果省略服务器密钥交换消息，则中止握手。

   感谢 INRIA PROSECCO 团队的 Karthikeyan Bhargavan 报告此问题。
   ([CVE-2014-3572])

   *Steve Henson*

 * 移除客户端和服务器上的非导出临时 RSA 代码。此代码违反了 TLS 标准，允许在非导出密码套件中使用临时 RSA 密钥，并且服务器可以有效地将使用的 RSA 密钥长度降级到小于服务器证书的值。感谢 INRIA PROSECCO 团队的 Karthikeyan Bhargavan 报告此问题。
   ([CVE-2015-0204])

   *Steve Henson*

 * 修复了 DH 客户端证书在未经验证的情况下被接受的问题。
   OpenSSL 服务器将接受用于客户端身份验证的 DH 证书，而无需证书验证消息。这实际上允许客户端在不使用私钥的情况下进行身份验证。这仅影响信任颁发包含 DH 密钥的证书的客户端证书颁发机构的服务器：这些服务器非常罕见，几乎从未遇到过。感谢 INRIA PROSECCO 团队的 Karthikeyan Bhargavan 报告此问题。
   ([CVE-2015-0205])

   *Steve Henson*

 * 校正 Bignum 乘方。Bignum 乘方 (BN_sqr) 在某些平台（包括 x86_64）上可能产生不正确的结果。此错误以非常低的概率随机发生，并且已知不会以任何方式被利用，尽管其确切影响难以确定。感谢 Pieter Wuille (Blockstream) 报告此问题并提出初步修复。OpenSSL 开发团队和 Google 的 Adam Langley 进行了进一步分析。最终修复由 OpenSSL 核心团队的 Andy Polyakov 开发。
   ([CVE-2014-3570])

   *Andy Polyakov*

 * 修复各种证书指纹问题。

   通过在证书的签名部分外部使用非 DER 或无效编码，可以在不破坏签名的情况下更改指纹。
   虽然证书的签名部分没有改变，但这可能会导致某些应用程序出现问题：例如，那些使用证书指纹进行黑名单的应用程序。

   1. 拒绝具有非零未使用位的签名。

   如果包含签名的 BIT STRING 具有非零未使用位，则拒绝签名。所有当前签名算法都需要零未使用位。

   2. 检查证书算法一致性。

   检查 TBS 中的 AlgorithmIdentifier 是否与证书签名中的 AlgorithmIdentifier 匹配。注意：这将导致某些损坏的证书出现签名错误。

   感谢 Google 的 Konrad Kraszewski 报告此问题。

   3. 检查 DSA/ECDSA 签名是否使用 DER。

   重新编码 DSA/ECDSA 签名并与原始接收的签名进行比较。如果存在不匹配，则返回错误。

   这将拒绝各种情况，包括签名后的垃圾数据（感谢 Codenomicon CROSS 项目的 Antti Karjalainen 和 Tuomo Untinen 发现此情况）以及 BER 或无效 ASN.1 INTEGER（负数或带前导零）的使用。

   OpenSSL 核心团队的 Stephen Henson 进行了进一步分析并开发了修复程序。

   ([CVE-2014-8275])

   *Steve Henson*

### 1.0.0n 和 1.0.0o 之间的更改 [2014 年 10 月 15 日]

 * 会话票证内存泄漏。

   当 OpenSSL SSL/TLS/DTLS 服务器收到会话票证时，会首先验证该票证的完整性。如果会话票证完整性检查失败，OpenSSL 将无法释放内存，从而导致内存泄漏。通过发送大量无效的会话票证，攻击者可以在拒绝服务攻击中利用此问题。
   ([CVE-2014-3567])

   *Steve Henson*

 * 构建选项 no-ssl3 不完整。

   当 OpenSSL 配置为使用 "no-ssl3" 作为构建选项时，服务器可以接受并完成 SSL 3.0 握手，并且客户端可以配置为发送它们。
   ([CVE-2014-3568])

   *Akamai 和 OpenSSL 团队*

 * 添加对 TLS_FALLBACK_SCSV 的支持。
   进行回退重试的客户端应用程序应调用
   SSL_set_mode(s, SSL_MODE_SEND_FALLBACK_SCSV)。
   ([CVE-2014-3566])

   *Adam Langley, Bodo Moeller*

 * 添加额外的 DigestInfo 检查。

   在验证 RSA 签名时，将 DigestInto 重新编码为 DER 并与原始签名进行比较：这将拒绝任何编码不正确的 DigestInfo 结构。

   注意：这是一项预防措施，目前未发现任何攻击。

   *Steve Henson*

### 1.0.0m 和 1.0.0n 之间的更改 [2014 年 8 月 6 日]

 * 启用匿名 (EC)DH 密码套件的 OpenSSL DTLS 客户端容易受到拒绝服务攻击。恶意服务器可以通过指定匿名 (EC)DH 密码套件并发送精心构造的握手消息，以 NULL 指针解引用（读取）方式使客户端崩溃。

   感谢 Google 的 Felix Gröbert 发现并研究了此问题。
   ([CVE-2014-3510])

   *Emilia Käsper*

 * 通过发送精心构造的 DTLS 数据包，攻击者可能导致 openssl
   泄漏内存。这可以通过拒绝服务攻击来利用。感谢 Adam Langley 发现并研究了此问题。
   ([CVE-2014-3507])

   *Adam Langley*

 * 攻击者可能导致 openssl 在处理 DTLS 握手消息时消耗大量内存。这可以通过拒绝服务攻击来利用。
   感谢 Adam Langley 发现并研究了此问题。
   ([CVE-2014-3506])

   *Adam Langley*

 * 攻击者可能导致错误条件，从而在处理 DTLS 数据包时导致 openssl
   崩溃，因为内存被释放了两次。这可以通过拒绝服务攻击来利用。
   感谢 Adam Langley 和 Wan-Teh Chang 发现并研究了此问题。
   ([CVE-2014-3505])

   *Adam Langley*

 * 如果多线程客户端使用恢复的会话连接到恶意服务器，并且服务器发送了 ec 点格式扩展，则可能向已释放的内存写入最多 255 个字节。

   感谢 LogMeIn Inc. 的 Gabor Tyukasz 发现并研究了此问题。
   ([CVE-2014-3509])

   *Gabor Tyukasz*

 * OBJ_obj2txt 中的一个缺陷可能导致 pretty printing 函数（如
   X509_name_oneline、X509_name_print_ex 等）从堆栈中泄漏一些信息。如果应用程序将 pretty printing 输出回显给攻击者，则可能会受到影响。

   感谢 Google 的 Ivan Fratric 发现此问题。
   ([CVE-2014-3508])

   *Emilia Käsper 和 Steve Henson*

 * 修复 ec_GFp_simple_points_make_affine（因此，EC_POINTs_mul 等）
   的边界情况。（某些无穷远点输入可能导致错误结果，非无穷远点输入也被映射到无穷远。）

   *Bodo Moeller*

### 1.0.0l 和 1.0.0m 之间的更改 [2014 年 6 月 5 日]

 * 修复 SSL/TLS 中间人攻击漏洞。攻击者通过精心构造的
   握手可以强制 OpenSSL
   SSL/TLS 客户端和服务器使用弱密钥材料。

   感谢 Lepidum Co. Ltd. 的 KIKUCHI Masashi 发现并研究了此问题。([CVE-2014-0224])

   *KIKUCHI Masashi, Steve Henson*

 * 修复 DTLS 递归漏洞。通过向 OpenSSL DTLS
   客户端发送无效的 DTLS 握手，代码可能会递归，最终在拒绝服务攻击中崩溃。

   感谢 Search-Lab Ltd. 的 Imre Rad 发现此问题。
   ([CVE-2014-0221])

   *Imre Rad, Steve Henson*

 * 修复 DTLS 无效片段漏洞。通过向 OpenSSL DTLS
   客户端或服务器发送无效的 DTLS 片段，可以触发缓冲区溢出攻击。这可能被利用来在易受攻击的客户端或服务器上运行任意代码。

   感谢 Jüri Aedla 报告此问题。([CVE-2014-0195])

   *Jüri Aedla, Steve Henson*

 * 修复 TLS 代码中的错误，即客户端启用匿名 ECDH 密码套件
   会受到拒绝服务攻击。

   感谢 Google 的 Felix Gröbert 和 Ivan Fratric 发现
   此问题。([CVE-2014-3470])

   *Felix Gröbert, Ivan Fratric, Steve Henson*

 * 统一版本及其文档。-f 标志用于显示
   编译标志。

   *mancha <mancha1@zoho.com>*

 * 修复 eckey_priv_encode，使其在 i2d_ECPrivateKey 失败时立即返回错误。

   *mancha <mancha1@zoho.com>*

 * 修复了一些双重释放。据认为这些是不可利用的。

   *mancha <mancha1@zoho.com>*

 * 修复了论文“使用 FLUSH+RELOAD 缓存侧信道攻击恢复 OpenSSL
   ECDSA Nonces”中描述的攻击
   作者：Yuval Yarom 和 Naomi Benger。详细信息可从以下网址获取：
   <http://eprint.iacr.org/2014/140>

   感谢 Yuval Yarom 和 Naomi Benger 发现此漏洞，并感谢 Yuval Yarom 提供修复程序 ([CVE-2014-0076])

   *Yuval Yarom 和 Naomi Benger*

### 1.0.0k 和 1.0.0l 之间的更改 [2014 年 1 月 6 日]

 * 在重传结构中保留原始 DTLS 摘要和加密上下文，以便在需要重传时可以使用之前的会话参数。([CVE-2013-6450])

   *Steve Henson*

 * 添加选项 SSL_OP_SAFARI_ECDHE_ECDSA_BUG (SSL_OP_ALL 的一部分)，该选项可避免在客户端似乎是 OS X 上的 Safari 时优先选择 ECDHE-ECDSA 密码套件。OS X 10.8..10.8.3 上的 Safari 声明支持
   多个 ECDHE-ECDSA 密码套件，但无法成功协商它们。该错误在 OS X 10.8.4 中已修复，但 Apple 已排除对 10.8..10.8.3 进行热修复或强制用户升级到 10.8.4 或更高版本。

   *Rob Stradling, Adam Langley*

### 1.0.0j 和 1.0.0k 之间的更改 [2013 年 2 月 5 日]

 * 使 SSLv3、TLS 和 DTLS CBC 记录的解码成为常数时间。

   这解决了 Nadhem Alfardan 和 Kenny Paterson 发现的 CBC 记录处理中的漏洞。此攻击的详细信息可在以下网址找到：<http://www.isg.rhul.ac.uk/tls/>

   感谢伦敦皇家霍洛威大学信息安全组 (www.isg.rhul.ac.uk) 的 Nadhem Alfardan 和 Kenny Paterson 发现此漏洞，以及 Adam Langley 和
   Emilia Käsper 提供的初始补丁。
   ([CVE-2013-0169])

   *Emilia Käsper, Adam Langley, Ben Laurie, Andy Polyakov, Steve Henson*

 * 在检查 OCSP 签名时，如果密钥为 NULL，则返回错误。
   这修复了一个拒绝服务攻击。([CVE-2013-0166])

   *Steve Henson*

 * 在选择密码套件后调用 OCSP Stapling 回调，以便将正确的响应进行装订。还更改 SSL_get_certificate()
   使其返回实际发送的证书。
   参见 <http://rt.openssl.org/Ticket/Display.html?id=2836>。
   （这是一个反向移植）

   *Rob Stradling <rob.stradling@comodo.com>*

 * 修复了解码公钥时可能发生的死锁。

   *Steve Henson*

### 1.0.0i 和 1.0.0j 之间的更改 [2012 年 5 月 10 日]

[注意：OpenSSL 1.0.0i 及更高版本的 1.0.0 补丁级别是在
OpenSSL 1.0.1 之后发布的。]

 * 在 DTLS 中跳过显式 IV 之前进行记录长度的健全性检查，以修复拒绝服务攻击。

   感谢 Codenomicon 使用 Fuzz-o-Matic 模糊测试即服务测试平台发现此问题。
   ([CVE-2012-2333])

   *Steve Henson*

 * 在加密 CMS 消息时正确初始化 tkeylen。
   感谢 Openwall 的 Solar Designer 报告此问题。

   *Steve Henson*

### 1.0.0h 和 1.0.0i 之间的更改 [2012 年 4 月 19 日]

 * 检查 asn1_d2i_read_bio
   BUF_mem_grow 和 BUF_MEM_GROW_CLEAN 中可能被利用的溢出。拒绝在 CRYPTO_realloc_clean 中收缩缓冲区的尝试。

   感谢 Google 安全团队的 Tavis Ormandy 发现此问题，并感谢 Adam Langley <agl@chromium.org> 进行修复。
   ([CVE-2012-2110])

   *Adam Langley (Google), Tavis Ormandy, Google Security Team*

### 1.0.0g 和 1.0.0h 之间的更改 [2012 年 3 月 12 日]

 * 修复 CMS 和 PKCS7 代码中的 MMA（Bleichenbacher 的 PKCS #1 v1.5 RSA 填充攻击）弱点。当 RSA 解密失败时，使用随机密钥进行内容解密，并始终返回相同的错误。注意：此攻击平均需要 2^20 条消息，因此仅影响自动发送者。可以通过设置
   CMS_DEBUG_DECRYPT 标志在 CMS 代码中重新启用旧行为：这对于不需要 MMA 防御的调试和测试很有用。
   感谢 Ivan Nestlerode <inestlerode@us.ibm.com> 发现
   此问题。([CVE-2012-0884])

   *Steve Henson*

 * 修复 CVE-2011-4169：确保在拒绝多个 SGC 重启之前，我们确实收到
   client hello。感谢
   Ivan Nestlerode <inestlerode@us.ibm.com> 发现此错误。

   *Steve Henson*

### 1.0.0f 和 1.0.0g 之间的更改 [2012 年 1 月 18 日]

 * 修复 DTLS 拒绝服务问题，该问题由 CVE-2011-4109 的修复引入。
   感谢 Cisco Systems, Inc. 的 Antonio Martin，企业安全访问研究和开发部发现此错误并
   准备了修复程序。([CVE-2012-0050])

   *Antonio Martin*

### 1.0.0e 和 1.0.0f 之间的更改 [2012 年 1 月 4 日]

 * Nadhem Alfardan 和 Kenny Paterson 发现了一个 Vaudenay 填充预言攻击对 CBC 模式加密的扩展，该扩展允许对 OpenSSL
   DTLS 实现进行有效的明文恢复攻击。他们的攻击利用了解密处理过程中出现的时序差异。描述此攻击的研究论文可在以下网址找到：
   <http://www.isg.rhul.ac.uk/~kp/dtls.pdf>
   感谢伦敦皇家霍洛威大学信息安全组 (www.isg.rhul.ac.uk) 的 Nadhem Alfardan 和 Kenny Paterson 发现此漏洞，以及 Robin Seggelmann
   <seggelmann@fh-muenster.de> 和 Michael Tuexen <tuexen@fh-muenster.de>
   准备了修复程序。([CVE-2011-4108])

   *Robin Seggelmann, Michael Tuexen*

 * 清除 SSL 3.0 记录的块填充所使用的字节。
   ([CVE-2011-4576])

   *Adam Langley (Google)*

 * 只允许 SSL/TLS 进行一次 SGC 握手重启。感谢 George
   Kadianakis <desnacked@gmail.com> 发现此问题以及
   Adam Langley 准备了修复程序。([CVE-2011-4619])

   *Adam Langley (Google)*

 * 检查 GOST ENGINE 中的参数是否为 NULL。([CVE-2012-0027])

   *Andrey Kulikov <amdeich@gmail.com>*

 * 防止格式错误的 RFC3779 数据触发断言失败。
   感谢 BBN Technologies 的 Andrew Chi 发现此漏洞，以及 Rob Austein <sra@hactrn.net> 进行修复。([CVE-2011-4577])

   *Rob Austein <sra@hactrn.net>*

 * 改进了 VOS 的 PRNG 播种。

   *Paul Green <Paul.Green@stratus.com>*

 * 修复 ssl_ciph.c 设置竞态条件。

   *Adam Langley (Google)*

 * 修复 ecdsatest.c 中的虚假失败。

   *Emilia Käsper (Google)*

 * 修复 BIO_f_buffer() 实现（该实现混合了对 `..._len` 字段的不同解释）。

   *Adam Langley (Google)*

 * 修复 BN_BLINDING 的处理：现在 BN_BLINDING_invert_ex（而不是
   BN_BLINDING_invert_ex）调用 BN_BLINDING_update，确保并发
   线程不会重用相同的随机化系数。

   这还避免了调用 BN_BLINDING_invert_ex 时获取 CRYPTO_LOCK_RSA_BLINDING
   锁的需要，并避免了对每个 BN_BLINDING 结构使用一次 BN_BLINDING_update（以前，最后一次更新始终未使用）。

   *Emilia Käsper (Google)*

 * 在 ssl3_clear 中，与 s3->rbuf 一起保留 s3->init_extra。

   *Bob Buckholz (Google)*

### 1.0.0d 和 1.0.0e 之间的更改 [2011 年 9 月 6 日]

 * 修复了 CRL 的 nextUpdate 在过去时有时被接受的错误，方法是正确初始化 X509_STORE_CTX。([CVE-2011-3207])

   *Kaspar Brand <ossl@velox.ch>*

 * 修复了 (EC)DH 密码套件的 SSL 内存处理，特别是
   对于 ECDH 的多线程使用。([CVE-2011-3210])

   *Adam Langley (Google)*

 * 修复了 bad inputs 上的 x509_name_ex_d2i 内存泄漏。

   *Bodo Moeller*

 * 删除了 ssl 代码中硬编码的 ecdsaWithSHA1 签名测试，并通过使用 OID xref 工具检查签名公钥算法。
   在此之前，您只能将某些 ECC 密码套件与 SHA1 一起使用。

   *Steve Henson*

 * 添加了针对 ECDSA 时序攻击的保护，如 Billy Bob Brumley 和 Nicola Tuveri 的论文所述：
   <http://eprint.iacr.org/2011/232.pdf>

   *Billy Bob Brumley 和 Nicola Tuveri*

### 1.0.0c 和 1.0.0d 之间的更改 [2011 年 2 月 8 日]

 * 修复了 OCSP 装订 ClientHello 扩展的解析。CVE-2011-0014

   *Neel Mehta, Adam Langley, Bodo Moeller (Google)*

 * 修复了字符串打印代码中的错误：如果启用了*任何*转义，我们必须转义转义字符（反斜杠），否则生成的字符串将是模棱两可的。

   *Steve Henson*

### 1.0.0b 和 1.0.0c 之间的更改 [2010 年 12 月 2 日]

 * 禁用了针对古老且过时的 Netscape 浏览器和服务器的代码的变通方法：攻击者可以在密码套件降级攻击中使用它。感谢 Martin Rex 发现此错误。CVE-2010-4180

   *Steve Henson*

 * 修复了 J-PAKE 实现错误，最初由
   Sebastien Martini 发现，Stefan
   Arentz 和 Feng Hao 提供了更多信息和确认。请注意，此修复程序是一个安全修复程序。CVE-2010-4252

   *Ben Laurie*

### 1.0.0a 和 1.0.0b 之间的更改 [2010 年 11 月 16 日]

 * 修复了扩展代码以避免可能导致缓冲区溢出漏洞的竞态条件：恢复的会话不应被修改，因为它们可能被多个线程共享。CVE-2010-3864

   *Steve Henson*

 * 修复了 WIN32 构建系统，以将 ENGINE 目录正确链接到 DLL。

   *Steve Henson*

### 1.0.0 和 1.0.0a 之间的更改 [2010 年 6 月 1 日]

 * 检查 pkey_rsa_verify 中的 int_rsa_verify 的返回值
   ([CVE-2010-1633])

   *Steve Henson, Peter-Michael Hager <hager@dortmund.net>*

### 0.9.8n 和 1.0.0 之间的更改 [2010 年 3 月 29 日]

 * 添加“缺失”的函数 EVP_CIPHER_CTX_copy()。此函数用于复制密码上下文。操作可以通过 ctrl 机制进行自定义，以便 ENGINE 可以包含其他功能。

   *Steve Henson*

 * 容忍另一种损坏的 PKCS#8 密钥格式：私钥值负数。

   *Steve Henson*

 * 向 x509 工具添加新的 -subject_hash_old 和 -issuer_hash_old 选项，以输出与旧版本 OpenSSL 兼容的哈希值。

   *Willy Weisz <weisz@vcpc.univie.ac.at>*

 * 修复压缩算法处理：如果恢复会话，则使用恢复会话的压缩算法，而不是再次从客户端 hello 中确定。不允许服务器更改算法。

   *Steve Henson*

 * 向命令添加 load_crls() 函数，并清理 load_certs()。向 verify 工具添加选项以允许包含其他 CRL。

   *Steve Henson*

 * 更新 OCSP 请求代码以允许向请求添加自定义标头：某些响应者需要此功能。

   *Steve Henson*

 * 函数 EVP_PKEY_sign() 在错误时返回 <=0：正确检查返回码。

   *Julia Lawall <julia@diku.dk>*

 * 更新 `apps/s_cb.c` 和 `apps/verify.c` 中的 verify 回调代码，它不必要地解引用了结构，使用了过时的函数，并且没有正确处理所有更新的 verify 代码。

   *Steve Henson*

 * 在默认配置中禁用 MD2。

   *Steve Henson*

 * 在 BIO_pop() 和 BIO_push() 中使用 ctrl 参数（之前为 NULL）来指示正在推送或弹出的初始 BIO。这使得可以确定 BIO 是显式调用的还是由于 ctrl 沿链传递的结果。修复 BIO_pop() 和 SSL BIO，使其正确处理引用计数，并且在未显式弹出时不会将 I/O bio 置零。警告：包含旧错误行为的变通方法的应用程序需要修改，否则可能会释放已释放的 BIO。

   *Steve Henson*

 * 将 uni2asc/asc2uni => OPENSSL_uni2asc/OPENSSL_asc2uni 的重命名扩展到所有平台（在 0.9.8 分支中，这在 Netware 平台上是条件性的，以避免名称冲突）。

   *Guenter <lists@gknw.net>*

 * 向 DTLS 添加 ECDHE 和 PSK 支持。

   *Michael Tuexen <tuexen@fh-muenster.de>*

 * 向 safestack.h 添加 CHECKED_STACK_OF 宏，否则 safestack 不能在 C++ 中使用。

   *Steve Henson*

 * 添加“缺失”的函数 EVP_MD_flags()（没有它，检索摘要标志的唯一方法是直接访问结构。更新 `EVP_MD_do_all*()` 和 `EVP_CIPHER_do_all*()` 以将摘要或密码的注册名称包含在“from”参数中。在 dgst 用法消息中打印所有注册的摘要，而不是手动尝试计算它们。

   *Steve Henson*

 * 如果不使用 SSLv2 密码，则不使用与 SSLv2 兼容的客户端 hello：这允许使用压缩和扩展。更改默认密码字符串以删除 SSLv2 密码套件。这有效地默认避免了古老的 SSLv2，除非应用程序密码字符串请求它。

   *Steve Henson*

 * 更改 PKCS12_parse() 中的匹配标准。它过去曾尝试使用本地密钥 ID 来查找匹配的证书和密钥，但某些 PKCS#12 文件不遵循（有些不成文的）规则，并且此策略会失败。现在只需收集所有证书和第一个私钥，然后查找与密钥匹配的第一个证书。

   *Steve Henson*

 * 支持将注册的摘要和密码名称用于 dgst 和 cipher 命令，而无需为每个命令添加特殊处理。因此，您现在可以执行：

           openssl sha256 foo

   以及：

           openssl dgst -sha256 foo

   这对于基于 ENGINE 的算法也有效。

   *Steve Henson*

 * 更新 Gost ENGINE 以支持参数文件。

   *Victor B. Wagner <vitus@cryptocom.ru>*

 * 支持 ca 工具中的 GeneralizedTime。

   *Oliver Martin <oliver@volatilevoid.net>, Steve Henson*

 * 增强用于证书目录链接的哈希格式。新格式使用规范编码（意味着等效名称即使不相同也能工作），并使用 SHA1 而不是 MD5。此格式与旧格式不兼容，因此应使用 c_rehash 来重建符号链接。

   *Steve Henson*

 * 将 PKCS#8 设置为私钥的默认写入格式，取代传统格式。此格式是标准化的，更安全，并且不包含隐式的 MD5 依赖。

   *Steve Henson*

 * 向 Configure 添加 $gcc_devteam_warn 选项。其理念是，提交给 OpenSSL 的任何代码都应至少通过此检查。

   *Steve Henson*

 * 为 EAP-FAST 添加会话票证覆盖功能。

   *Jouni Malinen <j@w1.fi>*

 * 修改 HMAC 函数以返回值。由于这些可以在 ENGINE 中实现，因此可能会发生错误。

   *Steve Henson*

 * 对 OBJ_bsearch_ex 进行类型检查。

   *Ben Laurie*

 * 对 OBJ_bsearch 进行类型检查。由于类型检查而需要进行一些 const 转换。待完成：TXT_DB、bsearch(?)、OBJ_bsearch_ex、qsort、CRYPTO_EX_DATA、ASN1_VALUE、ASN1_STRING、CONF_VALUE。

   *Ben Laurie*

 * 新函数 OPENSSL_gmtime_adj() 用于直接向 tm 结构添加指定天数和秒数，而不是通过特定于操作系统的日期例程。这避免了操作系统例程（如 2038 年问题）的任何问题。为 ASN1 时间结构添加了新的 `*_adj()` 函数，并添加了 X509_time_adj_ex() 以覆盖扩展范围。现有的 X509_time_adj() 仍可用，并且将不再有任何日期问题。

   *Steve Henson*

 * Delta CRL 支持。新的 use deltas 选项将尝试定位和搜索任何可用的适当的 delta CRL。

   这项工作由 Google 赞助。

   *Steve Henson*

 * 支持按原因代码分区的 CRL。重新组织 CRL 处理代码并添加其他评分元素。将备用 CRL 路径作为 CRL 检查的一部分进行验证，并在这种情况下指示新的错误“CRL 路径验证错误”。希望获得更多详细信息的应用程序可以使用 verify 回调并检查新的“parent”字段。如果此字段不为 NULL，则正在进行 CRL 路径验证。现有应用程序将看不到此功能，因为它需要扩展的 CRL 支持，而该支持默认情况下是关闭的。

   这项工作由 Google 赞助。

   *Steve Henson*

 * 支持最新的 CRL 扩展。

   这项工作由 Google 赞助。

   *Steve Henson*

 * 初始间接 CRL 支持。目前仅在直接传递的 CRL 中支持，而不是通过查找。处理证书颁发者 CRL 条目扩展，并通过颁发者名称和序列号查找 CRL 条目。检查和处理 IDP 扩展中的 CRL 颁发者条目。

   这项工作由 Google 赞助。

   *Steve Henson*

 * 添加对不同证书和 CRL 路径的支持。在这种情况下，CRL 颁发者证书会单独验证。仅当设置了扩展 CRL 支持标志时才启用：此标志将在未来启用其他 CRL 功能。

   这项工作由 Google 赞助。

   *Steve Henson*

 * 添加对策略映射扩展的支持。

   这项工作由 Google 赞助。

   *Steve Henson*

 * 修复路径长度约束、自签名证书处理和策略处理，以符合 RFC3280 和 PKITS 测试。

   这项工作由 Google 赞助。

   *Steve Henson*

 * 支持名称约束证书扩展。目前支持 DN、电子邮件、DNS 和 URI 类型。

   这项工作由 Google 赞助。

   *Steve Henson*

 * 为了适应提供基于指针的线程 ID 而非数字的系统，弃用当前的数字线程 ID 机制，并用一个结构和相关的回调类型替换它。此机制允许从任一类型的线程 ID 中提取数字“哈希”，并且在指针大于“long”的平台上，会进行混合以确保即使不能保证唯一性，数字“哈希”也是可用的。默认机制是使用“&errno”作为基于指针的线程 ID 来区分线程。

   希望提供自己的线程 ID 的应用程序现在应该使用 CRYPTO_THREADID_set_callback() 来注册一个回调，该回调将调用 CRYPTO_THREADID_set_numeric() 或 CRYPTO_THREADID_set_pointer()。

   请注意，ERR_remove_state() 现在已弃用，因为它与线程 ID 是数字的这一假设相关联。应将 ERR_remove_state(0)（用于释放当前线程的错误状态）替换为 ERR_remove_thread_state(NULL)。

   （这种新方法取代了 OpenSSL 0.9.9-dev 中在 2006 年 6 月至 2008 年 8 月之间存在的函数 CRYPTO_set_idptr_callback()、CRYPTO_get_idptr_callback() 和 CRYPTO_thread_idptr()。此外，如果应用程序以前提供的数字线程回调不适合区分线程，那么在 OpenSSL 的中间开发版本中，使用 &errno 可能会立即获得唯一性；现在情况不再如此，数字线程回调将覆盖 &errno 的自动使用。）

   *Geoff Thorpe，在 Bodo Moeller 的帮助下*

 * 初始支持不同的 CRL 颁发证书。这涵盖了链中存在的自签名证书以及实际 CRL 颁发者位于现有链中更高位置的简单情况。

   这项工作由 Google 赞助。

   *Steve Henson*

 * 移除了构建中实际上已失效的 crypto/store。

   *Ben Laurie*

 * STACK 的改版，以提供更强的类型检查。待完成：TXT_DB、bsearch(?)、OBJ_bsearch、qsort、CRYPTO_EX_DATA、ASN1_VALUE、ASN1_STRING、CONF_VALUE。

   *Ben Laurie*

 * 添加新的 SSL_MODE_RELEASE_BUFFERS 模式标志，以释放 SSL 连接上未使用的缓冲区 RAM。此选项可以为每个空闲 SSL 节省约 34k。

   *Nick Mathewson*

 * LHASH 的改版，以提供更强的类型检查。待完成：STACK、TXT_DB、bsearch、qsort。

   *Ben Laurie*

 * 基于 RFC3850、RFC3851 和 RFC3852 的 Cryptographic Message Syntax (CMS) 的初始支持。新的 cms 目录和 cms 工具，支持 data、signedData、compressedData、digestedData 和 encryptedData、envelopedData 类型。脚本用于与 RFC4134 示例草案进行检查，并对许多内容类型和变体进行互操作和一致性检查。

   *Steve Henson*

 * 向 enc 工具添加选项以支持使用 zlib 压缩 BIO。

   *Steve Henson*

 * 扩展 mk1mf 以支持从 Configure 脚本导入选项和汇编语言文件，目前仅包含在 VC-WIN32 中。汇编语言规则现在可以选择从相关的 perl 脚本生成源文件。

   *Steve Henson*

 * 实现支持 GOST 密码套件所需的其余功能。已使用 CryptoPro 实现进行了互操作性测试。

   *Victor B. Wagner <vitus@cryptocom.ru>*

 * s390x 汇编器包。

   *Andy Polyakov*

 * ARMv4 汇编器包。ARMv4 指的是 v4 及更高版本的 ISA，而不是 CPU“系列”。

   *Andy Polyakov*

 * 实现 Opaque PRF Input TLS 扩展，如 draft-rescorla-tls-opaque-prf-input-00.txt 所指定。由于这还不是官方规范，并且 IANA 尚未分配扩展类型，因此此扩展（目前）必须在构建 OpenSSL 时显式启用，方法是将扩展号提供给“config”或“Configure”脚本。例如，指定一个选项

           -DTLSEXT_TYPE_opaque_prf_input=0x9527

   来启用该扩展，假设扩展号为 0x9527（这是基于 Internet Draft 的 MD5 哈希的完全任意且非官方的分配）。请注意，这样做可能会导致与其他 TLS 实现的互操作性丢失，因为它们可能将相同的扩展号用于其他目的。

   SSL_set_tlsext_opaque_prf_input(ssl, src, len) 用于设置握手中要使用的不透明 PRF 输入值。这将创建 src 处长度为 len 的字符串的内部副本，并返回非零表示成功。

   为了获得更多控制和灵活性，请通过使用

           SSL_CTX_set_tlsext_opaque_prf_input_callback(ctx, cb)
           SSL_CTX_set_tlsext_opaque_prf_input_callback_arg(ctx, arg)

   来提供回调函数，其中

           int (*cb)(SSL *, void *peerinput, size_t len, void *arg);
           void *arg;

   回调函数 'cb' 将在握手中被调用，并应根据需要使用 SSL_set_tlsext_opaque_prf_input()。参数 'arg' 用于应用程序目的（提供给 SSL_CTX_set_tlsext_opaque_prf_input_callback_arg() 的值将直接提供给回调函数）。回调函数必须返回非零表示成功：通常为 1 表示仅在可能时使用不透明 PRF 输入，或 2 表示强制使用不透明 PRF 输入。在后一种情况下，如果无法成功协商不透明 PRF 输入，库将中止握手。

   在客户端的情况下，传递给回调函数的参数 'peerinput' 和 'len' 始终为 NULL 和 0。服务器将通过这些变量看到客户端的不透明 PRF 输入（如果可用，否则为 NULL 和 0）。请注意，如果服务器提供不透明 PRF 输入，则长度必须与客户端不透明 PRF 输入的长度相同。

   请注意，回调函数仅在创建新会话时（会话恢复可以恢复之前协商的内容）被调用，并且不会在 SSL 2.0 握手中被调用；因此，对于需要强制使用不透明 PRF 输入的应用程序，特别推荐使用 SSL_CTX_set_options(ctx, SSL_OP_NO_SSLv2) 或 SSL_set_options(ssl, SSL_OP_NO_SSLv2)。

   *Bodo Moeller*

 * 更新 ssl 代码以支持除 SHA1+MD5 之外的摘要用于握手 MAC。

   *Victor B. Wagner <vitus@cryptocom.ru>*

 * 向 OpenSSL 添加 RFC4507 支持。这包括 RFC4507bis 中的更正。加密票证格式是加密编码的 SSL_SESSION 结构，因此新会话功能会自动支持。

   如果客户端应用程序在 SSL_SESSION 结构中缓存会话，则支持是透明的，因为票证现在存储在编码的 SSL_SESSION 中。

   SSL_CTX 结构会自动为服务器中的票证保护生成密钥，因此再次支持应该无需应用程序修改即可实现。

   如果客户端或服务器希望禁用 RFC4507 支持，则可以设置选项 SSL_OP_NO_TICKET。

   添加 TLS 扩展调试回调，以允许检查任何客户端或服务器扩展的内容。

   这项工作由 Google 赞助。

   *Steve Henson*

 * 最终更改以避免在 OpenSSL 中使用指针指针转换。OpenSSL 现在应该可以在 gcc 4.2 上干净地编译。

   *Peter Hartley <pdh@utter.chaos.org.uk>, Steve Henson*

 * 更新 SSL 库以使用新的 EVP_PKEY MAC API。包括通用的 MAC 支持，包括流式 MAC 支持：这对于 GOST 密码套件支持是必需的。

   *Victor B. Wagner <vitus@cryptocom.ru>, Steve Henson*

 * 向 smime 工具添加 -stream 选项以使用 PKCS#7 流式处理。新的函数 i2d_PKCS7_bio_stream() 和 PEM_write_PKCS7_bio_stream() 以 BER 和 PEM 格式输出。

   *Steve Henson*

 * 对 HMAC 的实验性支持，通过 EVP_PKEY 接口使用。这允许通过 `EVP_DigestSign*()` 接口处理 HMAC。在这种情况下，EVP_PKEY“密钥”是 HMAC 密钥，可能允许 ENGINE 支持无法提取的 HMAC 密钥。dgst 工具的新 -mac 和 -macopt 选项。

   *Steve Henson*

 * dgst 工具的新选项 -sigopt。更新 dgst 以使用 `EVP_Digest{Sign,Verify}*`。这两个更改使得可以在 dgst 工具中使用替代签名参数，例如 X9.31 或 PSS。

   *Steve Henson*

 * 更改 ssl_cipher_apply_rule()，这是每次密码套件字符串请求启用（“foo+bar”）、移动（“+foo+bar”）、禁用（“-foo+bar”或“!foo+bar”）一类密码套件时执行工作的内部函数：现在它维护禁用密码套件的顺序，使得最近从启用变为禁用的密码套件不仅在彼此之间保持顺序，而且在下次再次启用密码套件时具有比其他禁用密码套件更高的优先级。

   这意味着您现在可以指定，例如，“PSK:-PSK:HIGH”来启用与“HIGH”相同的密码套件，但顺序特定，其中 PSK 密码套件排在前面（因为它们是解析“HIGH”时最近禁用的密码套件）。

   此外，更改 ssl_create_cipher_list()（使用此新功能），使得在否则相同的密码套件之间，默认顺序中优先使用临时 ECDH 而不是临时 DH。

   *Bodo Moeller*

 * 更改 ssl_create_cipher_list()，使其在开始处理规则字符串之前自动按合理的顺序排列密码套件。因此，“DEFAULT”（SSL_DEFAULT_CIPHER_LIST）的定义现在只是“ALL:!aNULL:!eNULL”，但仍然等同于`"AES:ALL:!aNULL:!eNULL:+aECDH:+kRSA:+RC4:@STRENGTH"`。这使得应用程序更容易获得合理的默认顺序，对于那些匿名密码是可接受的（意味着您实际上无法使用 DEFAULT）。

   *Bodo Moeller；由 Victor Duchovni 建议*

 * 将 SSL/TLS 算法掩码（用于密码套件字符串处理）拆分为多个整数，而不是设置“SSL_MKEY_MASK”位、“SSL_AUTH_MASK”位、“SSL_ENC_MASK”、“SSL_MAC_MASK”和“SSL_SSL_MASK”位在一个整数中。（这些掩码以及各个位定义都隐藏在非导出的接口 ssl/ssl_locl.h 中，因此对 SSL_CIPHER 结构的此更改不应影响应用程序。）这为每个类别提供了更多位，因此不再需要将 AES128 和 AES256 合并为一个算法位，并将 Camellia128 和 Camellia256 合并为一个算法位，这导致了各种笨拙的解决方法。

   因此，除其他外，0.9.7m 和 0.9.8e 中引入的用于独立于 AES128 屏蔽 AES256 或独立于 AES256 屏蔽 Camellia256 的笨拙解决方法在这里 0.9.9 中不再需要。

   随着此更改，我们还引入了迄今为止缺失的新密码套件别名：“AES128”、“AES256”、“CAMELLIA128”和“CAMELLIA256”。

   *Bodo Moeller*

 * 添加对 dsa-with-SHA224 和 dsa-with-SHA256 的支持。
   如果签名输入大于素数 q（N 是 q 的字节大小），则使用签名输入的左侧 N 字节。

   *Nils Larsch*

 * 非常非常实验性的 PKCS#7 流式编码器支持。目前尚无任何东西使用它，并且它在很大程度上未经测试。

   *Steve Henson*

 * 添加对 ecdsa-with-SHA224/256/384/512 签名类型的支持。

   *Nils Larsch*

 * 避免在 OpenSSL 中使用函数转换的初始不完整更改，某些编译器（gcc 4.2 及更高版本）会拒绝使用它们。Safestack 已重新实现。更新 ASN1 以避免使用旧函数。

   *Steve Henson*

 * Win32/64 目标链接到 Winsock2。

   *Andy Polyakov*

 * 添加 X509_CRL_METHOD 结构，允许将 CRL 处理重定向到外部函数。这可用于提高 CRL 处理效率，尤其是在 CRL 非常大时，例如通过将 CRL 撤销的证书存储在数据库中。

   *Steve Henson*

 * 彻底改造 by_dir 代码。添加对动态加载 CRL 的支持，以便可以使用添加到目录的新 CRL。s_client 和 s_server 的新命令行选项 -verify_return_error。这会导致 verify 回调返回实际错误，而不是继续进行，无论如何。这反映了“真实世界”verify 回调的行为方式。

   *Steve Henson*

 * GOST 引擎，支持多种 GOST 算法和公钥格式。
   由 Cryptocom 捐赠。

   *Cryptocom*

 * 对颁发分发点 CRL 扩展的部分支持。处理按 DP 分区的 CRL，但尚未处理间接 CRL 或原因分区。彻底改造 CRL 处理：现在通过评分技术选择最合适的 CRL，该技术处理 CRL 中的 IDP 和 AKID。

   *Steve Henson*

 * 新的 X509_STORE_CTX 回调 lookup_crls() 和 lookup_certs()，最终将用于所有验证操作：这将消除 X509_STORE 对证书验证的依赖，并允许替代查找方法。这些两个回调的基于 X509_STORE 的实现。

   *Steve Henson*

 * 允许 X509_STORE 中存在多个具有匹配颁发者名称的 CRL。修改 get_crl() 以在可能的情况下查找有效的（未过期）CRL。

   *Steve Henson*

 * 新函数 X509_CRL_match() 用于检查两个 CRL 是否相同。通常，这将被调用为 X509_CRL_cmp()，但该名称已被仅比较 CRL 颁发者名称的函数使用。缓存 X509_CRL 结构中的几个 CRL 扩展，并将 X509 中的 CRLDP 缓存起来。

   *Steve Henson*

 * 存储 X509_NAME 结构（ASN1 名称）的“规范”表示，这会将等效的 X509_NAME 结构映射到一致的结构。然后可以使用 memcmp() 快速执行名称比较。

   *Steve Henson*

 * 非阻塞 OCSP 请求处理。向 ocsp 工具添加 -timeout 选项。

   *Steve Henson*

 * 允许摘要通过 ctrl EVP_MD_CTRL_MICALG 提供自己的 micalg 字符串以用于 S/MIME 类型。

   *Steve Henson*

 * 在 PKCS7 签名期间，通过 EVP_PKEY_CTRL_PKCS7_SIGN ctrl 在签名之前和之后将 PKCS7 SignerInfo 结构传递给 EVP_PKEY_METHOD。然后，它可以根据需要自定义签名之前的和/或之后的结构。

   *Steve Henson*

 * 新函数 OBJ_add_sigid() 以允许将应用程序定义的签名 OID 添加到 OpenSSL 的内部表中。新函数 OBJ_sigid_free() 以释放任何添加的签名 OID。

   *Steve Henson*

 * 新函数 EVP_CIPHER_do_all()、EVP_CIPHER_do_all_sorted()、EVP_MD_do_all() 和 EVP_MD_do_all_sorted() 用于枚举内部摘要和密码表。openssl 工具添加了新选项：list-message-digest-algorithms 和 list-cipher-algorithms。

   *Steve Henson*

 * 更改二进制多项式的数组表示：非零系数度数列表现在以 -1 终止。以前它以 0 终止，0 也是值的一部分；因此，数组表示不适用于系数为零的多项式 t^0。此更改使得数组表示在更一般的上下文中可用。

   *Douglas Stebila*

 * 对 SSL/TLS 密码字符串处理的各种修改和修复。对于 ECC，代码现在区分固定 ECDH 与 RSA 证书和 ECDSA 证书，因为它们是不同的密码套件。已删除 Fortezza 密码套件的未使用代码。

   为了与 EDH 一致，临时 ECDH 现在称为“EECDH”（而不是“ECDHE”）。为了与 DH 证书的代码一致，使用 ECDH 证书现在被视为 ECDH 身份验证，而不是 RSA 或 ECDSA 身份验证（后者仅仅是 CA 的签名算法，而不是在协议中主动使用的）。

   临时密码套件别名“ECCdraft”不再可用，ECC 密码套件不再从“ALL”和“DEFAULT”中排除。现在存在以下 RFC 4492 密码套件的别名，其中大多数是类比于 DH 情况的：

           kECDHr   - ECDH 证书，用 RSA 签名
           kECDHe   - ECDH 证书，用 ECDSA 签名
           kECDH    - ECDH 证书（用 RSA 或 ECDSA 签名）
           kEECDH   - 临时 ECDH
           ECDH     - ECDH 证书或临时 ECDH

           aECDH    - ECDH 证书
           aECDSA   - ECDSA 证书
           ECDSA    - ECDSA 证书

           AECDH    - 匿名 ECDH
           EECDH    - 非匿名临时 ECDH（等同于“kEECDH:-AECDH”）

   *Bodo Moeller*

 * 为 AES 和 GOST 密码（如果支持）添加额外的 S/MIME 功能。
   根据签名消息中的摘要使用正确的 micalg 参数。

   *Steve Henson*

 * 为 EVP_PKEY_ASN1_METHOD 添加引擎支持。添加处理 ENGINE asn1 方法的函数。支持 ASN1 代码中的 ENGINE 查找。

   *Steve Henson*

 * 为 EVP_PKEY_METHOD 添加初始引擎支持。新函数允许引擎注册一个方法。添加用于方法和功能引用处理的 ENGINE 查找。

   *Steve Henson*

 * 新函数 `EVP_Digest{Sign,Verify}*`。这些是 `EVP_{Sign,Verify}*` 的增强版本，允许应用程序自定义签名过程。

   *Steve Henson*

 * smime 工具的新 -resign 选项。这向现有的 PKCS#7 signedData 结构添加了一个或多个签名者。还添加了 -md 选项以使用替代消息摘要算法进行签名。

   *Steve Henson*

 * 整理 PKCS#7 例程并添加新函数，以便更容易创建包含多个签名者的 PKCS7 结构。更新 smime 应用程序以支持多个签名者。

   *Steve Henson*

 * pkcs12 工具的新 -macalg 选项，允许设置替代摘要 MAC。

   *Steve Henson*

 * 对 PKCS#5 v2.0 PRF 的初始支持，默认 SHA1 HMAC 除外。
   重组 PBE 内部以使用 NID 从静态表中查找，添加对 HMAC PBE OID 翻译的支持。添加 EVP_CIPHER ctrl：EVP_CTRL_PBE_PRF_NID，这允许密码指定一个替代 PRF，该 PRF 将与 PBES2 自动一起使用。

   *Steve Henson*

 * 将“req”中生成密钥的算法特定调用替换为新 API。

   *Steve Henson*

 * 更新 PKCS#7 enveloped data 例程以使用新 API。现在任何支持加密操作的公钥方法都支持此功能。添加了一个 ctrl 以允许公钥算法检查或修改 PKCS#7 RecipientInfo 结构（如果需要）：对于 RSA，这是一个 no op。

   *Steve Henson*

 * 向 asn1 方法添加一个 ctrl，允许公钥算法表达默认摘要类型。在大多数情况下，这将是 SHA1，但某些算法（如 GOST）需要指定替代摘要。返回值表示首选项的强度：1 表示可选，2 表示强制（即它是唯一支持的类型）。修改 ASN1_item_sign() 以接受 NULL 摘要参数，表示应使用默认 md。更新 openssl 工具以在未明确指示时使用默认摘要类型进行签名。

   *Steve Henson*

 * 在 ASN1_sign() 和 ASN1_verify() 中使用 OID 交叉引用表。新的 EVP_MD 标志 EVP_MD_FLAG_PKEY_METHOD_SIGNATURE。这使用了密钥类型的相关签名方法。这有效地消除了摘要和公钥类型之间的链接。

   *Steve Henson*

 * 添加 OID 交叉引用表和实用函数。其目的是在签名 OID（如 SHA1WithrsaEncryption）和 SHA1、rsaEncryption 之间进行转换。这将允许移除一些用于使用正确 OID 所需的算法特定 hack。

   *Steve Henson*

 * 在为 PKCS7_sign() 设置 PKCS7_SIGNER_INFO 结构时，移除算法特定依赖。它们现在由相关的公钥 ASN1 方法设置。

   *Steve Henson*

 * 添加具有 ECDSA 和 ECDH 支持的临时 EC pkey 方法。

   *Steve Henson*

 * 添加对密钥派生（协议）的支持，包括 API、DH 方法和 pkeyutl。

   *Steve Henson*

 * 添加 DSA pkey 方法和 DH pkey 方法，扩展 DH ASN1 方法以支持公钥和私钥格式。作为副作用，这些增加了以前不可用的其他命令行功能：可以使用 pkeyutl 生成和验证 DSA 签名，并在 pkey、genpkey 中支持和生成 DH 密钥。

   *Steve Henson*

 * BeOS 支持。

   *Oliver Tappe <zooey@hirschkaefer.de>*

 * 新的 make 目标 "install_html_docs" 安装手册页的 HTML 版本。

   *Oliver Tappe <zooey@hirschkaefer.de>*

 * 新的实用程序 "genpkey"，它类似于 "genrsa" 等，但它可以生成任何算法的密钥。扩展和更新 EVP_PKEY_METHOD 以支持密钥和参数生成，并为 RSA 添加初始密钥生成功能。

   *Steve Henson*

 * 为主要的 EVP_PKEY_method 操作添加函数。未记录的函数 `EVP_PKEY_{encrypt,decrypt}` 已重命名为 `EVP_PKEY_{encrypt,decrypt}_old`。

   *Steve Henson*

 * EVP_PKEY_METHOD 的初始定义。这将是一个高级公钥 API，目前功能不多。

   *Steve Henson*

 * 新函数 EVP_PKEY_asn1_get0_info() 以检索有关公钥算法的信息。openssl 工具的新选项：“list-public-key-algorithms”以打印信息。

   *Steve Henson*

 * 实现 RFC 4492 中 ECC 密码套件的受支持椭圆曲线扩展。

   *Douglas Stebila*

 * 在 OBJ_cleanup() 中不要释放 OID，如果它们被 EVP_MD 或 EVP_CIPHER 结构使用，以避免以后在 EVP_cleanup() 中出现问题。

   *Steve Henson*

 * 新的实用程序 pkey 和 pkeyparam。它们类似于特定算法的实用程序，如 rsa、dsa、dsaparam 等，但它们处理任何类型的密钥。

   *Steve Henson*

 * 将公钥打印例程转移到 EVP_PKEY_ASN1_METHOD。新函数 EVP_PKEY_print_public()、EVP_PKEY_print_private()、EVP_PKEY_print_param() 用于从 EVP_PKEY 结构打印公钥数据。

   *Steve Henson*

 * 对可插拔公钥 ASN1 的初始支持。
   解开公钥 ASN1 处理的混乱。将公钥和私钥 ASN1 处理移至新的 EVP_PKEY_ASN1_METHOD 结构。将算法特定处理移至相关算法目录内的单个模块。添加函数以允许（近乎）不透明地处理公钥和私钥结构。

   *Steve Henson*

 * 实现 ECC 密码套件的受支持点格式扩展，来自 draft-ietf-tls-ecc-12.txt。

   *Douglas Stebila*

 * 添加对 RFC 4279 PSK TLS 密码套件的初始支持。向 SSL_SESSION、SSL 和 SSL_CTX 结构添加了 psk 身份 [提示] 和 psk 回调函数的成员。

   新密码套件：
           PSK-RC4-SHA, PSK-3DES-EDE-CBC-SHA, PSK-AES128-CBC-SHA,
           PSK-AES256-CBC-SHA

   新函数：
           SSL_CTX_use_psk_identity_hint
           SSL_get_psk_identity_hint
           SSL_get_psk_identity
           SSL_use_psk_identity_hint

   *Mika Kousa 和 Pasi Eronen（诺基亚公司）*

 * 添加符合 RFC 3161 的时间戳请求创建、响应生成和响应验证功能。

   *Zoltán Glózik <zglozik@opentsa.org>, The OpenTSA Project*

 * 添加对 TLS 扩展的初始支持，目前仅限于 server_name 扩展。SSL_SESSION、SSL_CTX 和 SSL 数据结构现在具有用于主机名的成员。SSL 数据结构有一个额外的成员 `SSL_CTX *initial_ctx`，以便可以将新会话存储在该上下文中以允许会话恢复，即使在 SSL 已根据客户端的 server_name 扩展切换到新的 SSL_CTX 之后也是如此。

   新函数（可能更改）：

           SSL_get_servername()
           SSL_get_servername_type()
           SSL_set_SSL_CTX()

   新 CTRL 代码和宏（可能更改）：

           SSL_CTRL_SET_TLSEXT_SERVERNAME_CB
                               - SSL_CTX_set_tlsext_servername_callback()
           SSL_CTRL_SET_TLSEXT_SERVERNAME_ARG
                                    - SSL_CTX_set_tlsext_servername_arg()
           SSL_CTRL_SET_TLSEXT_HOSTNAME           - SSL_set_tlsext_host_name()

   openssl s_client 有新的 '-servername ...' 选项。

   openssl s_server 有新选项 '-servername_host ...', '-cert2 ...',
   '-key2 ...', '-servername_fatal'（可能更改）。这允许测试特定单个主机名的 HostName 扩展（'-cert' 和 '-key' 仍然是未进行 HostName 协商的握手的后备选项）。如果必须发送 unrecognized_name 警报，默认情况下这是一个警告；使用 '-servername_fatal' 选项时，它会变成致命的。

   *Peter Sylvester, Remy Allais, Christophe Renou*

 * 添加了 Whirlpool 哈希实现。

   *Andy Polyakov*

 * 64 位 SPARCv9 目标上的 BIGNUM 代码从 bn(64,64) 切换到 bn(64,32)。由于指令集限制，这对性能没有负面影响。这主要是为了能够轻松地在 32 位和 64 位构建之间共享汇编模块，例如 bn_mul_mont 实现。

   *Andy Polyakov*

 * 将以前被排除在文件 crypto/ec/ec2_smpt.c 中的代码移至 ec2_smpl.c，并且不再需要 OPENSSL_EC_BIN_PT_COMP 宏。

   *Bodo Moeller*

 * 引入了 BIGNUM 汇编器实现的新候选者 bn_mul_mont，这是一个专用的 Montgomery 乘法过程。修改了 BN_MONT_CTX 以允许 bn_mul_mont 在某些 32 位目标上达到更高的“64 位”性能。

   *Andy Polyakov*

 * SSL 结构中新的 SSL_OP_NO_COMP 选项可选择性地禁用压缩。新的 SSL ctrl 用于设置最大发送片段大小。通过动态设置 I/O 缓冲区大小而不是使用最大可用值来节省内存。

   *Steve Henson*

 * 'openssl ciphers' 的新选项 -V。这除了文本详细信息外，还打印密码套件代码。

   *Bodo Moeller*

 * 非常非常初步的 EXPERIMENTAL 支持打印通用 ASN1 结构。目前输出相当难看，并且根本不处理几个自定义结构。

   *Steve Henson*

 * 集成了对 PVK 文件格式和一些相关格式（如 MS PUBLICKEYBLOB 和 PRIVATEKEYBLOB）的支持。'rsa' 和 'dsa' 工具中的命令行开关以支持这些格式。

   *Steve Henson*

 * 支持 rsa 工具命令行上的 PKCS#1 RSAPublicKey 格式。

   *Steve Henson*

 * 移除旧的 ASN1_METHOD 代码。这仅在以前的一个地方用于（非常旧的）“NETSCAPE”格式证书，这些证书现在使用新的 ASN1 代码等效项进行处理。

   *Steve Henson*

 * 让 TLSv1_method() 等函数返回一个 'const' SSL_METHOD 指针，并将 SSL_CTX_new、SSL_CTX_set_ssl_version 和 SSL_set_ssl_method 中的 SSL_METHOD 参数设为 'const'。

   *Nils Larsch*

 * 修改 CRL 分发点扩展代码以打印以前不支持的字段。增强扩展设置代码以允许设置所有字段。

   *Steve Henson*

 * 添加对颁发分发点 CRL 扩展的打印和设置支持。

   *Steve Henson*

 * 更改 'Configure' 脚本以默认启用 Camellia。

   *NTT*

OpenSSL 0.9.x
-------------

### 0.9.8m 和 0.9.8n 之间的变更 [2010年3月24日]

* 当因版本号不正确而拒绝 SSL/TLS 记录时，切勿使用新的主版本号更新 s->server。根据
  - OpenSSL 0.9.8m，如果 'short' 是一个 16 位类型，
  - OpenSSL 0.9.8f，如果 'short' 大于 16 位，
  之前的行为可能导致在接收特定不正确的 SSL/TLS 记录且记录负载保护处于活动状态时，尝试读取 NULL。([CVE-2010-0740])

  *Bodo Moeller, Adam Langley <agl@chromium.org>*

* 修复 CVE-2010-0433，其中某些启用了 Kerberos 的 OpenSSL 版本可能崩溃，如果相关表不存在（例如，chrooted）。

  *Tomas Hoger <thoger@redhat.com>*

### 0.9.8l 和 0.9.8m 之间的变更 [2010年2月25日]

* 始终检查 bn_wexpand() 的返回值是否失败。([CVE-2009-3245])

  *Martin Olsson, Neel Mehta*

* 修复 X509_STORE 锁定：每次访问 'objs' 都需要锁定（以适应堆栈排序，始终是写锁定！）。

  *Bodo Moeller*

* 在某些 WIN32 版本中，Heap32Next 非常慢。这可能导致 RAND_poll() 出现过度延迟：超过一分钟。作为一种变通方法，在内部 Heap32Next 循环中也包含一个时间检查。

  *Steve Henson*

* 处理 SSL/TLS 数据刷新时，最初使用 BIO_CTRL_INFO ctrl 来查看是否有任何数据在等待。这导致了 PR#1949 中概述的问题。然而，那里建议的修复可能会触发有问题的 BIO_CTRL_WPENDING（例如，某些 Apache 版本）。因此，改为简化代码以无条件刷新。这应该是可以的，因为刷新没有数据要刷新是一个空操作。

  *Steve Henson*

* 正确处理 TLS 版本 2.0 及更高版本，并正确使用支持的最高 TLS/SSL 版本。尽管 TLS >= 2.0 还有一段距离，但旧服务器倾向于长期存在……

  *Steve Henson*

* 修改压缩代码，使其在不使用 ex_data 回调的情况下释放结构。这可以解决某些应用程序在应用程序退出前（例如，重新启动时）调用 CRYPTO_cleanup_all_ex_data() 然后稍后使用压缩（例如，带压缩的 SSL）的问题。这会导致显著的每个连接内存泄漏，并已导致一些安全问题，包括 CVE-2008-1678 和 CVE-2009-4355。

  *Steve Henson*

* 使 crypto/cast（即 <openssl/cast.h>）成为 const：CAST_KEY 在加密或解密时不会改变。

  *Bodo Moeller*

* 添加选项 SSL_OP_LEGACY_SERVER_CONNECT，它允许客户端连接并与不支持 RI 的服务器重新协商。在 RI 部署更广泛之前，此选项默认启用。

  *Steve Henson*

* 添加“缺失的”ssl ctrls 以清除选项和模式。

  *Steve Henson*

* 如果客户端尝试重新协商但不支持 RI，则根据 RFC5746 的要求响应 no_renegotiation 警报。一些重新协商的 TLS 客户端在收到警报时会优雅地继续连接。不幸的是，OpenSSL 错误地处理了这个警报，并会挂起等待一个它永远不会收到的服务器 hello。现在我们将收到的 no_renegotiation 警报视为致命错误。这是因为请求重新协商的应用程序很可能期望它成功，并且没有代码来处理服务器拒绝它，因此唯一安全的操作是终止连接。

  *Steve Henson*

* 添加 ctrl 宏 SSL_get_secure_renegotiation_support()，它返回 1 表示对等方支持安全重新协商，否则返回 0。在 s_client/s_server 中打印对等方重新协商支持。

  *Steve Henson*

* 用更新的 NID 创建版本替换了严重损坏且已弃用的 SPKAC 证书方法。这应该可以正确处理 UTF8。

  *Steve Henson*

* 实现 RFC5746。重新启用重新协商，但根据需要要求扩展。不幸的是，SSL3_FLAGS_ALLOW_UNSAFE_LEGACY_RENEGOTIATION 被证明是一个坏主意。它已被 SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION 取代，可以通过 SSL_CTX_set_options() 设置。除非您知道自己在做什么，否则强烈不建议这样做。

  *Eric Rescorla <ekr@networkresonance.com>, Ben Laurie, Steve Henson*

* 修复了无状态会话恢复处理。在颁发和尝试解密票证时使用 initial_ctx，以防在服务器名称处理期间发生更改。在尝试无状态会话恢复时使用非零长度的会话 ID：这使得在收到服务器 hello 后立即确定是否已发生恢复成为可能（OpenSSL 中的多个地方都巧妙地假设了这一点），而不是在握手后期。

  *Steve Henson*

* ENGINE_ctrl()、OPENSSL_isservice()、CMS_get1_RecipientRequest() 和 RAND_bytes() 函数可能因错误而返回 <=0，修复了少数未正确检查返回代码的地方。

  *Julia Lawall <julia@diku.dk>*

* 向 Configure 脚本添加 --strict-warnings 选项，以在其他配置中包含 devteam 警告。

  *Steve Henson*

* 添加对 --libdir 选项和 makefile 中 LIBDIR 变量的支持。这使得可以将 openssl 库安装在名称不是“lib”的位置，例如某些系统需要的“/usr/lib64”。

  *Steve Henson，基于 Jeremy Utley 的补丁*

* 不允许在 OID 中使用前导 0x80。这违反了 X690 8.9.12，并可能产生一些误导性的 OID 文本输出。

  *Steve Henson，由 Dan Kaminsky 报告*

* 从算法表中删除 MD2。这遵循了多个标准中的建议，即由于存在一些加密弱点，不应在新应用程序中使用它。出于二进制兼容性原因，MD2 API 默认仍被编译。

  *Steve Henson*

* 向 {d2i,i2d}_SSL_SESSION 添加压缩 ID，以便正确保存和恢复。

  *Steve Henson*

* 在 Netware 平台上，将 uni2asc 和 asc2uni 函数重命名为 OPENSSL_uni2asc 和 OPENSSL_asc2uni，以避免名称冲突。

  *Guenter <lists@gknw.net>*

* 修复服务器证书链构建代码以使用 X509_verify_cert()，它曾经有一个临时的构建器，除了简单的链之外无法处理任何其他情况。

  *David Woodhouse <dwmw2@infradead.org>, Steve Henson*

* 默认不检查自签名证书签名（可以通过标志覆盖）：这只是浪费时间而没有增加任何安全性。作为一个有用的副作用，带有非 FIPS 摘要的自签名根 CA 现在可以在 FIPS 模式下使用。

  *Steve Henson*

* 在 dtls1_process_out_of_seq_message() 中，缺少对当前消息是否已缓冲的检查。对于每个新消息都会分配内存，允许攻击者通过发送乱序的握手消息来执行拒绝服务攻击，直到没有内存为止。此外，即使序列号没有意义并且将属于另一个握手，所有未来的消息都会被缓冲。因此，只有提前 10 个序列号的消息才会被缓冲。([CVE-2009-1378])

  *Robin Seggelmann，由 Daniel Mentz 发现*

* 如果记录以未来的 epoch 到达，则会缓冲这些记录，以便在完成相应的握手后进行处理。目前对此缓冲区没有限制，允许攻击者通过发送具有未来 epoch 的记录来执行 DOS 攻击，直到没有内存为止。此补丁添加了 pqueue_size() 函数来确定缓冲区的大小，并将记录缓冲区限制为 100 个条目。([CVE-2009-1377])

  *Robin Seggelmann，由 Daniel Mentz 发现*

* 保留 frag->msg_header.frag_len 的副本，以便在父结构被释放后使用。([CVE-2009-1379])

  *Daniel Mentz*

* 在 SSL_shutdown() 调用中正确处理非阻塞 I/O。

  *Darryl Miles <darryl-mailinglists@netbauds.net>*

* 添加 `2.5.4.*` OID

  *Ilya O. <vrghost@gmail.com>*

### 0.9.8k 和 0.9.8l 之间的变更 [2009年11月5日]

* 完全禁用重新协商 - 这修复了一个严重的安全性问题 ([CVE-2009-3555])，但代价是破坏了所有重新协商。可以通过在运行时设置 s3->flags 中的 SSL3_FLAGS_ALLOW_UNSAFE_LEGACY_RENEGOTIATION 来重新启用重新协商。除非您知道自己在做什么，否则强烈不建议这样做。

  *Ben Laurie*

### 0.9.8j 和 0.9.8k 之间的变更 [2009年3月25日]

* 在释放结构时不要将 val 设置为 NULL，它由底层代码释放。如果 `sizeof(void *) > sizeof(long)`，这可能导致零化超出有效字段。([CVE-2009-0789])

  *Paolo Ganci <Paolo.Ganci@AdNovum.CH>*

* 修复了 CMS_SignerInfo_verify_content() 的返回值未被正确检查的错误。这可能允许一些无效的签名属性看似正确地验证。([CVE-2009-0591])

  *Ivan Nestlerode <inestlerode@us.ibm.com>*

* 拒绝具有无效长度的 UniversalString 和 BMPString 类型。这可以防止 ASN1_STRING_print_ex() 中的崩溃，该函数假定字符串具有合法长度。([CVE-2009-0590])

  *Steve Henson*

* 将 S/MIME 签名设置为默认目的，而不是无条件设置。这允许应用程序在存储级别覆盖它。

  *Steve Henson*

* 允许 ASN1 字符串的受限递归。这在实践中是处理某些结构所必需的。

  *Steve Henson*

* 提高 mem_gets 的效率：不要每次都搜索整个缓冲区以查找 '\n'

  *Jeremy Shapiro <jnshapir@us.ibm.com>*

* openssl rand 的新 -hex 选项。

  *Matthieu Herrb*

* 在解析 ASN1 时打印 UTF8String 和 NumericString。

  *Steve Henson*

* 支持名称组件的 NumericString 类型。

  *Steve Henson*

* 允许环境变量 CC 覆盖自动选择的编译器。请注意，不会采取任何措施来确保标志与所选编译器一起正常工作。

  *Ben Laurie*

### 0.9.8i 和 0.9.8j 之间的变更 [2009年1月7日]

* 正确检查 EVP_VerifyFinal() 和类似函数的返回值([CVE-2008-5077])。

  *Ben Laurie, Bodo Moeller, Google Security Team*

* 默认启用 TLS 扩展。

  *Ben Laurie*

* 允许加载 CHIL 引擎，无论应用程序是否多线程。（这并不能免除开发人员设置动态锁定回调的义务。）

  *Sander Temme <sander@temme.net>*

* 如果 dgst 命令出错，则使用正确的退出代码。

  *Steve Henson；由 Roland Dirlewanger 指出问题*

* 调整 Configure，以便需要说“experimental-jpake”才能启用 JPAKE，并且需要在应用程序中使用 -DOPENSSL_EXPERIMENTAL_JPAKE。

  *Bodo Moeller*

* 添加实验性 JPAKE 支持，包括 s_client 和 s_server 中的演示身份验证。

  *Ben Laurie*

* 在 v3_addr_canonize() 中设置比较函数。

  *Rob Austein <sra@hactrn.net>*

* 添加对 s_client 中 XMPP STARTTLS 的支持。

  *Philip Paeps <philip@freebsd.org>*

* 更改服务器端 SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG 的行为，以确保即使使用此选项，也只接受服务器首选列表中的密码套件。（请注意，该选项仅在恢复会话时适用，因此之前的行为仅涉及对称加密的算法选择。）

  *Bodo Moeller*

### 0.9.8h 和 0.9.8i 之间的变更 [2008年9月15日]

* 如果 DTLS 服务器收到 ChangeCipherSpec 作为第一个记录，则修复 NULL 指针解引用([CVE-2009-1386])。

  *PR #1679*

* 修复 s3_srvr.c 和 d1_srvr.c 中的状态转换（使用了 SSL3_ST_CW_CLNT_HELLO_B，应该是 `..._ST_SW_SRVR_...`）。

  *Nagendra Modadugu*

* 0.9.8c 中声称已消除不安全的双重检查锁定问题的修复程序对于 RSA 盲化不完整，仅解决了三重检查锁定中的一个层级，而实际上是三重不安全的。

  现在通过在 crypto/rsa/rsa_eay.c 中弃用 MONT_HELPER 宏来真正解决此问题。

  *Bodo Moeller；由 Marius Schilder 指出问题*

* 各种预防措施：

  - 避免 HASH_UPDATE (md32_common.h) 中的 size_t 整型溢出。

  - 避免 d2i_SSL_SESSION() (ssl_asn1.c) 中的缓冲区溢出。（注意：这需要了解会话密钥才能利用，在这种情况下，无论如何都会很麻烦。）

  - 更改 bn_nist.c，使其能够正确处理超出预期范围的输入 BIGNUM。

  - 在 BN_div() (bn_div.c) 中强制执行 'num' 检查，以用于非 BN_DEBUG 构建。

  *Neel Mehta, Bodo Moeller*

* 允许“软加载”引擎 - 即，如果加载失败，则可以选择不退出。对发行版有用。

  *Ben Laurie 和 FreeBSD 团队*

* 添加对 PKCS#12 文件中本地计算机密钥集属性的支持。

  *Steve Henson*

* 修复 BN_GF2m_mod_arr() 的顶部位清理代码。

  *Huang Ying*

* 扩展 ENGINE 以支持引擎提供的 SSL 客户端证书函数。

  这项工作由 Logica 赞助。

  *Steve Henson*

* 添加 CryptoAPI ENGINE 以支持使用存储在 Windows 密钥存储中的 RSA 和 DSA 密钥。也支持 SSL/TLS 客户端身份验证。除非为 Configure 指定了 enable-capieng，否则不编译。

  这项工作由 Logica 赞助。

  *Steve Henson*

* 修复 X509_ATTRIBUTE 创建中的错误：如果设置了 MBSTRING 标志，则不要使用 ASN1_TYPE_set1 设置属性。此错误将导致某些属性创建例程（如证书请求和 PKCS#12 文件）崩溃。

  *Steve Henson*

### 0.9.8g 和 0.9.8h 之间的变更 [2008年5月28日]

* 修复 TLS 握手中省略“服务器密钥交换消息”的缺陷，这可能导致客户端崩溃，如使用 Codenomicon TLS 测试套件发现的 ([CVE-2008-1672])

  *Steve Henson, Mark Cox*

* 修复 TLS 服务器名称扩展中的双重释放，这可能导致远程崩溃，如 Codenomicon TLS 测试套件发现的 ([CVE-2008-0891])

  *Joe Orton*

* 在 SSL_CTX_use_certificate_chain_file() 中清除错误队列

  清除错误队列以确保旧函数调用留下的错误条目不会干扰正确操作。

  *Lutz Jaenicke, Erik de Castro Lopo*

* 删除商业 CA 的根 CA 证书：

  OpenSSL 项目不推荐任何特定的 CA，并且在包含或排除任何 CA 方面没有政策。
  因此，在 OpenSSL 软件中附带任意选择的根 CA 证书没有意义。

  *Lutz Jaenicke*

* RSA OAEP 补丁修复了两个独立的无效内存读取。
  第一个涉及输入，当 'lzero' 大于 'SHA_DIGEST_LENGTH' 时（它会在 from 的开头之前读取约 SHA_DIGEST_LENGTH 字节）。第二个涉及输入，其中 'db' 部分只包含零（在 'db' 之后有一个单字节的无效读取）。

  *Ivan Nestlerode <inestlerode@us.ibm.com>*

* 从 0.9.9-dev 进行部分回溯：

  引入 bn_mul_mont（专用的 Montgomery 乘法过程）作为 BIGNUM 汇编器实现的候选。
  虽然 0.9.9-dev 在各种架构上使用汇编器，但在 0.9.8 分支中，默认情况下只有 x86_64 可用，并且可以通过编译时设置获得 32 位 x86。

  要尝试 32 位 x86 汇编器实现，请使用 Configure 选项“enable-montasm”（仅为此回溯存在）。

  由于 32 位 x86 的“enable-montasm”无论如何都会放弃代码稳定性，在这种情况下，我们激活了从 0.9.9-dev 回溯的附加代码以获得进一步的性能改进，即 BN_from_montgomery_word。（要启用此功能，例如 x86_64，请尝试 `-DMONT_FROM_WORD___NON_DEFAULT_0_9_8_BUILD`。）

  *Andy Polyakov（部分回溯由 Bodo Moeller 完成）*

* 添加 TLS 会话票证回调。这允许应用程序设置 TLS 票证密码和 HMAC 密钥，而不是依赖硬编码的固定值。例如，这对于密钥轮换很有用，其中可能存在具有不同名称的多个密钥集。

  *Steve Henson*

* 反转缓存默认 ENGINE 句柄的 ENGINE 内部逻辑。
  在 0.9.8 版本中，这直到现在都是错误的，因此，假设注册的 ENGINE 在主机上成功初始化，唯一的使用方法是将其显式设置为相关算法的默认值。这与 0.9.7 的行为和文档相矛盾。通过此修复，当 ENGINE 注册到给定算法的实现表中时，'uptodate' 标志会被重置，以便下次新上下文尝试选择实现时使用自动发现。

  *Ian Lister（由 Geoff Thorpe 调整）*

* 将 CMS 代码回溯到 OpenSSL 0.9.8。这与 0.9.9 实现的区别如下：

  缺少 EVP_PKEY_ASN1_METHOD 意味着算法参数必须硬编码。

  缺少 BER 流式处理支持意味着只有在数据分离时才支持单次流式处理：对于嵌入式内容，会忽略流式处理标志。

  CMS 支持默认禁用，必须使用 enable-cms 配置选项显式启用。

  *Steve Henson*

* 更新 GMP 引擎粘合层，以便在 openssl 和 GMP 使用相同的 limb 大小时，在 BIGNUM 和 mpz_t 之间进行直接复制。否则，仍然使用现有的“通过文本字符串导出进行转换”技巧。

  *Paul Sheer <paulsheer@gmail.com>*

* Zlib 压缩 BIO。这是一个过滤器 BIO，它压缩和解压缩通过它的任何数据。

  *Steve Henson*

* 添加 AES_wrap_key() 和 AES_unwrap_key() 函数以实现 RFC3394 兼容的 AES 密钥包装。

  *Steve Henson*

* 添加处理 ASN1 结构的实用函数。ASN1_STRING_set0()：设置字符串数据而不复制。X509_ALGOR_set0() 和 X509_ALGOR_get0()：设置和检索 X509_ALGOR（AlgorithmIdentifier）数据。属性函数 X509at_get0_data_by_OBJ()：从 X509_ATTRIBUTE 结构检索数据，可选地检查它是否只出现一次。ASN1_TYPE_set1()：设置并复制提供的 ASN1_TYPE 结构数据。

  *Steve Henson*

* 修复 RSA_eay_mod_exp() 和 BN_MONT_CTX_set() 中的 BN 标志处理，以获得预期的 BN_FLG_CONSTTIME 行为。

  *Bodo Moeller (Google)*

* Netware 支持：

  - 修复了为 LIBC BSD 套接字构建时 ioctlsocket() 的错误用法
  - 修复了 do_tests.pl 以便也能使用 CLIB 构建运行测试套件（CLIB_OPT）
  - 向 do_tests.pl 添加了一些测试
  - 修复了 RunningProcess 用法，使其也能与较新的 LIBC NDK 一起工作
  - 为 CLIB 构建移除了 BN_LLONG 的使用，以避免运行时依赖
  - 添加了新的 Configure 目标 netware-clib-bsdsock、netware-clib-gcc、netware-clib-bsdsock-gcc、netware-libc-bsdsock-gcc
  - 对 netware.pl 进行各种更改，以在 Win32 平台上启用 gcc-cross 构建
  - 更改了 crypto/bio/b_sock.c 以使用宏函数（CLIB BSD）
  - 进行各种更改以修复缺失的原型警告
  - 修复了 x86nasm.pl 以创建正确的 NASM COFF 输出的汇编文件
  - 向构建文件添加了 AES、WHIRLPOOL 和 CPUID 汇编代码
  - 向 mk1mf.pl 添加了缺失的 AES 汇编器规则
  - 修复了 `apps/ocsp.c` 中包含的顺序，以便应用 `e_os.h` 设置

  *Guenter Knauf <eflash@gmx.net>*

* 实现 RFC3546 定义的证书状态请求 TLS 扩展。
  客户端可以设置适当的参数并通过回调接收编码的 OCSP 响应。服务器可以查询提供的参数并在回调中设置编码的 OCSP 响应。添加 s_client 和 s_server 的简化示例。

  *Steve Henson*

### 0.9.8f 和 0.9.8g 之间的变更 [2007年10月19日]

* 修复各种错误：
  + ssl_ctx_st 结构的二进制不兼容性
  + 与不兼容服务器的 DTLS 互操作性
  + 在没有提议会话的情况下不调用 get_session_cb()
  + 修复 ia64 汇编代码

  *Andy Polyakov, Steve Henson*

### 0.9.8e 和 0.9.8f 之间的变更 [2007年10月11日]

* DTLS 握手大修。OpenSSL DTLS 实现存在长期存在的问题，这使得 RFC 4347 兼容客户端无法与 OpenSSL 服务器通信。
  不幸的是，仅仅修复这些不兼容性会“切断”0.9.8f 之前的客户端。为了在 0.9.8e 之后实现无忧升级，服务器会继续容忍不符合 RFC 的语法。反之则不然，0.9.8f 客户端无法与早期服务器通信。此更新甚至解决了 CVE-2007-4995。

  *Andy Polyakov*

* 更改以避免在 OpenSSL 中需要函数转换：某些编译器（gcc 4.2 及更高版本）拒绝使用它们。
  *Kurt Roeckx <kurt@roeckx.be>, Peter Hartley <pdh@utter.chaos.org.uk>,
  Steve Henson*

* 向 OpenSSL 添加 RFC4507 支持。这包括 RFC4507bis 中的更正。加密票证格式是加密编码的 SSL_SESSION 结构，这样新的会话功能就可以自动支持。

  如果客户端应用程序在 SSL_SESSION 结构中缓存会话，则支持是透明的，因为票证现在存储在编码的 SSL_SESSION 中。

  SSL_CTX 结构会自动为服务器中的票证保护生成密钥，因此再次支持可能无需修改应用程序即可实现。

  如果客户端或服务器希望禁用 RFC4507 支持，则可以设置选项 SSL_OP_NO_TICKET。

  添加 TLS 扩展调试回调，以允许检查任何客户端或服务器扩展的内容。

  这项工作由 Google 赞助。

  *Steve Henson*

* 添加对 TLS 扩展的初步支持，到目前为止主要是 server_name 扩展。SSL_SESSION、SSL_CTX 和 SSL 数据结构现在有用于主机名的新成员。SSL 数据结构有一个额外的成员 `SSL_CTX *initial_ctx`，以便新的会话可以存储在该上下文中以允许会话恢复，即使在 SSL 已响应客户端的 server_name 扩展而切换到新的 SSL_CTX 之后。

  新函数（可能更改）：

          SSL_get_servername()
          SSL_get_servername_type()
          SSL_set_SSL_CTX()

  新 CTRL 代码和宏（可能更改）：

          SSL_CTRL_SET_TLSEXT_SERVERNAME_CB
                              - SSL_CTX_set_tlsext_servername_callback()
          SSL_CTRL_SET_TLSEXT_SERVERNAME_ARG
                                   - SSL_CTX_set_tlsext_servername_arg()
          SSL_CTRL_SET_TLSEXT_HOSTNAME           - SSL_set_tlsext_host_name()

  openssl s_client 有一个新的 '-servername ...' 选项。

  openssl s_server 有新的选项 '-servername_host ...', '-cert2 ...',
  '-key2 ...', '-servername_fatal'（可能更改）。这允许测试特定单个主机名的 HostName 扩展（'-cert' 和 '-key' 在没有 HostName 协商的握手中仍然是后备选项）。如果必须发送 unrecognized_name 警报，默认情况下这是一个警告；使用 '-servername_fatal' 选项时，它会变成致命的。

  *Peter Sylvester, Remy Allais, Christophe Renou, Steve Henson*

* 为 VC++ 构建添加 AES 和 SSE2 汇编语言支持。

  *Steve Henson*

* 缓解 Montgomery 约简中最终减法的攻击。

  *Andy Polyakov*

* 修复 crypto/ec/ec_mult.c 以正确处理值为 0 的标量（这之前会导致内部错误）。

  *Bodo Moeller*

* 当 in != out 时，IGE 模式再提高 10%。

  *Ben Laurie*

* AES IGE 模式加速。

  *Dean Gaudet (Google)*

* 添加韩语对称 128 位密码 SEED（参见
  <http://www.kisa.or.kr/kisa/seed/jsp/seed_eng.jsp>）
  并添加 RFC 4162 中的 SEED 密码套件：

          TLS_RSA_WITH_SEED_CBC_SHA      =  "SEED-SHA"
          TLS_DHE_DSS_WITH_SEED_CBC_SHA  =  "DHE-DSS-SEED-SHA"
          TLS_DHE_RSA_WITH_SEED_CBC_SHA  =  "DHE-RSA-SEED-SHA"
          TLS_DH_anon_WITH_SEED_CBC_SHA  =  "ADH-SEED-SHA"

  为最小化 OpenSSL 0.9.8 系列补丁级别之间的更改，SEED 在编译时保持排除，除非 OpenSSL 使用 'enable-seed' 配置。

  *KISA, Bodo Moeller*

* 缓解分支预测攻击，这在共享单个处理器时可能很实用，允许间谍进程提取信息。有关详细背景信息，请参阅
  <http://eprint.iacr.org/2007/039>（O. Aciicmez, S. Gueron,
  J.-P. Seifert，“OpenSSL 中的新分支预测漏洞和必要的软件对策”）。更改的核心是 BN_div() 和 BN_mod_inverse() 的新版本 BN_div_no_branch() 和
  BN_mod_inverse_no_branch()，它们速度较慢，但避免了安全相关的条件分支。如果为输入 BIGNUM 之一设置了 BN_FLG_CONSTTIME 标志，则 BN_div() 和 BN_mod_inverse() 会自动调用它们。此外，BN_is_bit_set() 已更改为删除条件分支。

  BN_FLG_CONSTTIME 是先前 BN_FLG_EXP_CONSTTIME 标志的新名称，因为它现在影响的不仅仅是模幂运算。（自 OpenSSL 0.9.7h 起，在指数中设置此标志会导致 BN_mod_exp_mont() 使用 BN_mod_exp_mont_consttime() 中的替代实现。）旧名称保留为已弃用的别名。

  类似地，RSA_FLAG_NO_EXP_CONSTTIME 被更通用的 RSA_FLAG_NO_CONSTTIME 标志取代，因为 RSA 实现现在使用常数时间实现，而不仅仅是幂运算。这里也保留了旧名称作为已弃用的别名。

  BN_BLINDING_new() 现在将使用 BN_dup() 作为模数，以便 BN_BLINDING 结构获得模数的独立副本。这意味着以前传递给 BN_BLINDING_new() 和 BN_BLINDING_create_param() 的 `BIGNUM *m` 参数现在基本上变成了 `const BIGNUM *m`，尽管在 0.9.9 之前我们无法在头文件中实际更改此设置。它允许 RSA_setup_blinding() 在模数上使用 BN_with_flags() 来启用 BN_FLG_CONSTTIME。

  *Matthew D Wood (Intel Corp)*

* 在 SSL/TLS 服务器实现中，严格遵守会话 ID 上下文匹配（如果应用程序使用单个外部缓存用于不同目的，则此匹配很重要）。以前，只有在设置了 SSL_VERIFY_PEER 时才禁止超出上下文的重用。这确实确保了严格的客户端验证，但意味着，对于使用单个外部缓存来实现不同要求的应用程序，客户端可以通过启动不同上下文中的会话来规避给定会话 ID 上下文的密码套件限制。

  *Bodo Moeller*

* 在 SSL_DEFAULT_CIPHER_LIST 中包含“!eNULL”，以确保像“DEFAULT:RSA”这样的密码套件字符串不能启用仅用于身份验证的密码套件。

  *Bodo Moeller*

* 更新 SSL_get_shared_ciphers() 的修复 CVE-2006-3738，该修复不完整，可能导致单字节溢出([CVE-2007-5135]) [Ben Laurie]

### 0.9.8d 和 0.9.8e 之间的变更 [2007年2月23日]

* 由于 AES128 和 AES256（以及 Camellia128 和 Camellia256）在 ssl/ssl_ciph.c 的逻辑中共享单个掩码位，因此在 AES128 可用但 AES256 不可用（或 Camellia128 可用但 Camellia256 不可用）的情况下，用于屏蔽禁用密码的代码需要一个技巧才能正常工作。

  *Victor Duchovni*

* 修复 crypto/ec/ec_asn1.c（在 i2d_ECPrivateKey、i2d_ECPKParameters、i2d_ECParameters 中）生成的 BIT STRING 编码：
  当点或种子编码在 BIT STRING 中时，我们需要防止删除尾随零位以获得正确的 DER 编码。（默认情况下，crypto/asn1/a_bitstr.c 假定是 NamedBitList 的情况，在这种情况下需要删除尾随 0 位。）

  *Bodo Moeller*

* 让 SSL/TLS 服务器实现容忍在接收 ClientHello 时记录协议版本“不匹配”，即使 ClientHello 是分片的。（服务器在 ServerHello 消息告知客户端其选择之前，不能坚持其选择的特定协议版本。）

  *Bodo Moeller*

* 添加 RFC 3779 支持。

  *Rob Austein 为 ARIN，Ben Laurie*

* 如果错误代码尚未存在，则加载它们，而不是使用静态变量。这允许它们被干净地卸载和重新加载。改进了头文件函数名称解析。

  *Steve Henson*

* 扩展 s_client 中的 SMTP 和 IMAP 协议仿真，以根据 RFC 要求使用 EHLO 或 CAPABILITY 握手。

  *Goetz Babin-Ebell*

### 0.9.8c 和 0.9.8d 之间的变更 [2006年9月28日]

* 引入限制以防止恶意密钥能够导致拒绝服务。([CVE-2006-2940])

  *Steve Henson, Bodo Moeller*

* 修复某些可能导致拒绝服务的无效结构的 ASN.1 解析。([CVE-2006-2937]) [Steve Henson]

* 修复 SSL_get_shared_ciphers() 函数中的缓冲区溢出。([CVE-2006-3738]) [Tavis Ormandy 和 Will Drewry, Google Security Team]

* 修复 SSL 客户端代码，该代码在连接到恶意 SSLv2 服务器时可能崩溃。([CVE-2006-4343])

  *Tavis Ormandy 和 Will Drewry, Google Security Team*

* 自 0.9.8b 起，命名显式密码套件的密码套件字符串仅匹配这些。在此之前，“AES256-SHA”将被解释为模式并匹配“AES128-SHA”（因为 AES128-SHA 在 0.9.7h 中获得了相同的强度分类），因为我们目前在密码套件描述位图中只有一个 AES 位。
  然而，该更改也适用于像“RC4-MD5”这样的密码套件字符串，这些字符串有意匹配多个密码套件——即，除了 SSL 3.0/TLS 1.0 的更常见密码套件之外，还包括 SSL 2.0 密码套件。

  因此，我们再次更改选择算法：命名一个显式密码套件会选择该密码套件，以及来自*其他*协议版本的任何其他类似密码套件（相同的位图）。
  因此，“RC4-MD5”将再次正确选择 SSL 2.0 密码套件和 SSL 3.0/TLS 1.0 密码套件。

  由于 SSL 2.0 没有任何密码套件需要区分 128/256 位，因此目前可以正常工作。
  正确的修复方法是为 AES128 和 AES256 使用不同的位，这可以从一开始就避免问题；
  但是，位很稀缺，所以我们只能在新版本（不仅仅是补丁级别）中这样做，届时我们可以更改 SSL_CIPHER 定义，将单个 'unsigned long mask' 位图拆分为多个值以扩展可用空间。

  *Bodo Moeller*

### 0.9.8b 和 0.9.8c 之间的变更 [2006年9月5日]

* 避免 Daniel Bleichenbacher 发现的 PKCS #1 v1.5 签名攻击 ([CVE-2006-4339]) [Ben Laurie 和 Google Security Team]

* 添加 AES IGE 和 biIGE 模式。

  *Ben Laurie*

* 将 Unix 随机熵收集更改为在可能时使用 poll() 而不是 select()，因为后者存在一些不良限制。

  *Darryl Miles 通过 Richard Levitte 和 Bodo Moeller*

* 更彻底地禁用“ECCdraft”密码套件。现在 ssl/ssl_ciph.s 中的特殊处理确保这些密码套件不能作为例如“AES”别名的一部分被隐式激活。
  但是，请升级到 OpenSSL 0.9.9[-dev] 以获得 ECC 密码套件的非实验性使用，因为它支持 TLS 扩展，这是曲线和点格式协商所必需的，以避免潜在的握手问题。

  *Bodo Moeller*

* 禁用恶意密码套件：

  - SSLv2 0x08 0x00 0x80（“RC4-64-MD5”）
  - SSLv3/TLSv1 0x00 0x61（“EXP1024-RC2-CBC-MD5”）
  - SSLv3/TLSv1 0x00 0x60（“EXP1024-RC4-MD5”）

  后两者据称来自
  draft-ietf-tls-56-bit-ciphersuites-0[01].txt，但实际上并不在那里。

  还停用 draft-ietf-tls-56-bit-ciphersuites-01.txt 中的其余密码套件。这些同样是非官方的，ID 已过期。

  *Bodo Moeller*

* 修复 RSA 盲化 Heisenbug（在双核机器上有时会出现问题）和其他潜在的线程安全问题。

  *Bodo Moeller*

* 添加对称密码 Camellia（128 位、192 位、256 位密钥版本），现可免费使用
  （参见 <http://info.isl.ntt.co.jp/crypt/eng/info/chiteki.html>）。
  此外，添加 RFC 4132 中的 Camellia TLS 密码套件。

  为最小化 OpenSSL 0.9.8 系列补丁级别之间的更改，Camellia 在编译时保持排除，除非 OpenSSL 使用 'enable-camellia' 配置。

  *NTT*

* 在使用压缩时禁用填充错误检查。填充错误检查假定第一个数据包的长度是偶数，如果启用了压缩，则不一定如此，这可能导致误报并导致握手失败。实际的错误测试是旧代码，因此希望实现者现在已经修复了它，或者任何仍然存在该错误的实现都不支持压缩。

  *Steve Henson*

### 0.9.8a 和 0.9.8b 之间的变更 [2006年5月4日]

* 应用密码规则检查时，查看字符串匹配是否为显式密码套件，如果是，则只匹配该密码套件。

  *Steve Henson*

* 如果需要，为 VC++ 链接清单。

  *Austin Ziegler <halostatue@gmail.com>*

* 根据 draft-ietf-tls-ecc-12.txt 更新了对基于 ECC 的 TLS 密码套件的支持，并进行了建议的更改（但没有 TLS 扩展，TLS 扩展在 0.9.9 分支中支持，而不是在 OpenSSL 0.9.8 分支中）。

  *Douglas Stebila*

* 新函数 EVP_CIPHER_CTX_new() 和 EVP_CIPHER_CTX_free() 以支持不透明的 EVP_CIPHER_CTX 处理。

  *Steve Henson*

* 对 zlib 压缩代码进行修复和增强。我们现在只使用“zlib1.dll”并在 Win32 上使用默认的 `__cdecl` 调用约定，以符合此处提到的标准：
  <http://www.zlib.net/DLL_FAQ.txt>
  静态 zlib 链接现在可以在 Windows 上工作，并且 Configure 的新 --with-zlib-include --with-zlib-lib 选项可用于提供头文件和库的位置。优雅地处理无法加载 zlib 库的情况。

  *Steve Henson*

* 对 OID 生成代码进行了多项修复和增强。旧代码有时允许无效 OID（例如 1.X，其中 X >= 40），无法处理大于 ULONG_MAX 的数字，截断打印，并且具有非标准的 OBJ_obj2txt() 行为。

  *Steve Henson*

* 添加了在 engine/ 下将引擎构建为共享库的支持，用于 VC++ 构建系统。

  *Steve Henson*

* 修正了 DSO 中 Win32 路径分割器的众多错误。希望我们不会再看到路径的错误组合。

  *Richard Levitte*

### 0.9.8 和 0.9.8a 之间的变更 [2005年10月11日]

* 移除 SSL_OP_MSIE_SSLV2_RSA_PADDING 的功能（SSL_OP_ALL 的一部分）。此选项过去用于禁用 SSL 2.0 服务器实现中针对 man-in-the-middle 协议版本回滚的对策，这是一个坏主意。([CVE-2005-2969])

  *Bodo Moeller；由 Yutaka Oiwa（日本产业技术综合研究所信息安全研究中心 [AIST]）指出问题*

* 添加两个函数来清除和返回验证参数标志。

  *Steve Henson*

* 将密码列表保留在源文件中排序，而不是在运行时排序，从而消除了对锁的需求。

  *Nils Larsch*

* 避免 Diffie-Hellman 中的一些小型子群攻击。

  *Nick Mathewson 和 Ben Laurie*

* 添加了著名素数的函数。

  *Nick Mathewson*

* 扩展了 Windows CE 支持。

  *Satoshi Nakamura 和 Andy Polyakov*

* 在编译时初始化 SSL_METHOD 结构而不是在运行时初始化，从而消除了对锁的需求。

  *Steve Henson*

* 使 PKCS7_decrypt() 即使在未提供证书的情况下也能工作，方法是尝试依次解密每个加密密钥。向 smime 工具添加了支持。

  *Steve Henson*

### 0.9.7h 和 0.9.8 之间的变更 [2005年7月5日]

[注意：OpenSSL 0.9.7i 及更高版本的 0.9.7 补丁级别是在 OpenSSL 0.9.8 之后发布的。]

 * 添加 libcrypto.pc 和 libssl.pc，以满足有此需求的用户。

   *Richard Levitte*

 * 修改 CA.sh 和 CA.pl，使其不再将 CSR 和私钥捆绑在同一个文件中。

   *Richard Levitte*

 * 添加对 Win64 的初步支持，包括 IA64 和 AMD64/x64 版本。

   *Andy Polyakov*

 * 为 'ca' 命令添加了命令行和配置文件选项 -utf8。

   *Stefan <stf@udoma.org*

 * 移除了宏 des_crypt()，因为它似乎与某些库冲突。请使用 DES_crypt()。

   *Richard Levitte*

 * 修正了 'chil' 和 '4758cca' ENGINE 的命名。这涉及到重命名两者
   的源代码和生成的共享库。在绑定时，引擎将接受修正后的或旧的 ID
   （分别是 'ncipher' 和 '4758_cca'）。注意，这仅适用于构建 'shared'
   版本时。

   *Corinna Vinschen <vinschen@redhat.com> 和 Geoff Thorpe*

 * 向 EVP_PKEY 结构添加了属性函数。修改了 PKCS12_create() 以识别
   并使用 CSP 名称属性。使 pkcs12 工具的 -CSP 选项重新生效。

   *Steve Henson*

 * 为 bn 盲化代码添加了新功能：
   - 在使用固定次数（目前为 32 次）后自动重新创建 BN_BLINDING 参数
   - 添加了用于参数创建的新函数
   - 引入了标志来控制 BN_BLINDING 参数的更新行为
   - 隐藏了 BN_BLINDING 结构
   向 RSA 结构添加了第二个 BN_BLINDING 插槽，以提高单个 RSA 对象在多个
   线程之间共享时的性能。

   *Nils Larsch*

 * 添加了对 DTLS 的支持。

   *Nagendra Modadugu <nagendra@cs.stanford.edu> 和 Ben Laurie*

 * 向 SSL_CTX_use_PrivateKey_file() 和 SSL_use_PrivateKey_file() 添加了
   对 DER 编码私钥 (SSL_FILETYPE_ASN1) 的支持。

   *Walter Goulet*

 * 从 ssl/ssl_rsa.c 和 ssl/s3_both.c 中移除了有缺陷且不完整的 DH 证书支持。

   *Nils Larsch*

 * 在 `apps/openssl` 命令中，使用 SHA-1 代替 MD5 作为默认摘要算法。

   *Nils Larsch*

 * 使用 "-Wall -Wmissing-prototypes -Wstrict-prototypes -Wmissing-declarations -Werror" 进行编译清理。目前还需要设置 DEBUG_SAFESTACK。

   *Ben Laurie*

 * 修改了 ./Configure，以便某些算法可以默认禁用。
   新的 "no-xxx" 的对应项是 "enable-xxx"。

   现在，专利的 RC5 和 MDC2 算法将被禁用，除非分别指定了 "enable-rc5"
   和 "enable-mdc2"。

   (IDEA 尽管有专利，但仍保持启用状态。这是因为 IDEA 经常需要用于互操作性，
   并且非商业用途没有许可费。与之前一样，可以使用 "no-idea" 来避免此算法。)

   *Bodo Moeller*

 * 添加了对代理证书的处理（参见 RFC 3820）。这项工作由 KTH（斯德哥尔摩皇家理工学院）
   和 EGEE（欧洲科学网格使能）赞助。

   *Richard Levitte*

 * 对现代架构/实现（如 Intel P4、IA-64 和 AMD64）上的 RC4 性能进行了全面优化。

   *Andy Polyakov*

 * 新的实用工具 extract-section.pl。该工具可用于指定 pod 文件中的替代节号，
   而无需在 Makefile 中将每个文件视为单独的案例。这可以通过向 pod 文件添加两行来实现：

   =for comment openssl_section:XXX

   空行是必需的。

   *Steve Henson*

 * 为 s_client 和 s_server 添加了新的参数 -certform、-keyform 和 -pass，
   以允许使用替代格式的密钥和证书文件以及口令来源。

   *Steve Henson*

 * 新的结构 X509_VERIFY_PARAM，它结合了当前的验证参数，更新了相关的结构，
   并添加了各种实用函数。

   添加了新的与策略相关的验证参数，并将策略检查包含在标准的验证代码中。
   增强了 'smime' 应用程序，增加了额外的参数以支持策略检查和输出。

   *Steve Henson*

 * 添加了一个新的引擎，以支持 VIA C3 Nehemiah 处理器中的 VIA PadLock ACE 扩展。
   这些扩展支持硬件中的 AES 加密以及 RNG（尽管 RNG 支持目前被禁用）。

   *Michal Ludvig <michal@logix.cz>，在 Andy Polyakov 的帮助下*

 * 弃用了 `BN_[get|set]_params()` 函数（它们在内部被忽略）。

   *Geoff Thorpe*

 * 实现新的 FIPS 180-2 算法 SHA-224/-256/-384/-512。

   *Andy Polyakov 和其他多人*

 * 改进了 PowerPC 平台支持。最值得注意的是 IBM 贡献的 BIGNUM 汇编实现。

   *Suresh Chari, Peter Waltenberg, Andy Polyakov*

 * 新的 'RSA_generate_key_ex' 函数现在接受 BIGNUM 作为公钥指数，
   而不是 'unsigned long'。新的 RSA_METHOD 结构中的 'rsa_keygen'
   元素也有相应的更改。

   *Jelte Jansen, Geoff Thorpe*

 * 创建初始序列号文件的功能已从 CA.pl 移至 'ca' 工具，并新增了 -create_serial
   选项。

   (在 OpenSSL 0.9.7e 之前，CA.pl 会将序列号文件初始化为 1，这很可能导致问题。
   为了避免问题并保持不同 0.9.7 补丁级别之间的兼容性，0.9.7e 在 CA.pl 中使用了
   'openssl x509 -next_serial' 来初始化序列号。在新发布的 0.9.8 中，我们可以在
   'ca' 工具中直接修复此问题。)

   *Steve Henson*

 * 通过在 ossl_typ.h 中声明更多不透明对象，减少了头文件之间的依赖性。
   因此，包含某些头文件（例如 engine.h）将导致更少的递归包含，这可能会破坏
   懒惰的源代码 - 因此此更改由 OPENSSL_NO_DEPRECATED 符号覆盖。一如既往，
   开发人员在构建和使用 openssl 时应定义此符号，以确保他们遵循推荐的行为、
   接口等，但当未定义此符号时，将优先考虑向后兼容的行为。

   *Geoff Thorpe*

 * 新函数 X509_POLICY_NODE_print()，用于打印策略节点。

   *Steve Henson*

 * 添加了新的 EVP 函数 EVP_CIPHER_CTX_rand_key 和相关功能。
   这将根据密码上下文生成适当长度的随机密钥。EVP_CIPHER 可以提供自己的
   随机密钥生成例程来支持特定形式的密钥。这在 des 和 3des 例程中用于生成
   正确奇偶校验的密钥。更新 S/MIME 代码以使用新函数，从而生成正确奇偶校验的 DES 密钥。
   添加了 EVP_CHECK_DES_KEY #define，如果密钥无效（弱或奇偶校验不正确）则返回错误。

   *Steve Henson*

 * 添加了一组本地 CRL，X509_verify_cert() 可以使用它们进行验证，
   也可以查找它们。当被验证的结构可能包含 CRL 时，例如 PKCS#7 signedData，
   这很有用。修改 PKCS7_verify() 以使用存在的任何 CRL，除非断言了新的
   PKCS7_NO_CRL 标志。

   *Steve Henson*

 * 扩展了 ASN1 OID 配置模块。它现在还接受以下语法：

   shortName = some long name, 1.2.3.4

   *Steve Henson*

 * 重新实现了 BN_CTX 实现。现在对它可以处理的变量数量或
   BN_CTX_start()/BN_CTX_end() 对的“堆栈”深度没有静态限制。
   堆栈信息现在可以按需扩展，并且 BN_CTX 不再使用单个静态 bignum 数组，
   而是使用这些数组的链表，从而允许它按需扩展，同时保持 BN_CTX 的“捆绑”有用性。

   *Geoff Thorpe*

 * 向 RSA_METHOD 中的 'rsa_mod_exp' 回调添加了一个缺失的 BN_CTX 参数，
   以允许所有 RSA 操作使用单个 BN_CTX 进行。

   *Geoff Thorpe*

 * 初步支持证书策略评估和检查。这最初是为了通过“依赖方客户端证书路径处理逻辑”
   一致性测试 v1.07 中概述的测试。

   *Steve Henson*

 * bn_dup_expand() 已弃用，它在 0.9.7 中引入，但一直未使用且不太有用。
   还对 bignum 进行了各种其他小的调整和修复，延续了审计（见下文）。

   *Geoff Thorpe*

 * 将几乎所有 d2i、c2i、s2i 和 r2i 函数以及相关的 ASN1、EVP 和 SSL 函数以及旧的 ASN1 宏
   设为 const。

   *Richard Levitte*

 * BN_zero() 只需要将 'top' 和 'neg' 设置为零即可获得正确的结果，
   并且这永远不会失败。因此，BN_set_word() 的使用返回值（可能由于不必要的扩展而失败）
   现在已弃用；如果定义了 OPENSSL_NO_DEPRECATED，BN_zero() 是一个 void 宏。

   *Geoff Thorpe*

 * BN_CTX_get() 应返回零值 bignum，提供与 BN_new() 相同的初始化值。

   *Geoff Thorpe，由 Ulf Möller 建议*

 * 支持 inhibitAnyPolicy 证书扩展。

   *Steve Henson*

 * 正在进行 BIGNUM 代码的审计，其中当定义了 BN_DEBUG 时会启用调试代码。
   这使得对处理 BIGNUM 时被认为是有效的内容有更严格的强制执行，并在发现问题时
   导致执行 assert()。如果定义了 BN_DEBUG_RAND，将采取进一步措施故意污染
   BIGNUM 结构中未使用的数据，以尝试进一步暴露有问题的代码。目前，openssl
   （在其默认操作模式下）将继续容忍过去一直容忍的不一致形式，但作者和打包者应考虑
   在定义了这些调试符号的情况下尝试 openssl 和他们自己的应用程序。这将有助于突出他们
   自己代码中的潜在错误，并提高 OpenSSL 本身的测试覆盖率。在某个时候，这些更严格的规则将成为
   openssl 的默认设置，以提高可维护性，尽管 assert() 和其他开销将仅保留在调试配置中。
   有关更多详细信息，请参阅 bn.h。

   *Geoff Thorpe, Nils Larsch, Ulf Möller*

 * BN_CTX_init() 已弃用，因为 BN_CTX 是一个不透明结构，只能通过 BN_CTX_new()
   （它隐式初始化它）获得。此函数的存在仅使得覆盖现有结构（并导致内存泄漏）成为可能。

   *Geoff Thorpe*

 * 由于 LHASH 作为模板类型实现的基于回调的方法，lh_insert() 将不透明对象添加到哈希表中，
   而 lh_doall() 或 lh_doall_arg() 通常与析构函数回调一起使用，以便在销毁哈希表（并丢失对象指针）
   之前清理相应的对象。因此，LHASH 中一些过于严格的 const 化已被放宽，
   以便 lh_insert() 不接受（也不存储）“const”对象，并且 `lh_doall[_arg]` 回调包装器
   没有对它们接收的对象指针进行“const”限制（因此不再需要强制转换它们）。

   *Geoff Thorpe*

 * tmdiff.h API 非常丑陋且最小化，以至于我们自己的计时实用程序（speed）更喜欢使用自己的实现。
   这两个实现尚未合并（是否有志愿者？），但 tmdiff API 已正确公开其对象类型（MS_TM），
   而不是与 `char *` 进行转换。如果有人意识到 MS_TM 和 `ms_time_***`
   不一定是最好的命名法，这仍然可能发生变化 - 但这是内部实现所使用的，所以我暂时使用了它。

   *Geoff Thorpe*

 * 确保在定义 OPENSSL_NO_DEPRECATED 时不编译弃用的函数。一些 "openssl" 子命令和少数自检仍然在使用弃用的密钥生成函数，因此也已更新。

   *Geoff Thorpe*

 * 重新组织 PKCS#7 代码，将摘要位置功能分离到 PKCS7_find_digest()，
   摘要添加功能分离到 PKCS7_bio_add_digest()。
   新增函数 PKCS7_set_digest() 用于设置 PKCS#7 digestedData 类型的摘要类型。
   添加了额外的代码以正确生成 digestedData 类型，并为 PKCS7 初始化函数添加了对该类型的支持。

   *Steve Henson*

 * 新函数 PKCS7_set0_type_other()，用于初始化类型为 "other" 的 PKCS7 结构。

   *Steve Henson*

 * 修复 crypto/bn/bn_prime.pl 中的素数生成循环，确保循环正确停止，
   并且不会执行中断（“除零”）模运算。预生成的素数表 crypto/bn/bn_prime.h
   已经正确，但在某些平台上由于脚本中的“除零”情况而无法重新生成。

   *Ralf S. Engelschall*

 * 根据 draft-ietf-tls-ecc-03.txt 更新对基于 ECC 的 TLS 密码套件的支持：
   KDF1 密钥派生函数与 SHA-1 现在仅用于“小型”曲线（其中字段元素的表示最多占用 24 字节）；
   对于较大的曲线，ECDH 产生的字段元素直接用作预主密钥。

   *Douglas Stebila (Sun Microsystems Laboratories)*

 * 在 crypto/ec/ectest.c 中添加了 kP+lQ 定时的代码，并将 SEC2 曲线 secp160r1 添加到测试中。

   *Douglas Stebila (Sun Microsystems Laboratories)*

 * 添加了通过 DSO 全局加载符号的可能性。

   *Götz Babin-Ebell <babin-ebell@trustcenter.de> 通过 Richard Levitte*

 * 添加了 ERR_set_mark() 和 ERR_pop_to_mark() 函数，以更好地控制错误堆栈。

   *Richard Levitte*

 * 在 ENGINE 中添加了对 STORE 的支持。

   *Richard Levitte*

 * 添加了 STORE 类型。目的是提供一个通用的接口来访问证书和密钥存储，
   无论是简单的基于文件的存储，还是 HSM 类型存储，或者 LDAP 存储，等等。
   注意：代码目前未经测试，并且实际上并未在任何地方使用。

   *Richard Levitte*

 * 添加了一个通用的结构 OPENSSL_ITEM。它可以用于将参数列表传递给任何函数，
   并为函数提供将数据传递回调用者的途径。

   *Richard Levitte*

 * 添加了 BUF_strndup() 和 BUF_memdup() 函数。BUF_strndup() 的功能类似于
   BUF_strdup()，但可用于复制字符串的一部分。复制的内容会以 NUL 终止。
   BUF_memdup() 复制内存区域。

   *Richard Levitte*

 * 添加了 sk_find_ex() 函数，该函数的功能类似于 sk_find()，但即使找不到精确匹配项，
   也会返回一个指向元素的索引。该索引保证指向一个元素，该元素将按排序顺序插入搜索到的键。

   *Richard Levitte*

 * 添加了 OBJ_bsearch_ex() 函数，该函数的功能类似于 OBJ_bsearch()，但接受一个额外的标志参数以实现可选功能。目前，定义了以下标志：

      OBJ_BSEARCH_VALUE_ON_NOMATCH
      此标志使 OBJ_bsearch_ex() 返回第一个比较函数返回负数或零的元素。

      OBJ_BSEARCH_FIRST_VALUE_ON_MATCH
      此标志使 OBJ_bsearch_ex() 返回第一个比较函数返回零的元素。如果存在多个比较函数返回零的元素，则此标志很有用。

   *Richard Levitte*

 * 使 'openssl ca' 能够创建自签名证书，以便自签名证书成为 CA 数据库的一部分，
   并使用与所有其他证书签名相同的序列号生成机制。新的 '-selfsign' 标志启用了此功能。
   适配了 CA.sh 和 CA.pl.in。

   *Richard Levitte*

 * 添加了检查证书请求的公钥是否与给定私钥匹配的功能。这对于检查证书请求是否可以由该密钥签名（自签名）很有用。

   *Richard Levitte*

 * 使 CA 索引文件中可以存在具有相同主题的多个活动证书。
   只有当配置文件中主 CA 部分（默认情况下为 'CA_default'）的关键字 'unique_subject'
   设置为 'no' 时，才会这样做。该值将与数据库本身一起保存在一个单独的索引属性文件中，
   该文件的命名方式与索引文件相同，但后缀为 '.attr'。

   *Richard Levitte*

 * 在配置文件中使用 '+' 表示法为 req 和 dirName 生成多值 AVA。

   *Steve Henson*

 * 支持 nameConstraints 证书扩展。

   *Steve Henson*

 * 支持 policyConstraints 证书扩展。

   *Steve Henson*

 * 支持 policyMappings 证书扩展。

   *Steve Henson*

 * 确保默认的 DSA_METHOD 实现仅在其 dsa_mod_exp() 和/或 bn_mod_exp()
   处理程序非 NULL 时才使用它们，并将其自身的处理程序设置为 NULL，以消除不必要的间接调用。
   这使得替代实现更容易回退到默认实现。

   *Geoff Thorpe*

 * 在配置文件中支持 GeneralName 相关扩展中的 directoryName。

   *Steve Henson*

 * 使应用程序可以使用 Makefile.shared 进行链接。
   即使链接到静态库，也能实现这一点！

   *Richard Levitte*

 * 为 S/MIME 签名添加了单次处理支持。这意味着 S/MIME 签名现在可以从管道进行，
   此外，明文签名（multipart/signed 类型）实际上是流式的，并且签名数据不需要全部保存在内存中。

   这是通过新的 PKCS7_STREAM 标志实现的。当设置此标志时，PKCS7_sign()
   仅初始化 PKCS7 结构，实际签名在数据输出（并计算摘要）后在 SMIME_write_PKCS7() 中完成。

   *Steve Henson*

 * 在共享库和应用程序中添加了对 -rpath/-R 的完整支持，至少在已知如何实现这些功能的平台上是如此。

   *Richard Levitte*

 * 在 crypto/ec/ec_mult.c 中，实现了基于 wNAF 分割的快速点乘预计算。
   EC_GROUP_precompute_mult() 现在将计算生成器的倍数表，
   使得后续调用 EC_POINTs_mul() 或 EC_POINT_mul() 更快（特别是在单个点乘，标量 * 生成器的情况下）。

   *Nils Larsch, Bodo Moeller*

 * 为证书扩展添加了 IPv6 支持。使用 IP:a.b.c.d 的各种扩展现在可以采用 RFC1884 2.2 的格式接受 IPv6 地址。
   IPv6 地址现在也能正确显示。

   *Steve Henson*

 * 添加了一个实现 RSA 的 ENGINE，该引擎通过 GMP 库执行私钥指数运算。
   到 GMP 的 mpz_t 格式的转换以及从 GMP 的 mpz_t 格式的转换都不是最优化的，
   也没有缓存任何蒙哥马利形式，并且在 x86 上，OpenSSL 自身的性能似乎已经赶上。
   然而，在其他架构上，GMP 可能会提供提升。此 ENGINE 默认不构建，但可以在 Configure 时指定，
   并且应附带必要的链接器添加，例如：
           ./config -DOPENSSL_USE_GMP -lgmp

   *Geoff Thorpe*

 * "openssl engine" 在使用 "-t" 测试引擎可用性时不会显示 ENGINE/DSO 加载失败错误 -
   旧行为可以通过增加功能的详细程度（使用 "-tt"）来产生。

   *Geoff Thorpe*

 * ECDSA 例程：在某些错误条件下，未初始化的 BN 对象可能会被释放。
   解决方案：确保尽早执行初始化。（由 Nils Larsch <nla@trustcenter.de> 通过 PR#459 报告并提供修复）

   *Lutz Jaenicke*

 * 密钥生成现在可以在 RSA_METHOD、DSA_METHOD 和 DH_METHOD 中实现（例如，通过 ENGINE 实现），
   以覆盖正常的软件实现。对于 DSA 和 DH，还可以通过提供适当的方法回调来覆盖参数生成。

   *Geoff Thorpe*

 * 将密钥生成和素性测试中使用的“进度”机制更改为接受新的 BN_GENCB 指针而不是回调/参数对的函数。
   新的 API 函数具有 `_ex` 后缀，旧函数被重写为新函数的包装器。
   OPENSSL_NO_DEPRECATED 符号可用于隐藏旧函数的声明，以帮助（平稳地）迁移到新函数。
   此外，新的密钥生成 API 函数在调用者提供的密钥结构上操作，并返回成功/失败，
   而不是返回密钥或 NULL - 这是为了使“keygen”成为 RSA_METHOD 等的另一个成员函数。

   使用新回调接口的示例：

           int (*my_callback)(int a, int b, BN_GENCB *cb) = ...;
           void *my_arg = ...;
           BN_GENCB my_cb;

           BN_GENCB_set(&my_cb, my_callback, my_arg);

           return BN_is_prime_ex(some_bignum, BN_prime_checks, NULL, &cb);
           /* 有关调用 my_callback() 时 a、b 的含义，请参阅
            * 调用回调的函数的文档。
            * cb 将指向 my_cb；my_arg 可以作为 cb->arg 检索。
            * my_callback 应返回 1 以继续 BN_is_prime_ex()，或返回 0 以停止。
            */

   *Geoff Thorpe*

 * 将 ZLIB 压缩方法更改为有状态的，并根据 draft-ietf-tls-compression-04.txt 中定义的编号将其提供给 TLS。

   *Richard Levitte*

 * 添加了 CertificatePair 的 ASN.1 结构和函数，其定义如下（根据 X.509_4thEditionDraftV6.pdf）：

           CertificatePair ::= SEQUENCE {
              forward         [0]     Certificate OPTIONAL,
              reverse         [1]     Certificate OPTIONAL,
              -- at least one of the pair shall be present -- }

   还实现了读写证书对的 PEM 函数，并将 PEM 标签定义为 "CERTIFICATE PAIR"。

   这需要定义，主要是为了 LDAP 属性 crossCertificatePair，但可能在其他地方也很有用。

   *Richard Levitte*

 * 在 Makefile.shared 中，为 Cygwin 启用了共享库的符号链接抑制。

   *Richard Levitte*

 * 通过创建函数
           void BN_set_negative(BIGNUM *a, int neg);
   和宏
           int  BN_is_negative(const BIGNUM *a);
   来扩展 BIGNUM API，以避免在应用程序中直接访问 'a->neg' 的需要。

   *Nils Larsch*

 * 为 NIST 曲线中使用的伪梅森素数实现了快速模约（crypto/bn/bn_nist.c, crypto/ec/ecp_nist.c）。
   如果适用，EC_GROUP_new_curve_GFp() 现在将自动使用此功能。

   *Nils Larsch <nla@trustcenter.de>*

 * 添加了新的锁类型（CRYPTO_LOCK_BN）。

   *Bodo Moeller*

 * 将 ENGINE 框架更改为自动从特定目录动态加载引擎，除非它们已被发现已内置或已加载。
   将除 cryptodev 之外的所有当前引擎移动到一个新的目录 engines/。
   如果 `./Configure` 或 `./config` 指定了 "shared" 选项，则 engines/ 中的引擎将构建为共享库。
   否则，它们将被插入到 libcrypto.a 中。
   /usr/local/ssl/engines 是动态引擎的默认目录，但可以通过通常的 --prefix 和/或 --openssldir
   在配置时覆盖，也可以通过环境变量 OPENSSL_ENGINES 在运行时覆盖。

   *Geoff Thorpe 和 Richard Levitte*

 * 添加了 Makefile.shared，一个用于构建共享库的辅助 makefile。
   修改了 Makefile.org。

   *Richard Levitte*

 * 为 Win32 DLL 添加了版本信息。

   *Peter 'Luna' Runestig" <peter@runestig.com>*

 * 添加了新的“中级”PKCS#12 API。可以使用此 API 将证书和密钥添加到创建任意 PKCS#12 文件中，
   同时避免使用低级 API。

   PKCS12_create() 的新选项，密钥或证书可以为 NULL，然后将从输出文件中省略。
   加密算法 NID 可以设置为 -1 表示无加密，mac 迭代计数可以设置为 0 表示省略 mac。

   增强了 pkcs12 工具，使其在创建 PKCS#12 文件时支持 -nokeys 和 -nocerts 选项。
   新增选项 -nomac 用于省略 mac，加密算法可以设置为 NONE。
   新代码已修改为使用增强的 PKCS12_create() 而不是低级 API。

   *Steve Henson*

 * 扩展了 ASN1 编码器以支持不定长构造编码。这可以输出这种形式的序列标签和字节串。
   修改 pk7_asn1.c 以支持不定长编码。这是实验性的，需要额外的代码才能有用，
   例如 ASN1 bio 和一些增强的流式 PKCS#7 代码。

   扩展了模板编码功能，以便将标签向下传递到模板编码器。

   *Steve Henson*

 * 让 'openssl req' 在 '-newkey' 的参数未识别时失败，而不是默认使用 RSA。

   *Bodo Moeller*

 * 添加了对 draft-ietf-tls-ecc-01.txt 中基于 ECC 的密码套件的支持。
   由于这些不是官方的，因此它们不包含在 "ALL" 中；
   可以使用 "ECCdraft" 密码套件组别名来选择它们。

   *Vipul Gupta 和 Sumit Gupta (Sun Microsystems Laboratories)*

 * 添加了 ECDH 引擎支持。

   *Nils Gura 和 Douglas Stebila (Sun Microsystems Laboratories)*

 * 在新目录 crypto/ecdh/ 中添加了 ECDH。

   *Douglas Stebila (Sun Microsystems Laboratories)*

 * 让 BN_rand_range() 在 100 次迭代不成功后中止并报错（这表明 PRNG 已损坏）。

   *Bodo Moeller*

 * 修改 BN_mod_sqrt()，使其验证输入值确实是返回值的平方。（之前，
   BN_mod_sqrt 会出现 GIGO 行为。）

   *Bodo Moeller*

 * 添加了 X9.62、SECG 和 WAP/WTLS 的命名椭圆曲线（基于二元域）；添加了仍然缺失的 OID。

   *Sheueling Chang Shantz 和 Douglas Stebila (Sun Microsystems Laboratories)*

 * 扩展了 EC 库以支持二元域上的椭圆曲线（crypto/ec/ 中新增文件 ec2_smpl.c, ec2_smpt.c, ec2_mult.c）。
   新的 EC_METHOD：

           EC_GF2m_simple_method

   新的 API 函数：

           EC_GROUP_new_curve_GF2m
           EC_GROUP_set_curve_GF2m
           EC_GROUP_get_curve_GF2m
           EC_POINT_set_affine_coordinates_GF2m
           EC_POINT_get_affine_coordinates_GF2m
           EC_POINT_set_compressed_coordinates_GF2m

   二元域的点压缩默认禁用（出于专利原因；编译时定义 OPENSSL_EC_BIN_PT_COMP 以启用）。

   由于二元多项式表示为 BIGNUM（其中符号位未使用），EC_GROUP 和 EC_POINT 数据结构中的各种成员可以在素域和二元域的实现之间共享；
   上述 `..._GF2m` 函数（除了 EX_GROUP_new_curve_GF2m）本质上与其 `..._GFp`
   对应函数相同。（为简化起见，`..._GFp` 前缀已从各种内部方法名称中删除。）

   已添加内部 'field_div' 方法（类似于 'field_mul' 和 'field_sqr'）；
   这仅用于二元域。

   *Sheueling Chang Shantz 和 Douglas Stebila (Sun Microsystems Laboratories)*

 * 可选地通过方法（'mul'、'precompute_mult'）分派 EC_POINT_mul()、EC_POINT_precompute_mult()。

   通用的实现（现在内部称为 'ec_wNAF_mul' 和 'ec_wNAF_precomputed_mult'）
   在这些方法未定义时仍然是默认的。

   *Sheueling Chang Shantz 和 Douglas Stebila (Sun Microsystems Laboratories)*

 * 新函数 EC_GROUP_get_degree，它通过 EC_METHOD 定义。
   对于素域上的曲线，它返回模的比特长度。

   *Sheueling Chang Shantz 和 Douglas Stebila (Sun Microsystems Laboratories)*

 * 新函数 EC_GROUP_dup, EC_POINT_dup。
   （它们只是调用 ..._new 和 ..._copy）。

   *Sheueling Chang Shantz 和 Douglas Stebila (Sun Microsystems Laboratories)*

 * 在 crypto/bn/bn_gf2m.c 中添加了二元多项式算术软件。
   多项式表示为 BIGNUM（其中符号位未被使用），在以下函数 [宏] 中：

           BN_GF2m_add
           BN_GF2m_sub             [= BN_GF2m_add]
           BN_GF2m_mod             [wrapper for BN_GF2m_mod_arr]
           BN_GF2m_mod_mul         [wrapper for BN_GF2m_mod_mul_arr]
           BN_GF2m_mod_sqr         [wrapper for BN_GF2m_mod_sqr_arr]
           BN_GF2m_mod_inv
           BN_GF2m_mod_exp         [wrapper for BN_GF2m_mod_exp_arr]
           BN_GF2m_mod_sqrt        [wrapper for BN_GF2m_mod_sqrt_arr]
           BN_GF2m_mod_solve_quad  [wrapper for BN_GF2m_mod_solve_quad_arr]
           BN_GF2m_cmp             [= BN_ucmp]

   （请注意，只有 'mod' 函数实际上是用于 GF(2^m) 域。
   BN_GF2m_add() 是一个误称，但这是为了保持一致性。）

   对于某些函数，定义域的不可约多项式可以作为 'unsigned int[]' 提供，
   其中包含严格递减的元素，给出设置的位的索引；即，p[] 代表多项式
           f(t) = t^p[0] + t^p[1] + ... + t^p[k]
   其中
           p[0] > p[1] > ... > p[k] = 0。
   这适用于以下函数：

           BN_GF2m_mod_arr
           BN_GF2m_mod_mul_arr
           BN_GF2m_mod_sqr_arr
           BN_GF2m_mod_inv_arr        [wrapper for BN_GF2m_mod_inv]
           BN_GF2m_mod_div_arr        [wrapper for BN_GF2m_mod_div]
           BN_GF2m_mod_exp_arr
           BN_GF2m_mod_sqrt_arr
           BN_GF2m_mod_solve_quad_arr
           BN_GF2m_poly2arr
           BN_GF2m_arr2poly

   转换可以通过以下函数执行：

           BN_GF2m_poly2arr
           BN_GF2m_arr2poly

   bntest.c 包含二元多项式算术的附加测试。

   提供了 BN_GF2m_mod_div() 的两种实现。
   默认算法仅使用 BN_GF2m_mod_inv() 和 BN_GF2m_mod_mul()。
   备用算法仅在定义 OPENSSL_SUN_GF2M_DIV 时编译（专利待定；启用前请阅读 crypto/bn/bn_gf2m.c 中的版权声明）。

   *Sheueling Chang Shantz 和 Douglas Stebila (Sun Microsystems Laboratories)*

 * 添加新的错误代码 'ERR_R_DISABLED'，当某些功能在编译时被禁用时可以使用。

   *Douglas Stebila <douglas.stebila@sun.com>*

 * 更改 'openssl asn1parse' 的默认行为，以便在查看证书等内容时显示更多信息：

   修改 asn1_parse2 (crypto/asn1/asn1_par.c)，使其在非 'dump' 模式下，
   非打印 OCTET STRING 的内容以类似于 INTEGER 的样式输出，但前面加上 '[HEX DUMP]'
   以避免出现可打印字符串的外观。

   *Nils Larsch <nla@trustcenter.de>*

 * 向 EC_GROUP 添加 'asn1_flag' 和 'asn1_form' 成员以及访问函数
           EC_GROUP_set_asn1_flag()
           EC_GROUP_get_asn1_flag()
           EC_GROUP_set_point_conversion_form()
           EC_GROUP_get_point_conversion_form()
   这些控制 ASN1 编码细节：
   - 曲线（即组）被显式编码，除非 asn1_flag
     被设置为 OPENSSL_EC_NAMED_CURVE。
   - 点默认以未压缩形式编码；asn1_for 的选项与 point2oct 相同，即
           POINT_CONVERSION_COMPRESSED
           POINT_CONVERSION_UNCOMPRESSED
           POINT_CONVERSION_HYBRID

   还向 EC_GROUP 添加了 'seed' 和 'seed_len' 成员以及访问函数
           EC_GROUP_set_seed()
           EC_GROUP_get0_seed()
           EC_GROUP_get_seed_len()
   这仅用于 ASN1 目的（到目前为止）。

   *Nils Larsch <nla@trustcenter.de>*

 * 向 EC_METHOD 添加 'field_type' 成员，其中包含相应字段类型 OID 的 NID。
   新函数 EC_METHOD_get_field_type() 返回此值。

   *Nils Larsch <nla@trustcenter.de>*

 * 添加函数
           EC_POINT_point2bn()
           EC_POINT_bn2point()
           EC_POINT_point2hex()
           EC_POINT_hex2point()
   提供有用的接口到 EC_POINT_point2oct() 和 EC_POINT_oct2point()。

   *Nils Larsch <nla@trustcenter.de>*

 * 修改 EC 库的内部实现，以便函数
           EC_GROUP_set_generator()
           EC_GROUP_get_generator()
           EC_GROUP_get_order()
           EC_GROUP_get_cofactor()
   直接在 crypto/ec/ec_lib.c 中实现，而不是分派到方法，这会导致不必要的代码重复，
   当添加不同类型的曲线时。

   *Nils Larsch <nla@trustcenter.de>，Bodo Moeller 提供输入*

 * 在 compute_wNAF (crypto/ec/ec_mult.c) 中实现，不使用 BIGNUM
   算术，并且生成修改后的 wNAF
   （在许多情况下避免长度扩展）。

   *Bodo Moeller*

 * 添加函数 EC_GROUP_check_discriminant()（通过 EC_METHOD 定义），
   该函数验证曲线判别式是否非零。

   添加函数 EC_GROUP_check()，对 EC_GROUP、其生成器和阶进行一些健全性测试。
   这包括 EC_GROUP_check_discriminant()。

   *Nils Larsch <nla@trustcenter.de>*

 * 在新目录 crypto/ecdsa/ 中添加了 ECDSA。

   添加应用程序 'openssl ecparam' 和 'openssl ecdsa'
   （它们基于 'openssl dsaparam' 和 'openssl dsa'）。

   ECDSA 支持也包含在库的各种其他文件中。最值得注意的是，
   - 'openssl req' 现在有一个 '-newkey ecdsa:file' 选项；
   - EVP_PKCS82PKEY (crypto/evp/evp_pkey.c) 现在可以处理 ECDSA；
   - X509_PUBKEY_get (crypto/asn1/x_pubkey.c) 和
     d2i_PublicKey (crypto/asn1/d2i_pu.c) 已被修改，使其适用于 ECDSA，
     其中必须先提取域参数，然后才能提取特定公钥；
   - 添加了 ECDSA 引擎支持。

   *Nils Larsch <nla@trustcenter.de>*

 * 包含一些命名的椭圆曲线，并添加了来自 X9.62、SECG 和 WAP/WTLS 的 OID。
   每条曲线都可以通过新函数
           EC_GROUP_new_by_curve_name()
   获取，并且可用命名曲线列表可以通过
           EC_get_builtin_curves()
   获取。还向 EC_GROUP 对象添加了 'curve_name' 成员，可以通过
           EC_GROUP_set_curve_name()
           EC_GROUP_get_curve_name()
   访问。

   *Nils Larsch <larsch@trustcenter.de, Bodo Moeller*

 * 从 BN_sqr()（其中的那个实际上从未需要）和 BN_mul() 中移除了几个对 bn_wexpand() 的调用。
   BN_mul() 中的移除需要对 bn_mul_part_recursive() 进行小改动，并添加了
   bn_cmp_part_words()、bn_sub_part_words() 和 bn_add_part_words() 函数，
   它们的功能与 bn_cmp_words()、bn_sub_words() 和 bn_add_words() 相同，
   只是它们接受大小不同的数组。

   *Richard Levitte*

### 0.9.7l 和 0.9.7m 之间的更改 [2007 年 2 月 23 日]

 * 在释放 PEM 缓冲区之前对其进行清理，因为它们可能包含敏感数据。

   *Benjamin Bennett <ben@psc.edu>*

 * 在 SSL_DEFAULT_CIPHER_LIST 中包含 "!eNULL"，以确保像 "DEFAULT:RSA" 这样的密码套件字符串不能启用
   仅用于身份验证的密码套件。

   *Bodo Moeller*

 * 由于 AES128 和 AES256 在 ssl/ssl_ciph.c 的逻辑中共享单个掩码位，
   因此在 AES128 可用但 AES256 不可用时，用于屏蔽禁用密码的代码需要一个技巧才能正常工作。

   *Victor Duchovni*

 * 将安全边界扩展到匹配 1.1.1 模块。

   *Steve Henson*

 * 移除冗余功能：哈希文件源、测试向量编辑，修改 fipsld 以使用外部 fips_premain.c 签名。

   *Steve Henson*

 * 新的 perl 脚本 mkfipsscr.pl，用于创建运行算法测试程序的 shell 脚本或批处理文件。

   *Steve Henson*

 * 使算法测试程序更能容忍空格。

   *Steve Henson*

 * 使 SSL/TLS 服务器实现能够容忍在接收 ClientHello 时出现“不匹配”的记录协议版本，
   即使 ClientHello 是分片的。（服务器在 ServerHello 消息告知客户端其选择之前，不能坚持使用它选择的特定协议版本。）

   *Bodo Moeller*

 * 如果错误代码尚未存在，则加载它们，而不是使用静态变量。这允许它们被干净地卸载和重新加载。

   *Steve Henson*

### 0.9.7k 和 0.9.7l 之间的更改 [2006 年 9 月 28 日]

 * 引入限制以防止恶意密钥导致拒绝服务。[CVE-2006-2940]

   *Steve Henson, Bodo Moeller*

 * 修复了某些无效结构可能导致拒绝服务的 ASN.1 解析。[CVE-2006-2937] [Steve Henson]

 * 修复了 SSL_get_shared_ciphers() 函数中的缓冲区溢出。[CVE-2006-3738] [Tavis Ormandy 和 Will Drewry, Google Security Team]

 * 修复了 SSL 客户端代码，该代码在连接到恶意 SSLv2 服务器时可能崩溃。[CVE-2006-4343]

   *Tavis Ormandy 和 Will Drewry, Google Security Team*

 * 更改密码套件字符串处理，以便显式密码套件选择该密码套件（因此 "AES256-SHA" 不再包含 "AES128-SHA"），
   以及来自*其他*协议版本的任何其他类似密码套件（相同位图）（因此 "RC4-MD5" 仍然包含 SSL 2.0 和 SSL 3.0/TLS 1.0 的密码套件）。
   这是结合了 0.9.8b 和 0.9.8d 更改的回溯。

   *Bodo Moeller*

### 0.9.7j 和 0.9.7k 之间的更改 [2006 年 9 月 5 日]

 * 避免了 Daniel Bleichenbacher 发现的 PKCS #1 v1.5 签名攻击 [CVE-2006-4339] [Ben Laurie 和 Google Security Team]

 * 将 Unix 随机性熵收集更改为在可能的情况下使用 poll() 而不是 select()，因为后者存在一些不理想的限制。

   *Darryl Miles 通过 Richard Levitte 和 Bodo Moeller*

 * 禁用恶意密码套件：

   - SSLv2 0x08 0x00 0x80 ("RC4-64-MD5")
   - SSLv3/TLSv1 0x00 0x61 ("EXP1024-RC2-CBC-MD5")
   - SSLv3/TLSv1 0x00 0x60 ("EXP1024-RC4-MD5")

   后两者据称来自 draft-ietf-tls-56-bit-ciphersuites-0[01].txt，但实际上并不在那里。

   此外，还停用了 draft-ietf-tls-56-bit-ciphersuites-01.txt 中的其余密码套件。
   这些同样是非官方的，并且 ID 已过期。

   *Bodo Moeller*

 * 修复了 RSA 盲化“幽灵错误”（在双核机器上有时会发生问题）和其他潜在的线程安全问题。

   *Bodo Moeller*

### 0.9.7i 和 0.9.7j 之间的更改 [2006 年 5 月 4 日]

 * 使 fipsld 和构建系统能够以 FIPS 模式链接到经过验证的 FIPS 模块。

   *Steve Henson*

 * 修复了 Windows 下 VC++ 2005 构建的问题。

   *Steve Henson*

 * 为 VC++ 添加了新的 Windows 构建目标 VC-32-GMAKE。它使用 GNU make，从 Windows bash shell（如 MSYS）运行。
   当从 VC++ 环境运行时，它由 "config" 脚本自动检测。修改了标准的 VC++ 构建以使用 GNU make 构建中的 fipscanister.o。

   *Steve Henson*

### 0.9.7h 和 0.9.7i 之间的更改 [2005 年 10 月 14 日]

 * 将 EVP_MAX_MD_SIZE 的定义包装在 #ifdef OPENSSL_FIPS 中。
   现在，值会根据是否为 FIPS 构建而有所不同。
   注意！链接了 FIPS 验证的 libcrypto 的程序不能安全地与非 FIPS 验证的 libcrypto 运行，
   因为它可能由于此更改引起的值差异而崩溃。

   *Andy Polyakov*

### 0.9.7g 和 0.9.7h 之间的更改 [2005 年 10 月 11 日]

 * 移除了 SSL_OP_MSIE_SSLV2_RSA_PADDING 功能（属于 SSL_OP_ALL）。
   此选项曾用于禁用 SSL 2.0 服务器实现中针对中间人协议版本回滚的对策，这是一个坏主意。（[CVE-2005-2969]）

   *Bodo Moeller；问题由 Yutaka Oiwa 指出（日本产业技术综合研究所信息安全研究中心 [AIST, Japan]）*

 * 对 X9.31 签名和 PSS 填充模式的最小支持。这主要是为了 FIPS 合规性，目前尚未完全集成。

   *Steve Henson*

 * 对于 DSA 签名，除非设置了 DSA_FLAG_NO_EXP_CONSTTIME，否则使用固定长度的指数执行指数运算。（否则，
   通过计时泄露的信息可能会在多次签名后暴露私钥；参见 Bleichenbacher 对 DSA 的带偏差 k 的攻击。）

   *Bodo Moeller*

 * 将新的固定窗口 mod_exp 实现设为 RSA、DSA 和 DH 私钥操作的默认实现，
   以便平方和乘法的序列以及内存访问模式与特定私钥无关。这将减轻缓存计时和潜在的相关攻击。

   BN_mod_exp_mont_consttime() 是新的指数实现，如果指数为新标志
   BN_FLG_EXP_CONSTTIME 设置，则 BN_mod_exp_mont() 会自动使用它。
   RSA、DSA 和 DH 将为私有指数使用此 BN 标志，除非分别设置了标志
   RSA_FLAG_NO_EXP_CONSTTIME、DSA_FLAG_NO_EXP_CONSTTIME 或 DH_FLAG_NO_EXP_CONSTTIME。

   *Matthew D Wood (Intel Corp)，Bodo Moeller 进行了一些更改*

 * 修改了 SSLv23_method() 和 SSLv23_client_method() 的客户端实现，
   以便在设置了 SSL_OP_NO_SSLv2 选项时使用 SSL 3.0/TLS 1.0 的 Client Hello 消息格式。
   （之前，即使设置了 SSL_OP_NO_SSLv2，也会使用 SSL 2.0 向后兼容的 Client Hello 消息格式。）

   *Bodo Moeller*

 * 添加了对 S/MIME 消息中 smime-type MIME 参数的支持，一些客户端需要此参数。

   *Steve Henson*

 * 新函数 BN_MONT_CTX_set_locked() 以线程安全的方式设置蒙哥马利参数。
   修改了 rsa 代码以使用新函数，并添加了对 dsa 和 dh 代码的调用（之前存在竞争条件）。

   *Steve Henson*

 * 将固定的错误库代码包含在 C 错误文件定义中，而不是在运行时进行修复。
   这保持了错误代码结构的常量性。

   *Steve Henson*

### 0.9.7f 和 0.9.7g 之间的更改 [2005 年 4 月 11 日]

[注意：OpenSSL 0.9.7h 及之后的 0.9.7 补丁级别是在 OpenSSL 0.9.8 之后发布的。]

 * 修复了较新的 kerberos 头文件。注意：需要进行类型转换，因为 'length' 字段在一个版本中是有符号的，而在另一个版本中是无符号的，并且似乎没有明显的方法来区分。没有这些，VC++ 会报错。此外，FAR（空白）的“定义”不再包含，ENOMEM 错误也不再包含。必须将 KRB5_PRIVATE 设置为 1 才能获取一些必要的定义。

   *Steve Henson*

 * 撤销了 Cygwin 的更改。

   *Ulf Möller*

 * 根据 RFC 3820 添加了对代理证书的支持。
   由于它们可能对不知情的应用程序构成安全威胁，因此必须在运行时显式允许它们。
   有关更多信息，请参阅 docs/HOWTO/proxy_certificates.txt。

   *Richard Levitte*

### 0.9.7e 和 0.9.7f 之间的更改 [2005 年 3 月 22 日]

 * 在生成服务器和客户端随机值时，使用 (SSL_RANDOM_VALUE - 4) 字节的伪随机数据。
   之前使用 (SSL_RANDOM_VALUE - sizeof(time_t))，这将在 sizeof(time_t) > 4 时（某些 64 位平台）导致更少的随机数据。

   此更改对安全性影响甚微，因为：

   1. 服务器和客户端随机值仍然具有 24 字节的伪随机数据。

   2. 服务器和客户端随机值在初始握手中以明文发送。

   3. 主密钥是通过预主密钥（对于静态 RSA 密码套件为 48 字节）以及客户端和服务器随机值派生的。

   OpenSSL 团队感谢英国 NISCC 将此问题提请我们注意。

   *Stephen Henson, 由 UK NISCC 报告*

 * 在 Cygwin 上使用 Windows 的随机数收集。

   *Ulf Möller*

 * 修复了 EGD/PRNGD 查询时挂起的问题，当通信套接字被 EGD/PRNGD 提前关闭时。

   *Darren Tucker <dtucker@zip.com.au> 通过 Lutz Jänicke，解决了 #1014*

 * 在 PKCS12 输入格式适当的情况下提示输入密码短语。

   *Steve Henson*

 * 从开发分支回溯了选定的性能改进，以及对 PowerPC 平台的改进支持。

   *Andy Polyakov*

 * 添加了对内存分配失败的大量检查，指示失败的错误代码，并在发生失败时释放内存。

   *Nauticus Networks SSL Team <openssl@nauticusnet.com>, Steve Henson*

 * 向 dgst 添加了新的 -passin 参数。

   *Steve Henson*

 * 在 X509_NAME_cmp 中执行了一些不同类型的字符比较：这对于某些证书是必需的，
   这些证书将 DN 重编码为 UTF8Strings（违反 RFC3280），并且无法或不愿意颁发名称滚动证书。

   *Steve Henson*

 * 在证书验证期间进行显式检查，以查看链中每个证书的 CA 设置是否正确。
   作为副作用，始终执行以下基本检查，而不仅仅是在有相关目的时：

   - 如果存在未处理的关键扩展（除非用户选择忽略此故障）
   - 如果路径长度已超出（如果设置了路径长度）
   - 某些扩展是否符合关联的目的（如果已给出目的）

   *Richard Levitte*

### 0.9.7d 和 0.9.7e 之间的更改 [2004 年 10 月 25 日]

 * 在多线程环境中检查 CRL 时，避免了竞争条件。这会由于在签名检查和序列号查找期间重新排序已撤销的条目而发生。现在编码被缓存，并且序列号排序在锁下执行。
   添加了新的 STACK 函数 sk_is_sorted()。

   *Steve Henson*

 * 在扩展代码中添加了 Delta CRL。

   *Steve Henson*

 * 对 s3_pkt.c 的各种修复，以正确发送警报。

   *David Holmes <d.holmes@f5.com>*

 * 减少了 OpenSSL 证书创建实用程序中重复的颁发者名称和序列号（违反 RFC3280）的可能性。
   这是通过在创建序列号文件或使用 'openssl req -x509' 创建自签名证书时，为初始序列号创建一个随机的 64 位值来实现的。
   初始序列号文件是通过 CA.pl 中的 'openssl x509 -next_serial' 创建的，而不是初始化为 1。

   *Steve Henson*

### 0.9.7c 和 0.9.7d 之间的更改 [2004 年 3 月 17 日]

 * 修复了 do_change_cipher_spec() 中的空指针赋值，该问题由 Codenomicon TLS 测试工具暴露 ([CVE-2004-0079])

   *Joe Orton, Steve Henson*

 * 修复了使用 Kerberos 密码套件时的 SSL/TLS 握手缺陷 ([CVE-2004-0112])

   *Joe Orton, Steve Henson*

 * 使 CA 索引文件中可以存在具有相同主题的多个活动证书。
   只有当配置文件中主 CA 部分（默认情况下为 'CA_default'）的关键字 'unique_subject'
   设置为 'no' 时，才会这样做。该值将与数据库本身一起保存在一个单独的索引属性文件中，
   该文件的命名方式与索引文件相同，但后缀为 '.attr'。

   *Richard Levitte*

 * X509 验证修复。当设置 X509_V_FLAGS_X509_STRICT 时，禁用损坏的证书的变通方法。
   检查 CRL 颁发者是否设置了 cRLSign（如果存在 keyUsage 扩展）。
   不接受带有未处理的关键扩展的 CRL：由于验证目前不处理 CRL 扩展，因此这会拒绝带有*任何*关键扩展的 CRL。
   为这些情况添加了新的验证错误代码。

   *Steve Henson*

 * 在创建 OCSP nonce 时，使用 OCTET STRING 包装在 extnValue 中。
   RFC2560 的澄清要求使用 OCTET STRING，并且某些实现无法处理当前的原始格式。
   由于 OpenSSL 将 OCSP nonce 复制和比较为不透明的 blob，而无需解析它们，因此这不会造成任何兼容性问题。

   *Steve Henson*

 * 新的 md 标志 EVP_MD_CTX_FLAG_REUSE，它允许在调用 EVP_MD_CTX_copy_ex() 时重用 md_data，
   以避免调用 OPENSSL_malloc()。没有这个，HMAC（和其他）操作比 OpenSSL < 0.9.7 慢几倍。

   *Steve Henson*

 * 在 ASN1_STRING_print_ex() 中打印 GeneralizedTime 和 UTCTime。

   *Peter Sylvester <Peter.Sylvester@EdelWeb.fr>*

 * 在签名类型 "other" 时使用正确的内容。

   *Steve Henson*

### 0.9.7b 和 0.9.7c 之间的更改 [2003 年 9 月 30 日]

 * 修复了运行 NISCC 测试套件时暴露的各种错误：

   当遇到无效标签时，停止 ASN1 代码中的越界读取 (CVE-2003-0543 和 CVE-2003-0544)。

   如果 ANY 类型无效，则正确释放 ASN1_TYPE ([CVE-2003-0545])。

   如果验证回调忽略无效公钥错误，则不要尝试使用 NULL 公钥检查证书签名。

   *Steve Henson*

 * ocsp 应用程序中的新 -ignore_err 选项，用于阻止服务器在请求中的第一个错误时退出。

   *Steve Henson*

 * 在 ssl3_accept() (ssl/s3_srvr.c) 中，仅当服务器请求客户端证书时才接受它：如 TLS 1.0 和 SSL 3.0
   规范所述。

   *Steve Henson*

 * 在 ssl3_get_client_hello() (ssl/s3_srvr.c) 中，不仅允许 TLS 1.0，还允许 SSL 3.0
   （根据规范要求）在压缩方法之后容忍额外的额外数据。

   *Bodo Moeller；问题由 Matthias Loepfe 指出*

 * 将 X509_certificate_type() 更改为将密钥标记为已导出/可导出，当它长达 512 *位*时，而不是 512 字节。

   *Richard Levitte*

 * 将 AES_cbc_encrypt() 更改为在加密过程中输出块的精确倍数。

   *Richard Levitte*

 * 对 base64 BIO 和非阻塞 I/O 的各种修复。在写入时，如果 BIO 重试，则刷新未正确处理。
   在读取时，数据未正确缓冲并存在各种逻辑错误。
   这也影响到当被解码的数据大小为特定值时的阻塞 I/O。

   *Steve Henson*

 * S/MIME 的各种错误修复和兼容性更改：
   如果设置了 PKCS7_NOOLDMIMETYPE，则输出正确的 application/pkcs7 MIME 类型。
   容忍一些损坏的签名。
   如果设置了 PKCS7_CRLFEOL，则输出 CR+LF 作为 EOL（这使得打开文件为 .eml 可以正常工作）。
   正确处理 MIME 解析器中的非常长的行。

   *Steve Henson*

### 0.9.7a 和 0.9.7b 之间的更改 [2003 年 4 月 10 日]

 * Countermeasure against the Klima-Pokorny-Rosa extension of
   Bleichbacher's attack on PKCS #1 v1.5 padding: treat
   a protocol version number mismatch like a decryption error
   in ssl3_get_client_key_exchange (ssl/s3_srvr.c).

   *Bodo Moeller*

 * Turn on RSA blinding by default in the default implementation
   to avoid a timing attack. Applications that don't want it can call
   RSA_blinding_off() or use the new flag RSA_FLAG_NO_BLINDING.
   They would be ill-advised to do so in most cases.

   *Ben Laurie, Steve Henson, Geoff Thorpe, Bodo Moeller*

 * Change RSA blinding code so that it works when the PRNG is not
   seeded (in this case, the secret RSA exponent is abused as
   an unpredictable seed -- if it is not unpredictable, there
   is no point in blinding anyway).  Make RSA blinding thread-safe
   by remembering the creator's thread ID in rsa->blinding and
   having all other threads use local one-time blinding factors
   (this requires more computation than sharing rsa->blinding, but
   avoids excessive locking; and if an RSA object is not shared
   between threads, blinding will still be very fast).

   *Bodo Moeller*

 * Fixed a typo bug that would cause ENGINE_set_default() to set an
   ENGINE as defaults for all supported algorithms irrespective of
   the 'flags' parameter. 'flags' is now honoured, so applications
   should make sure they are passing it correctly.

   *Geoff Thorpe*

 * Target "mingw" now allows native Windows code to be generated in
   the Cygwin environment as well as with the MinGW compiler.

   *Ulf Moeller*

### Changes between 0.9.7 and 0.9.7a  [19 Feb 2003]

 * In ssl3_get_record (ssl/s3_pkt.c), minimize information leaked
   via timing by performing a MAC computation even if incorrect
   block cipher padding has been found.  This is a countermeasure
   against active attacks where the attacker has to distinguish
   between bad padding and a MAC verification error. ([CVE-2003-0078])

   *Bodo Moeller; problem pointed out by Brice Canvel (EPFL),
   Alain Hiltgen (UBS), Serge Vaudenay (EPFL), and
   Martin Vuagnoux (EPFL, Ilion)*

 * Make the no-err option work as intended.  The intention with no-err
   is not to have the whole error stack handling routines removed from
   libcrypto, it's only intended to remove all the function name and
   reason texts, thereby removing some of the footprint that may not
   be interesting if those errors aren't displayed anyway.

   NOTE: it's still possible for any application or module to have its
   own set of error texts inserted.  The routines are there, just not
   used by default when no-err is given.

   *Richard Levitte*

 * Add support for FreeBSD on IA64.

   *dirk.meyer@dinoex.sub.org via Richard Levitte, resolves #454*

 * Adjust DES_cbc_cksum() so it returns the same value as the MIT
   Kerberos function mit_des_cbc_cksum().  Before this change,
   the value returned by DES_cbc_cksum() was like the one from
   mit_des_cbc_cksum(), except the bytes were swapped.

   *Kevin Greaney <Kevin.Greaney@hp.com> and Richard Levitte*

 * Allow an application to disable the automatic SSL chain building.
   Before this a rather primitive chain build was always performed in
   ssl3_output_cert_chain(): an application had no way to send the
   correct chain if the automatic operation produced an incorrect result.

   Now the chain builder is disabled if either:

   1. Extra certificates are added via SSL_CTX_add_extra_chain_cert().

   2. The mode flag SSL_MODE_NO_AUTO_CHAIN is set.

   The reasoning behind this is that an application would not want the
   auto chain building to take place if extra chain certificates are
   present and it might also want a means of sending no additional
   certificates (for example the chain has two certificates and the
   root is omitted).

   *Steve Henson*

 * Add the possibility to build without the ENGINE framework.

   *Steven Reddie <smr@essemer.com.au> via Richard Levitte*

 * Under Win32 gmtime() can return NULL: check return value in
   OPENSSL_gmtime(). Add error code for case where gmtime() fails.

   *Steve Henson*

 * DSA routines: under certain error conditions uninitialized BN objects
   could be freed. Solution: make sure initialization is performed early
   enough. (Reported and fix supplied by Ivan D Nestlerode <nestler@MIT.EDU>,
   Nils Larsch <nla@trustcenter.de> via PR#459)

   *Lutz Jaenicke*

 * Another fix for SSLv2 session ID handling: the session ID was incorrectly
   checked on reconnect on the client side, therefore session resumption
   could still fail with a "ssl session id is different" error. This
   behaviour is masked when SSL_OP_ALL is used due to
   SSL_OP_MICROSOFT_SESS_ID_BUG being set.
   Behaviour observed by Crispin Flowerday <crispin@flowerday.cx> as
   followup to PR #377.

   *Lutz Jaenicke*

 * IA-32 assembler support enhancements: unified ELF targets, support
   for SCO/Caldera platforms, fix for Cygwin shared build.

   *Andy Polyakov*

 * Add support for FreeBSD on sparc64.  As a consequence, support for
   FreeBSD on non-x86 processors is separate from x86 processors on
   the config script, much like the NetBSD support.

   *Richard Levitte & Kris Kennaway <kris@obsecurity.org>*

### Changes between 0.9.6h and 0.9.7  [31 Dec 2002]

[NB: OpenSSL 0.9.6i and later 0.9.6 patch levels were released after
OpenSSL 0.9.7.]

 * 修复 SSLv2 客户端代码中的会话 ID 处理：SERVER FINISHED
   代码 (06) 被视为会话 ID 的第一个字节，最后一个字节
   被忽略。因此，由于客户端和服务器之间的会话 ID 不匹配，SSLv2 客户端会话
   缓存无法正常工作。
   Crispin Flowerday <crispin@flowerday.cx> 报告的错误，PR #377。

   *Lutz Jaenicke*

 * 更改所需 Kerberos 库的声明，使用 EX_LIBS 而不是特殊的（且支持不佳的）LIBKRB5。LIBKRB5 已完全移除。

   *Richard Levitte*

 * hw_ncipher.c 引擎需要动态锁。不幸的是，尽管存在一年多了，许多应用程序作者都没有提供必要的回调函数，这意味着这个特定的引擎在任何地方都无法正常工作。
   这是一个非常不幸的情况，为了可用性，我们被迫为 hw_ncipher.c 提供一个静态锁，该锁是 libcrypto 的一部分。
   注意：这仅适用于 0.9.7 系列！此 hack 永远不会出现在 0.9.8 或更高版本中。我们期望应用程序作者在 0.9.8 发布时能妥善处理此问题（除非我们实际对 libcrypto 锁定代码进行更改，届时无论如何都需要进行更改）。

   *Richard Levitte*

 * 在 asn1_d2i_read_bio() 中重复调用 BIO_read()，直到读取完所有内容字节、达到 EOF 或发生错误。没有此更改，一些截断的 ASN1 结构将不会产生错误。

   *Steve Henson*

 * 禁用 Heimdal 支持，因为它尚未完全实现。
   仍然提供强制使用 Heimdal 的可能性，但会发出警告并请求将补丁发送到 openssl-dev。

   *Richard Levitte*

 * 添加 VC-CE 目标，引入 WINCE sysname，并添加 INSTALL.WCE 和相应的条件编译以使其能够构建。

   *Steven Reddie <smr@essemer.com.au> 通过 Richard Levitte*

 * 将 Cygwin 的 DLL 名称更改为 cygcrypto-x.y.z.dll 和
   cygssl-x.y.z.dll，其中 x、y 和 z 是版本的主版本号、次版本号和编辑号。

   *Corinna Vinschen <vinschen@redhat.com> 和 Richard Levitte*

 * 引入安全的字符串复制和连接函数
   （BUF_strlcpy() 和 BUF_strlcat()）。

   *Ben Laurie (CHATS) 和 Richard Levitte*

 * 避免为单行 DN 使用固定大小的缓冲区。

   *Ben Laurie (CHATS)*

 * 添加 BUF_MEM_grow_clean() 以避免在调整包含秘密的缓冲区大小时泄露信息，并在适当的地方使用。

   *Ben Laurie (CHATS)*

 * 避免为配置文件位置使用固定大小的缓冲区。

   *Ben Laurie (CHATS)*

 * 避免各种 CA 文件的文件名截断。

   *Ben Laurie (CHATS)*

 * 优先使用 sizeof 而不是魔术数字。

   *Ben Laurie (CHATS)*

 * 避免证书请求中的文件名截断。

   *Ben Laurie (CHATS)*

 * 添加断言以检查（据称不可能的）缓冲区溢出。

   *Ben Laurie (CHATS)*

 * 不要将截断的 DNS 条目缓存到本地缓存中（这可能导致欺骗攻击）。

   *Ben Laurie (CHATS)*

 * 修复各种缓冲区，使其足够大以容纳平台无关的十六进制/十进制表示。

   *Ben Laurie (CHATS)*

 * 添加 CRYPTO_realloc_clean() 以避免在调整包含秘密的缓冲区大小时泄露信息，并在适当的地方使用。

   *Ben Laurie (CHATS)*

 * 添加 BIO_indent() 以避免大量令人担忧的代码用于缩进。

   *Ben Laurie (CHATS)*

 * 将 sprintf()/BIO_puts() 转换为 BIO_printf()。

   *Ben Laurie (CHATS)*

 * buffer_gets() 可能在缓冲区只填充一半时终止。已修复。

   *Ben Laurie (CHATS)*

 * 添加断言以防止用户提供的加密函数因大块大小等而溢出内部缓冲区。

   *Ben Laurie (CHATS)*

 * 新的 OPENSSL_assert() 宏（类似于 assert()，但无条件启用）。

   *Ben Laurie (CHATS)*

 * 消除 RC4 中未使用的密钥副本。

   *Ben Laurie (CHATS)*

 * 消除 pem.h 中未使用的且大小不正确的 IV 缓冲区。

   *Ben Laurie (CHATS)*

 * 修复 EGD 路径中的偏移一错误。

   *Ben Laurie (CHATS)*

 * 如果 RANDFILE 路径过长，则忽略而不是截断。

   *Ben Laurie (CHATS)*

 * 消除 X.509 结构 CBCParameter 中未使用的且大小不正确的字段。

   *Ben Laurie (CHATS)*

 * 消除未使用且危险的函数 knumber()。

   *Ben Laurie (CHATS)*

 * 消除未使用且危险的结构 KSSL_ERR。

   *Ben Laurie (CHATS)*

 * 防止编码会话对象中的会话 ID 上下文长度过长。由于这些是本地的，因此似乎无法利用。

   *Ben Laurie (CHATS)*

 * 更改安全补丁（参见下面的 0.9.6e），该补丁未影响 0.9.6 发布系列：

   SSL3 协议中的远程缓冲区溢出 - 攻击者可以在启用 Kerberos 的版本中提供超大主密钥。
   ([CVE-2002-0657])

   *Ben Laurie (CHATS)*

 * 更改 SSL kerb5 代码以符合 RFC 2712。

   *Richard Levitte*

 * 使 req 的 -nameopt 完全生效，并添加 -reqopt 开关。

   *Michael Bell <michael.bell@rz.hu-berlin.de>，Steve Henson*

 * 块密码在 CFB 和 OFB 模式下的“块大小”应为 1。

   *Steve Henson，由 Yngve Nysaeter Pettersen <yngve@opera.com> 报告*

 * 确保即使相应的算法已被完全删除，也可以执行测试。这也是在所有合理条件下使用 DJGPP 编译 OpenSSL 的最后一步。

   *Richard Levitte，Doug Kaufman <dkaufman@rahul.net>*

 * 添加密码选择规则 COMPLEMENTOFALL 和 COMPLEMENTOFDEFAULT
   以允许版本无关地禁用通常未选择的密码，这些密码可能会作为选择单个密码的副作用而被激活。

   （例如，密码列表字符串“RSA”会启用因不提供对称加密而被排除在“ALL”之外的密码套件。
   “RSA:!COMPLEMEMENTOFALL”可避免这些不安全的密码套件。）

   *Lutz Jaenicke，Bodo Moeller*

 * 添加对独立平台相关构建目录的适当支持。推荐的构建平台相关目录的方法如下（在 Linux 上测试过），可能需要一些本地调整：

           # 将自己置于 OpenSSL 源树之外。在此
           # 示例中，假定环境变量 OPENSSL_SOURCE
           # 包含 OpenSSL 源目录的绝对路径。
           mkdir -p objtree/"`uname -s`-`uname -r`-`uname -m`"
           cd objtree/"`uname -s`-`uname -r`-`uname -m`"
           (cd $OPENSSL_SOURCE; find . -type f) | while read F; do
                   mkdir -p `dirname $F`
                   ln -s $OPENSSL_SOURCE/$F $F
           done

   为确保不干扰源树，执行“make clean”是一个好习惯。如果它不成功，请不要担心，
   这可能意味着源目录非常干净。

   *Richard Levitte*

 * 确保任何 ENGINE 控制命令在必要时都对传递给它们的字符串指针进行本地复制。否则，当后续 ENGINE 操作尝试使用存储的值时，调用者可能会覆盖（或释放）原始字符串数据。

   *Götz Babin-Ebell <babinebell@trustcenter.de>*

 * 改进文件读取和命令行摘要的诊断信息。

   *Ben Laurie 在 Solar Designer <solar@openwall.com> 的协助下*

 * 将 AES 模式 CFB 和 OFB 添加到对象数据库。修正 AES-CFB 解密中的错误。

   *Richard Levitte*

 * 移除 evp_enc.c 中的大多数 EVP_CIPHER_CTX_cleanup() 调用，这允许在调用 `EVP_*Final()` 后重用现有的 EVP_CIPHER_CTX 结构。加密
   BIO 和一些应用程序会使用此行为。其副作用是
   应用程序必须显式使用 EVP_CIPHER_CTX_cleanup() 清理密码上下文，否则会内存泄漏。

   *Steve Henson*

 * 在调用 bn_mul_comba 之前检查 bn_mul_recursive 中 dna 和 dnb 的值（非零值表示 a 或 b 数组不包含 n2 个元素），如果其中任何一个不为零，则回退到 bn_mul_normal。

   *Steve Henson*

 * 修复“openssl req”命令行工具使用 -subj 选项时非 ASCII 字符的转义。（Robert Joop <joop@fokus.gmd.de>）

   *Lutz Jaenicke*

 * 使对象定义符合 LDAP (RFC2256)：SN 是“surname”的短形式，serialNumber 没有短形式。
   根据 RFC2798，使用“mail”作为“rfc822Mailbox”的短名称；
   因此，删除“mail”作为“internet 7”的短名称。
   X509 证书中唯一标识符的 OID 是
   x500UniqueIdentifier，而不是 uniqueIdentifier。
   一些额外的 OID 添加。（Michael Bell <michael.bell@rz.hu-berlin.de>）

   *Lutz Jaenicke*

 * 向 ENGINE 配置模块添加“init”命令并自动初始化
   ENGINE。如果没有“init”命令，则在所有控制命令执行完毕后初始化 ENGINE。如果 init=1，则在此时初始化 ENGINE（在此之前的控制命令在未初始化的 ENGINE 上运行，之后在已初始化的 ENGINE 上运行）。如果 init=0，则根本不初始化 ENGINE。

   *Steve Henson*

 * 修复 'app_verify_callback' 接口，以便将用户定义的参数实际传递给回调函数：在
   SSL_CTX_set_cert_verify_callback() 原型中，回调
   声明已从
           int (*cb)()
   更改为
           int (*cb)(X509_STORE_CTX *,void *);
   在 ssl_verify_cert_chain (ssl/ssl_cert.c) 中，调用
           i=s->ctx->app_verify_callback(&ctx)
   已更改为
           i=s->ctx->app_verify_callback(&ctx, s->ctx->app_verify_arg)。

   要更新使用 SSL_CTX_set_cert_verify_callback() 的应用程序，
   可以在其回调函数中添加一个虚拟参数。

   *D. K. Smetters <smetters@parc.xerox.com>*

 * 添加了 '4758cca' ENGINE 以支持 IBM 4758 卡。

   *Maurice Gittens <maurice@gittens.nl>，Geoff Thorpe 进行了润色*

 * 添加 OPENSSL_LOAD_CONF 定义，这将导致
   OpenSSL_add_all_algorithms() 加载 openssl.cnf 配置文件。
   这允许旧应用程序透明地支持某些
   OpenSSL 功能：例如加密加速和动态 ENGINE 加载。
   还添加了两个新函数 OPENSSL_add_all_algorithms_noconf()（永远不会加载
   配置文件）和 OPENSSL_add_all_algorithms_conf()（总是加载它）。

   *Steve Henson*

 * 将 AES 添加到 OFB、CFB 和 CTR（所有反馈均为 128 位）。
   调整 NID 和 EVP 层。

   *Stephen Sprunk <stephen@sprunk.org> 和 Richard Levitte*

 * openssl 工具中的配置模块支持。

   大多数命令现在从配置文件加载模块，
   但在少数命令（如 version）中，由于无法用于任何目的而未执行此操作。

   对于 ca 和 req 命令，使用的配置文件与实用程序本身相同：即可以使用 -config
   命令行选项指定备用文件。

   *Steve Henson*

 * 将默认行为从 OPENSSL_config() 移出。如果 appname 为 NULL，则使用“openssl_conf”；如果 filename 为 NULL，则使用默认的 openssl 配置文件。

   *Steve Henson*

 * 向 OPENSSL_config() 添加一个参数，以允许使用备用配置文件部分名称。添加一个新标志以容忍缺失的配置文件，并将代码移至 CONF_modules_load_file()。

   *Steve Henson*

 * 支持来自 Accelerated Encryption
   Processing (www.aep.ie) 的加密加速卡。（使用引擎 'aep'）
   支持从 0.9.6c [engine] 复制并改编/更正以适应新的引擎框架。

   *AEP Inc. 和 Richard Levitte*

 * 支持来自 Baltimore
   Technologies 的 SureWare 加密加速卡。（使用引擎 'sureware'）
   支持从 0.9.6c [engine] 复制并改编以适应新的引擎框架。

   *Richard Levitte*

 * 使 CHIL 引擎具有 fork 安全性（根据 nCipher 定义），并实际使 CHIL 引擎的较新 ENGINE 框架命令生效。

   *Toomas Kiisk <vix@cyber.ee> 和 Richard Levitte*

 * 使 ReliantUNIX 上可以生成共享库。

   *Robert Dahlem <Robert.Dahlem@ffm2.siemens.de> 通过 Richard Levitte*

 * 添加配置目标 debug-linux-ppro。
   使 'openssl rsa' 使用 `apps.c` 中实现的通用密钥加载例程，并使这些例程能够
   处理密钥格式 FORMAT_NETSCAPE 和变体
   FORMAT_IISSGC。

   *Toomas Kiisk <vix@cyber.ee> 通过 Richard Levitte*

 * 修复 hwcrhk_load_pubkey() 中的崩溃错误和逻辑错误。

   *Toomas Kiisk <vix@cyber.ee> 通过 Richard Levitte*

 * 为 rsautl 添加 -keyform，并记录 -engine。

   *Richard Levitte，受 Toomas Kiisk <vix@cyber.ee> 启发*

 * 更改 BIO_new_file (crypto/bio/bss_file.c)，以便在 fopen() 因 ENOENT 而失败时使用新的
   BIO_R_NO_SUCH_FILE 错误代码而不是通用的
   ERR_R_SYS_LIB 错误代码。

   *Ben Laurie*

 * 添加新函数
           ERR_peek_last_error
           ERR_peek_last_error_line
           ERR_peek_last_error_line_data。
   这些函数类似于
           ERR_peek_error
           ERR_peek_error_line
           ERR_peek_error_line_data，
   但报告的是最后记录的错误而不是错误队列中的第一个错误。

   *Ben Laurie，Bodo Moeller*

 * ENGINE 配置模块中的 default_algorithms 选项。这允许以下操作：
   default_algorithms = ALL
   default_algorithms = RSA, DSA, RAND, CIPHERS, DIGESTS

   *Steve Henson*

 * 初步的 ENGINE 配置模块。

   *Steve Henson*

 * 新的实验性应用程序配置代码。

   *Steve Henson*

 * 更改 AES 代码以遵循与其他对称密码相同的命名结构，并表现相同。将所有内容移至
   crypto/aes 目录，从而淘汰 crypto/rijndael。

   *Stephen Sprunk <stephen@sprunk.org> 和 Richard Levitte*

 * 安全：移除 ui_openssl.c 中不安全的 setjmp/signal 交互。

   *Ben Laurie 和 Theo de Raadt*

 * 添加选项以在 req 命令中输出公钥。

   *Massimiliano Pala madwolf@openca.org*

 * 在 EC_POINTs_mul() 中使用 wNAFs 以提高效率
   （对于 P-192 和 P-224，效率比之前提高了约 10%）。

   *Bodo Moeller*

 * 新函数/宏

           SSL_CTX_set_msg_callback(ctx, cb)
           SSL_CTX_set_msg_callback_arg(ctx, arg)
           SSL_set_msg_callback(ssl, cb)
           SSL_set_msg_callback_arg(ssl, arg)

   以便在完全接收（write_p == 0）或发送（write_p == 1）协议消息时调用回调函数

           void cb(int write_p, int version, int content_type,
                   const void *buf, size_t len, SSL *ssl, void *arg)

   其中 'version' 是 SSL 库解释当前协议消息所依据的协议版本（SSL2_VERSION、SSL3_VERSION 或
   TLS1_VERSION）。'content_type' 在 SSL 2.0 的情况下为 0，或根据 SSL 3.0/TLS 1.0 协议规范定义的类型
   （change_cipher_spec(20)、alert(21)、handshake(22)）。
   'buf' 和 'len' 指向实际消息，'ssl' 指向
   SSL 对象，'arg' 是由 SSL[_CTX]_set_msg_callback_arg() 设置的应用程序定义的 قيمة。

   'openssl s_client' 和 'openssl s_server' 有新的 '-msg' 选项
   以启用显示所有协议消息的回调。

   *Bodo Moeller*

 * 更改共享库支持，以便在相应的静态库完成后立即构建共享库，从而使 openssl 和测试程序链接到共享库。
   当配置脚本给出“shard”关键字时，仍然会发生这种情况。

   注意：共享库支持仍处于实验阶段，二进制向后兼容性仍不能保证。

   *"Maciej W. Rozycki" <macro@ds2.pg.gda.pl> 和 Richard Levitte*

 * 添加对 Subject Information Access 扩展的支持。

   *Peter Sylvester <Peter.Sylvester@EdelWeb.fr>*

 * 使 BUF_MEM_grow() 的行为更加一致：当需要分配新内存时，将额外的字节初始化为零，而不仅仅是在重用现有缓冲区时。

   *Bodo Moeller*

 * req 命令的新命令行和配置文件选项 'utf8'。
   这允许将字段值指定为 UTF8 字符串。

   *Steve Henson*

 * 为“openssl speed”添加 -multi 和 -mr 选项 - 分别提供多个并行运行和机器可读的输出。

   *Ben Laurie*

 * 为 'openssl ca' 添加 '-noemailDN' 选项。这可以防止在 DN 中包含电子邮件地址（即，它只进入证书扩展）。
   新的配置文件选项 'email_in_dn = no' 具有相同效果。

   *Massimiliano Pala madwolf@openca.org*

 * 将所有以 `des_` 开头的函数名称更改为以 `DES_` 开头。添加与 libdes 兼容的包装器，但名称为 `_ossl_old_des_*`。最后，添加宏，将 `des_*` 符号映射到相应的 `_ossl_old_des_*`，如果需要 libdes
   兼容性。如果需要 OpenSSL 0.9.6c 兼容性，`des_*` 符号将被映射到 `DES_*`，但有一个例外。

   由于我们提供两种兼容性映射，用户需要定义宏 OPENSSL_DES_LIBDES_COMPATIBILITY 以获得 libdes
   兼容性。默认情况下（即，当未定义该宏时）是 OpenSSL 0.9.6c 兼容性。

   还有宏可以启用和禁用旧
   des 函数的整体支持。这些是 OPENSSL_ENABLE_OLD_DES_SUPPORT
   和 OPENSSL_DISABLE_OLD_DES_SUPPORT。如果未定义其中任何一个或两者都未定义，则将应用默认设置：支持旧的 des 例程。

   在任何一种情况下，都必须包含 openssl/des.h 以获取正确的
   定义。不要尝试仅包含 openssl/des_old.h，那将不起作用。

   注意：这是一个重大的 API 更改，从旧 API 到新 API。鼓励软件作者切换到 `DES_` 风格的函数。在不久的将来，des_old.h 和 libdes 兼容性函数将被禁用（即，OPENSSL_DISABLE_OLD_DES_SUPPORT 将是
   默认设置），然后完全移除。

   *Richard Levitte*

 * 测试包含不受支持的关键扩展的证书。
   如果在验证操作期间找到此类证书，则默认情况下会拒绝它：可以通过处理新的错误 X509_V_ERR_UNHANDLED_CRITICAL_EXTENSION 或
   通过设置验证标志 X509_V_FLAG_IGNORE_CRITICAL 来覆盖此行为。还添加了一个新函数
   X509_supported_extension()，它在支持特定扩展时返回 1。

   *Steve Henson*

 * 以与摘要类似的方式修改 EVP 密码函数行为，以保持与现有代码的兼容性。

   *Steve Henson*

 * 修改 EVP_DigestInit() 和 EVP_DigestFinal() 的行为以保持与现有代码的兼容性。特别是，“ctx”参数在调用 EVP_DigestInit() 之前不必初始化，并且在调用 EVP_DigestFinal() 后会被清理。新的函数
   EVP_DigestFinal_ex() 不会清理 ctx。类似地，函数 EVP_MD_CTX_copy() 更改为不需要目标已初始化为有效，并添加了新的函数 EVP_MD_CTX_copy_ex()，该函数要求目标有效。

   修改所有 OpenSSL 摘要调用以使用 EVP_DigestInit_ex()、
   EVP_DigestFinal_ex() 和 EVP_MD_CTX_copy_ex()。

   *Steve Henson*

 * 更改 ssl3_get_message (ssl/s3_both.c) 及其使用的函数，以便将完整的“Handshake”协议结构保留在内存中，而不是用“body”数据覆盖“msg_type”和“length”。

   *Bodo Moeller*

 * 为 Win32 添加 SSL_add_dir_cert_subjects_to_stack 的实现。

   *Massimo Santin 通过 Richard Levitte*

 * 对底层 ENGINE 代码进行重大重构。这包括减少链接器膨胀，将纯粹的“ENGINE”操作（初始化等）与处理特定加密接口实现的逻辑分离。此更改还引入了对对称密码和摘要实现的集成支持 - 因此 ENGINE 现在可以通过提供自己的 EVP_CIPHER 和 EVP_MD
   实现来加速它们。这在
   [crypto/engine/README.md](crypto/engine/README.md) 中有详细说明，因为它无法在此处充分描述。但是，有几个 API 更改值得注意 - 一些 RSA、DSA、DH 和 RAND 函数在最初引入 ENGINE 代码时被更改，现在已恢复 - 从该代码到 ENGINE 的挂钩现在更加被动，并且在运行时，操作直接处理 RSA_METHODs、DSA_METHODs（等），就像以前一样，而不是通过 ENGINE 指针进行解引用。此外，处理 `BN_MOD_EXP[_CRT]` 处理程序的 ENGINE 函数已被移除 - 框架没有使用它们，因为没有 BIGNUM_METHOD 的概念，并且它们无法泛化到新的
   “ENGINE_TABLE”机制，该机制是新代码的基础。类似地，ENGINE_cpy() 已被移除，因为它无法在新代码中一致地定义。

   *Geoff Thorpe*

 * 更改 ASN1_GENERALIZEDTIME_check() 以允许小数秒。

   *Steve Henson*

 * 更改 mkdef.pl 以对具有相同条目号的符号进行排序，并确保自动生成的函数 `ERR_load_*`
   也成为 libeay.num 的一部分。

   *Richard Levitte*

 * 新函数 SSL_renegotiate_pending()。当重新协商被请求时（调用 SSL_renegotiate()
   或从对等方接收到 HelloRequest/ClientHello），此函数返回 true，并在握手完成后变为 false。
   （对于服务器，SSL_renegotiate() 后跟 SSL_do_handshake()
   会发送 HelloRequest，但不能保证握手会发生。SSL_renegotiate_pending()
   可用于检查客户端是否遵循了请求。）

   *Bodo Moeller*

 * 新的 SSL 选项 SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION。
   默认情况下，客户端可以在重新协商期间请求会话恢复（如果会话 ID 上下文允许）；使用此选项，仅在第一次握手中可以恢复会话。

   SSL_OP_ALL 现在是 0x00000FFFL 而不是 0x000FFFFFL。这为不应包含在
   SSL_OP_ALL 中的选项（如 SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION）提供了更多位。

   *Bodo Moeller*

 * 添加一些证书和证书请求创建的演示。

   *Steve Henson*

 * 使对等应用程序接受的最大证书链大小可设置（`SSL*_get/set_max_cert_list()`），由
   “Douglas E. Engert”<deengert@anl.gov> 提出。

   *Lutz Jaenicke*

 * 添加对 Unixware-7 的共享库支持
   （Boyd Lynn Gerber <gerberb@zenez.com>）。

   *Lutz Jaenicke*

 * 向 ENGINE 添加“destroy”处理程序，该处理程序允许在销毁之前进行结构清理。使用此功能卸载加载了自己的错误字符串的 ENGINE 的错误字符串。注意：这向“get”和“set”引擎中的此销毁处理程序添加了两个新的 API 函数。

   *Geoff Thorpe*

 * 更改除“openssl”和
   “openbsd”之外的所有现有 ENGINE 实现，使其动态实例化自己的错误字符串。这使它们更灵活，可以作为静态链接的 ENGINE 和通过“dynamic”引擎加载的自包含共享库进行构建。此外，在每个实现中添加存根代码，以便更容易将其构建为自包含的共享库（请参阅 [README-Engine.md](README-Engine.md)）。

   *Geoff Thorpe*

 * 添加一个“dynamic”引擎，它提供了一种机制，用于将 ENGINE 实现绑定到完全用自包含共享库实现的应用程序中。“dynamic”引擎公开控制命令，可用于配置要加载的共享库以及控制其处理方式的各个方面。此外，对 [README-Engine.md](README-Engine.md) 文件进行了更新，使其信息保持最新，
   并提供有关“dynamic”引擎的一些信息和说明（即如何使用它，如何构建“dynamic”加载的 ENGINE 等）。

   *Geoff Thorpe*

 * 使 ERR 字符串范围的卸载成为可能，使用新的
   “ERR_unload_strings”函数。

   *Geoff Thorpe*

 * 为 EVP_MD 添加 copy() 函数。

   *Ben Laurie*

 * 使 EVP_MD 例程接受上下文指针而不是仅 md_data void 指针。

   *Ben Laurie*

 * 向 EVP_MD 和 EVP_MD_CTX 添加标志。EVP_MD_FLAG_ONESHOT 指示摘要只能处理单个数据块
   （通常是因为它由硬件提供）。EVP_MD_CTX_FLAG_ONESHOT 指示应用程序只提供单个数据块，因此框架无需为一次性驱动程序累积数据。

   *Ben Laurie*

 * 与“ERR”一样，使底层“ex_data”函数可被替换。此更改还改变了全局 ex_data 状态的存储和管理——它现在全部在 ex_data.c 中，并且所有“类”代码（例如
   RSA、BIO、SSL_CTX 等）不再存储自己的 STACKS 和每个类的索引计数器。使用此状态的 API 函数已更改为接受“class_index”而不是指向类本地 STACK
   和计数器的指针，现在有一个 API 函数可以动态创建新类。这种集中化使我们能够（a）解决许多存在的线程安全问题，以及（b）使用“CRYPTO_cleanup_all_ex_data()”清理所有分配的状态。关于（b），以前此类数据总是会在应用程序代码中泄露，并且有变通方法可以使内存调试器对此视而不见。不使用此新函数的应用程序代码仍会像以前一样泄露，但其内存调试输出现在会发出警告而不是忽略。

   除了添加 CRYPTO_cleanup_all_ex_data() 之外，由“ex_data”大修引起的另一个 API 更改是 X509_STORE_CTX_init() 现在有一个返回值来指示成功或失败。

   *Geoff Thorpe*

 * 使底层“ERR”函数可被替换，以便全局状态（2 个 LHASH 表和 2 个锁）仅由“默认”
   实现使用。此更改还添加了两个函数来“获取”和“设置”实现，在第一个其他 ERR 函数发生之前自动设置它。即，应用程序可以调用“get”，将返回值传递给它刚刚加载的模块，该模块可以使用其自己的“set”函数使用该值。这意味着模块的“ERR”操作将使用（并修改）应用程序中的错误状态，而不是其自身静态链接的 OpenSSL 代码副本中的错误状态。

   *Geoff Thorpe*

 * 为 DH、DSA 和 RSA 类型添加各自的 `*_up_ref()` 函数以增加引用计数。这执行了操作上的正常 REF_PRINT/REF_CHECK 宏，并提供了一种更封装的方式供外部代码（crypto/evp/ 和 ssl/）执行此操作。还更改了 evp 和 ssl 代码以使用这些函数而不是手动增加计数。

   还将“DSO_up()”函数重命名为更具描述性的“DSO_up_ref()”。

   *Geoff Thorpe*

 * 添加 EVP 测试程序。

   *Ben Laurie*

 * 向 ENGINE 添加对称密码支持。预计 API 会发生变化！

   *Ben Laurie*

 * 新的 CRL 函数：X509_CRL_set_version()、X509_CRL_set_issuer_name()
   X509_CRL_set_lastUpdate()、X509_CRL_set_nextUpdate()、X509_CRL_sort()、
   X509_REVOKED_set_serialNumber() 和 X509_REVOKED_set_revocationDate()。
   这些允许在不直接访问 X509_CRL 字段的情况下构建 CRL。修改 'ca' 应用程序以使用新函数。

   *Steve Henson*

 * 将 SSL_OP_TLS_ROLLBACK_BUG 从推荐的错误修复列表 SSL_OP_ALL 中移出。回滚攻击检测是一项安全功能。
   该问题仅在 OpenSSL 服务器上出现，当 TLSv1 不可用时（sslv3_server_method() 或 SSL_OP_NO_TLSv1）。
   不希望支持 TLSv1 的软件作者将有特殊原因
   选择他们的选择，并且可以显式启用此选项。

   *Bodo Moeller，Lutz Jaenicke*

 * rationalise EVP 以便可以扩展它：不要包含密码/摘要结构的联合，为 EVP_MD_CTX
   添加 init/cleanup 函数（类似于现有的 EVP_CIPHER_CTX 函数）。
   用法示例：

           EVP_MD_CTX md;

           EVP_MD_CTX_init(&md);             /* 新函数调用 */
           EVP_DigestInit(&md, EVP_sha1());
           EVP_DigestUpdate(&md, in, len);
           EVP_DigestFinal(&md, out, NULL);
           EVP_MD_CTX_cleanup(&md);          /* 新函数调用 */

   *Ben Laurie*

 * 使 DES 密钥调度符合常规方案，并纠正其结构。这意味着对 DES 函数的调用现在必须传递指向 des_key_schedule 的指针而不是普通的 des_key_schedule（实际上它总是指针）：例如，

           des_key_schedule ks;

           des_set_key_checked(..., &ks);
           des_ncbc_encrypt(..., &ks, ...);

   （请注意，后续更改将 'des_...' 重命名为 'DES_...'。）

   *Ben Laurie*

 * 链接器膨胀的初步减少：使用某些函数（如
   PEM）会导致大量未使用的函数被链接进来，因为组织不当。例如，pem_all.c 包含每个 PEM 函数，这会间接链接大量（未使用的）
   ASN1 代码。将相似的函数分组并拆分不相关的函数可以防止这种情况。

   *Steve Henson*

 * 清理 EVP 宏。

   *Ben Laurie*

 * 更改对 `{NID,SN,LN}_des_ede` 和 ede3 的历史引用，以添加正确的 `_ecb 后缀`。

   *Ben Laurie*

 * 向 ocsp 应用程序添加初始 OCSP 响应程序支持。
   撤销信息使用 ca 应用程序使用的基于文本的索引进行处理。响应程序可以处理内部生成的请求，通过文件（例如通过 CGI 脚本）提供的请求，或使用内部最小服务器。

   *Steve Henson*

 * 添加配置选项以获取 TLS 的 zlib 压缩。

   *Richard Levitte*

 * Kerberos SSL 的更改以符合 RFC 2712：
   1. 实现真正的 KerberosWrapper，而不是仅使用
      KRB5 AP_REQ 消息。[感谢 Simon Wilkinson <sxw@sxw.org.uk>]
   2. 实现 KerberosWrapper 的可选 authenticator 字段。

   为 Kerberos 票证、ap_req 和 authenticator 结构添加了 openssl 风格的 ASN.1 宏；请参阅 crypto/krb5/。

   将 Kerberos 调用通用化以支持多个 Kerberos 库。
   *Vern Staats <staatsvr@asc.hpc.mil>、Jeffrey Altman <jaltman@columbia.edu>
   通过 Richard Levitte*

 * 使 'openssl speed' 使用完全硬编码的 DSA 密钥，就像它已经对 RSA 所做的那样。testdsa.h 现在为每种密钥大小都具有 'priv_key/pub_key'
   值，而不是仅具有参数（并且“speed”每次都生成密钥）。

   *Geoff Thorpe*

 * 加快 EVP 例程的速度。
   之前：
crypt
pe              8 bytes     64 bytes    256 bytes   1024 bytes   8192 bytes
s-cbc           4408.85k     5560.51k     5778.46k     5862.20k     5825.16k
s-cbc           4389.55k     5571.17k     5792.23k     5846.91k     5832.11k
s-cbc           4394.32k     5575.92k     5807.44k     5848.37k     5841.30k
crypt
s-cbc           3482.66k     5069.49k     5496.39k     5614.16k     5639.28k
s-cbc           3480.74k     5068.76k     5510.34k     5609.87k     5635.52k
s-cbc           3483.72k     5067.62k     5504.60k     5708.01k     5724.80k
   之后：
crypt
s-cbc           4660.16k     5650.19k     5807.19k     5827.13k     5783.32k
crypt
s-cbc           3624.96k     5258.21k     5530.91k     5624.30k     5628.26k

   *Ben Laurie*

 * 添加了 OS2-EMX 目标。

   *"Brian Havard" <brianh@kheldar.apana.org.au> 和 Richard Levitte*

 * 重写命令以使用 `NCONF` 例程而不是旧的 `CONF`。
   支持 `NCONF` 例程的扩展代码的新函数。
   新函数 `CONF_set_nconf()`
   允许接受 `NCONF` 的函数也处理旧的 `LHASH`
   结构：这意味着可以保留旧的 `CONF` 兼容例程（特别是关于扩展），而无需复制代码。新函数 `X509V3_add_ext_nconf_sk()` 用于将扩展添加到堆栈。

   *Steve Henson*

 * 通过内部控制机制和是/否提示的可能性来增强通用用户界面。

   *Richard Levitte*

 * 将所有对低级摘要例程的调用从库和应用程序更改为使用 EVP。添加缺少的 HMAC_cleanup() 调用，并且不要假设 HMAC_CTX 可以使用 memcpy() 复制。

   *Verdon Walker <VWalker@novell.com>，Steve Henson*

 * 添加通过控制名称控制引擎的可能性，但使用任意参数而不是仅字符串。
   更改密钥加载器以接受 UI_METHOD 而不是函数指针回调。注意：这会破坏与早期 OpenSSL [engine] 版本的二进制兼容性。
   调整 nCipher 代码以适应这些新条件，并添加卡插入回调。

   *Richard Levitte*

 * 通过更好的对话框接口、应用程序定义的提示、使用默认值的可能性（例如从其他地方获取默认密码）以及中断/取消来增强通用用户界面。

   *Richard Levitte*

 * 整理 PKCS#12 属性处理。添加对 PKCS#12 文件中 CSP 名称属性的支持，向 pkcs12 实用程序添加新的 -CSP 选项。

   *Steve Henson*

 * 修复 'sk_dup()' 中的内存泄漏（在重新分配失败的情况下）。（还整理了 'sk_new()' 中一些不必要的奇怪代码）。

   *Geoff，由 Diego Tartara <dtartara@novamens.com> 报告*

 * 更改 ENGINE 的密钥加载例程，以使用与所有其他需要此类回调的例程相同的回调（pem_password_cb）。

   *Richard Levitte*

 * 将 ENTROPY_NEEDED 增加到 32 字节，因为 Rijndael 可以使用 256 位（=32 字节）密钥进行操作。当然，建议使用比此最小值更多的熵字节进行播种。

   *Lutz Jaenicke*

 * OpenVMS 的新随机播种器，使用易于访问的系统进程统计信息。

   *Richard Levitte*

 * Windows 似乎无法透明地处理 DLL 中定义的全局
   变量。初始化，例如：

           const ASN1_ITEM *it = &ASN1_INTEGER_it;

   将无法编译。这被需要声明自己的 ASN1 模块的任何应用程序使用。通过为所有 Win32 平台添加 EXPORT_VAR_AS_FN 选项来修复此问题，尽管这对于 Win32 下的静态库来说并非严格必需。

   *Steve Henson*

 * 新函数 X509_PURPOSE_set() 和 X509_TRUST_set() 用于处理目的和信任字段的设置。新的 X509_STORE 信任和
   目的函数，并整理了其他 SSL 函数中的设置。

   *Steve Henson*

 * 将 X509_STORE_CTX 字段和回调的副本添加到 X509_STORE
   结构中。当初始化 X509_STORE_CTX 时，它们会被继承。这允许在
   X509_STORE 结构中设置各种默认值（例如用于 CRL 检查的标志和自定义目的或信任设置），用于仅在内部使用 X509_STORE_CTX 的函数（如 S/MIME）。

   修改 X509_STORE_CTX_purpose_inherit()，使其仅在 X509_STORE 中未设置目的和信任设置时才设置它们。这允许 X509_STORE
   的目的和信任（例如在 S/MIME 中）覆盖任何默认设置。

   为 smime、s_client 和 s_server 应用程序添加了 CRL 检查的命令行选项。

   *Steve Henson*

 * 初始的基于 CRL 的撤销检查。如果设置了 CRL 检查标志，则在 X509_STORE 结构中查找 CRL 并
   检查其有效性和签名，然后如果证书在 CRL 中找到，则验证失败并出现已撤销错误。

   在 X509_STORE_CTX 结构中添加了各种新的与 CRL 相关的回调。

   为“verify”应用程序添加了命令行选项以支持此功能。

   这需要一些额外的工作，例如处理具有不同时间的多个
   CRL，基于扩展的查找（而不仅仅是按主题名称），以及最终更完整的 V2 CRL 扩展
   处理。

   *Steve Henson*

 * 添加通用的用户界面 API (crypto/ui/)。
   该 API 旨在取代 des_read_password 等函数（提供了使用此新 API 的向后兼容函数）。
   目的是从 DES 代码部分移除提示函数，并为通过对话框在窗口系统中进行提示等提供支持。

   *Richard Levitte*

 * 向 ENGINE 添加“ex_data”支持，以便实现可以在每个结构级别添加状态，而不是必须全局存储。

   *Geoff*

 * 使 ENGINE 结构在通过 ENGINE_by_id() 检索时可以复制，前提是 ENGINE 指定了新的标志：ENGINE_FLAGS_BY_ID_COPY。
   这使得“原始”ENGINE 结构充当模板，类似于 RSA 与 RSA_METHOD 类型之间的分离。因此，尽管它们共享相同的“方法”，但操作状态可以本地化到每个 ENGINE 结构。在这种情况下返回的新 ENGINE 结构没有功能引用，返回值是唯一的
   结构引用。这与 ENGINE_by_id() 通常返回的、在预先存在的
   ENGINE 结构上递增的单个结构引用相匹配。

   *Geoff*

 * 修复 ASN1 解码器在解码类型 ANY 和 V_ASN1_OTHER 时的问题：由于这需要匹配任何其他类型，因此我们需要手动清除标签缓存。

   *Steve Henson*

 * 对“openssl engine”实用程序进行的更改包括：
   - 详细级别（'-v'、'-vv' 和 '-vvv'），提供有关 ENGINE 可用控制命令的信息。
   - 使用命令行参数执行控制命令，使用
     '-pre' 和 '-post' 开关。'-post' 仅在指定了 '-t' 且 ENGINE 初始化成功时使用。单个命令的语法用冒号分隔，例如：
           openssl engine chil -pre FORK_CHECK:0 -pre SO_PATH:/lib/test.so

   *Geoff*

 * 对 ENGINE 的新动态控制命令支持。ENGINE 现在可以通过调用应用程序来声明自己的命令（数字）、名称（字符串）、描述和输入类型以供运行时发现。其中一些命令根据其输入类型被隐式归类为“可执行”，只有这些命令可以通过新的基于字符串的 API 函数 ENGINE_ctrl_cmd_string() 调用。（例如，这可以基于用户输入、配置文件等）。区别在于，“可执行”命令只能返回布尔结果，并且只能支持数字或字符串输入，而某些可发现的命令可能仅供直接通过
   ENGINE_ctrl() 使用，例如支持二进制数据、函数指针或其他自定义用途的交换。“可执行”命令用于参数化 ENGINE 的行为，这些行为可以由 ENGINE 明确定义并一致地用于任何 OpenSSL 应用程序。已向所有
   支持硬件的 ENGINE 添加了命令，特别是“SO_PATH”，允许在不更改源代码的情况下控制共享库路径。

   *Geoff*

 * 将所有 ENGINE 实现更改为动态分配其
   ENGINE，而不是静态声明它们。除了这是移除 ENGINE_FLAGS_MALLOCED 区分所必需的之外，这还允许实现编译而不使用内部 engine_int.h 头文件。

   *Geoff*

 * 对 ENGINE 代码进行各种小调整。
   - "atalla" 和 "ubsec" 字符串定义已从头文件移至 C 代码。“nuron”字符串定义已放入变量而不是硬编码，允许稍后通过 ctrl() 命令参数化这些值。
   - 移除了未使用的“#if 0”代码。
   - 修复了引擎列表迭代代码，使其使用 ENGINE_free() 来释放结构引用。
   - 对 ENGINE 结构中的 RAND_METHOD 元素进行了 const 化。
   - 对各种 get/set 函数进行了适当的 const 化，并添加了缺失的函数（包括一个通用的 ENGINE_cpy，它复制所有 ENGINE 值到新的 ENGINE，但不包括引用计数/状态）。
   - 移除了 get/set 函数中的 NULL 参数检查。将方法或函数设置为 NULL 是取消先前设置值的一种方式。传递 NULL ENGINE 参数无论如何都很愚蠢，不值得额外的错误符号和代码。
   - 弃用 ENGINE_FLAGS_MALLOCED 定义，并将标志区域从 engine_int.h 移至 engine.h。
   - 更改了 ENGINE 处理函数（init()、finish()、
     ctrl()、key-load 函数等）的原型以接受 (ENGINE*) 参数。

   *Geoff*

 * 在 BN_mod_inverse 中实现了二分法算法，以及使用长除法的算法。二分法算法只能在模数为奇数时使用。在 32 位系统上，它仅对相对较小的模数（约 128 位模数快 20-30%，256 位模数快约 5-15%）更快，因此我们仅将其用于高达 450 位的模数。在 64 位环境中，二分法算法对于更长的模数似乎更有优势；在这里，我们将其用于高达 2048 位的模数。

   *Bodo Moeller*

 * 重写了 ASN1_item_ex_d2i() 中的 CHOICE 字段设置。旧代码不支持 choice 字段中的 combine 标志。

   *Steve Henson*

 * 向 'ca' 实用程序添加了 'copy_extensions' 选项。此选项将扩展从证书请求复制到证书。

   *Steve Henson*

 * 允许多个 'certopt' 和 'nameopt' 选项由逗号分隔。向 'ca' 配置文件添加了 'namopt' 和 'certopt' 选项：这允许自定义即将签名的证书的显示，允许包含或排除某些字段和扩展详细信息。旧系统无法正确显示多字符字符串，省略了策略中未包含的字段，并且无法显示其他详细信息，如扩展。

   *Steve Henson*

 * 用于多个椭圆曲线点标量乘法的函数
           \sum scalars[i]*points[i],
   可选地包括为 EC_GROUP 定义的生成器：
           scalar*generator +  \sum scalars[i]*points[i]。

   EC_POINT_mul 是一个简单的包装函数，用于点列表只有一个项目（除了可选的
   生成器）的典型情况。

   *Bodo Moeller*

 * 第一个 GF(p) 上的椭圆曲线 EC_METHODs：

   EC_GFp_simple_method() 使用基本的 BN_mod_mul 和 BN_mod_sqr
   操作，并提供各种方法函数，这些函数也可以使用更快的模运算实现。

   EC_GFp_mont_method() 重用了 EC_GFp_simple_method 的大部分函数，但使用了 Montgomery 算术。

   *Bodo Moeller；点加法和点加倍
   实现直接源自 Lenka Fibikova <fibikova@exp-math.uni-essen.de> 提供的源代码*

 * 椭圆曲线框架（crypto/ec/ec.h、crypto/ec/ec_lcl.h、
   crypto/ec/ec_lib.c）：

   曲线是基于库中内置的 EC_METHODs 的 EC_GROUP 对象（带有可选的组生成器）。

   点是基于 EC_GROUP 对象的 EC_POINT 对象。

   框架的大部分能够处理任意有限域上的曲线，但由于 GF(p) 之外没有明显的类型，因此目前一些函数仅限于此。

   *Bodo Moeller*

 * 向 s_server 添加了 -HTTP 选项。它类似于 -WWW，但要求文件包含完整的 HTTP 响应。

   *Richard Levitte*

 * 将 ec 目录添加到 mkdef.pl 和 mkfiles.pl。在 mkdef.pl 中
   将 def 和 num 文件 printf 格式说明符从“%-40sXXX”
   更改为“%-39s XXX”。后者将始终保证字段后有一个空格，而前者将导致字段连接在一起，如果字段长度为 40 个或更多字符。

   *Steve Henson*

 * 将密码和摘要“方法”函数和结构设为 const，并修改相关函数以接受 const EVP_MD 和 EVP_CIPHER
   指针。

   *Steve Henson*

 * 在 bn_lcl.h 中隐藏 BN_CTX 结构详细信息，而不是在 <openssl/bn.h> 中发布它们。
   还将 BN_CTX_NUM 增加到 32。

   *Bodo Moeller*

 * 修改 `EVP_Digest*()` 例程，使其现在返回值。虽然内部软件例程永远不会失败，但额外的硬件版本可能会。

   *Steve Henson*

 * 清理 crypto/err/err.h 并更改一些错误代码以避免冲突：

   以前 ERR_R_FATAL 太小，与 ERR_LIB_PKCS7
   （= ERR_R_PKCS7_LIB）重叠；现在是 64 而不是 32。

   ASN1 错误代码
           ERR_R_NESTED_ASN1_ERROR
           ...
           ERR_R_MISSING_ASN1_EOS
   是 4 .. 9，与
           ERR_LIB_RSA (= ERR_R_RSA_LIB)
           ...
           ERR_LIB_PEM (= ERR_R_PEM_LIB) 重叠。
   它们现在是 58 .. 63（即，紧邻 ERR_R_FATAL 之下）。

   添加新的错误代码 'ERR_R_INTERNAL_ERROR'。

   *Bodo Moeller*

 * 在 crypto/err/err.c 中不要过度使用锁：对于数据检索，CRYPTO_r_lock
   就足够了。

   *Bodo Moeller*

 * 新选项 '-subj arg' 用于 'openssl req' 和 'openssl ca'。
   这会为新请求设置主题名称，或覆盖给定请求中的主题名称。可解析的格式是
           'CN=Some Name, OU=myOU, C=IT'
   和
           'CN=Some Name/OU=myOU/C=IT'。

   为 'openssl req' 添加 '-batch' 和 '-verbose' 选项。

   *Massimiliano Pala <madwolf@hackmasters.net>*

 * 引入通过函数访问全局变量的可能性，在那些
   是导出共享库中全局变量的最佳方式的平台上。要启用此功能，
   必须使用“EXPORT_VAR_AS_FN”进行配置，或在 crypto/opensslconf.h 中定义 C 宏
   “OPENSSL_EXPORT_VAR_AS_FUNCTION”（后者通常由 Configure 或类似工具完成）。

   要实现全局变量，请在源文件（foo.c）中使用宏 OPENSSL_IMPLEMENT_GLOBAL
   如下：

           OPENSSL_IMPLEMENT_GLOBAL(int,foo)=1;
           OPENSSL_IMPLEMENT_GLOBAL(double,bar);

   要声明全局变量，请在头文件（foo.h）中使用宏 OPENSSL_DECLARE_GLOBAL
   和 OPENSSL_GLOBAL_REF 如下：

           OPENSSL_DECLARE_GLOBAL(int,foo);
           #define foo OPENSSL_GLOBAL_REF(foo)
           OPENSSL_DECLARE_GLOBAL(double,bar);
           #define bar OPENSSL_GLOBAL_REF(bar)

   #defines 非常重要，因此在所有使用已定义全局变量的地方包含头文件也非常重要。

   宏 OPENSSL_EXPORT_VAR_AS_FUNCTION 也影响 ASN.1 项的定义，但该结构有点不同。

   最大的变化在于 util/mkdef.pl，它已得到增强，具有更好、更易于理解的逻辑来选择哪些符号应进入 Windows .def 文件，以及许多修复和代码清理（其中，算法关键字现在按字母顺序排序以避免持续重写）。

   *Richard Levitte*

 * 在 BN_div() 中，在将结果写入 'rm' 之前保留 'num' 的符号副本，因为如果 rm==num，则值将被覆盖，如果“num”为负数，则会产生错误结果：这导致了 BN_mod() 和 BN_nnmod() 的问题。

   *Steve Henson*

 * 函数 OCSP_request_verify()。此函数检查 OCSP 请求上的签名并验证签名者证书。签名者证书仅检查通用目的和 OCSP 请求信任设置。

   *Steve Henson*

 * 添加 OCSP_check_validity() 函数以检查 OCSP
   响应的有效性。OCSP 响应是实时准备的，可能只有几秒钟。简单地检查当前时间是否在 thisUpdate 和 nextUpdate 之间，否则会因 OCSP 响应程序或客户端时钟不准确而拒绝有效响应。相反，我们允许 thisUpdate 和 nextUpdate 落在当前时间的某个范围内。还可以选择检查响应的年龄。ocsp 实用程序添加了两个新选项 -validity_period 和 -status_age。

   *Steve Henson*

 * 如果签名或公钥算法无法识别，则打印其 OID 而不是仅打印 UNKNOWN。

   *Steve Henson*

 * 更改 OCSP_cert_to_id() 以容忍 NULL 主题证书，以及 OCSP_cert_id_new()
   容忍 NULL 序列号。这允许从颁发者证书单独生成部分证书 ID，然后可以将其传递给 OCSP_id_issuer_cmp()。

   *Steve Henson*

 * 新的编译选项 ASN1_ITEM_FUNCTIONS。这会导致新的
   ASN1 模块导出返回 ASN1_ITEM 指针的函数，而不是 ASN1_ITEM 结构本身。这添加了几个新的宏，允许透明地访问底层 ASN1 函数/结构。因此，代码不应直接使用 ASN1_ITEM
   引用（例如 &X509_it），而应使用相关的宏（例如 ASN1_ITEM_rptr(X509)）。此选项是为了允许在新 ASN1 代码在导出结构存在问题的平台上使用（例如在共享库中），但导出
   返回结构指针的函数则不是。

   *Steve Henson*

 * 添加对覆盖 SSL/TLS 会话 ID 生成的支持。
   这些回调函数可以注册在 SSL_CTX 或每个 SSL 中。
   其目的是允许应用程序控制（如果它们愿意）用作会话 ID 的任意值，特别是在多服务器环境中进行会话缓存时很有用。“s_server”中添加了一个用于测试此功能（以及任何希望使用此类功能的客户端代码）的命令行开关。

   *Geoff Thorpe，Lutz Jaenicke*

 * 修改 mkdef.pl 以识别和解析形式为 `#if defined(...) || defined(...) || ...` 和
   `#if !defined(...) && !defined(...) && ...` 的预处理器条件编译。这还避免了它之前处理的越来越多的特殊情况。

   *Richard Levitte*

 * 使所有配置宏可供应用程序使用，方法是确保它们在 opensslconf.h 中可用，通过给它们命名为 `OPENSSL_` 以避免与其他包冲突，并确保 e_os2.h 与
   opensslconf.h 一起覆盖所有平台特定的情况。
   此外，现在可以定义配置/平台特定的名称（称为“系统标识符”）。在 C 代码中，这些名称前缀为 `OPENSSL_SYSNAME_`。e_os2.h 将创建另一个名称以 `OPENSSL_SYS_` 开头的宏，该宏根据
   `OPENSSL_SYSNAME_*` 或编译器特定的宏确定，具体取决于可用内容。

   *Richard Levitte*

 * 'req' 和 'x509' 的新选项 -set_serial，允许在命令行上指定要使用的序列号。以前，自签名证书硬编码为序列号 0，'x509' 的 CA 选项必须使用文件中的序列号，该文件会自动递增。

   *Steve Henson*

 * 为 'ca' 实用程序添加了新选项以支持 V2 CRL 条目扩展。
   目前支持 CRL 原因、无效日期和挂起指令。向 V3 代码和一些新对象添加了新的 CRL 扩展。

   *Steve Henson*

 * 新函数 EVP_CIPHER_CTX_set_padding()，用于
   在 EVP
   API 中禁用标准块填充（又名 PKCS#5 填充），该填充以前是强制性的。这意味着数据不会以任何方式填充，因此总长度必须是块大小的倍数，否则会发生错误。

   *Steve Henson*

 * 初始（不完整）的 OCSP SSL 支持。

   *Steve Henson*

 * 新函数 OCSP_parse_url()。此函数将 URL 分解为主机、
   端口和路径组件：主要用于解析 OCSP URL。ocsp 实用程序的新 -url 选项。

   *Steve Henson*

 * 新的 nonce 行为。OCSP_check_nonce() 的返回值现在反映了执行的各种检查。应用程序可以决定是否容忍某些情况，例如响应中存在 nonce 而请求中不存在 nonce：ocsp 应用程序仅打印警告。新函数 OCSP_add1_basic_nonce()
   允许响应程序在请求无 nonce 时在响应中包含 nonce。

   *Steve Henson*

 * 在 `load_cert()` (`apps/apps.c`) 中禁用 stdin 缓冲，这样在使用单个输入文件上的多个 openssl x509 时不会跳过任何证书，例如 `(openssl x509 -out cert1; openssl x509 -out cert2) <certs`。

   *Bodo Moeller*

 * 使 ASN1_UTCTIME_set_string() 和 ASN1_GENERALIZEDTIME_set_string()
   设置字符串类型：以处理设置 ASN1_TIME 结构。修复 ca
   实用程序以正确初始化 CRL 的撤销日期。

   *Steve Henson*

 * 新选项 SSL_OP_CIPHER_SERVER_PREFERENCE 允许服务器覆盖
   客户端首选的密码套件，而是使用自己的首选项。
   应有助于解决 Internet Explorer 中的 M$ SGC（服务器门控加密）错误，方法是确保在升级期间哈希方法不变。
   （还取代了已损坏/禁用的 SSL_OP_NON_EXPORT_FIRST 选项。）

   *Lutz Jaenicke*

 * 使 mkdef.pl 能够识别所有 DECLARE_ASN1 宏，将 rijndael 改为 aes，并添加新的“exist”选项以打印出似乎不存在的符号。

   *Steve Henson*

 * 为 ocsp 实用程序添加了其他选项，以允许设置标志和提供其他证书。

   *Steve Henson*

 * 向 'openssl ocsp' 添加 -VAfile 选项，以便用户可以向 OCSP 客户端提供一些证书，仅用于验证响应
   签名。

   *Richard Levitte*

 * 将 Rijndael 代码更新到 3.0 版本，并更改 EVP AES 密码以处理新 API。目前仅支持 ECB、CBC 模式。添加新的
   AES OID。

   根据 RFC3268，“传输层安全 (TLS) 的高级
   加密标准 (AES) 密码套件”添加 TLS AES 密码套件。
   （在 OpenSSL 0.9.7 的 beta 版本中，这些默认未启用，并且不是“ALL”密码套件
   别名的一部分，因为它们尚未正式化；可以通过指定“AESdraft”密码套件
   组别名来显式请求它们。在 OpenSSL 0.9.7 的最终版本中，组
   别名称为“AES”并包含在“ALL”中。）

   *Ben Laurie、Steve Henson、Bodo Moeller*

 * 新函数 OCSP_copy_nonce() 以复制 nonce 值（如果存在）从
   请求到响应。

   *Steve Henson*

 * OCSP 响应程序函数。OCSP_request_onereq_count()、
   OCSP_request_onereq_get0()、OCSP_onereq_get0_id() 和 OCSP_id_get0_info()
   从证书请求中提取信息。OCSP_response_create()
   创建响应并可选地添加基本响应结构。
   OCSP_basic_add1_status() 向基本响应添加单个完整响应，并返回刚添加的 OCSP_SINGLERESP
   结构（以便包含扩展等）。OCSP_basic_add1_cert() 向基本响应添加证书，OCSP_basic_sign()
   使用各种标志对基本响应进行签名。新的辅助函数 ASN1_TIME_check()
   （检查 ASN1_TIME 结构的有效性）和 ASN1_TIME_to_generalizedtime()
   （将 ASN1_TIME 转换为 GeneralizedTime）。

   *Steve Henson*

 * 各种新函数。EVP_Digest() 将 EVP_Digest{Init,Update,Final}()
   合并为一个操作。X509_get0_pubkey_bitstr() 从证书中提取 public_key
   结构。X509_pubkey_digest() 对 public_key
   内容进行摘要：这用于各种密钥标识符。

   *Steve Henson*

 * 使 sk_sort() 容忍 NULL 参数。

   *Steve Henson 由 Massimiliano Pala <madwolf@comune.modena.it> 报告*

 * 新的 OCSP 验证标志 OCSP_TRUSTOTHER。设置后，“其他”证书
   通过函数隐式信任。如果其中任何一个签署了响应，则假定其有效且不进行验证。

   *Steve Henson*

 * 在 PKCS7_set_type() 中将 content_type 在 PKCS7_ENC_CONTENT
   中初始化为 data。这以前是 PKCS7 ASN1 代码的一部分。这
   导致了 OpenSSL 创建的 PKCS#12 和 PKCS#7 结构的问题。
   *Steve Henson，由 Kenneth R. Robinette
                              <support@securenetterm.com> 报告*

 * 向新的 ASN1
   例程添加 CRYPTO_push_info() 和 CRYPTO_pop_info() 调用：没有这些，跟踪内存泄漏会非常痛苦。
   修复 PKCS12 和 PKCS7 例程中的泄漏。

   *Steve Henson*

 * 使 X509_time_adj() 能够处理 ASN1_TIME_new() 的新行为。
   以前它将“type”参数初始化为 V_ASN1_UTCTIME，这实际上意味着 GeneralizedTime 永远不会被使用。现在它
   被初始化为 -1，但 X509_time_adj() 现在必须检查值
   并使用 ASN1_TIME_set()，如果值不是 V_ASN1_UTCTIME 或
   V_ASN1_GENERALIZEDTIME，否则它总是使用 GeneralizedTime。
   *Steve Henson，由 Kenneth R. Robinette
                              <support@securenetterm.com> 报告*

 * 修复 BN_to_ASN1_INTEGER 在 bn 为零时的问题。这以前会导致 ASN1_INTEGER 结构中的长度为零，这与使用 d2i_ASN1_INTEGER() 时的结构不一致，并且会导致 ASN1_INTEGER_CMP() 失败。增强 s2i_ASN1_INTEGER()
   以处理十六进制和负整数。修复 i2a_ASN1_INTEGER() 中的错误，该错误未打印负 ASN1_INTEGER 的减号。

   *Steve Henson*

 * 向 ocsp 实用程序添加摘要打印输出。将状态值转换为字符串的各种函数已重命名为：
   OCSP_response_status_str()、OCSP_cert_status_str() 和
   OCSP_crl_reason_str()，并且不再是静态的。新的选项
   用于验证 nonce 值和禁用验证。OCSP 响应
   打印输出格式已清理。

   *Steve Henson*

 * 添加额外的 OCSP 证书检查。这些是 RFC2560 中指定的。这包括两个单独的检查：被检查证书的 CA 必须是 OCSP 签名证书或 OCSP 签名证书的颁发者。在后一种情况下，OCSP 签名证书必须包含 OCSP 签名扩展密钥用法。此检查通过尝试将 OCSP
   签名者或 OCSP 签名者 CA 与响应中的 issuerNameHash 和 issuerKeyHash 进行匹配来执行。

   *Steve Henson*

 * 在 OCSP_basic_verify() 和相关例程中添加了初始 OCSP 证书验证。这目前是不完整的。目前仅查找签名者的证书并验证响应上的签名。

   *Steve Henson*

 * 'openssl ca' 的新 '-extfile ...' 选项，用于从单独的配置文件读取 X.509v3
   扩展。
   与从主配置文件读取扩展一样，可以使用 '-extensions ...' 选项来指定要使用的节。

   *Massimiliano Pala <madwolf@comune.modena.it>*

 * 新的 OCSP 实用程序。允许生成或
   读取 OCSP 请求。请求可以发送到响应程序，并且输出可以被解析、输出或以文本形式打印。尚未完成：
   仍需要检查 OCSP 响应的有效性。

   *Steve Henson*

 * 'openssl ca' 的新子命令：
   `openssl ca -status <serial>` 打印具有给定序列号的证书的状态（根据索引文件）。
   `openssl ca -updatedb` 更新索引文件中文档的到期状态。

   *Massimiliano Pala <madwolf@comune.modena.it>*

 * CA.pl 的新 '-newreq-nodes' 命令选项。这类似于
   '-newreq'，但调用 'openssl req' 并带 '-nodes' 选项，因此生成的密钥不会被加密。

   *Damien Miller <djm@mindrot.org>*

 * GNU Hurd 的新配置。

   *Jonathan Bartlett <johnnyb@wolfram.com> 通过 Richard Levitte*

 * 初始代码以实现 OCSP 基本响应验证。这
   目前不完整。目前仅查找签名者的证书并验证响应上的签名。

   *Steve Henson*

 * 新的 SSLeay_version 代码 SSLEAY_DIR，用于确定编译时值
   OPENSSLDIR。这可以通过“openssl version”的新“-d”选项获得，并且也包含在“openssl version -a”中。

   *Bodo Moeller*

 * 允许定义内存分配回调，这些回调将接收文件名和行号信息作为附加参数（一个 `const char*` 和一个 int）。基本功能仍然存在，以及用不了解这些附加参数的函数替换 malloc()、
   realloc() 和 free() 的原始可能性。要注册和获取扩展分配函数的当前设置，提供了以下
   函数：

           CRYPTO_set_mem_ex_functions
           CRYPTO_set_locked_mem_ex_functions
           CRYPTO_get_mem_ex_functions
           CRYPTO_get_locked_mem_ex_functions

   这些函数的工作方式与 CRYPTO_set_mem_functions 等类似。
   `CRYPTO_get_[locked_]mem_functions` 现在在启用了扩展分配函数的地方写入 0。
   类似地，`CRYPTO_get_[locked_]mem_ex_functions` 在启用了常规分配函数的地方写入 0。

   *Richard Levitte，Bodo Moeller*

 * 完成移除剩余的 LHASH 函数指针转换。
   使用 LHASH 抽象时不再需要原型转换，任何剩余的转换都是“错误”。有关详细信息，请参阅 lhash.h 开头的回调类型和宏（以及 crypto/objects/obj_dat.c 中的“OBJ_cleanup”作为示例）。

   *Geoff Thorpe*

 * 为 Unix 变体自动查询 EGD 套接字 RAND_poll()。
   如果 /dev/[u]random 设备不可用或返回的熵不足，将自动查询 EGD 风格的套接字（由 EGD 或 PRNGD 提供）。
   将按此顺序依次查询 /var/run/egd-pool、/dev/egd-pool、/etc/egd-pool 和 /etc/entropy，查询将在收集到足够的熵后停止，而无需查询更多套接字。

   *Lutz Jaenicke*

 * 将 Unix RAND_poll() 变体更改为能够轮询多个
   随机设备，如 DEVRANDOM 指定的，直到收集到足够的
   数据。我们最多在每个文件上花费 10 毫秒（select 超时）并以非阻塞模式读取。DEVRANDOM 现在
   默认为列表“/dev/urandom”、“/dev/random”、“/dev/srandom”
   （以前只是字符串“/dev/urandom”），因此在典型平台上，10 毫秒的延迟永远不会发生。
   还将 Unix 变体分离到其自己的文件 rand_unix.c 中。
   对于 VMS，有一个当前为空的 rand_vms.c 文件。

   *Richard Levitte*

 * 将与 OCSP 客户端相关的例程移至 ocsp_cl.c。这些
   提供了应用程序在需要向 OCSP 响应程序发出请求并分析
   响应时通常需要的实用函数：与 OCSP 响应程序本身需要的函数相对，后者稍后添加。

   OCSP_request_sign() 使用与 PKCS7_sign() 类似的 API 对 OCSP 请求进行签名。OCSP_response_status() 返回 OCSP
   响应的状态。OCSP_response_get1_basic() 从响应中提取基本响应。OCSP_resp_find_status()：查找并从 OCSP_CERTID 结构（在构建请求结构时创建）中提取状态信息。这些函数基于处理 OCSP_SINGLERESP 结构的较低级函数构建，但
   除非应用程序希望检查 OCSP 响应中的扩展等，否则通常不会使用它们。

   将 nonce 例程替换为一对函数。
   OCSP_request_add1_nonce() 添加 nonce 值并可选地生成随机值。OCSP_check_nonce() 检查 OCSP
   响应中 nonce 的有效性。

   *Steve Henson*

 * 更改函数 OCSP_request_add() 为 OCSP_request_add0_id()。
   这不会复制提供的 OCSP_CERTID 并避免了释放新创建的 id 的需要。将返回类型
   更改为 OCSP_ONEREQ 以返回内部 OCSP_ONEREQ 结构。
   然后可以使用它向请求添加扩展。
   删除了 OCSP_request_new()，因为它的功能大部分现在在 OCSP_REQUEST_new() 中（以及不区分大小写的名称冲突），除了设置请求名称的功能将在其他地方添加。

   *Steve Henson*

 * 更新 OCSP API。从
   各种函数中删除过时的扩展参数。扩展现在使用新的
   OCSP 扩展代码进行处理。新的简单 OCSP HTTP 函数，可用于发送请求和解析响应。

   *Steve Henson*

 * 修复 PKCS#7 (S/MIME) 代码以使用新的 ASN1。两个新的
   ASN1_ITEM 结构有助于签名和验证。PKCS7_ATTR_SIGN
   使用 SET OF 的特殊重排序版本来对属性进行排序，并重新排序以匹配编码顺序。这解决了长期存在的问题：刚刚签名的 PKCS7 结构的验证在属性顺序与
   编码顺序不匹配时会失败。PKCS7_ATTR_VERIFY 不重新排序属性：
   它使用接收到的顺序。这对于容忍一些不正确排序 SET OF 的损坏软件是必需的。这是通过编码为 SEQUENCE OF 来处理的，但使用隐式标记（带 UNIVERSAL 类）来生成所需的 SET OF。

   *Steve Henson*

 * 使 mk1mf.pl 生成宏 OPENSSL_BUILD_SHLIBCRYPTO 和
   OPENSSL_BUILD_SHLIBSSL，并在头文件中适当地使用它们以获得 ASN.1 项变量的正确声明。

   *Richard Levitte*

 * 重写 PKCS#12 代码以使用新的 ASN1 功能。替换了许多
   PKCS#12 宏为实际函数。修复了两个不相关的 ASN1 错误：
   asn1_check_tlen() 有时会尝试在 'ctx' 为 NULL 时使用它，并且 asn1_ex_c2i() 中的 ASN1_TYPE 未被正确解引用。
   新的 ASN1 宏：DECLARE_ASN1_ITEM()，它仅声明相关的
   ASN1_ITEM 而不是包装函数。

   *Steve Henson*

 * 新的 ASN1 函数 ASN1_item_d2i_fp() 和 ASN1_item_d2i_bio()。这些
   替换了旧的基于函数指针的 I/O 例程。将大多数
   `*_d2i_bio()` 和 `*_d2i_fp()` 函数更改为使用它们。

   *Steve Henson*

 * 增强 mkdef.pl 以更好地接受 C 预处理器行中的空格，识别更多可以取消选择的“算法”，并使其抱怨无法识别的算法取消选择。

   *Richard Levitte*

 * 新的 ASN1 函数，用于处理基于 ASN1_ITEM 的
   dup、sign、verify、digest、pack 和 unpack 操作。修改现有包装器以使用新函数。添加 NO_ASN1_OLD，可以设置为移除
   一些旧式 ASN1 函数：这可以用来确定旧代码在这些函数最终消失时是否仍然有效。

   *Steve Henson*

 * 为 OCSP 结构添加新的扩展函数，这些函数遵循与证书和 CRL 相同的约定。

   *Steve Henson*

 * 新函数 X509V3_add1_i2d()。此函数自动编码并
   添加扩展。其行为可以通过各种
   标志进行自定义，以进行追加、替换或删除。为证书和 CRL 添加了各种包装器。

   *Steve Henson*

 * 修复以避免在无法解析扩展时调用底层 ASN1 打印例程。修正了
   OCSP_SERVICELOC 扩展中的拼写错误。整理 OCSP 打印格式。

   *Steve Henson*

 * 使 mkdef.pl 解析一些 ASN1 宏并为变量添加相应的条目。

   *Steve Henson*

 * 向 `apps/openssl.c` 添加用于检测锁定
   问题的功能：由于程序是单线程的，我们所要做的就是使用一个数组来存储程序当前持有的锁，并注册一个锁定回调。

   *Bodo Moeller*

 * 在 SSL_get_ex_data_X509_STORE_idx() 中调用 CRYPTO_get_ex_new_index() 时使用锁，该函数在
   ssl_verify_cert_chain() 中使用，因此可以随时在 TLS/SSL 握手期间调用，因此线程安全至关重要。
   不幸的是，ex_data 设计根本不适合多线程使用，因此可能应该废弃它。

   *Bodo Moeller*

 * 将 Broadcom "ubsec" ENGINE 添加到 OpenSSL。

   *Broadcom，由 Geoff Thorpe 进行调整和集成*

 * 将通用的扩展打印代码移至新函数
   X509V3_print_extensions()。重新组织 OCSP 打印例程并
   实现了一些所需的 OCSP ASN1 函数。添加 OCSP 扩展。

   *Steve Henson*

 * 新函数 X509_signature_print() 以消除一些打印例程中的重复。

   *Steve Henson*

 * 当 SET OF 和 SEQUENCE OF 标志都设置时（以前被视为与 SET OF 完全相同），添加特殊含义。这用于重新排序表示结构的 STACK 以匹配编码。这将用于解决 PKCS7
   结构在签名后无法验证的问题，因为 STACK
   顺序不反映编码顺序。

   *Steve Henson*

 * 使用新的代码重新实现 OCSP ASN1 模块。

   *Steve Henson*

 * 将 X509V3 代码更新为允许使用 ASN1_ITEM 结构
   进行其 ASN1 操作。旧式函数指针目前仍然存在，但最终将被移除。

   *Steve Henson*

 * 合并来自 ASN1 分支的替换 ASN1 代码。这几乎完全用一个表驱动的
   编码器和解码器替换了旧的 ASN1 功能，该编码器和解码器解释描述 ASN1 模块的 ASN1_ITEM 结构。对现有 ASN1 API (i2d,d2i) 的兼容性在很大程度上得以保留。旧的基于宏的 asn1_mac.h 的 ASN1 几乎全部已转换为新形式。

   *Steve Henson*

 * 更改 BN_mod_exp_recp，使其能够容忍负模数（忽略符号）。
   类似地，在 BN_MONT_CTX_set 中忽略符号，以便 BN_mod_exp_mont 和 BN_mod_exp_mont_word
   对于负模数也能工作。

   *Bodo Moeller*

 * 修复 BN_uadd 和 BN_usub：始终返回非负结果，而不是不触及结果的符号位。

   *Bodo Moeller*

 * BN_div 错误修复：如果结果为 0，则不能设置符号（res->neg）。

   *Bodo Moeller*

 * 更改 LHASH 代码以使用回调的原型，并创建宏来声明和实现精简的（可选静态）函数，这些函数提供类型安全并避免对类型特定的回调进行函数指针转换。

   *Geoff Thorpe*

 * 添加了 Kerberos 密码套件以与 TLS 一起使用，如
   RFC 2712 中所述。
   *Veers Staats <staatsvr@asc.hpc.mil>、
   Jeffrey Altman <jaltman@columbia.edu>，通过 Richard Levitte*

 * 重新格式化 FAQ，以便不同的问题和答案可以按主题
   分为不同的部分。

   *Richard Levitte*

 * 在 Windows 下动态加载 zlib 压缩代码 ZLIB.DLL。

   *Richard Levitte*

 * 新函数 BN_mod_sqrt 用于计算素数模数的平方根
   （使用概率性 Tonelli-Shanks 算法，除非
   p == 3 (mod 4) 或 p == 5 (mod 8)，这些情况可以
   确定性地处理）。

   *Lenka Fibikova <fibikova@exp-math.uni-essen.de>，Bodo Moeller*

 * 通过显式处理 Euclid 循环中的小商来加快 BN_mod_inverse 的速度。 （对于小模数 [256 或
   512 位] 加速约 20%，对于较大的模数 [1024 或 2048 位] 加速约 30%）。

   *Bodo Moeller*

 * 新函数 BN_kronecker。

   *Bodo Moeller*

 * 修复 BN_gcd 以使其能够处理负输入；结果为
   正数，除非两个参数都为零。
   以前，由于数字在 Euclid 算法的实现中可能在增长而不是缩小，因此可能出现接近无限循环的情况。

   *Bodo Moeller*

 * 修复 BN_is_word() 和 BN_is_one() 宏，以考虑
   相关数字的符号。

   修复 BN_is_word(a,w) 以正确处理 w == 0 的情况。

   旧的 BN_is_word(a,w) 宏现在称为 BN_abs_is_word(a,w)，
   因为它测试“a”的绝对值是否等于“w”。
   请注意，BN_abs_is_word 不能可靠地处理 w == 0；
   它主要用于 BN_is_zero()、BN_is_one() 和 BN_is_word() 的实现。

   *Bodo Moeller*

 * 新函数 BN_swap。

   *Bodo Moeller*

 * 在 crypto/bn/bn_exp.c 中使用 BN_nnmod 而不是 BN_mod，以便
   指数函数在负输入上更有可能产生合理
   的结果。

   *Bodo Moeller*

 * 更改 BN_mod_mul，使结果始终为非负数。
   以前，如果其中一个因子为负数，结果可能为负数；
   我认为没有人真正想要这种行为。

   *Bodo Moeller*

 * 将 `BN_mod_...` 函数移至新文件 `crypto/bn/bn_mod.c`
   （指数运算除外，它保留在 `crypto/bn/bn_exp.c` 中，
   以及 `BN_mod_mul_reciprocal`，它保留在 `crypto/bn/bn_recp.c` 中）
   并添加新函数：

           BN_nnmod
           BN_mod_sqr
           BN_mod_add
           BN_mod_add_quick
           BN_mod_sub
           BN_mod_sub_quick
           BN_mod_lshift1
           BN_mod_lshift1_quick
           BN_mod_lshift
           BN_mod_lshift_quick

   这些函数始终生成非负结果。

   `BN_nnmod` 否则“类似于 BN_mod”（如果 `BN_mod` 计算的余数 `r` 使得 `|m| < r < 0`，则 `BN_nnmod` 将输出 `rem + |m|` 而不是）。

   `BN_mod_XXX_quick(r, a, [b,] m)` 生成与
   `BN_mod_XXX(r, a, [b,] m, ctx)` 相同的结果，但要求 `a` [和 `b`]
   已模 `m` 归约。

   *Lenka Fibikova <fibikova@exp-math.uni-essen.de>，Bodo Moeller*

<!--
   以下条目意外出现在随 OpenSSL 0.9.7 分发的 CHANGES 文件中。
   其中描述的修改不适用于 OpenSSL 0.9.7。

 * 移除 BN_sqr()（其中一个实际上从未需要）和 BN_mul() 中的几个 bn_wexpand() 调用。
   BN_mul() 中的移除需要对 bn_mul_part_recursive() 进行少量更改，并添加 bn_cmp_part_words()、bn_sub_part_words() 和 bn_add_part_words() 函数，
   这些函数的作用与 bn_cmp_words()、bn_sub_words() 和 bn_add_words() 相同，只是它们接受大小不同的数组。

   *Richard Levitte*
-->

 * 在 'openssl passwd' 中，除非使用了 '-salt' 选项（这通常意味着验证会浪费用户时间，因为生成的哈希将与给定的密码哈希进行比较）或新的 '-noverify' 选项，否则会验证从终端读取的密码。

   这是一个不兼容的更改，但它不影响 'openssl passwd' 的非交互式使用（命令行密码、'-stdin' 选项、'-in ...' 选项），因此不应引起任何问题。

   *Bodo Moeller*

 * 移除对 RSAref 的所有引用，因为不再需要它。

   *Richard Levitte*

 * 使用 shl_load() 通过环境变量（SHLIB_PATH）提供的路径加载 DSO。

   *Richard Levitte*

 * 由于 BIGNUM 的 const 化，对 ENGINE 代码进行 const 化。
   同时对 RSA 代码及其相关的大部分内容进行 const 化。
   在少数地方，最明显的是在 ASN.1 代码的深度处，需要进行丑陋的强制类型转换回非 const（待以后解决）。

   *Richard Levitte*

 * 使 openssl 应用程序默认加载所有引擎。

   *Richard Levitte*

 * 对 BIGNUM 例程进行更多的 const 化。

   *Richard Levitte*

 * 添加以下函数：

           ENGINE_load_cswift()
           ENGINE_load_chil()
           ENGINE_load_atalla()
           ENGINE_load_nuron()
           ENGINE_load_builtin_engines()

   这样，应用程序本身就可以选择是否使用 OpenSSL 中内置的外部引擎。
   这样做的好处是，应用程序不必链接 libdl 或其他 dso 库，除非确实需要。

   更改了 'openssl engine' 以按需加载所有引擎。
   更改了引擎头文件以避免某些声明的重复（它们是不同的！）。

   *Richard Levitte*

 * 'openssl engine' 现在可以列出功能。

   *Richard Levitte*

 * 在 'openssl engine' 中改进了错误报告。

   *Richard Levitte*

 * s_server 中永远不要调用 load_dh_param(NULL)。

   *Bodo Moeller*

 * 添加了引擎应用程序。它目前可以按名称和标识列出引擎，并测试它们是否可用。

   *Richard Levitte*

 * 通过强制符号链接并确保安装的文档也归 root.root 所有，改进了 RPM 规范文件。

   *Damien Miller <djm@mindrot.org>*

 * 让 OpenSSL 应用程序有更多机会利用引擎处理的密钥（公钥和私钥）。

   *Richard Levitte*

 * 添加了来自 CertCo 的 OCSP 代码。

   *Richard Levitte*

 * 为 Rijndael 代码添加了 VMS 支持。

   *Richard Levitte*

 * 添加了未经测试的对 Nuron 加密加速器的支持。

   *Ben Laurie*

 * 添加了对外部加密设备的支持。此代码以前作为“engine”分支单独分发。

   *Geoff Thorpe, Richard Levitte*

 * 重构了 DSO 代码中的文件名转换。现在可以根据操作环境和不同系统上共享库文件名的各种怪异之处，更精确地控制如何将“名称”转换为文件名。

   *Geoff Thorpe*

 * 支持 Configure 中的 FreeBSD-elf 线程。

   *Richard Levitte*

 * 修复了 MASM 的 SHA1 汇编问题：当使用调试信息进行汇编时，它会产生关于损坏行号信息的警告。这是由于两个节的重叠引起的。

   *Bernd Matthes <mainbug@celocom.de>, Steve Henson*

 * NCONF 更改。
   NCONF_get_number() 完全没有错误检查。作为替代，定义了 NCONF_get_number_e()（`_e` 表示“错误检查”）并大力推广。旧的 NCONF_get_number 保留以实现二进制向后兼容。
   通过提供一个函数指针，该指针接收一个名称而不是 BIO，使得方法可以从除 BIO 之外的其他东西加载。
   例如，这可以用于从 LDAP 服务器加载配置数据。

   *Richard Levitte*

 * 修复了非阻塞接受 BIO 的问题。添加了新的 I/O 特殊原因 BIO_RR_ACCEPT 来覆盖这种情况。以前，由于没有实现重试代码，因此无法将接受 BIO 与非阻塞 I/O 一起使用。还添加了新的 SSL 代码 SSL_WANT_ACCEPT 来覆盖这种情况。

   *Steve Henson*

 * 添加了 Rijndael 支持的初步工作。

   *Ben Laurie*

 * 修复了 DirectoryString 掩码设置中的错误。在 'req' 中添加了对 X509_NAME_print_ex() 的支持，并在 X509_print_ex() 函数中添加了对证书打印的更多可控支持，以及 'x509' 的附加 'certopt' 选项以允许设置新的打印选项。

   *Steve Henson*

 * 清除了 e_os.h 中旧的 EAY MD5 技巧。

   *Richard Levitte*

### 0.9.6l 和 0.9.6m 之间的更改 [2004 年 3 月 17 日]

 * 修复了 do_change_cipher_spec() 中的空指针赋值，该问题由 Codenomicon TLS 测试工具（[CVE-2004-0079]）暴露。

   *Joe Orton, Steve Henson*

### 0.9.6k 和 0.9.6l 之间的更改 [2003 年 11 月 4 日]

 * 修复了 NISCC 测试套件暴露的另一个错误：

   当遇到某些 ASN.1 标签时，停止触发大型递归（[CVE-2003-0851]）。

   *Steve Henson*

### 0.9.6j 和 0.9.6k 之间的更改 [2003 年 9 月 30 日]

 * 修复了运行 NISCC 测试套件暴露的各种错误：

   当遇到无效标签时，停止 ASN1 代码中的越界读取（CVE-2003-0543 和 CVE-2003-0544）。

   如果验证回调忽略无效公钥错误，则不要尝试使用 NULL 公钥检查证书签名。

   *Steve Henson*

 * 在 ssl3_accept() (ssl/s3_srvr.c) 中，仅当服务器请求客户端证书时才接受它：如 TLS 1.0 和 SSL 3.0 规范所述。

   *Steve Henson*

 * 在 ssl3_get_client_hello() (ssl/s3_srvr.c) 中，容忍压缩方法之后的额外数据，不仅适用于 TLS 1.0，也适用于 SSL 3.0（按规范要求）。

   *Bodo Moeller；Matthias Loepfe 指出的问题*

 * 将 X509_certificate_type() 更改为将密钥标记为已导出/可导出，当其长度为 512 *位*时，而不是 512 字节。

   *Richard Levitte*

### 0.9.6i 和 0.9.6j 之间的更改 [2003 年 4 月 10 日]

 * 对 Klima-Pokorny-Rosa 对 Bleichbacher 的 PKCS #1 v1.5 填充攻击的扩展的对策：在 ssl3_get_client_key_exchange (ssl/s3_srvr.c) 中将协议版本号不匹配视为解密错误。

   *Bodo Moeller*

 * 默认启用 RSA 盲化以避免时序攻击。不希望这样做的应用程序可以调用 RSA_blinding_off() 或使用新的标志 RSA_FLAG_NO_BLINDING。
   在大多数情况下，这样做是不明智的。

   *Ben Laurie, Steve Henson, Geoff Thorpe, Bodo Moeller*

 * 更改 RSA 盲化代码，使其在 PRNG 未播种时也能工作（在这种情况下，秘密 RSA 指数被滥用为不可预测的种子——如果它不可预测，那么盲化就没有意义了）。
   通过在 rsa->blinding 中记住创建者的线程 ID，并让所有其他线程使用本地的一次性盲化因子，使 RSA 盲化成为线程安全的（这比共享 rsa->blinding 需要更多的计算，但避免了过度的锁定；如果 RSA 对象不跨线程共享，盲化仍然会非常快）。

   *Bodo Moeller*

### 0.9.6h 和 0.9.6i 之间的更改 [2003 年 2 月 19 日]

 * 在 ssl3_get_record (ssl/s3_pkt.c) 中，即使发现错误的块密码填充，也执行 MAC 计算，从而最大限度地减少通过时序泄露的信息。这是针对攻击者必须区分错误填充和 MAC 验证错误的主动攻击的对策。（[CVE-2003-0078]）

   *Bodo Moeller；Brice Canvel (EPFL)、Alain Hiltgen (UBS)、Serge Vaudenay (EPFL) 和 Martin Vuagnoux (EPFL, Ilion) 指出的问题*

### 0.9.6g 和 0.9.6h 之间的更改 [2002 年 12 月 5 日]

 * 新函数 OPENSSL_cleanse()，用于清除内存中的内容。这是通过一个计数器完成的，该计数器会在每个字节中放置交替的值。这可以用来解决两个问题：1）高度优化的编译器移除 memset() 调用，以及 2）用非 0 值进行清除，因为这些值可以通过某些介质读取，例如磁盘上的交换空间。

   *Geoff Thorpe*

 * 错误修复：客户端会话缓存与外部缓存不兼容，因为在从外部缓存重新加载时没有恢复 session->cipher 设置。当设置 SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG（SSL_OP_ALL 的一部分）时，此问题被掩盖。（由 Steve Haslam <steve@araqnid.ddts.net> 发现。）

   *Lutz Jaenicke*

 * 修复客户端证书 (ssl/s2_clnt.c)：允许的 REQUEST-CERTIFICATE 消息的总长度为 18 .. 34，而不是 17 .. 33。

   *Zeev Lieber <zeev-l@yahoo.com>*

 * 撤销在 0.9.6e 中引入的一个未记录的更改，该更改导致对 OpenSSL_add_all_ciphers() 和 OpenSSL_add_all_digests() 的重复调用被忽略，即使在调用 EVP_cleanup() 之后也是如此。

   *Richard Levitte*

 * 更改默认配置读取器以处理最后一行未正确终止的情况。

   *Richard Levitte*

 * 更改 X509_NAME_cmp()，使其应用特殊规则来处理类型为 PrintableString 的 DN 值，以及类型为 emailAddress 且值为 ia5String 的 RDN。

   *stefank@valicert.com 通过 Richard Levitte*

 * 添加 SSL_SESS_CACHE_NO_INTERNAL_STORE 标志，以接管 SSL_SESS_CACHE_NO_INTERNAL_LOOKUP 之前不一致地执行的一半工作，定义了一个新标志（SSL_SESS_CACHE_NO_INTERNAL）作为两者的按位或，供大多数需要此行为的应用程序使用，并更新文档。记录的行为和实际行为不一致，并且一直在变化，因此这更像是一个错误修复而不是行为更改。

   *Geoff Thorpe，由 Nadav Har'El 诊断*

 * 不要在 ssl/s3_clnt.c 中强制会话 ID 的最小长度为 16 字节（SSL 3.0 和 TLS 1.0 规范允许的最大长度为 32 字节）。

   *Bodo Moeller*

 * 修复 SSLv23_method()、SSLv23_client_method()、SSLv23_server_method()、SSLv2_method()、SSLv2_client_method()、SSLv2_server_method()、SSLv3_method()、SSLv3_client_method()、SSLv3_server_method()、TLSv1_method()、TLSv1_client_method()、TLSv1_server_method()、ssl2_get_cipher_by_char()、ssl3_get_cipher_by_char() 中的初始化代码竞争条件。

   *Patrick McCormick <patrick@tellme.com>, Bodo Moeller*

 * 重新排序 SSL_CTX_free() 中的清理顺序：仅在刷新缓存的会话后删除 ex_data，因为 remove_cb() 可能会使用 ex_data 内容。由 Sam Varshavchik <mrsam@courier-mta.com> 发现的错误（参见 [openssl.org #212]）。

   *Geoff Thorpe, Lutz Jaenicke*

 * 修复 OBJ_txt2obj 中的拼写错误，该错误错误地将内容长度而不是编码长度传递给 d2i_ASN1_OBJECT。

   *Steve Henson*

### 0.9.6f 和 0.9.6g 之间的更改 [2002 年 8 月 9 日]

 * [在 0.9.6g-engine 版本中：]
   修复 WIN32 的 crypto/engine/vendor_defns/cswift.h（使用 `_stdcall`）。

   *Lynn Gazis <lgazis@rainbow.com>*

### 0.9.6e 和 0.9.6f 之间的更改 [2002 年 8 月 8 日]

 * 修复 ASN1 检查。通过与 LONG_MAX 比较来检查溢出，并修复头长度计算。
   *Florian Weimer <Weimer@CERT.Uni-Stuttgart.DE>,
   Alon Kantor <alonk@checkpoint.com>（及其他人）, Steve Henson*

 * 在 0.9.6e 中添加的缓冲区溢出检查中使用适当的错误处理而不是“断言”。这可以防止拒绝服务（断言可能会调用 abort()）。

   *Arne Ansper <arne@ats.cyber.ee>, Bodo Moeller*

### 0.9.6d 和 0.9.6e 之间的更改 [2002 年 7 月 30 日]

 * 向 asn1_get_length() 添加各种健全性检查，以拒绝 ASN1 长度字节，如果它们超过 sizeof(long)，显示为负数，或者内容长度超过提供的缓冲区长度。

   *Steve Henson, Adi Stav <stav@mercury.co.il>, James Yonan <jim@ntlp.com>*

 * 修复密码选择例程：不加密的密码没有设置密码强度标志，因此选择例程（PR #130）无法正确处理。

   *Lutz Jaenicke*

 * 修复 EVP_dsa_sha 宏。

   *Nils Larsch*

 * 新选项
        SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS
   用于禁用在 OpenSSL 0.9.6d 中添加的 SSL 3.0/TLS 1.0 CBC 漏洞对策。

   由于该对策被证明与某些损坏的 SSL 实现不兼容，因此新选项是 SSL_OP_ALL 的一部分。
   通常在需要与奇怪的 SSL 实现兼容时使用 SSL_OP_ALL（例如，'s_client' 和 's_server' 的 '-bugs' 选项），因此新选项在许多应用程序中会自动设置。

   *Bodo Moeller*

 * 安全补丁中的更改：

   标记为“(CHATS)”的更改由国防高级研究计划局（DARPA）和空军研究实验室、空军后勤司令部、美国空军根据协议编号 F30602-01-2-0537 赞助。

 * 向 asn1_get_length() 添加各种健全性检查，以拒绝 ASN1 长度字节，如果它们超过 sizeof(long)，显示为负数，或者内容长度超过提供的缓冲区长度。（[CVE-2002-0659]）

   *Steve Henson, Adi Stav <stav@mercury.co.il>, James Yonan <jim@ntlp.com>*

 * 对各种潜在的缓冲区溢出进行断言，这些溢出在实践中并不已知会发生。

   *Ben Laurie (CHATS)*

 * 用于保存整数 ASCII 版本的各种临时缓冲区对于 64 位平台来说太小了。（[CVE-2002-0655]）
   *Matthew Byng-Maddick <mbm@aldigital.co.uk> 和 Ben Laurie (CHATS)>*

 * SSL3 协议中的远程缓冲区溢出 - 攻击者可以提供一个过大的会话 ID 给客户端。（[CVE-2002-0656]）

   *Ben Laurie (CHATS)*

 * SSL2 协议中的远程缓冲区溢出 - 攻击者可以提供一个过大的客户端主密钥。（[CVE-2002-0656]）

   *Ben Laurie (CHATS)*

### 0.9.6c 和 0.9.6d 之间的更改 [2002 年 5 月 9 日]

 * 修复 crypto/asn1/a_sign.c，以便为 id-dsa-with-sha1 省略（不编码为 NULL）'parameters'。

   *Nils Larsch <nla@trustcenter.de>；Bodo Moeller 指出的问题*

 * 检查 'apps/req.c' 中的各种 `X509_...()` 返回值。

   *Nils Larsch <nla@trustcenter.de>*

 * 修复 BASE64 解码（EVP_DecodeUpdate）以处理带 CR/LF 行尾的数据：当 CRLF 恰好在已处理块的末尾时，会错误地标记文件结束条件。该错误是在通过缓冲内存 BIO 处理数据并将其传递给 BASE64 解码 BIO 时发现的。由 Pavel Tsekov <ptsekov@syntrex.com> 和 Nedelcho Stanev 发现错误并提交补丁。

   *Lutz Jaenicke*

 * 实现针对 SSL 3.0/TLS 1.0 中 CBC 密码套件最近发现的漏洞的对策：在应用程序数据块之前发送一个空片段，以避免使用攻击者可能选择的数据的已知 IV。

   *Bodo Moeller*

 * 修复 ssl3_get_client_hello() 中的长度检查。

   *Bodo Moeller*

 * TLS/SSL 库错误修复：以不同的方式使用 s->s3->in_read_app_data，以防止 ssl3_read_internal() 在启用握手处理时错误地假设 ssl3_read_bytes() 找到了应用程序数据，而实际上 s->s3->in_read_app_data 在初始握手期间只是被自动清除。

   *Bodo Moeller；Arne Ansper <arne@ats.cyber.ee> 指出的问题*

 * 修复对象定义中的错误，用于 Private 和 Enterprise：它们在其短名称（小写）表示中未被识别。扩展 obj_dat.pl 以在遇到未定义关键字时发出错误，而不是默默忽略问题（Svenning Sorensen <sss@sss.dnsalias.net>）。

   *Lutz Jaenicke*

 * 修复 DH_generate_parameters()，使其适用于“非标准”生成器，即除 2 和 5 之外的生成器。（以前，代码没有正确初始化 BN_generate_prime() 的 'add' 和 'rem' 值。）
   在新的一般情况下，我们不坚持 'generator' 实际上是原根：这个要求相当无意义；阶为 q 的子群的生成器同样有效，甚至更好。

   *Bodo Moeller*

 * 将新的 X509 验证错误映射到警报。由 Tom Wu <tom@arcot.com> 发现并提交。

   *Lutz Jaenicke*

 * 修复 ssl3_pending() (ssl/s3_lib.c)，以防止在使用非阻塞 I/O 时，在数据完全接收之前 SSL_pending() 返回非零值。

   *Bodo Moeller；John Hughes 指出的问题*

 * 某些密码缺少强度条目（SSL_LOW 等）。

   *Ben Laurie, Lutz Jaenicke*

 * 修复 SSL_clear() 中的错误：未删除错误的会话（由 Yoram Zahavi <YoramZ@gilian.com> 发现）。

   *Lutz Jaenicke*

 * 添加关于 CygWin 1.3 及更高版本的信息，并保留之前版本的正确配置。

   *Corinna Vinschen <vinschen@redhat.com> 和 Richard Levitte*

 * 使会话缓存的移除（SSL_CTX_remove_session()）更加健壮：检查我们处理的是否是会话的副本，如果是，则不从缓存中删除。由“Izhar Shoshani Levi”<izhar@checkpoint.com> 报告的问题。

   *Lutz Jaenicke*

 * 如果设置了 SSL_SESS_CACHE_NO_INTERNAL_LOOKUP 标志，则不将会话数据存储到内部会话缓存中，因为它永远不会被查找。（由 Aslam <aslam@funk.com> 提出。）

   *Lutz Jaenicke*

 * 当请求的值为 0 时，使 ASN1_BIT_STRING_set_bit() 真正清除一个位。

   *Richard Levitte*

 * [在 0.9.6d-engine 版本中：]
   修复 hwcrhk_load_pubkey() 中的崩溃错误和逻辑错误。

   *Toomas Kiisk <vix@cyber.ee> 通过 Richard Levitte*

 * 添加 OS/390 Unix 的配置条目。C 编译器 'c89' 通过 tools/c89.sh 调用，因为参数必须重新排列（所有 '-L' 选项必须出现在第一个目标模块之前）。

   *Richard Shapiro <rshapiro@abinitio.com>*

 * [在 0.9.6c-engine 版本中：]
   添加对 Baltimore Technologies 的 SureWare 加密加速卡的支持。（使用引擎 'sureware'）

   *Baltimore Technologies 和 Mark Cox*

 * [在 0.9.6c-engine 版本中：]
   添加对 Accelerated Encryption Processing (www.aep.ie) 的加密加速卡的支持。（使用引擎 'aep'）

   *AEP Inc. 和 Mark Cox*

 * 添加用于 UnixWare 上 gcc 的配置条目。

   *Gary Benson <gbenson@redhat.com>*

 * 更改 ssl/s2_clnt.c 和 ssl/s2_srvr.c，以便接收的握手消息存储在单个块中（固定长度部分和可变长度部分组合），并修复了在此过程中发现的各种错误。

   *Bodo Moeller*

 * 在 BIO_gethostbyname() 中禁用缓存，直接使用 gethostbyname()。BIO_gethostbyname() 不知道适当的超时时间，因此即使条目已失效，它们也会保留在缓存中。
   *Bodo Moeller；Rich Salz <rsalz@zolera.com> 指出的问题*

 * 更改 ssl23_get_client_hello (ssl/s23_srvr.c) 在遇到病态小的 ClientHello 片段（不包含 client_version）时的行为：而不是中止并报错，而是简单地选择可用的最高协议版本（即 TLS 1.0，除非它被禁用）。实际上，ClientHello 消息从不这样发送，但此更改至少为 TLS 提供了严格正确的行为。

   *Bodo Moeller*

 * 修复 SSL 握手函数和 SSL_clear()，以便在从握手函数之一内部调用 SSL_clear() 时，SSL_clear() 永远不会将 s->method 重置为 s->ctx->method。

   *Bodo Moeller；Niko Baric 指出的问题*

 * 在 ssl3_get_client_hello (ssl/s3_srvr.c) 中，如果 client_version 小于正在使用的协议版本，则生成一个致命警报（使用客户端的版本号发送）。还更改 ssl23_get_client_hello (ssl/s23_srvr.c) 以选择 TLS 1.0，如果客户端要求 SSL 3.0 但仅启用了 TLS 1.0；然后客户端至少会看到该警报。

   *Bodo Moeller*

 * 修复 ssl3_get_message (ssl/s3_both.c) 以正确处理消息分片。

   *Bodo Moeller*

 * 避免在客户端收到 HelloRequest 时，在握手过程中，ssl3_get_message (ssl/s3_both.c) 中的无限循环。

   *Bodo Moeller；Andy Schneider <andy.schneider@bjss.co.uk> 注意到的错误*

 * 修复 ssl3_accept (ssl/s3_srvr.c) 中的错误修复：SSL3_ST_SW_HELLO_REQ_C 情况应以 'break' 结束，而不是 'goto end'，后者会绕过状态 SSL_ST_OK 中完成的各种清理。但对于我们刚刚发送 HelloRequest 的情况，会话相关的内容必须在 SSL_ST_OK 中禁用。
   此外，通过在仅发送 HelloRequest 之前不调用 ssl_init_wbio_buffer() 来避免一些开销。

   *Bodo Moeller, Eric Rescorla <ekr@rtfm.com>*

 * 修复 ssl/s3_enc.c、ssl/t1_enc.c 和 ssl/s3_pkt.c，以便我们不暴露是否发现了非法块密码填充或发生了 MAC 验证错误。（SSLerr() 代码或警报不能直接被潜在攻击者看到，但信息可能会通过日志文件泄露。）
   SSL 2.0 实现不需要类似的更改，因为 SSL 2.0 的填充字节数以明文形式发送，并且额外的字节被忽略。然而，ssl/s2_pkt.c 未能验证声称的填充字节数是否在合法范围内。

   *Bodo Moeller*

 * 添加 OpenUNIX-8 支持，包括共享库（Boyd Lynn Gerber <gerberb@zenez.com>）。

   *Lutz Jaenicke*

 * 再次改进 RSA_padding_check_PKCS1_OAEP() 检查，以避免使用巨大的编码参数的“手表攻击”（参见 James H. Manger 的 CRYPTO 2001 论文）。请注意，RSA_private_decrypt() 的 RSA_PKCS1_OAEP_PADDING 情况不使用编码参数，因此不受此漏洞影响。

   *Bodo Moeller*

 * BN_sqr() 错误修复。

   *Ulf Möller，由 Jim Ellis <jim.ellis@cavium.com> 报告*

 * Rabin-Miller 测试分析假设均匀分布的见证人，因此使用 BN_pseudo_rand_range() 而不是使用 BN_pseudo_rand() 后进行模约。

   *Bodo Moeller；Adam Young <AYoung1@NCSUS.JNJ.COM> 指出*

 * 添加具有明显功能的 BN_pseudo_rand_range()：基于 BN_pseudo_rand() 而不是 BN_rand() 的 BN_rand_range() 等效项。

   *Bodo Moeller*

 * s3_srvr.c：允许发送大型客户端证书列表（> 16 kB）。
   此函数已损坏，因为处理 SGC 的新客户端 hello 消息的检查不允许这些大型消息。
   （由“Douglas E. Engert”<deengert@anl.gov> 追踪。）

   *Lutz Jaenicke*

 * 向 `SSL_alert_desc_string[_long]()` 添加 TLSv1 的警报描述。

   *Lutz Jaenicke*

 * 修复 BIO_get_num_renegotiates() 和 BIO_ctrl() 对于 BIO_C_GET_WRITE_BUF_SIZE 的错误行为（“Stephen Hinton”<shinton@netopia.com>）。

   *Lutz Jaenicke*

 * 重构了 Tru64 Unix 的配置和共享库支持。
   配置部分利用了现代编译器特性，并为运行旧版本操作系统的用户保留了旧的编译器行为。
   共享库支持部分包括一个使用 RPATH 功能的变体，可通过特殊配置目标“alpha-cc-rpath”获得，该目标永远不会自动选择。

   *Tim Mooney <mooney@dogbert.cc.ndsu.NoDak.edu> 通过 Richard Levitte*

 * 在 ssl3_get_key_exchange (ssl/s3_clnt.c) 中，使用与 ssl3_get_certificate_request() 相同的消息大小调用 ssl3_get_message()。
   否则，如果没有 ServerKeyExchange 消息，CertificateRequest 消息可能会被无意中拒绝，因为它们太长了。

   *Petr Lampa <lampa@fee.vutbr.cz>*

 * 增强了对 IA-64 Unix 平台（主要是 Linux 和 HP-UX）的支持。

   *Andy Polyakov*

 * 修改了 SSL 库，以便使用 SSL_set_verify() 为 SSL 对象专门设置的 verify_callback 实际上被使用。在此更改之前，使用此函数设置的 verify_callback 被忽略，并使用了在调用时在 SSL_CTX 中设置的 verify_callback()。引入了新的函数 X509_STORE_CTX_set_verify_cb() 以允许必要的设置。

   *Lutz Jaenicke*

 * 在 crypto/dh/dh_lib.c 和 crypto/dh/dh_lib.c 中显式初始化静态变量为 NULL，因为至少在 Solaris 8 上这似乎并非总是自动完成（与 C 标准的要求相矛盾）。这在使用 OpenSSH 时导致了问题。

   *Lutz Jaenicke*

 * 在 OpenSSL 0.9.6a 和 0.9.6b 中，crypto/dh/dh_key.c 忽略了 dh->length 并始终使用

           BN_rand_range(priv_key, dh->p)。

   Diffie-Hellman 不需要 BN_rand_range()，并且当 dh->length（推荐的指数长度）远小于 dh->p 的长度时，此特定范围会使 Diffie-Hellman 效率低下。如果 DH 结构中存储了子群的阶，我们可以使用 BN_rand_range()，但我们只有 dh->length。

   因此，切换回

           BN_rand(priv_key, l, ...)

   其中 'l' 是 dh->length（如果已定义），否则是 BN_num_bits(dh->p)-1。

   *Bodo Moeller*

 * 在

           RSA_eay_public_encrypt
           RSA_eay_private_decrypt
           RSA_eay_private_encrypt (签名)
           RSA_eay_public_decrypt (签名验证)

   （RSA_public_encrypt、RSA_private_decrypt、RSA_private_encrypt、RSA_public_decrypt 的默认实现），始终拒绝大于等于 n 的数字。

   *Bodo Moeller*

 * 在 crypto/rand/md_rand.c 中，使用新的短期锁 CRYPTO_LOCK_RAND2 来同步对 'locking_thread' 的访问。在 'locking_thread'（一个 'unsigned long' 变量）的访问不是原子的系统上，这是必需的。

   *Bodo Moeller*

 * 在 crypto/rand/md_rand.c 中，在设置 'crypto_lock_rand' 标志*之前*将 'locking_thread' 设置为当前线程的 ID。之前的代码在 0 是有效线程 ID 时存在竞争条件。

   *Travis Vitek <vitek@roguewave.com>*

 * 添加了对 Irix 的共享库支持。

   *Albert Chin-A-Young <china@thewrittenword.com>*

 * 添加了在 MIPS 上构建 Linux 的大端和小端版本的配置选项。

   *Ralf Baechle <ralf@uni-koblenz.de>*

 * 添加了在 HP-UX 上创建共享库的可能性。

   *Richard Levitte*

### 0.9.6a 和 0.9.6b 之间的更改 [2001 年 7 月 9 日]

 * 更改 ssleay_rand_bytes (crypto/rand/md_rand.c) 以避免 Markku-Juhani O. Saarinen <markku-juhani.saarinen@nokia.com> 指出的 SSLeay/OpenSSL PRNG 弱点：
   基于一个 PRNG 请求的输出，通过适当大小的请求，可以恢复 PRNG 状态，以了解 'md'，然后进行足够多的连续 1 字节 PRNG 请求，以遍历所有 'state'。

   1. 在 PRNG 输出生成期间更新 'md_local'（'md' 的当前线程副本）时，对整个之前的 'md_local' 值进行哈希处理，而不仅仅是用于 PRNG 输出的那一半。

   2. 使从 'state' 中包含到哈希中的字节数独立于请求的 PRNG 字节数。

   仅第一项措施就足以避免 Markku-Juhani 的攻击。（实际上，我从未想过用于链接的 'md_local' 的一半是 PRNG 输出字节所取的一半——我一直认为使用的是秘密的一半。）第二项措施确保来自 'state' 的额外数据永远不会以小块形式混入 'md_local'；这启发式地进一步加强了 PRNG。

   *Bodo Moeller*

 * 修复 crypto/bn/asm/mips3.s。

   *Andy Polyakov*

 * 当只给出密钥给“enc”时，IV 是未定义的。在这种情况下打印错误消息。

   *Lutz Jaenicke*

 * 处理 X509_NAME 为空时的特殊情况，在 X509 打印例程中。

   *Steve Henson*

 * 在 dsa_do_verify (crypto/dsa/dsa_ossl.c) 中，验证 r 和 s 是否大于 0 且小于 q。

   *Bodo Moeller*

 * 如果使用了 add_lock_callback，则不要更改 CRYPTO_add_lock() 中的 `*pointer`：它不是线程安全的，add_lock_callback 应自行处理。

   *Paul Rose <Paul.Rose@bridge.com>*

 * 在 ssl3_enc (ssl/s3_enc.c) 和 tls1_enc (ssl/t1_enc.c) 中验证传入数据是否符合块大小。

   *Bodo Moeller*

 * 修复 OAEP 检查。

   *Ulf Möller, Bodo Möller*

 * PKCS #1 v1.5 RSA 加密 Bleichbacher 攻击的对策在 s3_srvr.c 中意外地在 OpenSSL 0.9.5 中被移除，当时是为了修复向后兼容的“client hello”消息的服务器行为。（请注意，该攻击对于 SSL 3.0 和 TLS 1.0 来说本来就是不切实际的，因为长度和版本检查意味着猜中有效密文的概率约为 2^-40；参见 Bleichenbacher 的 CRYPTO '98 论文第 5 节。）
   在 0.9.5 之前，对策（通过生成随机“解密结果”来隐藏错误）未能正常工作，因为缺少 ERR_clear_error()，这意味着 SSL_get_error() 会检测到被忽略的错误。
   现在这两个问题都已修复。

   *Bodo Moeller*

 * 在 crypto/bio/bf_buff.c 中，将 DEFAULT_BUFFER_SIZE 增加到 4096（以前是 1024）。

   *Bodo Moeller*

 * 修复兼容模式信任设置：除非存在有效的信任或拒绝设置，否则忽略信任设置。

   *Steve Henson*

 * 修复 blowfish EVP：它是一个可变长度的密码。

   *Steve Henson*

 * 修复与 DSA S/MIME 验证相关的各种错误。处理 DSA 公钥结构中缺失的参数，并在 DSA 例程中返回错误（如果参数缺失）。

   *Steve Henson*

 * 在 0.9.6 及之前的版本中，如果未设置 $RANDFILE 或 $HOME，RAND_file_name() 会回退到当前目录下的文件 ".rnd"。RAND_file_name() 在 0.9.6a 中在此情况下返回 NULL。这给未设置 $HOME 的 Windows 用户造成了一些困惑。
   因此，RAND_file_name() 再次更改：e_os.h 可以定义一个 DEFAULT_HOME，如果未设置 $HOME，则使用它。
   对于 Windows，我们使用 "C:"；在其他平台上，我们仍然需要环境变量。

 * 将 'if (!initialized) RAND_poll()' 移到由 CRYPTO_LOCK_RAND 保护的区域。这并非严格必需，但可以避免多个线程并发调用 RAND_poll()。

   *Bodo Moeller*

 * 在 crypto/rand/md_rand.c 中，用标志和线程 ID 变量的组合替换 'add_do_not_lock' 标志。
   否则，当一个线程在 ssleay_rand_bytes 中（它设置了标志）时，*其他*线程可以在不遵守 CRYPTO_LOCK_RAND 锁的情况下进入 ssleay_add_bytes（甚至可能在第一个线程取消设置 add_do_not_lock 后非法释放它们不持有的锁）。

   *Bodo Moeller*

 * 再次更改 bctest：'-x' 表达式并非在所有版本的 'test' 中都可用。

   *Bodo Moeller*

### 0.9.6 和 0.9.6a 之间的更改 [2001 年 4 月 5 日]

 * 修复 PKCS7_dataDecode() 中的几个内存泄漏

   *Steve Henson，由 Heyun Zheng <hzheng@atdsprint.com> 报告*

 * 更改 Configure 和 Makefiles 以提供 EXE_EXT，它将包含可执行文件的默认扩展名（如果有）。此外，使使用 symlink() 的 perl 脚本测试它是否确实存在，如果不存在则使用 "cp"。所有这些都使得 OpenSSL 在 CygWin 中可以编译和安装。

   *Richard Levitte*

 * 修复 asn1_GetSequence() 以处理不定长构造数据。
   如果 SEQUENCE 的长度不定，则将 c->slen 设置为可用数据的总量。

   *Steve Henson，由 shige@FreeBSD.org 报告*

   *此更改不适用于 0.9.7。*

 * 更改 bctest 以避免在命令替换中使用 here-documents（解决 FreeBSD /bin/sh 错误）。
   为与 Ultrix 的兼容性，避免使用 shell 函数（在搜索 $PATH 的 bctest 版本中引入）。

   *Bodo Moeller*

 * 重命名 'des_encrypt' 为 'des_encrypt1'。这避免了与某些操作系统（如 Solaris 和 UnixWare）定义的 des_encrypt() 的冲突。

   *Richard Levitte*

 * 检查 RSA-CRT（参见 D. Boneh, R. DeMillo, R. Lipton: On the Importance of Eliminating Errors in Cryptographic Computations, J. Cryptology 14 (2001) 2, 101-119, <http://theory.stanford.edu/~dabo/papers/faults.ps.gz>）。

   *Ulf Moeller*

 * MIPS 汇编器 BIGNUM 除法错误修复。

   *Andy Polyakov*

 * 禁用不正确的 Alpha 汇编器代码。

   *Richard Levitte*

 * 修复 PKCS#7 解码例程，以便在读取 EXPLICIT 标签的 EOC 后正确更新长度。

   *Steve Henson*

   *此更改不适用于 0.9.7。*

 * 修复 PKCS#12 密钥生成例程中的错误。当使用 0 初始字节生成 3DES 密钥时会触发此错误。包含 PKCS12_BROKEN_KEYGEN 编译选项以保留旧的（但错误的）行为。

   *Steve Henson*

 * 增强 bctest 以沿 $PATH 搜索可用的 bc 并找到时打印它。

   *Tim Rice <tim@multitalents.net> 通过 Richard Levitte*

 * 修复 err.c 中的内存泄漏：如果需要，释放 err_data 字符串；不要写入 ERR_set_error_data 中错误的索引。

   *Bodo Moeller*

 * 实现 ssl23_peek（类似于 ssl23_read），它以前不存在。

   *Bodo Moeller*

 * 将 VC++ 5.0 版本中的 rdtsc 替换为 `_emit` 语句。

   *Jeremy Cooper <jeremy@baymoo.org>*

 * 使 SSLv2 会话可以重用。

   *Richard Levitte*

 * 在 copy_email() 中检查 X509_NAME_get_index_by_NID() 的返回值是否 >= 0，因为 0 是一个有效的索引。

   *Steve Henson 由 Massimiliano Pala <madwolf@opensca.org> 报告*

 * 在 PKCS7_verify() 中检查 X509_get_pubkey() 是否失败，以避免使用不受支持或无效的公钥导致核心转储。修复 PKCS7_verify() 在非分离数据失败时发生的内存泄漏。

   *Steve Henson*

 * 在作为 setuid/setgid运行时，不要在库函数中使用 getenv。
   新函数 OPENSSL_issetugid()。

   *Ulf Moeller*

 * 避免由于多线程处理不当导致的内存泄漏检测代码（crypto/mem_dbg.c）中的误报：

   1. 修复 CRYPTO_mem_ctrl() 的 MemCheck_off() 部分中的时序故障。

   2. 修复 is_MemCheck_on()（又名 CRYPTO_is_mem_check_on()）中的逻辑故障。

   3. 计算 MemCheck_off() 的调用次数，以便正确处理嵌套使用。这还避免了先前代码中的带内信令（它依赖于线程 ID 0 不可能存在的假设）。

   *Bodo Moeller*

 * 向 s_client 和 s_server 添加 "-rand" 选项。

   *Lutz Jaenicke*

 * 修复 Irix 6.x 上的 CPU 检测。
   *Kurt Hockenbury <khockenb@stevens-tech.edu> 和
   "Bruce W. Forsberg" <bruce.forsberg@baesystems.com>*

 * 修复 X509_NAME 错误，该错误在 X509_NAME 为空时产生不正确的编码。

   *Steve Henson*

   *此更改不适用于 0.9.7。*

 * 使用 X509_NAME 结构的缓存编码，而不是复制它。这显然是 libsafe“错误”的原因，但代码实际上是正确的。

   *Steve Henson*

 * 添加新函数 BN_rand_range()，并修复 DSA_sign_setup() 以防止 Bleichenbacher 的 DSA 攻击。
   扩展 BN_[pseudo_]rand：与以前一样，top=1 强制设置最高两位，top=0 强制设置最高位；top=-1 是新的，它使最高位随机。

   *Ulf Moeller, Bodo Moeller*

 * 在 `NCONF_...`-基于的 `CONF_...` 查询实现中（crypto/conf/conf_lib.c），如果输入 LHASH 为 NULL，则避免使用临时 CONF 结构，其中数据组件设置为 NULL（这会导致 lh_retrieve 中的段错误）。
   相反，在 CONF_get_string 和 CONF_get_number（可能使用环境变量）中使用 NULL 作为 CONF 指针，并直接从 CONF_get_section 返回 NULL。

   *Bodo Moeller*

 * 修复 EBCDIC 的潜在缓冲区溢出。

   *Ulf Moeller*

 * 容忍 nonRepudiation 作为 S/MIME 签名和 certSign keyUsage 的有效值，如果 CA 的 basicConstraints 不存在。

   *Steve Henson*

 * 使 SMIME_write_PKCS7() 以一种更通用的接受格式（分号前无空格）写入邮件头值，因为某些程序否则无法正确解析这些值。同时确保按每次写入换行的 BIO 不会创建无效的头。

   *Richard Levitte*

 * 使 CRL 编码例程能够处理空的 SEQUENCE OF。
   以前使用的宏不会编码空的 SEQUENCE OF 并破坏签名。

   *Steve Henson*

   *此更改不适用于 0.9.7。*

 * 在 DH 密码套件中，在导出主密钥后将预主密钥置零。

   *Steve Henson*

 * 将一些 EVP_add_digest_alias 注册（如在 OpenSSL_add_all_digests() 中找到的）添加到 SSL_library_init()（又名 OpenSSL_add_ssl_algorithms()）。这提供了与使用具有非常规 AlgorithmIdentifier OID 的 X.509 证书的对等方更好的兼容性。

   *Bodo Moeller*

 * 修复 Irix 与 NO_ASM 的问题。

   *"Bruce W. Forsberg" <bruce.forsberg@baesystems.com>*

 * ./config 脚本修复。

   *Ulf Moeller, Richard Levitte*

 * 修复 'openssl passwd -1'。

   *Bodo Moeller*

 * 更改 PKCS12_key_gen_asc()，使其能够处理非 null 终止的字符串，其长度在 passlen 参数中传递，例如来自 PEM 回调。这是通过向 asc2uni() 添加一个额外的长度参数来实现的。

   *Steve Henson，由 <oddissey@samsung.co.kr> 报告*

 * 修复由 'openssl dsaparam -C' 生成的 C 代码：如果 BN_bin2bn 调用失败，则释放 DSA 结构。

   *Bodo Moeller*

 * 修复 uni2asc() 以处理零长度的 Unicode 字符串。
   这些字符串存在于某些 PKCS#12 文件中。

   *Steve Henson*

 * 在 ssl2_new (ssl/s2_lib.c) 中将 s2->wbuf 分配增加一个字节。
   否则，do_ssl_write (ssl/s2_pkt.c) 在写入 32767 字节记录时会超出缓冲区限制。

   *Bodo Moeller；Eric Day <eday@concentric.net> 报告的问题*

 * 在 `RSA_eay_public_{en,ed}crypt` 和 RSA_eay_mod_exp (rsa_eay.c) 中，在设置 `rsa->_method_mod_{n,p,q}` 之前获取锁 CRYPTO_LOCK_RSA。

   （RSA 对象具有受 CRYPTO_LOCK_RSA 保护的引用计数访问 [参见 rsa_lib.c, s3_srvr.c, ssl_cert.c, ssl_rsa.c]，因此它们旨在跨线程共享。）
   *Bodo Moeller, Geoff Thorpe；由 "Reddie, Steven" <Steven.Reddie@ca.com> 提交的原始补丁*

 * 修复 CRYPTO_mem_leaks() 中的死锁。

   *Bodo Moeller*

 * 在 bntest 中使用更好的测试模式。

   *Ulf Möller*

 * rand_win.c 修复 Borland C。

   *Ulf Möller*

 * BN_rshift 针对 n == 0 的错误修复。

   *Bodo Moeller*

 * 添加一个 'bctest' 脚本，该脚本检查一些已知的 'bc' 错误，以便 'make test' 不会因为 'bc' 损坏而中止。

   *Bodo Moeller*

 * 在 SSL_SESSION 中也为客户端存储 verify_result，以避免潜在的安全漏洞。（客户端上的重用会话总是导致 verify_result==X509_V_OK，而不是使用服务器证书验证的原始结果。）

   *Lutz Jaenicke*

 * 修复 ssl3_pending：如果 s->s3->rrec 中的记录不是 SSL3_RT_APPLICATION_DATA 类型，则返回 0。
   类似地，将 ssl2_pending 更改为在 SSL_in_init(s) 为 true 时返回 0。

   *Bodo Moeller*

 * 修复 SSL_peek：
   ssl2_peek 和 ssl3_peek 在早期版本中完全损坏，它们通过将 ssl2_read 和 ssl3_read 的先前实现重命名为 ssl2_read_internal 和 ssl3_read_internal，并向它们添加“peek”参数来实现。新的 ssl[23]_{read,peek} 函数是对 ssl[23]_read_internal 的调用，并设置了适当的“peek”标志。
   还向 ssl3_read_bytes 添加了一个“peek”参数，它执行 ssl3_read_internal 的实际工作。

   *Bodo Moeller*

 * 在调用方法特定的 "init()" 处理程序之前，初始化 RSA/DSA/DH 结构中的 "ex_data" 成员。在调用方法特定的 "finish()" 处理程序之后，也清理 ex_data。以前，这是反向进行的。

   *Geoff Thorpe*

 * 将 BN_CTX（BN_CTX 中的 BIGNUM 数量）增加到 16。
   以前的值 12 对于 BN_mod_exp() 来说并不总是足够。

   *Bodo Moeller*

 * 确保共享库获得内部名称引擎，其中包含完整的版本号，而不仅仅是 0。这应该将共享库标记为不向后兼容。当然，当我们能够保证向后二进制兼容性时，这应该再次更改。

   *Richard Levitte*

 * 修复 by_dir.c 中的 get_cert_by_subject() 中的拼写错误

   *Jean-Marc Desperrier <jean-marc.desperrier@certplus.com>*

 * 重构共享库的生成系统：

   - 记录共享库的预期扩展名，以及是否需要符号链接，例如从 libcrypto.so.0 到 libcrypto.so.0.9.7。Configure 中有扩展信息。

   - 尽可能少地重建共享库。

   - 仍然避免将 OpenSSL 程序链接到共享库。

   - 安装时，将共享库与静态库分开安装。

   *Richard Levitte*

 * 修复 SSL_CTX_set_read_ahead 宏以实际使用其参数。
   在 SSL_new 中将 SSL_CTX 的 read_ahead 标志复制到 SSL 对象，而不是在 SSL_clear 中，因为后者也由 accept/connect 函数使用；以前，SSL_set_read_ahead 所做的设置会在握手期间丢失。

   *Bodo Moeller；Anders Gertz <gertz@epact.se> 报告的问题*

 * 校正 util/mkdef.pl 以选择性地处理禁用的算法。
   以前，它无论如何都会为禁用的算法创建条目。

   *Richard Levitte*

 * 添加了几个新的 SSL_* 函数的手册页。

   *Lutz Jaenicke*

### 0.9.5a 和 0.9.6 之间的更改 [2000 年 9 月 24 日]

 * 在 ssl23_get_client_hello 中，当遇到一个过小的、不足以包含 ClientHello 消息前两个字节（即 client_version）的初始 SSL 3.0/TLS 记录时，生成一个错误消息。
   （注意：这是一个病态情况，在实际生活中可能从未发生过。） 之前的方法是使用记录头中的版本号作为替代；但我们的协议选择不应依赖于此，因为它未通过 Finished 消息进行认证。

   *Bodo Moeller*

 * Windows 下更健壮的随机数收集函数。

   *Jeffrey Altman <jaltman@columbia.edu>*

 * 出于兼容性原因，如果未设置 X509_V_FLAG_ISSUER_CHECK 标志，则不设置颁发者检查错误的错误代码，以避免可能覆盖回调函数已处理的其他错误。如果应用程序设置了该标志，则假定它知道自己在做什么，并能适当地处理新的信息性代码。

   *Steve Henson*

 * 修复 ASN1_TYPE 处理中的一个棘手错误。ASN1_TYPE 用于通用的“ANY”类型，因此它应该能够解码任何内容，包括带标签的类型。然而，它没有检查类，因此会错误地将带标签的类型解释为与其通用对应物相同的方式，并且未知类型会被拒绝。已更改为将带标签和未知类型与 SEQUENCE 的处理方式相同：即编码被完整存储。还有一个新类型“V_ASN1_OTHER”，当类不是 universal 时使用，在这种情况下，我们不知道实际类型是什么，所以我们将它们全部归为一类。

   *Steve Henson*

 * 在 VMS 上，stdout 很有可能指向一个以记录为导向的文件。这意味着每次 write() 都会写入一个单独的记录，而尝试读取它的程序将单独读取这些记录。这可能会非常令人困惑。
   解决方案是在中间放置一个 BIO 过滤器，它会缓冲文本直到遇到换行符，然后一次写入一行，这样每个写入的记录都是一个实际的行，而不是行的片段，也不是（通常不会发生，但我见过一次）一个记录中包含多行。BIO_f_linebuffer() 就是答案。
   目前，这是 VMS 独有的方法，因为它已经得到了充分的测试。

   *Richard Levitte*

 * 移除 BN_mod_mul_montgomery 中的“优化”平方变体，它可能返回不正确的结果。
   （注意：有缺陷的变体在 OpenSSL 0.9.5a 中未启用，但在 0.9.6-beta[12] 中已启用。）

   *Bodo Moeller*

 * 在 pk7_smime.c 中禁用对内容存在的检查，以验证分离的签名。某些版本的 Netscape（错误地）在签名消息时包含零长度内容。

   *Steve Henson*

 * 新的 BIO_shutdown_wr 宏，它调用 BIO_C_SHUTDOWN_WR BIO_ctrl（用于 BIO 对）。

   *Bodo Möller*

 * 为 VMS 添加 DSO 方法。

   *Richard Levitte*

 * Bug 修复：Montgomery 乘法可能产生符号错误的结果。

   *Ulf Möller*

 * 添加 RPM 规范 openssl.spec 并修改它以构建三个包。默认包包含应用程序、应用程序文档和运行时库。devel 包包含头文件、静态库和函数文档。doc 包包含 doc 目录的内容。原始的 openssl.spec 由 Damien Miller <djm@mindrot.org> 提供。

   *Richard Levitte*

 * 添加了大量 SSL 例程的文档文件。

   *Lutz Jaenicke <Lutz.Jaenicke@aet.TU-Cottbus.DE>*

 * 为 Sony News 4 添加配置条目。

   *NAKAJI Hiroyuki <nakaji@tutrp.tut.ac.jp>*

 * 在 DSA 库中生成小于 q 的随机数时，不要将最高两位设置为一。

   *Ulf Möller*

 * 新的 SSL API 模式 'SSL_MODE_AUTO_RETRY'。这禁用了 SSL_read 可能导致 SSL_ERROR_WANT_READ（即使底层传输是阻塞的）的默认行为（如果发生了握手）。
   （默认行为对于 s_client 和 s_server 等应用程序是必需的，它们使用 select() 来确定何时使用 SSL_read；但对于预先知道何时期望数据的应用程序，这只会使事情变得更复杂。）

   *Bodo Moeller*

 * 添加 RAND_egd_bytes()，它允许控制从 EGD 读取的字节数。

   *Ben Laurie*

 * 添加了几个 EBCDIC 条件编译，使 `req` 和 `x509` 在此类系统上工作得更好。

   *Martin Kraemer <Martin.Kraemer@MchP.Siemens.De>*

 * 添加了两个 PKCS12_parse() 和 PKCS12_create() 的演示程序。
   更新了 PKCS12_parse()，使其将 friendlyName 和 keyid 复制到证书的辅助信息中。

   *Steve Henson*

 * 修复了 PKCS7_verify() 中的一个错误，该错误在存在多个签名时会导致无限循环。

   *Sven Uszpelkat <su@celocom.de>*

 * util/mkdef.pl 的重大更改，以包含每个符号的额外信息，并同时呈现变量和函数。此更改意味着当某些算法被排除时，不再需要重新构建 .num 文件。

   *Richard Levitte*

 * 允许应用程序设置验证时间，而不是始终使用当前时间。

   *Steve Henson*

 * 第二阶段验证代码重组。证书验证代码现在通过多个标准查找颁发者证书：主题名称、颁发者密钥 ID 和密钥用法。它还通过相同的标准验证自签名证书。主要的比较函数是 X509_check_issued()，它执行这些检查。
   为了在不完全重写查找代码的情况下支持这一点，需要进行大量更改。
   颁发者和主题密钥标识符现在已缓存。
   X509_STORE 中的 LHASH 'certs' 已被 STACK_OF(X509_OBJECT) 取代。这主要是因为 LHASH 无法存储或检索具有相同哈希值的多个对象。
   因此，各种函数（以前仅供内部使用）已更改为处理新的 X509_STORE 结构。这将破坏任何内部操作 X509_STORE 的代码。
   X509_STORE_add_cert() 函数现在检查精确匹配，而不仅仅是主题名称。
   X509_STORE API 不直接支持检索与给定标准匹配的多个证书，但可以通过先执行查找（这将用候选证书填充缓存），然后检查缓存中的匹配项来解决此问题。这可能是我们能做的最好的，而不完全抛弃 X509_LOOKUP（也许以后...）。
   X509_VERIFY_CTX 结构已得到显著增强。
   所有证书查找操作现在都通过 get_issuer() 回调进行。虽然这目前使用 X509_STORE，但可以替换为自定义查找。这是绕过使此工作正常运行所需的 X509_STORE 技巧的一种简单方法，并为将来使用更有效的技术提供了可能性。还提供了一个使用简单 STACK 作为其受信任证书存储的非常简单的版本，使用 X509_STORE_CTX_trusted_stack()。
   verify_cb() 和 verify() 回调现在在 X509_STORE_CTX 结构中有等效项。
   X509_STORE_CTX 还有一个 'flags' 字段，可用于自定义验证行为。

   *Steve Henson*

 * 添加新的 PKCS#7 签名选项 PKCS7_NOSMIMECAP，它排除 S/MIME 功能。

   *Steve Henson*

 * 读取证书请求时，保留签名数据的原始编码副本，并在再次输出时使用它。签名然后使用原始编码而不是解码后的编码版本，如果请求编码不正确，这可能会导致问题。

   *Steve Henson*

 * 为了与其他 BIO_puts 实现保持一致，在 buffer_puts 中直接调用 buffer_write(b, ...) 而不是调用 BIO_write(b, ...)。
   在 BIO_puts 中，像 BIO_write 一样增加 b->num_write。

   *Peter.Sylvester@EdelWeb.fr*

 * 修复 BN_mul_word 在 word 为 0 的情况下的问题。（我们必须使用 BN_zero，我们不能返回一个由设置为零的 word 组成的数组的 BIGNUM。）

   *Bodo Moeller*

 * 避免在检测到问题时从库中调用 abort()，除非定义了预处理器符号（如 REF_CHECK、BN_DEBUG 等）。

   *Bodo Moeller*

 * 新的 openssl 应用程序 'rsautl'。此实用程序可用于低级 RSA 操作。还添加了 DER 公钥 BIO/fp 例程。

   *Steve Henson*

 * 为在 QNX 4 上编译添加新的 Configure 条目和补丁。

   *Andreas Schneider <andreas@ds3.etech.fh-hamburg.de>*

 * 由 Nuron (<http://www.nuron.com/>) 赞助了一个演示状态机实现，现已在 demos/state_machine 中提供。

   *Ben Laurie*

 * 为 'dgst' 实用程序添加了签名生成和验证的新选项。

   *Steve Henson*

 * 未识别的 PKCS#7 内容类型现在通过一个通配符 ASN1_TYPE 结构进行处理。这允许将不支持的类型存储为“blob”，应用程序可以手动对其进行编码和解码。

   *Steve Henson*

 * 修复了各种有符号/无符号问题，以使 a_strex.c 在 VC++ 下编译。

   *Oscar Jacobsson <oscar.jacobsson@celocom.com>*

 * ASN1 修复。如果传递了缓冲区，i2d_ASN1_OBJECT 没有返回正确的长度。如果传递了 NULL BN 并且其参数为负数，则 ASN1_INTEGER_to_BN 失败。

   *Steve Henson，由 Sven Heiberg <sven@tartu.cyber.ee> 指出*

 * 修改 PKCS#7 编码例程以输出定长编码。由于目前整个结构都在内存中，因此使用不定长构造编码没有实际意义。但是，如果 OpenSSL 使用 PKCS7_INDEFINITE_ENCODING 标志编译，则会使用旧形式。

   *Steve Henson*

 * 添加了 BIO_vprintf() 和 BIO_vsnprintf()。

   *Richard Levitte*

 * 为通过日志 BIO 写入的字符串添加了更多前缀以进行解析，以涵盖 syslog 可用的所有级别。前缀现在是：

           PANIC, EMERG, EMR       =>      LOG_EMERG
           ALERT, ALR              =>      LOG_ALERT
           CRIT, CRI               =>      LOG_CRIT
           ERROR, ERR              =>      LOG_ERR
           WARNING, WARN, WAR      =>      LOG_WARNING
           NOTICE, NOTE, NOT       =>      LOG_NOTICE
           INFO, INF               =>      LOG_INFO
           DEBUG, DBG              =>      LOG_DEBUG

   并且像以前一样，如果字符串开头没有这些前缀，则选择 LOG_ERR。
   在 Win32 上，`LOG_*` 级别根据以下方式映射：

           LOG_EMERG, LOG_ALERT, LOG_CRIT, LOG_ERR => EVENTLOG_ERROR_TYPE
           LOG_WARNING                             => EVENTLOG_WARNING_TYPE
           LOG_NOTICE, LOG_INFO, LOG_DEBUG         => EVENTLOG_INFORMATION_TYPE

   *Richard Levitte*

 * 使其可以通过配置参数“reconf”或“reconfigure”进行重新配置。命令行参数存储在 Makefile.ssl 中的 CONFIGURE_ARGS 变量中，并在重新配置时从中检索。

   *Richard Levitte*

 * 实现 MD4。

   *Assar Westerlund <assar@sics.se>, Richard Levitte*

 * 向 pkcs12 实用程序添加 -CAfile 和 -CApath 参数。

   *Richard Levitte*

 * obj_dat.pl 脚本弄乱了对象名称的排序。原因是它比较了字符串的带引号版本，结果“OCSP”>“OCSP Signing”，因为“> SPACE。更改了脚本以存储名称的不带引号版本并在输出时添加引号。它还从查找表中省略了一些名称，如果它们被赋予了默认值（即如果 SN 缺失，则赋予与 LN 相同的值，反之亦然），现在将它们添加进来，理由是如果一个对象有一个名称，我们应该能够查找它。最后，在找到重复的短名称或长名称时添加了警告输出。

   *Steve Henson*

 * 针对 Tandem NSK 所需的更改。

   *Scott Uroff <scott@xypro.com>*

 * 修复 SSL 2.0 回滚检查：由于 RSA_padding_check_SSLv23() 中的偏移错误，特殊填充从未被检测到，因此 SSL 3.0/TLS 1.0 对抗协议版本回滚攻击的对策无效。
   在 s23_clnt.c 中，如果客户端只启用了 SSL 2.0 协议，则不要使用特殊的防回滚攻击填充（RSA_SSLV23_PADDING）；类似地，在 s23_srvr.c 中，如果服务器只启用了 SSL 2.0 协议，则不要执行回滚检查。

   *Bodo Moeller*

 * 使 'openssl asn1parse' 能够获取不可打印数据的十六进制转储。隐含地，添加了 ASN1_parse_dump() 和 BIO_dump_indent() 函数。

   *Richard Levitte*

 * 新函数 ASN1_STRING_print_ex() 和 X509_NAME_print_ex()，它们根据各种标志（包括 RFC2253 支持和多字节字符的正确处理）打印字符串和名称结构。向 'x509' 实用程序添加了选项以允许设置各种标志。

   *Steve Henson*

 * 各种修复，使用 ASN1_TIME 而不是 ASN1_UTCTIME。还更改了函数 X509_cmp_current_time() 和 X509_gmtime_adj() 以使用 ASN1_TIME 结构工作，这将允许检查使用 GeneralizedTime 作为有效性日期的证书。

   *Steve Henson*

 * 使 NEG_PUBKEY_BUG 代码（容忍无效的负公钥编码）默认启用，可以设置 NO_NEG_PUBKEY_BUG 来禁用它。

   *Steve Henson*

 * 新函数 c2i_ASN1_OBJECT()，它作用于 ASN1_OBJECT 内容字节。i2c_ASN1_OBJECT 是不必要的，因为编码可以从结构中轻松获得。

   *Steve Henson*

 * crypto/err.c 锁定 bug 修复：使用写锁（`CRYPTO_w_[un]lock`），而不是读锁（`CRYPTO_r_[un]lock`）。

   *Bodo Moeller*

 * 首次尝试通过配置创建对共享库的官方支持。我保留了默认静态库的设置，并且 OpenSSL 程序始终静态链接，但已为动态链接做好准备。
   这已在 Linux 和 Tru64 上进行了测试。

   *Richard Levitte*

 * Win9x 的随机数轮询函数，如 Peter Gutmann 的文章所述：Peter Gutmann, Software Generation of Practically Strong Random Numbers。

   *Ulf Möller*

 * 修复 req 中的 PRNG 被种子化，如果使用已存在的 DSA 密钥。

   *Steve Henson*

 * smime 应用程序的新选项。-inform 和 -outform 允许 S/MIME 消息的其他格式，包括 PEM 和 DER。-content 选项允许单独指定内容。这应该可以更容易地验证 Netscape 表单签名输出。

   *Steve Henson*

 * 修复使用“长形式”的 ASN1 标签编码。

   *Steve Henson*

 * 新的 ASN1 函数 `i2c_*` 和 `c2i_*` 用于 INTEGER 和 BIT STRING 类型。这些函数将内容字节转换为底层类型，或从底层类型转换。实际的标签和长度字节假定已被读取和检查。这些是必需的，因为除标签外，所有其他字符串类型几乎都具有相同的处理方式。通过拥有仅操作内容字节的 ASN1 函数版本，可以正确处理 IMPLICIT 标记。它还允许减少 ASN1_ENUMERATED 代码，因为 ASN1_ENUMERATED 和 ASN1_INTEGER 除了标签外是相同的。

   *Steve Henson*

 * 更改 OID 对象处理方式如下：

   - 新的对象标识符插入到 objects.txt 中，遵循 [crypto/objects/README.md](crypto/objects/README.md) 中给出的语法。
   - objects.pl 用于处理 obj_mac.num 并创建一个新的 obj_mac.h。
   - obj_dat.pl 用于创建新的 obj_dat.h，使用 obj_mac.h 中的数据。

   目前这有点像一个 hack，objects.pl 中的 perl 代码也不是很优雅，但它按我预期的那样工作。检查它是否正确工作的最简单方法是查看 obj_dat.h 并检查 nid_objs 数组，并确保对象没有移动（这很重要！）。添加是允许的，名称更改也是一致的。

   *Richard Levitte*

 * 向 'openssl passwd' 添加 BSD 风格的基于 MD5 的密码（选项 '-1'）。

   *Bodo Moeller*

 * 向 'openssl req' 添加命令行参数 '-rand file'。给定的文件会添加到通过 RANDFILE 配置选项或环境变量或默认随机状态文件已添加到随机池的任何内容中。

   *Richard Levitte*

 * mkstack.pl 现在按词法顺序对每个宏组进行排序。以前的输出顺序取决于文件在目录中的出现顺序，导致不必要的 safestack.h 重写。

   *Steve Henson*

 * 修复了使 OpenSSL 再次在 Win32 下编译所需的补丁。主要是为了解决 VC++ 将 func() 视为 func(void) 的问题。还删除了 mkdef.pl 中添加额外类型安全函数的那些部分：这些函数已不存在。

   *Steve Henson*

 * 重组堆栈代码。宏现在全部收集在 safestack.h 中。每个宏都根据形式为 `SKM_<name>(type, a, b)` 的“堆栈宏”来定义。DEBUG_SAFESTACK 现在通过函数强制转换来处理，这具有在不使用额外函数的情况下保留类型安全性的优点。如果未定义 DEBUG_SAFESTACK，则使用非类型安全的宏。还修改了 mkstack.pl 脚本以处理新形式。需要测试以查看哪些（如果有）编译器会卡住，并且可能在没有重大问题的情况下将 DEBUG_SAFESTACK 设为默认值。ASN1_SET_OF 和 PKCS12_STACK_OF 具有类似的行为。

   *Steve Henson*

 * 当某些版本的 IIS 使用私钥的“NET”形式时，密钥派生算法不同。通常使用 MD5(password) 作为 128 位 RC4 密钥。在修改后的情况下，使用 MD5(MD5(password) + "SGCKEYSALT")。添加了一些新函数 i2d_RSA_NET()、d2i_RSA_NET() 等，它们与旧的 Netscape_RSA 函数相同，只是它们有一个额外的 'sgckey' 参数，该参数使用修改后的算法。还向 rsa 实用程序添加了一个 -sgckey 命令行选项。感谢 Adrian Peck <bertie@ncipher.com> 将修改后的算法的详细信息发布到 openssl-dev。

   *Steve Henson*

 * evp_local.h 宏使用了 'c.##kname'，这导致在某些系统（例如 SCO 5.0.5）上出现无效的扩展。已更正为 'c.kname'。

   *Phillip Porch <root@theporch.com>*

 * 新函数 X509_get1_email() 和 X509_REQ_get1_email()，它们从证书或请求返回一个 STACK 的电子邮件地址，它们查找主题名称和主题备用名称扩展，并省略重复的地址。

   *Steve Henson*

 * 重新实现 BN_mod_exp2_mont，使用独立的（更大的）窗口。这使得 DSA 验证速度提高了约 2%。

   *Bodo Moeller*

 * 将 `BN_mod_exp_...` 中的最大窗口大小从 6 位增加到 6 位（这意味着现在将预计算 2^5 个值，对于 1024 位模数，这仅为 4 KB 加上开销）。
   这使得 1024 位指数的指数运算速度提高了约 0.5%（根据“openssl speed rsa2048”的测量）。

   *Bodo Moeller*

 * 重命名内存处理宏以避免与其他软件冲突：
           Malloc         =>  OPENSSL_malloc
           Malloc_locked  =>  OPENSSL_malloc_locked
           Realloc        =>  OPENSSL_realloc
           Free           =>  OPENSSL_free

   *Richard Levitte*

 * 新函数 BN_mod_exp_mont_word 用于小基数（比 BN_mod_exp_mont 快约 15%，即完整 DH 交换速度快 7%）。

   *Bodo Moeller*

 * CygWin32 支持。

   *John Jarvie <jjarvie@newsguy.com>*

 * 类型安全的堆栈代码已重新调整。它现在仅在 OpenSSL 使用 DEBUG_SAFESTACK 选项配置时编译，并且默认情况下所有类型特定的堆栈函数都通过“#define”重新映射到标准堆栈函数。这导致更精简的输出，但保留了原始方法类型安全检查的可能性。

   *Geoff Thorpe*

 * STACK 代码已得到清理，并且一些不合理的类型声明已得到统一。这还涉及对 safestack.h 的某种清理，以更正确地将类型安全的堆栈函数映射到它们的普通堆栈对应项。这项工作还导致了大量代码的“const”化，特别是 `_cmp` 操作，这些操作通常应该用“const”参数进行原型声明。

   *Geoff Thorpe*

 * 在 md_rand.c 中首次生成字节时，“搅动池”通过使用 STATE_SIZE 虚拟字节进行播种（熵计数为零）。
   （PRNG 状态由两部分组成：大的池“state”和“md”，每次使用 PRNG 时都会使用所有的“md”，但“state”仅通过循环计数器索引使用。由于熵可能从一开始就不均匀分布，“md”很重要，因为它是一个链式变量。然而，输出函数仅链接“md”的一半，即 80 位。另一方面，ssleay_rand_add 会链接所有的“md”，并且使用 STATE_SIZE 虚拟字节进行播种将导致所有的“state”被重写，新值将依赖于几乎所有的“md”。这克服了 80 位限制。）

   *Bodo Moeller*

 * 在 ssl/s2_clnt.c 和 ssl/s3_clnt.c 中，在 ssl_verify_cert_chain() 后继续握手时调用 ERR_clear_error()；否则，如果设置了 SSL_VERIFY_NONE，剩余的错误代码可能导致稍后出现“无法解释”的连接中止。

   *Bodo Moeller；问题由 Lutz Jaenicke 追踪*

 * 重大的 EVP API 密码修订。
   添加了 EVP 额外功能的钩子。这允许在 EVP 接口中设置各种密码参数。通过 EVP_CIPHER_CTX_set_key_length() 函数支持可变密钥长度密码，并支持设置 RC2 和 RC5 参数。
   修改 EVP_OpenInit() 和 EVP_SealInit() 以处理可变密钥长度密码。
   移除了 EVP 库中的大量重复代码。例如，*每个*密码的 init() 函数都根据密码模式以相同的方式处理 'iv'。如果 'key' 参数为 NULL，它们也都不执行任何操作，并且对于 CFB 和 OFB 模式，它们会将 ctx->num 清零。
   新功能允许移除 S/MIME 代码 RC2 的 hack。
   大多数例程具有相同的形式，因此可以根据宏进行声明。
   通过将其移至顶层 EVP_CipherInit()，可以将其从所有单独的密码中移除。如果密码希望以不同的方式处理 IV 或密钥，它可以设置 EVP_CIPH_CUSTOM_IV 或 EVP_CIPH_ALWAYS_CALL_INIT 标志。
   更改了许多函数，如 EVP_EncryptUpdate()，使其现在返回一个值：虽然算法的软件版本不能失败，但任何已安装的硬件版本都可以。

   *Steve Henson*

 * 实现 SSL_OP_TLS_ROLLBACK_BUG：在 ssl3_get_client_key_exchange 中，如果设置了此选项，则容忍发送协商协议版本号而不是请求协议版本号的损坏客户端。

   *Bodo Moeller*

 * 调用 dh_tmp_cb（由 `..._TMP_DH_CB` 设置）时使用正确的 'is_export' 标志；即，对于导出密码套件非零，否则为零。
   以前的版本将此标志颠倒了，与 rsa_tmp_cb (..._TMP_RSA_CB) 不一致。

   *Bodo Moeller；问题由 Amit Chopra 报告*

 * 添加了缺失的 DSA 库文本字符串。解决了某些具有无效 SEQUENCE 编码的 IIS 密钥文件的问题。

   *Steve Henson*

 * 添加了一个文档（doc/standards.txt），其中列出了 OpenSSL 中实现的所有类型的标准等。

   *Richard Levitte*

 * 增强 c_rehash 脚本。旧版本会错误处理具有相同主题名称哈希的证书，并且根本不处理 CRL。
   向 crl 实用程序添加了 -fingerprint 选项，以支持新的 c_rehash 功能。

   *Steve Henson*

 * 消除了 crypto.h 和 stack.h 中的非 ANSI 声明。

   *Ulf Möller*

 * 修复了 SSL 服务器用途检查：服务器检查拒绝了具有扩展密钥用法但没有 ssl 客户端用途的证书。

   *Steve Henson，由 Rene Grosser <grosser@hisolutions.com> 报告*

 * 使 PKCS#12 代码在没有密码的情况下也能工作。PKCS#12 规范对于如何处理空白密码有些不明确。
   由于密码以带有终止双 NULL 的 BMPString 形式编码，零长度密码将只剩下双 NULL。然而，完全没有密码是不同的，并且在 PKCS#12 密钥生成代码中以不同的方式处理。NS 将空白密码视为零长度。MSIE 在导出时将其视为无密码：但它会在导入时尝试两者。我们现在也这样做：如果密码设置为 "" 或 NULL（NULL 现在是有效密码：以前不是），PKCS12_parse() 会尝试零长度和无密码，pkcs12 应用程序也是如此。

   *Steve Henson*

 * 修复了 `apps/x509.c` 中的 bug：避免了内存泄漏；并且在 PEM_read_bio_X509_REQ 失败时不要使用 perror，错误消息必须从错误队列中获取。

   *Bodo Moeller*

 * 通过在适当的情况下释放 crypto/err/err.c 中的 'thread_hash' 来避免内存泄漏，并相应地更改 ERR_get_state 以避免竞争条件（这是必需的，因为 thread_hash 一旦设置就不再是常量）。

   *Bodo Moeller*

 * 修复了 linux-elf makefile.one 的 bug。

   *Ulf Möller*

 * RSA_get_default_method() 现在将选择一个默认的 RSA_METHOD，如果之前不存在的话。
   以前这只在调用 RSA_new() 或 RSA_new_method(NULL) 时设置，这意味着 RSA_get_default_method() 可能返回 NULL。

   *Geoff Thorpe*

 * 添加了对现有 DSO 代码的原生名称翻译，该翻译（如果设置了相应标志）会将足够小且没有路径信息的 Filename 转换为规范的原生形式。例如，“blah”转换为“libblah.so”或“blah.dll”等。

   *Geoff Thorpe*

 * 新函数 ERR_error_string_n(e, buf, len)，它类似于 ERR_error_string(e, buf)，但最多写入 'len' 字节，包括 0 终止符。对于 ERR_error_string_n，'buf' 不能为 NULL。

   *Damien Miller <djm@mindrot.org>, Bodo Moeller*

 * CONF 库重构为更通用。实现了一个新的 CONF 配置文件读取器“类”以及处理它的新函数（`NCONF_*`，“New CONF”）。旧的 `CONF_*` 函数仍然存在，但它们被重新实现为基于新函数工作。此外，还提供了一组函数来处理配置数据的内部存储，以便更容易编写新的配置文件读取器“类”（我绝对可以看到一些读取 XML 格式的配置文件，例如），称为 `_CONF_*`，或“配置存储 API”...
   新的配置文件读取函数是：

           NCONF_new, NCONF_free, NCONF_load, NCONF_load_fp, NCONF_load_bio,
           NCONF_get_section, NCONF_get_string, NCONF_get_numbre

           NCONF_default, NCONF_WIN32

           NCONF_dump_fp, NCONF_dump_bio

   NCONF_default 和 NCONF_WIN32 是方法（或“类”）选择器，NCONF_new 创建一个新的 CONF 对象。这与其他 OpenSSL 接口（如 BIO 接口）的工作方式相同。`NCONF_dump_*` 转储配置文件的内部存储，这对于调试很有用。所有其他函数接受与旧 `CONF_*` 函数相同的参数，除了第一个参数必须是 `CONF *` 而不是 `LHASH *`。
   为了使新类更容易与旧 `CONF_*` 函数一起使用，提供了函数 CONF_set_default_method。

   *Richard Levitte*

 * 向 'openssl ciphers' 添加 '-tls1' 选项，该选项已在文档中提及但尚未实现。（此选项目前还不是很有用，因为即使是额外的实验性 TLS 1.0 密码目前也被视为 SSL 3.0 密码。）

   *Bodo Moeller*

 * 在 libcrypto 中添加了初始 DSO 代码，用于让 OpenSSL（和基于 OpenSSL 的应用程序）以可移植的方式加载共享库并绑定到它们。

   *Geoff Thorpe，Richard Levitte 贡献*

### 0.9.5 和 0.9.5a 之间的更改 [2000 年 4 月 1 日]

 * 确保 _lrotl 和 _lrotr 仅与 MSVC 一起使用。

 * 在 ssleay_rand_status（RAND_status 的默认实现）中正确使用锁 CRYPTO_LOCK_RAND。

 * 重命名 openssl x509 选项 '-crlext'，该选项在 0.9.5 中添加，为 '-clrext'（= 清除扩展），如预期和文档所述。
   *Bodo Moeller；不一致之处由 Michael Attili <attili@amaxo.com> 指出*

 * HMAC 修复。如果密钥长度大于 MD 块大小，它没有将块的其余部分清零。

   *Steve Henson，由 Yost William <YostW@tce.com> 指出*

 * 现代化 PKCS12_parse()，使其使用 STACK_OF(X509) 作为其 ca 参数，修复了当 ca 参数传递为 NULL 时发生的泄漏。停止 X509_PUBKEY_set() 使用传递的密钥：如果传递的密钥是私钥，则 X509_print() 的结果将打印出所有私钥组件。

   *Steve Henson*

 * des_quad_cksum() 字节顺序 bug 修复。
   *Ulf Möller，使用 krb4-0.9.7 中的问题描述，其中解决方案归功于 Derrick J Brashear <shadow@DEMENTIA.ORG>*

 * 修复 V_ASN1_APP_CHOOSE 使其再次工作：但强烈不建议使用它。

   *Steve Henson，由 Brian Korver <briank@cs.stanford.edu> 指出*

 * 为了在 shell 脚本中轻松测试某个命令 'openssl XXX' 是否存在，新的伪命令 'openssl no-XXX' 返回退出代码 0，当且仅当不存在给定名称的命令时。在这种情况下，打印 'no-XXX'，否则打印 'XXX'。在这两种情况下，输出都转到 stdout，并且不向 stderr 打印任何内容。附加参数始终被忽略。
   由于每个密码都有一个同名命令，因此可以通过这种方式测试 'no-cipher' 编译开关。
   （'openssl no-XXX' 无法检测伪命令，如 'quit'、'list-XXX-commands' 或 'no-XXX' 本身。）

   *Bodo Moeller*

 * 更新测试套件，以便在 'no-rsa' 配置中成功运行 'make test'。

   *Bodo Moeller*

 * 对于 SSL_[CTX_]set_tmp_dh，如果设置了 SSL_OP_SINGLE_DH_USE，则不要创建 DH 密钥；它将被丢弃，因为每次握手都会创建自己的密钥。
   ssl_cert_dup，由 SSL_new 使用，现在除了参数外还复制 DH 密钥——在以前的版本（自 OpenSSL 0.9.3 起）中，“default key”从 SSL_CTX_set_tmp_dh 中丢失，这意味着当使用此宏时，您实际上得到了 SSL_OP_SINGLE_DH_USE。

   *Bodo Moeller*

 * 新的 s_client 选项 -ign_eof：忽略 stdin 的 EOF，并且“Q”和“R”失去其特殊含义（退出/重新协商）。
   这是 -quiet 的一部分；与 -quiet 不同，-ign_eof 不会抑制任何输出。

   *Richard Levitte*

 * 向目的和信任代码添加兼容性选项。目的 X509_PURPOSE_ANY 是“任何目的”，它自动接受证书或 CA，这是以前的行为，并伴有所有相关的安全问题。
   X509_TRUST_COMPAT 是旧的信任行为：仅自动信任证书存储中的自签名根。新的信任设置 X509_TRUST_DEFAULT 用于指定目的没有关联的信任设置，它应该改用默认目的中的值。

   *Steve Henson*

 * 修复 PKCS#8 DSA 私钥代码，使其能够再次解码密钥并修复内存泄漏。

   *Steve Henson*

 * 在 util/mkerr.pl（实现 'make errors'）中，保留 .c 文件先前版本中的原因字符串，因为默认情况下自动生成的原因代码仅包含小写字母（和数字）并不总是合适的。

   *Bodo Moeller*

 * 在 ERR_load_ERR_strings() 中，使用 strerror 构建 ERR_LIB_SYS 错误原因表。以前，ERR_reason_error_string() 为 SYSerr 返回库名称作为原因字符串；但 SYSerr 是一个特殊情况，其中小的数字是 errno 值，而不是库号。

   *Bodo Moeller*

 * 向 'openssl dhparam' 应用程序添加 '-dsaparam' 选项。这会将 DSA 参数转换为 DH 参数。（创建参数时，使用 DSA_generate_parameters。）

   *Bodo Moeller*

 * 在 openssl dhparam -C 生成的 C 代码中包含 'length'（推荐指数长度）。

   *Bodo Moeller*

 * perlasm 中的 set_label 的第二个参数已经被使用，因此不能用作“文件范围”标志。已移至第三个参数，该参数是空闲的。

   *Steve Henson*

 * 在 PEM_ASN1_write_bio 和其他一些函数中，使用 RAND_pseudo_bytes 而不是 RAND_bytes 来进行加密 IV 和 salt。

   *Bodo Moeller*

 * 将 RAND_status() 包含到 RAND_METHOD 中，而不是仅为 md_rand.c 实现它。否则，通过调用 RAND_set_rand_method 来替换 PRNG 将是不可能的。

   *Bodo Moeller*

 * 防止 DSA_generate_key() 在随机数生成失败时进入无限循环。

   *Bodo Moeller*

 * 新的 'rand' 应用程序，用于创建伪随机输出。

   *Bodo Moeller*

 * 添加了对 Linux/IA64 的配置支持

   *Rolf Haberrecker <rolf@suse.de>*

 * Mingw32 的汇编模块支持。

   *Ulf Möller*

 * HPUX 的共享库支持（在 shlib/ 中）。

   *Lutz Jaenicke <Lutz.Jaenicke@aet.TU-Cottbus.DE> 和匿名*

 * Solaris gcc 的共享库支持。

   *Lutz Behnke <behnke@trustcenter.de>*

### 0.9.4 和 0.9.5 之间的更改 [2000 年 2 月 28 日]

 * PKCS7_encrypt() 由于手动添加和 SMIME_crlf_copy() 的原因，会重复添加文本 MIME 头部。

   *Steve Henson*

 * 在 bntest.c 中，不要调用参数为零位的 BN_rand。

   *Steve Henson，由 Andrew W. Gray <agray@iconsinc.com> 指出*

 * BN_mul 错误修复：在 bn_mul_part_recursion() 中，只实现了 a>a[n] && b>b[n] 的情况。这导致 BN_div_recp() 有时会失败。

   *Ulf Möller*

 * 为 perl 汇编语言构建器中的 set_label() 添加了一个可选的第二个参数。如果存在此参数且设置为 1，则表示汇编器应使用作用域为整个文件的符号，而不仅仅是当前函数。这对于使用 label:: 格式的 MASM 是必需的。

   *Steve Henson，由 Peter Runestig <peter@runestig.com> 指出*

 * 将 ASN1 类型更改为默认使用 typedef。之前几乎所有类型都使用 #define 定义为 ASN1_STRING，这会导致 STACK_OF() 问题：例如，您无法声明 STACK_OF(ASN1_UTF8STRING)。

   *Steve Henson*

 * 更改新函数的名称以符合新的 get1/get0 命名约定：'get1' 之后，调用者拥有引用计数，并且必须调用 `..._free`；'get0' 返回指向某个数据结构的指针，而不增加引用计数。（一些现有的 'get' 函数会增加引用计数，有些则不会。）
   类似地，'set1' 和 'add1' 函数会增加引用计数或复制对象。

   *Steve Henson*

 * 允许临时 RSA 密钥生成失败的可能性：以前的代码假设它总是成功的，并在失败时崩溃。

   *Steve Henson*

 * 修复 BIO_printf() 中潜在的缓冲区溢出问题。
   *Ulf Möller，使用 Patrick Powell 的公共领域代码；问题由 David Sacerdote <das33@cornell.edu> 指出*

 * 支持 EGD <http://www.lothar.com/tech/crypto/>。 新函数 RAND_egd() 和 RAND_status()。在命令行应用程序中，可以使用 RANDFILE 或 -rand 指定 EGD 套接字，就像指定种子文件一样。

   *Ulf Möller*

 * 允许在 PKCS#7 结构中容忍 CERTIFICATE 字符串。一些 CA（例如 Verisign）以这种形式分发证书。

   *Steve Henson*

 * 移除 SSL_ALLOW_ADH 编译选项并将默认密码列表设置为排除它们。这意味着不需要特殊的编译选项即可使用匿名 DH：它只需要包含在密码列表中。

   *Steve Henson*

 * 将 EVP_MD_CTX_type 宏更改为与 EVP_MD_type 含义一致。旧功能可在名为 EVP_MD_md() 的新宏中获得。更改使用它的代码并更新文档。

   *Steve Henson*

 * `..._ctrl` 函数现在具有相应的 `..._callback_ctrl` 函数，其中 `void *` 参数被函数指针参数替换。以前 `void *` 被滥用来指向函数，这在许多平台上有效，但并不正确。由于这些函数通常由 OpenSSL 头文件中定义的宏调用，因此大多数源代码应该无需更改即可工作。

   *Richard Levitte*

 * `<openssl/opensslconf.h>`（由 Configure 创建）现在包含有关用于编译库的 -D... 编译器开关的信息部分，以便应用程序可以看到它们。要启用其中一个部分，必须定义预处理器符号 `OPENSSL_..._DEFINES`。例如，
           #define OPENSSL_ALGORITHM_DEFINES
           #include <openssl/opensslconf.h>
   定义了所有相关的 `NO_<algo>` 符号，例如 NO_IDEA、NO_RSA 等。

   *Richard Levitte、Ulf 和 Bodo Möller*

 * 错误修复：容忍 SSL 3/TLS 记录层中的分片和交错。

   *Bodo Moeller*

 * 将证书辅助信息中的 'other' 类型更改为 STACK_OF X509_ALGOR。虽然它本身不是 AlgorithmIdentifier，但它具有所需的 ASN1 格式：由 OID 确定的任意类型。

   *Steve Henson*

 * 添加一些 PEM_write_X509_REQ_NEW() 函数和一个 'req' 的命令行参数。这不是因为该函数比其他函数更新或更好，它只是在证书请求头行中使用 'NEW' 这个词。一些软件需要这个。

   *Steve Henson*

 * 重新组织密码命令行参数：现在可以从各种来源获取密码。删除 PEM_cb 函数并将其设为默认行为：即，如果回调为 NULL 且 usrdata 参数不为 NULL，则将其解释为以 null 结尾的口令。如果 usrdata 和回调都为 NULL，则像往常一样提示输入口令。

   *Steve Henson*

 * 添加对 Compaq Atalla 加密加速器的支持。如果已安装，则自动启用支持。生成的二进制文件将自动检测卡并使用它（如果存在）。

   *Ben Laurie 和 Compaq Inc.*

 * 解决 Netscape 挂起错误的解决方法。这会将证书请求和服务器完成发送在一个记录中。由于这在 SSL/TLS 协议中是完全合法的，因此它不是一个“错误”选项，并且默认启用。有关更多信息，请参阅 bugs/SSLv3 条目。

   *Steve Henson*

 * HP-UX 调优：新的统一配置，HP C 编译器错误解决方法。

   *Andy Polyakov*

 * 向 smime 和 pkcs12 应用程序添加 -rand 参数，并读写种子文件。

   *Steve Henson*

 * 新的 'passwd' 工具，用于 crypt(3) 和 apr1 密码哈希。

   *Bodo Moeller*

 * 向其余应用程序添加命令行密码选项。

   *Steve Henson*

 * BN_div_recp() 对于位数偶数的分子错误修复。

   *Ulf Möller*

 * bntest.c 中增加了更多测试，并更改了 test_bn 的输出。

   *Ulf Möller*

 * ./config 现在识别 MacOS X。

   *Andy Polyakov*

 * BN_div() 在 num 和 divisor 的第一个字相等时的错误修复（如果 `(rem=(n1-q*d0)&BN_MASK2) < d0)` 则会给出错误结果）。

   *Ulf Möller*

 * 添加对各种损坏的 PKCS#8 格式的支持，以及生成它们的命令行选项。

   *Steve Henson*

 * 新函数 BN_CTX_start()、BN_CTX_get() 和 BT_CTX_end()，用于从 BN_CTX 获取临时 BIGNUM。

   *Ulf Möller*

 * 修正 p == 0 时 BN_mod_exp_mont() 和 BN_mod_exp2_mont() 的返回值。

   *Ulf Möller*

 * 将 `SSLeay_add_all_*()` 函数更改为 `OpenSSL_add_all_*()` 并包含一个从旧名称到新名称的 #define。最初的目的是静态链接的二进制文件可以例如只调用 SSLeay_add_all_ciphers() 来仅将密码添加到表中而不链接摘要。这从未奏效，因为 SSLeay_add_all_digests() 和 SSLeay_add_all_ciphers() 在同一个源文件中，所以调用一个会链接到另一个。它们现在在单独的源文件中。

   *Steve Henson*

 * 向 'ca' 添加新的 -notext 选项，向 'spkac' 添加 -pubkey 选项。

   *Steve Henson*

 * 使用不太不寻常形式的 Miller-Rabin 素性测试（它在 Miller-Rabin 循环中使用了二元指数算法，我们的标准模指数算法更快）。

   *Bodo Moeller*

 * 完成对 EBCDIC 字符集的 EBCDIC 支持。

   *Martin Kraemer <Martin.Kraemer@Mch.SNI.De>*

 * 源代码清理：在适当的地方使用 const，消除类型转换，在 lhash 中使用 `void *` 而不是 `char *`。

   *Ulf Möller*

 * 错误修复：ssl3_send_server_key_exchange 不可重启动态（状态未更改为 SSL3_ST_SW_KEY_EXCH_B，因此服务器可能会覆盖客户端已看到的临时密钥）。

   *Bodo Moeller*

 * 将 DSA_is_prime 转换为调用 BN_is_prime 的宏，使用 50 次 Rabin-Miller 测试。

   DSA_generate_parameters 现在使用 BN_is_prime_fasttest（使用 50 次 Rabin-Miller 测试，如 FIPS PUB 186[-1] 的附录要求）而不是 DSA_is_prime。
   由于 BN_is_prime_fasttest 包括试除法，DSA 参数生成速度大大加快。

   这意味着 DSA_is_prime 和 DSA_generate_parameters 中的回调函数会发生变化：回调函数在 Rabin-Miller 测试中每次为正的见证者调用一次，而不仅仅是内部循环中的偶尔调用；回调函数的参数现在提供外部循环的迭代计数，而不是内部循环的当前调用。
   DSA_generate_parameters 此外还可以用“iteration count”为 -1 调用回调函数，表示候选数已通过试除法测试（当 q 从应用程序提供的种子生成时，会跳过试除法）。

   *Bodo Moeller*

 * 新函数 BN_is_prime_fasttest，它可选地在开始 Rabin-Miller 测试之前进行试除法，并有一个额外的 BN_CTX * 参数（而 BN_is_prime 必须始终分配至少一个 BN_CTX）。
   当一个数字通过试除法阶段时，会调用 'callback(1, -1, cb_arg)'。

   *Bodo Moeller*

 * CRL 编码错误修复。有效期日期未被处理为 ASN1_TIME。

   *Steve Henson*

 * CA 脚本新增 -pkcs12 选项，用于写入 PKCS#12 文件。

   *Steve Henson*

 * 新函数 BN_pseudo_rand()。

   *Ulf Möller*

 * 清理 BN_mod_mul_montgomery()：用 SSLeay 0.9.0 中的工作代码替换损坏的（且不可读的）bignum 版本 BN_from_montgomery()（基于字的版本速度更快），并清理注释。

   *Ulf Möller*

 * 避免 s2_clnt.c（函数 get_server_hello）中的竞态条件，该条件使得 SSL2 客户端无法在多个线程中使用相同的 SSL_SESSION 数据结构。

   *Bodo Moeller*

 * RAND_load_file() 的返回值不再计算通过 stat() 获取的字节数。新的 RAND_load_file(..., -1) 使用完整文件来播种 PRNG（以前需要显式字节计数）。

   *Ulf Möller, Bodo Möller*

 * 清理 CRYPTO_EX_DATA 函数，其中一些函数没有原型，使用了 `char *` 而不是 `void *`，并且到处都是类型转换。

   *Steve Henson*

 * 使 BN_generate_prime() 在 ret!=NULL 时出错时返回 NULL。

   *Ulf Möller*

 * 保留 BN_prime_checks 宏的源代码兼容性：BN_is_prime(..., BN_prime_checks, ...) 现在使用 BN_prime_checks_for_size 来确定适当的 Rabin-Miller 迭代次数。

   *Ulf Möller*

 * Diffie-Hellman 使用“安全”素数：DH_check() 返回代码重命名为 DH_CHECK_P_NOT_SAFE_PRIME。
   （检查是否属实？OpenPGP 称它们为“强”素数。）

   *Ulf Möller*

 * 将 "dh" 和 "gendh" 程序的合并功能整合到一个新程序 "dhparam" 中。旧程序暂时保留，但将来将处理 DH 密钥（而不是参数）。

   *Steve Henson*

 * 使 ciphers、s_server 和 s_client 程序在设置新的密码列表时检查返回值。

   *Steve Henson*

 * 增强 SSL/TLS 密码机制以正确处理 TLS 56 位密码。以前启用 56 位密码时排序是错误的。

   密码排序的语法已扩展为支持按密码强度排序（使用表中硬编码的 strength_bits）。
   新命令是 `@STRENGTH`（另请参阅 `doc/apps/ciphers.pod`）。

   修复密码命令解析器中的一个错误：当提供一个包含“未定义”符号（既不是命令也不是字母数字 *A-Za-z0-9*）的密码命令字符串时，ssl_set_cipher_list 会陷入无限循环。现在会标记一个错误。

   由于强度排序的扩展，ssl_create_cipher_list() 函数的代码被完全重组。我希望可读性也得到了提高 :-)

   *Lutz Jaenicke <Lutz.Jaenicke@aet.TU-Cottbus.DE>*

 * 'x509' 工具的微小更改。-CAcreateserial 选项现在使用 1 作为第一个序列号，并将 2 放入序列号文件中。这避免了根 CA 使用序列号零创建以及第一个用户证书具有与根 CA 相同的颁发者名称和序列号时出现的问题。

   *Steve Henson*

 * 修复 X509_ATTRIBUTE 工具。更改 'req' 程序以使用新代码。为这些添加文档。

   *Steve Henson*

 * 对 X509_ATTRIBUTE 工具的更改。这些已从 `X509_*()` 重命名为 `X509at_*()`，理由是它们不处理 X509 结构，并且行为类似于 X509v3 函数：它们不应直接调用，而应使用包装函数。

   因此，我们现在也有一些包装函数，在传递证书请求时会调用 X509at 函数。（待办：类似的事情也可以用于 PKCS#7 已签名和未签名属性、PKCS#12 属性以及其他一些内容。其中一些需要 d2i 或 i2d 和打印功能，因为它们处理更复杂的结构。）

   *Steve Henson*

 * 添加了缺少的 #ifndef，这在将 libssl 构建为没有 RSA 的共享库时会导致符号丢失。在 `ssl/s2*.c` 中使用 #ifndef NO_SSL2 而不是 NO_RSA。

   *Kris Kennaway <kris@hub.freebsd.org>，由 Ulf Möller 修改*

 * 防止 PRNG 未初始化的措施：RAND_bytes() 现在有一个返回值，指示随机数据的质量（1 = 好，0 = 未播种）。错误也会记录在线程的错误队列中。新函数 RAND_pseudo_bytes() 生成保证唯一但不不可预测的输出。RAND_add 类似于 RAND_seed，但需要一个额外的熵估计参数（RAND_seed 始终假定完全熵）。

   *Ulf Möller*

 * 对 Rabin-Miller 概率素数测试进行更多迭代（具体来说，对于 1024 位素数进行 3 次，对于 512 位素数进行 6 次，对于 256 位素数进行 12 次，而不是所有长度只进行 2 次；有关完整表格，请参阅 crypto/bn/bn_prime.c 中的 BN_prime_checks_for_size 定义）。这保证了随机输入的误报率最多为 2^-80。

   *Bodo Moeller*

 * 重写 ssl3_read_n (ssl/s3_pkt.c)，避免了几个错误。

   *Bodo Moeller*

 * 新函数 X509_CTX_rget_chain()（在 0.9.5 版本中重命名为 X509_CTX_get1_chain），它返回 X509_CTX 结构中的链，并复制堆栈和增加所有 X509 的引用计数：因此堆栈将在 X509_CTX_cleanup() 调用后仍然存在。修改 pkcs12.c 以使用此函数。

   另外，使 SSL_SESSION_print() 打印出验证返回码。

   *Steve Henson*

 * 为 pkcs12 命令添加 manpage。还更改默认行为，使用 MAC 迭代计数，除非使用新的 -nomaciter 选项。这提高了文件安全性，并且只有旧版本的 MSIE（例如 4.0）需要它。

   *Steve Henson*

 * 遵守创建 .DEF 文件时的 no-xxx 配置选项。

   *Ulf Möller*

 * 将 PKCS#10 属性添加到字段表中：challengePassword、unstructuredName 和 unstructuredAddress。这些取自草案 PKCS#9 v2.0，但与 v1.2 兼容，前提是没有使用国际字符。

   对 X509_ATTRIBUTE 代码的更多更改：允许基于字符串设置类型。删除添加属性时的 'loc' 参数，因为这些将是 SET OF 编码，并按 ASN1 顺序排序。

   *Steve Henson*

 * 对 'req' 工具的初步更改，以允许请求生成自动化。这将允许应用程序仅生成一个包含所有字段值的模板文件，然后由 req 构建请求。

   对 X509_ATTRIBUTE 处理的初步支持。这些的堆栈在证书请求和 PKCS#7 结构等地方广泛使用。它们目前在必要时手动处理，并为 PKCS#7 提供了一些基本包装器。

   稍后，希望能够实现类似于 X509V3 代码的功能，以自动处理更复杂类型的编码、解码和打印。字符串类型（如 challengePassword）可以通过字符串表函数处理。

   还修改了多字节字符串表处理。现在有一个“全局掩码”，用于屏蔽某些类型。表本身可以使用标志 STABLE_NO_MASK 来忽略掩码设置：当例如只有一个允许的类型（如 countryName）时，这很有用，并且使用掩码可能导致根本没有有效类型。

   *Steve Henson*

 * 清理 'Finished' 处理，并添加函数 SSL_get_finished 和 SSL_get_peer_finished，以允许应用程序获取发送给对端或预期的来自对端的最新 Finished 消息。 （SSL_get_peer_finished 通常是实际从对端收到的 Finished 消息，否则协议将被中止。）

   由于 Finished 消息是整个握手的消息摘要（TLS 1.0 总共 192 位，SSL 3.0 更多），因此当 SSL/TLS 提供的认证不被需要或不足时，它们可用于外部认证过程。

   *Bodo Moeller*

 * 添加了对 Alpha Linux 的增强支持。现在 ./config 会检查主机是否支持 BWX 扩展以及 $PATH 中是否存在 Compaq C。仅利用 BWX 扩展就可以为某些算法（例如 DES 和 RC4）带来 20-30% 的性能提升。Compaq C 反过来为 MD5 和 SHA1 生成约 20% 的更快代码。

   *Andy Polyakov*

 * 添加对 MS "fast SGC" 的支持。这可以说是违反了 SSL3/TLS 协议。Netscape SGC 进行两次握手：第一次使用弱加密，在检查证书是 SGC 后进行第二次强加密握手。MS SGC 在收到服务器证书消息后停止第一次握手，并发送第二个客户端问候。由于服务器通常会在期望从客户端接收任何进一步消息之前执行所有耗时的操作（服务器密钥交换是最耗时的），因此两者之间的差异很小。

   为了让 OpenSSL 支持 MS SGC，我们必须允许在发送服务器完成消息后发送第二个客户端问候。此外，如果我们收到这个第二个客户端问候，我们必须重置 MAC。

   *Steve Henson*

 * 添加函数 'd2i_AutoPrivateKey()'，它将自动决定 DER 编码的私钥是 RSA 还是 DSA 传统格式。更改 d2i_PrivateKey_bio() 以使用它。这仅对“传统”格式的 DER 编码私钥是必需的。较新的代码应使用 PKCS#8 格式，该格式在 ASN1 结构中编码了密钥类型。向 pkcs8 应用程序添加了 DER 私钥支持。

   *Steve Henson*

 * SSL 3/TLS 1 服务器现在在选择了匿名密码套件时不再请求证书（符合 SSL 3/TLS 1 规范的要求）。例外：当设置了 SSL_VERIFY_FAIL_IF_NO_PEER_CERT 时，我们将其解释为违反规范的请求（最坏的情况是握手失败，而“正确”的行为无论如何都会导致握手失败）。

   *Bodo Moeller*

 * 在 SSL_CTX_add_session 中，考虑到可能存在多个具有相同会话 ID 的 SSL_SESSION 结构（例如，当两个线程同时从外部缓存中获取它们时）。
   内部缓存只能处理一个具有给定 ID 的 SSL_SESSION，因此如果发生冲突，我们现在会丢弃旧的以实现一致性。

   *Bodo Moeller*

 * 为 idea 和 blowfish 的 CBC 模式添加 OID。这将允许它们都用于 PKCS#5 v2.0 和 S/MIME。还添加了对使用密码 OID 的一些例程的检查：一些密码没有定义 OID，因此它们不能用于 S/MIME 和 PKCS#5 v2.0 等。

   *Steve Henson*

 * 简化信任设置结构和代码。现在我们只有两个 OID 序列，用于信任和拒绝设置。这些通常具有与扩展密钥用法扩展和任何应用程序特定用途相同的值。

   信任检查代码现在有一个默认行为：它将仅检查具有与传入 id 相同的 NID 的对象。可以提供函数来覆盖默认行为或特定 id 的行为。SSL 客户端、服务器和电子邮件已经有兼容的函数：它们检查 NID，并且当证书是自签名时也返回“受信任”。

   *Steve Henson*

 * 添加 PrivateKey 的 d2i、i2d bio/fp 函数：这些函数将传统格式转换为 EVP_PKEY 结构。

   *Steve Henson*

 * 添加密码回调函数 PEM_cb()，如果 usr_data 为 NULL，则提示输入密码，否则假定它是一个以 null 结尾的密码。允许在命令行环境或配置文件中向更多实用程序传递密码。

   *Steve Henson*

 * 添加一堆 DER 和 PEM 函数来处理 PKCS#8 格式的私钥。为 PKCS#8 PBE 算法添加了一些短名称，并允许在 pkcs8 和 pkcs12 实用程序的命令行上指定它们。更新文档。

   *Steve Henson*

 * 支持 ASN1 "NULL" 类型。之前可以通过使用 ASN1_TYPE 来处理，但没有函数可以尝试读取 NULL 并出错。为了兼容性，我们还有 ASN1_NULL_new() 和 ASN1_NULL_free() 函数，但它们是模拟的，不分配任何内容，因为它们不需要。

   *Steve Henson*

 * 提供对 MacOS 的初步支持。请参阅 INSTALL.MacOS 了解详情。

   *Andy Polyakov, Roy Woods <roy@centicsystems.ca>*

 * 重建 OpenSSL 代码可能还有其他代码使用的内存分配例程。目的是提供一个提供钩子的接口，以便任何人都可以构建一组独立的分配和释放例程供 OpenSSL 使用，例如内存池实现或其他东西，这以前很难实现，因为 Malloc()、Realloc() 和 Free() 被定义为宏，其值分别为 malloc、realloc 和 free（Win32 编译除外）。内存调试代码也提供了相同的功能。OpenSSL 已经提供了查找内存泄漏的功能，但这给了人们一个调试其他内存问题的机会。

   通过这些更改，出现了一组新函数和宏：

     CRYPTO_set_mem_debug_functions()         [F]
     CRYPTO_get_mem_debug_functions()         [F]
     CRYPTO_dbg_set_options()                 [F]
     CRYPTO_dbg_get_options()                 [F]
     CRYPTO_malloc_debug_init()               [M]

   内存调试函数默认情况下为 NULL，除非库是用 CRYPTO_MDEBUG 或其同类项编译的。如果有人想调试内存，则必须使用 CRYPTO_malloc_debug_init()（提供 OpenSSL 自带的标准调试函数）或 CRYPTO_set_mem_debug_functions()（告诉 OpenSSL 使用库用户提供的函数）。当使用标准调试函数时，可以使用 CRYPTO_dbg_set_options 来请求额外信息：
   CRYPTO_dbg_set_options(V_CYRPTO_MDEBUG_xxx) 对应于在编译库时设置 CRYPTO_MDEBUG_xxx 宏。

   此外，像 CRYPTO_set_mem_functions 这样的函数在任何时候都会产生预期的结果（新的一组函数用于分配和释放），无论平台和编译器选项如何。

   最后，一些以前仅通过宏使用的函数现在有了新的 API 和新的语义：

     CRYPTO_dbg_malloc()
     CRYPTO_dbg_realloc()
     CRYPTO_dbg_free()

   所有有价值的宏都保留了旧的语法。

   *Richard Levitte 和 Bodo Moeller*

 * 一些 S/MIME 修复。SMIMECapabilities 的 OID 不正确，SMIMECapabilities 的排序不是“强度顺序”，并且 SHA1 签名算法的 AlgorithmIdentifier 中缺少一个 NULL。

   *Steve Henson*

 * 具有非法零长度编码的某些 ASN1 类型（INTEGER、ENUMERATED 和 OBJECT IDENTIFIER）导致 ASN1 例程崩溃。

   *Frans Heymans <fheymans@isaserver.be>，由 Steve Henson 修改*

 * 合并我的 S/MIME 库到 OpenSSL。这在 PKCS#7 代码之上提供了一个简单的 S/MIME API，一个 MIME 解析器（具有处理 multipart/signed 的足够功能）和一个名为 'smime' 的实用程序来调用所有这些。这基于我最初为 Celo 编写的代码，Celo 已允许将其包含在 OpenSSL 中。

   *Steve Henson*

 * 添加 des_set_key 的变体 des_set_key_checked 和 des_set_key_unchecked（又名 des_key_sched）。全局变量 des_check_key 决定了 des_set_key 调用其中哪一个；这样 des_check_key 的行为与以前一样，但应用程序和库本身（对于 des_check_key == 1 存在错误）有更清晰的方式来选择它们需要的版本。

   *Bodo Moeller*

 * 新函数 PKCS12_newpass()，用于更改 PKCS12 结构的密码。

   *Steve Henson*

 * 修改 X509_TRUST 和 X509_PURPOSE，使其也使用静态和动态的混合。在这两种情况下，id 都可以用作表的索引。还修改了 X509_TRUST_add() 和 X509_PURPOSE_add() 函数，使其接受字段值列表，应用程序无需直接操作 X509_TRUST 结构。

   *Steve Henson*

 * 修改 ASN1_STRING_TABLE 相关的代码，使其也使用 bsearch 并且不需要初始化。

   *Steve Henson*

 * 修改 V3 扩展代码查找扩展的方式。这现在的工作方式类似于对象代码：我们有一些“标准”扩展在一个静态表中，该表使用 OBJ_bsearch() 进行搜索，并且应用程序可以根据需要添加动态扩展。文件 crypto/x509v3/ext_dat.h 现在包含信息：每当向核心代码添加新扩展时，都需要更新此文件并按 ext_nid 顺序保留。有一个简单的程序 'tabtest.c' 可以检查这一点。新扩展添加得不频繁，因此此文件可以手动维护。

   以这种方式进行有两个主要优点。扩展可以立即查找，不再需要使用 X509V3_add_standard_extensions()“添加”：此函数现在什么也不做。
   旁注：我收到*大量*电子邮件说扩展代码不起作用，因为人们忘记调用此函数。
   此外，除非添加了新扩展，否则不会进行动态分配：因此，如果我们不添加自定义扩展，则无需调用 X509V3_EXT_cleanup()。

   *Steve Henson*

 * 修改 enc 工具的加盐方式如下：默认启用加盐。添加一个魔术头，以便未加盐的文件会优雅地失败，而不是仅仅解密成垃圾。这是因为不加盐是一个很大的安全漏洞，所以应该阻止人们这样做。

   *Ben Laurie*

 * 'x509' 工具的修复和增强。它允许在命令行上传递消息摘要，但仅在签名证书时才使用此参数。修改后，所有相关操作都受摘要参数的影响，包括 -fingerprint 和 -x509toreq 选项。此外，如果使用 DSA 密钥，-x509toreq 会失败，因为它没有修复摘要。

   *Steve Henson*

 * 初步的证书链验证代码。目前测试非信任证书与验证目的（在设置 X509_STORE_CTX 结构时设置）的一致性，并检查路径长度。

   有一个 NO_CHAIN_VERIFY 编译选项来保持旧行为：这是因为它将拒绝带有无效扩展的链，而 OpenSSL 和 SSLeay 的所有先前版本都根本不进行任何检查。

   信任代码：检查根 CA 的相关信任设置。信任设置具有与验证目的一致的初始值：例如，如果验证目的是用于 SSL 客户端使用，它期望 CA 被信任用于 SSL 客户端使用。然而，默认值可以更改为允许自定义信任设置：一个例子是只信任来自特定“安全”CA 集合的证书。

   还添加了 X509_STORE_CTX_new() 和 X509_STORE_CTX_free() 函数，这些函数应该用于版本可移植性：特别是由于验证结构可能会发生更多变化。

   SSL 集成。将目的和信任添加到 SSL_CTX 和 SSL，并添加设置它们的函数。如果未设置，则假定 SSL 客户端将验证 SSL 服务器，反之亦然。

   verify 程序的两个新选项：-untrusted 允许传入一组非信任证书，-purpose 设置证书的预期用途。如果设置了用途，则使用新的链验证代码来检查扩展一致性。

   *Steve Henson*

 * 支持权威信息访问扩展。

   *Steve Henson*

 * 修改 RSA 和 DSA PEM 读取例程以透明处理 PKCS#8 格式的私钥。新的 *_PUBKEY_* 函数处理与证书 SubjectPublicKeyInfo 结构兼容格式的公钥。不幸的是，已经有称为 *_PublicKey_* 的函数使用了各种奇怪的格式，所以这些被保留以兼容：然而 DSA 变体从未在公开版本中发布过，所以它们已被删除。更改 dsa/rsa 工具以处理新格式：请注意，没有版本处理过公钥，所以我们应该没问题。

   此更改的主要动机是避免与私钥相同的困境：存在几种不兼容的私钥格式，其中一些是标准的，一些是 OpenSSL 特有的，需要各种邪恶的技巧来允许部分透明处理，即使这样也无法与 DER 格式一起使用。如果可以选择，应放弃 PKCS#8 以外的任何格式：但为了兼容性，其他格式必须保留。

   对于公钥和事后诸葛亮，使用了一种标准格式，该格式与 EVP_PKEY、RSA 或 DSA 结构一起工作：尽管尝试读取错误类型的密钥时会明确返回错误。

   向 'x509' 工具添加了一个 -pubkey 选项来输出公钥。
   还将 `EVP_PKEY_get_*()` 重命名为 `EVP_PKEY_rget_*()`（在 OpenSSL 0.9.5 版本中重命名为 `EVP_PKEY_get1_*()`），并添加 `EVP_PKEY_rset_*()` 函数（重命名为 `EVP_PKEY_set1_*()`），它们的作用与 `EVP_PKEY_assign_*()` 相同，但它们会增加所提供密钥的引用计数（它们不会“吞噬”提供的密钥）。

   *Steve Henson*

 * crypto/x509/by_file.c 的修复，读取证书和 CRL 的代码在文件不包含任何证书或 CRL 时会失败：添加了一个新函数来读取这两种类型并返回读取的数量：这意味着如果没有读取任何内容，则会出错。证书和 CRL 读取器的 DER 版本将始终失败，因为无法在 DER 格式中混合证书和 CRL 而不使其中一个例程崩溃。将其更改为仅读取证书：这是我们所能做的最好的。还修改了 `apps/verify.c` 中的代码以注意返回值：它以前尝试从 NULL 指针读取证书并忽略任何错误：这也是 cert 和 CRL 读取器似乎有效的原因之一。它不检查默认证书例程的返回值：这些在证书未安装时可能会失败。

   *Steve Henson*

 * 支持 GeneralName 中的 otherName 选项。

   *Steve Henson*

 * 首次更新验证代码。更改 verify 工具，使其在传递自签名证书时发出警告：与正常行为保持一致。X509_verify 已修改为现在可以验证自签名证书，前提是*完全相同的*证书出现在存储中：以前无法信任单个自签名证书。这意味着：
   openssl verify ss.pem
   现在会发出关于自签名证书的警告，但
   openssl verify -CAfile ss.pem ss.pem
   是 OK 的。

   *Steve Henson*

 * 对于服务器，将 verify_result 存储在 SSL_SESSION 数据结构中（并将其添加到外部会话表示中）。
   当客户端证书验证失败但应用程序提供的验证回调（由 SSL_CTX_set_cert_verify_callback 设置）允许接受会话时，这很有用（即，x509_store_ctx->error != X509_V_OK 但返回 1）：当会话被重用时，我们必须将 ssl->verify_result 设置为适当的错误代码，以避免安全漏洞。

   *Bodo Moeller，问题由 Lutz Jaenicke 指出*

 * 修复新 PKCS#7 代码中的一个错误：在 PKCS7_dataInit() 中，当签名的 PKCS7 结构不包含任何现有数据（因为它正在被创建）时，它没有考虑到这种情况。

   *Po-Cheng Chen <pocheng@nst.com.tw>，由 Steve Henson 轻微修改*

 * 向 enc.c 中的密钥派生例程添加盐。这构成了加密文件的前 8 个字节。还添加了一个 -S 选项以允许在命令行上输入盐。

   *Steve Henson*

 * 新函数 X509_cmp()。奇怪的是，没有一个函数可以比较两个证书。我们通过计算 SHA1 哈希并进行比较来做到这一点。信任代码将需要 X509_cmp()。

   *Steve Henson*

 * SSL_get1_session() 类似于 SSL_get_session()，但会增加返回的 SSL_SESSION 的引用计数。

   *Geoff Thorpe <geoff@eu.c2.net>*

 * 修复 'req'：它曾向请求属性添加 null。还更改 X509_LOOKUP 和 X509_INFO 代码以处理证书辅助信息。

   *Steve Henson*

 * 添加对 40 位和 64 位 RC2 和 RC4 算法的支持：记录 'enc' 命令。

   *Steve Henson*

 * 添加将额外信息添加到内存泄漏检测输出的可能性，以形成回溯，显示每次分配的来源：CRYPTO_push_info("constant string") 将字符串加上当前文件名和行号添加到每个线程的堆栈中，CRYPTO_pop_info() 执行显而易见的操作，CRYPTO_remove_all_info() 类似于调用 CYRPTO_pop_info() 直到堆栈为空。
   还更新了内存泄漏检测代码以实现多线程安全。

   *Richard Levitte*

 * 向 pkcs7 实用程序添加 -text 和 -noout 选项，并删除从未起作用的加密选项。更新文档。

   *Steve Henson*

 * 向一些实用程序添加选项，以允许在命令行（在 Unix 等操作系统上不推荐）或从环境变量中包含口令。更新 manpages 并修复一些错误。

   *Steve Henson*

 * 为一些 openssl 命令添加了几个 manpages。

   *Steve Henson*

 * 修复 ca 中的 -revoke 选项。它曾两次释放内存，导致泄漏并且找不到已撤销的证书。

   *Steve Henson*

 * 大量更改以支持证书辅助信息。这涉及到使用 X509_CERT_AUX 结构和 X509_AUX 函数。X509_AUX 函数（如 PEM_read_X509_AUX()）仍然可以像往常一样读取证书文件，但它也会读取任何额外的“辅助信息”。通过这种方式，可以保留相当程度的兼容性：可以使用新的 'x509' 选项将此信息添加到现有证书中。

   当前的辅助信息包括一个“别名”和一些信任设置。信任设置最终将用于增强的证书链验证例程：目前，证书只能在它是自签名的情况下被信任，然后它被信任用于所有目的。

   *Steve Henson*

 * 修复 Alpha 的汇编器（仅在 DEC OSF 上测试过，不在 Linux 或 `*BSD` 上测试）。问题是其中一个替换例程自 SSLeay 发布以来一直没有工作。目前，有问题的例程已被非优化汇编器替换。即使如此，这仍然为 1024 位 RSA 签名提供了约 95% 的性能提升。

   *Mark Cox*

 * 修复使用某些非标准 RC2 处理的 PKCS#7 解密问题的 hack。大多数客户端的有效密钥大小（以位为单位）等于密钥大小（以位为单位）：因此，40 位 RC2 密钥使用 40 位（5 字节）密钥。但少数客户端不这样做，而是使用解密密钥的大小来确定 RC2 密钥长度，并使用 AlgorithmIdentifier 来确定有效密钥长度。在这种情况下，有效密钥长度仍然可以是 40 位，但密钥长度可以是例如 168 位。通过手动将 RC2 密钥强制到 EVP_PKEY 结构中来解决此问题，因为 EVP 代码目前无法处理不寻常的 RC2 密钥大小：它总是假设密钥长度和有效密钥长度相等。

   *Steve Henson*

 * 添加了一堆函数，这些函数应该可以简化 X509_NAME 结构的创建。现在您应该可以执行以下操作：
   X509_NAME_add_entry_by_txt(nm, "CN", MBSTRING_ASC, "Steve", -1, -1, 0);
   并让它自动计算正确的字段类型并填充结构。更具冒险精神的人可以尝试：
   X509_NAME_add_entry_by_txt(nm, "field", MBSTRING_UTF8, str, -1, -1, 0);
   它将（希望）计算出正确的多字节编码。

   *Steve Henson*

 * 更改 'req' 工具以使用新的字段处理和多字节复制例程。之前 DN 字段的创建是在 req、ca 和 x509 中以临时方式处理的，这相当混乱且不支持 BMPStrings 或 UTF8Strings。由于某些软件尚未实现 BMPStrings 或 UTF8Strings，因此可以使用配置文件中的 dirstring_type 选项启用它们。有关更多信息，请参阅默认 openssl.cnf 中的新注释。

   *Steve Henson*

 * 使 crypto/rand/md_rand.c 更健壮：
   - 确保 fork() 后生成唯一的随机数。
   - 确保并发线程以可序列化的方式访问全局计数器和 md，以便我们永远不会在它们中丢失熵或在多个线程中使用完全相同的状态。
     对大状态的访问并不总是可序列化的，因为额外的锁定可能会成为性能瓶颈，而且 md 应该足够大。

   *Bodo Moeller*

 * 新文件 `apps/app_rand.c`，包含处理随机种子文件的常用功能。

   在一些以前没有使用随机种子文件的应用程序中使用它：
           ca,
           dsaparam -genkey（它也忽略了其 '-rand' 选项），
           s_client,
           s_server,
           x509（签名时）。
   除了具有 /dev/urandom 的系统外，至少对于密钥创建、DSA 签名和 DH 交换，拥有一个随机种子文件至关重要；对于 RSA 签名，我们可以不使用它。

   gendh 和 gendsa（与 genrsa 不同）过去只读取 '-rand' 选项中列出的每个文件的第一个字节。genrsa 中以前找到的函数现在位于 app_rand.c 中，并被所有支持 '-rand' 的程序使用。

   *Bodo Moeller*

 * 在 RAND_write_file 中，使用模式 0600 创建文件；
   不要在可能为时已晚时才 chmod。

   *Bodo Moeller*

 * 当 X509_LOOKUP_load_file 或 X509_LOOKUP_add_dir 失败时，从 X509_STORE_load_locations 报告错误。

   *Bill Perry*

 * 新函数 ASN1_mbstring_copy()，它将 ASCII、Unicode、Universal（每字符 4 字节）或 UTF8 格式的字符串复制到 ASN1_STRING 类型中。传递允许类型的掩码，它会选择“最小”类型或在不合适时返回错误。

   *Steve Henson*

 * 为 asn1.h 中的各种宏添加函数等效项。旧宏保留了 `M_` 前缀。库内部代码可以使用 `M_` 宏。外部代码（包括 openssl 实用程序）*不应*这样做，以实现“共享库友好”。

   *Steve Henson*

 * 添加各种函数来检查证书的扩展，以确定它是否可用于 SSL 客户端、服务器或 S/MIME 以及这些类型的 CA。这目前*非常实验性*，但最终将用于证书链验证。还向 x509 实用程序添加了一个 -purpose 标志来打印所有用途。

   *Steve Henson*

 * 向 X509 证书结构和相关函数添加 CRYPTO_EX_DATA。

   *Steve Henson*

 * 新的 `X509V3_{X509,CRL,REVOKED}_get_d2i()` 函数。这些函数将搜索、获取、解码扩展并获取其关键标志。这允许所有必要的扩展代码在单个函数调用中处理。

   *Steve Henson*

 * RC4 调优，在大多数 RISC 平台上性能提升 30-40%。有关更多详细信息，请参阅 crypto/rc4/rc4_enc.c。

   *Andy Polyakov*

 * asn1parse 的新选项 -noout。这会导致不产生任何输出；当与 -strparse 和 -out 结合使用以从文件（可能不是 ASN.1 格式）中提取数据时，它主要用于此目的。

   *Steve Henson*

 * pkcs12 程序错误修复。在生成本地密钥 ID 时，它曾对无效的证书指针进行哈希处理。

   *Richard Levitte <levitte@stacken.kth.se>*

 * s_server 中的新选项 -dhparam。这允许显式指定 DH 参数文件。如果未指定，它将尝试第一个服务器证书文件。以前的行为是硬编码文件名 "server.pem"。

   *Steve Henson*

 * 向 rsa 和 dsa 命令添加 -pubin 和 -pubout 选项。这些选项允许输入或输出公钥。例如：
   openssl rsa -in key.pem -pubout -out pubkey.pem
   还添加了必要的 DSA 公钥函数来处理此问题。

   *Steve Henson*

 * 修复 PKCS7_dataVerify() 在消息中不包含任何证书时不会崩溃的问题。这是通过允许 X509_find_by_issuer_and_serial() 容忍传递给它的 NULL 来处理的。

   *Steve Henson，由 Sampo Kellomaki <sampo@mail.neuronio.pt> 报告*

 * d2i_ASN1_bytes() 中的错误修复：其他 ASN1 函数在字符串末尾添加了一个额外的 null，而这个函数没有。这会导致问题，如果稍后修改使用 d2i_ASN1_bytes() 读取的字符串。

   *Steve Henson，由 Arne Ansper <arne@ats.cyber.ee> 报告*

 * base64 解码错误修复。当 base64 bio 只读取一行数据并且该行包含 EOF 时，它将返回错误。这是由于输入长度为 46 字节。原因是 base64 BIO 查找 base64 编码数据的开始方式。它们通过尝试对每一行进行试解码直到找到一个有效的为止。当找到一个有效的时，会设置一个标志，然后它会重新开始，知道它可以将所有数据直接传递给解码器。不幸的是，它不会重置它使用的上下文。这意味着如果达到 EOF，就会尝试将两个 EOF 传递给上下文，这会导致结果错误。这也会导致其他问题。像往常一样，这些问题需要*很长时间*才能找到，而修复却很简单：移动一行。

   *Steve Henson，由 ian@uns.ns.ac.yu (Ivan Nejgebauer) 报告*

 * 丑陋的解决方法，使 s_client 和 s_server 在 Windows 下工作。旧代码无法工作，因为它需要对套接字和 tty（用于按键和查看是否可以写入数据）进行 select()。Win32 只支持对套接字进行 select()，所以我们使用 1 秒的超时对套接字进行 select()，然后查看是否有任何字符等待读取，如果没有则重试，我们也假设总是可以向 tty 写入数据。这并不理想，因为代码会阻塞直到我们收到完整的一行数据，并且它以 1 秒的间隔轮询键盘：然而，这比根本无法工作要好得多 :-) 一个专门的 Windows 应用程序可能会使用事件循环来处理这个问题。

   *Steve Henson*

 * 增强 RSA_METHOD 结构。现在有两个额外的函数，rsa_sign 和 rsa_verify。当设置了 RSA_FLAGS_SIGN_VER 选项时，这些函数将在使用 RSA_sign() 和 RSA_verify() 时被调用。如果 rsa_pub_dec() 和 rsa_priv_enc() 的等效项不可用，这将很有用。为了正确工作，不应使用 RSA_public_decrypt() 和 RSA_private_encrypt()：而应使用 RSA_sign() 和 RSA_verify()。这需要支持 SSL 签名额外的签名类型 NID_md5_sha1，并修改 SSL 库以使用它，而不是调用 RSA_public_decrypt() 和 RSA_private_encrypt()。

   *Steve Henson*

 * 向 crl 程序添加新的 -verify -CAfile 和 -CApath 选项，这些选项将查找 CRL 颁发者的证书并以与 verify 程序类似的方式验证签名。整理 crl 程序，使其不再直接访问结构。使 ASN1 CRL 解析不那么严格。它现在将允许 CRL 扩展，即使它不是 V2 CRL：这将允许它容忍一些损坏的 CRL。

   *Steve Henson*

 * 初始化 openssl 子程序启动时的所有非自动变量（这很有必要，因为它们可能从 "OpenSSL>" 提示符多次启动）。

   *Lennart Bang, Bodo Moeller*

 * 初步的编译选项 RSA_NULL，它禁用 RSA 加密而不移除所有其他 RSA 功能（这是 NO_RSA 所做的）。这样（例如）美国的开发者可以禁用 RSA 专利涵盖的操作，同时允许存储和解析 RSA 密钥以及生成 RSA 密钥。

   *Steve Henson*

 * BIO 对的非复制接口。
   （仍未完全测试）

   *Bodo Moeller*

 * 新函数 ASN1_tag2str()，用于将 ASN1 标签转换为描述性的 ASCII 字符串。以前这在不同地方独立处理。

   *Steve Henson*

 * 新函数 UTF8_getc() 和 UTF8_putc()，用于逐个字符地解析和生成 UTF8 字符串。

   *Steve Henson*

 * 使用 client_version 从 client hello 中选择协议（s23_srvr.c），并用于 RSA 客户端密钥交换验证（s3_srvr.c），如 SSL 3.0/TLS 1.0 规范所要求。

   *Bodo Moeller*

 * 添加各种实用函数来处理 SPKAC，这些函数以前是通过直接访问结构内部来处理的。添加了新函数 NETSCAPE_SPKI_print() 来打印 SPKAC，以及一个新实用程序 'spkac' 来打印、验证和生成 SPKAC。基于 Massimiliano Pala <madwolf@comune.modena.it> 的原始想法，但经过广泛修改。

   *Steve Henson*

 * RIPEMD160 在所有平台上都已可用，并重新加入 'make test'。

   *Andy Polyakov*

 * 允许在命令行中覆盖配置文件扩展部分。基于 Massimiliano Pala <madwolf@comune.modena.it> 的原始想法。新选项称为 -extensions，可应用于 ca、req 和 x509。还提供 -reqexts 来覆盖 req 中的请求扩展，以及 -crlexts 来覆盖 ca 中的 crl 扩展。

   *Steve Henson*

 * 向 ca 中的 SPKAC 处理添加新功能。现在您可以通过在字段前加上 "XXXX." 来多次包含同一个字段，例如：
   1.OU="Unit name 1"
   2.OU="Unit name 2"
   这与 req 配置文件中使用的语法相同。

   *Steve Henson*

 * 允许将证书扩展添加到证书请求中。这些在配置文件 req 部分的 'req_extensions' 选项中指定。它们可以用 req 的 -text 选项打印出来，但目前否则会被忽略。

   *Steve Henson*

 * 修复 enc_read()（在 crypto/evp/bio_enc.c 中）中的一个严重错误：如果读取的第一个数据仅包含最后一个块，则不会解密，因为 EVP_CipherUpdate() 会正确报告已解密零字节。一个错误的 'break' 也意味着解密的最后一个块可能直到下次读取才被复制。

   *Steve Henson*

 * DH_METHOD 的初步支持。同样基于 RSA_METHOD。还向 DH 结构添加了一些额外参数：如果例如我们想要 'q' 的值或实现 X9.42 DH，这些参数将很有用。

   *Steve Henson*

 * DSA_METHOD 的初步支持。这基于 RSA_METHOD，并提供了允许替换默认 DSA 函数或“每个密钥”函数的钩子。这使得在不进行重大库修改的情况下处理硬件加速和硬件密钥存储成为可能。还添加了低级 modexp 钩子以及 CRYPTO_EX 结构和相关函数。

   *Steve Henson*

 * 向内存 BIO 添加了一个新标志 BIO_FLAG_MEM_RDONLY。这会将 BIO 标记为“只读”：不能写入，并且它指向的缓冲区不会被释放。从只读 BIO 读取比普通内存 BIO 更高效。添加此标志是因为有几次需要从 BIO 读取内存区域。以前的方法是创建一个内存 BIO 并将数据写入其中，这会导致数据复制两次和 O(n^2) 的读取算法。有一个新函数 BIO_new_mem_buf()，它从内存区域创建一个只读内存 BIO。还修改了 PKCS#7 例程以使用只读内存 BIO。

   *Steve Henson*

 * 错误修复：当在状态 SSL23_ST_SR_CLNT_HELLO_B 调用时，ssl23_get_client_hello 工作不正常，即当可以读取 SSLv2 兼容的客户端问候的前 7 个字节用于 SSLv3 或 TLSv1 时，但在尝试读取其余字节时发生了重试条件。

   *Bodo Moeller*

 * PKCS7_ENC_CONTENT_new() 函数默认将内容类型设置为 NID_pkcs7_encrypted：这是错误的，因为这几乎总是应该是 NID_pkcs7_data。还修改了 PKCS7_set_type() 以处理加密数据类型：这是放置它的更合理的位置，并且它允许清理 PKCS#12 代码中重复此功能的代码。

   *Steve Henson*

 * 更改 obj_dat.pl 脚本，使其在命令行上接收输入和输出文件。这应该可以避免 Win32 下的 shell 转义重定向问题。

   *Steve Henson*

 * 对证书扩展请求的初步支持，这些请求包含在 Xenroll 证书请求等内容中。包含允许获取和添加扩展的函数。

   *Steve Henson*

 * s_client 和 s_server 的 -crlf 选项，用于发送换行符作为 CRLF（许多协议要求）。

   *Bodo Moeller*

### 0.9.3a 和 0.9.4 之间的更改 [1999 年 8 月 9 日]

* 当 OpenSSL 使用 RSAref 构建时，安装 libRSAglue.a。

  *Ralf S. Engelschall*

* 为了保持一致性，添加了更多 `#ifndef NO_FP_API / #endif` 对。

  *Andrija Antonijevic <TheAntony2@bigfoot.com>*

* 修复 'ca' 程序中的 `-startdate` 和 `-enddate`（后者缺失）参数。

  *Steve Henson*

* 新函数 DSA_dup_DH，它将 DSA 参数/密钥复制为 DH 参数/密钥（在此转换过程中会丢失 q，但生成的 DH 参数包含其长度）。

  对于 1024 位 p，DSA_generate_parameters 后跟 DSA_dup_DH 比 DH_generate_parameters（它创建 `p = 2*q + 1` 的参数）快得多，并且较小的 q 也使得 DH 计算效率更高（160 位指数运算而不是 1024 位指数运算）；因此，这为 SSL/TLS 服务器提供了支持 DHE 密码套件的便捷方法（参见 ssl/ssltest.c）。使用
          SSL_CTX_set_options(s_ctx, SSL_OP_SINGLE_DH_USE);
  或
          SSL_set_options(s_ctx, SSL_OP_SINGLE_DH_USE);
  在使用此类 DH 参数时至关重要，否则可能会出现小子群攻击！

  *Bodo Moeller*

* 避免 i2d_DHparams 中的内存泄漏。

  *Bodo Moeller*

* 允许在 enc 程序中使用 `-k` 选项多次：这允许同一条加密消息被多个接收者读取。

  *Steve Henson*

* 新函数 OBJ_obj2txt(buf, buf_len, a, no_name)，它将 ASN1_OBJECT 转换为文本字符串。如果设置了“no_name”参数，它将始终使用 OID 的数值形式，即使它有短名称或长名称。

  *Steve Henson*

* 添加了一个额外的 RSA 标志：RSA_FLAG_EXT_PKEY。以前，仅当存在 p、q、dmp1、dmq1、iqmp 组件时，才会调用 rsa_mod_exp 方法，否则会调用 bn_mod_exp。在硬件密钥等情况下，不需要存在私钥组件，并且它可能在 RSA 结构中存储额外的数据，而 bn_mod_exp 无法访问这些数据。通过设置 RSA_FLAG_EXT_PKEY，rsa_mod_exp 将始终为私钥操作调用。

  *Steve Henson*

* 添加了对 SPARC Linux 的支持。

  *Andy Polyakov*

* pem_password_cb 函数类型不兼容地从
          typedef int pem_password_cb(char *buf, int size, int rwflag);
  更改为
          ....(char *buf, int size, int rwflag, void *userdata);
  以便应用程序可以将数据传递给其回调：
  `PEM[_ASN1]_{read,write}...` 函数和宏现在接受一个额外的 void * 参数，该参数在调用密码回调时会被传递。

  *Damien Miller <dmilder@ilogic.com.au>; Bodo Moeller 的微小更改*

  新函数 SSL_CTX_set_default_passwd_cb_userdata。

  兼容性说明：由于许多 C 实现以相反的顺序将函数参数推送到堆栈上，因此新库版本很可能与使用旧 pem_password_cb 定义编译的程序互操作（PEM_whatever 获取堆栈上碰巧是最后一个参数的数据，回调函数会忽略这些垃圾）；但不能保证这会起作用。

* `-DPLATFORM="\"$(PLATFORM)\""` 定义和类似的 `-DCFLAGS=...`（都在 crypto/Makefile.ssl 中供 crypto/cversion.c 使用）不仅在 Windows 上，还在某些 Unix 平台上引起了问题。为了避免有问题的命令行，这些定义现在位于一个自动生成的 crypto/buildinf.h 文件中（由 crypto/Makefile.ssl 为标准的“make”构建创建，由 util/mk1mf.pl 为“mk1mf”构建创建）。

  *Bodo Moeller*

* 重写了 MIPS III/IV 汇编模块。

  *Andy Polyakov*

* 更多 DES 库清理：删除对 srand/rand 的引用并删除一个未使用的文件。

  *Ulf Möller*

* 添加了对 Win32 下的免费 Netwide 汇编器 (NASM) 的支持，因为很少有人拥有 MASM (ml) 并且可能难以获取。这目前是实验性的，但似乎运行正常并通过了所有测试。有关信息请查看 INSTALL.W32。

  *Steve Henson*

* 修复 s3_clnt.c 中的内存泄漏：所有非匿名的 SSL3/TLS1 连接（没有临时密钥）都保留了服务器密钥的额外副本，并且在发生错误时，带有临时密钥的连接没有释放所有内容。

  *Bodo Moeller*

* 新函数 RSA_check_key 和新的 openssl rsa 选项 `-check` 用于验证 RSA 密钥的一致性。

  *Ulf Moeller, Bodo Moeller*

* 对 Win32 编译进行了各种更改：
  1. 添加强制类型转换以避免 p5_crpt2.c 中的“数据丢失”警告
  2. 在 b_dump.c 中将 unsigned int 更改为 int 以避免“有符号/无符号比较”警告。
  3. 将 `sk_<TYPE>_sort` 添加到 DEF 文件生成器并执行 make update。

  *Steve Henson*

* 为 PKCS#5 v2 密钥生成函数添加了一个调试选项：当您 `#define DEBUG_PKCS5V2` 时，密码、盐、迭代计数和派生密钥将被打印到 stderr。

  *Steve Henson*

* 在 ASN1_STRING_dup() 中复制标志。

  *Roman E. Pavlov <pre@mo.msk.ru>*

* x509 应用程序在处理包含 DSA 密钥的签名请求时出现问题，当时签名密钥本身也是 DSA 且参数不匹配。
  它本应在参数匹配时省略参数：然后验证软件应自动使用 CA 的参数，如果这些参数在最终用户证书中缺失。
  现在不推荐省略参数。测试也弄反了！这可能是由于 EVP_cmp_parameters() 的异常行为，它在参数匹配时返回 1。
  这意味着在参数不匹配时省略了参数，导致证书无效。使用 'ca' 签名的证书没有此错误。

  *Steve Henson，由 Doug Erickson <Doug.Erickson@Part.NET> 报告*

* 内存泄漏检查（`-DCRYPTO_MDEBUG`）存在一些问题。
  接口如下：
  应用程序可以使用
          CRYPTO_mem_ctrl(CRYPTO_MEM_CHECK_ON) 或 MemCheck_start()，
          CRYPTO_mem_ctrl(CRYPTO_MEM_CHECK_OFF) 或 MemCheck_stop()；
  “off”现在是默认设置。
  库内部使用
          CRYPTO_mem_ctrl(CRYPTO_MEM_CHECK_DISABLE) 或 MemCheck_off()，
          CRYPTO_mem_ctrl(CRYPTO_MEM_CHECK_ENABLE) 或 MemCheck_on()
  来临时禁用内存检查。
  现在避免了一些以前可能出现（甚至是默认）的不一致状态。
  `-DCRYPTO_MDEBUG_TIME` 是新的，它还为每个分配的内存块存储当前时间；这有时比仅有一个计数器更有用。
  `-DCRYPTO_MDEBUG_THREAD` 也是新的，它添加了线程 ID。
  `-DCRYPTO_MDEBUG_ALL` 启用以上所有功能，以及任何未来的扩展。

  *Bodo Moeller*

* 为 SSL 结构引入“模式”（在 SSL_CTX 中有默认值），它在很大程度上与“选项”并行，但用于更改 API 行为，而“选项”则用于协议行为。
  初始“模式”标志是：

  SSL_MODE_ENABLE_PARTIAL_WRITE   允许 SSL_write 在写入单个记录时报告成功。
  SSL_MODE_ACCEPT_MOVING_WRITE_BUFFER  不要强制 SSL_write 重试使用相同的缓冲区位置。（但所有内容都必须复制！）

  *Bodo Moeller*

* 错误修复：SSL_set_options 忽略了其参数，只有 SSL_CTX_set_options 有效。

* 修复了 no-hmac 等问题。

  *Ulf Möller，由 Brian Wellington <bwelling@tislabs.com> 指出*

* 新函数 RSA_get_default_method()、RSA_set_method() 和 RSA_get_method()。这些允许替换 RSA_METHOD 而无需修改 RSA 结构的内部。

  *Steve Henson*

* 修复 DSA_do_sign 和 DSA_is_prime 中的内存泄漏。
  还真正启用了 openssl.c 和某些测试程序中的内存泄漏检查。

  *Chad C. Mulligan, Bodo Moeller*

* 修复 d2i_ASN1_INTEGER() 和 i2d_ASN1_INTEGER() 中的一个错误，该错误可能导致负整数的长度出错。现在已简化为仅在首次确定长度时存储长度并在之后使用，而不是尝试跟踪数据复制的位置并更新它以指向末尾。
  *Steve Henson，由 Brien Wheeler <bwheeler@authentica-security.com> 报告*

* 添加新函数 PKCS7_signatureVerify。它允许验证 PKCS#7 签名，但将签名证书本身传递给函数。这与 PKCS7_dataVerify 不同，后者假定证书存在于 PKCS#7 结构中。并非总是如此：证书可以从 PKCS#7 结构中省略，并通过“带外”方式（如证书数据库）分发。

  *Steve Henson*

* 使用 DECLARE_PEM 版本完成 `PEM_*` 宏，以替换 pem.h 中的函数原型，还更改 util/mkdef.pl 以添加必要的函数名。

  *Steve Henson*

* mk1mf.pl（用于 Windows 构建）未能正确读取顶层 Makefile 中 Configure 设置的选项，并且 Configure 甚至无法正确写入一个以上的选项。
  已修复，现在“no-idea no-rc5 -DCRYPTO_MDEBUG”等按预期工作。

  *Bodo Moeller*

* 新函数 CONF_load_bio() 和 CONF_load_fp() 允许从 BIO 或 FILE 指针加载配置文件。例如，BIO 版本允许内存 BIO 包含配置信息。

  *Steve Henson*

* 新函数“CRYPTO_num_locks”，它返回 CRYPTO_NUM_LOCKS。
  希望实现跨版本共享库兼容性的任何人必须使用此函数，而不是编译时宏。
  （练习 0.9.4：此类程序所需的最低库版本是多少？）
  注意：所有这些仅适用于多线程程序，其他程序不需要锁。

  *Bodo Moeller*

* 在 s3_clnt.c 状态机中添加了缺失的 case -- 新的 SSL 测试之一通过 BIO 对触发了默认 case，即
  SSLerr(...,SSL_R_UNKNOWN_STATE)。

  *Bodo Moeller*

* 新的“BIO 对”概念（crypto/bio/bss_bio.c），以便应用程序可以使用 SSL 库，即使没有一个特定的 BIO 是合适的。

  *Bodo Moeller*

* 修复 i2d_DSAPublicKey() 中的一个错误，该错误导致它返回错误的编码长度值。

  *Jeon KyoungHo <khjeon@sds.samsung.co.kr>*

* 添加 X509V3 函数的初始文档。

  *Steve Henson*

* 添加一对新函数 PEM_write_PKCS8PrivateKey() 和 PEM_write_bio_PKCS8PrivateKey()，它们等同于
  PEM_write_PrivateKey() 和 PEM_write_bio_PrivateKey()，但使用更安全的 PKCS#8 私钥格式和高迭代计数。

  *Steve Henson*

* 修复 Perl 解释器的确定：PATH 中的 perl 或 perl5 *目录*也被接受为解释器。

  *Ralf S. Engelschall*

* 修复 demos/sign/sign.c：严格来说它没有问题，但它非常旧，并且直接调用 PEM_ASN1_read()，使用 MD5 作为哈希而不是其他，还有一些不寻常的格式。

  *Steve Henson*

* 修复 demos/selfsign.c：它使用了过时且已删除的函数，已更改为使用新的扩展代码。

  *Steve Henson*

* 在 crypto/pem/pem_all.c 中使用宏实现了 PEM_read/PEM_write 函数。这应该更容易更改它们的格式、添加额外的参数等。修复了几个没有将 cipher 作为常量的 PEM 原型。

  *Steve Henson*

* 在配置表中添加了一个新条目，可以为 unistd.h 指定备用名称（适用于非 POSIX 系统）；根据 Mark Crispin <MRC@Panda.COM> 的说法，我们需要它用于 NeXTstep。

  *Bodo Moeller*

* DES CBC 没有更新 IV。奇怪。

  *Ben Laurie*
lse
  des_cbc_encrypt 不更新 IV，但 des_ncbc_encrypt 更新。
  更改前者行为可能会破坏现有程序——在需要更新 IV 的地方，可以使用 des_ncbc_encrypt。
ndif

* 当 bntest 从“make test”运行时，它会驱动 bc 来检查其计算，并进行内部检查。如果内部检查失败，它需要导致 bc 返回非零结果，否则 make test 会继续进行而不会注意到失败。已修复。

  *Ben Laurie*

* DES 库清理。

  *Ulf Möller*

* 添加对 PKCS#5 v2.0 PBE 算法的支持。这将允许 PKCS#8 与任何密码一起使用，而 PKCS#5 v1.5 最多只能处理 64 位密码。注意：尽管密钥派生函数已根据一些已发布的测试向量进行了验证，但尚未经过广泛测试。向 pkcs8 应用程序添加了一个 `-v2`“cipher”选项以允许使用 v2.0。

  *Steve Henson*

* 使用新的 Perl 脚本“util/mkdir-p.pl”代替不完全可移植的“mkdir -p”。

  *Bodo Moeller*

* 重写了基于密码的加密 (PBE) 处理方式。以前它假定 ASN1 AlgorithmIdentifier 参数是 PBEParameter 结构。这对于 PKCS#5 v1.5 和 PKCS#12 PBE 算法是正确的，但对于 PKCS#5 v2.0 则不适用，因为它可以是其他东西。现在，AlgorithmIdentifier 的“parameter”字段被传递给底层密钥生成函数，因此它必须自己进行 ASN1 解析。这也改变了 EVP_PBE_CipherInit() 函数，该函数现在有一个“parameter”参数而不是字面上的 salt 和迭代计数，并且删除了函数 EVP_PBE_ALGOR_CipherInit()。

  *Steve Henson*

* 支持 PKCS#5 v1.5 兼容的基于密码的加密算法和 PKCS#8 功能。新的 'pkcs8' 应用程序链接到 openssl。
  需要更改 PEM_STRING_EVP_PKEY 值，该值只是“PRIVATE KEY”，因为它与 PKCS#8 未加密字符串冲突。由于此值仅用作“魔术字符串”而不是直接使用，因此其值无关紧要。

  *Steve Henson*

* 为 BN 引入一些常量正确性，以示改进。可惜 C 不支持可变。

  *Ben Laurie*

* “linux-sparc64”配置（ultrapenguin）。

  *Ray Miller <ray.miller@oucs.ox.ac.uk>*
  “linux-sparc”配置。

  *Christian Forster <fo@hawo.stw.uni-erlangen.de>*

* config 现在为缺失的密码生成 no-xxx 选项。

  *Ulf Möller*

* 支持 EBCDIC 字符集（正在进行中）。
  ebcdic.c 文件尚未包含，因为它具有不同的许可证。

  *Martin Kraemer <Martin.Kraemer@MchP.Siemens.De>*

* 支持 BS2000/OSD-POSIX。

  *Martin Kraemer <Martin.Kraemer@MchP.Siemens.De>*

* 使密钥生成的密码回调使用 `void *` 而不是 `char *`。

  *Ben Laurie*

* 使 S/MIME 示例能够编译（尚未测试）。

  *Ben Laurie*

* 附加类型安全堆栈。

  *Ben Laurie*

* 新的配置变体“bsdi-elf-gcc”（BSD/OS 4.x）。

  *Bodo Moeller*

### 0.9.3 和 0.9.3a 之间的更改 [1999 年 5 月 29 日]

* 新的配置变体“sco5-gcc”。

* 更新了一些演示。

  *Sean O Riordain, Wade Scholine*

* 在 pkcs12 应用程序退出时添加缺失的 BIO_free。

  *Wu Zhigang*

* 修复 conf.c 中的内存泄漏。

  *Steve Henson*

* 为 Win32 更新了 MD5 的汇编版本。

  *Steve Henson*

* 将 `apps/der_chop` 中的 #! 路径设置为我们找到 Perl 的位置，而不是使用固定路径。

  *Bodo Moeller*

* irix64-mips4-cc 的 SHA 库更改。

  *Andy Polyakov*

* 改进 VMS 支持。

  *Richard Levitte*

### 0.9.2b 和 0.9.3 之间的更改 [1999 年 5 月 24 日]

* Bignum 库错误修复。IRIX 6 现在可以通过“make test”！
  这还避免了 SC4.2 和未修补的 SC5 的问题。

  *Andy Polyakov <appro@fy.chalmers.se>*

* 新函数 sk_num、sk_value 和 sk_set 以替换之前的宏。
  这些是必需的，因为类型安全堆栈否则会破坏现有代码。如果旧代码使用了以前是 STACK 现在是 STACK_OF 的结构成员（例如 PKCS7_SIGNED 结构中的 cert），并使用 sk_num 或 sk_value，则会产生错误，因为 STACK_OF 中不存在 num、data 成员。现在它只产生一个警告。sk_set 替换了旧的为 sk_value 赋值的方法
  （例如 sk_value(x, i) = y），库在少数情况下使用了该方法。任何执行此操作的代码将不再有效（并且应改用 sk_set），但这也可以被视为“可疑”行为。

  *Steve Henson*

* 修复了大多数其他 PKCS#7 错误。“实验性”代码现在可以正确处理加密的 S/MIME 数据。

  *Steve Henson*

* 将各种 DES 函数参数的类型从 des_cblock（在函数参数声明中表示 char 指针）更改为 des_cblock *（表示指向包含 8 个 char 元素的数组的指针），这允许编译器进行更多类型检查；它在 SSLeay 中就是这样，但有很多丑陋的强制类型转换。
  引入了新的类型 const_des_cblock。

  *Bodo Moeller*

* 重新组织 PKCS#7 库并消除一些明显的问题：查找与接收者证书匹配的 RecipientInfo 结构，并根据传入的密码正确初始化 ASN1 结构。

  *Steve Henson*

* 迟到的 BN 测试实际检查结果。

  *Ben Laurie*

* 修复了负 ASN1 INTEGER 的编码和解码以及与 BNs 的转换：它完全是错误的。新的编译选项
  NEG_PUBKEY_BUG 以允许一些损坏的证书将公钥元素编码为负整数。

  *Steve Henson*

* 重新组织并加速 MD5。

  *Andy Polyakov <appro@fy.chalmers.se>*

* VMS 支持。

  *Richard Levitte <richard@levitte.org>*

* 为 asn1parse 添加了新的 `-out` 选项，允许将解析的结构输出到文件。当与 `-strparse` 选项结合使用以检查 OCTET STRINGS 等的输出时，这非常有用。

  *Steve Henson*

* 通过不再要求在 `SSL_{accept,connect}` 之前调用 `SSL_set_{accept,connect}_state` 来使 SSL 库更防错（许多应用程序省略了 `SSL_set_..._state`，因为通常一切似乎都按预期工作——现在它确实按预期工作了）。

  *Bodo Moeller*

* 将 openssl.cnf 从 lib/ 移出。

  *Ulf Möller*

* 修复各种问题，使 OpenSSL 能够通过 egcc -pipe -O2 -Wall -Wshadow -Wpointer-arith -Wcast-align -Wmissing-prototypes -Wmissing-declarations -Wnested-externs -Winline` 使用 EGCS 1.1.2+

  *Ralf S. Engelschall*

* 对 EVP 和 PKCS#7 代码进行了各种修复。它现在可能能够正确处理 PKCS#7 包络数据。

  *Sebastian Akerman <sak@parallelconsulting.com>，由 Steve 修改*

* 在 SSL_new 中创建 SSL_CTX 的 CERT 的副本，而不是复制指针。
  证书处理因此在各种方面发生了变化（因此，以前称为 ctx->default_cert 的现在称为 ctx->cert，因为当 s->cert 未提供所需内容时，我们不再诉诸 `s->ctx->[default_]cert`）。
  ssl_cert_instantiate 因此更改而过时。
  一旦我们正确处理了新代码（可能已经正确了？），我们就解决了早期代码中的一些错误，这些错误将 s->cert 用作似乎不能与其他 SSL 结构共享的结构。

  请注意，以某些不规范的方式使用 SSL API 现在将导致与早期库版本不同的行为：
  在执行 s = SSL_new(ctx) 后更改 `SSL_CTX *ctx` 的设置不会像以前那样影响 s。

  为了更彻底地清理，在 SSL_SESSION 内部，我们不再使用 CERT，而是使用新的结构 SESS_CERT，它保存每个会话的数据（如果可用）；目前，这是对端的证书链，对于客户端，是服务器的证书和临时密钥。CERT 仅包含在 SSL_CTX 中具有有意义默认值的那些值。

  *Bodo Moeller*

* 新函数 X509V3_EXT_i2d() 用于从内部表示创建 X509_EXTENSION 结构。各种 PKCS#7 修复：删除了一些不当的强制类型转换，并根据签名密钥类型正确设置 enc_dig_alg 字段。

  *Steve Henson*

* 允许 PKCS#12 密码从命令行或环境变量设置。让 'ca' 从环境变量“OPENSSL_CONF”或“SSLEAY_CONF”获取其配置文件名（与 'req' 和 'x509' 保持一致）。

  *Steve Henson*

* 允许证书策略扩展使用 IA5STRING 作为组织字段。这与 PKIX 定义相反，但 VeriSign 使用它，IE5 仅识别此形式。记录 'x509' 扩展选项。

  *Steve Henson*

* 添加 PEDANTIC 编译器标志以允许使用 gcc -pedantic 进行编译，而不会阻止非 pedantic 构建的内联汇编等。

  *Ben Laurie*

* 支持 Borland C++ builder。

  *Janez Jere <jj@void.si>，由 Ulf Möller 修改*

* 支持 Mingw32。

  *Ulf Möller*

* SHA-1 清理和性能增强。

  *Andy Polyakov <appro@fy.chalmers.se>*

* bignum 库的 Sparc v8plus 汇编器。

  *Andy Polyakov <appro@fy.chalmers.se>*

* 在 Configure 中接受任何 -xxx 和 +xxx 编译器选项。

  *Ulf Möller*

* 更新 HPUX 配置。

  *匿名*

* 在 safestack.h 中添加缺失的 `sk_<type>_unshift()` 函数

  *Ralf S. Engelschall*

* 新函数 SSL_CTX_use_certificate_chain_file，它除了证书外还设置“extra_cert”s。（这仅对“PEM”格式文件有意义，因为链作为一个整体不是 DER 编码的。）

  *Bodo Moeller*

* 支持 SSL API 中的 verify_depth。
  x509_vfy.c 有一个可以被认为是“差一错误”的问题：
  它的深度（不是外部接口的一部分）实际上是在计算证书链中的证书数量；
  现在它真正计算的是深度。

  *Bodo Moeller*

* crypto/x509/x509_cmp.c 中的错误修复：使用了 SSLerr 宏而不是 X509err，这通常会导致混淆的错误消息，因为错误代码不是全局唯一的（例如，在 ssl3_accept 中声称的错误，当证书与私钥不匹配时）。

* 新函数 SSL_CTX_set_session_id_context，允许设置默认值（这样您就不需要在每个使用 SSL_CTX 的连接上调用 SSL_set_session_id_context）。

  *Bodo Moeller*

* OAEP 解码错误修复。

  *Ulf Möller*

* 支持 INSTALL_PREFIX 以供包构建者使用，如 David Harris 所建议。

  *Bodo Moeller*

* 新的 Configure 选项“threads”和“no-threads”。对于已知正确编译器选项的系统（目前是 Solaris 和 Linux），“threads”是默认选项。

  *Bodo Moeller*

* 新脚本 util/mklink.pl 作为 util/mklink.sh 的更快替代品。

  *Bodo Moeller*

* 将各种脚本安装到 $(OPENSSLDIR)/misc，而不是 $(INSTALLTOP)/bin——它们不应弄乱 /usr/local/bin 等目录。

  *Bodo Moeller*

* “make linux-shared”用于构建共享库。

  *Niels Poppe <niels@netbox.org>*

* 新的 Configure 选项 `no-<cipher>`（rsa、idea、rc5 等）。

  *Ulf Möller*

* 将 PKCS#12 API 文档添加到 openssl.txt。对 x509 工具中的扩展添加提供了初步支持。

  *Steve Henson*

* 删除 NOPROTO 部分和错误代码注释。

  *Ulf Möller*

* 重写 DEF 文件生成器，使其现在解析 ANSI 原型。

  *Steve Henson*

* 新的 Configure 选项 --prefix=DIR 和 --openssldir=DIR。

  *Ulf Möller*

* 完全重写错误代码脚本。现在所有内容都由顶层的一个脚本处理，该脚本负责错误代码收集、头文件重写和 C 源文件生成。它应该比旧方法好得多：它现在使用 Ulf 解析器的修改版本来读取所有头文件中的 ANSI 原型（因此不再需要旧的 K&R 定义来创建错误），并且能更好地将函数代码转换为名称。旧的“嵌入在注释中的 ASN1 错误代码”不再是必需的，并且它不使用已删除的 .err 文件。此外，错误代码调用不必出现在一行上（这导致了一些大行……）。

  *Steve Henson*

* 将 #include 文件名从 `<foo.h>` 更改为 `<openssl/foo.h>`。

  *Bodo Moeller*

* 更改 ssl2_read 在遇到长度为 0 的数据包时的行为：不返回 0（这通常表示连接已关闭），而是继续读取。

  *Bodo Moeller*

* 修复了一些竞争条件。

  *Bodo Moeller*

* 添加对 CRL 分发点扩展的支持。添加证书策略和 CRL 分发点文档。

  *Steve Henson*

* 将自动生成的头文件部分移至 crypto/opensslconf.h。

  *Ulf Möller*

* 修复新的 56 位 DES 导出密码套件：它们使用了 7 字节而不是 8 字节的密钥材料。Merlin 还确认了此修复后 OpenSSL 与 Baltimore C/SSL 2.0 和 J/SSL 2.0 之间的互操作性。

  *Merlin Hughes <merlin@baltimore.ie>*

* 修复了大量警告。

  *Richard Levitte <levitte@stacken.kth.se>*

* 在 crypto/x509/by_dir.c 的 add_cert_dir() 中，如果目录规范未以 LIST_SEPARATOR_CHAR 结尾，则跳出循环。

  *Richard Levitte <levitte@stacken.kth.se>*

* 修复 sizeof(long) == 8 的问题。

  *Andy Polyakov <appro@fy.chalmers.se>*

* 将函数更改为 ANSI C。

  *Ulf Möller*

* 修复错误代码中的拼写错误。

  *Martin Kraemer <Martin.Kraemer@MchP.Siemens.De>, Ulf Möller*

* 从 Configure 中删除已失效的汇编文件。

  *Ulf Möller*

* SPARC v8 汇编器 BIGNUM 实现。

  *Andy Polyakov <appro@fy.chalmers.se>*

* 支持证书策略扩展：打印和设置。对支持此扩展的 r2i 方法进行了各种补充。

  *Steve Henson*

* 大量添加 const，并修复了 X509_NAME_oneline() 中的一个错误，该错误可能在您期望分配的缓冲区时返回一个 const 字符串。

  *Ben Laurie*

* 添加对 ASN1 类型 UTF8String 和 VISIBLESTRING 的支持，以及 CHOICE 类型 DirectoryString 和 DisplayText。

  *Steve Henson*

* 添加代码以允许 r2i 扩展访问配置数据库，添加 LHASH 数据库驱动程序并添加几个 ctx 辅助函数。

  *Steve Henson*

* 修复了 bn_expand2() 中的一个棘手错误，该错误导致各种 BN 函数在扩展 BIGNUM 大小时失败。

  *Steve Henson*

* 用于处理 SXNet 扩展的各种实用函数。修改 mkdef.pl 以支持类型安全堆栈。

  *Steve Henson*

* 修复 SSL_[gs]et_options() 中的拼写错误。

  *Nils Frostberg <nils@medcom.se>*

* 删除属于（现已过时）旧 X509V3 处理代码的各种函数和文件。

  *Steve Henson*

* 新的 Configure 选项“rsaref”。

  *Ulf Möller*

* 不再自动生成 pem.h。

  *Bodo Moeller*

* 引入类型安全的 ASN.1 SET。

  *Ben Laurie*

* 将各种额外的强制类型转换堆栈转换为类型安全的 STACK_OF() 变体。

  *Ben Laurie, Ralf S. Engelschall, Steve Henson*

* 引入类型安全的 STACK。这几乎肯定会破坏许多链接 OpenSSL 的代码（至少会导致大量警告），但请放心：转换很简单，并且消除了大量的强制类型转换。一些 STACKed 内容已经转换。随时可以转换更多。最终，我将完全放弃 STACK 类型。

  *Ben Laurie*

* 添加 `openssl ca -revoke <certfile>` 功能，该功能通过更新 index.txt 文件中的条目来撤销 `<certfile>` 中指定的证书。
  这样一来，就不再需要手动编辑 index.txt 文件来撤销证书了。现在 `-revoke` 选项会处理所有细节。

  *Massimiliano Pala <madwolf@openca.org>, Ralf S. Engelschall*

* 修复 `openssl crl -noout -text` 组合，其中 `-noout` 完全禁用了 `-text` 选项，因此 `openssl crl` 中的 `-noout -text` 组合与 `openssl x509|rsa|dsa` 中的类似选项不一致。

  *Ralf S. Engelschall*

* 确保 X509_V_ERR_CERT_REVOKED/23 错误号存在相应的明文错误消息，该错误号可能在验证回调函数确定证书已被撤销时发生。

  *Ralf S. Engelschall*

* 错误修复：在 test/testenc 中，不要测试 `openssl <cipher>` 是否包含被排除的密码，例如通过 -DNO_IDEA。此外，测试所有可用的密码，包括 rc5，直到现在都被遗忘了。为了让测试 shell 脚本知道哪些算法可用，使用了一个新的（到目前为止未记录的）命令 `openssl list-cipher-commands`。

  *Bodo Moeller*

* 错误修复：s_client 在本应首先检查 SSL_pending() 时，有时会在 select() 中休眠。

  *Bodo Moeller*

* 新函数 DSA_do_sign 和 DSA_do_verify，用于访问 ASN.1 编码之前的原始 DSA 值。

  *Ulf Möller*

* 对 Configure 进行调整

  *Niels Poppe <niels@netbox.org>*

* 添加对 PKCS#5 v2.0 ASN1 PBES2 结构的支持。目前仅此而已……

  *Steve Henson*

* Makefiles 中新增变量 $(RANLIB) 和 $(PERL)。

  *Ulf Möller*

* 新的配置选项，用于避免在 80386 上非法的指令。
  默认代码速度更快，但至少需要 486。

  *Ulf Möller*

* 删除了旧的 SSL2_CLIENT_VERSION（使用不一致）和
  SSL2_SERVER_VERSION（根本未使用）宏，它们现在与 SSL2_VERSION 相同。

  *Bodo Moeller*

* s_client 的新“-showcerts”选项。

  *Bodo Moeller*

* 进一步集成 PKCS#12。将 pkcs12 应用程序添加到 openssl 应用程序。各种清理和修复。

  *Steve Henson*

* 更多 PKCS#12 集成。添加了带有 Makefile.ssl 的新 pkcs12 目录，并修改了错误例程以在内部工作。在库启动例程中添加了错误代码和 PBE 初始化。

  *Steve Henson*

* 进一步 PKCS#12 集成。将基于密码的加密、PKCS#8 和打包函数添加到 asn1 和 evp。在此过程中更改了函数名称和错误代码。

  *Steve Henson*

* PKCS12 集成：开始……一系列补丁，用于缓慢地将 PKCS#12 功能集成到 OpenSSL 中。将 PKCS#12 对象添加到 objects.h

  *Steve Henson*

* 为某些 X509V3 扩展代码添加了一个新的“indent”选项。为 Thawte 强外联网扩展提供初始 ASN1 和显示支持。

  *Steve Henson*

* 添加 LinuxPPC 支持。

  *Jeff Dubrule <igor@pobox.org>*

* 删除了冗余的 BN 文件 bn_mulw.c，并将 alpha.s 中的 bn_div64 重命名为 bn_div_words。

  *Hannes Reinecke <H.Reinecke@hw.ac.uk> 和 Ben Laurie*

* 确保在 -DRSAref 下跳过 RSA OAEP 测试，因为当 OpenSSL 使用 RSAref 构建时不支持 OAEP。

  *Ulf Moeller <ulf@fitug.de>*

* 将 IS_SET/IS_SEQUENCE 的定义移至 crypto/asn1/asn1.h 内部，以便它们不再在 -DNOPROTO 下缺失。

  *Soren S. Jorvang <soren@t.dk>*

### 0.9.1c 和 0.9.2b 之间的更改 [1999 年 3 月 22 日]

 * 使 `SSL_get_peer_cert_chain()` 在服务器上可用。不幸的是，当会话被重用时它仍然不起作用。即将推出！

   *Ben Laurie*

 * 修复了一个安全漏洞，该漏洞允许在错误的上下文中重用会话，从而绕过客户端证书保护！所有使用客户端证书和会话缓存的软件在多个上下文中都需要打补丁以允许会话重用！一个更完整的解决方案正在开发中。

   *Ben Laurie，问题由 Holger Reif、Bodo Moeller (和 ???) 指出*

 * 一些源代码树清理（删除了过时的文件
   crypto/bf/asm/bf586.pl, test/test.txt 和 crypto/sha/asm/f.s；更改了 "config" 脚本的权限使其可执行）以及对 INSTALL 文档的修复。

   *Ulf Moeller <ulf@fitug.de>*

 * 移除了一些遗留的、错误的 `malloc`、`free` 用法，改用
   `Malloc`、`Free`。

   *Lennart Bang <lob@netstream.se>，Steve 进行了一些小的修改*

 * 使 `rsa_oaep_test` 在出错时返回非零值。

   *Ulf Moeller <ulf@fitug.de>*

 * 添加了对原生 Solaris 共享库的支持。运行 `Configure
   solaris-sparc-sc4-pic`，然后 `make`，最后运行 `shlib/solaris-sc4.sh`。如果有人能使最后一步自动化就好了。

   *Matthias Loepfe <Matthias.Loepfe@AdNovum.CH>*

 * 在“make links”期间，`ctx_size` 没有使用正确的编译器进行编译。已修复。

   *Ben Laurie*

 * 更改了密码列表中的 'ALL' 的含义。它现在表示“除 NULL 密码外的一切”。这意味着默认密码列表将不再启用 NULL 密码。它们需要被专门启用，例如使用字符串 "DEFAULT:eNULL"。

   *Steve Henson*

 * 修复 RSA 私钥加密例程：如果 p < q，则偶尔会产生无效结果。这只会发生在外部生成的密钥上，因为 OpenSSL (和 SSLeay) 确保 p > q。

   *Steve Henson*

 * 降低了限制，也允许 `perl util/perlpath.pl
   /path/to/bin/perl` 而不是 `perl util/perlpath.pl /path/to/bin`，
   因为这样也可以使用名为 `perl5` 的解释器（这通常是在安装了 Perl 4.x 作为 `perl` 的平台上 Perl 5.xxx 的名称）。

   *Matthias Loepfe <Matthias.Loepfe@adnovum.ch>*

 * 让 `util/clean-depend.pl` 也能在旧的 Perl 5.00x 版本上工作。

   *Matthias Loepfe <Matthias.Loepfe@adnovum.ch>*

 * 修复了 `Makefile.org`，以便将 CC、CFLAG 等传递给 'make links'，并将 advapi32.lib 添加到 Win32 构建中，并将 pem 测试比较更改为 fc.exe（感谢 Ulrich Kroener <kroneru@yahoo.com> 的建议）。修复了 evp.h 和 crypto/des/ede_cbcm_enc.c 中错位的 ASNI 原型和声明。

   *Steve Henson*

 * DES 四校验和在大端架构上是错误的。已修复。

   *Ben Laurie*

 * 注释掉了 bio.h 中两个未实现的函数。修复了 Win32 测试批处理文件，使其（可能）再次工作。Win32 测试批处理文件很糟糕：我感到恶心……

   *Steve Henson*

 * 移动了各种 `#ifdef`，以便在 e_os.h 中选择 NO_SYSLOG、NO_DIRENT 等。审计头文件以检查 ANSI 和非 ANSI 部分：非 ANSI 部分缺少 10 个函数，并且未从 Windows DLL 中导出。为新函数更新了 libeay.num。

   *Steve Henson*

 * 使 `openssl version` 的输出行保持一致。

   *Ralf S. Engelschall*

 * 修复了 BIO 函数的 Win32 符号导出列表：将
   BIO_get_ex_new_index、BIO_get_ex_num、BIO_get_ex_data 和 BIO_set_ex_data 添加到 ms/libeay{16,32}.def。

   *Ralf S. Engelschall*

 * 第二轮修复 OpenSSL 的 perl/ 相关内容。它现在至少在 Unix 下可以正常编译，并且通过了我现在添加的一些简单测试。但整个内容非常不完整，因此添加了一个免责声明的 README.1ST，以确保没有人期望这些内容在 OpenSSL 0.9.2 版本中真正起作用。此外，我还开始清理 XS 源文件，并修复了 OpenSSL.{pm,xs} 和 openssl_bio.xs 中一些小的错误和不一致之处。

   *Ralf S. Engelschall*

 * 修复了 Perl 中两个部分地址的生成。

   *Kenji Miyake <kenji@miyake.org>，由 Ben Laurie 集成*

 * 为 Linux on MIPS 添加了配置条目。

   *John Tobey <jtobey@channel1.com>*

 * 除非我们在 Windows 上，否则在运行 Configure 时进行链接。

   *Ben Laurie*

 * 允许使用 openssl.cnf 中的 crl_section 将扩展添加到 CRL 中。
   目前只有 issuerAltName 和 AuthorityKeyIdentifier 在 CRL 中才有意义。

   *Steve Henson*

 * 添加了一个有用的技巧，允许软件包维护者在命令行上指定编译器和其他平台详细信息，而无需每次都修补 Configure 脚本：现在可以使用
   `perl Configure <id>:<details>`，
   即平台 ID 可以附加详细信息（用冒号分隔）。这被视为在 Configure 的 %table 中有一个键为 `<id>`、值为 `<details>` 的静态预配置条目，并调用 `perl Configure <id>`。因此，当您想在 FreeBSD 3.1 上使用 pgcc 进行快速测试编译而不使用汇编器时，现在可以使用 `perl Configure "FreeBSD-elf:pgcc:-O6:::"`，它会覆盖 FreeBSD-elf 条目。

   *Ralf S. Engelschall*

 * 默认禁用新的 TLS1 密码套件：它们尚未正式发布。

   *Ben Laurie*

 * 允许在 `perl Configure ...` 命令行上指定 DSO 标志，如 -fpic、-fPIC、-KPIC 等。这样就可以使用位置无关代码 (PIC) 来编译 OpenSSL 库，这对于将其链接到 DSO 是必需的。

   *Ralf S. Engelschall*

 * 令人惊讶的是，导出密码完全是错误的，而且没有人注意到！
   已修复。

   *Ben Laurie*

 * 清理了 LICENSE 文档：现在，任何许可证问题的官方联系人是 OpenSSL 核心团队，邮箱为 openssl-core@openssl.org。
   并添加了一个关于双重许可情况的段落，以确保人们认识到 _OpenSSL 许可证_ 和 _SSLeay 许可证_ 都适用于 OpenSSL 工具包。

   *Ralf S. Engelschall*

 * 常规源代码树 Makefile 清理：使源代码树中的“making xxx in yyy...”显示一致，并将 `/bin/rm` 替换为 `rm`。
   此外，还清理了 `make links` 目标：删除不必要的
   分号、后续的冗余删除、将 point.sh 内联到 mklink.sh 中以加快处理速度，并且不再用令人困惑的内容使显示混乱。相反，只显示实际完成的链接。

   *Ralf S. Engelschall*

 * 允许使用 NULL 加密密码套件，仅用于身份验证。以前需要设置预处理器定义 SSL_ALLOW_ENULL 来实现此目的。
   现在需要设置 SSL_FORBID_ENULL 来阻止使用 NULL 加密。

   *Ben Laurie*

 * 向 PKCS#7 内容添加了一系列修复。它以前有时会在验证签名时重新排序签名属性（这会破坏它们），
   分离数据编码是错误的，并且使用 X509_get_pubkey() 获取的公钥没有被释放。

   *Steve Henson*

 * 为 BUFFER 函数添加了文本文档。还为 Win95 控制台的一个错误添加了解决方法。这由密码读取内容触发：键入的最后一个字符会被传递到下一个 fread()。例如，如果您使用 'req' 生成新的证书请求，那么密码的最后一个字符将是 CR，它将作为空白进入第一个字段。

   *Steve Henson*

 * 添加了新的“包含 OpenSSL 加密软件”按钮，作为 doc/openssl_button.{gif,html}，其风格与旧的 SSLeay
   按钮相似，可以被基于 OpenSSL 的应用程序用来显示与 OpenSSL 项目的关系。

   *Ralf S. Engelschall*

 * 删除了 ssl/ssl_lib.c 和 ssl/ssl.h 文件中函数签名中令人困惑的变量。

   *Lennart Bong <lob@kulthea.stacken.kth.se>*

 * 不要将 bss_file.c 安装在 PREFIX/include/ 下

   *Lennart Bong <lob@kulthea.stacken.kth.se>*

 * 重新使 Win32 编译正常工作。修改 mkdef.pl 以处理返回函数指针的函数，并支持 NT 特定的内容。修复 mk1mf.pl 和 VC-32.pl 以支持 NT 的差异。各种 #ifdef WIN32 和 WINNTs 被散布在各处，并且从无符号类型到有符号类型的更改：这导致了 Win32 编译失败。

   *Steve Henson*

 * 添加了新的证书文件到堆栈函数，
   SSL_add_dir_cert_subjects_to_stack() 和
   SSL_add_file_cert_subjects_to_stack()。这些在很大程度上取代了
   SSL_load_client_CA_file()，并且可以轻松地将多个证书添加到堆栈中（通常然后将其传递给 SSL_CTX_set_client_CA_list()）。
   这意味着 Apache-SSL 和类似软件包不必费力地将任意数量的 CA 添加到首选列表中。

   *Ben Laurie*

 * 尝试使用 doxygen 文档。目前仅部分应用于 ssl/ssl_lib.c。
   请参阅 <http://www.stack.nl/~dimitri/doxygen/index.html>，并使用
   openssl.doxy 作为配置文件运行 doxygen。

   *Ben Laurie*

 * 删除了严格 C 编译器不喜欢的剩余 C++ 风格的注释。

   *Ralf S. Engelschall，由 Carlos Amengual 指出*

 * 将 bn_mont.c 中的 BN_RECURSION 更改为 BN_RECURSION_MONT，这样它就不会默认编译：它在大密钥时存在问题。

   *Steve Henson*

 * 添加了一系列 SSL_xxx() 函数，用于配置临时 RSA 和
   DH 私钥和/或回调函数，这些函数直接对应于它们的 SSL_CTX_xxx() 对等函数，但作用于每个连接的基础上。这对于必须在每个连接基础上配置证书（例如 Apache+mod_ssl）而不是在每个上下文基础上配置证书（例如 s_server）的应用程序是必需的。
      对于 RSA 证书情况没有区别，但
   对于 DSA 证书情况，这修复了“无共享密码”问题，其中 OpenSSL 密码选择过程失败，因为临时密钥未从上下文继承，并且 API 未提供重新配置它们的途径。
      新的函数现在允许应用程序重新配置内容，它们详细是：SSL_need_tmp_RSA、SSL_set_tmp_rsa、SSL_set_tmp_dh、
   SSL_set_tmp_rsa_callback 和 SSL_set_tmp_dh_callback。此外，一个新的
   非公共 API 函数 ssl_cert_instantiate() 被用作辅助函数，并减少了 ssl_rsa.c 中的代码冗余。

   *Ralf S. Engelschall*

 * 将 s_server 的 -dcert 和 -dkey 选项移出未记录的功能区域，因为它们对于 DSA 情况很有用，并且应该被用户识别。

   *Ralf S. Engelschall*

 * 修复了导出密码的密码决策方案：导出位 _不在_ SSL_MKEY_MASK 或 SSL_AUTH_MASK 中，它们在
   SSL_EXP_MASK 中。因此，必须使用原始变量而不是已屏蔽的变量。

   *Richard Levitte <levitte@stacken.kth.se>*

 * 将 crypto/bio/b_sock.c 中的 `port` 变量从 `int` 改为 `unsigned int`

   *Richard Levitte <levitte@stacken.kth.se>*

 * 更改 pk7_doit.c:PKCS7_dataFinal() 中另一个 md_len 变量的类型从 `int` 改为 `unsigned int`，因为它是一个长度，并且由 EVP_DigestFinal() 初始化，该函数期望一个 `unsigned int *`。

   *Richard Levitte <levitte@stacken.kth.se>*

 * 不要硬编码 Configure 脚本 shebang 行中的 Perl 解释器路径。而是使用通常的 Shell->Perl 转换技巧。

   *Ralf S. Engelschall*

 * 使 `openssl x509 -noout -modulus` 对 DSA 证书（除了 RSA 证书）也可用（以匹配 `openssl dsa
   -noout -modulus` 的行为，就像对 `openssl rsa -noout
   -modulus` 一样）。对于 RSA，-modulus 是真正的“模数”，而对于 DSA
   目前打印的是公钥（这是 `openssl dsa -modulus` 过去已经做出的决定），它起着类似的作用。
   此外，NO_RSA 不再完全删除整个 -modulus
   选项；它现在只避免使用 RSA 相关代码。NO_DSA 现在也是如此。

   *Ralf S.  Engelschall*

 * 添加了 Arne Ansper 的可靠 BIO - 这是一个加密的、块摘要的
   BIO。有关更多信息，请参阅源代码 (crypto/evp/bio_ok.c)。

   *Arne Ansper <arne@ats.cyber.ee>*

 * 删除了旧的、糟糕的 req 代码，该代码试图（并失败了）允许添加原始 OID。现在 'req' 和 'ca' 都可以使用配置文件中定义的新对象。

   *Steve Henson*

 * 添加了很酷的 BIO，可以进行 syslog（或 NT 上的事件日志）。

   *Arne Ansper <arne@ats.cyber.ee>，由 Ben Laurie 集成*

 * 添加了对新的 TLS 密码套件的支持，TLS_RSA_EXPORT56_WITH_RC4_56_MD5、
   TLS_RSA_EXPORT56_WITH_RC2_CBC_56_MD5 和
   TLS_RSA_EXPORT56_WITH_DES_CBC_SHA，如“56 位导出密码套件 TLS”（draft-ietf-tls-56-bit-ciphersuites-00.txt）中所述。

   *Ben Laurie*

 * 为新的扩展代码添加了初步的配置信息。

   *Steve Henson*

 * 使 RSA_NO_PADDING 真正使用无填充。

   *Ulf Moeller <ulf@fitug.de>*

 * 在进行私钥/公钥检查时生成错误。

   *Ben Laurie*

 * 大修了 'crl' 工具。新的函数 X509_CRL_print。对某些 CRL 扩展和新对象的部分支持已添加。

   *Steve Henson*

 * 再次修复了 ASN1 IMPLICIT 错误……对私钥使用扩展的部分支持以及对颁发者密钥 ID 的更全面支持。

   *Steve Henson*

 * 为 OpenSSL 加密库添加了 OAEP 加密。OAEP 是 RSA 的改进填充方法，在 PKCS
   #1 v2.0 (RFC 2437, 1998 年 10 月) 中推荐用于新应用程序。
   OAEP（Optimal Asymmetric Encryption Padding）比 PKCS #1 v1.5 中使用的临时填充具有更好的理论基础。它对 Bleichbacher 的 RSA 攻击是安全的。
   *Ulf Moeller <ulf@fitug.de>，由
   Ben Laurie 重新格式化、更正和集成*

 * 更新了新的 SSL 压缩代码

   *Eric A. Young，(来自 C2Net SSLeay 的更改，由 Mark Cox 集成)*

 * 修复了主密钥中的版本号，当通过 RSA 传递时，会检查是否提出了 TLS，但我们回滚到 SSLv3
   （因为服务器不接受更高的版本），版本号是 0x03,0x01，而不是 0x03,0x00

   *Eric A. Young，(来自 C2Net SSLeay 的更改，由 Mark Cox 集成)*

 * 对 SSL 命令进行了广泛的内存泄漏检查。修复了 `ssl/` 中大量与新的 `X509_get_pubkey()` 行为相关的内存泄漏。还修复了 `apps/` 中的泄漏以及 `crypto/dsa/dsa_vrf.c` 中一个不相关的泄漏。

   *Steve Henson*

 * 支持 RAW 扩展，可以通过包含其 DER 编码来创建任意扩展。请参阅 `apps/openssl.cnf` 中的示例。

   *Steve Henson*

 * 确保最新的 Perl 版本不会在 crypto/err/err_genc.pl 脚本中将某些生成的 C 数组代码解释为 Perl 数组代码。

   *Lars Weber <3weber@informatik.uni-hamburg.de>*

 * 修改了 ms/do_ms.bat 以不生成汇编语言 makefile，因为很少有人拥有汇编器。各种 Win32 编译修复以及对 INSTALL.W32 文件的更新，其中包含（希望）更准确的 Win32
   构建说明。

   *Steve Henson*

 * 修改了 configure 脚本 'Configure' 以在 Win32 下自动创建 crypto/date.h 文件，并从 pem.org 构建 pem.h。新的脚本
   util/mkfiles.pl 用于在无法执行 'make files' 的环境中创建 MINFO 文件：perl util/mkfiles.pl >MINFO 应该可以工作。

   *Steve Henson*

 * 对 DES 函数声明进行了重大修改，以追求正确性和纯粹性。结果是，许多邪恶的类型转换消失了，一些奇怪的东西也消失了。您可能会发现这会导致您的代码出现警告。消除您的邪恶类型转换可能会修复它们。大部分是这样。

   *Ben Laurie*

 * 修复了 asn1.h 中的一个拼写错误。修复了对象创建脚本
   obj_dat.pl。它将对象定义中的零视为“对象结束”：objects.h 中的所有对象都没有零，因此没有被发现。

   *Steve Henson，由 Erwann ABALEA <eabalea@certplus.com> 报告*

 * 添加了对 Triple DES Cipher Block Chaining with Output Feedback
   Masking (CBCM) 的支持。在没有测试向量的情况下，我所能做的最好的就是检查解密是否能撤销加密，到目前为止。如果您有测试向量，请发送给我。

   *Ben Laurie*

 * 修正了导出密码的密钥长度计算（为 NULL 密码分配了过多的空间）。这尚未经过测试！

   *Ben Laurie*

 * 对用于创建 Win32 DEF 文件的 mkdef.pl 进行了修改。使用消息
   现在是正确的（它能理解命令行上的“crypto”和“ssl”）。现在还有一个“update”选项。这将使用任何新函数更新 util/ssleay.num 和 util/libeay.num 文件。
   如果您执行：
   perl util/mkdef.pl crypto ssl update
   它将更新它们。

   *Steve Henson*

 * 彻底检查了 Perl 接口：
   - 将 BN 内容移植到 OpenSSL 不同的 BN 库
   - 使 perl/ 源代码树支持 CVS
   - 将包从 SSLeay 重命名为 OpenSSL（文件仍然包含
     它们历史记录，因为我已在存储库中复制了它们）
   - 删除了过时的文件（测试脚本将在未来被
     更好的 Test::Harness 变体取代）

   *Ralf S. Engelschall*

 * 对源代码树进行了第一次保守的清理：
   1. 将各种过时的 readme 文本合并到 doc/ssleay.txt 中
   其中我们收集旧文档和 readme 文本。
   2. 删除我已确信不再需要的文件的一部分，原因有三：它们只是临时文件，由 Eric 留下；或者它们是保留的原始文件，我已验证 diff 也可以通过“cvs diff
   -rSSLeay_0_8_1b”在 CVS 中获得；或者它们被重命名了（正如 crypto/md/ 内容的情况一样）。

   *Ralf S. Engelschall*

 * 更多的扩展代码。对 subject 和 issuer alt
   name、issuer 和 authority key id 的支持不完整。更改 i2v 函数参数，并在 X509V3_CTX 结构中添加额外的 'crl' 参数：猜猜它的用途 :-) 修复了 ASN1 宏，该宏弄乱了
   IMPLICIT 标签，并添加了 f_enum.c，它为 ENUMERATED 添加了 a2i、i2a。

   *Steve Henson*

 * 对 ENUMERATED 类型的部分支持。这在很大程度上是从 INTEGER 代码复制的。

   *Steve Henson*

 * 添加新函数 EVP_MD_CTX_copy() 以替换频繁使用的 memcpy。

   *Eric A. Young，(来自 C2Net SSLeay 的更改，由 Mark Cox 集成)*

 * 确保 `make rehash` 目标能够真正找到 `openssl` 程序。

   *Ralf S. Engelschall, Matthias Loepfe <Matthias.Loepfe@adnovum.ch>*

 * 在 MD5 汇编器中再挤出 7% 的速度，至少在 P2 上是这样。如果这减慢了其他处理器，我希望得到反馈。

   *Ben Laurie*

 * 为 Configure 脚本添加了 CygWin32 平台信息。

   *Alan Batie <batie@aahz.jf.intel.com>*

 * 修复了 ms/32all.bat 脚本：`no_asm` -> `no-asm`

   *Rainer W. Gerling <gerling@mpg-gv.mpg.de>*

 * 新程序 nseq 用于操作 netscape 证书序列

   *Steve Henson*

 * 修改 crl2pkcs7 以支持多个 -certfile 参数。修复了一些拼写错误。

   *Steve Henson*

 * 修复了 BN 代码中的错误。以前默认定义 BN_RECURSION，但 BN 代码存在一些问题，在进行证书验证和其他一些函数时会导致失败。

   *Eric A. Young，(来自 C2Net SSLeay 的更改，由 Mark Cox 集成)*

 * 添加了 ASN1 和 PEM 代码以支持 netscape 证书序列。

   *Steve Henson*

 * 添加了 ASN1 和 PEM 代码以支持 netscape 证书序列。

   *Steve Henson*

 * 添加了几个 PKIX 和私有扩展密钥使用 OID。

   *Steve Henson*

 * 修改了 'ca' 程序以处理新的扩展代码。修改了
   openssl.cnf 以适应新的扩展格式，并添加了注释。

   *Steve Henson*

 * 更多的 X509 V3 更改。修复了 v3_bitstr.c 中的拼写错误。添加了对 'req' 的支持，并向 openssl.cnf 添加了一个示例，以便 req -x509 现在添加适当的
   CA 扩展。

   *Steve Henson*

 * 继续 X509 V3 更改。添加到其他 makefile 中，与错误代码集成，添加对 X509_print() 和 x509 应用程序的初始支持。

   *Steve Henson*

 * 深吸一口气，开始添加 X509 V3 扩展支持代码。在 crypto/x509v3 中添加文件。将原始内容移到 crypto/x509v3/old。所有这些内容目前都是隔离的，甚至还没有编译。

   *Steve Henson*

 * 继续对 GeneralizedTime 进行补丁。修复证书和 CRL
   ASN1 以使用 ASN1_TIME，并修改打印例程以使用 ASN1_TIME_print。
   从 X509 例程中删除了加载扩展时的版本检查：
   这允许处理某些不正确设置版本的损坏证书。

   *Steve Henson*

 * 处理与依赖项相关的烦人问题，以 YAAHW（另一种临时方式）处理 - Makefile.ssl 现在都包含本地依赖项，仍然可以通过“make depend”重新生成。

   *Ben Laurie*

 * CAST-128 C 版本中的拼写错误。

   *Ben Laurie，由 Jeremy Hylton <jeremy@cnri.reston.va.us> 报告*

 * 对错误生成代码进行了更改。perl 脚本 err-code.pl
   现在读取旧的错误代码并保留旧的数字，仅在必要时添加新的。它还仅在添加新代码时才更改 .err 文件。makefiles 已修改为仅在需要时插入错误（以避免不必要地修改头文件）。这是通过仅在 .err 文件比自动生成的 C 文件更新时才插入错误来实现的。要从头开始重新构建所有错误代码（旧行为），请修改 crypto/Makefile.ssl 以将 -regen 标志传递给 err_code.pl
   或删除所有 .err 文件。

   *Steve Henson*

 * CAST-128 对于短密钥的实现是不正确的。C 版本已修复，但未经测试。汇编器版本也已修复，但 _尚未为 WIN32 生成新的汇编器 - 如果需要，Makefile 需要修复以重新生成它。
   *Ben Laurie，由 Jun-ichiro itojun
    Hagino <itojun@kame.net> 报告（并提供了 C 版本的修复）*

 * randfile.c 中的文件打开不正确。

   *Ulf Möller <ulf@fitug.de>*

 * 开始支持 GeneralizedTime。d2i、i2d、check 和 print 函数。还有 ASN1_TIME 套件，它是一个 UTCTime 或
   GeneralizedTime 的 CHOICE。ASN1_TIME 是证书等中使用的正确类型：它只是几乎总是 UTCTime。请注意，此补丁添加了新的错误代码，因此如果出现问题，请执行“make errors”。

   *Steve Henson*

 * 在 config 中正确识别 Linux 1。

   *Ulf Möller <ulf@fitug.de>*

 * 在使用 DSA 密钥时，从 ca 中移除无意义的 MD5 哈希。

   *Anonymous <nobody@replay.com>*

 * 如果将空字符串作为证书目录给出，则生成错误。如果传入 NULL，也生成错误（以前返回 0 表示错误，但未设置错误）。

   *Ben Laurie，由 Anonymous <nobody@replay.com> 报告*

 * 向 SSL 方法添加了原型。使 SSL_write 的缓冲区成为 const，终于。

   *Ben Laurie*

 * 修复了 rsaref.c 中的虚拟函数 BN_ref_mod_exp()，使其具有正确的
   参数。这导致了一个警告，该警告导致了 Win32 编译失败。

   *Steve Henson*

 * 从 crypto/bn/bn_local.h 中删除了 C++ 风格的注释。

   *Neil Costigan <neil.costigan@celocom.com>*

 * OBJ_txt2nid 函数是错误的。它应该根据文本字符串返回一个 nid，查找短名称和长名称，最后是“点”格式。
   “点”格式的内容不起作用。添加了新函数
   OBJ_txt2obj 来执行相同操作但返回一个 ASN1_OBJECT，并重写了 OBJ_txt2nid 以使用它。OBJ_txt2obj 即使 OID 不在表中也可以返回对象。

   *Steve Henson*

 * 向 X509 查找/验证方法添加了原型，修复了
   X509_LOOKUP_by_alias() 中的一个错误。

   *Ben Laurie*

 * 按名称对 openssl 函数进行排序。

   *Ben Laurie*

 * 使 `gendsa` 命令正常工作并将其添加到 `list` 命令中。从示例 DSA 密钥中删除加密（如果您有兴趣，密码是“1234”）。

   *Steve Henson*

 * 使所有 `*_free` 函数都能接受 NULL 指针。

   *Frans Heymans <fheymans@isaserver.be>*

 * 如果在 s3_srvr.c 中生成 DH 密钥，则不要因尝试使用
   NULL 指针而失败。

   *Anonymous <nobody@replay.com>*

 * s_server 应发送 CAfile 作为可接受的 CA，而不是自己的证书。

   *Bodo Moeller <3moeller@informatik.uni-hamburg.de>*

 * 不要因为 `apps/req` 的数字 `-newkey` 参数而失败。

   *Bodo Moeller <3moeller@informatik.uni-hamburg.de>*

 * s3_srvr.c 中用于导出测试的临时密钥是错误的。

   *Anonymous <nobody@replay.com>*

 * 添加了临时密钥回调函数
   SSL_CTX_set_tmp_{rsa,dh}_callback() 的原型。

   *Ben Laurie*

 * 使 DH_free() 能够容忍传递 NULL 指针（类似于 RSA_free() 和
   DSA_free()）。使 X509_PUBKEY_set() 检查 d2i_PublicKey() 中的错误。

   *Steve Henson*

 * X509_name_add_entry() 在出错后释放了错误的东西。

   *Arne Ansper <arne@ats.cyber.ee>*

 * rsa_eay.c 会尝试释放一个 NULL 上下文。

   *Arne Ansper <arne@ats.cyber.ee>*

 * BIO_s_socket() 在 Windoze 上有一个错误的 should_retry()。

   *Arne Ansper <arne@ats.cyber.ee>*

 * BIO_f_buffer() 没有传递 BIO_CTRL_FLUSH。

   *Arne Ansper <arne@ats.cyber.ee>*

 * 确保已存在的 X509_STORE->depth 变量在 X509_STORE_new() 中被初始化，但记录该变量在证书验证过程中仍未使用的事实。

   *Ralf S. Engelschall*

 * 修复了各种库和 `apps/` 文件以释放从 X509_PUBKEY_get() 等获取的 pkeys。还允许 x509.c 处理 netscape 扩展。

   *Steve Henson*

 * 修复了 X509_PUBKEY_get() 中的引用计数。这使得
   demos/maurice/example2.c 等能够工作，可能还有其他。

   *Steve Henson 和 Ben Laurie*

 * 对 `apps/` 的第一次清理。首先，`ssleay` 程序现在命名为
   `openssl`，其次，`openssl <command>` 的快捷符号链接不再创建。这样我们就拥有了一个单一且一致的命令行界面 `openssl <command>`，类似于 `cvs <command>`。

   *Ralf S. Engelschall、Paul Sutton 和 Ben Laurie*

 * ca.c：将 DSA 密钥的测试移到 #ifndef NO_DSA 内部。使 pubkey
   BIT STRING 包装器始终具有零未使用位。

   *Steve Henson*

 * 添加了 CA.pl，CA.sh 的 Perl 版本，添加了扩展密钥使用 OID。

   *Steve Henson*

 * 使顶层 INSTALL 文档更易于理解。

   *Paul Sutton*

 * Makefiles 已更新，以便在子目录
   make 中发生错误时退出（包括用户按下 ^C 时）[Paul Sutton]

 * 将 Montgomery 上下文内容明确化到 RSA 数据结构中。

   *Ben Laurie*

 * 修复了 pem 和 err 的构建顺序，以便生成 pem.h。

   *Ben Laurie*

 * 修复了 X509_NAME_delete_entry() 中的重新编号错误。

   *Ben Laurie*

 * 增强了 err-ins.pl 脚本，使其将错误库编号设为全局变量，并可以添加库名称。这对于外部 ASN1 和其他错误库是必需的。

   *Steve Henson*

 * 修复了从未正常工作的 sk_insert。

   *Steve Henson*

 * 修复了 ASN1 宏，使其能够处理不定长构造的
   EXPLICIT 标签。一些非标准证书使用这些：现在可以读取它们。

   *Steve Henson*

 * 将各种旧的/过时的 SSLeay 文档文件（doc/xxx.doc）合并到一个单一的 doc/ssleay.txt 包中。这样信息仍然得以保留，但不再弄乱该目录。现在有了新的空间用于新的文档文件集。

   *Ralf S. Engelschall*

 * SETs 被错误地 DER 编码了。这是一个主要问题，因为它们与 SEQUENCEs 共享代码，而 SEQUENCEs 的编码方式不同。这意味着几乎所有与 SETs 或 SEQUENCEs 相关的代码都已更改名称或参数数量。

   *Ben Laurie，基于 GP Jayan <gp@nsj.co.jp> 的部分修复*

 * 修复了与上述内容一起工作的测试数据。

   *Ben Laurie*

 * 修复了 RSA 头文件声明，这些声明隐藏了我早在 0.9.0b 中修复的一个错误，但似乎已被 Eric 为 0.9.1 修复了。

   *Ben Laurie - 由 Ulf Möller <ulf@fitug.de> 指出*

 * 自动检测 FreeBSD3。

   *Ben Laurie*

 * 修复了 Configure 中的各种错误。这会影响以下平台：
   nextstep
   ncr-scde
   unixware-2.0
   unixware-2.0-pentium
   sco5-cc。

   *Ben Laurie*

 * 从 CVS 中删除生成的文件。重新排序测试以在需要之前生成文件。

   *Ben Laurie*

 * 从 Makefile.org 生成 Makefile.ssl（以保持 CVS 的正常运行）。

   *Ben Laurie*

### 0.9.1b 和 0.9.1c 之间的更改 [1998 年 12 月 23 日]

 * 将 OPENSSL_VERSION_NUMBER 添加到 crypto/crypto.h 和
   将版本字符串中的 SSLeay 更改为 OpenSSL。

   *Ralf S. Engelschall*

 * 对顶层文档进行了一些修复。

   *Paul Sutton*

 * 修复了 rsaref.h 在编译时找不到的讨厌错误，因为缺少到 include/ 的符号链接。

   *Ralf S. Engelschall*

 * 集成了流行的 no-RSA/DSA-only 补丁
   允许编译一个不含 RSA 的 SSLeay。

   *Andrew Cooke / Interrader Ldt.，Ralf S. Engelschall*

 * 修复了 `make -f Makefile.ssl links` 下的讨厌的 rehash 问题
   当 "ssleay" 仍然找不到时。

   *Ralf S. Engelschall*

 * 为 Configure 添加了更多平台：Cray T3E、HPUX 11、

   *Ralf S. Engelschall, Beckmann <beckman@acl.lanl.gov>*

 * 更新了 README 文件。

   *Ralf S. Engelschall*

 * 在 CVS 存储库子目录中添加了各种 .cvsignore 文件
   使“cvs update”真正静默。

   *Ralf S. Engelschall*

 * 重新编译了错误定义头文件并添加了
   缺失的符号到 Win32 链接器表。

   *Ralf S. Engelschall*

 * 清理了顶层文档；
   o 新文件：CHANGES 和 LICENSE
   o 将 VERSION、HISTORY* 和 README* 文件合并到 CHANGES.SSLeay
   o 将 COPYRIGHT 合并到 LICENSE
   o 删除了过时的 TODO 文件
   o 重命名 MICROSOFT 为 INSTALL.W32

   *Ralf S. Engelschall*

 * 从 0.9.1b 源代码树中删除了虚拟文件：
   crypto/asn1/x crypto/bio/cd crypto/bio/fg crypto/bio/grep crypto/bio/vi
   crypto/bn/asm/......add.c crypto/bn/asm/a.out crypto/dsa/f crypto/md5/f
   crypto/pem/gmon.out crypto/perlasm/f crypto/pkcs7/build crypto/rsa/f
   crypto/sha/asm/f crypto/threads/f ms/zzz ssl/f ssl/f.mak test/f
   util/f.mak util/pl/f util/pl/f.mak crypto/bf/bf_locl.old apps/f

   *Ralf S. Engelschall*

 * 添加了各种平台可移植性修复。

   *Mark J. Cox*

 * OpenSSL 项目的起源：
   我们从 Eric A.
   Young 和 Tim J. Hudson 在 1998 年夏天之前为 C2Net 工作时创建的最新（未发布）SSLeay 版本 0.9.1b 开始。

   *The OpenSSL Project*

### 0.9.0b 和 0.9.1b 之间的更改 [未发布]

 * 更新了 certs/ 下的一些 CA 证书

   *Eric A. Young*

 * 更改了一些 BIGNUM API 内容。

   *Eric A. Young*

 * 各种平台移植：OpenBSD、Ultrix、IRIX 64bit、NetBSD、
   DGUX x86、Linux Alpha 等。

   *Eric A. Young*

 * 新的 COMP 库 [crypto/comp/] 用于 SSL 记录层压缩：
   RLE（虚拟实现）和 ZLIB（在 ZLIB 可用时真正实现）。

   *Eric A. Young*

 * 为 asn1pars 程序添加了 -strparse 选项，该选项解析嵌套的
   二进制结构

   *Dr Stephen Henson <shenson@bigfoot.com>*

 * 在 ssleay.cnf 中为 "ca" 和 "req" 程序添加了 "oid_file"。

   *Eric A. Young*

 * "ca" 程序中的 DSA 修复。

   *Eric A. Young*

 * 为 "dsaparam" 程序添加了 "-genkey" 选项。

   *Eric A. Young*

 * 添加了 RIPE MD160 (rmd160) 消息摘要。

   *Eric A. Young*

 * 为 "ssleay version" 命令添加了 -a (all) 选项。

   *Eric A. Young*

 * 添加了 PLATFORM 定义，它是 Configure 给出的 ID。

   *Eric A. Young*

 * 在 crypto/mem.c 中添加了 MemCheck_XXXX 函数用于内存检查。

   *Eric A. Young*

 * 扩展了 ASN.1 解析例程。

   *Eric A. Young*

 * 扩展了 BIO 例程以支持 REUSEADDR、seek、tell 等。

   *Eric A. Young*

 * 在 BN 库中添加了 BN_CTX。

   *Eric A. Young*

 * 修复了 DES 库中的弱密钥值

   *Eric A. Young*

 * 更改了 EVP 库中用于密码别名的 API。

   *Eric A. Young*

 * 添加了对 RC2/64 位密码的支持。

   *Eric A. Young*

 * 将 lhash 库转换为 crypto/mem.c 函数。

   *Eric A. Young*

 * 添加了更多识别的 ASN.1 对象 ID。

   *Eric A. Young*

 * 为 SSL/TLS 添加了更多 RSA 填充检查。

   *Eric A. Young*

 * 添加了 BIO 代理/过滤器功能。

   *Eric A. Young*

 * 在 SSL_CTX 中添加了 extra_certs，可用于
   在 CA 证书链发送过程中向客户端发送额外的 CA 证书。可以使用 SSL_CTX_add_extra_chain_cert() 进行配置。

   *Eric A. Young*

 * 现在 Fortezza 在认证阶段被拒绝，因为
   SSLeay 完全不支持此密钥交换机制。

   *Eric A. Young*

 * 附加的 PKCS1 检查。

   *Eric A. Young*

 * 支持字符串 "TLSv1" 以用于所有 TLS v1 密码。

   *Eric A. Young*

 * 添加了函数 SSL_get_ex_data_X509_STORE_CTX_idx()，该函数给出 SSL 上下文在 X509_STORE_CTX ex_data 中的 ex_data 索引。

   *Eric A. Young*

 * 修复了一些内存泄漏。

   *Eric A. Young*

 * 修复了各种代码和注释中的拼写错误。

   *Eric A. Young*

 * ssl/s3_clnt.c 中的一个小错误，其中客户端随机数总是会发送 4 个 0 字节。

   *Edward Bishop <ebishop@spyglass.com>*

<!-- Links -->

[CMVP]: https://csrc.nist.gov/projects/cryptographic-module-validation-program
[CVE-2002-0655]: https://openssl-library.org/news/vulnerabilities/#CVE-2002-0655
[CVE-2002-0656]: https://openssl-library.org/news/vulnerabilities/#CVE-2002-0656
[CVE-2002-0657]: https://openssl-library.org/news/vulnerabilities/#CVE-2002-0657
[CVE-2002-0659]: https://openssl-library.org/news/vulnerabilities/#CVE-2002-0659
[CVE-2003-0078]: https://openssl-library.org/news/vulnerabilities/#CVE-2003-0078
[CVE-2003-0543]: https://openssl-library.org/news/vulnerabilities/#CVE-2003-0543
[CVE-2003-0544]: https://openssl-library.org/news/vulnerabilities/#CVE-2003-0544
[CVE-2003-0545]: https://openssl-library.org/news/vulnerabilities/#CVE-2003-0545
[CVE-2003-0851]: https://openssl-library.org/news/vulnerabilities/#CVE-2003-0851
[CVE-2004-0079]: https://openssl-library.org/news/vulnerabilities/#CVE-2004-0079
[CVE-2004-0112]: https://openssl-library.org/news/vulnerabilities/#CVE-2004-0112
[CVE-2005-2969]: https://openssl-library.org/news/vulnerabilities/#CVE-2005-2969
[CVE-2006-2937]: https://openssl-library.org/news/vulnerabilities/#CVE-2006-2937
[CVE-2006-2940]: https://openssl-library.org/news/vulnerabilities/#CVE-2006-2940
[CVE-2006-3738]: https://openssl-library.org/news/vulnerabilities/#CVE-2006-3738
[CVE-2006-4339]: https://openssl-library.org/news/vulnerabilities/#CVE-2006-4339
[CVE-2006-4343]: https://openssl-library.org/news/vulnerabilities/#CVE-2006-4343
[CVE-2007-4995]: https://openssl-library.org/news/vulnerabilities/#CVE-2007-4995
[CVE-2007-5135]: https://openssl-library.org/news/vulnerabilities/#CVE-2007-5135
[CVE-2008-0891]: https://openssl-library.org/news/vulnerabilities/#CVE-2008-0891
[CVE-2008-1672]: https://openssl-library.org/news/vulnerabilities/#CVE-2008-1672
[CVE-2008-1678]: https://openssl-library.org/news/vulnerabilities/#CVE-2008-1678
[CVE-2008-5077]: https://openssl-library.org/news/vulnerabilities/#CVE-2008-5077
[CVE-2009-0590]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-0590
[CVE-2009-0591]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-0591
[CVE-2009-0789]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-0789
[CVE-2009-1377]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-1377
[CVE-2009-1378]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-1378
[CVE-2009-1379]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-1379
[CVE-2009-1386]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-1386
[CVE-2009-3245]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-3245
[CVE-2009-3555]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-3555
[CVE-2009-4355]: https://openssl-library.org/news/vulnerabilities/#CVE-2009-4355
[CVE-2010-0433]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-0433
[CVE-2010-0740]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-0740
[CVE-2010-1633]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-1633
[CVE-2010-3864]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-3864
[CVE-2010-4180]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-4180
[CVE-2010-4252]: https://openssl-library.org/news/vulnerabilities/#CVE-2010-4252
[CVE-2011-0014]: https://openssl-library.org/news/vulnerabilities/#CVE-2011-0014
[CVE-2011-3207]: https://openssl-library.org/news/vulnerabilities/#CVE-2011-3207
[CVE-2011-3210]: https://openssl-library.org/news/vulnerabilities/#CVE-2011-3210
[CVE-2011-4108]: https://openssl-library.org/news/vulnerabilities/#CVE-2011-4108
[CVE-2011-4109]: https://openssl-library.org/news/vulnerabilities/#CVE-2011-4109
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
[CVE-2013-6450]: https://openssl-library.org/news/vulnerabilities/#CVE-2013-6450
[CVE-2014-0076]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-0076
[CVE-2014-0160]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-0160
[CVE-2014-0195]: https://openssl-library.org/news/vulnerabilities/#CVE-2014-0195
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
[RFC 2578 (STD 58), section 3.5]: https://datatracker.ietf.org/doc/html/rfc2578#section-3.5
