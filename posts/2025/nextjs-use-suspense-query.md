---
title: "Next.js에서 useSuspenseQuery 중복 요청"
series: ""
description: ""
tags:
  - Next.js
publishedAt: "2025-04-01"
updatedAt: "2025-04-01"
isPublished: true
---

# Next.js에서 useSuspenseQuery 중복 요청

## 문제

Next.js에서 `useSuspenseQuery`, `useSuspenseInfiniteQuery`를 사용할 때, 동일한 API가 서버에서 두 번 호출되는 현상이 발생

```tsx
<LoggingErrorBoundary fallback={ProductPostFeedsErrorState}>
  <Suspense fallback={<ProductPostFeedSkeleton length={20} />}>
    <InfiniteProductPostFeeds />
  </Suspense>
</LoggingErrorBoundary>;

function InfiniteProductPostFeeds() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      ...productPostQueryOptions.list({
        size: SIZE_PER_PAGE,
        startId: undefined,
      }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });

  // 생략
}
```

### 서버 로그

```bash
2025-04-01 16:08:08.147 [http-nio-8080-exec-5] DEBUG - Secured GET /api/v1/products/posts?size=10
2025-04-01 16:08:08.943 [http-nio-8080-exec-6] DEBUG - Securing GET /api/v1/products/posts
```

브라우저에서는 API 요청이 한 번만 발생하지만, API 서버에서는 두 번 발생하는 현상이 발생함

## 원인

React의 Suspense 동작과 관련이 있다.

`useSuspenseQuery` 내부는 `useBaseQuery`를 사용하고 있는데, `useBaseQuery`에서 데이터가 준비되지 않았을 때 Promise를 throw한다.

- [useSuspenseQuery](https://github.com/TanStack/query/blob/main/packages/react-query/src/useBaseQuery.ts):

```tsx
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient,
): UseSuspenseQueryResult<TData, TError> {
  if (process.env.NODE_ENV !== "production") {
    if ((options.queryFn as any) === skipToken) {
      console.error("skipToken is not allowed for useSuspenseQuery");
    }
  }

  return useBaseQuery(
    {
      ...options,
      enabled: true,
      suspense: true,
      throwOnError: defaultThrowOnError,
      placeholderData: undefined,
    },
    QueryObserver,
    queryClient,
  ) as UseSuspenseQueryResult<TData, TError>;
}
```

- [useBaseQuery 일부](https://github.com/TanStack/query/blob/main/packages/react-query/src/useBaseQuery.ts#L120):

```tsx
// Handle suspense
if (shouldSuspend(defaultedOptions, result)) {
  throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
}
```

- 때문에 React Fiber는 이를 감지하여 Suspense 처리하게 된다. 즉, 컴포넌트가 서버에서 동작하여 API 호출이 발생한다.

## 해결

Toss의 [Suspensive](https://suspensive.org/ko)를 참고했다. Suspense를 클라이언트에서만 동작하도록 구현

```tsx
// 1. 클라이언트 상태 감지 훅
function useIsClient() {
  return useSyncExternalStore(
    () => () => {}, // 구독 불필요
    () => true, // 클라이언트 상태
    () => false, // 서버 상태
  );
}

// 2. 클라이언트에서만 렌더링하는 컴포넌트
export function ClientOnly({ children, fallback }: ClientOnlyProps) {
  return useIsClient() ? children : fallback;
}

// 3. 커스텀 Suspense 컴포넌트
export function Suspense({ children, fallback, clientOnly }: SuspenseProps) {
  const Comp = clientOnly ? SuspenseClientOnly : ReactSuspense;
  return <Comp fallback={fallback}>{children}</Comp>;
}

function SuspenseClientOnly({ fallback, ...rest }: ReactSuspenseProps) {
  return (
    <ClientOnly fallback={fallback}>
      <ReactSuspense {...rest} />
    </ClientOnly>
  );
}
```

### 적용

clientOnly를 추가하여 서버에서는 단순히 fallback을 반환하고 클라이언트에서만 데이터 요청이 발생하도록 수정

```tsx
<LoggingErrorBoundary fallback={ProductPostFeedsErrorState}>
  <Suspense clientOnly fallback={<ProductPostFeedSkeleton length={20} />}>
    <InfiniteProductPostFeeds />
  </Suspense>
</LoggingErrorBoundary>
```

## 참고

- https://github.com/TanStack/query/blob/main/packages/react-query/src/useBaseQuery.ts
- https://github.com/toss/suspensive
- https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberSuspenseComponent.js
