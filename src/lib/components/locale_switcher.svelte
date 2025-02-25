<script lang="ts">
	import { browser } from '$app/environment'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { setLocale, locale } from '$i18n/i18n-svelte'
	import type { Locales } from '$i18n/i18n-types'
	import { locales } from '$i18n/i18n-util'
	import { loadLocaleAsync } from '$i18n/i18n-util.async'
	import { replaceLocaleInUrl } from './utils.js'

	const switchLocale = async (newLocale: Locales, updateHistoryState = true) => {
		if (!newLocale || $locale === newLocale) return

		// load new dictionary from server
		await loadLocaleAsync(newLocale)

		// select locale
		setLocale(newLocale)

		if (updateHistoryState) {
			// update url to reflect locale changes
			history.pushState({ locale: newLocale }, '', replaceLocaleInUrl($page.url, newLocale))
		}

		// run the `load` function again
		invalidateAll()
	}

	// update `lang` attribute
	$: browser && document.querySelector('html')!.setAttribute('lang', $locale)

	// update locale when navigating via browser back/forward buttons
	const handlePopStateEvent = async ({ state }: PopStateEvent) => switchLocale(state.locale, false)

	// update locale when page store changes
	$: if (browser) {
		const lang = $page.params.lang as Locales
		switchLocale(lang, false)
		history.replaceState({ ...history.state, locale: lang }, '', replaceLocaleInUrl($page.url, lang))
	}
</script>

<select onChange="window.location.assign(this.value);" style="background-color: var(--qwer-bg-color);">
	{#each locales as l}
		{#if l === $locale}
			<option value={l} selected>
			{l}
			</option>
		{:else}
			<option value={l}>
			{l}
			</option>
		{/if}
	{/each}
</select>

<svelte:window on:popstate={handlePopStateEvent} />
