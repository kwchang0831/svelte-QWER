import type { ParamMatcher } from '@sveltejs/kit'
import { isLocale } from '$i18n/i18n-util'

// only accept valid languages as a segment in the URL
export const match: ParamMatcher = (param) => {
	return isLocale(param)
}