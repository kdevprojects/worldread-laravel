<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="favicon.ico" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name') . ' ' . 'Administration' }}</title>
    <base href="/" />

    {{-- This'll load our extracted and hashed CSS assets here --}}
    @env('production')
    @if (isset($ngAssets) && count($ngAssets))
    <link rel="stylesheet" href="/build/admin/{{ $ngAssets['styles'] }}">
    @endif
    {{-- This'll load the development assets when in dev mode --}}
    @else
    <link rel="stylesheet" href="/build/admin/styles.css">
    @endenv
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <app-root></app-root>

    {{-- This'll load our hashed assets when in production --}}
    @env('production')
    @if (isset($ngAssets) && count($ngAssets))
    <script src="/build/admin/{{ $ngAssets['runtime'] }}" defer></script>
    <script src="/build/admin/{{ $ngAssets['polyfills'] }}" defer></script>
    <script src="/build/admin/{{ $ngAssets['main'] }}" defer></script>
    @endif
    {{-- This'll load the development assets when in dev mode --}}
    @else
    <script src="/build/admin/runtime.js" defer></script>
    <script src="/build/admin/polyfills.js" defer></script>
    <script src="/build/admin/styles.js" defer></script>
    <script src="/build/admin/vendor.js" defer></script>
    <script src="/build/admin/main.js" defer></script>
    @endenv
</body>

</html>
