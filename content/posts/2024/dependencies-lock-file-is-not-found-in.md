---
title: "GitHub Actions: Dependencies lock file is not found in"
category: "CI/CD"
description: "GitHub Actions에서 npm dependencies 캐싱 과정에서 발생한 이슈"
tags: ["git-actions", "ci/cd"]
publishedAt: "2024-06-05"
isPublished: true
---

```bash
/opt/hostedtoolcache/node/18.20.3/x64/bin/npm config get cache
/home/runner/.npm
Error: Dependencies lock file is not found in /home/runner/work/project/project. Supported file patterns: package-lock.json,npm-shrinkwrap.json,yarn.lock
```

## 문제 상황

GitHub Actions으로 Node.js 프로젝트 CI를 실행하던 중, npm dependencies 캐싱 과정에서 문제가 발생했다.

## 해결 방법

[setup-node](https://github.com/actions/setup-node?tab=readme-ov-file#caching-global-packages-data) README를 보면 다음과 같은 방법으로 해결할 수 있다.

### Caching global packages data

> The action defaults to search for the dependency file (package-lock.json, npm-shrinkwrap.json or yarn.lock) in the repository root, and uses its hash as a part of the cache key. Use > cache-dependency-path for cases when multiple dependency files are used, or they are located in different subdirectories.
>
> 이 작업은 기본적으로 리포지토리 루트에서 종속성 파일(package-lock.json, npm-shrinkwrap.json 또는 yarn.lock)을 검색하고 해당 해시를 캐시 키의 일부로 사용합니다. 여러 종속성 파일이 사용되거나 서로 다른 하위 디렉터리에 있는 경우에는 cache-dependency-path를 사용합니다.

`cache-dependency-path`를 추가하여 `package-lock.json`이 있는 경로를 지정해주면된다

```yml
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: 20
      cache: "npm"
      cache-dependency-path: subdir/package-lock.json
  - run: npm ci
  - run: npm test
```
